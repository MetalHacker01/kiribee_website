"use client";

import { useEffect } from "react";

// Sets data-active on the collection section to the item nearest the
// middle of the viewport. The CSS does the crossfade.
export function StageController({ sectionId }: { sectionId: string }) {
  useEffect(() => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    const items = Array.from(
      section.querySelectorAll<HTMLElement>("[data-stage-item]")
    );
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            section.dataset.active = (e.target as HTMLElement).dataset.stageItem;
          }
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [sectionId]);

  return null;
}
