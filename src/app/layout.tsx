import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";

const title = "Linh & Tony — Wedding Invitation";
const description =
  "With hearts full of joy, Linh and Tony invite you to celebrate their wedding day — 6 December 2026, An Lam Retreat, Saigon River House.";

/* The preview picture shared links show is opengraph-image.jpg (and
   twitter-image.jpg) beside this file — a 1200 × 630 crop of
   gallery-4-1. metadataBase turns its path into the absolute URL that
   Facebook, Zalo and Messenger need. */
export const metadata: Metadata = {
  metadataBase: new URL("https://tonnylinh.vercel.app"),
  title,
  description,
  openGraph: {
    type: "website",
    title,
    description,
    siteName: "Linh & Tony",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export const viewport: Viewport = {
  themeColor: "#600f20",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${fontVariables} h-full antialiased`}>
      <body className="min-h-full">{children}</body>
    </html>
  );
}
