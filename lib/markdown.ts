import { SITE } from "./content";
import { getCopy } from "@/components/home/copy";
import type { Locale } from "@/i18n";

// Plain markdown copies of the homepage for AI agents (/index.md, /sq/index.md,
// /llms.txt). Built from the same copy the page renders, so they never drift.

const LABELS = {
  en: { contact: "Contact", wraps: "Beeswax food wraps", facts: "A few things about Ana", also: "This page is also available in", agents: "Plain-text copies for AI agents" },
  sq: { contact: "Kontakt", wraps: "Mbështjellëse ushqimi me dyll blete", facts: "Disa gjëra për Anën", also: "Kjo faqe është edhe në", agents: "Kopje me tekst të thjeshtë për agjentët AI" },
} as const;

export function buildPageMarkdown(locale: Locale = "en"): string {
  const c = getCopy(locale);
  const l = LABELS[locale];
  const bestseller = locale === "sq" ? "më i shituri" : "bestseller";

  const candles = c.collection.candles
    .map((cd) => `### ${cd.name}${cd.signature ? ` *(${bestseller})*` : ""}\n${cd.blurb}\n`)
    .join("\n");
  const benefits = c.benefits.items.map((b) => `- **${b.title}**: ${b.body}`).join("\n");
  const steps = c.process.steps.map((p, i) => `${i + 1}. **${p.title}**: ${p.body}`).join("\n");
  const facts = c.story.facts.map((f) => `- **${f.label}**: ${f.text}`).join("\n");
  const wraps = c.wraps.items.map((b) => `- **${b.title}**: ${b.body}`).join("\n");

  return `# Kiribee · ${c.hero.eyebrow}

> ${c.hero.lede}

${c.contact.location}

- Website: ${SITE.url}
- Email: ${SITE.email}
- Instagram: ${SITE.instagramHandle} · ${SITE.instagram}
- Facebook: ${SITE.facebook}
- WhatsApp: ${SITE.whatsappDisplay}
- Founders: ${SITE.founders.join(" & ")}
- Founded: ${SITE.founded}
- Location: ${SITE.city}, ${SITE.countryName}

---

## ${c.collection.eyebrow}: ${c.collection.title}

${c.collection.subtitle}

${candles}
---

## ${c.benefits.eyebrow}: ${c.benefits.title}

${c.benefits.factValue.toLocaleString("en-US")} ${c.benefits.factLabel} ${c.benefits.factAfter}

${benefits}

---

## ${c.process.eyebrow}: ${c.process.title}

${c.process.subtitle}

${steps}

---

## ${c.burn.title}

${c.burn.body}

---

## ${c.story.eyebrow}: ${c.story.title}

${c.story.p1}

${c.story.p2}

> "${c.story.quote}"
> ${c.story.credit} ${c.story.creditSource}

${c.story.p3}

${c.story.signature}

### ${l.facts}

${facts}

---

## ${l.wraps}

${c.wraps.lede}

${wraps}

---

## ${l.contact}

${c.contact.subtitle}

- Email: ${SITE.email}
- WhatsApp: ${SITE.whatsappDisplay}
- Instagram: ${SITE.instagram}
- Facebook: ${SITE.facebook}

${c.contact.location}

---

${l.also}:
- Shqip · ${SITE.url}/sq
- English · ${SITE.url}/en

${l.agents}:
- ${SITE.url}/sq/index.md
- ${SITE.url}/en/index.md
- ${SITE.url}/llms.txt
`;
}

export function buildLlmsTxt(): string {
  const en = getCopy("en");
  const sq = getCopy("sq");
  return `# Kiribee

> Handmade 100% Albanian beeswax candles from Tirana, Albania, made by Ana & Aldo. In Albanian: ${sq.hero.eyebrow.toLowerCase()}. Also makes reusable beeswax food wraps.

Kiribee is a small artisan brand founded in ${SITE.founded}. Every candle is made by hand from pure Albanian beeswax: eco-friendly, hypoallergenic, free of chemical compounds and slow-burning. Pieces can be personalised with names and dedications, and are popular as wedding, anniversary and family gifts. Bestseller: BeeQuite, a sculpted candle of a hand cradling a child. Kiribee ships across Albania.

## Canonical content

- [Albanian page, markdown](${SITE.url}/sq/index.md)
- [English page, markdown](${SITE.url}/en/index.md)
- [HTML, Albanian](${SITE.url}/sq)
- [HTML, English](${SITE.url}/en)
- [Sitemap](${SITE.url}/sitemap.xml)

## Contact

- Email: ${SITE.email}
- Instagram: ${SITE.instagram}
- Facebook: ${SITE.facebook}
- WhatsApp: ${SITE.whatsappDisplay}
- Location: ${SITE.city}, ${SITE.countryName}

## Candles

${en.collection.candles.map((c) => `- ${c.name}${c.signature ? " (bestseller)" : ""}: ${c.blurb}`).join("\n")}

## Other products

- ${en.wraps.title} ${en.wraps.lede}
`;
}
