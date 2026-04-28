"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { useTransition } from "react";
import { locales } from "@/i18n";

export function LocaleSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("nav");
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: string) => {
    if (next === locale || isPending) return;
    // Replace the leading /en or /sq segment in the current path.
    const segments = pathname.split("/");
    if (locales.includes(segments[1] as (typeof locales)[number])) {
      segments[1] = next;
    } else {
      segments.splice(1, 0, next);
    }
    const target = segments.join("/") || `/${next}`;
    startTransition(() => {
      router.replace(target, { scroll: false });
    });
  };

  return (
    <div
      role="group"
      aria-label={t("switchLocale")}
      className="flex items-center gap-1 rounded-full border border-wax-900/10 bg-cream-50/60 p-0.5 backdrop-blur"
    >
      {locales.map((l) => (
        <button
          key={l}
          type="button"
          onClick={() => switchTo(l)}
          aria-pressed={l === locale}
          className={`px-3 py-1.5 text-xs font-medium uppercase tracking-wider rounded-full transition-all ${
            l === locale
              ? "bg-amber-700 text-cream-50 shadow-soft-amber"
              : "text-wax-900/70 hover:text-wax-900"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
