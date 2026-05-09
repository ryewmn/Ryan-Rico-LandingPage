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
import { SITE } from "@/lib/site-config";

type FormState = "idle" | "submitting" | "success";

export function Contact() {
  const [state, setState] = useState<FormState>("idle");
  const successHeadingRef = useRef<HTMLHeadingElement>(null);

  // Move focus to the success heading when the form swaps for assistive tech
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
      className="relative bg-white py-24 md:py-32 overflow-hidden border-t border-neutral-100"
    >
      <div
        className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-toyota-red/[0.04] blur-[140px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-toyota-red/[0.04] blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-mono uppercase tracking-[0.18em] text-toyota-red">
            <span className="text-neutral-500">06 /</span> Contact
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-900 text-balance leading-[1.05]">
            Let&apos;s{" "}
            <span className="font-display italic font-normal text-toyota-red">
              talk shop.
            </span>
          </h2>
          <p className="mt-4 text-lg text-neutral-600">
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
            className="lg:col-span-2 rounded-2xl border border-neutral-200 bg-gradient-to-br from-toyota-red/[0.04] via-white to-white p-8 md:p-10 relative overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          >
            <div className="relative">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-toyota-red text-white shadow-red-glow">
                <span className="font-bold text-sm">RR</span>
              </div>

              <h3 className="mt-6 text-2xl font-bold tracking-tight text-neutral-900">
                Ryan Rico
              </h3>
              <p className="mt-1 text-sm text-neutral-500">
                BDC Sales · Round Rock Toyota
              </p>

              <ul className="mt-10 space-y-5">
                <li className="flex items-start gap-3">
                  <Building2
                    size={18}
                    className="mt-0.5 text-toyota-red shrink-0"
                  />
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                      Dealership
                    </p>
                    <p className="mt-1 text-sm font-medium text-neutral-900">
                      Round Rock Toyota
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin
                    size={18}
                    className="mt-0.5 text-toyota-red shrink-0"
                  />
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                      Location
                    </p>
                    <p className="mt-1 text-sm font-medium text-neutral-900">
                      Round Rock, Texas
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Mail
                    size={18}
                    className="mt-0.5 text-toyota-red shrink-0"
                  />
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                      Email
                    </p>
                    <a
                      href="mailto:ryanchristopher.rico@gmail.com"
                      className="mt-1 block text-sm font-medium text-neutral-900 hover:text-toyota-red transition-colors break-all"
                    >
                      ryanchristopher.rico@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <Phone
                    size={18}
                    className="mt-0.5 text-toyota-red shrink-0"
                  />
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                      Phone
                    </p>
                    <a
                      href="tel:+17177814318"
                      className="mt-1 block text-sm font-medium text-neutral-900 hover:text-toyota-red transition-colors"
                    >
                      (717) 781-4318
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-10 flex items-center gap-3 border-t border-neutral-200 pt-6">
                <a
                  href="https://www.linkedin.com/in/ryanchristopherrico/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-colors text-neutral-700"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="https://github.com/ryewmn"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-colors text-neutral-700"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://www.instagram.com/builds.by.ryry/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-colors text-neutral-700"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="mailto:ryanchristopher.rico@gmail.com"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-colors text-neutral-700"
                  aria-label="Email"
                >
                  <Mail size={16} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-3 rounded-2xl border border-neutral-200 bg-white p-8 md:p-10 shadow-[0_1px_2px_rgba(0,0,0,0.03)]"
          >
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center text-center min-h-[420px] px-6"
                >
                  <svg
                    viewBox="0 0 64 64"
                    className="h-20 w-20"
                    fill="none"
                    aria-hidden="true"
                  >
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
                    className="mt-6 text-2xl font-semibold tracking-tight text-neutral-900 focus:outline-none"
                  >
                    Message{" "}
                    <span className="font-display italic font-normal text-toyota-red">
                      sent.
                    </span>
                  </h3>
                  <p className="mt-2 text-sm text-neutral-600 max-w-sm">
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
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Your name"
                    autoComplete="name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@email.com"
                    autoComplete="email"
                  />
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
                <p className="text-xs text-neutral-500">
                  I respond within one business day.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  disabled={state === "submitting"}
                  className="sm:w-auto w-full"
                >
                  {state === "submitting" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={16} />
                    </>
                  )}
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
