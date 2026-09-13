# Tony & Linh — Design System

Everything lives in [`src/app/globals.css`](src/app/globals.css). Build a new
section by **applying these classes** — avoid one-off styles.

## Colour

| Token | Value | Use |
|---|---|---|
| `--color-wine` | `#600f20` | Main |
| `--color-wine-deep` | `#400a15` | Shadow / gradient anchor |
| `--color-wine-soft` | `#7d2436` | Hover |
| `--color-ivory` | `#f9f3e8` | Second |
| `--color-gold` | `#a48210` | Support |
| `--color-gold-light` | `#d3b25c` | Gold on dark grounds |
| `--color-gold-deep` | `#7d6208` | Gold on light grounds |

Semantic aliases: `--color-ink`, `--color-ink-muted`, `--color-on-dark`,
`--color-on-dark-muted`.

## Type

| Family | Token | Used for |
|---|---|---|
| Edwardian Script | `--font-initial` | The first letter of each couple name |
| Mencken Std Narrow | `--font-name` | Name bodies, dates, times, eyebrows, buttons |
| Alex Brush | `--font-heading` | Every section heading |
| Cormorant Garamond | `--font-body` | All body copy |
| TAN Aegean / TAN Pearl | `--font-display` / `--font-pearl` | Reserved, unused |
| Noto Serif Display | `--font-name-vi` | Stands in for Mencken in Vietnamese |

**Mencken has no Vietnamese.** It is missing Ơ, Ư, Đ and the stacked tone marks
(Ủ, Ặ, Ự …), and the browser patches the gaps from a fallback face, so every
Vietnamese label came out in two fonts at once. Under `html[lang="vi"]`,
`--font-name` is pointed at `--font-name-vi` — Noto Serif Display, the nearest
high-contrast narrow serif that has the full set — and `font-stretch: 72%`
narrows it on its width axis to Mencken's proportions. Faces without a width
axis ignore the stretch. It is loaded through `next/font/google` with the
`latin` and `vietnamese` subsets. English keeps Mencken.

Edwardian Script and the two TAN faces have no Vietnamese either. That is safe
only while Edwardian sets nothing but the couple's names, and the TAN faces
stay unused; give any of them Vietnamese copy and it needs the same treatment.

Fluid sizes: `--text-couple`, `--text-display`, `--text-h1`, `--text-h2`,
`--text-stat`, `--text-lead`, `--text-body`, `--text-small`, `--text-eyebrow`.

## Layout rules

- `--page-gutter: 1.5rem` — horizontal padding on every section
- `--content-max: 32rem` — reading column
- `--section-y` / `--section-y-tight` — section vertical padding
- `--space-3xs … --space-2xl` — the only vertical gaps to use

**Every section carries the `.rule`** under its heading — the gold hairline with
a diamond at its centre — except the hero and the thank you, which close the
page at either end and are arrangements rather than headed sections.

```html
<section class="section ground--cream">        <!-- or ground--red / ground--silk -->
  <div class="container center stack">          <!-- stack | stack-sm | stack-lg | stack-xl -->
    <p class="eyebrow">Label</p>
    <h2 class="heading">Alex Brush heading</h2>
    <div class="rule"><span class="rule__mark"></span></div>
    <p class="body-text body-text--muted">Cormorant copy.</p>
  </div>
</section>
```

Add `section--tight` for a shorter section, `section--full` for a
viewport-height one.

### Grounds

| Class | Art | Used by | Text colour |
|---|---|---|---|
| `ground--silk` | `1.png` red silk drape | intro, hero, thank you | on-dark |
| `ground--red` | `red background.png` damask | time & venue, dress code, honeymoon fund | on-dark |
| `ground--cream` | `2.png` cream damask | gallery, agenda, rsvp | ink |

`ground--silk` lays a radial scrim over the drape via `::before` so type stays
legible across its highlights.

Heading, eyebrow and label colours flip automatically with the
ground — no per-section overrides needed.

**Sections butt straight against each other** and the change of ground *is* the
break — except where a red ground meets the cream one below it. There the seam
is dressed, and there are two dressings:

| Seam | Dressing | Classes |
|---|---|---|
| hero → gallery | `<Lace />` | `section--laced` on the gallery |
| time & venue → agenda | `<Lace />` | `section--laced` on the agenda |
| dress code → RSVP | `<Drape />` | `section--spill` on the dress code, `section--under-spill` on the RSVP |

The two hang differently, and it matters:

- **Lace** (`src/components/Lace.tsx`) goes in as the **first child of the
  cream section**, which buys the room out of its own top padding — so the seam
  lives inside the section below it and both sections stay free to clip their
  own contents. It needs nothing behind it: `lace.webp` is cropped to its own
  bounds and opaque edge to edge from its third row, so pulling it 2px above
  the section's top edge puts solid braid on the join. An earlier version sat
  it on a band of red damask to guarantee that, which showed as a rectangular
  patch of the wrong red wherever the section above was the silk rather than
  the damask.
- **The silk swag** (`src/components/Drape.tsx`) goes in **last in the section
  above** and falls across the boundary, so it can cover not just the seam but
  whatever that section cuts off at its own edge — the hand photograph in the
  dress code stands right on it. That costs the section above its clipping
  (`overflow: visible`) and its foot padding, and it needs a `z-index` to
  out-stack the section below, which isolates like every other.

  `drape.webp` is cut from the one row of the original photograph where the
  cloth covers the frame edge to edge; everywhere else the sweep is diagonal
  and leaves a corner bare. Only that straight opaque head can be trusted to
  hide a join — the wavy hem below it is for the transition — which is what
  fixes the swag's `translate` at 87%: the boundary has to land inside the head.

Note that `inset-inline: 0` is the full bleed for both. An absolutely
positioned box resolves `left`/`right` against its containing block's PADDING
box, which is already the whole section — subtracting the section's padding
pushes it that far past each edge instead.

## Buttons

Base `.btn` plus exactly one modifier. All are 48px tall for touch.

- `.btn--gold` — primary, solid gold
- `.btn--wine` — primary on a cream ground
- `.btn--outline` — secondary, gold hairline on a dark ground
- `.btn--block` — full width

## Other components

`.card` (gold hairline frame) · `.panel` (a bordered block on a dark ground,
tied with `.panel__ribbon`) · `.field` `.fieldset` `.label` `.input` `.select`
`.textarea` · `.choice-group` (`--stack` for one per row) `.choice` (radio and
checkbox pills) · `.reel` `.film` (the gallery's film strip and its carousel) ·
`.weekstrip` · `.programme` `.polaroid` (the agenda) · `.gilt` (the hero's
framed portrait) · `.langswitch` (via `<LanguageToggle>`) · `.emblem` (via
`<Emblem>`, a gold motif centred above a section label) · `.lace` (via
`<Lace>`) · `.reveal` (via `<Reveal>`)

The gallery is a reel of film, one frame of three photographs per slide, with
white edge printing on the darkest wine stock. Every frame is the SAME size
(`.film` is a fixed 5:8) — a reel that grew and shrank as it turned moved the
page under the guest's thumb. So the photographs fill the film rather than
keeping their own proportions: a `landscape` frame stacks three wide stills with
the printing between each, like cine film, and a `portrait` frame hangs one tall
print beside two stacked ones.

Time & Venue is written on one lace-edged letter (`venue-lace.webp`), centred,
with calla lilies laid across its top-right corner (`venue-calla.webp`); the
writing sits between the two pictures. See the TIME & VENUE block in `globals.css` for the measured
writing area and why the letter runs wider than the column.

The intro envelope carries two bouquets (`bouquet-top.webp`,
`bouquet-foot.webp`). The top one is tucked BEHIND the envelope, because the
card rises straight into that corner and a bouquet on top covered its type. Frames are listed in `gallery` in `wedding.ts`,
and a landscape still can carry an optional `caption`, set like a subtitle.

**Nothing on the page is dimmed.** Ornaments and dividers are always full
opacity; the only resting `opacity` below 1 is the disabled button state.

## The agenda

`src/components/Agenda.tsx`. Under the week strip, the day is a spread of
polaroids on a `.programme` panel: the day's span (first time – last time) over
a grid of **two prints to a row, three rows**, one print per event, then a line
of script telling the guest they can leave a heart.

- **The panel is flat.** Plain `--color-wine`, square corners, no sheen, no
  shadow — and the prints on it carry no shadow either. It is a field the
  photographs are laid on, not a card floating over the cream.
- **Each `.polaroid` is a print laid down by hand**: an ivory border with a
  deeper lip, tilted a degree or two, alternate prints leaning the other way.
  The time is a pill pinned to the photo's top-left; the event's name and its
  line drawing (the `icon` masks in `public/img/icon/`, painted wine) are
  written on the lip.
- **Tapping a photo leaves a heart** — the button in its bottom-right corner
  fills pink with a small pop, and a second tap takes it back. Hearts are local
  state: nothing is saved or sent, and they are gone on reload.
- **Every photograph is the same 4:5 crop, 720×900**, cut by hand to frame the
  couple, in `public/img/couple/agenda/` named by event id (`welcome.webp` …
  `party.webp`) and listed as `photo` on each entry of `agenda` in `wedding.ts`.
  A grid whose prints changed shape would not line up across its rows.

The earlier agenda — stops set in the hollows of a picture of red satin
(`agenda-silk.webp`) — is retired; the asset is no longer referenced.

## Paper

`public/img/paper.webp` is a cotton-rag grain, tiled under every cream surface
and blended with `multiply`. It is generated in the FREQUENCY DOMAIN, not by
blurring noise: a blurred field does not tile, and its seam shows at this size.
Its mean sits at 246, so multiplying stays inside `[0.90, 1.0]` — a mid-grey
grain would halve the brightness and turn the paper to slate.

## The die-cuts

`src/components/PaperDefs.tsx`, rendered once from the page root. SVG
`clipPath`s in `objectBoundingBox` units, so one definition fits the envelope
at any size.

The envelope is cut the classic way: **four flaps whose creases all run from the
exact corners towards the centre**, so every corner is the same mitre. The
creases are straight lines; only the tips are rounded, over their last few
percent. Heights below are fractions of the ENVELOPE:

| Clip | Shape | Tip |
|---|---|---|
| `#env-flap` | the top flap, from both top corners | 0.64 — its box is 66% of the envelope, the tip at 97% of the box |
| `#env-mouth` | the two side flaps as one shape: everything below the V from the top corners | 0.50 — the bottom of the opening |
| `#env-side-right` | the right side flap alone, for its own shade | — |
| `#env-fold` | the bottom flap, from both bottom corners | 0.58 |

The order of those tips is what makes it read as folded paper: the bottom
flap's tip sits just BELOW the mouth, so it never pokes into the opening, and
the top flap's tip laps over both, where the seal holds them shut.

An earlier cut gave the top flap short vertical shoulders (14% of its box) and
the mouth matching ones at 10%, with only a shallow seam for a bottom flap and
no side flaps at all. With the envelope also tilted at rest, the four corners
came out visibly unequal.

## The intro

`src/components/Intro.tsx`. Pressing the wax seal breaks it, the flap hinges
back through 180°, the invitation rides up out of the pocket, and the couple's
photograph follows it out. A tap anywhere skips ahead once the card is up.

It stacks in **plain z-index**, not in 3D depth:

| z | Layer | |
|---|---|---|
| 7 | `.env__bouquet--foot` | the lower bouquet, lying on the envelope |
| 6 | `.env__seal` | the wax; the button you press |
| 5 → 0 | `.env__flap` | the flap; drops to 0 half way through the fold |
| 3 | `.env__fold` | the bottom flap, clipped to `#env-fold` |
| 2 | `.env__pocket` | the side flaps, clipped to `#env-mouth`, with the right one shaded on `::before` |
| 1 | `.env__well` | holds, in order, the card and the photo (`.env__photo`, z 1 inside it) |
| 0 | `.env__back` | the back panel |
| −1 | `.env__bouquet--top` | the upper bouquet, tucked behind |

An earlier version put the whole envelope in one `preserve-3d` scene and let the
browser sort the layers by their z offsets. **It does not**: with the flap laid
back at `-11px` and the card at `-3px` it still painted the flap over the card.
So only the FLAP gets three dimensions — `.env` carries the perspective it folds
in — and the one moment the flap's order changes is a z-index swap timed to
where the flap is EDGE-ON — zero width to the viewer, so the change of order
cannot be seen.

**The envelope is square to the viewer at rest.** `.env__tilt` used to lean it
back 10°, which under perspective turns the rectangle into a trapezoid — narrower
at the top than the bottom — and its four corners stop matching. It now only
carries the drop down the stage as the envelope opens, to make room for the
card.

That moment is **not** half the duration. Under
`cubic-bezier(0.62, 0.02, 0.2, 1)` the flap is already at 125° by 875ms, well
past edge-on and plainly visible, and swapping there read as a pop. Solving the
curve for 90° of 179° puts it at **754ms**, and the card is held until 900ms so
it never rises into a flap that is still in front of it. Change the easing or
the duration and both numbers have to be solved again.

Three things govern how it looks:

1. **The flaps overlap in order.** Mouth at 0.50, bottom flap's tip at 0.58, top
   flap's tip at 0.64 (see *The die-cuts*). Cut to meet, an edge disappears into
   the one under it and the front reads as one blank cream shape.
2. **Every crease starts in a corner.** The top flap's diagonals run below the
   side flaps' everywhere, so the closed flap covers the opening right into the
   corners with no wedge of bare back panel.
3. **The card is taller than the envelope, on purpose.** Its foot has to stay
   below the mouth's point even with its head 45% clear of the top, which comes
   to 1.295 × the envelope's height — so it needs `.env__well`, open at the top
   and closed at the envelope's foot, or it spills out underneath. The well
   reaches 110% above the envelope, so the photo has room too.

Light comes from the upper left throughout, and each surface is a distinct step:
top flap lightest, then the bottom flap, then the side flaps — the left one lit,
the right one turned away (`#env-side-right`) — with the back panel darker still
because it is a surface in shadow seen through the mouth. When they were all
within a few units of each other the envelope read as flat shapes.

**Every fold has an edge.** Each flap's filter starts with a one-pixel
`drop-shadow` in warm ivory, offset towards the flap it lies on — the cut edge of
the paper catching the light — followed by the soft shadow it casts. The whole
envelope casts two shadows onto the silk: a tight contact shadow under a wide
soft one; the pair is what lifts it off the cloth rather than printing it on.

But the step is ONE step, and the highlight is warm. Pushed to four steps and
lit with an 80%-white wash the flap went cold and grey — and since the flap IS
the top of the envelope, that read as a different, whiter material pasted onto
a warm body rather than as the same sheet folded over. Highlights here are
`rgba(255, 250, 238, …)` and they stay under half strength; the fold is told by
the shadow it casts, not by its colour. That shadow is the flap's OWN die-cut
repeated on `.env__flap-face--front::before`, nudged down two pixels and
blurred, painted under the paper — a `drop-shadow` spreads round the whole
silhouette and gives a halo, and what a fold needs is a line.

### The seal

It sits on the top flap's tip, where the flaps meet. When pressed it **lifts off
rather than vanishing**: over about a second the wax rises 35% of its height,
grows to 1.12 and dissolves into a 3px blur. The exit lives on the `img`, not
the button, so the button's breathing animation can simply pause where it is
(`animation-play-state: paused`) instead of snapping back to scale 1. The button
keeps focus after the press, so its focus ring is turned off once the envelope
is open — otherwise a gold circle is left hanging where the wax was.

### The photograph

`.env__photo` — the couple's picture (`couple/intro.webp`, a 1000×778 crop of
the full frame) as a print with a white border. It lies **in front of the card,
over its top-right corner**, tilted 6°, clear of the card's type (which starts
0.23 of the envelope's height above its top edge).

- 36% of the envelope's width, which with the border comes to 0.46 of its
  height. At rest it sits inside the pocket; open, it is pushed up 290% of
  itself, to a head 0.80 above the envelope and a foot 0.34 above — over the
  card's corner (the card's head is at 0.45) but above the eyebrow.
- It is centred 80% across, so its tilted corner stays inside the well, which
  clips at the envelope's sides.
- **It is a second beat, not a passenger.** It waits 2.3s — until the card,
  which lands at 2.8s, is nearly home — then rises over 2.8s, settling at 5.1s.
  The open envelope is held until 6.8s before the film's caption comes down, so
  the photo is seen at rest.

The border is plain white, like a photographic print — not the stationery's
paper grain.

## The film

After the card is up, the intro gives way to a short film (`film` in
`wedding.ts`, `public/video/our-film.mp4`): the dark comes down over the
envelope (4s after the card lands), one line of caption is held for 3.6s, and
the video plays WITH sound —
pressing the seal is the user gesture that allows it (it falls back to muted if
a browser still refuses). The curtain starts to lift 1.4s before the last frame,
so the film dissolves into the hero rather than stopping first. The video is
contained, not covered: it is 2:1 and a phone held upright would crop most of
every shot. The 4K original lives in `design-source/video/` (git-ignored).

## The hero

`src/components/Hero.tsx`. The couple's portrait hung in a carved gilt frame on
the silk, and a plate beneath it — THE WEDDING OF, the names in Edwardian
Script, the date — with the guest addressed last.

- The photograph sits BEHIND `gilt-frame.webp` and is sized to the frame's
  opening, which was measured off the asset's alpha (19.4%–80.6% across,
  15.6%–83.8% down). The print is pushed a little past those lines so the
  carving laps it; re-cut the frame and the numbers have to be measured again.
- The language switch is the only thing above the frame, so the page opens on
  the picture.
- The salutation spaces itself with margins rather than a `gap`, because DEAR
  belongs tight to the name under it and one row gap cannot say that.

## RSVP

`src/components/Rsvp.tsx`. Name, phone or email, and *will you attend?* — then,
**only for a guest who is coming**, number of guests, dietary needs and the
hotel / transport asks. A guest who declines is asked for nothing but a note;
the other questions are not rendered for them, so they arrive empty rather than
as stale defaults, and they are thanked with their own line (`thanksBodyDecline`)
instead of *see you on the day*.

Replies are sent to a **Google Apps Script web app** that appends a row to the
RSVP sheet — the script is `apps-script/Code.gs`, deployment steps are in its
header, and its `/exec` URL goes in `NEXT_PUBLIC_RSVP_ENDPOINT` (see
`.env.example`; set it in Vercel too). The script writes to an `RSVP` tab, with
Vietnamese column headers, and prefixes any guest text that starts like a
formula so it cannot run in the sheet.

Apps Script cannot answer a CORS preflight, so the body goes as `text/plain` in
`no-cors` mode and the response is opaque. The form can therefore only show its
error line when the request cannot be sent at all — or when the endpoint is not
set — not when the script fails after receiving it. Send one test reply after
every redeploy of the script and check the row lands.

## Language

`src/lib/lang.tsx` holds the chosen language; `useCopy()` returns the dictionary
for it and `<LanguageToggle />` is the VIE / EN switch, which lives in the hero.
It starts on English so the server and the first client render agree, then
applies the guest's own choice — saved, or their browser's — in an effect.

All copy lives in [`src/data/copy.ts`](src/data/copy.ts) in both languages,
against a declared `Copy` type: adding a line in one language and forgetting it
in the other is a compile error, not a blank on the page. Agenda and palette
keys are pulled off the data itself, so a new event or colour cannot ship
without both translations. Everything language-NEUTRAL — dates, hex codes, file
names — stays in [`src/data/wedding.ts`](src/data/wedding.ts).

> **Re-cut means rename.** `next/image` sizes the box from the file's intrinsic
> aspect when `height: auto` is set, and the optimizer caches its output by URL
> — so re-cropping an asset in place silently keeps serving the old shape, and
> the layout goes on being built around proportions the file no longer has.
> `silk-swag.webp` is `drape.webp` re-cut; it had to be renamed to take.

## Assets

Source art and licensed font files live in `design-source/` — **outside**
`public/`, so they are never deployed. `public/img/` holds the web-optimised
WebP derivatives (~2 MB total, down from 134 MB), and `assets/retired/` holds
art a redesign superseded. The brand fonts are woff2 in `src/fonts/`, loaded
through `next/font/local`; Noto Serif Display, the Vietnamese stand-in for
Mencken, comes through `next/font/google`. Subsetting a font does not add glyphs
it never had — check a face's Vietnamese coverage before giving it Vietnamese
copy (see *Type*).

## Still to be filled in

- `guest.name` in [`src/data/wedding.ts`](src/data/wedding.ts) — hardcoded,
  pending the personalisation backend
- `NEXT_PUBLIC_RSVP_ENDPOINT` — the RSVP form is wired, but posts nowhere until
  the Apps Script is deployed and its URL is set (see *RSVP*)

The couple's photographs are exported from `design-source/couple/` (git-ignored,
full resolution) to `public/img/couple/`, WebP. The intro photo and the six
agenda prints are hand-cropped — see *The intro* and *The agenda*. Full-resolution
originals do not belong in `public/`: everything there is deployed.
