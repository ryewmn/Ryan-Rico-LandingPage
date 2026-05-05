"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowUpRight,
  Bot,
  Building2,
  FileSearch,
  Github,
  Instagram,
  LineChart,
  Linkedin,
  Lock,
  Mail,
  MapPin,
  Phone,
  Trophy,
  Wrench,
  X,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { HotspotKey } from "@/components/room-scene";
import { HOTSPOT_LABELS } from "@/components/room-scene";

type Project = {
  title: string;
  description: string;
  status: "Live" | "Building" | "Planning";
  tags: string[];
  icon: LucideIcon;
  url?: string;
  isPrivate?: boolean;
};

const projects: Project[] = [
  {
    title: "Round Rock Toyota Leaderboard",
    description:
      "Internal performance dashboard for the sales floor. Tracks appointments, shows, and deliveries by salesperson.",
    status: "Live",
    tags: ["TypeScript", "Next.js", "Tailwind"],
    icon: Trophy,
    url: "https://github.com/ryewmn/ROUND-ROCK-TOYOTA-LEADERBOARD",
  },
  {
    title: "BDC Toolkit",
    description:
      "Working set of tools for the Round Rock Toyota BDC — script libraries, lead workups, follow-up helpers.",
    status: "Building",
    tags: ["Internal", "BDC", "Workflow"],
    icon: Wrench,
    isPrivate: true,
  },
  {
    title: "Car Sales AI Agent",
    description:
      "AI agents that help customers find the right car and the right deal — the tedious back-and-forth, automated.",
    status: "Building",
    tags: ["AI Agents", "JavaScript"],
    icon: Bot,
    isPrivate: true,
  },
  {
    title: "OpsGlass",
    description:
      "AI-powered multimodal document assistant that ingests invoices, contracts, and receipts. Natural language querying via Hugging Face models.",
    status: "Building",
    tags: ["AI", "Hugging Face"],
    icon: FileSearch,
    isPrivate: true,
  },
];

const areas = [
  {
    icon: LineChart,
    title: "Dashboards",
    description:
      "Sales-floor leaderboards, performance trackers, anything that gives the team a clearer signal.",
  },
  {
    icon: Bot,
    title: "AI Automation",
    description:
      "Agents handling lead workups, follow-up drafts, and the back-and-forth that doesn't need a human.",
  },
  {
    icon: Wrench,
    title: "Building Gundams",
    description:
      "Off-the-clock Gunpla. Same loop as code — start with parts, end with something that stands on its own.",
  },
];

function PanelShell({
  onClose,
  eyebrow,
  title,
  children,
}: {
  onClose: () => void;
  eyebrow: string;
  title: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      key={eyebrow}
      initial={{ opacity: 0, x: 80 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 80 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="pointer-events-auto absolute right-0 top-0 z-20 flex h-full w-full sm:w-[480px] md:w-[520px] flex-col overflow-hidden border-l border-white/10 bg-neutral-950/85 backdrop-blur-xl"
    >
      {/* glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-ember to-transparent opacity-60"
      />

      <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
            {eyebrow}
          </p>
          <h3 className="mt-1 text-2xl font-bold tracking-tight text-white">
            {title}
          </h3>
        </div>
        <button
          onClick={onClose}
          aria-label="Back to room"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-7 space-y-5">{children}</div>

      <div className="border-t border-white/10 px-6 py-4">
        <button
          onClick={onClose}
          className="group inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.22em] text-white/55 hover:text-white transition-colors"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-ember" />
          Esc · back to the room
        </button>
      </div>
    </motion.div>
  );
}

function PCContent({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell
      onClose={onClose}
      eyebrow="Workstation · Projects"
      title={
        <>
          Software for{" "}
          <span className="font-display italic font-normal text-ember">
            dealership ops.
          </span>
        </>
      }
    >
      {projects.map((p) => {
        const Icon = p.icon;
        const statusColor =
          p.status === "Live"
            ? "bg-emerald-500"
            : p.status === "Building"
            ? "bg-amber-500"
            : "bg-neutral-400";
        return (
          <article
            key={p.title}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-white/20 hover:bg-white/[0.05] transition-colors"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-ember/15 text-ember ring-1 ring-ember/30">
                <Icon size={18} />
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-mono uppercase tracking-wider text-white/70">
                <span className={`h-1.5 w-1.5 rounded-full ${statusColor}`} />
                {p.status}
              </span>
            </div>
            <h4 className="mt-4 text-base font-semibold text-white">{p.title}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-white/65">
              {p.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] font-medium text-white/60 ring-1 ring-white/10"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
              {p.url ? (
                <a
                  href={p.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-white hover:text-ember transition-colors"
                >
                  View on GitHub
                  <ArrowUpRight
                    size={13}
                    className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
              ) : (
                <span className="text-xs text-white/40">Reach out for details</span>
              )}
              {p.isPrivate ? (
                <span className="inline-flex items-center gap-1 text-[10px] text-white/40">
                  <Lock size={10} />
                  Private
                </span>
              ) : null}
            </div>
          </article>
        );
      })}
    </PanelShell>
  );
}

function LegosContent({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell
      onClose={onClose}
      eyebrow="The Pile · Current Work"
      title={
        <>
          Where I{" "}
          <span className="font-display italic font-normal text-ember">
            spend my time.
          </span>
        </>
      }
    >
      {areas.map((a) => {
        const Icon = a.icon;
        return (
          <article
            key={a.title}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-ember/15 text-ember ring-1 ring-ember/30">
              <Icon size={20} />
            </div>
            <h4 className="mt-4 text-base font-semibold text-white">{a.title}</h4>
            <p className="mt-1.5 text-sm leading-relaxed text-white/65">
              {a.description}
            </p>
          </article>
        );
      })}
    </PanelShell>
  );
}

function GundamContent({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell
      onClose={onClose}
      eyebrow="Gunpla Shelf · Builds"
      title={
        <>
          Built with{" "}
          <span className="font-display italic font-normal text-ember">
            both hands.
          </span>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-white/70">
        Off-the-clock I build Gunpla kits — Master Grade, Real Grade, the
        occasional High Grade I should have skipped. Same loop as code: start
        with parts, end with something that stands on its own.
      </p>

      <a
        href="https://www.instagram.com/builds.by.ryry/"
        target="_blank"
        rel="noreferrer"
        className="group flex items-center justify-between rounded-2xl border border-white/10 bg-gradient-to-br from-ember/15 via-toyota-red/10 to-transparent p-5 hover:from-ember/25 hover:via-toyota-red/15 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white ring-1 ring-white/15">
            <Instagram size={20} />
          </div>
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ember">
              Instagram
            </p>
            <p className="text-base font-semibold text-white">@builds.by.ryry</p>
            <p className="mt-0.5 text-xs text-white/55">
              Recent kits, WIP shots, panel-line nerdery
            </p>
          </div>
        </div>
        <ArrowUpRight
          size={20}
          className="text-white/70 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </a>

      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/45">
          Coming soon
        </p>
        <p className="mt-2 text-sm text-white/65">
          A live grid of recent posts pulled straight from Instagram lands in
          the next phase. For now, the link above is the freshest source.
        </p>
      </div>
    </PanelShell>
  );
}

function ToyotaContent({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell
      onClose={onClose}
      eyebrow="The Lot · About"
      title={
        <>
          Hands on{" "}
          <span className="font-display italic font-normal text-toyota-red">
            the floor.
          </span>
        </>
      }
    >
      <p className="text-sm leading-relaxed text-white/75">
        Three years in at Round Rock Toyota. I work BDC Sales — handling
        internet leads, setting appointments, and walking customers from first
        message to first vehicle. Last year I helped move 150+ vehicles through
        that funnel.
      </p>
      <p className="text-sm leading-relaxed text-white/75">
        After hours I build software for the same workflows I run during the
        day. The first tool I shipped — a leaderboard for the sales floor — is
        live. The next ones (a BDC toolkit and an AI-assisted car-buying agent)
        are in progress.
      </p>

      <div className="grid grid-cols-3 gap-3">
        {[
          { v: "3", l: "Years" },
          { v: "150+", l: "Vehicles / yr" },
          { v: "1", l: "Tool live" },
        ].map((s) => (
          <div
            key={s.l}
            className="rounded-xl border border-white/10 bg-white/[0.03] p-4"
          >
            <p className="text-2xl font-bold text-white">{s.v}</p>
            <p className="mt-1 text-[11px] uppercase tracking-wider text-white/50">
              {s.l}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-sm italic text-white/80">
        “Software shouldn&apos;t replace what works on the floor — it should
        give the team time back so they can do more of it.”
      </div>
    </PanelShell>
  );
}

function PhoneContent({ onClose }: { onClose: () => void }) {
  return (
    <PanelShell
      onClose={onClose}
      eyebrow="The Phone · Contact"
      title={
        <>
          Let&apos;s{" "}
          <span className="font-display italic font-normal text-ember">
            talk shop.
          </span>
        </>
      }
    >
      <p className="text-sm text-white/70">
        Looking to upgrade, sell your vehicle, or talk about software for your
        dealership? Pick a line.
      </p>

      <ul className="space-y-3">
        <ContactRow
          icon={Building2}
          label="Dealership"
          value="Round Rock Toyota"
        />
        <ContactRow
          icon={MapPin}
          label="Location"
          value="Round Rock, Texas"
        />
        <ContactRow
          icon={Mail}
          label="Email"
          value="ryanchristopher.rico@gmail.com"
          href="mailto:ryanchristopher.rico@gmail.com"
        />
        <ContactRow
          icon={Phone}
          label="Phone"
          value="(717) 781-4318"
          href="tel:+17177814318"
        />
      </ul>

      <div className="grid grid-cols-3 gap-3 pt-2">
        <SocialTile
          icon={Linkedin}
          href="https://www.linkedin.com/in/ryanchristopherrico/"
          label="LinkedIn"
        />
        <SocialTile
          icon={Github}
          href="https://github.com/ryewmn"
          label="GitHub"
        />
        <SocialTile
          icon={Instagram}
          href="https://www.instagram.com/builds.by.ryry/"
          label="Instagram"
        />
      </div>
    </PanelShell>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
  href?: string;
}) {
  const Inner = (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-4">
      <Icon size={16} className="mt-0.5 text-ember shrink-0" />
      <div>
        <p className="font-mono text-[10px] uppercase tracking-widest text-white/45">
          {label}
        </p>
        <p className="mt-1 text-sm font-medium text-white break-all">{value}</p>
      </div>
    </div>
  );
  if (!href) return <li>{Inner}</li>;
  return (
    <li>
      <a href={href} className="block hover:opacity-90 transition-opacity">
        {Inner}
      </a>
    </li>
  );
}

function SocialTile({
  icon: Icon,
  href,
  label,
}: {
  icon: LucideIcon;
  href: string;
  label: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="group flex flex-col items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] py-4 hover:bg-white/[0.06] hover:border-white/20 transition-colors"
    >
      <Icon size={18} className="text-white/80 group-hover:text-ember transition-colors" />
      <span className="text-[10px] font-mono uppercase tracking-wider text-white/55">
        {label}
      </span>
    </a>
  );
}

const PANEL_BY_KEY: Record<HotspotKey, React.ComponentType<{ onClose: () => void }>> = {
  pc: PCContent,
  legos: LegosContent,
  gundam: GundamContent,
  toyota: ToyotaContent,
  phone: PhoneContent,
};

export function RoomPanel({
  hotspot,
  onClose,
}: {
  hotspot: HotspotKey | null;
  onClose: () => void;
}) {
  return (
    <AnimatePresence mode="wait">
      {hotspot ? (() => {
        const Comp = PANEL_BY_KEY[hotspot];
        return <Comp onClose={onClose} />;
      })() : null}
    </AnimatePresence>
  );
}

export { HOTSPOT_LABELS };
