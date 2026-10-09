"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
} from "lucide-react";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { SITE } from "@/lib/site-config";

const chapters = [
  { id: "top", label: "About" },
  { id: "floor", label: "On the floor" },
  { id: "projects", label: "Selected work" },
  { id: "systems", label: "Systems" },
  { id: "games", label: "Games" },
  { id: "dogs", label: "The crew" },
  { id: "builds", label: "Gunpla" },
  { id: "contact", label: "Say hi" },
] as const;

type FigureFrameProps = {
  figure: string;
  title: string;
  action?: string;
  status?: string;
  onClick?: () => void;
  children: ReactNode;
};

function FigureFrame({
  figure,
  title,
  action,
  status,
  onClick,
  children,
}: FigureFrameProps) {
  const Tag = onClick ? motion.button : motion.div;

  return (
    <motion.button
      type="button"
      disabled={!onClick}
      onClick={onClick}
      whileHover={onClick ? { scale: 1.008 } : undefined}
      whileTap={onClick ? { scale: 0.995 } : undefined}
      className="group relative block w-full overflow-hidden border border-white/20 bg-[#141414] text-left shadow-[0_30px_100px_rgba(0,0,0,0.35)] disabled:cursor-default"
    >
      <div className="flex h-11 items-center justify-between border-b border-white/10 px-4 font-mono text-[10px] uppercase tracking-[0.19em] text-white/50 sm:px-5">
        <span>{figure}</span>
        <span>{title}</span>
      </div>

      <div className="relative min-h-[350px] overflow-hidden sm:min-h-[430px]">
        <div className="pointer-events-none absolute inset-0 opacity-[0.14] [background-image:linear-gradient(rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px)] [background-size:32px_32px]" />
        {children}
        <motion.span
          aria-hidden="true"
          className="absolute left-0 top-0 h-px w-16 bg-[#EB0A1E]"
          animate={{ x: ["0%", "520%", "0%"] }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity }}
        />
      </div>

      {(action || status) && (
        <div className="flex min-h-12 items-center justify-between gap-4 border-t border-white/10 px-4 font-mono text-[10px] uppercase tracking-[0.17em] sm:px-5">
          <span className="text-white/40">{action}</span>
          <span className="flex items-center gap-2 text-white/60">
            <span className="h-1.5 w-1.5 rounded-full bg-[#EB0A1E] shadow-[0_0_14px_rgba(235,10,30,.9)]" />
            {status}
          </span>
        </div>
      )}
    </motion.button>
  );
}

function IntroFigure() {
  return (
    <FigureFrame figure="FIG 00" title="GR SUPRA / AFTER HOURS" status="AUSTIN, TX">
      <Image
        src="/hero/supra.jpg"
        alt="Toyota GR Supra"
        fill
        priority
        sizes="(min-width: 1024px) 42vw, 100vw"
        className="object-cover grayscale brightness-[0.62] contrast-125 transition duration-700 group-hover:grayscale-[0.45]"
        style={{ objectPosition: "58% center" }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />

      <motion.div
        className="absolute bottom-6 left-6 right-6 border border-white/20 bg-black/40 p-4 backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-auto sm:w-[280px]"
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35, duration: 0.7 }}
      >
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.17em] text-white/50">
          <span>signal</span>
          <span>rr-01</span>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-white/75">
          Dealership operations by day. Software, games, dogs, and Gunpla after hours.
        </p>
      </motion.div>

      <div className="absolute right-5 top-5 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-white/50">
        <span className="h-2 w-2 rounded-full border border-[#EB0A1E]">
          <span className="block h-full w-full animate-ping rounded-full bg-[#EB0A1E]/70" />
        </span>
        live
      </div>
    </FigureFrame>
  );
}

function LeadFlowFigure() {
  const stages = [
    {
      label: "new lead",
      title: "Lead received",
      note: "A new internet inquiry hits the queue. First job: understand the customer, the vehicle, and how fast we need to respond.",
      meta: [["source", "web"], ["response", "02:14"], ["next", "contact"]],
    },
    {
      label: "contacted",
      title: "Conversation started",
      note: "The lead becomes a real conversation. Questions get answered, availability gets checked, and the next step gets clear.",
      meta: [["channel", "phone / text"], ["status", "engaged"], ["next", "appointment"]],
    },
    {
      label: "appointment",
      title: "Appointment set",
      note: "Time is locked in. Vehicle, customer notes, and expectations are lined up before they arrive.",
      meta: [["visit", "scheduled"], ["vehicle", "confirmed"], ["next", "show"]],
    },
    {
      label: "show",
      title: "Customer on site",
      note: "The handoff matters here. The floor gets the context so the customer does not have to restart the conversation.",
      meta: [["arrival", "checked in"], ["handoff", "complete"], ["next", "deal"]],
    },
    {
      label: "delivered",
      title: "Vehicle delivered",
      note: "The lead closes as a delivered customer. The useful part is the full trail from first message to final handoff.",
      meta: [["result", "delivered"], ["journey", "complete"], ["next", "follow-up"]],
    },
  ];
  const [step, setStep] = useState(0);
  const stage = stages[step];

  return (
    <FigureFrame
      figure="FIG 01"
      title="LEAD FLOW"
      action="click to advance the lead"
      status={stage.label}
      onClick={() => setStep((value) => (value + 1) % stages.length)}
    >
      <div className="absolute inset-0 flex items-center justify-center p-6 sm:p-10">
        <div className="relative w-full max-w-[500px]">
          <div className="absolute left-6 right-6 top-[39px] h-px bg-white/15" />
          <motion.div
            className="absolute left-6 top-[38px] h-[2px] bg-[#EB0A1E]"
            animate={{ width: `${(step / (stages.length - 1)) * 100}%` }}
            transition={{ type: "spring", stiffness: 130, damping: 22 }}
            style={{ maxWidth: "calc(100% - 3rem)" }}
          />

          <div className="relative grid grid-cols-5 gap-1">
            {stages.map((item, index) => (
              <div key={item.label} className="text-center">
                <motion.div
                  className="mx-auto flex h-7 w-7 items-center justify-center rounded-full border font-mono text-[9px]"
                  animate={{
                    borderColor:
                      index <= step ? "rgba(235,10,30,1)" : "rgba(255,255,255,.18)",
                    backgroundColor:
                      index === step ? "rgba(235,10,30,.16)" : "rgba(20,20,20,.92)",
                    color:
                      index <= step ? "rgba(255,255,255,.9)" : "rgba(255,255,255,.35)",
                    scale: index === step ? 1.12 : 1,
                  }}
                >
                  0{index + 1}
                </motion.div>
                <p className="mt-3 font-mono text-[7px] uppercase tracking-[0.12em] text-white/40 sm:text-[8px]">
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={stage.label}
              initial={{ opacity: 0, y: 14, rotate: -0.35 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mx-auto mt-12 w-[94%] border border-white/20 bg-[#0d0d0d] p-5 shadow-2xl sm:p-6"
            >
              <div className="flex items-start justify-between gap-5">
                <div>
                  <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35">
                    bdc workflow / stage {String(step + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-2 text-xl font-medium tracking-tight text-white sm:text-2xl">
                    {stage.title}
                  </p>
                </div>
                <span className="shrink-0 rounded-full border border-[#EB0A1E]/40 px-2.5 py-1 font-mono text-[8px] uppercase tracking-[0.16em] text-[#ff5b69]">
                  {stage.label}
                </span>
              </div>

              <motion.p
                key={`${stage.label}-note`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-5 max-w-md text-sm leading-6 text-white/48"
              >
                {stage.note}
              </motion.p>

              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-white/10 pt-4 font-mono text-[8px] uppercase tracking-[0.12em] text-white/35">
                {stage.meta.map(([label, value]) => (
                  <span key={label}>
                    {label}
                    <b className="mt-1 block font-normal text-white/70">{value}</b>
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </FigureFrame>
  );
}

function LeaderboardFigure() {
  const views = useMemo(
    () => [
      {
        label: "appointments",
        values: [82, 68, 53, 42],
        names: ["Team A", "Team B", "Team C", "Team D"],
      },
      {
        label: "shows",
        values: [73, 61, 49, 36],
        names: ["Team A", "Team B", "Team C", "Team D"],
      },
      {
        label: "deliveries",
        values: [64, 58, 41, 33],
        names: ["Team A", "Team B", "Team C", "Team D"],
      },
    ],
    []
  );
  const [view, setView] = useState(0);
  const selected = views[view];

  return (
    <FigureFrame
      figure="FIG 02"
      title="RRT LEADERBOARD"
      action="click to change the metric"
      status={selected.label}
      onClick={() => setView((value) => (value + 1) % views.length)}
    >
      <div className="absolute inset-0 p-7 sm:p-10">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/40">
              live floor snapshot
            </p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
              Performance board
            </p>
          </div>
          <motion.div
            key={selected.label}
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            className="border border-[#EB0A1E]/40 bg-[#EB0A1E]/10 px-3 py-2 font-mono text-[9px] uppercase tracking-[0.16em] text-[#ff6270]"
          >
            {selected.label}
          </motion.div>
        </div>

        <div className="mt-12 space-y-6">
          {selected.values.map((value, index) => (
            <div key={selected.names[index]}>
              <div className="mb-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.14em]">
                <span className="text-white/50">{selected.names[index]}</span>
                <span className="text-white/70">{value}</span>
              </div>
              <div className="h-2 overflow-hidden bg-white/[0.055]">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#8d0712] to-[#EB0A1E]"
                  initial={false}
                  animate={{ width: `${value}%` }}
                  transition={{ type: "spring", stiffness: 110, damping: 24 }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 grid grid-cols-3 border border-white/10 bg-black/20">
          {[
            ["refresh", "live"],
            ["source", "sales log"],
            ["screen", "tv mode"],
          ].map(([label, value], index) => (
            <div
              key={label}
              className={`p-3 ${index > 0 ? "border-l border-white/10" : ""}`}
            >
              <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-white/30">
                {label}
              </p>
              <p className="mt-1 text-xs text-white/65">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </FigureFrame>
  );
}

const projectList = [
  {
    number: "01",
    title: "Round Rock Toyota Leaderboard",
    note: "Live sales-floor dashboard for appointments, shows, deliveries, goals, and TV mode.",
    state: "live",
    href: "https://github.com/ryewmn/ROUND-ROCK-TOYOTA-LEADERBOARD",
  },
  {
    number: "02",
    title: "BDC Toolkit",
    note: "Internal scripts, lead workups, follow-up helpers, and day-to-day BDC utilities.",
    state: "building",
  },
  {
    number: "03",
    title: "Car Sales AI Agent",
    note: "AI-assisted customer workflows for finding the right vehicle and moving the conversation forward.",
    state: "building",
  },
  {
    number: "04",
    title: "OpsGlass",
    note: "Multimodal document workflows for invoices, contracts, receipts, and operational review.",
    state: "building",
  },
];

function ProjectFigure() {
  const [index, setIndex] = useState(0);
  const project = projectList[index];

  return (
    <FigureFrame
      figure="FIG 03"
      title="PROJECT INDEX"
      action="click for the next project"
      status={`${project.number} / 0${projectList.length}`}
      onClick={() => setIndex((value) => (value + 1) % projectList.length)}
    >
      <div className="absolute inset-0 flex items-center justify-center p-8 sm:p-12">
        <div className="w-full max-w-[470px]">
          <div className="mb-6 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-white/30">
            <span>selected work</span>
            <span>{project.state}</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={project.title}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.3 }}
              className="border border-white/20 bg-[#0c0c0c] p-6 sm:p-8"
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[#ff5362]">
                {project.number}
              </p>
              <h3 className="mt-8 max-w-sm text-3xl font-semibold tracking-[-0.035em] text-white">
                {project.title}
              </h3>
              <p className="mt-5 max-w-md text-sm leading-6 text-white/50">
                {project.note}
              </p>
              <div className="mt-10 flex items-center justify-between border-t border-white/10 pt-4 font-mono text-[8px] uppercase tracking-[0.15em] text-white/30">
                <span>ryan rico / build log</span>
                <span>{project.state}</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-6 flex gap-2">
            {projectList.map((item, itemIndex) => (
              <span
                key={item.number}
                className={`h-1 flex-1 transition-colors ${itemIndex === index ? "bg-[#EB0A1E]" : "bg-white/10"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </FigureFrame>
  );
}

function SystemsFigure() {
  const [scan, setScan] = useState(0);
  const nodes = [
    { x: 74, y: 72, label: "web" },
    { x: 206, y: 58, label: "api" },
    { x: 327, y: 116, label: "db" },
    { x: 168, y: 185, label: "auth" },
    { x: 315, y: 232, label: "logs" },
    { x: 86, y: 252, label: "edge" },
  ];

  return (
    <FigureFrame
      figure="FIG 04"
      title="SYSTEM MAP"
      action="click to run another scan"
      status={`scan 0${scan + 1} · clean`}
      onClick={() => setScan((value) => (value + 1) % 9)}
    >
      <div className="absolute inset-0 flex items-center justify-center p-6">
        <svg viewBox="0 0 400 310" className="h-full w-full max-w-[520px]">
          <g stroke="rgba(255,255,255,.16)" strokeWidth="1">
            <line x1="74" y1="72" x2="206" y2="58" />
            <line x1="206" y1="58" x2="327" y2="116" />
            <line x1="206" y1="58" x2="168" y2="185" />
            <line x1="168" y1="185" x2="315" y2="232" />
            <line x1="168" y1="185" x2="86" y2="252" />
            <line x1="327" y1="116" x2="315" y2="232" />
          </g>

          <motion.circle
            key={scan}
            cx="206"
            cy="154"
            fill="none"
            stroke="rgba(235,10,30,.6)"
            initial={{ r: 8, opacity: 0.9 }}
            animate={{ r: 148, opacity: 0 }}
            transition={{ duration: 1.7, ease: "easeOut" }}
          />

          {nodes.map((node, index) => (
            <g key={node.label}>
              <motion.circle
                cx={node.x}
                cy={node.y}
                r="17"
                fill="#111"
                stroke={
                  index === scan % nodes.length
                    ? "rgba(235,10,30,1)"
                    : "rgba(255,255,255,.28)"
                }
                animate={{
                  scale: index === scan % nodes.length ? [1, 1.12, 1] : 1,
                }}
                transition={{ duration: 0.8 }}
              />
              <circle cx={node.x} cy={node.y} r="3" fill="#EB0A1E" />
              <text
                x={node.x}
                y={node.y + 33}
                textAnchor="middle"
                fill="rgba(255,255,255,.42)"
                fontSize="8"
                fontFamily="monospace"
                letterSpacing="1.5"
              >
                {node.label.toUpperCase()}
              </text>
            </g>
          ))}
        </svg>

        <div className="absolute bottom-7 left-7 right-7 grid grid-cols-3 border border-white/10 bg-black/30 font-mono text-[8px] uppercase tracking-[0.14em] text-white/30 sm:left-10 sm:right-10">
          <span className="p-3">tls <b className="block pt-1 font-normal text-white/70">on</b></span>
          <span className="border-l border-white/10 p-3">events <b className="block pt-1 font-normal text-white/70">{126 + scan * 7}</b></span>
          <span className="border-l border-white/10 p-3">alerts <b className="block pt-1 font-normal text-[#ff6673]">0</b></span>
        </div>
      </div>
    </FigureFrame>
  );
}

function GamingFigure() {
  const modes = [
    { label: "VALORANT", sub: "queue ready", score: "13 — 10" },
    { label: "NIGHT MODE", sub: "one more game", score: "02:17 AM" },
    { label: "LOCKED IN", sub: "comms on", score: "GG" },
  ];
  const [mode, setMode] = useState(0);
  const selected = modes[mode];

  return (
    <FigureFrame
      figure="FIG 05"
      title="GAME SESSION"
      action="click to change the session"
      status={selected.sub}
      onClick={() => setMode((value) => (value + 1) % modes.length)}
    >
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="relative aspect-square w-full max-w-[360px]">
          <motion.div
            className="absolute inset-[12%] rounded-full border border-white/15"
            animate={{ rotate: 360 }}
            transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-[24%] rounded-full border border-dashed border-white/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />

          <div className="absolute left-1/2 top-1/2 h-28 w-px -translate-x-1/2 -translate-y-1/2 bg-white/20" />
          <div className="absolute left-1/2 top-1/2 h-px w-28 -translate-x-1/2 -translate-y-1/2 bg-white/20" />
          <motion.div
            key={mode}
            initial={{ scale: 1.7, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 border border-[#EB0A1E]"
          />

          <div className="absolute inset-x-0 top-0 flex items-start justify-between font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
            <span>session / rr</span>
            <span>fps online</span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={selected.label}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute inset-x-0 bottom-0 border border-white/15 bg-black/40 p-5 backdrop-blur-sm"
            >
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-[#ff6370]">
                {selected.label}
              </p>
              <div className="mt-3 flex items-end justify-between gap-4">
                <p className="text-xl font-medium tracking-tight text-white">
                  {selected.sub}
                </p>
                <span className="font-mono text-sm text-white/50">{selected.score}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </FigureFrame>
  );
}

const dogs = [
  { name: "Olly", breed: "Golden Retriever", code: "golden / 01", type: "retriever", slot: "01" },
  { name: "Molly", breed: "Golden Retriever", code: "golden / 02", type: "retriever", slot: "02" },
  { name: "Bruno", breed: "Dachshund", code: "doxie / 03", type: "dachshund", slot: "03" },
];

function DogsFigure() {
  const [activeDog, setActiveDog] = useState(0);
  const dog = dogs[activeDog];

  return (
    <FigureFrame
      figure="FIG 06"
      title="HOME CREW"
      action="click to rotate the crew"
      status={dog.name.toLowerCase()}
      onClick={() => setActiveDog((value) => (value + 1) % dogs.length)}
    >
      <div className="absolute inset-0 p-5 sm:p-8">
        <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.16em] text-white/30">
          <span>pack roster / 03</span>
          <span>active {dog.slot}</span>
        </div>

        <div className="mt-5 grid h-[310px] grid-cols-[92px_1fr] gap-4 sm:grid-cols-[110px_1fr]">
          <div className="flex flex-col gap-2">
            {dogs.map((item, index) => (
              <motion.div
                key={item.name}
                animate={{
                  borderColor: index === activeDog ? "rgba(235,10,30,.8)" : "rgba(255,255,255,.10)",
                  backgroundColor: index === activeDog ? "rgba(235,10,30,.08)" : "rgba(255,255,255,.015)",
                }}
                className="border p-3"
              >
                <p className="font-mono text-[7px] uppercase tracking-[0.14em] text-white/28">
                  {item.slot}
                </p>
                <p className={`mt-1 text-sm font-medium ${index === activeDog ? "text-white" : "text-white/38"}`}>
                  {item.name}
                </p>
              </motion.div>
            ))}

            <div className="mt-auto border-t border-white/10 pt-3 font-mono text-[7px] uppercase tracking-[0.14em] text-white/22">
              home crew
              <span className="mt-1 block text-white/45">3 online</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={dog.name}
              initial={{ opacity: 0, x: 18, rotate: 0.4 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.28 }}
              className="relative overflow-hidden border border-white/15 bg-[#0c0c0c] p-5 sm:p-6"
            >
              <div className="absolute right-4 top-4 font-mono text-[7px] uppercase tracking-[0.14em] text-white/20">
                rr-home / {dog.slot}
              </div>

              <div className="grid h-full grid-rows-[1fr_auto]">
                <div className="relative">
                  <div className="absolute left-0 top-0">
                    <p className="font-mono text-[8px] uppercase tracking-[0.18em] text-[#ff6370]">
                      {dog.code}
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-[-0.045em] text-white sm:text-4xl">
                      {dog.name}
                    </h3>
                    <p className="mt-1 text-sm text-white/45">{dog.breed}</p>
                  </div>

                  <div className="absolute bottom-2 right-0 h-[150px] w-[190px] sm:h-[170px] sm:w-[220px]">
                    <motion.div
                      className="absolute inset-0 rounded-full border border-white/[0.07]"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
                    />
                    <motion.div
                      className="absolute inset-[18%] rounded-full border border-dashed border-white/[0.07]"
                      animate={{ rotate: -360 }}
                      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    />

                    {dog.type === "dachshund" ? (
                      <>
                        <motion.div
                          initial={{ scaleX: 0.7 }}
                          animate={{ scaleX: 1 }}
                          className="absolute bottom-[42px] right-[20px] h-[42px] w-[135px] rounded-[48%] border border-white/25 bg-white/[0.045]"
                        />
                        <div className="absolute bottom-[55px] left-[18px] h-[58px] w-[62px] rounded-[48%] border border-white/28 bg-[#141414]">
                          <span className="absolute left-[28%] top-[38%] h-1.5 w-1.5 rounded-full bg-[#EB0A1E]" />
                          <span className="absolute right-[28%] top-[38%] h-1.5 w-1.5 rounded-full bg-[#EB0A1E]" />
                          <span className="absolute -left-2 top-2 h-8 w-3 rotate-[-18deg] rounded-full border border-white/20" />
                          <span className="absolute -right-2 top-2 h-8 w-3 rotate-[18deg] rounded-full border border-white/20" />
                        </div>
                        <span className="absolute bottom-[26px] right-[42px] h-6 w-px bg-white/20" />
                        <span className="absolute bottom-[26px] right-[105px] h-6 w-px bg-white/20" />
                      </>
                    ) : (
                      <>
                        <motion.div
                          initial={{ scale: 0.86 }}
                          animate={{ scale: 1 }}
                          className="absolute bottom-[35px] right-[28px] h-[88px] w-[100px] rounded-[45%] border border-white/25 bg-white/[0.045]"
                        />
                        <div className="absolute bottom-[90px] left-[28px] h-[74px] w-[78px] rounded-[48%] border border-white/28 bg-[#141414]">
                          <span className="absolute left-[28%] top-[38%] h-1.5 w-1.5 rounded-full bg-[#EB0A1E]" />
                          <span className="absolute right-[28%] top-[38%] h-1.5 w-1.5 rounded-full bg-[#EB0A1E]" />
                          <span className="absolute -left-3 top-1 h-12 w-5 rotate-[15deg] rounded-full border border-white/18" />
                          <span className="absolute -right-3 top-1 h-12 w-5 rotate-[-15deg] rounded-full border border-white/18" />
                        </div>
                        <span className="absolute bottom-[19px] right-[45px] h-8 w-px bg-white/20" />
                        <span className="absolute bottom-[19px] right-[95px] h-8 w-px bg-white/20" />
                      </>
                    )}

                    <span className="absolute bottom-0 right-0 font-mono text-[7px] uppercase tracking-[0.14em] text-white/22">
                      schematic portrait
                    </span>
                  </div>
                </div>

                <div>
                  <div className="grid grid-cols-3 border-t border-white/10 pt-4 font-mono text-[8px] uppercase tracking-[0.12em] text-white/28">
                    <span>breed<b className="mt-1 block font-normal text-white/68">{dog.breed}</b></span>
                    <span>crew slot<b className="mt-1 block font-normal text-white/68">{dog.slot} / 03</b></span>
                    <span>status<b className="mt-1 block font-normal text-[#ff6370]">home</b></span>
                  </div>

                  <div className="mt-4 flex items-center gap-2">
                    {dogs.map((item, index) => (
                      <motion.span
                        key={item.name}
                        animate={{ width: index === activeDog ? 28 : 8 }}
                        className={`h-px ${index === activeDog ? "bg-[#EB0A1E]" : "bg-white/15"}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </FigureFrame>
  );
}

function GunplaFigure() {
  const [assembled, setAssembled] = useState(false);

  const part = {
    transition: { type: "spring" as const, stiffness: 95, damping: 17 },
  };

  return (
    <FigureFrame
      figure="FIG 05"
      title="RX BUILD / BENCH"
      action="click to assemble"
      status={assembled ? "assembled" : "parts laid out"}
      onClick={() => setAssembled((value) => !value)}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative h-[260px] w-[260px] scale-90 sm:scale-100">
          <motion.div
            className="absolute left-[105px] top-[30px] h-[45px] w-[50px] border border-white/35 bg-white/[0.04]"
            animate={assembled ? { x: 0, y: 0, rotate: 0 } : { x: -60, y: -5, rotate: -18 }}
            {...part}
          >
            <span className="absolute left-1/2 top-[-17px] h-5 w-px -translate-x-1/2 rotate-[-35deg] bg-[#EB0A1E]" />
            <span className="absolute left-1/2 top-[-17px] h-5 w-px -translate-x-1/2 rotate-[35deg] bg-[#EB0A1E]" />
          </motion.div>

          <motion.div
            className="absolute left-[91px] top-[83px] h-[78px] w-[78px] border border-white/35 bg-white/[0.045]"
            animate={assembled ? { x: 0, y: 0, rotate: 0 } : { x: 48, y: -20, rotate: 10 }}
            {...part}
          >
            <div className="absolute left-1/2 top-4 h-8 w-2 -translate-x-1/2 bg-[#EB0A1E]/80" />
          </motion.div>

          <motion.div
            className="absolute left-[48px] top-[91px] h-[20px] w-[48px] border border-white/35"
            animate={assembled ? { x: 0, y: 0, rotate: -20 } : { x: -38, y: 50, rotate: -55 }}
            {...part}
          />
          <motion.div
            className="absolute right-[48px] top-[91px] h-[20px] w-[48px] border border-white/35"
            animate={assembled ? { x: 0, y: 0, rotate: 20 } : { x: 35, y: 54, rotate: 52 }}
            {...part}
          />

          <motion.div
            className="absolute left-[96px] top-[165px] h-[70px] w-[24px] border border-white/35"
            animate={assembled ? { x: 0, y: 0, rotate: 3 } : { x: -55, y: 12, rotate: 16 }}
            {...part}
          />
          <motion.div
            className="absolute right-[96px] top-[165px] h-[70px] w-[24px] border border-white/35"
            animate={assembled ? { x: 0, y: 0, rotate: -3 } : { x: 58, y: 9, rotate: -15 }}
            {...part}
          />

          <motion.div
            className="absolute inset-[22px] rounded-full border border-[#EB0A1E]/20"
            animate={{ rotate: 360 }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          />
          <motion.div
            className="absolute inset-[4px] rounded-full border border-dashed border-white/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          />
        </div>

        <div className="absolute bottom-7 left-7 font-mono text-[8px] uppercase tracking-[0.16em] text-white/30 sm:left-10">
          master grade / bench 02
        </div>
      </div>
    </FigureFrame>
  );
}

function ContactFigure() {
  const [sent, setSent] = useState(false);

  return (
    <FigureFrame
      figure="FIG 06"
      title="OPEN CHANNEL"
      action="click to ping"
      status={sent ? "signal received" : "listening"}
      onClick={() => setSent((value) => !value)}
    >
      <div className="absolute inset-0 flex items-center justify-center p-8">
        <div className="w-full max-w-[450px] border border-white/20 bg-[#0b0b0b] font-mono text-[11px] leading-7 text-white/50">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-[9px] uppercase tracking-[0.16em]">
            <span>rr_terminal</span>
            <span className="text-[#ff5c6b]">online</span>
          </div>
          <div className="p-5 sm:p-6">
            <p><span className="text-[#ff5c6b]">$</span> whoami</p>
            <p className="pl-4 text-white/78">Ryan Rico</p>
            <p className="mt-3"><span className="text-[#ff5c6b]">$</span> location</p>
            <p className="pl-4 text-white/78">{SITE.location}</p>
            <p className="mt-3"><span className="text-[#ff5c6b]">$</span> contact --status</p>
            <AnimatePresence mode="wait">
              <motion.p
                key={String(sent)}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                className="pl-4 text-white/78"
              >
                {sent ? "signal received. inbox ready." : "available for the right build."}
              </motion.p>
            </AnimatePresence>
            <p className="mt-3"><span className="text-[#ff5c6b]">$</span> <span className="inline-block h-3 w-1.5 animate-pulse bg-white/60 align-middle" /></p>
          </div>
        </div>
      </div>
    </FigureFrame>
  );
}

type ChapterProps = {
  id: string;
  eyebrow: string;
  title: ReactNode;
  body: ReactNode;
  figure: ReactNode;
  index: number;
  first?: boolean;
};

function Chapter({ id, eyebrow, title, body, figure, index, first }: ChapterProps) {
  return (
    <section
      id={id}
      data-chapter={index}
      className="relative flex min-h-screen scroll-mt-0 items-center border-b border-white/10 px-5 py-28 sm:px-8 lg:px-12 xl:px-16"
    >
      <div className="mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-20 xl:gap-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.24 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="order-2 lg:order-1"
        >
          {figure}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.34 }}
          transition={{ duration: 0.72, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="order-1 max-w-[720px] lg:order-2"
        >
          <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-white/30">
            {eyebrow}
          </p>
          <h2
            className={`mt-6 font-semibold tracking-[-0.045em] text-white ${first ? "text-[clamp(3.7rem,8vw,8rem)] leading-[0.84]" : "text-[clamp(2.7rem,5.2vw,5.6rem)] leading-[0.92]"}`}
          >
            {title}
          </h2>
          <div className="mt-8 max-w-[650px] space-y-5 text-[15px] leading-7 text-white/60 sm:text-[17px] sm:leading-8">
            {body}
          </div>

          {first && (
            <a
              href="#floor"
              className="mt-12 inline-flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-white/75"
            >
              Scroll
              <ArrowDown size={13} className="text-[#EB0A1E]" />
            </a>
          )}
        </motion.div>
      </div>
    </section>
  );
}

export function EditorialPortfolio() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible) {
          setActive(Number((visible.target as HTMLElement).dataset.chapter ?? 0));
        }
      },
      { threshold: [0.34, 0.52, 0.68] }
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#101010] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#101010]/80 backdrop-blur-xl">
        <div className="mx-auto grid h-16 max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 sm:px-8 lg:px-12 xl:px-16">
          <a
            href="#top"
            className="justify-self-start text-sm font-semibold tracking-[-0.02em] text-white"
          >
            Ryan Rico
          </a>

          <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/40">
            {String(active + 1).padStart(2, "0")} / {String(chapters.length).padStart(2, "0")}
          </div>

          <div className="flex items-center gap-4 justify-self-end font-mono text-[9px] uppercase tracking-[0.16em]">
            <a
              href={SITE.github}
              target="_blank"
              rel="noreferrer"
              className="hidden text-white/40 transition-colors hover:text-white sm:inline"
            >
              GitHub
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-white/40 transition-colors hover:text-white"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </header>

      <nav
        aria-label="Chapter navigation"
        className="fixed right-3 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-3 lg:flex xl:right-6"
      >
        {chapters.map((chapter, index) => (
          <a
            key={chapter.id}
            href={`#${chapter.id}`}
            aria-label={chapter.label}
            aria-current={active === index ? "true" : undefined}
            className="group flex items-center justify-end gap-3"
          >
            <span
              className={`pointer-events-none whitespace-nowrap font-mono text-[8px] uppercase tracking-[0.14em] transition-opacity ${active === index ? "text-white/50 opacity-100" : "text-white/25 opacity-0 group-hover:opacity-100"}`}
            >
              {chapter.label}
            </span>
            <motion.span
              animate={{
                width: active === index ? 28 : 12,
                backgroundColor:
                  active === index ? "rgba(235,10,30,1)" : "rgba(255,255,255,.2)",
              }}
              className="block h-px"
            />
          </a>
        ))}
      </nav>

      <Chapter
        id="top"
        index={0}
        first
        eyebrow="00 / about"
        title={
          <>
            Hi, I&apos;m
            <br />
            Ryan.
          </>
        }
        body={
          <>
            <p>
              I work BDC Sales at Round Rock Toyota, where I handle internet
              leads, appointments, vehicle tracking, and the operational details
              that keep a busy sales floor moving.
            </p>
            <p>
              I also build software for those same workflows. Dashboards,
              automation, internal tools, and AI-assisted systems are where my
              dealership experience and technical work meet.
            </p>
            <div className="flex flex-wrap gap-x-5 gap-y-2 pt-2 font-mono text-[9px] uppercase tracking-[0.17em] text-white/40">
              <a href={SITE.github} target="_blank" rel="noreferrer" className="hover:text-white/75">GitHub</a>
              <a href={SITE.linkedin} target="_blank" rel="noreferrer" className="hover:text-white/75">LinkedIn</a>
              <a href={SITE.instagram} target="_blank" rel="noreferrer" className="hover:text-white/75">Builds</a>
            </div>
          </>
        }
        figure={<IntroFigure />}
      />

      <Chapter
        id="floor"
        index={1}
        eyebrow="01 / on the floor"
        title={
          <>
            Sales is a
            <br />
            systems problem.
          </>
        }
        body={
          <>
            <p>
              Every lead has a state, an owner, a next action, and a clock. The
              hard part is keeping that information useful when the floor gets
              busy.
            </p>
            <p>
              My day-to-day work covers first contact, appointment setting,
              follow-up, vehicle availability, and helping customers move from
              a message to a real visit without losing context.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
              Click the figure to move the lead through the funnel.
            </p>
          </>
        }
        figure={<LeadFlowFigure />}
      />

      <Chapter
        id="projects"
        index={2}
        eyebrow="02 / selected work"
        title={
          <>
            I build the tools
            <br />
            I want on the floor.
          </>
        }
        body={
          <>
            <p>
              The Round Rock Toyota Leaderboard turns sales activity into a live
              operating view for managers, team leads, consultants, and TV
              displays.
            </p>
            <p>
              Around it are smaller systems for BDC workflows, AI-assisted
              customer conversations, and document operations. The common goal
              is simple: reduce manual work and make the next action obvious.
            </p>
            <a
              href="https://github.com/ryewmn/ROUND-ROCK-TOYOTA-LEADERBOARD"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 pt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/50 hover:text-white"
            >
              Open flagship project <ArrowUpRight size={12} className="text-[#EB0A1E]" />
            </a>
          </>
        }
        figure={
          <div className="space-y-5">
            <LeaderboardFigure />
            <div className="hidden xl:block">
              <ProjectFigure />
            </div>
          </div>
        }
      />

      <Chapter
        id="systems"
        index={3}
        eyebrow="03 / systems"
        title={
          <>
            Software should
            <br />
            explain itself.
          </>
        }
        body={
          <>
            <p>
              I work across React, Next.js, TypeScript, Python, APIs, cloud
              deployment, automation, and data workflows. I care about systems
              that stay understandable when they grow.
            </p>
            <p>
              Security sits in the same loop. Good defaults, clear access
              boundaries, reliable logs, and predictable failure modes matter
              as much as the interface.
            </p>
            <div className="grid max-w-lg grid-cols-2 gap-x-8 gap-y-3 pt-3 font-mono text-[9px] uppercase tracking-[0.15em] text-white/40 sm:grid-cols-3">
              {["Next.js", "React", "TypeScript", "Python", "GitHub", "Cloud", "APIs", "Automation", "Security"].map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </>
        }
        figure={<SystemsFigure />}
      />

      <Chapter
        id="games"
        index={4}
        eyebrow="04 / gaming"
        title={
          <>
            Sometimes I just
            <br />
            want to queue.
          </>
        }
        body={
          <>
            <p>
              Video games are the reset button after work and code. Valorant is
              one of the games I keep coming back to, especially when I want
              something competitive and mechanical.
            </p>
            <p>
              I like the same thing in games that I like in software: feedback
              that is immediate, controls that feel predictable, and small
              adjustments that actually matter.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
              Click the figure to rotate through the session.
            </p>
          </>
        }
        figure={<GamingFigure />}
      />

      <Chapter
        id="dogs"
        index={5}
        eyebrow="05 / the crew"
        title={
          <>
            Olly. Molly.
            <br />
            Bruno.
          </>
        }
        body={
          <>
            <p>
              Olly and Molly are the two Goldens. Bruno is the dachshund.
              They are the part of home that has nothing to do with dashboards,
              lead counts, code, or whatever I am building that week.
            </p>
            <p>
              I wanted them here because this site should feel like me, not
              just a cleaner version of a resume.
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/30">
              Click the figure to rotate through Olly, Molly, and Bruno.
            </p>
          </>
        }
        figure={<DogsFigure />}
      />

      <Chapter
        id="builds"
        index={6}
        eyebrow="06 / gunpla"
        title={
          <>
            I still like
            <br />
            building by hand.
          </>
        }
        body={
          <>
            <p>
              Away from the dealership and the keyboard, I build Gunpla. Master
              Grades and Perfect Grades are the fun part: planning, cleanup,
              assembly, posing, then finding the next kit.
            </p>
            <p>
              It is also why I like interfaces with small mechanical details.
              Good interactions should feel intentional even when they are only
              there to make the experience more fun.
            </p>
            <a
              href={SITE.instagram}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 pt-2 font-mono text-[9px] uppercase tracking-[0.18em] text-white/50 hover:text-white"
            >
              {SITE.instagramHandle} <ArrowUpRight size={12} className="text-[#EB0A1E]" />
            </a>
          </>
        }
        figure={<GunplaFigure />}
      />

      <Chapter
        id="contact"
        index={5}
        eyebrow="07 / say hi"
        title={
          <>
            Build something
            <br />
            useful.
          </>
        }
        body={
          <>
            <p>
              I am based in {SITE.location}. If you want to talk dealership
              operations, software, automation, or a role where those skills
              overlap, reach out.
            </p>

            <div className="grid gap-3 pt-4 sm:grid-cols-2">
              <a
                href={`mailto:${SITE.email}`}
                className="group flex items-center justify-between border border-white/10 px-4 py-4 text-sm text-white/70 transition hover:border-white/30 hover:bg-white/[0.03] hover:text-white"
              >
                <span className="flex items-center gap-3"><Mail size={15} className="text-[#EB0A1E]" /> Email</span>
                <ArrowUpRight size={14} className="opacity-35 transition group-hover:opacity-100" />
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border border-white/10 px-4 py-4 text-sm text-white/70 transition hover:border-white/30 hover:bg-white/[0.03] hover:text-white"
              >
                <span className="flex items-center gap-3"><Github size={15} className="text-[#EB0A1E]" /> GitHub</span>
                <ArrowUpRight size={14} className="opacity-35 transition group-hover:opacity-100" />
              </a>
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noreferrer"
                className="group flex items-center justify-between border border-white/10 px-4 py-4 text-sm text-white/70 transition hover:border-white/30 hover:bg-white/[0.03] hover:text-white"
              >
                <span className="flex items-center gap-3"><Linkedin size={15} className="text-[#EB0A1E]" /> LinkedIn</span>
                <ArrowUpRight size={14} className="opacity-35 transition group-hover:opacity-100" />
              </a>
              <div className="flex items-center gap-3 border border-white/10 px-4 py-4 text-sm text-white/50">
                <MapPin size={15} className="text-[#EB0A1E]" /> {SITE.location}
              </div>
            </div>
          </>
        }
        figure={<ContactFigure />}
      />

      <footer className="border-t border-white/10 px-5 py-8 sm:px-8 lg:px-12 xl:px-16">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-3 font-mono text-[8px] uppercase tracking-[0.16em] text-white/30 sm:flex-row sm:items-center sm:justify-between">
          <span>Ryan Rico / {new Date().getFullYear()}</span>
          <span>BDC Sales · Software · Builds</span>
        </div>
      </footer>
    </main>
  );
}
