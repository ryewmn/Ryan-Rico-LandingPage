import { Mail, MapPin } from "lucide-react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#current-work", label: "Current Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-950 text-white">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-toyota-red/40 to-transparent"
        aria-hidden="true"
      />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-toyota-red text-white font-bold text-sm shadow-red-glow">
                RR
              </span>
              <span className="font-semibold tracking-tight">Ryan Rico</span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-white/60 max-w-sm">
              Automotive Technology &middot; Retail Retention &middot; Software
              Development. Based in Round Rock, Texas.
            </p>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/40">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/70 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-white/40">
              Contact
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Mail size={14} className="text-toyota-red" />
                <a
                  href="mailto:hello@ryanrico.com"
                  className="hover:text-white transition-colors"
                >
                  hello@ryanrico.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <MapPin size={14} className="text-toyota-red" />
                Round Rock / Georgetown, Texas
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-white/10">
          <p className="text-xs text-white/40">
            &copy; {year} Ryan Rico. All rights reserved.
          </p>
          <p className="text-xs text-white/40">
            Built with Next.js, Tailwind CSS, and Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
