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
| `ground--red` | `red background.png` damask | time & venue, dress code | on-dark |
| `ground--cream` | `2.png` cream damask | gallery, agenda, rsvp | ink |

`ground--silk` lays a radial scrim over the drape via `::before` so type stays
legible across its highlights.

Heading, eyebrow, label and agenda-time colours flip automatically with the
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
checkbox pills) · `.gallery` `.gallery__lane` `.gallery__item` (the proportion
and tilt come from the data, per picture) · `.weekstrip` · `.thread`
`.thread__stop` `.thread__pearl` · `.langswitch` (via `<LanguageToggle>`) ·
`.emblem` (via `<Emblem>`, a gold motif centred above a section label) ·
`.lace` (via `<Lace>`) · `.reveal` (via `<Reveal>`)

The gallery is two lanes, not a grid, and the second lane starts lower — so no
two neighbours share a top edge and the wall reads as pinned up rather than
tabulated. The lanes are built in the component rather than left to CSS
columns, which balance their heights and reintroduce the row alignment being
avoided.

The agenda's ribbon is one continuous curve, not a chain of arcs: the stops are
read as a Catmull-Rom spline and converted to cubics in `Agenda.tsx`, so the
tangent carries THROUGH every pearl rather than being reset at it. The pearls
are laid out against the SVG's own units, not against the rows — the rows are
only as tall as their content happens to make them. `SWING` is deliberately
uneven: swings within a few units of each other read as a machine-made zig-zag
however smooth the spline through them is.

**Nothing on the page is dimmed.** Ornaments and dividers are always full
opacity; the only `opacity` below 1 is the disabled button state.

## Paper

`public/img/paper.webp` is a cotton-rag grain, tiled under every cream surface
and blended with `multiply`. It is generated in the FREQUENCY DOMAIN, not by
blurring noise: a blurred field does not tile, and its seam shows at this size.
Its mean sits at 246, so multiplying stays inside `[0.90, 1.0]` — a mid-grey
grain would halve the brightness and turn the paper to slate.

## The die-cuts

`src/components/PaperDefs.tsx`, rendered once from the page root. Two SVG
`clipPath`s in `objectBoundingBox` units, so one definition fits the intro's
envelope and the hero's at any size:

- `#env-flap` — the flap. Its sides run straight DOWN from the top corners for
  14% of its box before the diagonal starts, so the closed flap covers the
  opening right into the corners.
- `#env-mouth` — everything BELOW a V that dips to a soft point at the centre.
  Its shoulders sit at 10% of the envelope, exactly where the flap's own sides
  stop running straight down.
- `#env-fold` — the bottom flap, folded up over the pocket. Its apex sits below
  the mouth's point, so it never pokes into the opening.

They are SVG rather than `clip-path: polygon()` because paper edges are not
quite straight — but only just. The control points sit within a hundredth of the
straight line between corner and point, so an edge reads as a crease with a
little life in it. Bow them properly and the flap stops reading as folded paper
and starts reading as a swag of cloth.

## The intro

`src/components/Intro.tsx`. Pressing the wax seal breaks it, the flap hinges
back through 180°, and the invitation rides up out of the pocket. A tap
anywhere skips ahead once the card is up.

It stacks in **plain z-index**, not in 3D depth:

| z | Layer | |
|---|---|---|
| 6 | `.env__seal` | the wax; the button you press |
| 5 → 0 | `.env__flap` | the flap; drops to 0 half way through the fold |
| 3 | `.env__fold` | the bottom flap, folded up over the pocket |
| 2 | `.env__pocket` | the front, clipped to `#env-mouth` |
| 1 | `.env__card` | the invitation, in a well that clips its foot |
| 0 | `.env__back` | the back panel |

An earlier version put the whole envelope in one `preserve-3d` scene and let the
browser sort the layers by their z offsets. **It does not**: with the flap laid
back at `-11px` and the card at `-3px` it still painted the flap over the card.
So only the FLAP gets three dimensions — `.env` carries the perspective it folds
in, `.env__tilt` carries the whole envelope's tilt (an element cannot both give
its children perspective and be rotated in its own parent's 3D space) — and the
one moment the flap's order changes is a z-index swap timed to where the flap
is EDGE-ON — zero width to the viewer, so the change of order cannot be seen.

That moment is **not** half the duration. Under
`cubic-bezier(0.62, 0.02, 0.2, 1)` the flap is already at 125° by 875ms, well
past edge-on and plainly visible, and swapping there read as a pop. Solving the
curve for 90° of 179° puts it at **754ms**, and the card is held until 900ms so
it never rises into a flap that is still in front of it. Change the easing or
the duration and both numbers have to be solved again.

Three things govern how it looks:

1. **The flap must overlap the mouth it closes.** Its point sits at 67% of the
   envelope's height and the mouth's apex at 55%. Cut to meet, the flap's edge
   disappears into the mouth's and the front reads as one blank cream shape.
2. **The flap's sides and the mouth's shoulders have to agree**, at 10% of the
   envelope. Lower the shoulders and a wedge of bare back panel shows at each
   top corner, where the flap's edge has already curved away inboard; raise them
   and the card is read through a narrow triangle instead of the envelope's
   width.
3. **The card is taller than the envelope, on purpose.** Its foot has to stay
   below the mouth's point even with its head 45% clear of the top, which comes
   to 1.295 × the envelope's height — so it needs `.env__well`, open at the top
   and closed at the envelope's foot, or it spills out underneath.

Light comes from the upper left throughout, and each surface is a distinct step:
flap lightest, then the bottom flap, then the pocket, with the back panel darker
still because it is a surface in shadow seen through the mouth. When they were
all within a few units of each other the envelope read as flat shapes.

But the step is ONE step, and the highlight is warm. Pushed to four steps and
lit with an 80%-white wash the flap went cold and grey — and since the flap IS
the top of the envelope, that read as a different, whiter material pasted onto
a warm body rather than as the same sheet folded over. Highlights here are
`rgba(255, 250, 238, …)` and they stay under half strength; the fold is told by
the shadow it casts, not by its colour. That shadow is the flap's OWN die-cut
repeated on `.env__flap-face--front::before`, nudged down two pixels and
blurred, painted under the paper — a `drop-shadow` spreads round the whole
silhouette and gives a halo, and what a fold needs is a line.

## The hero

`src/components/Hero.tsx`. A flat-lay in three layers: a strip of polaroids
leaning in from the left, an OPEN envelope lying across the foot, and the
letter drawn out of it resting on top. The letter is where the invitation is
actually printed, so it is the biggest thing in the frame.

The salutation sits ABOVE the flat-lay and only the button below it, so the
page opens on a picture rather than on a header and a wall of type.

- The polaroids lean the opposite way to everything else, so the strip crosses
  the envelope instead of lying parallel to it. Each is a real polaroid — a
  wide margin all round and a much deeper one at the foot.
- The letter is the brightest thing in the frame and the envelope sits a step
  below it. When both were near-white they merged into one pale mass.
- `.hero__note` is a scrap of the couple's own paper at the bottom of the
  stack, in the negative space to the right of the letter. It is the one thing
  in the frame allowed to run off the edge: a scrap with all four corners in
  shot stops reading as a scrap. It is also knocked back with
  `brightness(0.86) saturate(0.72)` and sits barely off square — at full
  strength and 7° its red script was the loudest thing in the frame, and the
  bottom layer cannot be the brightest one. It is shown as it is — no
  knock-back and no shadow of its own — and it leans AGAINST the photo strip:
  the strip tips +7° on the left and the scrap −7° on the right, so the pile
  opens like a fan instead of listing to one side.
- The bow sits OUTSIDE `.polaroid`. That is a stacking context of its own, so a
  bow inside it can never come forward of the letter however high its z-index.
- The seal sits on the point of the envelope's mouth, which is the one place in
  the frame that centres the whole arrangement.
- The salutation spaces itself with margins rather than a `gap`, because DEAR
  belongs tight to the name under it and one row gap cannot say that.
- All three are positioned in percentages of one box, `.hero__scene`, so the
  composition scales with the column and nothing in it is in `rem`. Percentage
  padding resolves against the CONTAINING BLOCK's width, not the element's own.

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
art a redesign superseded. Fonts are subset to
Latin + Vietnamese woff2 in `src/fonts/` and loaded through `next/font/local`.

## Still to be filled in

All copy lives in [`src/data/wedding.ts`](src/data/wedding.ts):

- `guest.name` — hardcoded, pending the personalisation backend
- `gallery[].src` — `null` until the couple's photos land in `public/gallery/`.
  The hero's film strip takes its first three frames from the same list.
- `Rsvp.handleSubmit` — currently local state only; needs the real endpoint
