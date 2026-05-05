# Ryan Rico Landing Page

A premium personal landing page for Ryan Rico. Built with Next.js, TypeScript, Tailwind CSS, shadcn/ui, and Framer Motion.

## Stack

- Next.js 15 with the App Router
- TypeScript
- Tailwind CSS
- shadcn/ui primitives (Button, Card, Badge, Input, Textarea, Label)
- Framer Motion for entrance animations
- lucide-react for icons
- Geist font family

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Structure

```
app/
  layout.tsx        Root layout with fonts and SEO metadata
  page.tsx          Page composition
  globals.css       Theme tokens and base styles
components/
  navbar.tsx        Sticky navbar with mobile menu
  hero.tsx          Dark hero with headline, copy, badges
  about.tsx         About Ryan + key stats
  current-work.tsx  Six work-area cards
  projects.tsx      Featured projects with status badges
  skills.tsx        Automotive and software skill groups
  contact.tsx       Contact info card and message form
  footer.tsx        Footer with nav and contact
  ui/               shadcn/ui components
lib/
  utils.ts          cn() helper for class merging
```

## Customizing

- Update contact info in `components/contact.tsx` and `components/footer.tsx`.
- Wire up the contact form in `handleSubmit` to your endpoint of choice.
- Adjust the Toyota red shade in `tailwind.config.ts` under `colors.toyota`.
- Replace project, skill, and current-work copy directly in their components.
