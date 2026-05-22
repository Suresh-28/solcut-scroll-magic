# Move backend to Lovable Cloud (works with Vercel too)

## Short answer to your question

Yes. Lovable Cloud is your **backend** (Postgres database, auth, file storage, email). Where the **frontend** is hosted doesn't matter:

- Publish via Lovable → frontend on `*.lovable.app`, backend on Lovable Cloud
- Push to GitHub → deploy to Vercel → frontend on Vercel, backend still on Lovable Cloud

In both cases the same database holds your work items, testimonials, pricing, about content, and contact form submissions. Edits made in the admin panel persist for every visitor on every device — the localStorage reversion problem goes away.

For the Vercel path you only need to copy two public env vars into the Vercel project (`VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`). Lovable will set these locally automatically.

## What this plan does

1. Enable Lovable Cloud.
2. Move the four content stores (work, testimonials, pricing, about) from `localStorage` to a real database.
3. Replace the hardcoded `admin / solcut` login with proper server-side auth (still using those credentials — we seed an admin user).
4. Make the contact form actually email the brief to `connect.shyamala@gmail.com` (no more `mailto:` popup).
5. Document the Vercel deployment steps so you can flip to Vercel anytime.

## Database tables

- `site_content` — single-row-per-section JSON store (`work`, `testimonials`, `pricing`, `about`, `logos`). Simple, mirrors the current shape, fast to migrate.
- RLS: public can `SELECT`, only authenticated admins can `UPDATE`.
- `contact_submissions` — log every brief sent (name, email, company, budget, timeline, brief, created_at).

## Admin auth

- One real user seeded: `admin@solcut.local` / `solcut` (login form still shows "username: admin" — we map it to the email under the hood).
- `/admin/*` routes guarded server-side via `_authenticated` layout; unauthorized requests redirect to `/admin/login`.
- Logout clears the session.

## Contact form

- Server function validates the brief with Zod, inserts into `contact_submissions`, then sends an email to `connect.shyamala@gmail.com` via Lovable Email (Resend under the hood, no API key for you to manage).
- Replies to the email go straight to the visitor's address.

## Deploying to Vercel later

After Cloud is enabled and code is on GitHub:

1. Vercel → New Project → import the GitHub repo
2. Framework preset: TanStack Start (or Vite)
3. Add env vars: `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY` (values shown in Lovable Cloud → Settings)
4. Deploy

Lovable Cloud keeps serving the backend. Edits made in either Lovable's preview admin or the Vercel-deployed admin write to the same database.

## Technical details

- New files:
  - `src/lib/content.functions.ts` — `getSiteContent`, `updateSiteContent` server fns
  - `src/lib/contact.functions.ts` — `submitContactBrief` (insert + send email)
  - Supabase migrations for `site_content`, `contact_submissions`, RLS, and seed admin user
- Refactor:
  - `src/lib/contentStore.ts` becomes thin React Query wrappers around `getSiteContent`
  - `src/lib/adminAuth.ts` becomes a wrapper around `supabase.auth.signInWithPassword`
  - All `/admin/*` editors call `updateSiteContent` instead of writing to localStorage
  - `src/routes/contact.tsx` calls `submitContactBrief` instead of `window.location.href = mailto:`
- Existing default content in `src/content/*` is used to seed the first row of `site_content` so nothing visually changes on first load.
