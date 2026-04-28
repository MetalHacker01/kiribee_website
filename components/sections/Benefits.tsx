import { useTranslations, useLocale } from "next-intl";
import { Reveal } from "../motion/Reveal";
import { BENEFITS } from "@/lib/content";

export function Benefits() {
  const t = useTranslations("benefits");
  const locale = useLocale() as "en" | "sq";

  return (
    <section className="relative bg-beeswax-100/40 py-24 sm:py-32 lg:py-36">
      <div className="container-wide">
        <Reveal>
          <div className="flex flex-col items-start gap-3 sm:gap-5">
            <span className="eyebrow">{t("eyebrow")}</span>
            <h2 className="h-display text-3xl sm:text-5xl lg:text-6xl text-balance max-w-2xl">
              {t("title")}
            </h2>
          </div>
        </Reveal>

        <ul className="mt-16 grid gap-px overflow-hidden rounded-2xl bg-wax-900/10 sm:grid-cols-2 lg:grid-cols-5">
          {BENEFITS.map((b, i) => (
            <Reveal
              as="li"
              key={b.icon}
              delay={i * 0.06}
              className="bg-cream-50 p-7 transition-colors hover:bg-beeswax-100/60"
            >
              <BenefitIcon name={b.icon} />
              <h3 className="mt-5 font-display text-xl text-wax-900">
                {b.title[locale]}
              </h3>
              <p className="mt-2 text-sm text-wax-900/70 leading-relaxed">
                {b.body[locale]}
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

function BenefitIcon({ name }: { name: "flame" | "leaf" | "heart" | "feather" | "shield" }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "#C8821C",
    strokeWidth: 1.4,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "flame":
      return (
        <svg {...common}>
          <path d="M12 2c1 4 5 6 5 11a5 5 0 0 1-10 0c0-3 1-5 3-7" />
          <path d="M9 17a3 3 0 0 0 6 0" />
        </svg>
      );
    case "leaf":
      return (
        <svg {...common}>
          <path d="M5 19c8 1 14-5 14-14C9 5 4 11 5 19z" />
          <path d="M5 19l9-9" />
        </svg>
      );
    case "heart":
      return (
        <svg {...common}>
          <path d="M20.8 8.6a5 5 0 0 0-8.8-3.2 5 5 0 0 0-8.8 3.2c0 5 8.8 11 8.8 11s8.8-6 8.8-11z" />
        </svg>
      );
    case "feather":
      return (
        <svg {...common}>
          <path d="M21 3c-6 0-12 6-12 12v6h6c6 0 12-6 12-18z" />
          <path d="M3 21l9-9" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 2l8 4v6c0 5-4 9-8 10-4-1-8-5-8-10V6l8-4z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      );
  }
}
