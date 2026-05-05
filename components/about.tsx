"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const stats = [
  { value: "3", label: "Years in automotive retail" },
  { value: "150+", label: "Vehicles a year" },
  { value: "1", label: "Internal tool shipped" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative bg-neutral-950 py-24 md:py-32 overflow-hidden"
    >
      <div
        className="absolute inset-0 grid-bg-light opacity-30 mask-fade-b pointer-events-none"
        aria-hidden="true"
      />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 h-[400px] w-[600px] rounded-full bg-toyota-red/10 blur-[140px] pointer-events-none"
      />

      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14">
          <div className="lg:col-span-5">
            <p className="text-sm font-mono uppercase tracking-[0.18em] text-ember">
              About
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance leading-[1.05]">
              Hands on
              <br />
              <span className="font-display italic font-normal text-toyota-red">
                the floor.
              </span>
              <br />
              Hands on
              <br />
              <span className="font-display italic font-normal text-ember">
                the keyboard.
              </span>
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-6 text-[17px] leading-relaxed text-white/75">
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
              className="relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 md:p-8"
            >
              <Quote
                size={28}
                className="absolute -top-4 left-6 text-ember bg-neutral-950 rounded-full p-1 ring-1 ring-white/10"
              />
              <p className="text-white/85 italic">
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
              className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 hover:bg-white/[0.05] hover:border-white/20 transition-colors"
            >
              <p className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                {s.value}
              </p>
              <p className="mt-2 text-sm text-white/55">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
