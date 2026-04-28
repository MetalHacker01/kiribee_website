"use client";

import { useTranslations } from "next-intl";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useRef } from "react";

export function Hero() {
  const t = useTranslations("hero");
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative isolate min-h-[100svh] overflow-hidden"
    >
      {/* Soft warm radial backlight */}
      <div className="absolute inset-0 -z-20 bg-radial-warmth" />
      {/* Subtle honeycomb pattern */}
      <div className="absolute inset-0 -z-10 bg-honeycomb-soft opacity-60 mask-fade-b" />

      {/* Decorative candle illustration with parallax + ambient float */}
      <motion.div
        style={{ y, opacity }}
        className="pointer-events-none absolute right-[-6%] top-[6%] h-[78vh] w-[60vw] max-w-[820px]"
        aria-hidden="true"
      >
        <motion.div
          animate={
            reduce
              ? undefined
              : {
                  y: [0, -10, 0, 6, 0],
                  rotate: [0, 0.3, 0, -0.3, 0],
                }
          }
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="h-full w-full"
        >
          <CandleArt />
        </motion.div>
      </motion.div>

      <div className="container-wide relative z-10 flex min-h-[100svh] flex-col justify-center pt-24 pb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow">{t("eyebrow")}</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="h-display mt-6 text-5xl sm:text-7xl lg:text-[8rem] leading-[0.95] text-balance max-w-5xl"
        >
          {t("title")}{" "}
          <em className="not-italic font-display italic text-amber-700">
            {t("titleAccent")}
          </em>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 max-w-xl text-lg sm:text-xl text-wax-900/75 text-pretty"
        >
          {t("lede")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap items-center gap-4"
        >
          <a href="#story" className="btn-primary">
            {t("ctaPrimary")}
            <Arrow />
          </a>
          <a href="#contact" className="btn-secondary">
            {t("ctaSecondary")}
          </a>
        </motion.div>

        <div className="absolute bottom-8 left-6 sm:left-8 lg:left-12 flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-wax-900/50">
          <span className="h-px w-10 bg-wax-900/30" />
          {t("scrollHint")}
        </div>
      </div>
    </section>
  );
}

function Arrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden="true">
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

function CandleArt() {
  return (
    <svg viewBox="0 0 600 800" className="h-full w-full">
      <defs>
        <linearGradient id="candleBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F1C861" />
          <stop offset="50%" stopColor="#E8B53A" />
          <stop offset="100%" stopColor="#C8821C" />
        </linearGradient>
        <linearGradient id="candleHi" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#FFF6D6" stopOpacity="0.0" />
          <stop offset="50%" stopColor="#FFF6D6" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FFF6D6" stopOpacity="0.0" />
        </linearGradient>
        <radialGradient id="halo" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="#FFE19B" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#FFE19B" stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle cx="300" cy="220" r="260" fill="url(#halo)">
        <animate
          attributeName="r"
          values="250;272;258;266;250"
          dur="3.6s"
          repeatCount="indefinite"
        />
        <animate
          attributeName="opacity"
          values="0.85;1;0.78;0.95;0.85"
          dur="3.6s"
          repeatCount="indefinite"
        />
      </circle>

      {/* Candle body */}
      <rect
        x="200"
        y="280"
        width="200"
        height="440"
        rx="14"
        fill="url(#candleBody)"
      />
      <rect
        x="208"
        y="290"
        width="20"
        height="420"
        rx="8"
        fill="url(#candleHi)"
        opacity="0.8"
      />

      {/* Top rim */}
      <ellipse cx="300" cy="282" rx="100" ry="14" fill="#A26716" />
      <ellipse cx="300" cy="278" rx="96" ry="10" fill="#3A2A12" opacity="0.85" />

      {/* Wick */}
      <path
        d="M300 278 C 302 250 298 230 300 210"
        stroke="#3A2A12"
        strokeWidth="2.4"
        fill="none"
        strokeLinecap="round"
      />

      {/* Flame — flicker, sway, and breathe */}
      <g>
        <animateTransform
          attributeName="transform"
          attributeType="XML"
          type="translate"
          values="268,110; 270,108; 266,112; 269,110; 267,109; 268,110"
          dur="2.4s"
          repeatCount="indefinite"
          additive="replace"
        />
        <path
          d="M32 8c8 12 16 20 16 36 0 12-7.16 22-16 22S16 56 16 44c0-16 8-24 16-36z"
          fill="#FFD66B"
        >
          <animate
            attributeName="opacity"
            values="0.92;1;0.82;0.98;0.92"
            dur="2.4s"
            repeatCount="indefinite"
          />
          <animateTransform
            attributeName="transform"
            type="scale"
            values="1 1; 1.02 1.05; 0.98 0.96; 1.01 1.03; 1 1"
            dur="2.4s"
            repeatCount="indefinite"
            additive="sum"
          />
        </path>
        <ellipse cx="32" cy="56" rx="6" ry="11" fill="#FFFFFF">
          <animate
            attributeName="opacity"
            values="1;0.85;1;0.78;1"
            dur="2.4s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="ry"
            values="11;13;10;12;11"
            dur="2.4s"
            repeatCount="indefinite"
          />
        </ellipse>
      </g>

      {/* Subtle bee silhouettes circling */}
      <g opacity="0.45" fill="#3A2A12">
        <circle cx="120" cy="160" r="3.5" />
        <circle cx="490" cy="200" r="2.5" />
        <circle cx="80" cy="380" r="2.5" />
        <circle cx="510" cy="500" r="3" />
      </g>
    </svg>
  );
}
