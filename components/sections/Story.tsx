import { useTranslations, useLocale } from "next-intl";
import { Reveal } from "../motion/Reveal";
import { PULL_QUOTE, ATTRIBUTION } from "@/lib/content";

export function Story() {
  const t = useTranslations("story");
  const locale = useLocale() as "en" | "sq";

  return (
    <section
      id="story"
      className="relative scroll-mt-24 py-24 sm:py-32 lg:py-36"
    >
      <div className="container-wide grid gap-16 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="h-display mt-6 text-4xl sm:text-5xl lg:text-6xl leading-[1.05] text-balance">
            {t("title")}
          </h2>
          <p className="mt-8 font-display italic text-2xl text-amber-800">
            {t("signatureLine")}
          </p>
        </Reveal>

        <div className="lg:col-span-7 lg:pl-8">
          <Reveal delay={0.05}>
            <p className="text-lg sm:text-xl text-wax-900/85 leading-relaxed text-pretty">
              {t("p1")}
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <figure className="mt-12 border-l-2 border-amber-700/50 pl-6">
              <blockquote className="font-display text-2xl sm:text-3xl italic text-wax-900 leading-snug text-balance">
                “{PULL_QUOTE[locale]}”
              </blockquote>
              <figcaption className="mt-3 text-sm text-wax-900/55">
                Ana &amp; Aldo · {t("creditLabel")}{" "}
                <a
                  href={ATTRIBUTION.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline decoration-amber-700/50 underline-offset-4 hover:decoration-amber-700"
                >
                  {t("creditSource")}
                </a>
              </figcaption>
            </figure>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-12 text-lg text-wax-900/80 leading-relaxed text-pretty">
              {t("p2")}
            </p>
          </Reveal>

          <Reveal delay={0.25}>
            <p className="mt-6 text-lg text-wax-900/80 leading-relaxed text-pretty">
              {t("p3")}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
