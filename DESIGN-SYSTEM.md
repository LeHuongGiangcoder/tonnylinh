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
<section class="section ground--cream">        <!-- or ground--damask / ground--silk -->
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

| Class | Art | Text colour |
|---|---|---|
| `ground--silk` | `1.png` red silk | on-dark (auto-darkened by `::before`) |
| `ground--cream` | `2.png` cream damask | ink |
| `ground--damask` | `3.png` burgundy damask | on-dark |

Heading, eyebrow, label and agenda-time colours flip automatically with the
ground — no per-section overrides needed.

## Buttons

Base `.btn` plus exactly one modifier. All are 48px tall for touch.

- `.btn--gold` — primary, solid gold
- `.btn--wine` — primary on a cream ground
- `.btn--outline` — secondary, gold hairline on a dark ground
- `.btn--block` — full width

## Other components

`.card` (gold hairline frame) · `.panel` (solid ivory) · `.field` `.label`
`.input` `.select` `.textarea` · `.choice-group` `.choice` (radio pills) ·
`.agenda` `.agenda__item` · `.gallery` `.gallery__item` · `.ornament` ·
`.reveal` (via `<Reveal>`)

Dividers: `<RibbonDivider />` (the silk ribbon, `10.png`) and
`<LaceDivider className="ground--damask" />` (`section divider.png` — needs a
dark ground to read).

## Assets

Source art and licensed font files live in `design-source/` — **outside**
`public/`, so they are never deployed. `public/img/` holds the web-optimised
WebP derivatives (828 KB total, down from 134 MB). Fonts are subset to
Latin + Vietnamese woff2 in `src/fonts/` and loaded through `next/font/local`.

## Still to be filled in

All copy lives in [`src/data/wedding.ts`](src/data/wedding.ts):

- `wedding.date*` — **placeholder date** (21 Nov 2026)
- `wedding.venue` — **placeholder venue and map link**
- `guest.name` — hardcoded, pending the personalisation backend
- `gallery[].src` — `null` until the couple's photos land in `public/gallery/`
- `Rsvp.handleSubmit` — currently local state only; needs the real endpoint
