"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Github, Instagram, Linkedin } from "lucide-react";
import { ArrowPill } from "@/components/ui/arrow-pill";
import { SITE } from "@/lib/site-config";

const socials = [
  { href: SITE.github, label: "GitHub", Icon: Github },
  { href: SITE.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SITE.instagram, label: "Instagram", Icon: Instagram },
];

const ease = [0.22, 1, 0.36, 1] as [number, number, number, number];

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate min-h-[100svh] w-full overflow-hidden grain bg-background"
    >
      {/* Dark-mode photo — GR GT front on pure black */}
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden dark:block"
      >
        <Image
          src="/hero/grgt.webp"
          alt="Toyota GR GT"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% center" }}
        />
        {/* Dark overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-neutral-950/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/30 to-neutral-950/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_30%_40%,transparent_30%,rgba(7,10,15,0.65)_100%)]" />
      </div>

      {/* Light-mode photo — Supra macro, daylight */}
      <div
        aria-hidden="true"
        className="absolute inset-0 block dark:hidden"
      >
        <Image
          src="/hero/supra.jpg"
          alt="Toyota GR Supra"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "60% center" }}
        />
        {/* Light overlays — wash the photo with cream so text reads */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/85 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-background/70" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_30%_40%,transparent_30%,hsl(var(--background)/0.55)_100%)]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container flex min-h-[100svh] flex-col justify-end pb-14 pt-28">
        <div className="flex-1 flex flex-col justify-center">
          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="max-w-4xl text-[clamp(2.75rem,8vw,6.5rem)] font-semibold tracking-[-0.03em] leading-[0.95] text-foreground"
          >
            Built on the floor.
            <br />
            Shipping{" "}
            <span className="font-display italic font-normal text-gradient-ember">
              software.
            </span>
          </motion.h1>

          {/* CTA + social cluster */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.12, ease }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <ArrowPill href="#contact" tone="light" size="md">
              Get in touch
            </ArrowPill>

            <div className="flex -space-x-2.5">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/20 bg-foreground/[0.06] text-foreground/80 backdrop-blur transition-colors hover:text-foreground hover:border-foreground/40"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom one-liner */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease }}
          className="mt-16 max-w-sm text-sm leading-relaxed text-foreground/65"
        >
          BDC Sales at Round Rock Toyota, building the software the floor wishes
          it had.
        </motion.p>
      </div>
    </section>
  );
}
