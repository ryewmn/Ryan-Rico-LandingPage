"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Github,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";

const RoomScene = dynamic(() => import("@/components/room-scene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="h-72 w-72 rounded-full bg-ember/30 blur-3xl animate-pulse" />
    </div>
  ),
});

const sectionForHotspot: Record<string, string> = {
  pc: "#projects",
  legos: "#current-work",
  gundam: "#current-work",
  toyota: "#about",
  phone: "#contact",
};

export function Hero() {
  const [is3DReady, setIs3DReady] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setIs3DReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleHotspot = (key: string) => {
    const target = sectionForHotspot[key];
    if (target) {
      const el = document.querySelector(target);
      el?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      id="top"
      className="relative isolate min-h-screen w-full overflow-hidden bg-neutral-950 text-white"
    >
      {/* Background scene (desktop only) */}
      {isDesktop && is3DReady ? (
        <div className="absolute inset-0">
          <RoomScene onSelect={handleHotspot} />
        </div>
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 grid-bg-fine opacity-60"
          />
          <div
            aria-hidden="true"
            className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-toyota-red/20 blur-[160px]"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-32 -right-20 h-[400px] w-[400px] rounded-full bg-ember/25 blur-[140px]"
          />
        </>
      )}

      {/* Vignette over scene so HUD reads cleanly */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-neutral-950/70 via-transparent to-neutral-950"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.55)_100%)]"
      />

      {/* HUD overlay */}
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Top bar */}
        <div className="container flex items-start justify-between pt-24 md:pt-28">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-xs"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-ember">
              [ The Workroom ]
            </p>
            <p className="mt-2 text-sm text-white/60">
              {isDesktop
                ? "Hover the desk to see what I work on. Click to jump to that section."
                : "BDC Sales · Software · Builds. Tap below to explore."}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-white/50"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-ember animate-pulse" />
            Live · Round Rock, TX
          </motion.div>
        </div>

        {/* Centered title */}
        <div className="container flex-1 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="max-w-3xl"
          >
            <h1 className="text-[14vw] sm:text-[12vw] md:text-[8.5vw] lg:text-[7.2vw] font-bold tracking-tight leading-[0.92]">
              Ryan{" "}
              <span className="font-display italic font-normal text-gradient-fire">
                Rico.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-white/70 leading-relaxed">
              BDC Sales at Round Rock Toyota. I work internet leads by day,
              build dashboards and AI tools by night, and snap together Gunpla
              kits in between.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Magnetic>
                <Button asChild size="lg">
                  <a href="#contact">
                    Let&apos;s connect
                    <ArrowRight size={18} />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <Button asChild variant="outline-light" size="lg">
                  <a href="#projects">See projects</a>
                </Button>
              </Magnetic>
            </div>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="container pb-10"
        >
          <div className="flex flex-wrap items-end justify-between gap-6">
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs md:text-sm text-white/55">
              <li className="flex items-center gap-2">
                <MapPin size={13} className="text-ember" />
                Round Rock, TX
              </li>
              <li className="hidden sm:flex h-3 w-px bg-white/10" />
              <li>
                <a
                  href="https://github.com/ryewmn"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Github size={13} />
                  github.com/ryewmn
                </a>
              </li>
              <li className="hidden sm:flex h-3 w-px bg-white/10" />
              <li>
                <a
                  href="https://www.linkedin.com/in/ryanchristopherrico/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Linkedin size={13} />
                  LinkedIn
                </a>
              </li>
              <li className="hidden sm:flex h-3 w-px bg-white/10" />
              <li>
                <a
                  href="https://www.instagram.com/builds.by.ryry/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Instagram size={13} />
                  @builds.by.ryry
                </a>
              </li>
              <li className="hidden sm:flex h-3 w-px bg-white/10" />
              <li>
                <a
                  href="mailto:ryanchristopher.rico@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail size={13} />
                  ryanchristopher.rico@gmail.com
                </a>
              </li>
            </ul>

            <a
              href="#about"
              className="group flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-white/50 hover:text-white transition-colors"
            >
              Scroll
              <ChevronDown
                size={14}
                className="transition-transform group-hover:translate-y-0.5 animate-bounce"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
