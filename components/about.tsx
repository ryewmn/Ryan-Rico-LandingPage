"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { CountUp } from "@/components/count-up";
import { SectionLabel } from "@/components/ui/section-label";

const stats: { value: number; suffix?: string; label: string }[] = [
  { value: 3, label: "Years in automotive retail" },
  { value: 200, suffix: "+", label: "Vehicles a year" },
  { value: 1, label: "Internal tool shipped" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative bg-background py-24 md:py-32 overflow-hidden border-t border-white/10"
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 h-[400px] w-[600px] rounded-full bg-toyota-red/[0.06] blur-[140px] pointer-events-none"
      />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <SectionLabel number="01">About</SectionLabel>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-white text-balance leading-[1.05]">
              Hands on
              <br />
              <span className="font-display italic font-normal text-gradient-ember">
                the floor.
              </span>
              <br />
              Hands on
              <br />
              <span className="font-display italic font-normal text-white/70">
                the keyboard.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-[17px] leading-relaxed text-white/70">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              Three years in at Round Rock Toyota. I work BDC Sales — handling
              internet leads, setting appointments, and walking customers from
              first message to first vehicle. Last year I helped move 200+
              vehicles through that funnel.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              After hours I build software for the same workflows I run during
              the day. The first tool I shipped — a leaderboard for the sales
              floor — is live. The next ones (a BDC toolkit and an AI-assisted
              car-buying agent) are in progress.
            </motion.p>
            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative border-l-2 border-toyota-red/70 pl-6 md:pl-8 py-2"
            >
              <Quote
                size={22}
                className="absolute -left-[12px] -top-1 text-toyota-red bg-background rounded-full p-1 ring-1 ring-white/10"
              />
              <blockquote className="font-display text-xl md:text-2xl italic text-white/90 leading-snug">
                Software shouldn&apos;t replace what works on the floor — it
                should give the team time back so they can do more of it.
              </blockquote>
            </motion.figure>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:bg-white/[0.05] hover:border-white/20"
            >
              <p className="text-4xl md:text-5xl font-semibold tracking-tight text-white">
                <CountUp value={s.value} suffix={s.suffix ?? ""} />
              </p>
              <p className="mt-2 text-sm text-white/50">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
