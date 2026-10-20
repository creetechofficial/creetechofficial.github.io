-- ============================================
-- Creetech Supabase Migration 002
-- Tambah: project_url + multi-category (categories[])
-- Cara pakai: paste seluruh file ini di Supabase
-- SQL Editor lalu Run. Aman dijalankan ulang.
-- Prasyarat: schema.sql (tabel public.projects) sudah ada.
-- ============================================

-- 1. Link live project (opsional, boleh kosong)
alter table public.projects
  add column if not exists project_url text;

-- 2. Multi kategori sebagai array
alter table public.projects
  add column if not exists categories text[] default '{}';

-- 3. Backfill dari kolom lama `category` (satu nilai -> array satu elemen)
--    Kolom lama TIDAK dihapus agar site versi lama tetap jalan.
update public.projects
  set categories = array[category]
  where category is not null
    and (categories is null or categories = '{}');

-- 4. Batasi nilai kategori yang valid (web | mobile | design | backend)
do $$
begin
  if not exists (
    select 1 from pg_constraint where conname = 'projects_categories_check'
  ) then
    alter table public.projects
      add constraint projects_categories_check
      check (categories <@ array['web', 'mobile', 'design', 'backend']);
  end if;
end $$;
