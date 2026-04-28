"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { LocaleSwitcher } from "./LocaleSwitcher";

const NAV_LINKS = [
  { href: "#story", key: "story" as const },
  { href: "#about", key: "about" as const },
  { href: "#candles", key: "candles" as const },
  { href: "#wraps", key: "wraps" as const },
  { href: "#gallery", key: "gallery" as const },
  { href: "#contact", key: "contact" as const },
];

export function Nav({ locale }: { locale: string }) {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-cream-50/85 backdrop-blur-md border-b border-wax-900/5"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex h-20 items-center justify-between">
        <Link
          href={`/${locale}`}
          className="group flex items-center gap-2.5 text-wax-900"
          aria-label="Kiribee, home"
        >
          <span className="relative block h-12 w-12 overflow-hidden rounded-full ring-2 ring-amber-700/60 ring-offset-2 ring-offset-cream-50 transition-all duration-500 group-hover:ring-amber-700 group-hover:ring-offset-4">
            <Image
              src="/brand/logo.jpg"
              alt="Kiribee"
              fill
              sizes="48px"
              className="object-cover"
              priority
            />
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-7 lg:gap-8">
          {NAV_LINKS.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="text-sm text-wax-900/80 transition-colors hover:text-amber-700"
            >
              {t(l.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LocaleSwitcher />
          <button
            type="button"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden flex h-10 w-10 items-center justify-center rounded-full border border-wax-900/10 text-wax-900"
          >
            <span className="sr-only">{open ? t("closeMenu") : t("openMenu")}</span>
            <svg width="18" height="14" viewBox="0 0 18 14" aria-hidden="true">
              {open ? (
                <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M2 2L16 12" />
                  <path d="M16 2L2 12" />
                </g>
              ) : (
                <g stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                  <path d="M1 2H17" />
                  <path d="M1 7H17" />
                  <path d="M1 12H17" />
                </g>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden fixed inset-x-0 top-20 bottom-0 bg-cream-50 border-t border-wax-900/5 transition-all duration-500 ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="container-wide flex flex-col gap-2 pt-8">
          {NAV_LINKS.map((l, i) => (
            <a
              key={l.key}
              href={l.href}
              onClick={() => setOpen(false)}
              className="font-display text-3xl text-wax-900 py-3 border-b border-wax-900/5 transition-transform"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {t(l.key)}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

