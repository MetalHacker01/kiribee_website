"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { Reveal } from "../motion/Reveal";
import { PROCESS_STEPS } from "@/lib/content";

export function Process() {
  const t = useTranslations("process");
  const locale = useLocale() as "en" | "sq";
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  // Animation completes near the very end of the section so the trailing
  // empty space stays minimal.
  const x = useTransform(
    scrollYProgress,
    [0, 0.95],
    reduce ? ["0%", "0%"] : ["4%", "-62%"]
  );

  return (
    <section id="process" className="relative scroll-mt-24 bg-cream-50 pt-24 sm:pt-32 lg:pt-36 pb-2 sm:pb-4">
      <div className="container-wide">
        <Reveal>
          <div className="flex flex-col gap-3 sm:gap-5 max-w-2xl">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="h-display text-4xl sm:text-5xl lg:text-6xl text-balance">
              {t("title")}
            </h2>
            <p className="mt-2 text-lg text-wax-900/70 text-pretty">
              {t("subtitle")}
            </p>
          </div>
        </Reveal>
      </div>

      {/* Desktop horizontal scroll, mobile vertical stack */}
      <div ref={ref} className="hidden lg:block relative h-[140vh] mt-2">
        <div className="sticky top-0 flex h-screen items-center overflow-hidden">
          <motion.div style={{ x }} className="flex gap-8 pl-12 pr-12 will-change-transform">
            {PROCESS_STEPS.map((s) => (
              <article
                key={s.step}
                className="relative flex w-[28rem] shrink-0 flex-col justify-between overflow-hidden rounded-3xl border border-wax-900/10 bg-beeswax-100/40 p-10 shadow-soft-cream"
              >
                <div className="absolute -right-6 -top-10 font-display text-[14rem] leading-none text-amber-700/15 select-none pointer-events-none">
                  {s.step}
                </div>
                <div className="relative">
                  <span className="eyebrow">step {s.step}</span>
                  <h3 className="h-display mt-4 text-3xl text-wax-900 text-balance">
                    {s.title[locale]}
                  </h3>
                </div>
                <p className="relative mt-12 text-base leading-relaxed text-wax-900/75 text-pretty">
                  {s.body[locale]}
                </p>
              </article>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Mobile / tablet stack */}
      <div className="lg:hidden container-wide mt-16 grid gap-6">
        {PROCESS_STEPS.map((s, i) => (
          <Reveal
            as="article"
            key={s.step}
            delay={i * 0.06}
            className="relative overflow-hidden rounded-3xl border border-wax-900/10 bg-beeswax-100/40 p-7"
          >
            <div className="absolute -right-3 -top-7 font-display text-[10rem] leading-none text-amber-700/15 select-none pointer-events-none">
              {s.step}
            </div>
            <span className="eyebrow">step {s.step}</span>
            <h3 className="h-display mt-3 text-2xl text-wax-900 text-balance">
              {s.title[locale]}
            </h3>
            <p className="mt-4 text-base leading-relaxed text-wax-900/75 text-pretty">
              {s.body[locale]}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
