# Backend - UAS Project Perumahan

Layanan Flask + SQLite untuk CRUD properti, upload gambar, dan manajemen booking. Menyediakan API publik dan dashboard admin dengan autentikasi sederhana.

## Fitur
- Endpoint REST:
  - `GET /api/properti` dan `GET /api/properti/<kode>`
  - `POST /api/properti` (buat properti baru + upload gambar)
  - `PUT /api/properti/<kode>` dan `DELETE /api/properti/<kode>`
  - `GET /api/booking`, `POST /api/booking`, `PATCH /api/booking/<id>/status`
- Upload gambar ke `static/uploads/` dengan validasi ekstensi
- Dashboard admin (`/admin`) untuk CRUD properti dan melihat booking
- Autentikasi form sederhana (`/login`, kredensial default: admin/admin)
- Inisialisasi DB otomatis (`data.db`) dan migrasi kolom dasar

## Struktur
- `app.py` - Seluruh routing API dan admin, helper upload, serta migrasi ringan
- `templates/` - Template admin (login, daftar properti, form, customer/booking)
- `static/uploads/` - Lokasi file gambar properti
- `requirements.txt` - Dependensi Flask dan SQLite helper

## Menjalankan
```bash
python -m venv .venv
.venv\\Scripts\\activate
pip install -r requirements.txt
python app.py  # default port 2022
```

## Catatan
- Pastikan folder `static/uploads/` dapat ditulisi; akan dibuat otomatis oleh `ensure_dirs()`.
- File `data.db` akan dibuat jika belum ada; backup sebelum menjalankan di lingkungan produksi.
- Kredensial admin dapat diubah di `app.py` (fungsi login).
