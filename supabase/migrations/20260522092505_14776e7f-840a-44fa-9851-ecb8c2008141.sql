
-- Editable site content (single row per section key, JSON payload)
create table public.site_content (
  key text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid
);

alter table public.site_content enable row level security;

-- Public can read content
create policy "site_content public read"
  on public.site_content for select
  using (true);

-- Any authenticated user (admin) can write
create policy "site_content auth insert"
  on public.site_content for insert
  to authenticated
  with check (true);

create policy "site_content auth update"
  on public.site_content for update
  to authenticated
  using (true)
  with check (true);

-- Contact form submissions
create table public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  budget text not null,
  timeline text not null,
  brief text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

-- Anyone (anonymous) can submit a brief
create policy "contact_submissions public insert"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (true);

-- Only signed-in admins can read submissions
create policy "contact_submissions auth read"
  on public.contact_submissions for select
  to authenticated
  using (true);

-- Auto-update updated_at
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger site_content_set_updated_at
  before update on public.site_content
  for each row execute function public.set_updated_at();
