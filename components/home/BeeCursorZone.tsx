"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { Bee } from "./Bee";
import s from "./home.module.css";

const SmoothCursor = dynamic(
  () => import("@/components/ui/smooth-cursor").then((m) => m.SmoothCursor),
  { ssr: false }
);

// A bee follows the mouse inside one section only. Loaded lazily, and only
// on devices with a fine pointer that have not asked for reduced motion.
export function BeeCursorZone({ sectionId }: { sectionId: string }) {
  const [scope, setScope] = useState<HTMLElement | null>(null);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const el = document.getElementById(sectionId);
    if (!fine || calm || !el) return;
    // Wait for the first time the pointer enters, so nothing loads up front.
    const arm = () => setScope(el);
    el.addEventListener("mouseenter", arm, { once: true });
    return () => el.removeEventListener("mouseenter", arm);
  }, [sectionId]);

  if (!scope) return null;
  return (
    <SmoothCursor
      scope={scope}
      cursor={
        <span className={s.cursorBee}>
          <Bee className={s.cursorBeeSvg} />
        </span>
      }
      springConfig={{ damping: 28, stiffness: 220, mass: 0.9, restDelta: 0.001 }}
    />
  );
}
