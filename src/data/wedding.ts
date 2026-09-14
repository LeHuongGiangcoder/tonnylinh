/**
 * The language-neutral facts: dates, places, hex codes, file names.
 * Everything a guest READS lives in src/data/copy.ts, in both languages.
 */

export const couple = {
  groom: { initial: "T", rest: "ony" },
  bride: { initial: "L", rest: "inh" },
} as const;

export const wedding = {
  dateISO: "2026-12-06",
  dateShort: "06 . 12 . 2026",

  venue: {
    name: "An Lâm Retreat",
    hall: "Saigon River House",
    mapUrl: "https://maps.app.goo.gl/zjrW2eL4Z433c7919",
  },
} as const;

/** The short film played between the envelope and the hero. Cut down from
 *  the 4K original with ffmpeg (1920 wide, H.264, faststart) — re-export under
 *  a new name if it changes, since browsers cache by URL. */
export const film = {
  src: "/video/our-film.mp4",
  poster: "/video/our-film-poster.webp",
} as const;

/** Where honeymoon gifts go. `qr` is the bank's own VietQR (NAPAS 247) code
 *  for exactly this account, with no amount set, cropped from the Techcombank
 *  app's export (design-source/img/honeymoon-qr-techcombank.png). Replace it
 *  if the account changes. */
export const honeymoon = {
  bank: "Techcombank",
  accountName: "CHU DIEU LINH",
  accountNumber: "1903 2957 0500 18",
  /** For a transfer from abroad. */
  bankNameEn: "Vietnam Technological and Commercial Joint Stock Bank",
  swift: "VTCBVNVX",
  qr: "/img/honeymoon-qr.webp",
} as const;

/** `icon` names a file in /public/img/icon — the red line drawings that mark
 *  each stop on the ribbon. Titles are in copy.ts, keyed by `id`. */
export const agenda = [
  { id: "welcome", time: "3:00 pm", icon: "11" },
  { id: "ceremony", time: "4:00 pm", icon: "15" },
  { id: "cocktail", time: "5:00 pm", icon: "29" },
  { id: "dinner", time: "6:00 pm", icon: "33" },
  { id: "show", time: "7:30 pm", icon: "23" },
  { id: "party", time: "8:30 pm", icon: "31" },
] as const;

/** The week the wedding falls in, for the little calendar above the ribbon.
 *  6 December 2026 is a Sunday, so the strip opens on Monday 30 November. */
export const weddingWeek = {
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  dates: [30, 1, 2, 3, 4, 5, 6],
  theDay: 6,
} as const;

/** The four colours of the day, matched to the couple's mood board (deep
 *  burgundy, olive and chocolate). Names are translated in copy.ts by `id`. */
export const palette = [
  { id: "black", hex: "#111111" },
  { id: "chocolate", hex: "#36231c" },
  { id: "burgundy", hex: "#4a0c14" },
  { id: "olive", hex: "#535e1f" },
] as const;

/** The photograph set in the gilt frame on the hero. */
export const heroPhoto = {
  src: "/img/couple/hero.webp",
  width: 1067,
  height: 1600,
} as const;

/** The gallery: pages of three prints scattered on a wine board, turned like
 *  an album. `layout` names how the page is laid out, one letter per print in
 *  order — `p` a portrait slot, `l` a landscape one — and the slots themselves
 *  (polaroid or stamp, position, tilt) are in LAYOUTS in Gallery.tsx. So a
 *  photo has to go in a slot of its own shape.
 *
 *  Files are the web cuts (1400px on the long edge) of the shoot's originals,
 *  named gallery-<set>-<shot>.webp by the set they were delivered in; pages are
 *  grouped by scene rather than by set. */
export type GalleryLayout = "ppp" | "lll" | "pll" | "ppl";

export type GalleryPage = {
  layout: GalleryLayout;
  shots: readonly [string, string, string];
};

const shot = (id: string) => `/img/couple/gallery-${id}.webp`;

export const gallery: GalleryPage[] = [
  // Two portraits and the kiss, in the city
  { layout: "ppp", shots: [shot("1-1"), shot("1-3"), shot("1-2")] },
  // The café
  { layout: "lll", shots: [shot("2-1"), shot("2-2"), shot("2-3")] },
  // On the motorbike
  { layout: "pll", shots: [shot("9-1"), shot("3-1"), shot("3-3")] },
  { layout: "pll", shots: [shot("5-2"), shot("3-2"), shot("8-2")] },
  // In the street
  { layout: "pll", shots: [shot("9-2"), shot("4-2"), shot("4-3")] },
  // The opera house
  { layout: "ppl", shots: [shot("5-1"), shot("5-3"), shot("8-3")] },
  { layout: "lll", shots: [shot("8-1"), shot("4-1"), shot("9-3")] },
  // The veil
  { layout: "ppl", shots: [shot("7-1"), shot("7-3"), shot("6-2")] },
  { layout: "pll", shots: [shot("7-2"), shot("6-1"), shot("6-3")] },
];
