"use client";

import { Star } from "lucide-react";

const items = [
  "BDC Sales",
  "Internet Leads",
  "Dashboards",
  "AI Automation",
  "AI Agents",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Gundams",
  "Round Rock Toyota",
  "Round Rock, TX",
];

export function Marquee() {
  const loop = [...items, ...items];

  return (
    <section
      aria-hidden="true"
      className="relative bg-neutral-950 text-white overflow-hidden border-y border-white/10"
    >
      <div className="relative">
        <div className="flex animate-marquee whitespace-nowrap py-6">
          {loop.map((item, i) => (
            <div key={`${item}-${i}`} className="flex items-center gap-6 px-6">
              <span className="font-display text-2xl md:text-3xl font-medium tracking-tight">
                {item}
              </span>
              <Star
                size={14}
                className="text-toyota-red shrink-0"
                strokeWidth={2.5}
              />
            </div>
          ))}
        </div>

        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-neutral-950 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-neutral-950 to-transparent" />
      </div>
    </section>
  );
}
