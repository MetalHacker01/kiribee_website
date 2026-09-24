"use client";

import { useState } from "react";
import { BEE_ID } from "./Bee";
import s from "./home.module.css";

const hex = (cx: number, cy: number, r = 9) =>
  `M${cx} ${cy - r} L${cx + r * 0.866} ${cy - r / 2} L${cx + r * 0.866} ${cy + r / 2} L${cx} ${cy + r} L${cx - r * 0.866} ${cy + r / 2} L${cx - r * 0.866} ${cy - r / 2} Z`;

export function Goodnight({
  t,
}: {
  t: { title: string; body: string; blow: string; relight: string; out: string };
}) {
  const [out, setOut] = useState(false);

  return (
    <div className={s.goodnight} data-out={out ? "true" : undefined} data-loop>
      <div className={s.gnGlow} aria-hidden="true" />
      <svg className={s.gnCandle} viewBox="0 -70 160 330" aria-hidden="true">
        <defs>
          <linearGradient id="v1-gn-body" x1="0" x2="1">
            <stop offset="0" stopColor="#b87818" />
            <stop offset="0.45" stopColor="#f1c55e" />
            <stop offset="1" stopColor="#a56812" />
          </linearGradient>
          <radialGradient id="v1-gn-flame" cx="50%" cy="70%" r="60%">
            <stop offset="0" stopColor="#fffbea" />
            <stop offset="0.4" stopColor="#ffd877" />
            <stop offset="1" stopColor="#f08a1c" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Smoke rises, then settles into a small honeycomb */}
        <g className={s.gnSmoke} fill="none" stroke="#c9b9a3" strokeWidth="1.4" strokeLinecap="round">
          <path d="M80 70 C 72 58, 88 48, 78 34 S 84 12, 76 2" />
          <path d="M80 70 C 88 60, 74 50, 84 38 S 78 20, 86 8" />
        </g>
        <g className={s.gnComb} fill="none" stroke="#e3c896" strokeWidth="1.3" strokeLinejoin="round">
          <path d={hex(72.2, -22)} />
          <path d={hex(87.8, -22)} />
          <path d={hex(80, -8.5)} />
        </g>

        <g className={s.gnFlame}>
          <path
            d="M80 30 C 90 46, 94 56, 92 66 C 90 76, 84 82, 80 82 C 76 82, 70 76, 68 66 C 66 56, 70 46, 80 30 Z"
            fill="url(#v1-gn-flame)"
          />
          <ellipse cx="80" cy="70" rx="4" ry="8" fill="#fff" opacity="0.9" />
        </g>
        <path d="M80 94 C 81 88, 79 84, 80 78" stroke="#2a1b0e" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path
          d="M42 100 Q 42 94 50 94 H 110 Q 118 94 118 100 V 250 Q 118 258 110 258 H 50 Q 42 258 42 250 Z"
          fill="url(#v1-gn-body)"
        />
        <path
          d="M42 100 Q 42 94 50 94 H 110 Q 118 94 118 100 V 110 Q 112 116 108 110 Q 104 128 98 110 Q 90 106 84 112 Q 80 140 74 112 Q 66 106 60 112 Q 56 122 52 110 Q 46 108 42 112 Z"
          fill="#f6d27a"
          opacity="0.55"
        />

        {/* The bee circles the flame, and lands on the rim once it is out */}
        <g className={s.gnBeePath}>
          <use href={`#${BEE_ID}`} x="-13" y="-14" width="27" height="24" />
        </g>
      </svg>

      <h2 className={s.gnTitle}>{t.title}</h2>
      <p className={s.gnBody} aria-live="polite">
        {out ? t.out : t.body}
      </p>
      <button type="button" className={s.btnOutline} onClick={() => setOut((v) => !v)}>
        {out ? t.relight : t.blow}
      </button>
    </div>
  );
}
