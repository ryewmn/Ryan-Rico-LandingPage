import { Mail, MapPin, Phone, Linkedin, Github, Instagram } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/site-config";

const FOOTER_LINKS = NAV_LINKS.filter((l) => l.inFooter);

const socials = [
  { Icon: Linkedin, href: SITE.linkedin, label: "LinkedIn" },
  { Icon: Github, href: SITE.github, label: "GitHub" },
  { Icon: Instagram, href: SITE.instagram, label: "Instagram" },
  { Icon: Mail, href: `mailto:${SITE.email}`, label: "Email" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-background text-foreground/70 border-t border-foreground/10">
      <div
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-toyota-red/50 to-transparent"
        aria-hidden="true"
      />

      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-toyota-red to-ember text-foreground font-bold text-sm shadow-red-glow">
                {SITE.shortName}
              </span>
              <span className="font-semibold tracking-tight text-foreground">
                {SITE.name}
              </span>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-foreground/65 max-w-sm">
              Automotive Operations &middot; Retail Retention &middot; Software
              Development. Based in {SITE.location}.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map(({ Icon, href, label }) => {
                const ext = href.startsWith("http");
                return (
                  <a
                    key={label}
                    href={href}
                    target={ext ? "_blank" : undefined}
                    rel={ext ? "noopener noreferrer" : undefined}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-foreground/15 bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground hover:border-foreground/30 transition-colors"
                    aria-label={label}
                  >
                    <Icon size={15} />
                  </a>
                );
              })}
            </div>
          </div>

          <div className="md:col-span-3">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
              Navigate
            </p>
            <ul className="mt-5 space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-foreground/65 hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <p className="text-xs font-mono uppercase tracking-[0.18em] text-muted-foreground">
              Contact
            </p>
            <ul className="mt-5 space-y-3">
              <li className="flex items-center gap-2 text-sm text-foreground/65">
                <Mail size={14} className="text-toyota-red shrink-0" />
                <a
                  href={`mailto:${SITE.email}`}
                  className="hover:text-foreground transition-colors break-all"
                >
                  {SITE.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground/65">
                <Phone size={14} className="text-toyota-red shrink-0" />
                <a
                  href={`tel:${SITE.phoneTel}`}
                  className="hover:text-foreground transition-colors"
                >
                  {SITE.phone}
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm text-foreground/65">
                <MapPin size={14} className="text-toyota-red shrink-0" />
                {SITE.location}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-8 border-t border-foreground/10">
          <p className="text-xs text-muted-foreground">
            &copy; {year} {SITE.name}. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js, Tailwind CSS, and Framer Motion.
          </p>
        </div>
      </div>
    </footer>
  );
}
