import { Mail, MapPin, Phone, Linkedin, Github, Instagram } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site-config";

const FOOTER_LINKS = NAV_LINKS.filter((l) => l.inFooter);

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-neutral-50 text-neutral-700 border-t border-neutral-200">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-toyota-red/40 to-transparent"
        aria-hidden="true"
      />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-toyota-red text-white font-bold text-sm shadow-red-glow">
                {SITE.shortName}
              </span>
              <span className="font-semibold tracking-tight text-neutral-900">
                {SITE.name}
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-neutral-600 max-w-sm">
              Automotive Operations &middot; Retail Retention &middot; Software
              Development. Based in {SITE.location}.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <a
                href={SITE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-colors text-neutral-700"
                aria-label="LinkedIn"
              >
                <Linkedin size={15} />
              </a>
              <a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-colors text-neutral-700"
                aria-label="GitHub"
              >
                <Github size={15} />
              </a>
              <a
                href={SITE.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-colors text-neutral-700"
                aria-label="Instagram"
              >
                <Instagram size={15} />
              </a>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-neutral-200 bg-white hover:bg-neutral-50 hover:border-neutral-300 transition-colors text-neutral-700"
                aria-label="Email"
              >
                <Mail size={15} />
              </a>
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-500">
              Contact
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <Mail size={14} className="text-toyota-red shrink-0" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-neutral-900 transition-colors break-all"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <Phone size={14} className="text-toyota-red shrink-0" />
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="hover:text-neutral-900 transition-colors"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-neutral-700">
                <MapPin size={14} className="text-toyota-red shrink-0" />
                {SITE.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-neutral-200">
          <p className="text-xs text-neutral-500">
            &copy; {year} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-neutral-500">
            Built with Next.js, Tailwind CSS, and Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
