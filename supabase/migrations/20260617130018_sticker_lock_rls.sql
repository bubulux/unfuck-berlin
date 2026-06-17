-- Lock down sticker_requests so the anon key cannot bypass the edge function.
-- All writes/reads now flow through sticker-submit / sticker-confirm,
-- which use the service_role key (bypasses RLS).

do $$
declare
  pol record;
begin
  for pol in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'sticker_requests'
  loop
    execute format('drop policy %I on public.sticker_requests', pol.policyname);
  end loop;
end $$;
