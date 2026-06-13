"use client";

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
      className="relative bg-white/[0.015] py-24 md:py-32 overflow-hidden border-t border-white/10"
    >
      <div className="container relative">
        <div className="max-w-2xl mb-16">
          <SectionLabel number="02">Current Work</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-white text-balance leading-[1.05]">
            Where I{" "}
            <span className="font-display italic font-normal text-gradient-ember">
              spend my time.
            </span>
          </h2>
        </div>

        <ul className="border-t border-white/10">
          {areas.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.li
                key={a.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group grid grid-cols-12 items-start gap-x-6 gap-y-2 border-b border-white/10 py-7 md:py-9 transition-colors hover:bg-white/[0.025]"
              >
                <span className="col-span-2 md:col-span-1 pt-1 text-xs font-mono text-white/35 tracking-widest">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Icon
                  size={20}
                  strokeWidth={2}
                  className="hidden md:block col-span-1 mt-1 text-toyota-red"
                />
                <div className="col-span-10 md:col-span-7">
                  <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
                    {a.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55 max-w-xl">
                    {a.description}
                  </p>
                </div>
                {a.link ? (
                  <a
                    href={a.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="col-span-12 md:col-span-3 flex items-center justify-start md:justify-end gap-1.5 text-sm font-medium text-white/80 hover:text-ember transition-colors"
                  >
                    <Instagram size={14} />
                    {a.link.label}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                ) : (
                  <span className="hidden md:block md:col-span-3" />
                )}
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
