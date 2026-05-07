"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { CountUp } from "@/components/count-up";

const stats: { value: number; suffix?: string; label: string }[] = [
  { value: 3, label: "Years in automotive retail" },
  { value: 150, suffix: "+", label: "Vehicles a year" },
  { value: 1, label: "Internal tool shipped" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative bg-white py-24 md:py-32 overflow-hidden border-t border-neutral-100"
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 h-[400px] w-[600px] rounded-full bg-toyota-red/[0.04] blur-[140px] pointer-events-none"
      />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <p className="text-sm font-mono uppercase tracking-[0.18em] text-toyota-red">
              <span className="text-neutral-400">01 /</span> About
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 text-balance leading-[1.05]">
              Hands on
              <br />
              <span className="font-display italic font-normal text-toyota-red">
                the floor.
              </span>
              <br />
              Hands on
              <br />
              <span className="font-display italic font-normal text-neutral-900">
                the keyboard.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-[17px] leading-relaxed text-neutral-700">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6 }}
            >
              Three years in at Round Rock Toyota. I work BDC Sales — handling
              internet leads, setting appointments, and walking customers from
              first message to first vehicle. Last year I helped move 150+
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
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="relative rounded-2xl border border-neutral-200 bg-stone-50 p-6 md:p-8"
            >
              <Quote
                size={28}
                className="absolute -top-4 left-6 text-toyota-red bg-white rounded-full p-1 ring-1 ring-neutral-200"
              />
              <p className="text-neutral-800 italic">
                Software shouldn&apos;t replace what works on the floor — it
                should give the team time back so they can do more of it.
              </p>
            </motion.div>
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
              className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_24px_rgba(0,0,0,0.06)] hover:border-neutral-300 transition-all"
            >
              <p className="text-3xl md:text-4xl font-bold tracking-tight text-neutral-900">
                <CountUp value={s.value} suffix={s.suffix ?? ""} />
              </p>
              <p className="mt-2 text-sm text-neutral-500">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
