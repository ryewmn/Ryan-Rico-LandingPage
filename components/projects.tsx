"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Trophy, Bot, Wrench, FileSearch, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionLabel } from "@/components/ui/section-label";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import type { LucideIcon } from "lucide-react";

type Status = "Live" | "Building" | "Planning";

type Project = {
  title: string;
  description: string;
  status: Status;
  tags: string[];
  icon: LucideIcon;
  url?: string;
  isPrivate?: boolean;
};

const statusVariant: Record<Status, "live" | "building" | "planning"> = {
  Live: "live",
  Building: "building",
  Planning: "planning",
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
      "Internal performance dashboard for the sales floor. Tracks appointments, shows, and deliveries by salesperson with daily and monthly views.",
    status: "Live",
    tags: ["TypeScript", "Next.js", "Tailwind"],
    icon: Trophy,
    url: "https://github.com/ryewmn/ROUND-ROCK-TOYOTA-LEADERBOARD",
  },
  {
    title: "BDC Toolkit",
    description:
      "A working set of tools for the Round Rock Toyota BDC — script libraries, lead workups, and follow-up helpers built around how the team actually works.",
    status: "Building",
    tags: ["Internal", "BDC", "Workflow"],
    icon: Wrench,
    isPrivate: true,
  },
  {
    title: "Car Sales AI Agent",
    description:
      "Experimenting with AI agents that help customers find the right car and the right deal — the tedious back-and-forth, automated.",
    status: "Building",
    tags: ["AI Agents", "JavaScript", "Automation"],
    icon: Bot,
    isPrivate: true,
  },
  {
    title: "OpsGlass",
    description:
      "AI-powered multimodal document assistant that ingests invoices, contracts, and receipts from uploads, Google Drive, and Gmail, and allows natural language querying using Hugging Face models. Includes semantic search, structured extraction, and anomaly detection.",
    status: "Building",
    tags: ["AI", "Hugging Face", "Semantic Search"],
    icon: FileSearch,
    isPrivate: true,
  },
];

export function Projects() {
  return (
    <section
      id="projects"
      className="relative isolate bg-background py-24 md:py-32 overflow-hidden border-t border-white/10"
    >
      <SectionBackdrop src="/hero/gr-gt3.jpg" alt="Toyota GR GT3" focus="right" intensity="deep" />
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/4 h-[500px] w-[700px] rounded-full bg-toyota-red/[0.07] blur-[160px] pointer-events-none -z-10"
      />
      <div className="container relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <SectionLabel number="03">Featured Projects</SectionLabel>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-white text-balance leading-[1.05]">
              Software for{" "}
              <span className="font-display italic font-normal text-gradient-ember">
                dealership operations.
              </span>
            </h2>
          </div>
          <p className="text-base text-white/55 max-w-md">
            A working set of tools focused on appointments, acquisition, and
            retention. Built in production, refined on the floor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => {
            const Icon = project.icon;
            const featured = project.status === "Live";
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className={`group relative overflow-hidden rounded-2xl border bg-neutral-950/65 backdrop-blur-sm p-7 transition-all hover:bg-neutral-950/75 hover:border-white/20 hover:-translate-y-0.5 ${
                  featured ? "border-toyota-red/30" : "border-white/10"
                }`}
              >
                {featured ? (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-toyota-red to-transparent"
                  />
                ) : null}

                {featured ? (
                  <span className="absolute right-7 top-7 inline-flex items-center gap-1.5 rounded-full border border-toyota-red/30 bg-toyota-red/10 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-toyota-red">
                    ★ Featured
                  </span>
                ) : null}

                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-toyota-red/15 text-toyota-red ring-1 ring-toyota-red/25">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  {!featured ? (
                    <Badge variant={statusVariant[project.status]}>
                      <span
                        className={`mr-1.5 h-1.5 w-1.5 rounded-full inline-block ${dotColor[project.status]}`}
                      />
                      {project.status}
                    </Badge>
                  ) : null}
                </div>

                <h3 className="mt-6 text-xl font-semibold tracking-tight text-white">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-white/60">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-white/[0.06] px-2.5 py-1 text-xs font-medium text-white/65 ring-1 ring-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">
                  {project.url ? (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-ember transition-colors"
                      aria-label={`View ${project.title} on GitHub`}
                    >
                      View on GitHub
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  ) : (
                    <a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 text-sm font-medium text-white hover:text-ember transition-colors"
                      aria-label={`Ask about ${project.title}`}
                    >
                      Ask about it
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </a>
                  )}
                  {project.isPrivate ? (
                    <span className="inline-flex items-center gap-1 text-xs text-white/40">
                      <Lock size={11} />
                      Private repo
                    </span>
                  ) : null}
                </div>

                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-12 -right-12 h-32 w-32 rounded-full bg-toyota-red/25 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-toyota-red to-transparent scale-x-0 origin-center transition-transform duration-500 group-hover:scale-x-100"
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
