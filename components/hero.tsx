"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Github, Instagram, Linkedin, Sparkles } from "lucide-react";
import { ArrowPill } from "@/components/ui/arrow-pill";
import { SITE } from "@/lib/site-config";

const socials = [
  { href: SITE.github, label: "GitHub", Icon: Github },
  { href: SITE.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SITE.instagram, label: "Instagram", Icon: Instagram },
];

const trustStats = [
  { value: "3 yrs", label: "On the floor" },
  { value: "150+", label: "Vehicles a year" },
  { value: "Live", label: "Round Rock, TX" },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] w-full overflow-hidden grain bg-neutral-950"
    >
      {/* Toyota GR Supra — cinematic background with slow Ken Burns drift */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1.0 }}
        transition={{ duration: 14, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src="/hero/supra.jpg"
          alt="Toyota GR Supra"
          fill
          priority
          sizes="100vw"
          className="object-cover object-[58%_center]"
        />
      </motion.div>

      {/* Overlays — darken left for text, deepen bottom for mood */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-neutral-950/70"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_30%_40%,transparent_30%,rgba(7,10,15,0.65)_100%)]"
      />

      {/* Content */}
      <div className="relative z-10 container flex min-h-[100svh] flex-col justify-end pb-14 pt-28">
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 backdrop-blur"
          >
            <Sparkles size={13} className="text-ember" />
            <span className="text-[12px] font-medium tracking-tight text-white/80">
              From the sales floor to the codebase
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease }}
            className="mt-6 max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] font-semibold tracking-[-0.03em] leading-[0.95] text-white"
          >
            Built on the floor.
            <br />
            Shipping{" "}
            <span className="font-display italic font-normal text-gradient-ember">
              software.
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease }}
            className="mt-9 flex flex-wrap items-center gap-5"
          >
            <ArrowPill href="#contact" tone="light" size="md">
              Get in touch
            </ArrowPill>

            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {socials.map(({ href, label, Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-neutral-900/80 text-white/80 backdrop-blur transition-colors hover:text-white hover:border-white/40"
                  >
                    <Icon size={15} />
                  </a>
                ))}
              </div>
              <p className="text-[12.5px] leading-tight text-white/55 max-w-[150px]">
                BDC Sales at Round&nbsp;Rock&nbsp;Toyota
              </p>
            </div>
          </motion.div>
        </div>

        {/* Trust strip — replaces the standalone footer text */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.28, ease }}
          className="mt-16 flex flex-wrap items-end justify-between gap-8"
        >
          <ul className="flex flex-wrap items-stretch gap-x-10 gap-y-4">
            {trustStats.map((s) => (
              <li
                key={s.label}
                className="flex items-baseline gap-2.5 border-l border-white/15 pl-4"
              >
                <span className="text-2xl font-semibold tracking-tight text-white">
                  {s.value}
                </span>
                <span className="text-[11px] font-mono uppercase tracking-[0.18em] text-white/45">
                  {s.label}
                </span>
              </li>
            ))}
          </ul>

          <a
            href="#about"
            className="group inline-flex items-center gap-2 text-[11px] font-mono uppercase tracking-[0.22em] text-white/55 hover:text-white transition-colors"
            aria-label="Scroll to next section"
          >
            <span>Scroll</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/20 transition-transform group-hover:translate-y-0.5 motion-reduce:transition-none">
              <ChevronDown size={13} />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
