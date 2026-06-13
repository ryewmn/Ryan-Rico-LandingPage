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
    description: "For the sales floor.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Lead workups, follow-ups.",
  },
  {
    icon: Wrench,
    title: "Building Gundams",
    description: "Master and Perfect Grades.",
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Photo column — left on desktop */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-24 order-2 lg:order-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10">
              <Image
                src="/hero/grgt-chassis.webp"
                alt="Toyota GR GT chassis"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "center" }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
              />
            </div>
          </motion.div>

          {/* Text column */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <SectionLabel>Current Work</SectionLabel>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-[3.75rem] font-semibold tracking-[-0.025em] text-white leading-[1.02]">
              Where I{" "}
              <span className="font-display italic font-normal text-white">
                spend my time.
              </span>
            </h2>

            <ul className="mt-14 border-t border-white/10">
              {areas.map((a, i) => {
                const Icon = a.icon;
                return (
                  <motion.li
                    key={a.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className="flex items-baseline gap-6 border-b border-white/10 py-6"
                  >
                    <Icon
                      size={16}
                      strokeWidth={2}
                      className="shrink-0 translate-y-1 text-toyota-red/70"
                    />
                    <div className="min-w-0 flex-1 flex items-baseline gap-x-4 gap-y-1 flex-wrap">
                      <h3 className="text-lg md:text-xl font-medium tracking-[-0.01em] text-white">
                        {a.title}
                      </h3>
                      <p className="text-sm text-white/45">{a.description}</p>
                    </div>
                    {a.link ? (
                      <a
                        href={a.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-1.5 text-sm font-medium text-white/80 hover:text-ember transition-colors"
                      >
                        <Instagram size={14} />
                        <span className="hidden sm:inline">{a.link.label}</span>
                        <ArrowUpRight
                          size={14}
                          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </a>
                    ) : null}
                  </motion.li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
