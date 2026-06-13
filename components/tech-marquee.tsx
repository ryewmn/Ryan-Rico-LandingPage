/**
 * Auto-scrolling stack/tools strip — the editorial "trusted by" strip
 * analog. Pure CSS marquee (defined in globals.css), respects
 * prefers-reduced-motion via the global override.
 */
const tools = [
  "TypeScript",
  "React",
  "Next.js",
  "Tailwind",
  "Node.js",
  "Supabase",
  "Postgres",
  "Vercel",
  "OpenAI",
  "Anthropic",
  "Framer Motion",
  "Toyota CRM",
];

export function TechMarquee() {
  // Doubled list so the -50% translate keeps the strip seamless
  const row = [...tools, ...tools];

  return (
    <section
      aria-label="Stack and tools"
      className="relative overflow-hidden border-y border-white/10 bg-background py-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent"
      />

      <div className="flex animate-marquee whitespace-nowrap will-change-transform">
        {row.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="mx-7 inline-flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.22em] text-white/50"
          >
            {t}
            <span
              aria-hidden="true"
              className="inline-block h-1 w-1 rounded-full bg-toyota-red/70"
            />
          </span>
        ))}
      </div>
    </section>
  );
}
