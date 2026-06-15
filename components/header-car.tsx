"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Header Supra — fires the first time the About section enters the
 * viewport. The animation has three phases (driven by the keyframe
 * stops in globals.css, 4.5s total):
 *
 *   1. Slow roll-out from off-left to mid-screen   (0 → 2.25s)
 *   2. Brief pause in the middle                   (2.25 → 2.93s)
 *   3. Hard zoom off the right                     (2.93 → 4.5s)
 *
 * One-shot per page load; a page refresh re-arms it. Wheel anchors
 * mirror Toyota's engage.toyota.com cool-car-animation.
 */
export function HeaderCar() {
  const [running, setRunning] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    if (triggeredRef.current) return;
    const target = document.querySelector("#about");
    if (!target) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggeredRef.current) {
          triggeredRef.current = true;
          setRunning(true);
          obs.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    obs.observe(target);
    return () => obs.disconnect();
  }, []);

  // After the animation ends just unmount the rig. We deliberately do
  // NOT reset triggeredRef — only a page refresh re-arms it.
  function handleEnd() {
    setRunning(false);
  }

  return (
    <div
      aria-hidden="true"
      className="fixed top-[72px] inset-x-0 z-40 h-14 pointer-events-none overflow-hidden"
    >
      {running ? (
        <div
          onAnimationEnd={handleEnd}
          className="car-drive-accel absolute top-1/2 left-0 w-[55px] sm:w-[70px] md:w-[85px]"
        >
          <div className="relative w-full">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src="/cars/car-without-wheels.png"
              alt=""
              className="block w-full select-none drop-shadow-[0_2px_6px_rgba(0,0,0,0.45)]"
              draggable={false}
            />
            <div
              className="absolute"
              style={{
                left: "23.3%",
                top: "73.5%",
                width: "15%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src="/cars/rear-wheel-only.png"
                alt=""
                className="wheel-spin block w-full select-none"
                draggable={false}
              />
            </div>
            <div
              className="absolute"
              style={{
                left: "78.7%",
                top: "73.5%",
                width: "15%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <img
                src="/cars/front-wheel-only.png"
                alt=""
                className="wheel-spin block w-full select-none"
                draggable={false}
              />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
