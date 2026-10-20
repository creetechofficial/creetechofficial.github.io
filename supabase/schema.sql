-- ============================================
-- Creetech Supabase Schema
-- Jalankan ini di Supabase SQL Editor
-- ============================================

-- 1. Tabel Projects
create table if not exists public.projects (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  category text check (category in ('web', 'mobile', 'design', 'backend')) not null default 'web',
  tech_stack text[] default '{}',
  client_name text,
  year int,
  cover_url text,
  screenshots text[] default '{}',
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- 2. Enable Row Level Security
alter table public.projects enable row level security;

-- 3. Allow public read (untuk landing page)
create policy "Public read projects"
  on public.projects
  for select
  using (true);

-- 4. Allow insert/delete (dikontrol via PIN di sisi app)
-- Note: Di production, sebaiknya tambahkan auth Supabase
create policy "Anyone can insert projects"
  on public.projects
  for insert
  with check (true);

create policy "Anyone can delete projects"
  on public.projects
  for delete
  using (true);

-- 5. Storage Bucket untuk screenshots
insert into storage.buckets (id, name, public)
  values ('project-screenshots', 'project-screenshots', true)
  on conflict (id) do nothing;

-- 6. Storage RLS Policies
create policy "Public read screenshots"
  on storage.objects
  for select
  using (bucket_id = 'project-screenshots');

create policy "Allow upload screenshots"
  on storage.objects
  for insert
  with check (bucket_id = 'project-screenshots');

-- 7. Sample data (opsional)
insert into public.projects (title, description, category, tech_stack, client_name, year, is_featured)
values
  ('Sawit Management System', 'Sistem manajemen perkebunan sawit untuk memantau produktivitas lahan.', 'web', array['Vue.js', 'Laravel', 'MySQL'], 'Sawit Corp', 2024, true),
  ('Plant Treatment Monitoring', 'Dashboard monitoring perlakuan tanaman dengan laporan otomatis.', 'web', array['Nuxt.js', 'Node.js', 'MongoDB'], 'Plant Corp', 2024, true),
  ('Brand Identity Design', 'Perancangan identitas visual lengkap: logo, warna, dan panduan brand.', 'design', array['Adobe Illustrator', 'Adobe XD'], 'WC Brand', 2023, false);

