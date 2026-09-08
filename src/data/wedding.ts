/**
 * The language-neutral facts: dates, places, hex codes, file names.
 * Everything a guest READS lives in src/data/copy.ts, in both languages.
 */

export const couple = {
  groom: { initial: "T", rest: "onny" },
  bride: { initial: "L", rest: "inh" },
  hashtag: "#TonnyAndLinh",
} as const;

export const wedding = {
  dateISO: "2026-12-06",
  dateShort: "06 . 12 . 2026",

  venue: {
    name: "An Lâm Retreat",
    hall: "Saigon River House",
    mapUrl:
      "https://maps.google.com/?q=An+Lam+Retreat+Saigon+River,+Thuan+An,+Binh+Duong",
  },
} as const;

/** Hardcoded for now — the backend will personalise this per invitation. */
export const guest = {
  name: "Mr. & Mrs. Nguyen",
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

/** The four colours of the day. Names are translated in copy.ts by `id`. */
export const palette = [
  { id: "black", hex: "#111111" },
  { id: "chocolate", hex: "#3a2a22" },
  { id: "burgundy", hex: "#600f20" },
  { id: "olive", hex: "#6e7a33" },
] as const;

/** Gallery slots. Dealt alternately into two offset lanes, so `ratio` is what
 *  keeps the two from falling back into rows — no two consecutive entries
 *  should share one. `tilt` is the degrees the picture hangs off square. Drop
 *  files into /public/gallery and fill in `src`. */
export const gallery: { src: string | null; ratio: string; tilt?: number }[] = [
  { src: null, ratio: "3 / 4", tilt: -2.5 },
  { src: null, ratio: "2 / 3", tilt: 1.8 },
  { src: null, ratio: "1 / 1", tilt: -1.2 },
  { src: null, ratio: "3 / 4", tilt: 2.2 },
  { src: null, ratio: "2 / 3", tilt: -1.6 },
  { src: null, ratio: "4 / 5", tilt: 1.4 },
  { src: null, ratio: "3 / 4", tilt: -2 },
  { src: null, ratio: "1 / 1", tilt: 2 },
];
