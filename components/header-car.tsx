"use client";

import { useEffect, useState } from "react";

/**
 * Scroll-tied Supra in the header. Lives in a thin band right under the
 * navbar (fixed). Its horizontal position tracks total page scroll
 * progress — at the top of the page it sits at the left edge, at the
 * bottom it's at the right. Wheels spin continuously.
 *
 * Wheel anchors were measured against the source PNG (313×98). The
 * rear arch center sits at x≈56 (17.9% of width), the front at x≈251
 * (80.2%); both at y≈73 (74%). The wheels themselves are 45×45
 * (14.4% wide), so their top-left coords land at:
 *   rear  left=10.7%  top=51.6%
 *   front left=73.0%  top=51.6%
 */
export function HeaderCar() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed top-[72px] inset-x-0 z-40 h-12 pointer-events-none overflow-hidden"
    >
      <div
        className="absolute top-1/2 -translate-y-1/2 w-[110px] sm:w-[140px] md:w-[170px]"
        style={{
          left: `calc(${progress * 100}% - ${progress * 170}px)`,
          transition: "left 80ms linear",
        }}
      >
        {/* eslint-disable @next/next/no-img-element */}
        <img
          src="/cars/car-without-wheels.png"
          alt=""
          className="block w-full select-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]"
          draggable={false}
        />
        <img
          src="/cars/rear-wheel-only.png"
          alt=""
          className="wheel-spin absolute select-none"
          draggable={false}
          style={{ left: "10.7%", top: "51.6%", width: "14.4%" }}
        />
        <img
          src="/cars/front-wheel-only.png"
          alt=""
          className="wheel-spin absolute select-none"
          draggable={false}
          style={{ left: "73.0%", top: "51.6%", width: "14.4%" }}
        />
      </div>
    </div>
  );
}
