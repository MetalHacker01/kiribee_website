import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

// Bodoni Moda (OFL) echoes the high-contrast serif of the Kiribee wordmark.
// Static instances (weight 450, optical size 24) subset to Latin plus the
// Albanian letters: 28 kB instead of 98 kB for the variable files.
const display = localFont({
  src: [
    { path: "./fonts/BodoniModa-450.woff2", weight: "400 500", style: "normal" },
    { path: "./fonts/BodoniModa-450-Italic.woff2", weight: "400 500", style: "italic" },
  ],
  variable: "--font-bodoni",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kiribee.com"),
  title: { default: "Kiribee", template: "%s · Kiribee" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      className={`${sans.variable} ${display.variable}`}
    >
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
