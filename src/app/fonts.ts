import { Noto_Serif_Display } from "next/font/google";
import localFont from "next/font/local";

/** Cormorant Garamond — all body copy. Variable weight. */
export const cormorant = localFont({
  src: [
    { path: "../fonts/cormorant.woff2", weight: "300 700", style: "normal" },
    { path: "../fonts/cormorant-italic.woff2", weight: "300 700", style: "italic" },
  ],
  variable: "--ff-body",
  display: "swap",
});

/** Alex Brush — every section heading. */
export const alexBrush = localFont({
  src: "../fonts/alex-brush.woff2",
  weight: "400",
  variable: "--ff-heading",
  display: "swap",
});

/** Edwardian Script — the initial capital of each couple name. */
export const edwardian = localFont({
  src: "../fonts/edwardian.woff2",
  weight: "400",
  variable: "--ff-initial",
  display: "swap",
});

/** Mencken Std Narrow — name bodies, dates, times, and info of the same rank. */
export const mencken = localFont({
  src: "../fonts/mencken.woff2",
  weight: "400",
  variable: "--ff-name",
  display: "swap",
});

/**
 * Noto Serif Display — stands in for Mencken in Vietnamese. Mencken has no
 * Ơ, Ư, Đ or stacked tone marks; this is the nearest high-contrast narrow
 * serif that does, narrowed on its width axis to Mencken's proportions.
 */
export const notoSerifDisplay = Noto_Serif_Display({
  subsets: ["latin", "vietnamese"],
  axes: ["wdth"],
  variable: "--ff-name-vi",
  display: "swap",
});

/** TAN Aegean / TAN Pearl — reserved display faces from the brand system. */
export const tanAegean = localFont({
  src: "../fonts/tan-aegean.woff2",
  weight: "400",
  variable: "--ff-display",
  display: "swap",
  // Reserved, not set anywhere yet: don't make every guest download it
  // up front. It still loads on demand if a rule starts using it.
  preload: false,
});

export const tanPearl = localFont({
  src: "../fonts/tan-pearl.woff2",
  weight: "400",
  variable: "--ff-pearl",
  display: "swap",
  preload: false, // as tanAegean
});

export const fontVariables = [
  cormorant.variable,
  alexBrush.variable,
  edwardian.variable,
  mencken.variable,
  notoSerifDisplay.variable,
  tanAegean.variable,
  tanPearl.variable,
].join(" ");
