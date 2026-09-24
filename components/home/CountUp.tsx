"use client";

import { useEffect, useRef } from "react";

// Renders the final number on the server, then counts up once when seen.
export function CountUp({
  value,
  locale,
  className,
}: {
  value: number;
  locale: "en" | "sq";
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // Formatted by hand so server and browser always agree (ICU data varies).
  const sep = locale === "sq" ? " " : ",";
  const fmt = { format: (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, sep) };
  const final = fmt.format(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const duration = 1800;
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - t, 4);
          el.textContent = fmt.format(Math.round(value * eased));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, locale]);

  return (
    <span className={className}>
      <span aria-hidden="true" ref={ref}>
        {final}
      </span>
      <span style={srOnly}>{final}</span>
    </span>
  );
}

const srOnly: React.CSSProperties = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
};
