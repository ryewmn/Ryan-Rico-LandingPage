"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Instagram } from "lucide-react";
import { LazyInstagramEmbed } from "@/components/lazy-instagram";
import { SectionLabel } from "@/components/ui/section-label";
import { SITE } from "@/lib/site-config";

/**
 * Instagram post shortcodes — the bit after instagram.com/p/  (e.g. for
 * instagram.com/p/AbCdEf123/ the shortcode is "AbCdEf123"). Each becomes
 * an embedded iframe slide that Instagram serves publicly without auth.
 */
const POSTS: string[] = [
  "DWwy6-SFmaE",
  "DVnSyTmDa7m",
  "DT1uEenjSen",
  "DS08MXsjbrv",
  "DPxreuwDf0H",
  "DVDAroxjVlh",
];

export function Builds() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const distance = card ? card.offsetWidth + 16 : 320;
    const reduce =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({
      left: dir === "next" ? distance : -distance,
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="builds"
      aria-labelledby="builds-heading"
      className="relative bg-background py-24 md:py-32 overflow-hidden border-t border-foreground/10"
    >
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/3 h-[400px] w-[600px] rounded-full bg-toyota-red/[0.08] blur-[160px] pointer-events-none"
      />

      <div className="container relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <SectionLabel>Builds</SectionLabel>
            <h2
              id="builds-heading"
              className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-foreground text-balance leading-[1.05]"
            >
              From the{" "}
              <span className="font-display italic font-normal text-gradient-ember">
                workbench.
              </span>
            </h2>
            <p className="mt-4 text-base text-foreground/65 max-w-md">
              Master Grades and Perfect Grades mostly. Real Grades and High
              Grades when I want a fast build. Latest kits posted on Instagram.
            </p>
          </div>

          <div className="flex items-center gap-2 mt-2 md:mt-0">
            <button
              type="button"
              onClick={() => scrollBy("prev")}
              aria-label="Previous build"
              aria-controls="builds-track"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy("next")}
              aria-label="Next build"
              aria-controls="builds-track"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground transition-colors"
            >
              <ChevronRight size={18} />
            </button>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-toyota-red px-4 py-2 text-sm font-medium text-foreground shadow-red-glow hover:bg-toyota-red-dark transition-colors"
            >
              <Instagram size={14} />
              {SITE.instagramHandle}
            </a>
          </div>
        </div>

        <div className="relative -mx-4 md:-mx-6">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent"
          />

          <div
            id="builds-track"
            ref={trackRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Recent Gunpla builds"
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 md:scroll-px-6 px-4 md:px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {POSTS.map((shortcode, i) => (
              <BuildSlide
                key={shortcode}
                shortcode={shortcode}
                index={i}
                total={POSTS.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BuildSlide({
  shortcode,
  index,
  total,
}: {
  shortcode: string;
  index: number;
  total: number;
}) {
  return (
    <motion.div
      data-slide
      role="group"
      aria-roledescription="slide"
      aria-label={`Build ${index + 1} of ${total}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      className="snap-start shrink-0 w-[300px] md:w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-foreground/10 bg-foreground/[0.03]"
    >
      <LazyInstagramEmbed shortcode={shortcode} index={index} total={total} />
    </motion.div>
  );
}
