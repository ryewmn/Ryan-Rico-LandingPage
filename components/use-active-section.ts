"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in view via IntersectionObserver.
 * Pass an array of section ids (without the leading #).
 * Returns the id of the section closest to the top of the viewport.
 */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);

    if (elements.length === 0) return;

    // Track which sections are intersecting; pick the highest one each tick.
    const visibility = new Map<string, number>();

    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          visibility.set(e.target.id, e.isIntersecting ? e.intersectionRatio : 0);
        }
        let bestId: string | null = null;
        let bestRatio = 0;
        for (const [id, ratio] of visibility.entries()) {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        }
        setActive(bestId);
      },
      {
        // Trigger when at least 30% of section is in viewport, with the top
        // anchor anchored ~80px below the navbar.
        rootMargin: "-80px 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    elements.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  return active;
}
