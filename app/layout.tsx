import "./globals.css";
import type { Metadata } from "next";
import { Inter, Fraunces, Caveat } from "next/font/google";

const sans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const display = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const accent = Caveat({
  subsets: ["latin", "latin-ext"],
  variable: "--font-accent",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://kiribee.com"),
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
      className={`${sans.variable} ${display.variable} ${accent.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
