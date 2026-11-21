-- Catalog content managed from /admin. Public can read; only listed admins can write.

create table public.admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

create table public.categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  code text not null default '',
  name text not null,
  tone text not null default 'teal' check (tone in ('teal', 'navy', 'lavender', 'yellow')),
  items text not null default '',
  image text not null,
  image_alt text not null default '',
  sort integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references public.categories (id) on delete cascade,
  name text not null,
  image text not null,
  image_alt text not null default '',
  sort integer not null default 0,
  created_at timestamptz not null default now()
);
create index products_category_id_idx on public.products (category_id);

create table public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  text text not null default '',
  image text not null,
  image_alt text not null default '',
  big boolean not null default false,
  sort integer not null default 0,
  created_at timestamptz not null default now()
);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.admins where user_id = (select auth.uid()));
$$;
revoke execute on function public.is_admin() from public, anon;
grant execute on function public.is_admin() to authenticated;

alter table public.admins enable row level security;
alter table public.categories enable row level security;
alter table public.products enable row level security;
alter table public.gallery_items enable row level security;

create policy "admins read own row" on public.admins
  for select to authenticated using (user_id = (select auth.uid()));

create policy "public read" on public.categories for select to anon, authenticated using (true);
create policy "admin insert" on public.categories for insert to authenticated with check ((select public.is_admin()));
create policy "admin update" on public.categories for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "admin delete" on public.categories for delete to authenticated using ((select public.is_admin()));

create policy "public read" on public.products for select to anon, authenticated using (true);
create policy "admin insert" on public.products for insert to authenticated with check ((select public.is_admin()));
create policy "admin update" on public.products for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "admin delete" on public.products for delete to authenticated using ((select public.is_admin()));

create policy "public read" on public.gallery_items for select to anon, authenticated using (true);
create policy "admin insert" on public.gallery_items for insert to authenticated with check ((select public.is_admin()));
create policy "admin update" on public.gallery_items for update to authenticated using ((select public.is_admin())) with check ((select public.is_admin()));
create policy "admin delete" on public.gallery_items for delete to authenticated using ((select public.is_admin()));

-- Product detail pages: /produk-layanan/{category.slug}/{product.slug}
alter table public.products
  add column slug text not null check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  add column code text not null default '',
  add column description text not null default '';
alter table public.products add constraint products_category_slug_key unique (category_id, slug);
