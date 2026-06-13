"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Bot, Instagram, LineChart, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { SITE } from "@/lib/site-config";
import { SectionLabel } from "@/components/ui/section-label";

type Area = {
  icon: LucideIcon;
  title: string;
  description: string;
  link?: { href: string; label: string };
};

const areas: Area[] = [
  {
    icon: LineChart,
    title: "Dashboards",
    description: "Leaderboards and performance trackers for the sales floor.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "AI agents handling the back-and-forth that doesn't need a human.",
  },
  {
    icon: Wrench,
    title: "Building Gundams",
    description: "Off-the-clock Gunpla. Master and Perfect Grades mostly.",
    link: { href: SITE.instagram, label: SITE.instagramHandle },
  },
];

export function CurrentWork() {
  return (
    <section
      id="current-work"
      className="relative bg-white/[0.015] py-28 md:py-36 border-t border-white/10"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-14 lg:gap-24">
          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 lg:order-1 group"
          >
            <div className="relative p-2 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="/hero/gundam.jpg"
                  alt="RX-78-2 Gundam"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition-all duration-[1.2s] grayscale-[0.6] opacity-85 group-hover:grayscale-0 group-hover:opacity-100"
                  style={{ objectPosition: "center" }}
                />
              </div>
              {/* Floating accent — sticks out top-right like the reference */}
              <div className="absolute top-10 -right-5 bg-toyota-red px-5 py-3.5 rounded shadow-2xl shadow-toyota-red/30 z-10">
                <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/70">
                  After hours
                </p>
                <p className="mt-1 text-base font-semibold text-white leading-none">
                  Gunpla
                </p>
              </div>
            </div>
          </motion.div>

          {/* Text column */}
          <div className="order-1 lg:order-2">
            <SectionLabel>Current Work</SectionLabel>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.025em] text-white leading-[1.02]">
              Where I{" "}
              <span className="font-display italic font-normal text-white">
                spend my time.
              </span>
            </h2>

            <div className="mt-12 space-y-10">
              {areas.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.div
                    key={a.title}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="group border-l border-toyota-red/40 pl-7 md:pl-9"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Icon
                        size={14}
                        strokeWidth={2}
                        className="text-toyota-red/70"
                      />
                      <span className="text-[10px] font-mono uppercase tracking-[0.22em] text-white/40">
                        0{i + 1}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-medium tracking-[-0.01em] text-white group-hover:text-toyota-red transition-colors">
                      {a.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-base leading-relaxed text-white/55 max-w-md">
                      {a.description}
                    </p>
                    {a.link ? (
                      <a
                        href={a.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-[0.18em] text-white/55 hover:text-toyota-red transition-colors"
                      >
                        <Instagram size={12} />
                        {a.link.label}
                        <ArrowUpRight size={12} />
                      </a>
                    ) : null}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
