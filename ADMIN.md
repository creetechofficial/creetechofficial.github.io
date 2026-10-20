# 🔐 Panduan Admin — Creetech Landing Page

Cara mengakses halaman admin, mengelola data portfolio, dan menyiapkan Supabase dari nol.

---

## 1. Cara Buka Halaman Admin

Halaman admin **tidak ada di navigasi** (sengaja disembunyikan). Buka manual lewat URL:

| Lingkungan | URL |
|---|---|
| Lokal (dev) | `http://localhost:3000/admin` |
| Production | `https://creetechofficial.github.io/admin` |

### Login

1. Buka URL `/admin` di atas.
2. Masukkan **PIN admin**, lalu klik **Sign In**.
3. PIN diambil dari environment variable `ADMIN_PIN` (lihat `.env`).
   - Default lokal kalau belum diset: `1234` — **wajib diganti!**

> ⚠️ **Catatan keamanan:** site ini static, jadi PIN ikut terbundle ke file JS publik
> (bisa dilihat via view-source). Anggap PIN sebagai *gembok ringan*, bukan benteng.
> Jangan simpan data sensitif di tabel `projects`, dan ganti PIN secara berkala.
> Upgrade ke Supabase Auth dicatat sebagai follow-up, bukan scope saat ini.

### Yang Bisa Dilakukan di Admin Panel

| Fitur | Cara |
|---|---|
| Tambah project | Klik **Add Project** → isi judul, deskripsi, kategori (centang, boleh lebih dari satu), tahun, tech stack (pisah koma), client, cover URL, **Project URL** (link live, opsional) → **Save Project** |
| Edit project | Klik ikon ✏️ di baris project → form terbuka terisi data lama → ubah seperlunya → **Update Project** |
| Upload screenshot | Di form tambah/edit project, pilih file gambar (maks 5). Butuh Supabase Storage (otomatis dibuat oleh `schema.sql`) |
| Hapus screenshot (saat edit) | Hover thumbnail di **Current screenshots** → klik 🗑️. File dihapus dari Storage saat kamu klik **Update Project** (batal = tidak jadi dihapus) |
| Featured | Centang **Show as Featured** biar tampil badge Featured di portfolio |
| Hapus project | Klik ikon 🗑️ di baris project → konfirmasi |
| Keluar | Klik **Log Out** (sesi tersimpan di `sessionStorage`, hilang saat tab ditutup) |

Tanpa Supabase yang terkonfigurasi, tombol save akan error dan portfolio memakai
data fallback lokal (`data/projects.json`).

---

## 2. Alur Menyiapkan Supabase (dari Nol)

Ikuti urutan ini — sekitar 10 menit:

### Langkah 1 — Buat akun & project

1. Buka <https://supabase.com> → **Sign up** (bisa pakai GitHub).
2. Masuk ke <https://supabase.com/dashboard> → klik **New Project**.
3. Isi:
   - **Organization:** pilih / buat org (mis. `creetech`)
   - **Name:** mis. `creetech-portfolio`
   - **Database Password:** generate yang kuat, **simpan baik-baik** (perlu untuk akses DB langsung)
   - **Region:** pilih **`Southeast Asia (Singapore)`** — paling dekat dengan Indonesia
4. Klik **Create new project** → tunggu provisioning **±2 menit** sampai status hijau.

### Langkah 2 — Jalankan schema SQL

1. Di dashboard project, buka menu **SQL Editor** (kiri) → **New query**.
2. Buka file `supabase/schema.sql` di repo ini, copy **seluruh isinya**, paste ke editor, klik **Run**.
3. Script ini membuat:
   - Tabel `public.projects` (+ 3 contoh data)
   - RLS policy: public boleh baca; insert/delete terbuka (diamankan via PIN di sisi app)
   - Storage bucket `project-screenshots` (public, untuk upload screenshot admin)
4. Verifikasi: buka **Table Editor** → tabel `projects` berisi 3 baris contoh.
   Hapus/edit baris contoh itu dari Table Editor atau dari halaman `/admin`.

> **Sudah pernah jalanin `schema.sql` sebelumnya?** Jalankan tambahan
> `supabase/migration-002.sql` (cara sama: SQL Editor → paste → Run).
> Ini menambah kolom `project_url` + `categories[]` dan mengisi otomatis
> kategori lama ke format baru. Aman dijalankan ulang.

### Langkah 3 — Ambil API keys

1. Di dashboard project, buka **Project Settings** (ikon ⚙️) → **API Keys**
   (atau tombol **Connect** di atas → pilih framework).
2. Copy dua nilai ini:
   - **Project URL** → `https://xxxx.supabase.co`
   - **Publishable key** → diawali `sb_publishable_...`
     > Supabase menonaktifkan key lama (`anon`/`service_role`) bertahap sampai akhir 2026.
     > Key baru `sb_publishable_...` punya hak akses yang sama dengan `anon` dan bisa
     > langsung dipakai sebagai `SUPABASE_ANON_KEY`. Kalau project-mu masih menampilkan
     > key lama, pakai `anon` — keduanya jalan.

### Langkah 4 — Isi `.env` lokal

```bash
cp .env.example .env
```

```env
SUPABASE_URL=https://xxxx.supabase.co
SUPABASE_ANON_KEY=sb_publishable_...   # atau anon key lama
ADMIN_PIN=ganti-dengan-pin-kuat
```

Restart dev server (`yarn dev`) setelah mengubah `.env`. File `.env` sudah di-`.gitignore`
— jangan pernah commit key asli.

### Langkah 5 — Daftarkan Secrets GitHub (untuk auto-deploy)

Tanpa ini, site production tidak bisa membaca Supabase (pakai fallback JSON):

1. Buka repo GitHub → **Settings → Secrets and variables → Actions** → **New repository secret**.
2. Tambahkan tiga secret, namanya harus persis:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `ADMIN_PIN`
3. Aktifkan Pages: **Settings → Pages → Source → GitHub Actions**.
4. Push ke branch `main` → workflow `Deploy to GitHub Pages` jalan otomatis.

---

## 3. Troubleshooting

| Gejala | Penyebab & solusi |
|---|---|
| Portfolio selalu tampil data contoh (Sawit, Plant, WC…) | Supabase belum terhubung: cek `.env` / Secrets, restart dev. Itu data `data/projects.json` (fallback offline — normal) |
| Save project error di `/admin` | Env Supabase kosong/salah, atau bucket `project-screenshots` belum dibuat (jalankan ulang `schema.sql`) |
| Upload screenshot gagal | Cek Storage → bucket `project-screenshots` = **public**; cek policy insert di `storage.objects` |
| PIN benar tapi mental | `ADMIN_PIN` di env tidak sama dengan yang diketik; di production, cek GitHub Secrets + deploy ulang |
| Logo tech tidak tampil | File SVG di `assets/image/Technology/` harus ada dan terdaftar di `components/Home/Technology.vue` |

---

*Terakhir diperbarui: 20 Okt 2026. Butuh bantuan? Chat via WhatsApp di landing page.*
