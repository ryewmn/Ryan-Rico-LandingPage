# Landing page backlog

The loop works top to bottom. Security outranks features. Pick the highest unchecked item, implement it, check it off, and add new findings from SCAN.md under the right priority.

Done means: the change is implemented, and `npm run build`, `npm test`, and `npm run lint` all pass.

> Note: there is no `npm test` script yet; build + lint are the current gates. Add a test script when the first test lands.

## P0 security (do first)

- [x] Add security response headers: Content-Security-Policy, Strict-Transport-Security (with preload), X-Content-Type-Options nosniff, X-Frame-Options DENY, Referrer-Policy strict-origin-when-cross-origin, Permissions-Policy. Set them at the Railway/server layer or in a meta-equivalent config. Done: headers present on the live response. — wired in `next.config.ts` `headers()` for `/:path*`.
- [ ] Confirm no secrets ship in the client bundle. Move any API key, token, or webhook URL to server-side env. Done: gitleaks reports zero findings and grep of dist/ finds no keys.
- [ ] Resolve every high and critical npm audit finding. Patch, upgrade, or replace. Done: npm audit shows zero high or critical.
- [ ] Add rel="noopener noreferrer" to every external link using target=_blank. Done: no external _blank link lacks it.
- [ ] Validate and sanitize all form input on the server. Reject malformed payloads. Escape any value echoed back. Done: invalid input returns a 4xx and never renders raw.
- [ ] Rate-limit the form submission endpoint. Cap per IP per minute. Done: rapid repeat submits get throttled.

## P1 security and hardening

- [ ] Add a honeypot field plus server-side timing check to block spam bots on forms. Done: bot-pattern submits are dropped.
- [ ] Add Subresource Integrity hashes to any third-party script or stylesheet loaded by URL. Done: each external script tag has integrity and crossorigin set.
- [ ] Remove unused dependencies and dead code. Done: depcheck reports no unused packages.
- [ ] Ensure production source maps are not publicly served. Done: dist/ contains no .map files, or they are excluded from deploy.
- [ ] Pin and update vulnerable transitive dependencies flagged by semgrep or audit. Done: no flagged transitive versions remain.
- [ ] Force HTTPS. Redirect any http request to https. Done: http request returns a 301 to https.
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
