"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ChevronLeft, ChevronRight, Instagram } from "lucide-react";

/**
 * Drop Instagram post shortcodes into POSTS once you have them — they're
 * the bit after instagram.com/p/  (e.g. for instagram.com/p/AbCdEf123/ the
 * shortcode is "AbCdEf123"). Each becomes an embedded iframe slide that
 * Instagram serves publicly without auth.
 *
 * If POSTS is empty the section renders a tasteful "coming soon" grid.
 */
const POSTS: string[] = [
  "DWwy6-SFmaE",
  "DVnSyTmDa7m",
  "DT1uEenjSen",
  "DS08MXsjbrv",
  "DPxreuwDf0H",
  "DVDAroxjVlh",
];

const PLACEHOLDER_KITS = [
  { grade: "Master Grade", name: "RX-78-2 Ver. Ka" },
  { grade: "Master Grade", name: "Nu Gundam Ver. Ka" },
  { grade: "Perfect Grade", name: "Unicorn Gundam" },
  { grade: "Master Grade", name: "Sazabi Ver. Ka" },
  { grade: "Real Grade", name: "Sinanju" },
  { grade: "Master Grade", name: "Wing Zero EW" },
];

export function Builds() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [hasReal, setHasReal] = useState(POSTS.length > 0);

  useEffect(() => {
    setHasReal(POSTS.length > 0);
  }, []);

  const scrollBy = (dir: "prev" | "next") => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-slide]");
    const distance = card ? card.offsetWidth + 16 : 320;
    el.scrollBy({
      left: dir === "next" ? distance : -distance,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="builds"
      className="relative bg-stone-50 py-24 md:py-32 overflow-hidden border-t border-neutral-100"
    >
      <div
        aria-hidden="true"
        className="absolute -right-40 top-1/3 h-[400px] w-[600px] rounded-full bg-amber-200/30 blur-[160px] pointer-events-none"
      />

      <div className="container relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-sm font-mono uppercase tracking-[0.18em] text-toyota-red">
              <span className="text-neutral-400">05 /</span> Builds
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 text-balance leading-[1.05]">
              From the{" "}
              <span className="font-display italic font-normal text-toyota-red">
                workbench.
              </span>
            </h2>
            <p className="mt-4 text-base text-neutral-600 max-w-md">
              Master Grades and Perfect Grades mostly. Real Grades and High
              Grades when I want a fast build. Latest kits posted on Instagram.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy("prev")}
              aria-label="Previous build"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => scrollBy("next")}
              aria-label="Next build"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 hover:border-neutral-300 transition-colors"
            >
              <ChevronRight size={18} />
            </button>
            <a
              href="https://www.instagram.com/builds.by.ryry/"
              target="_blank"
              rel="noreferrer"
              className="ml-2 inline-flex items-center gap-1.5 rounded-full bg-toyota-red px-4 py-2 text-sm font-medium text-white shadow-red-glow hover:bg-toyota-red-dark transition-colors"
            >
              <Instagram size={14} />
              @builds.by.ryry
            </a>
          </div>
        </div>

        <div className="relative -mx-4 md:-mx-6">
          {/* Edge fades */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-stone-50 to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-stone-50 to-transparent"
          />

          <div
            ref={trackRef}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-px-4 md:scroll-px-6 px-4 md:px-6 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {hasReal
              ? POSTS.map((shortcode, i) => (
                  <BuildSlide key={shortcode} shortcode={shortcode} index={i} />
                ))
              : PLACEHOLDER_KITS.map((kit, i) => (
                  <PlaceholderSlide key={i} kit={kit} index={i} />
                ))}
          </div>
        </div>

        {!hasReal ? (
          <p className="mt-6 text-center text-xs font-mono uppercase tracking-[0.18em] text-neutral-400">
            Live Instagram embeds load in once Ryan drops the post URLs in
          </p>
        ) : null}
      </div>
    </section>
  );
}

function BuildSlide({ shortcode, index }: { shortcode: string; index: number }) {
  return (
    <motion.div
      data-slide
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      className="snap-start shrink-0 w-[300px] md:w-[340px] aspect-[4/5] rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)]"
    >
      <iframe
        src={`https://www.instagram.com/p/${shortcode}/embed/captioned/`}
        title={`Instagram build ${shortcode}`}
        loading="lazy"
        allow="encrypted-media"
        className="h-full w-full"
      />
    </motion.div>
  );
}

function PlaceholderSlide({
  kit,
  index,
}: {
  kit: { grade: string; name: string };
  index: number;
}) {
  return (
    <motion.div
      data-slide
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: 0.05 * index }}
      className="snap-start shrink-0 w-[300px] md:w-[340px] aspect-[4/5] relative rounded-2xl overflow-hidden border border-neutral-200 bg-gradient-to-br from-amber-50 via-white to-toyota-red/5 p-6 flex flex-col justify-between"
    >
      <div className="flex items-start justify-between">
        <Instagram size={18} className="text-neutral-400" />
        <span className="font-mono text-[10px] uppercase tracking-wider text-neutral-400">
          {kit.grade}
        </span>
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="h-32 w-32 rounded-full bg-toyota-red/5 blur-2xl" />
      </div>

      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-toyota-red">
          Coming soon
        </p>
        <h3 className="mt-2 text-2xl font-semibold tracking-tight text-neutral-900 leading-tight">
          {kit.name}
        </h3>
        <a
          href="https://www.instagram.com/builds.by.ryry/"
          target="_blank"
          rel="noreferrer"
          className="group mt-4 inline-flex items-center gap-1.5 text-xs font-medium text-neutral-700 hover:text-toyota-red transition-colors"
        >
          See on Instagram
          <ArrowUpRight
            size={12}
            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          />
        </a>
      </div>
    </motion.div>
  );
}
