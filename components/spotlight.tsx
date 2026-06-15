"use client";

import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/section-label";

export function Spotlight() {
  return (
    <section
      id="spotlight"
      className="relative grid grid-cols-1 md:grid-cols-2 border-t border-foreground/10 overflow-hidden"
    >
      {/* Text panel */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7 }}
        className="relative bg-foreground/[0.03] px-8 md:px-12 lg:px-20 py-20 md:py-32 flex flex-col justify-center grain"
      >
        <SectionLabel>The promise</SectionLabel>
        <h2 className="mt-6 font-mono text-2xl md:text-3xl lg:text-[2.25rem] text-foreground leading-[1.25] tracking-tight">
          &ldquo;Why I work in cars.&rdquo;
        </h2>
        <p className="mt-8 font-mono text-sm md:text-[15px] text-foreground/65 leading-[1.7] max-w-md">
          Toyota&apos;s GR program is a commitment to keep car-making craft
          alive — passed from Akio Toyoda to the next generation of engineers,
          drivers, and the people on the floor who hand a customer the keys.
        </p>
        <p className="mt-5 font-mono text-sm md:text-[15px] text-foreground/65 leading-[1.7] max-w-md">
          That&apos;s the workshop I want to keep contributing to. On the floor.
          In the codebase. After hours, with a Master Grade kit and a hobby
          knife.
        </p>
      </motion.div>

      {/* Drive-by panel — Supra body translates across, wheels spin in place */}
      <div className="relative bg-foreground/[0.015] min-h-[40vh] md:min-h-[60vh] overflow-hidden">
        {/* Faint road line so the drive-by has a horizon */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-1/2 mt-[4%] h-px bg-foreground/15"
        />
        {/* Car rig — drives left→right on a 7s loop. The wheel positions
            are expressed as percentages of the body so the rig scales
            cleanly with the responsive width. */}
        <div
          aria-hidden="true"
          className="car-drive absolute top-1/2 -translate-y-1/2 w-[260px] sm:w-[340px] md:w-[400px] lg:w-[460px]"
        >
          <div className="relative">
            {/* eslint-disable @next/next/no-img-element */}
            <img
              src="/cars/car-without-wheels.png"
              alt=""
              className="block w-full select-none"
              draggable={false}
            />
            <img
              src="/cars/rear-wheel-only.png"
              alt=""
              className="wheel-spin absolute select-none"
              draggable={false}
              style={{ left: "12.6%", top: "53.6%", width: "14.4%" }}
            />
            <img
              src="/cars/front-wheel-only.png"
              alt=""
              className="wheel-spin absolute select-none"
              draggable={false}
              style={{ left: "71.7%", top: "53.6%", width: "14.4%" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
