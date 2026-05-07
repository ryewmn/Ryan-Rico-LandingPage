import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen relative isolate flex items-center bg-stone-50 text-neutral-900 overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 grid-bg-soft opacity-50"
      />
      <div
        aria-hidden="true"
        className="absolute -top-40 -left-20 h-[600px] w-[700px] rounded-full bg-toyota-red/[0.06] blur-[160px]"
      />
      <div
        aria-hidden="true"
        className="absolute top-40 right-0 h-[500px] w-[500px] rounded-full bg-amber-200/30 blur-[160px]"
      />

      <div className="relative z-10 container py-24">
        <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-toyota-red">
          [ 404 ] · Off the lot
        </p>
        <h1 className="mt-5 text-6xl sm:text-7xl md:text-8xl lg:text-[120px] font-bold tracking-tight leading-[0.92] text-neutral-900">
          Wrong{" "}
          <span className="font-display italic font-normal text-gradient-fire">
            turn.
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg text-neutral-600 leading-relaxed">
          This page isn&apos;t in the inventory. Maybe a typo, maybe it
          hasn&apos;t been built yet. Either way — let&apos;s get you back.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-full bg-toyota-red px-6 py-3 text-sm font-medium text-white shadow-red-glow hover:bg-toyota-red-dark transition-colors"
          >
            <ArrowLeft size={16} />
            Back to home
          </Link>
        </div>
      </div>
    </main>
  );
}
