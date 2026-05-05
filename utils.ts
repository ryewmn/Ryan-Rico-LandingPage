"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Trophy, Bot, Wrench, Send } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { LucideIcon } from "lucide-react";

type Status = "Live" | "Building" | "Planning";

type Project = {
  title: string;
  description: string;
  status: Status;
  tags: string[];
  icon: LucideIcon;
};

const statusVariant: Record<Status, "live" | "building" | "planning"> = {
  Live: "live",
  Building: "building",
  Planning: "planning",
};

const projects: Project[] = [
  {
    title: "Round Rock Toyota Leaderboard",
    description:
      "An internal performance dashboard for the sales floor. Tracks appointments, shows, and closes by salesperson with daily and monthly views.",
    status: "Live",
    tags: ["Next.js", "Supabase", "Tailwind"],
    icon: Trophy,
  },
  {
    title: "AI Vehicle Negotiation Engine",
    description:
      "An assistant that helps acquisition managers price private-party vehicles and structure offers based on equity, market data, and customer goals.",
    status: "Building",
    tags: ["AI Agents", "TypeScript", "Automation"],
    icon: Bot,
  },
  {
    title: "Service-to-Sales Workflow",
    description:
      "A repeatable process that surfaces service customers with strong trade equity and routes qualified opportunities to the sales team in real time.",
    status: "Building",
    tags: ["Process", "Automation", "BDC"],
    icon: Wrench,
  },
  {
    title: "Lead Follow-Up System",
    description:
      "A structured cadence engine for internet leads. Multi-touch outreach across call, text, and email with clear handoff once the customer responds.",
    status: "Planning",
    tags: ["CRM", "Workflows", "Retention"],
    icon: Send,
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative bg-white py-24 md:py-32">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-mono uppercase tracking-[0.18em] text-toyota-red">
              Featured Projects
            </p>
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 text-balance">
              Software for dealership operations.
            </h2>
          </div>
          <p className="text-base text-neutral-600 max-w-md">
            A working set of tools focused on appointments, acquisition, and
            retention. Built in production, refined on the floor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {projects.map((project, i) => {
            const Icon = project.icon;
            return (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="group relative overflow-hidden rounded-2xl border border-neutral-200 bg-white p-7 shadow-soft hover:shadow-soft-lg hover:border-neutral-300 transition-all duration-300"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-neutral-900 text-white">
                    <Icon size={22} strokeWidth={2} />
                  </div>
                  <Badge variant={statusVariant[project.status]}>
                    <span
                      className={
                        project.status === "Live"
                          ? "mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 inline-block"
                          : project.status === "Building"
                          ? "mr-1.5 h-1.5 w-1.5 rounded-full bg-amber-500 inline-block"
                          : "mr-1.5 h-1.5 w-1.5 rounded-full bg-neutral-400 inline-block"
                      }
                    />
                    {project.status}
                  </Badge>
                </div>

                <h3 className="mt-6 text-xl font-semibold tracking-tight text-neutral-900">
                  {project.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                  {project.description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-md bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex items-center justify-between border-t border-neutral-100 pt-5">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-900 hover:text-toyota-red transition-colors"
                    aria-label={`View details about ${project.title}`}
                  >
                    View Details
                    <ArrowUpRight
                      size={16}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    />
                  </button>
                </div>

                {/* Hover accent */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-0.5 bg-toyota-red scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"
                />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
