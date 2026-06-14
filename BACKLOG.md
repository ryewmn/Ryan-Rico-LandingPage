# Landing page backlog

The loop works top to bottom. Security outranks features. Pick the highest unchecked item, implement it, check it off, and add new findings from SCAN.md under the right priority.

Done means: the change is implemented, and `npm run build`, `npm test`, and `npm run lint` all pass.

> Note: there is no `npm test` script yet; build + lint are the current gates. Add a test script when the first test lands.

## P0 security (do first)

- [x] Add security response headers: Content-Security-Policy, Strict-Transport-Security (with preload), X-Content-Type-Options nosniff, X-Frame-Options DENY, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy. Set them at the Railway/server layer or in a meta-equivalent config. Done: headers present on the live response. — wired in `next.config.ts` `headers()` for `/:path*`.
- [x] Confirm no secrets ship in the client bundle. Move any API key, token, or webhook URL to server-side env. Done: gitleaks reports zero findings and grep of dist/ finds no keys. — codebase has no `process.env.*` references at all, no `NEXT_PUBLIC_*` vars, no `.env*` files committed (and `.gitignore` covers them). Built `.next/static/` scanned for AWS/GitHub/OpenAI/Slack/PEM patterns and generic `api_key|secret|token|password|webhook = "..."` strings — zero hits. `gitleaks` is not installed in this environment so a multi-pattern grep was used as the proxy; install gitleaks in CI to make this a permanent gate.
- [x] Resolve every high and critical npm audit finding. Patch, upgrade, or replace. Done: npm audit shows zero high or critical. — `next` bumped 15.5.15 → 15.5.19 (patch), `brace-expansion` patched via `npm audit fix`. Two **moderate** items remain: PostCSS XSS via unescaped `</style>` and the transitive next→postcss range; both are blocked on Next.js shipping an updated vendored postcss (`npm audit fix --force` would downgrade next to 9.3.3). Risk is effectively nil for this static site since postcss only processes our own Tailwind CSS at build time, never user input. Tracked under P1 below.
- [x] Add rel="noopener noreferrer" to every external link using target=_blank. Done: no external _blank link lacks it. — Audited every `target="_blank"` (10 hits across contact, footer, arrow-pill, projects, current-work, hero, builds, lazy-instagram); each is paired with a matching `rel="noopener noreferrer"` (or conditional `rel={ext ? "noopener noreferrer" : undefined}`).
- [x] Validate and sanitize all form input on the server. Reject malformed payloads. Escape any value echoed back. Done: invalid input returns a 4xx and never renders raw. — **N/A under current architecture**: the contact form has no server endpoint; `components/contact.tsx` builds a `mailto:` URL on submit and never POSTs anywhere (no `/api/contact` route exists). Re-open this item if/when the form moves to a server-submitted handler.
- [x] Rate-limit the form submission endpoint. Cap per IP per minute. Done: rapid repeat submits get throttled. — **N/A under current architecture**: no submission endpoint exists (see item above). Re-open with the same trigger.

## P1 security and hardening

- [x] Add a honeypot field plus server-side timing check to block spam bots on forms. Done: bot-pattern submits are dropped. — **N/A under current architecture**: contact form is mailto-based with no server endpoint; spam protection would happen in the user's mail client, not on the site. Re-open if the form moves server-side.
- [x] Add Subresource Integrity hashes to any third-party script or stylesheet loaded by URL. Done: each external script tag has integrity and crossorigin set. — Vacuously satisfied: the served HTML has zero external `<script src>` or `<link rel="stylesheet" href>` tags. Google Fonts (Instrument Serif) loads via `next/font/google`, which inlines the font CSS at build time. Self-hosted Geist via the `geist` package. Re-open if a third-party CDN script is ever added.
- [x] Remove unused dependencies and dead code. Done: depcheck reports no unused packages. — `npx depcheck` reports 7 "unused" devDependencies but all are config-file consumers (`postcss`, `autoprefixer` → `postcss.config.mjs`; `typescript`, `@types/node`, `@types/react-dom` → TS compiler; `eslint`, `eslint-config-next` → `next lint` script). depcheck doesn't follow config files. Production deps are clean.
- [x] Ensure production source maps are not publicly served. Done: dist/ contains no .map files, or they are excluded from deploy. — `productionBrowserSourceMaps` is not set (defaults to `false`); verified `find .next/static -name '*.map'` returns nothing after a production build.
- [ ] Pin and update vulnerable transitive dependencies flagged by semgrep or audit. Done: no flagged transitive versions remain. — Currently blocked: Next.js 15.5.19 vendors `postcss < 8.5.10` inside `node_modules/next/node_modules/postcss`. The XSS advisory (GHSA-qx2v-qp2m-jg93) only fires when postcss stringifies untrusted CSS, which this site never does. Revisit when Next.js publishes a release with an updated vendored postcss.
- [x] Force HTTPS. Redirect any http request to https. Done: http request returns a 301 to https. — `middleware.ts` checks `x-forwarded-proto` in production and emits a 301 to the same path under `https://`. Verified: `curl -I -H "x-forwarded-proto: http" -H "host: ryanrico.com" /` returns `301` with `Location: https://ryanrico.com/`. Belt-and-suspenders alongside HSTS (preload, includeSubDomains).
- [ ] Replace `'unsafe-inline'` in CSP `script-src` with a nonce-based policy so the theme bootstrap script no longer needs it. Done: production CSP has no `'unsafe-inline'` for scripts.

## P2 performance and SEO

- [ ] Hit Lighthouse targets: performance 90+, accessibility 95+, SEO 95+, best practices 95+. Done: a local Lighthouse run meets all four.
- [ ] Convert below-fold images to webp or avif and lazy-load them. Done: large images use modern formats and loading=lazy.
- [ ] Add page meta: title, description, Open Graph tags, Twitter card. Done: tags present and render correctly in a link preview.
- [ ] Add JSON-LD structured data for Organization or Product. Done: valid schema passes the Rich Results test format.
- [ ] Add robots.txt and sitemap.xml. Done: both serve at the root and list real URLs.
- [ ] Preconnect to font and third-party origins, or self-host fonts. Done: no render-blocking font fetch from an uncached origin.
- [ ] Set long cache headers on hashed static assets. Done: JS, CSS, and image assets return a far-future cache header.

## P2 accessibility

- [ ] Add descriptive alt text to every image. Decorative images get alt="". Done: no image missing an alt attribute.
- [ ] Pair every form input with a label. Done: each input has an associated label or aria-label.
- [ ] Ensure visible focus states and full keyboard navigation. Done: every interactive element is reachable and focus is visible.
- [ ] Meet WCAG AA color contrast on text and buttons. Done: no text fails AA contrast.
- [ ] Add a skip-to-content link. Done: link appears on first tab and jumps to main.

## P3 polish

- [ ] Add a custom 404 page. Done: unknown routes render it with a path home.
- [ ] Add loading and error states to the contact or signup form. Done: submit shows progress, failure shows a clear message.
- [ ] Add a cookie or analytics consent banner if you serve EU traffic. Done: tracking only fires after consent.
- [ ] Add a favicon set and web app manifest. Done: favicon shows in tabs and the manifest validates.

## Scan findings (loop appends here)

Add new items from SCAN.md below, tagged with the matching priority above.
