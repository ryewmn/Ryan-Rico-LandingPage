"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Trophy, Bot, Wrench, FileSearch, Lock } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";
import type { LucideIcon } from "lucide-react";

type Status = "Live" | "Building" | "Planning";

type Project = {
  title: string;
  description: string;
  status: Status;
  icon: LucideIcon;
  url?: string;
  isPrivate?: boolean;
};

const dotColor: Record<Status, string> = {
  Live: "bg-emerald-400",
  Building: "bg-amber-400",
  Planning: "bg-neutral-400",
};

const projects: Project[] = [
  {
    title: "Round Rock Toyota Leaderboard",
    description:
      "Sales floor dashboard tracking appointments, shows, and deliveries.",
    status: "Live",
    icon: Trophy,
    url: "https://github.com/ryewmn/ROUND-ROCK-TOYOTA-LEADERBOARD",
  },
  {
    title: "BDC Toolkit",
    description:
      "Script libraries, lead workups, and follow-up helpers for the BDC team.",
    status: "Building",
    icon: Wrench,
    isPrivate: true,
  },
  {
    title: "Car Sales AI Agent",
    description:
      "AI agents that help customers find the right car and the right deal.",
    status: "Building",
    icon: Bot,
    isPrivate: true,
  },
  {
    title: "OpsGlass",
    description:
      "Multimodal document assistant for invoices, contracts, and receipts.",
    status: "Building",
    icon: FileSearch,
    isPrivate: true,
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="relative bg-background py-28 md:py-36 border-t border-white/10"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-14 lg:gap-24">
          {/* Text column */}
          <div className="order-1">
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-[3.5rem] font-semibold tracking-[-0.025em] text-white leading-[1.02]">
              Software for{" "}
              <span className="font-display italic font-normal text-white">
                dealership operations.
              </span>
            </h2>

            <div className="mt-12 space-y-10">
              {projects.map((project, i) => {
                const Icon = project.icon;
                const href = project.url ?? "#contact";
                const ext = Boolean(project.url);
                return (
                  <motion.a
                    key={project.title}
                    href={href}
                    target={ext ? "_blank" : undefined}
                    rel={ext ? "noopener noreferrer" : undefined}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="group block border-l border-toyota-red/40 pl-7 md:pl-9"
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
                      <span className="inline-flex items-center gap-1.5 ml-2 text-[10px] font-mono uppercase tracking-[0.18em] text-white/55">
                        <span
                          className={`h-1 w-1 rounded-full ${dotColor[project.status]}`}
                        />
                        {project.status}
                      </span>
                      {project.isPrivate ? (
                        <Lock
                          size={10}
                          className="text-white/30"
                          aria-label="Private"
                        />
                      ) : null}
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="text-xl md:text-2xl font-medium tracking-[-0.01em] text-white group-hover:text-toyota-red transition-colors">
                        {project.title}
                      </h3>
                      <ArrowUpRight
                        size={18}
                        className="shrink-0 text-white/35 group-hover:text-toyota-red group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      />
                    </div>
                    <p className="mt-2 text-sm md:text-base leading-relaxed text-white/55 max-w-md">
                      {project.description}
                    </p>
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-2 group"
          >
            <div className="relative p-2 rounded-xl border border-white/5 bg-white/[0.02]">
              <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
                <Image
                  src="/hero/supra.jpg"
                  alt="Toyota GR Supra"
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="object-cover transition-all duration-[1.2s] grayscale-[0.6] opacity-85 group-hover:grayscale-0 group-hover:opacity-100"
                  style={{ objectPosition: "60% center" }}
                />
              </div>
              {/* Floating accent */}
              <div className="absolute top-10 -left-5 bg-toyota-red px-5 py-3.5 rounded shadow-2xl shadow-toyota-red/30 z-10">
                <p className="text-[9px] font-mono uppercase tracking-[0.18em] text-white/70">
                  Shipped
                </p>
                <p className="mt-1 text-base font-semibold text-white leading-none">
                  1 Live · 3 Building
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
