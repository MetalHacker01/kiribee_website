"use client";

import { useEffect } from "react";

// Moves the candlelight mask with the pointer. Until the visitor touches
// it, a CSS animation drifts the light on its own.
export function Flashlight({ targetId }: { targetId: string }) {
  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    let raf = 0;
    let x = 50;
    let y = 50;

    const apply = () => {
      raf = 0;
      el.style.setProperty("--lx", `${x}%`);
      el.style.setProperty("--ly", `${y}%`);
    };

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x = ((e.clientX - r.left) / r.width) * 100;
      y = ((e.clientY - r.top) / r.height) * 100;
      el.dataset.manual = "true";
      if (!raf) raf = requestAnimationFrame(apply);
    };

    const onKey = (e: KeyboardEvent) => {
      const step = 6;
      const moves: Record<string, [number, number]> = {
        ArrowLeft: [-step, 0],
        ArrowRight: [step, 0],
        ArrowUp: [0, -step],
        ArrowDown: [0, step],
      };
      const m = moves[e.key];
      if (!m) return;
      e.preventDefault();
      if (el.dataset.manual !== "true") {
        x = 50;
        y = 50;
      }
      x = Math.max(0, Math.min(100, x + m[0]));
      y = Math.max(0, Math.min(100, y + m[1]));
      el.dataset.manual = "true";
      if (!raf) raf = requestAnimationFrame(apply);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onMove);
    el.addEventListener("keydown", onKey);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onMove);
      el.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return null;
}
