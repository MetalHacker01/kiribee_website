import {
  SITE,
  FEATURED_CANDLES,
  PROCESS_STEPS,
  BENEFITS,
  PULL_QUOTE,
  ATTRIBUTION,
  ABOUT_ANA,
  WRAPS,
} from "./content";
import type { Locale } from "@/i18n";

const STRINGS = {
  en: {
    title: "Kiribee · Hand-poured beeswax candles from Albania",
    sub: "Made by Ana & Aldo in Tirana with 100% Albanian beeswax",
    storyHeading: "Our story",
    storyP1:
      "Ana and Aldo are a couple from Tirana, Albania. During the COVID pandemic, they taught themselves the craft of working with beeswax and noticed a gap in the Albanian market for genuine beeswax candles. They decided to be the first to fill it.",
    storyP2:
      "Today every Kiribee candle is poured by hand, from 100% pure Albanian beeswax. No chemicals, no shortcuts, no compromises. Their mission is small but stubborn: to give people a reason to slow down.",
    aboutHeading: "Meet Ana",
    aboutBody:
      "Ana co-founded Kiribee with her partner Aldo. Her background is in Banking & Financial Management, but art is the thing that pulls her out of the ordinary day. She is the steady hand behind every Kiribee candle.",
    benefitsHeading: "Why beeswax",
    processHeading: "How a Kiribee candle is made",
    candlesHeading: "Featured candles",
    wrapsHeading: "Beeswax food wraps",
    wrapsBody:
      "Kiribee also makes beeswax food wraps, a reusable, washable, plastic-free alternative to cling film. Cotton soaked in beeswax, tree resin, and jojoba oil. Naturally antibacterial. Reusable for up to a year.",
    contactHeading: "Contact",
    contactBody:
      "Custom dedications, bulk orders, gifts, food wraps, write to us and Ana or Aldo will reply personally.",
    location: "Based in Tirana, Albania, ships across the country.",
    quoteCredit: `As featured in ${ATTRIBUTION.source} (${ATTRIBUTION.date}).`,
  },
  sq: {
    title: "Kiribee · Qirinj me dyll bleta të bërë me dorë në Shqipëri",
    sub: "Bërë nga Ana & Aldo në Tiranë me 100% dyll bleta shqiptar",
    storyHeading: "Historia jonë",
    storyP1:
      "Ana dhe Aldo janë një çift nga Tirana, Shqipëri. Gjatë pandemisë së COVID-it, mësuan vetë artin e punës me dyll bleta dhe vunë re një hapësirë në tregun shqiptar për qirinj të vërtetë me dyll bleta. Vendosën të jenë të parët që e mbushin atë.",
    storyP2:
      "Sot çdo qiri Kiribee derdhet me dorë, nga 100% dyll bleta i pastër shqiptar. Pa kimikate, pa shkurtesa, pa kompromise. Misioni i tyre është i vogël por kokëfortë: t'u japin njerëzve një arsye për të ngadalësuar.",
    aboutHeading: "Njihu me Anën",
    aboutBody:
      "Ana është bashkëthemeluese e Kiribee së bashku me partnerin e saj Aldo. Sfondi i saj është në Menaxhim Bankar dhe Financiar, por arti është gjëja që e nxjerr nga dita e zakonshme. Ajo është dora e qetë pas çdo qiriu Kiribee.",
    benefitsHeading: "Pse dyll bleta",
    processHeading: "Si bëhet një qiri Kiribee",
    candlesHeading: "Qirinj të zgjedhur",
    wrapsHeading: "Mbështjellës ushqimi me dyll bleta",
    wrapsBody:
      "Kiribee bën gjithashtu mbështjellës ushqimi me dyll bleta, alternativa e ripërdorshme, e lashme dhe pa plastikë ndaj plastikës ngjitëse. Pambuk i lyer me dyll bleta, rrëshirë peme dhe vaj jojoba. Antibakterial natyralisht. I ripërdorshëm deri në një vit.",
    contactHeading: "Kontakt",
    contactBody:
      "Kushtime të personalizuara, porosi me shumicë, dhurata, mbështjellës ushqimi, na shkruaj dhe Ana ose Aldo do të të përgjigjen personalisht.",
    location: "Me bazë në Tiranë, Shqipëri, dërgon në të gjithë vendin.",
    quoteCredit: `Pjesë e veçantë në ${ATTRIBUTION.source} (${ATTRIBUTION.date}).`,
  },
} as const;

export function buildPageMarkdown(locale: Locale = "en"): string {
  const s = STRINGS[locale];

  const benefitsList = BENEFITS.map(
    (b) => `- **${b.title[locale]}** · ${b.body[locale]}`
  ).join("\n");

  const processList = PROCESS_STEPS.map(
    (p) => `${p.step}. **${p.title[locale]}** · ${p.body[locale]}`
  ).join("\n");

  const candlesList = FEATURED_CANDLES.map(
    (c) =>
      `### ${c.name}${c.signature ? " *(bestseller)*" : ""}\n${c.blurb[locale]}\n`
  ).join("\n");

  const factsList = ABOUT_ANA.facts[locale].map((f) => `- ${f}`).join("\n");

  const wrapsList = WRAPS.benefits
    .map((b) => `- **${b.title[locale]}** · ${b.body[locale]}`)
    .join("\n");

  return `# ${s.title}

> ${s.sub}

${s.location}

- Website: ${SITE.url}
- Email: ${SITE.email}
- Instagram: ${SITE.instagramHandle} · ${SITE.instagram}
- Facebook: ${SITE.facebook}
- Founders: ${SITE.founders.join(" & ")}
- Founded: ${SITE.founded}
- Location: ${SITE.city}, ${SITE.countryName}

---

## ${s.storyHeading}

${s.storyP1}

${s.storyP2}

> "${PULL_QUOTE[locale]}"
> Ana & Aldo · ${s.quoteCredit}

---

## ${s.aboutHeading}

${s.aboutBody}

${factsList}

---

## ${s.benefitsHeading}

${benefitsList}

---

## ${s.processHeading}

${processList}

---

## ${s.candlesHeading}

${candlesList}

---

## ${s.wrapsHeading}

${s.wrapsBody}

${wrapsList}

---

## ${s.contactHeading}

${s.contactBody}

- Email: ${SITE.email}
- WhatsApp: ${SITE.whatsappDisplay}
- Instagram DM: ${SITE.instagram}
- Facebook: ${SITE.facebook}

${s.location}

---

This page is also available in:
- English · ${SITE.url}/en
- Albanian · ${SITE.url}/sq

Plain-text/markdown copies for AI agents:
- ${SITE.url}/index.md
- ${SITE.url}/home.md
- ${SITE.url}/llms.txt
`;
}

export function buildLlmsTxt(): string {
  return `# Kiribee

> Hand-poured 100% Albanian beeswax candles, made in Tirana by Ana & Aldo. Also makes reusable beeswax food wraps.

Kiribee is a small artisan brand founded in ${SITE.founded}. Every candle is poured by hand from pure Albanian beeswax, eco-friendly, hypoallergenic, free of chemical compounds, and slow-burning. Bestseller: BeeQuite, a sculpted candle of a hand cradling a child. Kiribee also produces beeswax food wraps as a plastic-free, reusable kitchen alternative.

## Canonical content

- [Full English page (markdown)](${SITE.url}/index.md)
- [Full Albanian page (markdown)](${SITE.url}/sq/index.md)
- [HTML · English](${SITE.url}/en)
- [HTML · Albanian](${SITE.url}/sq)
- [Sitemap](${SITE.url}/sitemap.xml)

## Contact

- Email: ${SITE.email}
- Instagram: ${SITE.instagram}
- Facebook: ${SITE.facebook}
- WhatsApp: ${SITE.whatsappDisplay}
- Location: ${SITE.city}, ${SITE.countryName}

## Featured candles

${FEATURED_CANDLES.map((c) => `- ${c.name}${c.signature ? " (bestseller)" : ""}: ${c.blurb.en}`).join("\n")}

## Other products

- Beeswax food wraps, reusable, washable, plastic-free alternative to cling film. Cotton + beeswax + tree resin + jojoba oil. Up to a year of use, naturally antibacterial, fully biodegradable.
`;
}
