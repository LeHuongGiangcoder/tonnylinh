import type { Metadata, Viewport } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tonny & Linh — Wedding Invitation",
  description:
    "With hearts full of joy, Tonny and Linh invite you to celebrate their wedding day — 6 December 2026, An Lam Retreat, Saigon River House.",
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
