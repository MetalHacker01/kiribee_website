"use client";

import { useTranslations, useLocale } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Reveal } from "../motion/Reveal";
import { SITE, getContactChannels } from "@/lib/content";

type FormData = {
  name: string;
  email: string;
  message: string;
  // honeypot
  website?: string;
};

export function Contact() {
  const t = useTranslations("contact");
  const tErr = useTranslations("errors");
  const locale = useLocale() as "en" | "sq";
  const channels = getContactChannels(locale);

  const schema = z.object({
    name: z.string().min(1, tErr("nameRequired")),
    email: z.string().email(tErr("emailInvalid")),
    message: z.string().min(8, tErr("messageShort")),
    website: z.string().optional(),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const onSubmit = async (data: FormData) => {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale }),
      });
      if (!res.ok) throw new Error("Send failed");
      setStatus("success");
      reset();
    } catch {
      setStatus("error");
    }
  };

  // Build the WhatsApp URL only when a real number has been provided.
  const hasWhatsapp = !SITE.whatsapp.endsWith("0000000000") && SITE.whatsapp.length > 5;
  const waLink = hasWhatsapp
    ? `https://wa.me/${SITE.whatsapp.replace(/[^\d]/g, "")}`
    : null;
  const hasFacebook = !SITE.facebook.endsWith("/kiribee") || SITE.facebook.startsWith("https://www.facebook.com/");

  return (
    <section id="contact" className="relative scroll-mt-24 py-24 sm:py-32 lg:py-36">
      <div className="container-wide grid gap-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <span className="eyebrow">{t("eyebrow")}</span>
          <h2 className="h-display mt-6 text-4xl sm:text-5xl lg:text-6xl text-balance">
            {t("title")}
          </h2>
          <p className="mt-6 text-lg text-wax-900/70 text-pretty max-w-md">
            {t("subtitle")}
          </p>

          <div className="mt-12 flex flex-col gap-5 border-t border-wax-900/10 pt-10">
            <p className="eyebrow">{t("channelsTitle")}</p>
            <ul className="flex flex-col gap-3 text-base">
              <li>
                <ChannelLink
                  href={`mailto:${SITE.email}`}
                  label={channels.email}
                  value={SITE.email}
                  icon="mail"
                />
              </li>
              {waLink && (
                <li>
                  <ChannelLink
                    href={waLink}
                    label={channels.whatsapp}
                    value={SITE.whatsappDisplay}
                    icon="whatsapp"
                    external
                  />
                </li>
              )}
              <li>
                <ChannelLink
                  href={SITE.instagram}
                  label={channels.instagram}
                  value={SITE.instagramHandle}
                  icon="instagram"
                  external
                />
              </li>
              {hasFacebook && (
                <li>
                  <ChannelLink
                    href={SITE.facebook}
                    label={channels.facebook}
                    value="Kiribee"
                    icon="facebook"
                    external
                  />
                </li>
              )}
            </ul>
            <p className="mt-4 text-sm text-wax-900/55 italic">
              {channels.location}
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="rounded-3xl border border-wax-900/10 bg-beeswax-100/30 p-7 sm:p-10 shadow-soft-cream"
          >
            {/* honeypot */}
            <input
              type="text"
              tabIndex={-1}
              autoComplete="off"
              aria-hidden="true"
              {...register("website")}
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />

            <Field
              id="name"
              label={t("name")}
              placeholder={t("namePlaceholder")}
              error={errors.name?.message}
            >
              <input
                id="name"
                autoComplete="name"
                {...register("name")}
                className={inputClass(!!errors.name)}
                placeholder={t("namePlaceholder")}
              />
            </Field>

            <Field
              id="email"
              label={t("email")}
              placeholder={t("emailPlaceholder")}
              error={errors.email?.message}
            >
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                className={inputClass(!!errors.email)}
                placeholder={t("emailPlaceholder")}
              />
            </Field>

            <Field
              id="message"
              label={t("message")}
              placeholder={t("messagePlaceholder")}
              error={errors.message?.message}
            >
              <textarea
                id="message"
                rows={5}
                {...register("message")}
                className={inputClass(!!errors.message) + " resize-none min-h-[10rem]"}
                placeholder={t("messagePlaceholder")}
              />
            </Field>

            <div className="mt-6 flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-wax-900/50 max-w-xs">
                {channels.location}
              </p>
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t("submitting") : t("submit")}
                {!isSubmitting && (
                  <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
                    <path
                      d="M2 8h11M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
            </div>

            {status === "success" && (
              <div
                role="status"
                className="mt-6 rounded-2xl border border-moss-600/30 bg-moss-600/10 p-5"
              >
                <p className="font-display text-lg text-wax-900">{t("successTitle")}</p>
                <p className="mt-1 text-sm text-wax-900/75">{t("successBody")}</p>
              </div>
            )}
            {status === "error" && (
              <div
                role="alert"
                className="mt-6 rounded-2xl border border-amber-700/30 bg-amber-700/10 p-5"
              >
                <p className="font-display text-lg text-wax-900">{t("errorTitle")}</p>
                <p className="mt-1 text-sm text-wax-900/75">
                  {t("errorBody")}{" "}
                  <a
                    href={`mailto:${SITE.email}`}
                    className="underline decoration-amber-700 underline-offset-2"
                  >
                    {SITE.email}
                  </a>
                </p>
              </div>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

function inputClass(hasError: boolean) {
  return [
    "w-full rounded-xl border bg-cream-50/80 px-4 py-3.5 text-base text-wax-900",
    "placeholder:text-wax-900/35 transition-all duration-200",
    "focus:outline-none focus:ring-2 focus:ring-amber-700/40 focus:border-amber-700",
    hasError ? "border-amber-800/50" : "border-wax-900/15",
  ].join(" ");
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  placeholder: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-5 first:mt-0">
      <label
        htmlFor={id}
        className="mb-2 block text-xs uppercase tracking-[0.22em] text-wax-900/65"
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs text-amber-800">{error}</p>
      )}
    </div>
  );
}

function ChannelLink({
  href,
  label,
  value,
  icon,
  external = false,
}: {
  href: string;
  label: string;
  value: string;
  icon: "mail" | "whatsapp" | "instagram" | "facebook";
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group flex items-center gap-4 rounded-xl border border-wax-900/8 bg-cream-50 px-4 py-3 transition-all hover:-translate-y-0.5 hover:border-amber-700/40 hover:shadow-soft-cream"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-700/10 text-amber-700 group-hover:bg-amber-700 group-hover:text-cream-50 transition-colors">
        <ChannelIcon name={icon} />
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-[11px] uppercase tracking-[0.22em] text-wax-900/55">{label}</span>
        <span className="font-medium text-wax-900">{value}</span>
      </span>
    </a>
  );
}

function ChannelIcon({ name }: { name: "mail" | "whatsapp" | "instagram" | "facebook" }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 7 9-7" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          <path d="M3 21l1.6-5A8 8 0 1 1 8 19.4L3 21z" />
          <path d="M9 9c0 4 2 6 6 6" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "facebook":
      return (
        <svg {...common}>
          <path d="M14 8h2V5h-2a3 3 0 0 0-3 3v2H9v3h2v8h3v-8h2.5l.5-3H14V9c0-.6.4-1 1-1z" />
        </svg>
      );
  }
}
