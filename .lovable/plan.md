# Migrate admin CRUD + contact form to Lovable Cloud

Cloud is enabled and the database is set up:
- `site_content` — JSON store for editable sections (work, testimonials, logos, pricing, about). Public can read; only admin can write.
- `contact_submissions` — every brief from the contact form is recorded here. Anyone can submit; only admin can read.
- `is_admin()` helper checks the signed-in user is the dedicated admin account.

## Code changes

1. **Wire auth attacher** — `src/start.ts` registers `attachSupabaseAuth` so server functions receive the admin's session token.

2. **Replace admin login** — `src/lib/adminAuth.ts` now signs in via Lovable Cloud auth instead of localStorage. The username stays `admin`, password stays `solcut`. A one-time server function (`ensureAdmin`) creates the admin account on first login attempt — you don't have to do anything manually.

3. **Move content store to Cloud** — `src/lib/contentStore.ts` is rewritten on top of React Query + Supabase. Same `useWork() / useTestimonials() / usePricing() / useAbout()` API the existing pages already use, so admin editors and public pages keep working without changes. Edits write to the `site_content` table; every visitor sees the same content on every device.

4. **Contact form to Cloud** — `src/routes/contact.tsx` inserts the brief into `contact_submissions` instead of opening a mail client. Toast confirms submission. (Email delivery to `connect.shyamala@gmail.com` can be added in a follow-up when you set up an email domain — for now briefs are stored and readable from the admin once we add a Briefs page.)

5. **Admin login UI** — `src/routes/admin.login.tsx` becomes async (awaits the network call), shows loading state, surfaces server errors.

## Files touched

- edit `src/start.ts`
- new `src/lib/admin.functions.ts`
- rewrite `src/lib/adminAuth.ts`
- rewrite `src/lib/contentStore.ts`
- edit `src/routes/admin.login.tsx`
- edit `src/routes/contact.tsx`
- minor: `src/components/AdminLayout.tsx` (logout becomes async)

## After this lands

- Open `/admin/login`, sign in with `admin / solcut`.
- Edit any section, save — refresh in any browser, on any device, in incognito: edits persist.
- Submit the contact form — the brief is stored in Cloud (visible in Cloud → Database → contact_submissions).

## Notes

- One security warning remains (signed-in users can call `is_admin()`) — this is required for RLS to work and is safe; the function only reads the caller's own JWT.
- An admin "Briefs" page and real email delivery to your inbox can be added next; let me know after this works.
