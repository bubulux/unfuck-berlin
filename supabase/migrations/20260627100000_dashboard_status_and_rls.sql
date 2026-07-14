-- Internal reporter dashboard support.
--
-- 1. Adds a `status` column to both submission tables so the reporter can
--    track what has been handled ('open' on creation, 'done' once processed).
-- 2. Grants the authenticated reporter SELECT on both tables and UPDATE on the
--    `status` column ONLY (column-level grant limits the write surface).
-- 3. Adds RLS policies so an authenticated session can read all rows and update
--    the status. anon stays unable to read either table; the public nervkrams
--    insert and the service_role edge-function flows are untouched.

-- 1. status columns -----------------------------------------------------------

alter table public.sticker_requests
  add column if not exists status text not null default 'open';

alter table public.nervkrams_reports
  add column if not exists status text not null default 'open';

do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'sticker_requests_status_check'
  ) then
    alter table public.sticker_requests
      add constraint sticker_requests_status_check check (status in ('open', 'done'));
  end if;
  if not exists (
    select 1 from pg_constraint where conname = 'nervkrams_reports_status_check'
  ) then
    alter table public.nervkrams_reports
      add constraint nervkrams_reports_status_check check (status in ('open', 'done'));
  end if;
end $$;

-- 2. grants for the authenticated reporter ------------------------------------

grant select, update(status) on public.sticker_requests to authenticated;
grant select, update(status) on public.nervkrams_reports to authenticated;

-- 3. RLS policies -------------------------------------------------------------

drop policy if exists "reporter read" on public.sticker_requests;
drop policy if exists "reporter update status" on public.sticker_requests;
create policy "reporter read"
  on public.sticker_requests for select to authenticated using (true);
create policy "reporter update status"
  on public.sticker_requests for update to authenticated using (true) with check (true);

drop policy if exists "reporter read" on public.nervkrams_reports;
drop policy if exists "reporter update status" on public.nervkrams_reports;
create policy "reporter read"
  on public.nervkrams_reports for select to authenticated using (true);
create policy "reporter update status"
  on public.nervkrams_reports for update to authenticated using (true) with check (true);
