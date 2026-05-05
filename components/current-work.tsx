"use client";

import { motion } from "framer-motion";
import { Inbox, PhoneCall, Cog, Bot } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Area = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const areas: Area[] = [
  {
    icon: Inbox,
    title: "Internet Leads",
    description:
      "First touch on inbound leads — qualifying interest, answering the real question fast, and getting the right vehicle in front of the customer.",
  },
  {
    icon: PhoneCall,
    title: "Customer Follow-Up",
    description:
      "Call, text, and email cadences that move a lead from inquiry to appointment to delivery without burning the relationship.",
  },
  {
    icon: Cog,
    title: "Internal Software",
    description:
      "Building small, focused tools for the sales floor — starting with a live leaderboard and a BDC toolkit in progress.",
  },
  {
    icon: Bot,
    title: "AI & Automation",
    description:
      "Experimenting with AI agents to make car buying simpler for customers and the workflow lighter for the team.",
  },
];

export function CurrentWork() {
  return (
    <section
      id="current-work"
      className="relative bg-neutral-50 py-24 md:py-32 overflow-hidden"
    >
      <div className="container relative">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <p className="text-sm font-mono uppercase tracking-[0.18em] text-toyota-red">
              Current Work
            </p>
            <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 text-balance leading-[1.05]">
              Where I{" "}
              <span className="font-display italic font-normal">
                spend my time.
              </span>
            </h2>
          </div>
          <p className="text-base text-neutral-600 max-w-md">
            A mix of operational work on the dealership floor and software work
            after hours. Both inform each other.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.article
                key={a.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="group relative rounded-2xl border border-neutral-200 bg-white p-7 shadow-soft hover:shadow-soft-lg hover:border-neutral-300 transition-all duration-300"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-toyota-red/10 text-toyota-red group-hover:bg-toyota-red group-hover:text-white transition-colors">
                  <Icon size={20} strokeWidth={2} />
                </div>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-neutral-900">
                  {a.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-neutral-600">
                  {a.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
