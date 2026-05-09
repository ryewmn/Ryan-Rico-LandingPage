"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useActiveSection } from "@/components/use-active-section";
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
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/85 backdrop-blur-xl border-b border-neutral-200"
          : "bg-transparent"
      )}
    >
      <nav
        className="container flex h-16 items-center justify-between"
        aria-label="Primary"
      >
        <a
          href="#top"
          className="flex items-center gap-2 group"
          aria-label={`${SITE.name} home`}
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-toyota-red text-white font-bold text-sm tracking-tight shadow-red-glow">
            {SITE.shortName}
          </span>
          <span className="font-semibold tracking-tight text-neutral-900">
            {SITE.name}
          </span>
        </a>

        <ul className="hidden md:flex items-center gap-1">
          {NAV.map((link) => {
            const isActive = active === link.id;
            return (
              <li key={link.href}>
                <a
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative px-4 py-2 text-sm font-medium transition-colors rounded-full",
                    isActive
                      ? "text-neutral-900 bg-neutral-100"
                      : "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-100"
                  )}
                >
                  {link.label}
                  {isActive ? (
                    <motion.span
                      layoutId="nav-active-dot"
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-toyota-red"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  ) : null}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <Button asChild size="sm">
            <a href="#contact">Get in touch</a>
          </Button>
        </div>

        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-neutral-900 hover:bg-neutral-100"
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
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden border-t border-neutral-200 bg-white"
          >
            <ul className="container flex flex-col py-4">
              {NAV.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 text-base font-medium text-neutral-800 hover:text-toyota-red"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-3">
                <Button asChild className="w-full">
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Get in touch
                  </a>
                </Button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
