-- Ejecutar una vez en el SQL Editor de tu proyecto Supabase.
create table if not exists public.portal_sessions (
  token_hash text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  expires_at timestamptz not null
);
create index if not exists portal_sessions_expiry on public.portal_sessions(expires_at);
alter table public.portal_sessions enable row level security;
revoke all on public.portal_sessions from anon, authenticated;
grant all on public.portal_sessions to service_role;

create table if not exists public.portal_login_limits (
  identifier text primary key,
  attempts integer not null,
  expires_at timestamptz not null
);
alter table public.portal_login_limits enable row level security;
revoke all on public.portal_login_limits from anon, authenticated;
grant all on public.portal_login_limits to service_role;

create or replace function public.portal_allow_login(identifier_input text)
returns boolean language plpgsql security definer set search_path = '' as $$
declare attempts_now integer;
begin
  delete from public.portal_login_limits where expires_at < now();
  insert into public.portal_login_limits(identifier,attempts,expires_at)
    values (identifier_input,1,now()+interval '15 minutes')
  on conflict(identifier) do update set attempts=public.portal_login_limits.attempts+1
  returning attempts into attempts_now;
  return attempts_now <= 10;
end;
$$;
revoke all on function public.portal_allow_login(text) from public, anon, authenticated;
grant execute on function public.portal_allow_login(text) to service_role;
