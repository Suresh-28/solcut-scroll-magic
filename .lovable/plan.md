# Plan: Level Up Solcut Into a Conversion-Focused Studio Site

Goal: turn the current one-pager into a credible, inquiry-generating site. Each major section becomes its own SSR/SEO-friendly route, and we add the trust + clarity pieces a buyer needs before they email you.

## New routes (file-based, each with own `head()` meta)

```
src/routes/
  index.tsx           (already) — tightened hero + previews of work/testimonials
  work.tsx            NEW — case study index grid
  work.$slug.tsx      NEW — individual case study (problem → approach → result + metrics)
  about.tsx           NEW — story, principles, who's behind Solcut
  pricing.tsx         NEW — 3 packages + FAQ
  contact.tsx         NEW — promoted from section to full page with form
```

Nav (Work · About · Pricing · Contact) updated in `Nav` component, replacing hash links with `<Link to="...">`.

## 1. Case studies (`/work` + `/work/$slug`)

- Index: grid of 3–4 projects with cover image, client, industry, year, one-line outcome.
- Detail page structure: Hero (client, role, year) → Challenge → Approach → Solution (screens) → Results (3 metric tiles e.g. "+42% inquiries", "1.2s LCP", "2 weeks") → Testimonial quote → Next project link.
- Content stored as typed array in `src/content/case-studies.ts` so you can edit copy without touching components.
- Sphere stays as an ambient element on index/about; case study pages get a calmer hero (image-led).

## 2. Testimonials

- Dedicated `<Testimonials />` component reused on home + about + pricing.
- 3–5 quotes with name, role, company, optional avatar.
- Logo strip ("Trusted by") above or below — grayscale, hover to color.

## 3. About (`/about`)

- Intro paragraph (philosophy, why Solcut exists).
- "Principles" — 3–4 short cards (e.g. Ship in 2 weeks, Performance is design, No template tells).
- Founder/team block with photo, bio, social links.
- Process recap with a link to `/work`.

## 4. Pricing (`/pricing`)

- 3 tiers: **Landing** · **Brand site** · **Custom build** — each with price (or "from $X"), timeline, what's included, ideal-for line, CTA "Book a call".
- Comparison-friendly card layout, middle tier highlighted.
- FAQ accordion (6 questions: payment, revisions, ownership, CMS handover, ongoing support, refund).

## 5. Lead-capture upgrades

- Replace `mailto:` on Contact with a real form (name, email, company, budget select, project brief textarea, timeline).
- Submit via a `createServerFn` that stores the lead in Lovable Cloud (`leads` table) and sends an email notification using Lovable Email.
- Keep email link as fallback. Show inline success state.
- Add a sticky bottom-right "Book a call" pill on scroll past hero.

## 6. SEO + sharing baseline

- Per-route `head()` with unique title, description, og:title, og:description.
- Add `og:image` per case study using its cover image.
- Add `sitemap.xml` + `robots.txt` route handlers.
- JSON-LD `Organization` on home, `Service` on pricing, `CreativeWork` on case studies.

## 7. Small polish

- 404 page (`__root.tsx` notFoundComponent) styled to match brand.
- Loading/skeleton states for the form.
- `prefers-reduced-motion` guard on sphere animations.
- Footer: add Work / About / Pricing / Contact link columns.

## Technical notes

- Stack stays TanStack Start + Motion + Tailwind tokens from `src/styles.css`.
- Lead form needs **Lovable Cloud** enabled (table `leads` with RLS insert-only by anon, plus a `requireSupabaseAuth`-protected admin read fn). I'll prompt for activation when we get there.
- Lovable Email used for the inquiry notification to `connect.shyamala@gmail.com`.
- Content arrays kept in `src/content/*.ts` so future edits don't require component changes.

## Suggested build order

1. Extract shared components (`Nav`, `Footer`, `Sphere`) into `src/components/`.
2. Create `/about` and `/pricing` (static, no backend).
3. Create `/work` index + `/work/$slug` with sample case study.
4. Add Testimonials + logo strip on home & about.
5. Enable Lovable Cloud → build `/contact` form + lead storage + email.
6. SEO: per-route meta, sitemap, robots, JSON-LD.
7. Polish: 404, sticky CTA, reduced-motion.

Want me to start with steps 1–4 (pure frontend, no backend yet), or go end-to-end including the Cloud-powered contact form?
