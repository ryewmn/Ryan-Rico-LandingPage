"use client";

import { motion } from "framer-motion";
import { Car, Code2 } from "lucide-react";
import { SectionLabel } from "@/components/ui/section-label";

type SkillGroup = {
  icon: typeof Car;
  title: string;
  description: string;
  items: string[];
};

const groups: SkillGroup[] = [
  {
    icon: Car,
    title: "Automotive",
    description: "Day-to-day skills built handling internet leads on the floor.",
    items: [
      "BDC operations",
      "Internet sales process",
      "Lead qualification",
      "Appointment setting",
      "Customer follow-up cadences",
      "Phone & text outreach",
      "Toyota CRM workflow",
      "Vehicle product knowledge",
    ],
  },
  {
    icon: Code2,
    title: "Software",
    description: "The stack I reach for when shipping internal tools.",
    items: [
      "TypeScript",
      "React / Next.js",
      "Tailwind CSS",
      "Node.js",
      "Supabase / Postgres",
      "Vercel / serverless",
      "AI agents & LLMs",
      "Workflow automation",
    ],
  },
];

export function Skills() {
  return (
    <section
      id="skills"
      className="relative bg-foreground/[0.015] py-28 md:py-36 border-t border-foreground/10"
    >
      <div className="container">
        <div className="max-w-2xl mb-20">
          <SectionLabel>Skills</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl lg:text-[3.75rem] font-semibold tracking-[-0.025em] text-foreground leading-[1.02]">
            Two sides of the{" "}
            <span className="font-display italic font-normal text-foreground">
              same job.
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-16">
          {groups.map((g, i) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
              >
                <div className="flex items-baseline gap-3 border-b border-foreground/10 pb-4">
                  <Icon size={16} className="text-toyota-red/70" />
                  <h3 className="text-xs font-mono uppercase tracking-[0.22em] text-foreground">
                    {g.title}
                  </h3>
                </div>
                <p className="mt-5 text-base text-foreground/55 max-w-md">
                  {g.description}
                </p>
                <ul className="mt-6 columns-2 gap-x-8 space-y-2 text-[15px] text-foreground/80">
                  {g.items.map((item) => (
                    <li key={item} className="break-inside-avoid">
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
