"use client";

import { motion } from "framer-motion";
import { CountUp } from "@/components/count-up";
import { SectionLabel } from "@/components/ui/section-label";

const stats: { value: number; suffix?: string; label: string }[] = [
  { value: 3, label: "Years on the floor" },
  { value: 200, suffix: "+", label: "Vehicles last year" },
  { value: 1, label: "Internal tool shipped" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative bg-background py-28 md:py-36 border-t border-foreground/10"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          <div className="lg:col-span-5">
            <SectionLabel>About</SectionLabel>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-[3.75rem] font-semibold tracking-[-0.025em] leading-[1.02] text-foreground">
              Hands on the floor.
              <br />
              Hands on the keyboard.
            </h2>
          </div>

          <div className="lg:col-span-7 space-y-7 text-[17px] leading-[1.65] text-foreground/65">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
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
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
            >
              After hours I build software for the same workflows I run during
              the day. The first tool I shipped — a leaderboard for the sales
              floor — is live. A BDC toolkit and an AI-assisted car-buying
              agent are in progress.
            </motion.p>
            <motion.blockquote
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-2xl md:text-[1.75rem] italic text-foreground leading-[1.3] pt-2"
            >
              &ldquo;Software shouldn&apos;t replace what works on the floor —
              it should give the team time back so they can do more of it.&rdquo;
            </motion.blockquote>
          </div>
        </div>

        <dl className="mt-24 grid grid-cols-1 sm:grid-cols-3 border-t border-foreground/10">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className={`py-8 ${i > 0 ? "sm:border-l border-foreground/10 sm:pl-8" : ""}`}
            >
              <dt className="text-xs font-mono uppercase tracking-[0.22em] text-foreground/40">
                {s.label}
              </dt>
              <dd className="mt-3 text-5xl md:text-6xl font-semibold tracking-[-0.04em] text-foreground tabular-nums">
                <CountUp value={s.value} suffix={s.suffix ?? ""} />
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
