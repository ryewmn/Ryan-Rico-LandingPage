"use client";

import { motion } from "framer-motion";
import { ArrowRight, Github, Linkedin, Mail, MapPin, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-neutral-950 text-white">
      {/* background grid */}
      <div
        className="absolute inset-0 grid-bg opacity-60 mask-fade-b pointer-events-none"
        aria-hidden="true"
      />

      {/* red glow */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-toyota-red/20 blur-[160px] pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-32 -right-32 h-[400px] w-[400px] rounded-full bg-toyota-red/15 blur-[140px] pointer-events-none"
        aria-hidden="true"
      />

      <div className="container relative pt-36 md:pt-44 pb-24 md:pb-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge variant="dark" className="gap-2">
                <Sparkles size={12} className="text-toyota-red" />
                Available for select dealership and software projects
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance leading-[1.05]"
            >
              Building the systems
              <br />
              <span className="bg-gradient-to-r from-white via-white to-neutral-400 bg-clip-text text-transparent">
                behind the showroom.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="mt-8 max-w-xl text-lg md:text-xl text-white/70 leading-relaxed"
            >
              I&apos;m Ryan Rico — Vehicle Acquisition Manager at Round Rock
              Toyota. I write software, design retention workflows, and obsess
              over the details that turn opportunities into customers for life.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg">
                <a href="#contact">
                  Let&apos;s connect
                  <ArrowRight size={18} />
                </a>
              </Button>
              <Button asChild variant="outline-light" size="lg">
                <a href="#projects">See projects</a>
              </Button>
            </motion.div>

            <motion.ul
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.35 }}
              className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-white/60"
            >
              <li className="flex items-center gap-2">
                <MapPin size={14} className="text-toyota-red" />
                Round Rock, Texas
              </li>
              <li className="hidden sm:flex h-4 w-px bg-white/10" />
              <li>
                <a
                  href="https://github.com/ryewmn"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Github size={14} />
                  github.com/ryewmn
                </a>
              </li>
              <li className="hidden sm:flex h-4 w-px bg-white/10" />
              <li>
                <a
                  href="https://www.linkedin.com/in/ryanchristopherrico/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Linkedin size={14} />
                  LinkedIn
                </a>
              </li>
              <li className="hidden sm:flex h-4 w-px bg-white/10" />
              <li>
                <a
                  href="mailto:ryanchristopher.rico@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-white transition-colors"
                >
                  <Mail size={14} />
                  ryanchristopher.rico@gmail.com
                </a>
              </li>
            </motion.ul>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur p-6 md:p-8 overflow-hidden">
              <div
                className="absolute -top-20 -right-20 h-56 w-56 rounded-full bg-toyota-red/30 blur-3xl pointer-events-none"
                aria-hidden="true"
              />

              <div className="relative">
                <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/50">
                  Now
                </p>
                <h3 className="mt-3 text-xl font-semibold tracking-tight">
                  Vehicle Acquisition Manager
                </h3>
                <p className="text-sm text-white/60">Round Rock Toyota</p>

                <div className="mt-8 grid grid-cols-3 gap-4">
                  <Stat label="Years on the floor" value="5+" />
                  <Stat label="Vehicles acquired" value="1.2K+" />
                  <Stat label="Tools shipped" value="6" />
                </div>

                <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
                  <Tag>Retail Retention</Tag>
                  <Tag>Vehicle Acquisition</Tag>
                  <Tag>BDC &amp; Workflow</Tag>
                  <Tag>Internal Software</Tag>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-2xl md:text-3xl font-bold tracking-tight">{value}</p>
      <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">
        {label}
      </p>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 text-sm text-white/80">
      <span className="h-1.5 w-1.5 rounded-full bg-toyota-red" />
      {children}
    </div>
  );
}
