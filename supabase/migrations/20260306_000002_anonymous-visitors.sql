create table if not exists public.visitors (
  id uuid primary key default gen_random_uuid(),
  display_name text not null,
  first_ip text,
  last_ip text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.shopping_lists add column if not exists visitor_id uuid;

update public.shopping_lists
set visitor_id = gen_random_uuid()
where visitor_id is null;

alter table public.shopping_lists alter column visitor_id set not null;

alter table public.shopping_lists drop constraint if exists shopping_lists_user_id_fkey;
alter table public.shopping_lists drop column if exists user_id;

alter table public.shopping_lists
  add constraint shopping_lists_visitor_id_fkey
  foreign key (visitor_id)
  references public.visitors(id)
  on delete cascade;

create index if not exists idx_shopping_lists_visitor_id on public.shopping_lists(visitor_id);

alter table public.visitors disable row level security;
alter table public.shopping_lists disable row level security;
alter table public.list_items disable row level security;
alter table public.products disable row level security;
