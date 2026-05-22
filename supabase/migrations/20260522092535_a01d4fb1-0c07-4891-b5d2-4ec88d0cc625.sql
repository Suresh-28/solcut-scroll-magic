
-- Fix function search_path
create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Admin check: matches the seeded admin email
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(
    (auth.jwt() ->> 'email') = 'admin@solcut.app',
    false
  );
$$;

-- Replace permissive policies with admin-only checks
drop policy if exists "site_content auth insert" on public.site_content;
drop policy if exists "site_content auth update" on public.site_content;
drop policy if exists "contact_submissions auth read" on public.contact_submissions;

create policy "site_content admin insert"
  on public.site_content for insert
  to authenticated
  with check (public.is_admin());

create policy "site_content admin update"
  on public.site_content for update
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

create policy "site_content admin delete"
  on public.site_content for delete
  to authenticated
  using (public.is_admin());

create policy "contact_submissions admin read"
  on public.contact_submissions for select
  to authenticated
  using (public.is_admin());
