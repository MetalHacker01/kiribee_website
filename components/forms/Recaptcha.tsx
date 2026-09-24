"use client";

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  type CSSProperties,
} from "react";

type Grecaptcha = {
  render: (
    el: HTMLElement,
    opts: {
      sitekey: string;
      theme?: "light" | "dark";
      callback: (token: string) => void;
      "expired-callback": () => void;
      "error-callback": () => void;
    }
  ) => number;
  reset: (id?: number) => void;
};

declare global {
  interface Window {
    grecaptcha?: Grecaptcha;
    __kiribeeRecaptchaLoaded?: () => void;
  }
}

export const RECAPTCHA_SITE_KEY = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";

const WIDGET_W = 304;
const WIDGET_H = 78;

let loader: Promise<Grecaptcha> | null = null;

function loadRecaptcha(hl: string) {
  if (loader) return loader;
  loader = new Promise<Grecaptcha>((resolve, reject) => {
    window.__kiribeeRecaptchaLoaded = () => resolve(window.grecaptcha!);
    const script = document.createElement("script");
    script.src = `https://www.google.com/recaptcha/api.js?render=explicit&onload=__kiribeeRecaptchaLoaded&hl=${hl}`;
    script.async = true;
    script.onerror = () => {
      loader = null;
      reject(new Error("recaptcha failed to load"));
    };
    document.head.appendChild(script);
  });
  return loader;
}

export type RecaptchaHandle = { reset: () => void };

type Props = {
  locale: string;
  theme?: "light" | "dark";
  onChange: (token: string | null) => void;
  className?: string;
  style?: CSSProperties;
};

// reCAPTCHA v2 checkbox. Google's script is only fetched once the visitor
// starts using the surrounding form, so it never weighs on page load.
export const Recaptcha = forwardRef<RecaptchaHandle, Props>(function Recaptcha(
  { locale, theme = "light", onChange, className, style },
  ref
) {
  const frame = useRef<HTMLDivElement>(null);
  const slot = useRef<HTMLDivElement>(null);
  const widgetId = useRef<number | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  useImperativeHandle(ref, () => ({
    reset() {
      if (widgetId.current !== null) window.grecaptcha?.reset(widgetId.current);
      onChangeRef.current(null);
    },
  }));

  useEffect(() => {
    const el = slot.current;
    const form = el?.closest("form");
    if (!el || !form || !RECAPTCHA_SITE_KEY) return;
    let cancelled = false;

    const start = () => {
      form.removeEventListener("focusin", start);
      form.removeEventListener("pointerdown", start);
      loadRecaptcha(locale)
        .then((g) => {
          if (cancelled || widgetId.current !== null) return;
          widgetId.current = g.render(el, {
            sitekey: RECAPTCHA_SITE_KEY,
            theme,
            callback: (token) => onChangeRef.current(token),
            "expired-callback": () => onChangeRef.current(null),
            "error-callback": () => onChangeRef.current(null),
          });
        })
        .catch(() => {});
    };

    form.addEventListener("focusin", start);
    form.addEventListener("pointerdown", start);
    return () => {
      cancelled = true;
      form.removeEventListener("focusin", start);
      form.removeEventListener("pointerdown", start);
    };
  }, [locale, theme]);

  // The widget has a fixed 304px width; scale it down in narrow forms.
  useEffect(() => {
    const outer = frame.current;
    const inner = slot.current;
    if (!outer || !inner) return;
    const ro = new ResizeObserver(([entry]) => {
      const scale = Math.min(1, entry.contentRect.width / WIDGET_W);
      inner.style.transform = scale < 1 ? `scale(${scale})` : "";
      outer.style.height = `${Math.ceil(WIDGET_H * scale)}px`;
    });
    ro.observe(outer);
    return () => ro.disconnect();
  }, []);

  if (!RECAPTCHA_SITE_KEY) return null;

  return (
    <div
      ref={frame}
      className={className}
      style={{ width: "100%", height: WIDGET_H, ...style }}
    >
      {/* Google only offers light/dark themes; a warm tint makes the grey
          and blue sit with the honey palette. */}
      <div
        ref={slot}
        style={{
          width: WIDGET_W,
          transformOrigin: "0 0",
          borderRadius: 6,
          overflow: "hidden",
          filter:
            theme === "dark"
              ? "sepia(1) saturate(1.6) hue-rotate(-12deg) brightness(0.92)"
              : "sepia(0.85) saturate(1.35) hue-rotate(-10deg)",
        }}
      />
    </div>
  );
});
