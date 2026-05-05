"use client";

import { motion } from "framer-motion";
import {
  ClipboardList,
  Handshake,
  LineChart,
  PhoneCall,
  Cog,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Area = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const areas: Area[] = [
  {
    icon: Handshake,
    title: "Vehicle Acquisition",
    description:
      "Sourcing pre-owned inventory from service customers, private parties, and trade-ins with fair, data-backed offers.",
  },
  {
    icon: LineChart,
    title: "Retail Retention",
    description:
      "Building lease-end and equity-mining motions that bring customers back into the dealership before competitors do.",
  },
  {
    icon: PhoneCall,
    title: "BDC Workflow",
    description:
      "Designing call, text, and email cadences that get appointments set and customers in the door — without the spam.",
  },
  {
    icon: ClipboardList,
    title: "Process Design",
    description:
      "Translating what works on the floor into repeatable steps the whole team can follow on day one.",
  },
  {
    icon: Cog,
    title: "Internal Software",
    description:
      "Shipping small, sharp tools that solve real problems for managers and salespeople — not vanity dashboards.",
  },
  {
    icon: Users,
    title: "Team Coaching",
    description:
      "Working one-on-one with sales and service staff to tighten the gap between effort and result.",
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
            <h2 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 text-balance">
              Where I spend my time.
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
