"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Reveal } from "../motion/Reveal";
import { FEATURED_CANDLES } from "@/lib/content";

export function FeaturedCandles() {
  const t = useTranslations("featured");
  const locale = useLocale() as "en" | "sq";

  const bestseller = FEATURED_CANDLES.find((c) => c.signature)!;
  const others = FEATURED_CANDLES.filter((c) => !c.signature);

  return (
    <section
      id="candles"
      className="relative scroll-mt-24 py-24 sm:py-32 lg:py-36"
    >
      <div className="container-wide">
        <Reveal>
          <div className="flex flex-col gap-3 sm:gap-5 max-w-3xl">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="h-display text-4xl sm:text-5xl lg:text-6xl text-balance">
              {t("title")}
            </h2>
            <p className="mt-2 text-lg text-wax-900/70 text-pretty">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-6 lg:grid-cols-2">
          {/* Tall hero card on the left, BeeQuite */}
          <CandleCard
            candle={bestseller}
            locale={locale}
            featured
            inquireLabel={t("inquire")}
            badgeLabel={t("signatureBadge")}
          />

          {/* 2x2 grid of the other four on the right */}
          <div className="grid gap-6 sm:grid-cols-2">
            {others.map((c, i) => (
              <CandleCard
                key={c.slug}
                candle={c}
                locale={locale}
                delay={0.05 + i * 0.05}
                inquireLabel={t("inquire")}
                badgeLabel={t("signatureBadge")}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CandleCard({
  candle,
  locale,
  featured = false,
  delay = 0,
  inquireLabel,
  badgeLabel,
}: {
  candle: (typeof FEATURED_CANDLES)[number];
  locale: "en" | "sq";
  featured?: boolean;
  delay?: number;
  inquireLabel: string;
  badgeLabel: string;
}) {
  const inquireSubject = encodeURIComponent(`${inquireLabel} — ${candle.name}`);

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col overflow-hidden rounded-2xl bg-cream-50 ring-1 ring-wax-900/10 transition-shadow duration-500 hover:shadow-soft-amber ${
        featured ? "lg:aspect-auto" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-beeswax-100 ${
          featured
            ? "aspect-[4/5] lg:aspect-auto lg:flex-1"
            : "aspect-[4/5]"
        }`}
      >
        <Image
          src={candle.imageSrc}
          alt={candle.imageAlt[locale]}
          fill
          sizes={
            featured
              ? "(min-width: 1024px) 50vw, 90vw"
              : "(min-width: 1024px) 25vw, (min-width: 640px) 45vw, 90vw"
          }
          className="object-cover object-center transition-transform duration-1000 group-hover:scale-[1.04]"
        />
        {candle.signature && (
          <span className="absolute left-4 top-4 rounded-full bg-amber-700 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.22em] text-cream-50 shadow-soft-amber">
            {badgeLabel}
          </span>
        )}
      </div>
      <div className={`flex flex-col gap-3 p-6 ${featured ? "sm:p-8" : ""}`}>
        <h3
          className={`h-display text-wax-900 ${
            featured ? "text-3xl sm:text-4xl" : "text-2xl"
          }`}
        >
          {candle.name}
        </h3>
        <p
          className={`text-wax-900/70 leading-relaxed text-pretty ${
            featured ? "text-base sm:text-lg" : "text-sm"
          }`}
        >
          {candle.blurb[locale]}
        </p>
        <a
          href={`#contact?subject=${inquireSubject}`}
          onClick={(e) => prefillInquire(e, candle.name)}
          className="btn-ghost mt-2"
        >
          {inquireLabel}
          <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
            <path
              d="M2 8h11M9 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>
        </a>
      </div>
    </motion.article>
  );
}

function prefillInquire(
  e: React.MouseEvent<HTMLAnchorElement>,
  candle: string
) {
  e.preventDefault();
  const target = document.getElementById("contact");
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => {
      const ta = document.querySelector<HTMLTextAreaElement>(
        'textarea[name="message"]'
      );
      if (ta && !ta.value) {
        ta.value = `Hi! I'd love to learn more about ${candle}.`;
        ta.dispatchEvent(new Event("input", { bubbles: true }));
        ta.focus();
      }
    }, 600);
  }
}
