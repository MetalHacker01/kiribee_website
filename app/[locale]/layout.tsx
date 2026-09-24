import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { locales, type Locale } from "@/i18n";
import {
  buildMetadata,
  organizationJsonLd,
  localBusinessJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import type { Metadata } from "next";

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
    { path: "../fonts/BodoniModa-450.woff2", weight: "400 500", style: "normal" },
    { path: "../fonts/BodoniModa-450-Italic.woff2", weight: "400 500", style: "italic" },
  ],
  variable: "--font-bodoni",
  display: "swap",
  fallback: ["Georgia", "serif"],
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) return {};
  const t = await getTranslations({ locale, namespace: "meta" });
  return buildMetadata(locale as Locale, {
    title: t("title"),
    description: t("description"),
    ogAlt: t("ogAlt"),
  });
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale as Locale)) notFound();
  setRequestLocale(locale);

  // Product markup comes back once prices are on the site (Google requires them).
  const jsonLd = [organizationJsonLd(), localBusinessJsonLd(locale as Locale), websiteJsonLd()];

  return (
    <html lang={locale} className={`${sans.variable} ${display.variable}`}>
      <body>
        {children}
        {jsonLd.map((ld, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
          />
        ))}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
