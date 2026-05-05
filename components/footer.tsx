import { Mail, MapPin, Phone, Linkedin, Github } from "lucide-react";

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
              Automotive Operations &middot; Retail Retention &middot; Software
              Development. Based in Round Rock, Texas.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href="https://www.linkedin.com/in/ryanchristopherrico/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href="https://github.com/ryewmn"
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
              <a
                href="mailto:ryanchristopher.rico@gmail.com"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-colors"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>
            </div>
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
                <Mail size={14} className="text-toyota-red shrink-0" />
                <a
                  href="mailto:ryanchristopher.rico@gmail.com"
                  className="hover:text-white transition-colors break-all"
                >
                  ryanchristopher.rico@gmail.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <Phone size={14} className="text-toyota-red shrink-0" />
                <a
                  href="tel:+17177814318"
                  className="hover:text-white transition-colors"
                >
                  (717) 781-4318
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-white/70">
                <MapPin size={14} className="text-toyota-red shrink-0" />
                Round Rock, Texas
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
