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

/** TAN Aegean / TAN Pearl — reserved display faces from the brand system. */
export const tanAegean = localFont({
  src: "../fonts/tan-aegean.woff2",
  weight: "400",
  variable: "--ff-display",
  display: "swap",
});

export const tanPearl = localFont({
  src: "../fonts/tan-pearl.woff2",
  weight: "400",
  variable: "--ff-pearl",
  display: "swap",
});

export const fontVariables = [
  cormorant.variable,
  alexBrush.variable,
  edwardian.variable,
  mencken.variable,
  tanAegean.variable,
  tanPearl.variable,
].join(" ");
