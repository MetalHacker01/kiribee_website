import type { Metadata } from "next";
import { SITE, SOCIAL_PROFILES } from "./content";
import type { Locale } from "@/i18n";
import { locales } from "@/i18n";

type Strings = {
  title: string;
  description: string;
  ogAlt: string;
};

export function buildMetadata(locale: Locale, m: Strings): Metadata {
  const url = `${SITE.url}/${locale}`;
  const alternates: Record<string, string> = {};
  for (const l of locales) alternates[l] = `${SITE.url}/${l}`;
  alternates["x-default"] = `${SITE.url}/sq`;

  return {
    metadataBase: new URL(SITE.url),
    // Absolute: the title already starts with the brand, so skip the
    // root "%s · Kiribee" template (it produced "Kiribee · ... · Kiribee").
    title: { absolute: m.title },
    description: m.description,
    applicationName: SITE.name,
    alternates: { canonical: url, languages: alternates },
    openGraph: {
      type: "website",
      url,
      siteName: SITE.name,
      title: m.title,
      description: m.description,
      locale: locale === "sq" ? "sq_AL" : "en_US",
      images: [
        {
          url: "/opengraph-image",
          width: 1200,
          height: 630,
          alt: m.ogAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: m.title,
      description: m.description,
      images: ["/opengraph-image"],
    },
    robots: { index: true, follow: true },
    icons: { icon: "/icon" },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE.name,
    url: SITE.url,
    logo: `${SITE.url}/icon`,
    email: SITE.email,
    foundingDate: SITE.founded,
    founder: SITE.founders.map((name) => ({ "@type": "Person", name })),
    sameAs: SOCIAL_PROFILES,
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
  };
}

export function localBusinessJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#business`,
    name: SITE.name,
    image: `${SITE.url}/opengraph-image`,
    url: `${SITE.url}/${locale}`,
    email: SITE.email,
    description:
      locale === "sq"
        ? "Qirinj me dyll blete, të punuar me dorë në Tiranë."
        : "Hand-poured beeswax candles from Tirana, Albania.",
    address: {
      "@type": "PostalAddress",
      addressLocality: SITE.city,
      addressRegion: SITE.region,
      addressCountry: SITE.country,
    },
    areaServed: { "@type": "Country", name: SITE.countryName },
    sameAs: SOCIAL_PROFILES,
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.name,
    url: SITE.url,
    inLanguage: ["en", "sq"],
  };
}
