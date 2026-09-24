"use client";

import { useEffect } from "react";

// Pauses the CSS loops (bees, flames, glows) of any [data-loop] element
// while it is off screen.
export function LoopPauser() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-loop]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          const el = e.target as HTMLElement;
          if (e.isIntersecting) delete el.dataset.paused;
          else el.dataset.paused = "true";
        }
      },
      { rootMargin: "120px 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
  return null;
}
