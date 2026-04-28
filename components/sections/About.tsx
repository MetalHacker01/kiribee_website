import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { Reveal } from "../motion/Reveal";
import { ABOUT_ANA } from "@/lib/content";

export function About() {
  const t = useTranslations("about");
  const locale = useLocale() as "en" | "sq";
  const facts = ABOUT_ANA.facts[locale];

  return (
    <section
      id="about"
      className="relative scroll-mt-24 bg-cream-50 py-24 sm:py-32 lg:py-36"
    >
      <div className="container-wide grid items-center gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <div className="relative mx-auto aspect-[4/5] max-w-md overflow-hidden rounded-3xl ring-1 ring-wax-900/10 shadow-soft-cream">
            <Image
              src={ABOUT_ANA.imageSrc}
              alt={ABOUT_ANA.imageAlt[locale]}
              fill
              sizes="(min-width: 1024px) 35vw, 90vw"
              className="object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-amber-700/10 via-transparent to-transparent" />
          </div>
        </Reveal>

        <div className="lg:col-span-7 lg:pl-6">
          <Reveal>
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="h-display mt-6 text-4xl sm:text-5xl lg:text-6xl text-balance">
              {t("title")}
            </h2>
            <p className="mt-6 text-lg text-wax-900/75 leading-relaxed text-pretty max-w-xl">
              {t("lede")}
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mt-12 eyebrow">{t("factsTitle")}</p>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 max-w-2xl">
              {facts.map((f, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 rounded-2xl border border-wax-900/8 bg-beeswax-100/35 px-4 py-3"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-honey-500/30 text-amber-800"
                  >
                    <span className="block h-1.5 w-1.5 rounded-full bg-amber-700" />
                  </span>
                  <span className="text-sm text-wax-900/85 leading-relaxed">
                    {f}
                  </span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
