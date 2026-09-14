/**
 * Linh & Tony — the guest list and the RSVPs, on one tab.
 *
 * The sheet is both where the guest list comes FROM (the website reads a guest
 * by their link) and where the replies go TO (the website writes each reply
 * onto that guest's own row). The couple only ever type one column: Name. The
 * script fills in No, Slug and Link.
 *
 * Columns of the RSVP tab — looked up by their NAME in row 1, not by position,
 * so they can be reordered and other columns inserted between them:
 *
 *   No · Name · Slug · Link · Contact · Attending · Guests · Diet · Help ·
 *   Message · Lang · Updated
 *
 * The website writes:
 *   Contact    phone or email
 *   Attending  YES / NO
 *   Guests     1–5 (blank for NO)
 *   Diet       dietary needs (blank for NO)
 *   Help       "hotel", "transport" or both (blank for NO)
 *   Message    their note to the couple
 *   Lang       the language they read the invitation in
 *   Updated    when they last replied
 *
 * SET UP (once)
 *  1. Open the sheet → Extensions → Apps Script, paste this file, save.
 *  2. Project Settings (gear) → Script properties → Add:
 *       SECRET       a long random string. The same value goes in the
 *                    website's RSVP_SHARED_SECRET. Never commit it.
 *       SITE_ORIGIN  the invitation's address, e.g. https://tonnylinh.vercel.app
 *  3. Reload the sheet. A "Wedding" menu appears → "Dựng lại sheet (chạy 1 lần)".
 *     It rewrites row 1 with the headers above; do it while the tab is empty.
 *  4. Deploy → New deployment → Web app. Execute as: Me. Who has access: Anyone.
 *     Copy the /exec URL into the website's RSVP_ENDPOINT.
 *
 * After changing this file, Deploy → Manage deployments → edit → Version:
 * "New version". Saving alone does NOT change what the website talks to.
 */

const SHEET_ID = '1mvEzUYaYrrZdqd4RVdZiNfO3ujB7HrB80bYXx90InMA';

/** Must match the tab's name at the bottom of the spreadsheet exactly. */
const SHEET_NAME = 'RSVP';

const HEADERS = [
  'No', 'Name', 'Slug', 'Link',
  'Contact', 'Attending', 'Guests', 'Diet', 'Help', 'Message', 'Lang', 'Updated',
];

const FIRST_ROW = 2; // row 1 is the header

/* ------------------------------------------------------------------ menu */

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('Wedding')
    .addItem('Tạo link cho khách mới', 'generateLinks')
    .addItem('Dựng lại sheet (chạy 1 lần)', 'setupSheet')
    .addItem('Kiểm tra dữ liệu gửi cho website', 'checkData')
    .addToUi();
}

/** Run by hand after adding guests, to see their links straight away. */
function generateLinks() {
  const sheet = sheet_();
  const n = syncGuests_(sheet, columns_(sheet));
  SpreadsheetApp.getActiveSpreadsheet().toast(n + ' khách đã có link.', 'Wedding');
}

/** Run once, while the tab is empty: headers, formats, column widths. */
function setupSheet() {
  const sheet = sheet_();
  sheet.getRange(1, 1, 1, sheet.getMaxColumns()).clearContent();
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setValues([HEADERS])
    .setFontWeight('bold');
  sheet.setFrozenRows(1);

  const col = columns_(sheet);
  const rows = sheet.getMaxRows() - 1;

  // No is the guest's code and must stay text, or 001 collapses to 1.
  sheet.getRange(FIRST_ROW, col.no, rows, 1).setNumberFormat('@');
  sheet.setColumnWidth(col.name, 220);
  sheet.setColumnWidth(col.link, 340);
  sheet.setColumnWidth(col.message, 320);

  SpreadsheetApp.getActiveSpreadsheet().toast('Sheet đã sẵn sàng.', 'Wedding');
}

/**
 * Shows exactly what the website will receive.
 *
 * The menu runs the latest SAVED code; the website runs the latest DEPLOYED
 * version. If this looks right and the invitation does not, the deployment is
 * behind — not the data.
 */
function checkData() {
  const sheet = sheet_();
  const col = columns_(sheet);
  syncGuests_(sheet, col);
  const guests = readGuests_(sheet, col);

  const replied = guests.filter(function (g) { return g.attending !== null; });
  const coming = replied.filter(function (g) { return g.attending; });
  const heads = coming.reduce(function (sum, g) { return sum + (Number(g.guests) || 1); }, 0);

  const lines = guests.slice(0, 12).map(function (g) {
    const state = g.attending === null ? '—'
      : (g.attending ? 'YES ' + (g.guests || '1') : 'NO');
    return g.code + '  ' + g.slug + '   ' + g.name + '   [' + state + ']';
  });

  const problems = [];
  if (!prop_('SECRET')) problems.push('⚠ Chưa đặt Script property SECRET.');
  if (!prop_('SITE_ORIGIN')) problems.push('⚠ Chưa đặt Script property SITE_ORIGIN — cột Link sẽ trống.');

  const message =
    (problems.length ? problems.join('\n') + '\n\n' : '') +
    guests.length + ' khách · ' + replied.length + ' đã trả lời · ' +
    coming.length + ' đến (' + heads + ' người)\n\n' +
    'mã  slug  tên  [trả lời]\n' + lines.join('\n') +
    (guests.length > 12 ? '\n… còn ' + (guests.length - 12) + ' dòng' : '');

  SpreadsheetApp.getUi().alert('Dữ liệu gửi cho website', message,
    SpreadsheetApp.getUi().ButtonSet.OK);
}

/* -------------------------------------------------------------- endpoint */

/**
 * One endpoint, both directions. Only the website's SERVER calls it — the
 * secret never reaches a browser.
 *
 *   { secret, action: 'guest', slug }   → that guest, or null
 *   { secret, action: 'rsvp', slug?, name, attending, … }
 *                                       → the reply, on that guest's row
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000); // queue replies that arrive together

  try {
    const body = JSON.parse(e.postData.contents);

    const secret = prop_('SECRET');
    if (!secret || body.secret !== secret) {
      return json_({ ok: false, error: 'unauthorized' });
    }

    const sheet = sheet_();
    const col = columns_(sheet);
    // A guest typed into the sheet since the last run has no slug yet — fill
    // it in before reading or writing, so nobody has to remember the menu.
    syncGuests_(sheet, col);

    if (body.action === 'guest') {
      const slug = String(body.slug || '').trim();
      const guest = readGuests_(sheet, col).filter(function (g) { return g.slug === slug; })[0];
      return json_({ ok: true, guest: guest || null });
    }

    if (body.action === 'rsvp') {
      return json_(writeRsvp_(sheet, col, body));
    }

    return json_({ ok: false, error: 'unknown action' });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Opening the /exec URL in a browser confirms the deployment is live. */
function doGet() {
  return json_({ ok: true, service: 'tonny-linh-rsvp' });
}

/* ---------------------------------------------------------------- helpers */

function prop_(key) {
  return PropertiesService.getScriptProperties().getProperty(key) || '';
}

function sheet_() {
  const book = SpreadsheetApp.openById(SHEET_ID);
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = book.insertSheet(SHEET_NAME);
    sheet.getRange(1, 1, 1, HEADERS.length)
      .setValues([HEADERS])
      .setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Where each column is, found by its NAME in row 1 (case-insensitive).
 * A column that does not exist yet is added at the end, header and all, so an
 * older sheet upgrades itself without losing anything.
 */
function columns_(sheet) {
  const width = Math.max(sheet.getLastColumn(), 1);
  const header = sheet.getRange(1, 1, 1, width).getValues()[0]
    .map(function (h) { return String(h).trim().toLowerCase(); });

  const col = {};
  // An empty header row reads as one blank cell; start writing at column 1.
  let next = header.length === 1 && header[0] === '' ? 1 : header.length + 1;

  HEADERS.forEach(function (name) {
    const at = header.indexOf(name.toLowerCase());
    if (at !== -1) {
      col[name.toLowerCase()] = at + 1;
    } else {
      sheet.getRange(1, next).setValue(name).setFontWeight('bold');
      col[name.toLowerCase()] = next;
      next++;
    }
  });
  return col;
}

/**
 * How many data rows there are, measured down the NAME column.
 *
 * getLastRow() cannot be trusted: an ARRAYFORMULA in any column fills it to
 * the bottom with "", which Apps Script counts as content, and new replies
 * would be appended hundreds of rows down. Name is typed by hand, so it is
 * the real edge of the list.
 */
function dataRows_(sheet, col) {
  const last = sheet.getLastRow() - 1;
  if (last <= 0) return 0;

  const names = sheet.getRange(FIRST_ROW, col.name, last, 1).getValues();
  for (let i = names.length - 1; i >= 0; i--) {
    if (String(names[i][0]).trim()) return i + 1;
  }
  return 0;
}

/**
 * Fills in No / Slug / Link for every row that has a name.
 *
 * A slug that exists is NEVER changed — a link already sent to a guest has to
 * keep working, even if the name is corrected later.
 */
function syncGuests_(sheet, col) {
  const rows = dataRows_(sheet, col);
  if (rows === 0) return 0;

  const values = sheet.getRange(FIRST_ROW, 1, rows, sheet.getLastColumn()).getValues();
  const origin = prop_('SITE_ORIGIN').replace(/\/+$/, '');

  const taken = {};
  values.forEach(function (row) {
    const slug = String(row[col.slug - 1]).trim();
    if (slug) taken[slug] = true;
  });

  // Written back ONE COLUMN at a time, never whole rows: a formula the couple
  // keep in a column between these would be overwritten by its own value.
  const nos = [];
  const slugs = [];
  const links = [];
  let noChanged = false;
  let slugChanged = false;
  let linkChanged = false;
  let counted = 0;

  values.forEach(function (row) {
    const name = String(row[col.name - 1]).trim();
    const currentNo = row[col.no - 1];
    const currentSlug = String(row[col.slug - 1]).trim();
    const currentLink = row[col.link - 1];

    if (!name) {
      // A blank row in the middle of the list — leave it alone.
      nos.push([currentNo]);
      slugs.push([currentSlug]);
      links.push([currentLink]);
      return;
    }

    counted++;

    const no = code_(counted);
    if (String(currentNo).trim() !== no) noChanged = true;
    nos.push([no]);

    let slug = currentSlug;
    if (!slug) {
      slug = uniqueSlug_(slugify_(name), taken);
      taken[slug] = true;
      slugChanged = true;
    }
    slugs.push([slug]);

    // The personal link is the site's address + / + the guest's slug. A
    // trailing slash on SITE_ORIGIN would give //slug, which only arrives
    // through a redirect that in-app browsers do not always follow.
    const link = origin ? origin + '/' + slug : '';
    if (currentLink !== link) linkChanged = true;
    links.push([link]);
  });

  if (noChanged) {
    sheet.getRange(FIRST_ROW, col.no, rows, 1)
      .setNumberFormat('@') // without this Sheets stores 001 as the number 1
      .setValues(nos);
  }
  if (slugChanged) sheet.getRange(FIRST_ROW, col.slug, rows, 1).setValues(slugs);
  if (linkChanged) sheet.getRange(FIRST_ROW, col.link, rows, 1).setValues(links);

  return counted;
}

/** 7 → "007". */
function code_(n) {
  let out = String(n == null ? '' : n).trim();
  if (!out) return '';
  while (out.length < 3) out = '0' + out;
  return out;
}

/** Two guests with the same name still need two different links. */
function uniqueSlug_(base, taken) {
  if (!base) base = 'guest';
  if (!taken[base]) return base;
  let n = 2;
  while (taken[base + '-' + n]) n++;
  return base + '-' + n;
}

/** "Anh Trần Bảo Ngọc & gia đình" → "anh-tran-bao-ngoc-and-gia-dinh" */
function slugify_(value) {
  return value
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip the tone marks
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

function readGuests_(sheet, col) {
  const rows = dataRows_(sheet, col);
  if (rows === 0) return [];

  return sheet.getRange(FIRST_ROW, 1, rows, sheet.getLastColumn())
    .getValues()
    .map(function (row) {
      const attending = String(row[col.attending - 1]).trim().toUpperCase();
      return {
        slug: String(row[col.slug - 1]).trim(),
        name: String(row[col.name - 1]).trim(),
        code: code_(String(row[col.no - 1]).trim().replace(/\D/g, '')),
        // The reply they already sent, so a guest who comes back sees their
        // own answers rather than a blank form.
        attending: attending === 'YES' ? true : (attending === 'NO' ? false : null),
        contact: String(row[col.contact - 1]).trim(),
        guests: String(row[col.guests - 1]).trim(),
        diet: String(row[col.diet - 1]).trim(),
        help: String(row[col.help - 1]).trim(),
        message: String(row[col.message - 1]).trim(),
      };
    })
    .filter(function (g) { return g.slug && g.name; });
}

/**
 * Writes the reply onto the guest's own row; a guest who changes their mind
 * overwrites it rather than adding a row. A guest who came in on the plain
 * address (no personal link) gets a new row with the name they typed.
 */
function writeRsvp_(sheet, col, body) {
  const slug = String(body.slug || '').trim();
  const coming = body.attending === true;

  const answer = {};
  answer[col.contact] = clean_(body.contact);
  answer[col.attending] = coming ? 'YES' : 'NO';
  // A guest who is not coming answered none of these.
  answer[col.guests] = coming ? clean_(body.guests || '1') : '';
  answer[col.diet] = coming ? clean_(body.diet) : '';
  answer[col.help] = coming ? clean_(body.help) : '';
  answer[col.message] = clean_(body.message);
  answer[col.lang] = clean_(body.lang);
  answer[col.updated] = new Date();

  const rows = dataRows_(sheet, col);

  if (slug && rows > 0) {
    const slugs = sheet.getRange(FIRST_ROW, col.slug, rows, 1).getValues();
    for (let i = 0; i < slugs.length; i++) {
      if (String(slugs[i][0]).trim() === slug) {
        const at = FIRST_ROW + i;
        // Cell by cell: the answer columns need not sit side by side.
        Object.keys(answer).forEach(function (c) {
          sheet.getRange(at, Number(c)).setValue(answer[c]);
        });
        return { ok: true, row: at };
      }
    }
  }

  const name = clean_(body.name);
  if (!name) return { ok: false, error: 'name required' };

  // Appended right under the last NAME, not under the last cell a formula
  // reaches.
  const at = FIRST_ROW + rows;
  sheet.getRange(at, col.name).setValue(name);
  Object.keys(answer).forEach(function (c) {
    sheet.getRange(at, Number(c)).setValue(answer[c]);
  });
  syncGuests_(sheet, col); // give the new row its No / Slug / Link
  return { ok: true, row: at };
}

/** Guest text, trimmed and capped, and never able to start a formula. */
function clean_(value) {
  if (value == null) return '';
  const text = String(value).trim().slice(0, 2000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
