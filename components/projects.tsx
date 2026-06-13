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
    description: "Sales floor dashboard, daily.",
    status: "Live",
    icon: Trophy,
    url: "https://github.com/ryewmn/ROUND-ROCK-TOYOTA-LEADERBOARD",
  },
  {
    title: "BDC Toolkit",
    description: "Scripts, workups, follow-ups.",
    status: "Building",
    icon: Wrench,
    isPrivate: true,
  },
  {
    title: "Car Sales AI Agent",
    description: "AI for finding the right car.",
    status: "Building",
    icon: Bot,
    isPrivate: true,
  },
  {
    title: "OpsGlass",
    description: "Multimodal doc assistant.",
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          {/* Text column */}
          <div className="lg:col-span-7">
            <SectionLabel>Selected Work</SectionLabel>
            <h2 className="mt-5 text-4xl md:text-5xl lg:text-[3.75rem] font-semibold tracking-[-0.025em] text-white leading-[1.02]">
              Software for{" "}
              <span className="font-display italic font-normal text-white">
                dealership operations.
              </span>
            </h2>

            <ul className="mt-14 border-t border-white/10">
              {projects.map((project, i) => {
                const Icon = project.icon;
                const href = project.url ?? "#contact";
                const ext = Boolean(project.url);
                return (
                  <motion.li
                    key={project.title}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: i * 0.05 }}
                    className="border-b border-white/10"
                  >
                    <a
                      href={href}
                      target={ext ? "_blank" : undefined}
                      rel={ext ? "noopener noreferrer" : undefined}
                      className="group flex items-baseline gap-6 py-6"
                    >
                      <Icon
                        size={16}
                        strokeWidth={2}
                        className="shrink-0 translate-y-1 text-toyota-red/70 group-hover:text-toyota-red transition-colors"
                      />
                      <div className="min-w-0 flex-1 flex items-baseline gap-x-4 gap-y-1 flex-wrap">
                        <h3 className="text-lg md:text-xl font-medium tracking-[-0.01em] text-white">
                          {project.title}
                        </h3>
                        <p className="text-sm text-white/45">
                          {project.description}
                        </p>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-[0.15em] text-white/50">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${dotColor[project.status]}`}
                        />
                        {project.status}
                      </span>
                      {project.isPrivate ? (
                        <Lock
                          size={11}
                          className="hidden sm:block text-white/25"
                          aria-label="Private"
                        />
                      ) : null}
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-white/35 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
                      />
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </div>

          {/* Photo column */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5 lg:sticky lg:top-24"
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl ring-1 ring-white/10">
              <Image
                src="/hero/supra.jpg"
                alt="Toyota GR Supra"
                fill
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
                style={{ objectPosition: "60% center" }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
