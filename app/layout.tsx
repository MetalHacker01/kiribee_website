import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.kiribee.com"),
  title: { default: "Kiribee", template: "%s · Kiribee" },
};

// <html> and <body> live in app/[locale]/layout.tsx so the server can render
// lang="sq" / lang="en" directly (the next-intl pattern). Non-locale 404s
// render their own document in app/not-found.tsx.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
