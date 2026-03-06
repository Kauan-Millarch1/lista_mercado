create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  name text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text not null,
  description text,
  image_url text,
  unit text not null,
  average_price numeric(10, 2) not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.shopping_lists (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  title text not null,
  status text not null default 'active' check (status in ('active', 'done')),
  created_at timestamptz not null default now(),
  finalized_at timestamptz
);

create table if not exists public.list_items (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references public.shopping_lists (id) on delete cascade,
  product_id uuid not null references public.products (id) on delete restrict,
  quantity numeric(10, 2) not null default 1,
  note text,
  is_checked boolean not null default false,
  estimated_price numeric(10, 2) not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists idx_products_category on public.products (category);
create index if not exists idx_shopping_lists_user_id on public.shopping_lists (user_id);
create index if not exists idx_shopping_lists_status on public.shopping_lists (status);
create index if not exists idx_list_items_list_id on public.list_items (list_id);
create index if not exists idx_list_items_product_id on public.list_items (product_id);

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.shopping_lists enable row level security;
alter table public.list_items enable row level security;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

drop policy if exists "products_read_authenticated" on public.products;
create policy "products_read_authenticated"
  on public.products for select
  using (auth.role() = 'authenticated');

drop policy if exists "shopping_lists_select_own" on public.shopping_lists;
create policy "shopping_lists_select_own"
  on public.shopping_lists for select
  using (auth.uid() = user_id);

drop policy if exists "shopping_lists_insert_own" on public.shopping_lists;
create policy "shopping_lists_insert_own"
  on public.shopping_lists for insert
  with check (auth.uid() = user_id);

drop policy if exists "shopping_lists_update_own" on public.shopping_lists;
create policy "shopping_lists_update_own"
  on public.shopping_lists for update
  using (auth.uid() = user_id);

drop policy if exists "shopping_lists_delete_own" on public.shopping_lists;
create policy "shopping_lists_delete_own"
  on public.shopping_lists for delete
  using (auth.uid() = user_id);

drop policy if exists "list_items_select_own" on public.list_items;
create policy "list_items_select_own"
  on public.list_items for select
  using (
    exists (
      select 1
      from public.shopping_lists sl
      where sl.id = list_items.list_id
        and sl.user_id = auth.uid()
    )
  );

drop policy if exists "list_items_insert_own" on public.list_items;
create policy "list_items_insert_own"
  on public.list_items for insert
  with check (
    exists (
      select 1
      from public.shopping_lists sl
      where sl.id = list_items.list_id
        and sl.user_id = auth.uid()
    )
  );

drop policy if exists "list_items_update_own" on public.list_items;
create policy "list_items_update_own"
  on public.list_items for update
  using (
    exists (
      select 1
      from public.shopping_lists sl
      where sl.id = list_items.list_id
        and sl.user_id = auth.uid()
    )
  );

drop policy if exists "list_items_delete_own" on public.list_items;
create policy "list_items_delete_own"
  on public.list_items for delete
  using (
    exists (
      select 1
      from public.shopping_lists sl
      where sl.id = list_items.list_id
        and sl.user_id = auth.uid()
    )
  );
