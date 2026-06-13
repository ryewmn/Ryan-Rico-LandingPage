import * as React from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "light" | "dark" | "red" | "ghost";

const tones: Record<Tone, { pill: string; coin: string }> = {
  light: {
    pill: "bg-white text-neutral-950 hover:bg-white/90",
    coin: "bg-neutral-950 text-white",
  },
  dark: {
    pill: "bg-neutral-950/80 text-white border border-white/15 backdrop-blur hover:bg-neutral-900",
    coin: "bg-white text-neutral-950",
  },
  red: {
    pill: "bg-toyota-red text-white hover:bg-toyota-red-dark shadow-[0_8px_30px_rgba(235,10,30,0.35)]",
    coin: "bg-white text-toyota-red",
  },
  ghost: {
    pill: "bg-white/5 text-white border border-white/15 backdrop-blur hover:bg-white/10 hover:border-white/30",
    coin: "bg-white text-neutral-950",
  },
};

/**
 * The signature Hydraoo-style CTA: a rounded pill with a label and a small
 * circular "coin" holding an arrow at the trailing edge.
 */
export function ArrowPill({
  href,
  children,
  tone = "light",
  external,
  className,
  size = "md",
}: {
  href: string;
  children: React.ReactNode;
  tone?: Tone;
  external?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const t = tones[tone];
  const isExternal =
    external ?? (href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel"));
  const dims =
    size === "lg"
      ? "h-14 pl-7 pr-2 text-base"
      : size === "sm"
      ? "h-10 pl-4 pr-1.5 text-sm"
      : "h-12 pl-6 pr-1.5 text-sm";
  const coin = size === "lg" ? "h-10 w-10" : size === "sm" ? "h-7 w-7" : "h-9 w-9";

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "group inline-flex items-center gap-3 rounded-full font-medium tracking-tight transition-all active:scale-[0.98]",
        dims,
        t.pill,
        className
      )}
    >
      {children}
      <span
        className={cn(
          "inline-flex items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45",
          coin,
          t.coin
        )}
      >
        <ArrowUpRight size={size === "lg" ? 18 : 15} strokeWidth={2.25} />
      </span>
    </a>
  );
}
