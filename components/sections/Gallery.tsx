"use client";

import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Reveal } from "../motion/Reveal";
import { GALLERY } from "@/lib/gallery";
import { SITE } from "@/lib/content";

const SPAN_PATTERN = [
  "sm:row-span-2",
  "",
  "",
  "",
  "lg:col-span-2",
  "",
  "",
  "",
  "sm:col-span-2",
];

export function Gallery() {
  const t = useTranslations("gallery");
  const locale = useLocale() as "en" | "sq";

  return (
    <section id="gallery" className="relative scroll-mt-24 bg-beeswax-100/40 py-24 sm:py-32 lg:py-36">
      <div className="container-wide">
        <Reveal>
          <div className="flex flex-col gap-3 sm:gap-5 max-w-2xl">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="h-display text-4xl sm:text-5xl lg:text-6xl text-balance">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <div className="mt-14 grid grid-flow-dense grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[12rem] sm:auto-rows-[16rem] lg:auto-rows-[18rem]">
          {GALLERY.map((g, i) => (
            <motion.figure
              key={g.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{
                duration: 0.7,
                delay: (i % 4) * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`relative overflow-hidden rounded-xl bg-beeswax-200/60 ${SPAN_PATTERN[i] ?? ""}`}
            >
              <Image
                src={g.src}
                alt={g.alt[locale]}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                className="object-cover object-center transition-transform duration-1000 hover:scale-[1.04]"
              />
            </motion.figure>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            {t("viewOnInstagram")}
            <svg width="14" height="14" viewBox="0 0 16 16" aria-hidden="true">
              <path
                d="M4 4h8v8M12 4L4 12"
                stroke="currentColor"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
