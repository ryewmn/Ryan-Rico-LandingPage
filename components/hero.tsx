"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Bot,
  Building2,
  Github,
  Instagram,
  LineChart,
  Linkedin,
  MapPin,
  Phone,
  Sparkles,
  Trophy,
  Wrench,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";
import { CountUp } from "@/components/count-up";

const fade = (i: number) => ({
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: {
    duration: 0.5,
    delay: 0.05 * i,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

function Card({
  className = "",
  children,
  index = 0,
  href,
}: {
  className?: string;
  children: React.ReactNode;
  index?: number;
  href?: string;
}) {
  const base =
    "group relative flex flex-col h-full rounded-3xl border border-neutral-200 bg-white p-6 md:p-7 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_rgba(0,0,0,0.04)] transition-all hover:-translate-y-0.5 hover:shadow-[0_2px_4px_rgba(0,0,0,0.05),0_16px_40px_rgba(0,0,0,0.07)] hover:border-neutral-300";

  if (href) {
    const isExternal =
      href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel");
    return (
      <motion.a
        {...fade(index)}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className={`${base} ${className}`}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.div {...fade(index)} className={`${base} ${className}`}>
      {children}
    </motion.div>
  );
}

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate w-full overflow-hidden bg-white text-neutral-900"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 dot-pattern-soft mask-edges opacity-80"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-20 h-[600px] w-[700px] rounded-full bg-toyota-red/[0.04] blur-[160px]"
      />

      <div className="relative z-10 container pt-28 md:pt-32 pb-14">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex items-center justify-between"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-toyota-red">
            [ Ryan Rico ] · Personal site
          </p>
          <div className="hidden md:flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-toyota-red animate-pulse" />
            Live · Round Rock, TX
          </div>
        </motion.div>

        {/* Bento — 12-col grid, col-span only, every row sizes to its tallest card. */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4">
          {/* Row 1 — Hero name (full width) */}
          <Card
            index={0}
            className="md:col-span-12 bg-gradient-to-br from-toyota-red/[0.04] via-white to-neutral-50"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="relative h-12 w-12 shrink-0 rounded-2xl overflow-hidden bg-gradient-to-br from-toyota-red to-ember text-white flex items-center justify-center font-bold text-base tracking-tight shadow-[0_8px_24px_rgba(235,10,30,0.25)] ring-1 ring-white/30">
                  <span className="absolute inset-0 grid-bg-fine opacity-20" aria-hidden="true" />
                  <span className="relative">RR</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-toyota-red">
                    BDC Sales / Software / Builds
                  </span>
                  <span className="text-xs text-neutral-500 mt-0.5">
                    Round Rock Toyota · est. 2023
                  </span>
                </div>
              </div>
              <Sparkles size={14} className="text-toyota-red mt-1.5" />
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[88px] font-bold tracking-tight leading-[0.95] text-neutral-900">
              Ryan{" "}
              <span className="font-display italic font-normal text-gradient-fire">
                Rico.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base md:text-lg text-neutral-600 leading-relaxed">
              BDC Sales at Round Rock Toyota. Internet leads by day, dashboards
              and AI tools by night, Gunpla in between.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3">
              <div className="relative isolate inline-flex">
                {/* Soft pulse glow behind the CTA. Uses an absolutely
                    positioned span (not before:-z-10) so it renders
                    correctly on iOS Safari's stacking context. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 rounded-full bg-toyota-red/30 blur-md animate-pulse motion-reduce:hidden"
                />
                <Magnetic>
                  <Button asChild size="lg" className="relative">
                    <a href="#contact">
                      Let&apos;s connect
                      <ArrowRight size={16} />
                    </a>
                  </Button>
                </Magnetic>
              </div>
              <Magnetic strength={0.25}>
                <Button asChild variant="outline" size="lg">
                  <a href="#projects">See projects</a>
                </Button>
              </Magnetic>
            </div>
          </Card>

          {/* Row 2 — Now (6) + Stat (3) + Stat (3) */}
          <Card index={1} className="md:col-span-6 justify-between">
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                Now
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-wider text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Open to software work
              </span>
            </div>
            <div className="mt-6">
              <p className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 leading-tight">
                BDC Sales at{" "}
                <span className="font-display italic font-normal text-toyota-red">
                  Round Rock Toyota.
                </span>
              </p>
              <p className="mt-2 text-sm text-neutral-500 inline-flex items-center gap-2">
                <Building2 size={13} className="text-toyota-red" />
                3 years on the floor · 150+ vehicles a year
              </p>
            </div>
          </Card>

          <Card index={2} className="md:col-span-3 justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400">
              Years
            </span>
            <p className="mt-6 text-5xl md:text-6xl font-bold tracking-tight text-neutral-900 leading-none">
              <CountUp value={3} />
            </p>
            <p className="mt-3 text-xs text-neutral-500">in automotive retail</p>
          </Card>

          <Card
            index={3}
            className="md:col-span-3 justify-between bg-gradient-to-br from-toyota-red/[0.03] to-white"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400">
              Per year
            </span>
            <p className="mt-6 text-5xl md:text-6xl font-bold tracking-tight text-toyota-red leading-none">
              <CountUp value={150} suffix="+" />
            </p>
            <p className="mt-3 text-xs text-neutral-500">vehicles delivered</p>
          </Card>

          {/* Row 3 — Featured Project (6) + Builds IG (6) */}
          <Card
            index={4}
            href="https://github.com/ryewmn/ROUND-ROCK-TOYOTA-LEADERBOARD"
            className="md:col-span-6 justify-between"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-toyota-red/10 text-toyota-red ring-1 ring-toyota-red/20">
                <Trophy size={20} />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Live
              </span>
            </div>

            <div className="mt-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                Featured project
              </span>
              <h3 className="mt-2 text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 leading-tight">
                Round Rock Toyota{" "}
                <span className="font-display italic font-normal text-toyota-red">
                  Leaderboard.
                </span>
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-600 max-w-md">
                Internal performance dashboard for the sales floor — appointments,
                shows, and deliveries by salesperson.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["TypeScript", "Next.js", "Tailwind"].map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-neutral-100 px-2 py-0.5 text-[10px] font-medium text-neutral-700 ring-1 ring-neutral-200"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 group-hover:text-toyota-red transition-colors">
                View on GitHub
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </div>
          </Card>

          <Card
            index={5}
            href="https://www.instagram.com/builds.by.ryry/"
            className="md:col-span-6 justify-between bg-gradient-to-br from-neutral-50 via-white to-toyota-red/[0.03]"
          >
            <div className="flex items-start justify-between">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-neutral-900 ring-1 ring-neutral-200 shadow-sm">
                <Instagram size={20} />
              </div>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500">
                Instagram
              </span>
            </div>

            <div className="mt-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-toyota-red">
                Builds
              </span>
              <h3 className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight text-neutral-900 leading-tight">
                @builds.by.ryry
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-neutral-700 max-w-md">
                Master Grades and Perfect Grades mostly. Real Grades and High
                Grades when I want a fast build.
              </p>
              <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 group-hover:text-toyota-red transition-colors">
                Follow the builds
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </div>
            </div>
          </Card>

          {/* Row 4 — Current Work (6) + GitHub (3) + LinkedIn (3) */}
          <Card
            index={6}
            href="#current-work"
            className="md:col-span-6 justify-between"
          >
            <div className="flex items-start justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-400">
                Current Work
              </span>
              <ArrowUpRight
                size={15}
                className="text-neutral-400 group-hover:text-toyota-red transition-colors"
              />
            </div>
            <ul className="mt-6 space-y-2.5 text-sm text-neutral-800">
              <li className="flex items-center gap-2.5">
                <LineChart size={13} className="text-toyota-red shrink-0" />
                Dashboards for the sales floor
              </li>
              <li className="flex items-center gap-2.5">
                <Bot size={13} className="text-toyota-red shrink-0" />
                AI agents for lead workups
              </li>
              <li className="flex items-center gap-2.5">
                <Wrench size={13} className="text-toyota-red shrink-0" />
                Master Grade & Perfect Grade Gunpla
              </li>
            </ul>
          </Card>

          <Card
            index={7}
            href="https://github.com/ryewmn"
            className="md:col-span-3 justify-between"
          >
            <Github size={20} className="text-neutral-700" />
            <div className="mt-6">
              <p className="text-sm font-semibold text-neutral-900">GitHub</p>
              <p className="text-xs text-neutral-500">@ryewmn</p>
            </div>
          </Card>

          <Card
            index={8}
            href="https://www.linkedin.com/in/ryanchristopherrico/"
            className="md:col-span-3 justify-between"
          >
            <Linkedin size={20} className="text-neutral-700" />
            <div className="mt-6">
              <p className="text-sm font-semibold text-neutral-900">LinkedIn</p>
              <p className="text-xs text-neutral-500">Ryan Rico</p>
            </div>
          </Card>

          {/* Row 5 — Contact CTA (full width) */}
          <Card
            index={9}
            href="#contact"
            className="md:col-span-12 bg-gradient-to-r from-toyota-red/[0.06] via-neutral-50 to-toyota-red/[0.06]"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-toyota-red/10 text-toyota-red ring-1 ring-toyota-red/30 shrink-0">
                  <Phone size={20} />
                </div>
                <div className="min-w-0">
                  <p className="text-lg md:text-xl font-semibold text-neutral-900 tracking-tight">
                    Looking for a vehicle, or want to talk{" "}
                    <span className="font-display italic font-normal">software?</span>
                  </p>
                  <p className="text-sm text-neutral-600 mt-0.5">
                    (717) 781-4318 · ryanchristopher.rico@gmail.com · I respond within a business day
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 text-sm font-medium text-neutral-700 group-hover:text-toyota-red transition-colors">
                <MapPin size={14} className="text-toyota-red" />
                Round Rock, TX
                <ArrowUpRight size={16} className="ml-1" />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
