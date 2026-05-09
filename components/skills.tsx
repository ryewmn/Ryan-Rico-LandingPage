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
      className="relative bg-white py-24 md:py-32 overflow-hidden border-t border-neutral-100"
    >
      <div className="container relative">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-mono uppercase tracking-[0.18em] text-toyota-red">
            <span className="text-neutral-400">04 /</span> Skills
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 text-balance leading-[1.05]">
            Two sides of the{" "}
            <span className="font-display italic font-normal text-toyota-red">
              same job.
            </span>
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
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
                className="rounded-2xl border border-neutral-200 bg-neutral-50 p-8 shadow-[0_1px_2px_rgba(0,0,0,0.02)]"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-toyota-red/10 text-toyota-red ring-1 ring-toyota-red/20">
                    <Icon size={22} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-neutral-900">
                      {g.title}
                    </h3>
                    <p className="text-sm text-neutral-500">{g.description}</p>
                  </div>
                </div>

                <ul className="mt-7 grid grid-cols-2 gap-2">
                  {g.items.map((item) => (
                    <li
                      key={item}
                      className="inline-flex items-center gap-2 rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm text-neutral-800"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-toyota-red" />
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
