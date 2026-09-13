/**
 * RSVP receiver for the Tony & Linh invitation.
 *
 * Bound to the sheet:
 * https://docs.google.com/spreadsheets/d/1mvEzUYaYrrZdqd4RVdZiNfO3ujB7HrB80bYXx90InMA
 *
 * Deploy: Extensions → Apps Script → paste this file → Deploy → New deployment
 * → type "Web app", Execute as "Me", Who has access "Anyone" → copy the /exec
 * URL into NEXT_PUBLIC_RSVP_ENDPOINT.
 */

const SHEET_ID = "1mvEzUYaYrrZdqd4RVdZiNfO3ujB7HrB80bYXx90InMA";
const SHEET_NAME = "RSVP";

const COLUMNS = [
  ["submittedAt", "Thời gian"],
  ["name", "Tên"],
  ["contact", "Điện thoại / Email"],
  ["attending", "Tham dự"],
  ["guests", "Số khách"],
  ["diet", "Yêu cầu ăn uống"],
  ["help", "Cần hỗ trợ"],
  ["message", "Lời nhắn"],
  ["lang", "Ngôn ngữ"],
];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const reply = JSON.parse(e.postData.contents);
    reply.submittedAt = new Date();
    reply.attending = reply.attending === "yes" ? "Có" : "Không";

    const sheet = getSheet_();
    sheet.appendRow(COLUMNS.map(([key]) => clean_(reply[key])));

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

/** Lets you open the /exec URL in a browser to check the deployment is live. */
function doGet() {
  return json_({ ok: true, service: "tonny-linh-rsvp" });
}

function getSheet_() {
  const book = SpreadsheetApp.openById(SHEET_ID);
  let sheet = book.getSheetByName(SHEET_NAME);
  if (!sheet) sheet = book.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(([, header]) => header));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight("bold");
  }
  return sheet;
}

/** Guest text never starts a formula in the sheet. */
function clean_(value) {
  if (value == null) return "";
  if (value instanceof Date) return value;
  const text = String(value).slice(0, 2000);
  return /^[=+\-@]/.test(text) ? "'" + text : text;
}

function json_(body) {
  return ContentService.createTextOutput(JSON.stringify(body)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
