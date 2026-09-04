# Tonny & Linh — Design System

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

Fluid sizes: `--text-couple`, `--text-display`, `--text-h1`, `--text-h2`,
`--text-stat`, `--text-lead`, `--text-body`, `--text-small`, `--text-eyebrow`.

## Layout rules

- `--page-gutter: 1.5rem` — horizontal padding on every section
- `--content-max: 32rem` — reading column
- `--section-y` / `--section-y-tight` — section vertical padding
- `--space-3xs … --space-2xl` — the only vertical gaps to use

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
| `ground--red` | `red background.png` damask | time & venue, dress code | on-dark |
| `ground--cream` | `2.png` cream damask | gallery, agenda, rsvp | ink |

`ground--silk` lays a radial scrim over the drape via `::before` so type stays
legible across its highlights.

Heading, eyebrow, label and agenda-time colours flip automatically with the
ground — no per-section overrides needed.

**There are no section dividers.** Sections butt straight against each other and
the change of ground *is* the break.

## Buttons

Base `.btn` plus exactly one modifier. All are 48px tall for touch.

- `.btn--gold` — primary, solid gold
- `.btn--wine` — primary on a cream ground
- `.btn--outline` — secondary, gold hairline on a dark ground
- `.btn--block` — full width

## Other components

`.card` (gold hairline frame) · `.panel` (solid ivory) · `.field` `.label`
`.input` `.select` `.textarea` · `.choice-group` `.choice` (radio pills) ·
`.agenda` `.agenda__item` · `.gallery` `.gallery__item` · `.emblem` (via
`<Emblem>`, a gold motif centred above a section label) · `.reveal` (via
`<Reveal>`)

**Nothing on the page is dimmed.** Ornaments and dividers are always full
opacity; the only `opacity` below 1 is the disabled button state.

## The intro

`src/components/Intro.tsx`. Pressing the wax seal runs one sequence: the seal
breaks, the flap hinges open, the letter rides up out of the envelope reading
"You are invited", and the overlay hands over to the hero. A tap anywhere skips
ahead once the letter is up.

The flap and the front pocket are the **same photograph**, split along the
envelope's mouth — the straight V where its side flaps meet, measured off the
artwork's own seam and stored as `--mouth` (0% 57% → 50% 79.5% → 100% 57%).

The ornate scallop is *embossing carried on the flap*, not the flap's edge:
cutting along the scallop tears away real envelope front and leaves a huge hole
where solid paper should be. The mouth seam is the cut that matters.

The envelope is layered, not cut apart — an earlier version clipped the body
along the flap's edge, which sliced the body's own top corners off and left it
looking torn:

| z | Layer | |
|---|---|---|
| 5 | `.envelope__seal` | the wax seal; the button you press |
| 4 → 0 | `.envelope__flap` | the artwork clipped to the flap's die-cut silhouette (`--flap-edge`), hinged on the top edge. Drops behind the card once it is over |
| 3 | `.envelope__patch` | `env-patch.webp` — plain paper that fades in over the *printed* flap as the real one lifts away |
| 2 | `.envelope__body` | the artwork, **whole and uncut**: a full rectangle keeping its own edges and its side/bottom-flap seams |
| 1 | `.envelope__well` → `.letter` | the card, riding up **behind** the body |

Because the body is opaque and uncut, the card can only ever appear above its
top edge — nothing can spill out of the bottom, and the envelope keeps its
outline. The flap folds to `rotateX(-176deg)` so the whole flap shows above the
envelope with its apex at the top centre, the way an opened envelope reads
head-on. Its reverse is a second, plain-paper face on the mirrored clip.

`env-patch.webp` is built by `scripts/` logic in the session: the flap's
silhouette swept down-and-right (that is where its shadow falls), filled with
the artwork's own paper grain quilted from the plain band below the flap, toned
to the plain-paper brightness read off the left and right margins, with the
side-flap seams carried up to where they meet and a soft shadow under the fold.

The card:

- `letter-card.webp` is the artwork with its **foot cropped away** (top 82%).
  The card never rises full height, so its arched foot was never seen — but that
  arch kept peeking. A straight cut tucks cleanly.
- Closed: `translate: -50% 30%` puts the card's head below the envelope's top
  edge, hidden behind the opaque body.
- Open: `translate: -50% -18%` clears about 40% of the card above the top edge.
  `.letter__content` is top-aligned, since only the card's top is ever visible.

> Note: `next/image` sizes the box from the **file's** intrinsic aspect when
> `height: auto` is set, and the optimizer caches by URL — so re-cropping an
> asset in place silently keeps the old shape. Rename the file to re-cut it.

## Assets

Source art and licensed font files live in `design-source/` — **outside**
`public/`, so they are never deployed. `public/img/` holds the web-optimised
WebP derivatives (~800 KB total, down from 134 MB). Fonts are subset to
Latin + Vietnamese woff2 in `src/fonts/` and loaded through `next/font/local`.

## Still to be filled in

All copy lives in [`src/data/wedding.ts`](src/data/wedding.ts):

- `wedding.date*` — **placeholder date** (21 Nov 2026)
- `wedding.venue` — **placeholder venue and map link**
- `guest.name` — hardcoded, pending the personalisation backend
- `gallery[].src` — `null` until the couple's photos land in `public/gallery/`
- `Rsvp.handleSubmit` — currently local state only; needs the real endpoint
