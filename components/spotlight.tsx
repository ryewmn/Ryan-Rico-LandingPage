"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SectionLabel } from "@/components/ui/section-label";

export function Spotlight() {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Pause the video when it scrolls off screen — saves a decode loop on the
  // GPU and keeps the page snappier without affecting the cinematic feel.
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) v.play().catch(() => {});
        else v.pause();
      },
      { threshold: 0.1 }
    );
    obs.observe(v);
    return () => obs.disconnect();
  }, []);

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
        <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
          Video: Toyota Gazoo Racing — GR GT
        </p>
      </motion.div>

      {/* Video panel */}
      <div className="relative bg-neutral-950 min-h-[60vh] md:min-h-[80vh]">
        <video
          ref={videoRef}
          src="/videos/grgt-special.mp4"
          poster="/hero/grgt.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-foreground/[0.03] via-transparent to-transparent pointer-events-none"
        />
      </div>
    </section>
  );
}
