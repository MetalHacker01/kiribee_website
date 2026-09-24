"use client";

import { useEffect, useRef, useState } from "react";
import {
  Recaptcha,
  RECAPTCHA_SITE_KEY,
  type RecaptchaHandle,
} from "@/components/forms/Recaptcha";
import s from "./home.module.css";

type Strings = {
  name: string;
  namePlaceholder: string;
  email: string;
  emailPlaceholder: string;
  message: string;
  messagePlaceholder: string;
  submit: string;
  submitting: string;
  successTitle: string;
  successBody: string;
  errorTitle: string;
  errorBody: string;
  nameRequired: string;
  emailInvalid: string;
  messageShort: string;
  captchaRequired: string;
  prefill: string;
};

type Errors = Partial<Record<"name" | "email" | "message" | "captcha", string>>;

export function ContactForm({
  t,
  locale,
  email,
}: {
  t: Strings;
  locale: "en" | "sq";
  email: string;
}) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<Errors>({});
  const messageRef = useRef<HTMLTextAreaElement>(null);
  const captchaRef = useRef<RecaptchaHandle>(null);
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);

  // "Inquire" links anywhere on the page prefill the message.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest<HTMLElement>("[data-inquire]");
      if (!link) return;
      const ta = messageRef.current;
      if (ta && !ta.value) {
        ta.value = t.prefill.replace("{candle}", link.dataset.inquire ?? "");
      }
      window.setTimeout(() => ta?.focus({ preventScroll: true }), 700);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [t.prefill]);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    const next: Errors = {};
    if (!data.name?.trim()) next.name = t.nameRequired;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email ?? "")) next.email = t.emailInvalid;
    if ((data.message ?? "").trim().length < 8) next.message = t.messageShort;
    if (RECAPTCHA_SITE_KEY && !captchaToken) next.captcha = t.captchaRequired;
    setErrors(next);
    if (Object.keys(next).length) return;

    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, locale, recaptchaToken: captchaToken }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        if (String(body.error).startsWith("captcha")) {
          setErrors({ captcha: t.captchaRequired });
          setStatus("idle");
          return;
        }
        throw new Error("send failed");
      }
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    } finally {
      captchaRef.current?.reset();
    }
  };

  return (
    <form className={s.form} onSubmit={onSubmit} noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className={s.honeypot}
      />

      <Field id="v1-name" label={t.name} error={errors.name}>
        <input
          id="v1-name"
          name="name"
          autoComplete="name"
          placeholder={t.namePlaceholder}
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "v1-name-err" : undefined}
          className={s.input}
        />
      </Field>

      <Field id="v1-email" label={t.email} error={errors.email}>
        <input
          id="v1-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t.emailPlaceholder}
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "v1-email-err" : undefined}
          className={s.input}
        />
      </Field>

      <Field id="v1-message" label={t.message} error={errors.message}>
        <textarea
          id="v1-message"
          name="message"
          rows={4}
          ref={messageRef}
          placeholder={t.messagePlaceholder}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "v1-message-err" : undefined}
          className={`${s.input} ${s.textarea}`}
        />
      </Field>

      <div className={s.field}>
        <Recaptcha
          ref={captchaRef}
          locale={locale}
          theme="dark"
          onChange={(token) => {
            setCaptchaToken(token);
            if (token) setErrors((e) => ({ ...e, captcha: undefined }));
          }}
        />
        {errors.captcha && (
          <p className={s.fieldError} role="alert">
            {errors.captcha}
          </p>
        )}
      </div>

      <button type="submit" className={s.btnHoney} disabled={status === "sending"}>
        {status === "sending" ? t.submitting : t.submit}
        <Arrow />
      </button>

      <div aria-live="polite">
        {status === "success" && (
          <p className={s.formNote}>
            <strong>{t.successTitle}.</strong> {t.successBody}
          </p>
        )}
        {status === "error" && (
          <p className={s.formNote} role="alert">
            <strong>{t.errorTitle}.</strong> {t.errorBody}{" "}
            <a href={`mailto:${email}`}>{email}</a>
          </p>
        )}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={s.field}>
      <label htmlFor={id} className={s.label}>
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className={s.fieldError}>
          {error}
        </p>
      )}
    </div>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true" className={s.arrow}>
      <path
        d="M2 8h11M9 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
