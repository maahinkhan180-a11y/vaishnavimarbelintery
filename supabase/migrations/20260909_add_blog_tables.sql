-- Create blog_articles table
create table if not exists public.blog_articles (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text not null,
  featured_image_url text,
  category text not null,
  author text not null default 'Vaishnavi Marble',
  published_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  tags text[] default '{}',
  is_published boolean default false,
  created_at timestamp with time zone default now()
);

-- Create indexes
create index idx_blog_articles_slug on public.blog_articles(slug);
create index idx_blog_articles_category on public.blog_articles(category);
create index idx_blog_articles_published on public.blog_articles(is_published, published_at desc);
create index idx_blog_articles_tags on public.blog_articles using gin(tags);

-- Enable RLS
alter table public.blog_articles enable row level security;

-- Create policy for public read
create policy "Blog articles are publicly readable"
  on public.blog_articles
  for select
  using (is_published = true);

-- Grant permissions
grant select on public.blog_articles to anon, authenticated;
