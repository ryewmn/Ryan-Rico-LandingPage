"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { CountUp } from "@/components/count-up";
import { SectionLabel } from "@/components/ui/section-label";

const stats: { value: number; suffix?: string; label: string }[] = [
  { value: 3, label: "Years on the floor" },
  { value: 200, suffix: "+", label: "Vehicles last year" },
  { value: 5, label: "Internal tools shipped" },
];

export function About() {
  return (
    <section
      id="about"
      className="relative bg-background py-28 md:py-36 border-t border-foreground/10 overflow-hidden"
    >
      {/* Chassis backdrop — silhouettes the right edge, washed to ~12% */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <Image
          src="/hero/grgt-chassis.webp"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.18] dark:opacity-[0.32]"
          style={{ objectPosition: "right center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />
      </div>
      <div className="container relative">
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
              Beyond the phone and inbox I keep the floor&apos;s logs and
              spreadsheets in order, run point on vehicle tracking, and pick
              up internal IT when something needs unwinding.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              After hours I build software for the same workflows I run during
              the day. Five internal tools are live across the floor — a BDC
              toolkit and an AI-assisted car-buying agent are still in
              progress.
            </motion.p>
            <motion.blockquote
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: 0.15 }}
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
              <dt className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
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
