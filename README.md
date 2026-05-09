# Ryan Rico — personal landing page

Personal site for **Ryan Rico** — BDC Sales at Round Rock Toyota, building software (and Gunpla) on the side. Live at [ryanrico.com](https://ryanrico.com).

## Stack

- **Next.js 15** (App Router, Server + Client Components)
- **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 3** with custom Toyota-red and ember palettes
- **Framer Motion** for entrance + scroll animations
- **lucide-react** for icons
- **Geist Sans / Mono** + **Instrument Serif** for editorial italic accents

## Getting started

```bash
npm install --legacy-peer-deps
npm run dev
```

Open `http://localhost:3000`.

The `--legacy-peer-deps` flag is needed because Next 15 + React 19 have a peer-dep conflict; a project-level `.npmrc` already sets this for Vercel and CI.

```bash
npm run build   # production build (verify before pushing)
npm run start   # serve the production build
npm run lint    # ESLint via eslint-config-next
```

## Structure

```
app/
  layout.tsx              Root: fonts, metadata, JSON-LD, skip-link, scroll progress
  page.tsx                Page composition; Builds is code-split via next/dynamic
  globals.css             Tailwind layers + dot-pattern / fire-gradient utilities
  not-found.tsx           Custom 404 ("Wrong turn.") in matching design
  icon.tsx                Generated favicon (32×32, "RR" on Toyota red)
  apple-icon.tsx          iOS home-screen icon (180×180, red→ember gradient)
  opengraph-image.tsx     1200×630 social share card
  sitemap.ts              /sitemap.xml
  robots.ts               /robots.txt
components/
  navbar.tsx              Fixed navbar w/ active-section indicator (sliding red dot)
  hero.tsx                Bento grid: 12-col layout, name/now/stats/featured/builds/CTA
  about.tsx               Bio + 3 animated count-up stats + quote callout
  current-work.tsx        3 area cards: Dashboards, AI Automation, Building Gundams
  projects.tsx            4 project cards w/ status badges + GitHub links
  skills.tsx              Automotive + Software skill groups
  builds.tsx              Instagram carousel — scroll-snap, lazy-loaded iframes
  contact.tsx             Contact info card + form (mailto), animated success state
  footer.tsx              Socials + nav + contact
  count-up.tsx            useInView + framer animate (respects reduced-motion)
  scroll-progress.tsx     Top gradient scroll indicator
  magnetic.tsx            Cursor-following pull on primary CTAs
  lazy-instagram.tsx      Poster + IntersectionObserver-loaded IG iframe
  use-active-section.ts   IntersectionObserver hook for navbar dot
  ui/                     button, badge, input, label, textarea
lib/
  site-config.ts          Single source of truth: name, role, email, phone, socials, nav
  utils.ts                cn() helper (clsx + tailwind-merge)
```

## Customizing

**All identity, contact, social, and nav links** live in `lib/site-config.ts`. Edit there once and it propagates to navbar, footer, sitemap, contact card, hero, OG image, and JSON-LD structured data.

```ts
// lib/site-config.ts
export const SITE = {
  name: "Ryan Rico",
  role: "BDC Sales",
  employer: "Round Rock Toyota",
  email: "ryanchristopher.rico@gmail.com",
  phone: "(717) 781-4318",
  // ...
};
```

**Section content** lives in the section component files:

- **Projects** — `components/projects.tsx` `projects` array (title, description, status, tags, icon, url, isPrivate)
- **Current work** — `components/current-work.tsx` `areas` array
- **Skills** — `components/skills.tsx` `groups` array (Automotive + Software)
- **Stats** — `components/about.tsx` `stats` array (drives count-up animation)
- **Instagram builds** — `components/builds.tsx` `POSTS` array; each entry is the shortcode (the bit after `instagram.com/p/`)

**Theme**:
- Toyota red, ember orange, palette tokens — `tailwind.config.ts`
- Dot pattern, fire-gradient text, focus-ring rules, reduced-motion media query — `app/globals.css`
- Dark / light theme tokens (currently light) — `app/globals.css` `:root`

**Contact form**: currently submits via `mailto:` (no backend). To wire it up to a real endpoint (Resend, Formspree, your own API), edit `handleSubmit` in `components/contact.tsx`.

## Deployment

The site is built as a fully static site. Any static host works; Vercel is the default.

1. Push `main` to GitHub
2. Connect the repo to Vercel
3. Verify `metadataBase` in `app/layout.tsx` points at the production URL (`SITE.url`)
4. After first deploy: submit the sitemap to Google Search Console + Bing Webmaster

The repo includes `.npmrc` with `legacy-peer-deps=true` so installs work in any environment without flags.

## Performance + a11y

The site is built static, lazy-loads Instagram iframes via IntersectionObserver, ships ~168 KB First Load JS, and respects `prefers-reduced-motion`.

- ✅ WCAG AA color contrast site-wide
- ✅ `:focus-visible` rings on every focusable
- ✅ Skip-to-content link
- ✅ Semantic HTML, ARIA labels on icon-only buttons, `aria-current` on nav
- ✅ Reduced-motion support disables entry/hover/scroll animations
- ✅ JSON-LD `Person` schema for search engines
- ✅ Open Graph + Twitter cards

## License

This is a personal project. Use the layout patterns and code freely; just don't copy the personal content (name, bio, photos, IG handle, contact info).
