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
    description:
      "Building dashboards for the sales floor — leaderboards, performance trackers, anything that gives the team a clearer signal of where the day is going.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description:
      "Wiring AI agents into the workflows that eat my team's day — lead workups, follow-up drafts, and the back-and-forth that doesn't need a human.",
  },
  {
    icon: Wrench,
    title: "Building Gundams",
    description:
      "Off-the-clock Gunpla. Master Grades and Perfect Grades mostly — Real Grades and High Grades when I want a fast build. Posted on Instagram.",
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <SectionLabel number="02">Current Work</SectionLabel>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-white text-balance leading-[1.05]">
              Where I{" "}
              <span className="font-display italic font-normal text-gradient-ember">
                spend my time.
              </span>
            </h2>
          </div>
          <p className="text-base text-white/55 max-w-md">
            A mix of code, AI, and building things with my hands. Most of the
            satisfaction lives in the same place — making something work.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {areas.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.article
                key={a.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition-all hover:bg-white/[0.06] hover:border-white/20"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-toyota-red/15 text-toyota-red ring-1 ring-toyota-red/25 group-hover:bg-toyota-red group-hover:text-white group-hover:ring-toyota-red transition-colors">
                  <Icon size={20} strokeWidth={2} />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-white">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {a.description}
                </p>
                {a.link ? (
                  <a
                    href={a.link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-ember transition-colors"
                  >
                    <Instagram size={14} />
                    {a.link.label}
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </a>
                ) : null}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
