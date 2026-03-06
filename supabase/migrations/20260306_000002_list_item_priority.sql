alter table public.list_items
add column if not exists priority text not null default 'medium'
check (priority in ('high', 'medium', 'low'));

create index if not exists idx_list_items_priority on public.list_items (priority);
