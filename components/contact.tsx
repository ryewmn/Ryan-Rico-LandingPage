"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Building2,
  ArrowRight,
  Check,
  Github,
  Instagram,
  Linkedin,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type FormState = "idle" | "submitting" | "success";

export function Contact() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = encodeURIComponent(String(data.get("name") || ""));
    const message = encodeURIComponent(String(data.get("message") || ""));
    const email = String(data.get("email") || "");
    const subject = `Hello from ${decodeURIComponent(name) || "your site"}`;
    const body = `${decodeURIComponent(message)}%0D%0A%0D%0A— ${decodeURIComponent(
      name
    )} (${email})`;
    window.location.href = `mailto:ryanchristopher.rico@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${body}`;
    await new Promise((r) => setTimeout(r, 600));
    setState("success");
    form.reset();
    setTimeout(() => setState("idle"), 3000);
  }

  return (
    <section
      id="contact"
      className="relative bg-neutral-950 py-24 md:py-32 overflow-hidden border-t border-white/5"
    >
      <div
        className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-ember/15 blur-[120px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 -left-20 h-96 w-96 rounded-full bg-toyota-red/12 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="max-w-2xl mb-16">
          <p className="text-sm font-mono uppercase tracking-[0.18em] text-ember">
            Contact
          </p>
          <h2 className="mt-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white text-balance leading-[1.05]">
            Let&apos;s{" "}
            <span className="font-display italic font-normal text-ember">
              talk shop.
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/60">
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
            className="lg:col-span-2 rounded-2xl bg-neutral-950 text-white p-8 md:p-10 relative overflow-hidden"
          >
            <div
              className="absolute inset-0 grid-bg opacity-40 pointer-events-none"
              aria-hidden="true"
            />
            <div
              className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-toyota-red/30 blur-[80px] pointer-events-none"
              aria-hidden="true"
            />

            <div className="relative">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-toyota-red text-white shadow-red-glow">
                <span className="font-bold text-sm">RR</span>
              </div>

              <h3 className="mt-6 text-2xl font-bold tracking-tight">
                Ryan Rico
              </h3>
              <p className="mt-1 text-sm text-white/60">
                BDC Sales · Round Rock Toyota
              </p>

              <ul className="mt-10 space-y-5">
                <li className="flex items-start gap-3">
                  <Building2
                    size={18}
                    className="mt-0.5 text-toyota-red shrink-0"
                  />
                  <div>
                    <p className="text-xs font-mono uppercase tracking-widest text-white/50">
                      Dealership
                    </p>
                    <p className="mt-1 text-sm font-medium">
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
                    <p className="text-xs font-mono uppercase tracking-widest text-white/50">
                      Location
                    </p>
                    <p className="mt-1 text-sm font-medium">
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
                    <p className="text-xs font-mono uppercase tracking-widest text-white/50">
                      Email
                    </p>
                    <a
                      href="mailto:ryanchristopher.rico@gmail.com"
                      className="mt-1 block text-sm font-medium hover:text-toyota-red transition-colors break-all"
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
                    <p className="text-xs font-mono uppercase tracking-widest text-white/50">
                      Phone
                    </p>
                    <a
                      href="tel:+17177814318"
                      className="mt-1 block text-sm font-medium hover:text-toyota-red transition-colors"
                    >
                      (717) 781-4318
                    </a>
                  </div>
                </li>
              </ul>

              <div className="mt-10 flex items-center gap-3 border-t border-white/10 pt-6">
                <a
                  href="https://www.linkedin.com/in/ryanchristopherrico/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
                <a
                  href="https://github.com/ryewmn"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={16} />
                </a>
                <a
                  href="https://www.instagram.com/builds.by.ryry/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="mailto:ryanchristopher.rico@gmail.com"
                  className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors"
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
            className="lg:col-span-3 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur p-8 md:p-10"
          >
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
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
                <p className="text-xs text-white/45">
                  I respond within one business day.
                </p>
                <Button
                  type="submit"
                  size="lg"
                  disabled={state === "submitting"}
                  className="sm:w-auto w-full"
                >
                  {state === "success" ? (
                    <>
                      <Check size={16} />
                      Message sent
                    </>
                  ) : state === "submitting" ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message
                      <ArrowRight size={16} />
                    </>
                  )}
                </Button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
