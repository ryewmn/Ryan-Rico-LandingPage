/**
 * Single source of truth for nav links, contact info, and external URLs.
 * Updating any of these in one place propagates to navbar, footer, sitemap,
 * contact card, hero, OG image, and JSON-LD structured data.
 */

export const SITE = {
  name: "Ryan Rico",
  shortName: "RR",
  role: "BDC Sales",
  employer: "Round Rock Toyota",
  tagline: "BDC Sales / Software / Builds",
  url: "https://ryanrico.com",
  email: "ryanchristopher.rico@gmail.com",
  phone: "(717) 781-4318",
  phoneTel: "+17177814318",
  city: "Austin",
  region: "TX",
  location: "Austin, TX",
  github: "https://github.com/ryewmn",
  githubHandle: "@ryewmn",
  linkedin: "https://www.linkedin.com/in/ryanchristopherrico/",
  instagram: "https://www.instagram.com/builds.by.ryry/",
  instagramHandle: "@builds.by.ryry",
  dealership: "https://www.roundrocktoyota.com/",
} as const;

export const NAV_LINKS = [
  { id: "about", href: "#about", label: "About", inNav: true, inFooter: true },
  { id: "current-work", href: "#current-work", label: "Current Work", inNav: false, inFooter: true },
  { id: "projects", href: "#projects", label: "Projects", inNav: true, inFooter: true },
  { id: "skills", href: "#skills", label: "Skills", inNav: true, inFooter: true },
  { id: "builds", href: "#builds", label: "Builds", inNav: true, inFooter: true },
  { id: "contact", href: "#contact", label: "Contact", inNav: true, inFooter: true },
] as const;
