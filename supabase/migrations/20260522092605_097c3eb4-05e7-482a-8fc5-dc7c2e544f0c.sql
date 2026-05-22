
-- Lock down is_admin: revoke public/anon, keep authenticated
revoke execute on function public.is_admin() from public;
revoke execute on function public.is_admin() from anon;
grant execute on function public.is_admin() to authenticated;

-- Tighten public insert with basic field validation (not blanket true)
drop policy if exists "contact_submissions public insert" on public.contact_submissions;
create policy "contact_submissions public insert"
  on public.contact_submissions for insert
  to anon, authenticated
  with check (
    length(name) between 1 and 100
    and length(email) between 3 and 255
    and email like '%_@_%.__%'
    and length(budget) between 1 and 50
    and length(timeline) between 1 and 50
    and length(brief) between 10 and 5000
    and (company is null or length(company) <= 100)
  );
