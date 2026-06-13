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
      "Multimodal document assistant for invoices, contracts, and receipts — natural-language querying with Hugging Face.",
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
      {/* Section backdrop — GR Supra headlight macro */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <Image
          src="/hero/supra.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.5]"
          style={{ objectPosition: "right center" }}
        />
        <div className="absolute inset-0 bg-gradient-to-l from-background/30 via-background/75 to-background" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-transparent to-background/90" />
      </div>
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/4 h-[500px] w-[700px] rounded-full bg-toyota-red/[0.06] blur-[160px] pointer-events-none"
      />
      <div className="container relative">
        <div className="max-w-2xl mb-16">
          <SectionLabel number="03">Featured Projects</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-white text-balance leading-[1.05]">
            Software for{" "}
            <span className="font-display italic font-normal text-gradient-ember">
              dealership operations.
            </span>
          </h2>
        </div>

        <ul className="border-t border-white/10">
          {projects.map((project, i) => {
            const Icon = project.icon;
            const href = project.url ?? "#contact";
            const cta = project.url ? "View on GitHub" : "Ask about it";
            const ext = Boolean(project.url);
            return (
              <motion.li
                key={project.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="border-b border-white/10"
              >
                <a
                  href={href}
                  target={ext ? "_blank" : undefined}
                  rel={ext ? "noopener noreferrer" : undefined}
                  className="group grid grid-cols-12 items-start gap-x-6 gap-y-2 py-7 md:py-9 transition-colors hover:bg-white/[0.025]"
                >
                  <span className="col-span-2 md:col-span-1 pt-1 text-xs font-mono text-white/35 tracking-widest">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    size={20}
                    strokeWidth={2}
                    className="hidden md:block col-span-1 mt-1 text-toyota-red"
                  />
                  <div className="col-span-10 md:col-span-6">
                    <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-white">
                      {project.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/55 max-w-xl">
                      {project.description}
                    </p>
                  </div>
                  <div className="col-span-6 md:col-span-2 flex items-center gap-2 text-xs text-white/55">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${dotColor[project.status]}`}
                    />
                    {project.status}
                    {project.isPrivate ? (
                      <span className="ml-2 inline-flex items-center gap-1 text-white/35">
                        <Lock size={10} />
                        Private
                      </span>
                    ) : null}
                  </div>
                  <span className="col-span-6 md:col-span-2 flex items-center justify-end gap-1.5 text-sm font-medium text-white/80 group-hover:text-ember transition-colors">
                    {cta}
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </span>
                </a>
              </motion.li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
