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

/** Where honeymoon gifts go. `qr` is a VietQR (NAPAS 247) code for exactly
 *  this account, with no amount set — regenerate it if the account changes. */
export const honeymoon = {
  bank: "Techcombank",
  accountName: "CHU DIEU LINH",
  accountNumber: "1903 2957 0500 18",
  qr: "/img/honeymoon-qr.svg",
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

/** The photograph set in the gilt frame on the hero. */
export const heroPhoto = {
  src: "/img/couple/hero.webp",
  width: 1067,
  height: 1600,
} as const;

/** The gallery, one film-strip frame per slide, three photographs to each.
 *  A `portrait` frame lays its three side by side; a `landscape` frame stacks
 *  them like stills from a film. Files are the web cuts of
 *  design-source/couple/gallery/<frame>.<shot>.jpg. `caption` is optional and
 *  runs over the foot of a landscape still, like a subtitle. */
export type GalleryFrame = {
  shape: "portrait" | "landscape";
  shots: { src: string; caption?: string }[];
};

const shots = (frame: number) =>
  [1, 2, 3].map((shot) => ({ src: `/img/couple/gallery-${frame}-${shot}.webp` }));

export const gallery: GalleryFrame[] = [
  { shape: "portrait", shots: shots(1) },
  { shape: "landscape", shots: shots(2) },
  { shape: "landscape", shots: shots(3) },
  { shape: "landscape", shots: shots(4) },
  { shape: "portrait", shots: shots(5) },
];
