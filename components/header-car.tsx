"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Header Supra — slowly appears on the left, accelerates out to the
 * right, and disappears. One-shot per page load: the first scroll
 * event after page load triggers it; once the animation has played
 * the rig stays hidden until the page is refreshed.
 *
 * Wheel anchors mirror Toyota's engage.toyota.com cool-car-animation:
 *   rear-x: 23.3%, front-x: 78.7%, y: 73.5%, size: 15%
 * Wheels are centered with translate(-50%, -50%) so the spin keyframes
 * only rotate.
 *
 * Ease: cubic-bezier(.32, .9, .9, 1.4) over 9s, lifted from Toyota's
 * own CSS — slow start, hard accel out.
 */
export function HeaderCar() {
  const [running, setRunning] = useState(false);
  const triggeredRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (triggeredRef.current) return;
      triggeredRef.current = true;
      setRunning(true);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // After the animation ends just unmount the rig. We deliberately do
  // NOT reset triggeredRef — only a page refresh re-arms the drive-by.
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
          className="car-drive-accel absolute top-1/2 -translate-y-1/2 left-0 w-[130px] sm:w-[160px] md:w-[180px]"
        >
          <div className="relative">
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
