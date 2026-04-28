import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale, getTranslations } from "next-intl/server";
import { locales, type Locale } from "@/i18n";
import { buildMetadata } from "@/lib/seo";
import {
  organizationJsonLd,
  localBusinessJsonLd,
  websiteJsonLd,
  productsJsonLd,
} from "@/lib/seo";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { Nav } from "@/components/nav/Nav";
import type { Metadata } from "next";

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
  const messages = await getMessages();

  const ldOrganization = organizationJsonLd();
  const ldLocalBusiness = localBusinessJsonLd(locale as Locale);
  const ldWebsite = websiteJsonLd();
  const ldProducts = productsJsonLd(locale as Locale);

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {/* Set html lang dynamically via script — simpler than restructuring root layout */}
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(locale)};`,
        }}
      />

      <SmoothScroll />
      <Nav locale={locale} />
      <main id="main">{children}</main>

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldLocalBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldWebsite) }}
      />
      {ldProducts.map((p, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(p) }}
        />
      ))}
    </NextIntlClientProvider>
  );
}
