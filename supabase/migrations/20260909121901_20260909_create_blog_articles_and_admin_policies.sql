create table if not exists public.blog_articles (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text not null,
  featured_image_url text,
  category text not null default 'Inspiration',
  author text not null default 'Vaishnavi Marble',
  published_at timestamptz default now(),
  updated_at timestamptz default now(),
  tags text[] default '{}',
  is_published boolean default false,
  created_at timestamptz default now()
);

alter table public.blog_articles enable row level security;

create policy "Public can read published blog articles" on public.blog_articles
  for select to anon using (is_published = true);
create policy "Authenticated users can view all blog articles" on public.blog_articles
  for select to authenticated using (true);
create policy "Authenticated users can create blog articles" on public.blog_articles
  for insert to authenticated with check (true);
create policy "Authenticated users can update blog articles" on public.blog_articles
  for update to authenticated using (true) with check (true);
create policy "Authenticated users can delete blog articles" on public.blog_articles
  for delete to authenticated using (true);

grant select on public.blog_articles to anon, authenticated;
grant insert, update, delete on public.blog_articles to authenticated;