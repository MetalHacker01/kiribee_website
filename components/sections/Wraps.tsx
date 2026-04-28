"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Reveal } from "../motion/Reveal";
import { WRAPS } from "@/lib/content";

export function Wraps() {
  const t = useTranslations("wraps");
  const locale = useLocale() as "en" | "sq";

  return (
    <section
      id="wraps"
      className="relative scroll-mt-24 overflow-hidden bg-wax-900 text-cream-50 py-24 sm:py-32 lg:py-36"
    >
      {/* Faint warm honeycomb pattern on dark background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-[0.06] mask-fade-b"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='56' height='100' viewBox='0 0 56 100'><g fill='none' stroke='%23E8B53A' stroke-opacity='0.55' stroke-width='1'><path d='M28 0L56 16.18V49.82L28 66 0 49.82V16.18L28 0z'/><path d='M28 33.18L56 49.36V83L28 99.18 0 83V49.36L28 33.18z'/></g></svg>\")",
          backgroundSize: "56px 100px",
        }}
      />
      {/* Soft amber glow at top-right */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-32 -right-20 h-[28rem] w-[28rem] rounded-full bg-honey-500/15 blur-3xl"
      />

      <div className="container-wide grid items-start gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5 lg:sticky lg:top-28">
          <span className="text-xs uppercase tracking-[0.32em] font-medium text-honey-500">
            {t("eyebrow")}
          </span>
          <h2 className="h-display mt-6 text-4xl sm:text-5xl lg:text-6xl text-balance text-cream-50">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg text-cream-50/75 leading-relaxed text-pretty max-w-md">
            {t("lede")}
          </p>

          <div className="mt-10">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-honey-500 px-7 py-3.5 text-sm font-medium text-wax-900 transition-all duration-300 hover:bg-honey-400 hover:-translate-y-0.5 hover:shadow-soft-amber active:translate-y-0"
            >
              {t("cta")}
              <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
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
        </Reveal>

        <div className="lg:col-span-7 grid gap-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[4/5] sm:aspect-[5/4] overflow-hidden rounded-3xl ring-1 ring-cream-50/10 shadow-soft-cream"
          >
            <Image
              src={WRAPS.imageSrc}
              alt={WRAPS.imageAlt[locale]}
              fill
              sizes="(min-width: 1024px) 50vw, 90vw"
              className="object-cover"
            />
          </motion.div>

          <ul className="mt-2 grid gap-3 sm:grid-cols-2">
            {WRAPS.benefits.map((b, i) => (
              <Reveal
                as="li"
                key={i}
                delay={i * 0.05}
                className="rounded-2xl border border-cream-50/15 bg-cream-50/[0.04] p-5 transition-colors hover:bg-cream-50/[0.08]"
              >
                <h3 className="font-display text-lg text-cream-50">
                  {b.title[locale]}
                </h3>
                <p className="mt-1.5 text-sm text-cream-50/70 leading-relaxed">
                  {b.body[locale]}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
