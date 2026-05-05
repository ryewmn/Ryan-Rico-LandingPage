"use client";

import { motion } from "framer-motion";
import { Car, Code2 } from "lucide-react";

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
      className="relative bg-neutral-950 py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div
        aria-hidden="true"
        className="absolute right-0 bottom-0 h-[450px] w-[600px] rounded-full bg-toyota-red/10 blur-[160px] pointer-events-none"
      />
      <div className="container relative">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-mono uppercase tracking-[0.18em] text-ember">
            Skills
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance leading-[1.05]">
            Two sides of the{" "}
            <span className="font-display italic font-normal text-ember">
              same job.
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/60">
            Years of automotive operations, paired with the software chops to
            automate what shouldn&apos;t need a human anymore.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {groups.map((g, i) => {
            const Icon = g.icon;
            return (
              <motion.div
                key={g.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.55, delay: i * 0.06 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-8"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-ember/15 text-ember ring-1 ring-ember/30">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-white">
                      {g.title}
                    </h3>
                    <p className="text-sm text-white/55">{g.description}</p>
                  </div>
                </div>

                <ul className="mt-7 grid grid-cols-2 gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-white/80"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-ember" />
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
