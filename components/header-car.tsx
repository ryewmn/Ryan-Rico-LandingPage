"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Header Supra — slowly rolls out from the left, accelerates to the
 * right, and disappears. Triggered when the user scrolls; only one
 * drive-by runs at a time. After the animation ends, the next scroll
 * can retrigger it.
 *
 * Wheel anchors mirror Toyota's engage.toyota.com cool-car-animation:
 *   rear-x: 23.3%, front-x: 78.7%, y: 73.5%, size: 15%
 * Wheels are centered with translate(-50%, -50%) so the spin keyframes
 * only rotate and don't fight the position.
 *
 * Ease (cubic-bezier(.32, .9, .9, 1.4)) is lifted from Toyota's CSS —
 * slow off-the-left, hard accel out to the right.
 */
export function HeaderCar() {
  const [running, setRunning] = useState(false);
  const runningRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (runningRef.current) return;
      runningRef.current = true;
      setRunning(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleEnd() {
    runningRef.current = false;
    setRunning(false);
  }

  return (
    <div
      aria-hidden="true"
      className="fixed top-[72px] inset-x-0 z-40 h-10 pointer-events-none overflow-hidden"
    >
      {running ? (
        <div
          onAnimationEnd={handleEnd}
          className="car-drive-accel absolute top-1/2 -translate-y-1/2 left-0 w-[78px] sm:w-[96px] md:w-[112px]"
        >
          <div className="relative">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src="/cars/car-without-wheels.png"
              alt=""
              className="block w-full select-none drop-shadow-[0_2px_5px_rgba(0,0,0,0.4)]"
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
