/**
 * Single source of truth for every piece of copy on the site.
 * Edit here — the sections read from this file and nowhere else.
 *
 * TODO(client): fields marked PLACEHOLDER still need the real details.
 */

export const couple = {
  groom: { initial: "T", rest: "onny" },
  bride: { initial: "L", rest: "inh" },
  hashtag: "#TonnyAndLinh",
} as const;

export const wedding = {
  /** PLACEHOLDER — swap for the real date. */
  dateISO: "2026-11-21",
  dateLong: "Saturday, 21 November 2026",
  dateShort: "21 . 11 . 2026",
  day: "Saturday",

  /** PLACEHOLDER — swap for the real venue. */
  venue: {
    name: "The Grand Pavilion",
    hall: "Rose Ballroom, 2nd Floor",
    address: "123 Nguyen Hue Boulevard, District 1, Ho Chi Minh City",
    mapUrl: "https://maps.google.com/?q=The+Grand+Pavilion+Ho+Chi+Minh+City",
  },
} as const;

/** Hardcoded for now — the backend will personalise this per invitation. */
export const guest = {
  name: "Mr. & Mrs. Nguyen",
} as const;

/** `icon` names a file in /public/img/icon — the red line drawings that mark
 *  each stop on the thread. */
export const agenda = [
  { time: "3:00 pm", title: "Welcome Guests", icon: "11" },
  { time: "4:00 pm", title: "Wedding Ceremony", icon: "15" },
  { time: "5:00 pm", title: "Cocktail Hour", icon: "29" },
  { time: "6:00 pm", title: "Dinner", icon: "33" },
  { time: "7:30 pm", title: "Mini Show", icon: "23" },
  { time: "8:30 pm", title: "After Party", icon: "31" },
] as const;

/** The week the wedding falls in, for the little calendar above the thread. */
export const weddingWeek = {
  month: "November 2026",
  days: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  dates: [16, 17, 18, 19, 20, 21, 22],
  theDay: 21,
} as const;

export const dresscode = {
  title: "Dress Code",
  note: "Formal & Elegant",
  description:
    "We would love to see you in shades that echo our day — deep wine, warm ivory and antique gold. Please avoid white and bright red so our couple portraits stay unmistakably ours.",
  palette: [
    { name: "Wine", hex: "#600f20" },
    { name: "Ivory", hex: "#f9f3e8" },
    { name: "Gold", hex: "#a48210" },
    { name: "Rosewood", hex: "#7d2436" },
    { name: "Champagne", hex: "#e2d3b8" },
  ],
} as const;

/** Gallery slots. Drop files into /public/gallery and fill in `src`. */
export const gallery: { src: string | null; alt: string; wide?: boolean }[] = [
  { src: null, alt: "Tonny and Linh, portrait", wide: true },
  { src: null, alt: "Tonny and Linh, engagement" },
  { src: null, alt: "Tonny and Linh, candid" },
  { src: null, alt: "Tonny and Linh, together" },
  { src: null, alt: "Tonny and Linh, detail" },
];

export const rsvp = {
  deadline: "Please reply before 1 November 2026",
} as const;
