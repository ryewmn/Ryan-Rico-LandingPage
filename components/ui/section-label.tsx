import { cn } from "@/lib/utils";

/**
 * Section eyebrow: padded number + dimmed slash + label + a trailing
 * hairline that fades out to the right. Used at the top of every
 * scrolled section so they share a single typographic rhythm.
 */
export function SectionLabel({
  number,
  children,
  className,
}: {
  number: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      <p className="inline-flex shrink-0 items-center gap-2 text-[11.5px] font-mono uppercase tracking-[0.22em] text-toyota-red">
        <span className="text-white/30 tabular-nums">{number}</span>
        <span className="text-white/30">/</span>
        <span>{children}</span>
      </p>
      <span
        aria-hidden="true"
        className="hidden sm:block h-px max-w-[160px] flex-1 bg-gradient-to-r from-toyota-red/40 to-transparent"
      />
    </div>
  );
}
