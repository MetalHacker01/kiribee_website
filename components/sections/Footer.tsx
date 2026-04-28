import { useTranslations } from "next-intl";
import Link from "next/link";
import { SITE } from "@/lib/content";

export function Footer({ locale }: { locale: string }) {
  const t = useTranslations("footer");
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-wax-900/10 bg-wax-900 text-cream-50">
      {/* Watermark — Kiribee in display serif behind the content */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[-3rem] flex items-end justify-center select-none"
      >
        <span className="font-display text-[14rem] sm:text-[20rem] lg:text-[28rem] leading-[0.85] tracking-tightest text-honey-500/[0.08] whitespace-nowrap">
          Kiribee
        </span>
      </div>

      <div className="container-wide relative py-16 grid gap-10 sm:grid-cols-12">
        <div className="sm:col-span-7">
          <Link
            href={`/${locale}`}
            className="font-display text-3xl tracking-tight"
          >
            {SITE.name}
          </Link>
          <p className="mt-4 max-w-md text-cream-50/65 leading-relaxed">
            {t("tagline")}
          </p>
        </div>
        <div className="sm:col-span-5">
          <p className="text-xs uppercase tracking-[0.22em] text-cream-50/55">Reach</p>
          <ul className="mt-4 flex flex-col gap-2 text-cream-50/85">
            <li>
              <a href={`mailto:${SITE.email}`} className="hover:text-honey-400 transition-colors">
                {SITE.email}
              </a>
            </li>
            <li>
              <a
                href={`https://wa.me/${SITE.whatsapp.replace(/[^\d]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-honey-400 transition-colors"
              >
                WhatsApp · {SITE.whatsappDisplay}
              </a>
            </li>
            <li>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-honey-400 transition-colors"
              >
                Instagram {SITE.instagramHandle}
              </a>
            </li>
            <li>
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-honey-400 transition-colors"
              >
                Facebook · Kiribee
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-cream-50/10">
        <div className="container-wide py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-xs text-cream-50/55">
          <p>© {year} {SITE.name}. {t("rights")}</p>
          <p>{t("credit")}</p>
        </div>
      </div>
    </footer>
  );
}
