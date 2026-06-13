"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  ArrowRight,
  Github,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { SectionLabel } from "@/components/ui/section-label";
import { SITE } from "@/lib/site-config";

type FormState = "idle" | "submitting" | "success";

const detailRows = [
  { Icon: Building2, label: "Dealership", value: SITE.employer },
  { Icon: MapPin, label: "Location", value: "Round Rock, Texas" },
  { Icon: Mail, label: "Email", value: SITE.email, href: `mailto:${SITE.email}` },
  { Icon: Phone, label: "Phone", value: SITE.phone, href: `tel:${SITE.phoneTel}` },
];

const socialLinks = [
  { Icon: Linkedin, href: SITE.linkedin, label: "LinkedIn" },
  { Icon: Github, href: SITE.github, label: "GitHub" },
  { Icon: Instagram, href: SITE.instagram, label: "Instagram" },
  { Icon: Mail, href: `mailto:${SITE.email}`, label: "Email" },
];

export function Contact() {
  const [state, setState] = useState<FormState>("idle");
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (state === "success") successHeadingRef.current?.focus();
  }, [state]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = `Hello from ${name || "your site"}`;
    const body = `${message}\n\n— ${name} (${email})`;
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    setState("success");
    form.reset();
    setTimeout(() => setState("idle"), 4000);
  }

  return (
    <section
      id="contact"
      className="relative bg-white/[0.015] py-24 md:py-32 overflow-hidden border-t border-white/10"
    >
      <div
        className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-toyota-red/[0.1] blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-ember/[0.08] blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="max-w-2xl mb-16">
          <SectionLabel number="06">Contact</SectionLabel>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-semibold tracking-[-0.02em] text-white text-balance leading-[1.05]">
            Let&apos;s{" "}
            <span className="font-display italic font-normal text-gradient-ember">
              talk shop.
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/55">
            Looking to upgrade, sell your vehicle, or talk about software for
            your dealership? Send a note.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Info card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 rounded-2xl border border-white/10 bg-gradient-to-br from-toyota-red/[0.12] via-white/[0.03] to-white/[0.02] p-8 md:p-10 relative overflow-hidden"
          >
            <div className="relative">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-toyota-red to-ember text-white shadow-red-glow">
                <span className="font-bold text-sm">{SITE.shortName}</span>
              </div>

              <h3 className="mt-6 text-2xl font-bold tracking-tight text-white">
                {SITE.name}
              </h3>
              <p className="mt-1 text-sm text-white/50">
                {SITE.role} · {SITE.employer}
              </p>

              <ul className="mt-10 space-y-5">
                {detailRows.map(({ Icon, label, value, href }) => (
                  <li key={label} className="flex items-start gap-3">
                    <Icon size={18} className="mt-0.5 text-toyota-red shrink-0" />
                    <div className="min-w-0">
                      <p className="text-xs font-mono uppercase tracking-widest text-white/40">
                        {label}
                      </p>
                      {href ? (
                        <a
                          href={href}
                          className="mt-1 block text-sm font-medium text-white hover:text-ember transition-colors break-all"
                        >
                          {value}
                        </a>
                      ) : (
                        <p className="mt-1 text-sm font-medium text-white">
                          {value}
                        </p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-6">
                {socialLinks.map(({ Icon, href, label }) => {
                  const ext = href.startsWith("http");
                  return (
                    <a
                      key={label}
                      href={href}
                      target={ext ? "_blank" : undefined}
                      rel={ext ? "noopener noreferrer" : undefined}
                      className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white hover:border-white/30 transition-colors"
                      aria-label={label}
                    >
                      <Icon size={16} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/[0.03] p-8 md:p-10"
          >
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center text-center min-h-[320px] md:min-h-[420px] px-6"
                >
                  <svg viewBox="0 0 64 64" className="h-20 w-20" fill="none" aria-hidden="true">
                    <motion.circle
                      cx="32"
                      cy="32"
                      r="29"
                      stroke="#EB0A1E"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0, opacity: 0.4 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    />
                    <motion.path
                      d="M20 33 L29 42 L45 24"
                      stroke="#EB0A1E"
                      strokeWidth="4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
                    />
                  </svg>
                  <h3
                    ref={successHeadingRef}
                    tabIndex={-1}
                    className="mt-6 text-2xl font-semibold tracking-tight text-white focus:outline-none"
                  >
                    Message{" "}
                    <span className="font-display italic font-normal text-gradient-ember">
                      sent.
                    </span>
                  </h3>
                  <p className="mt-2 text-sm text-white/60 max-w-sm">
                    Your email client should be open with the note prefilled.
                    I&apos;ll reply within a business day.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                  noValidate
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" name="name" type="text" required placeholder="Your name" autoComplete="name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" name="email" type="email" required placeholder="you@email.com" autoComplete="email" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell me about your vehicle, project, or what you're working on."
                    />
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                    <p className="text-xs text-white/45">
                      I respond within one business day.
                    </p>
                    <Button type="submit" size="lg" className="sm:w-auto w-full">
                      Send Message
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
