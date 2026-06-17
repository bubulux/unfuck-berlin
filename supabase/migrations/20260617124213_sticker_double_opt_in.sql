-- Double opt-in schema for sticker_requests
-- Adds confirmation flag, token, and timestamps.
-- Drops the unused bestell_id column.
-- Adds case-insensitive uniqueness on email.

alter table public.sticker_requests
  add column if not exists email_confirmed boolean not null default false,
  add column if not exists confirmation_token uuid unique,
  add column if not exists confirmation_sent_at timestamptz,
  add column if not exists confirmed_at timestamptz;

alter table public.sticker_requests drop column if exists bestell_id;

create unique index if not exists sticker_requests_email_lower_idx
  on public.sticker_requests (lower(email));

alter table public.sticker_requests enable row level security;
