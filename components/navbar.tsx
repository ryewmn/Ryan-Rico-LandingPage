"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/components/use-active-section";
import { ArrowPill } from "@/components/ui/arrow-pill";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { NAV_LINKS, SITE } from "@/lib/site-config";

const NAV = NAV_LINKS.filter((l) => l.inNav);
const SECTION_IDS = NAV.map((l) => l.id);

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-500 text-foreground",
        scrolled
          ? "bg-background/70 backdrop-blur-xl border-b border-foreground/10"
          : "bg-transparent"
      )}
    >
      <nav
        className="container relative flex h-[72px] items-center justify-between"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="flex items-center gap-2.5 group shrink-0"
          aria-label={`${SITE.name} home`}
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-toyota-red to-ember text-white font-bold text-[13px] tracking-tight shadow-[0_4px_16px_rgba(235,10,30,0.4)]">
            {SITE.shortName}
          </span>
          <span className="font-semibold tracking-tight text-foreground text-[15px]">
            {SITE.name}
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          {NAV.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "px-3.5 py-2 text-[13.5px] font-medium rounded-full transition-colors",
                    isActive ? "text-foreground" : "text-foreground/65 hover:text-foreground"
                  )}
                >
                  {link.label}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <ThemeToggle />
          <ArrowPill href="#contact" tone="light" size="sm">
            Get in touch
          </ArrowPill>
        </div>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-foreground hover:bg-foreground/10"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-nav"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden border-t border-foreground/10 bg-background/95 backdrop-blur-xl"
          >
            <ul className="container flex flex-col py-4">
              {NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-medium text-foreground/80 hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <ArrowPill
                  href="#contact"
                  tone="red"
                  className="w-full justify-between"
                >
                  Get in touch
                </ArrowPill>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
