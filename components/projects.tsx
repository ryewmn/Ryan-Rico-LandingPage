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
      className="relative bg-background py-24 md:py-32 overflow-hidden border-t border-white/10"
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/4 h-[500px] w-[700px] rounded-full bg-toyota-red/[0.06] blur-[160px] pointer-events-none"
      />
      <div className="container relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Text column */}
          <div className="lg:col-span-7">
            <SectionLabel number="03">Featured Projects</SectionLabel>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-white text-balance leading-[1.05]">
              Software for{" "}
              <span className="font-display italic font-normal text-gradient-ember">
                dealership operations.
              </span>
            </h2>

            <ul className="mt-12 border-t border-white/10">
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
                      className="group flex items-center gap-5 py-5 transition-colors"
                    >
                      <Icon
                        size={18}
                        strokeWidth={2}
                        className="shrink-0 text-toyota-red/80 group-hover:text-toyota-red transition-colors"
                      />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base md:text-lg font-medium tracking-tight text-white group-hover:text-ember transition-colors">
                          {project.title}
                        </h3>
                        <p className="text-xs text-white/45">
                          {project.description}
                        </p>
                      </div>
                      <span className="hidden sm:inline-flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-white/55">
                        <span
                          className={`h-1.5 w-1.5 rounded-full ${dotColor[project.status]}`}
                        />
                        {project.status}
                      </span>
                      {project.isPrivate ? (
                        <Lock
                          size={12}
                          className="hidden sm:block text-white/30"
                          aria-label="Private"
                        />
                      ) : null}
                      <ArrowUpRight
                        size={16}
                        className="shrink-0 text-white/40 group-hover:text-ember group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
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
