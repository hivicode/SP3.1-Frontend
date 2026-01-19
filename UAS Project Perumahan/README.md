# UAS Project Perumahan

Proyek akhir full-stack untuk katalog dan pemesanan properti. Backend menggunakan Flask + SQLite untuk API dan dashboard admin, sementara frontend berupa halaman statis HTML/JS/CSS untuk katalog, detail, dan proses booking.

## Komponen
- `Backend/` - API Flask, admin dashboard, upload gambar, autentikasi sederhana
- `Frontend/` - Halaman landing, listing, detail, checkout, serta komponen header/footer

## Cara Cepat Menjalankan
- **Backend**: 
  ```bash
  cd Backend
  python -m venv .venv
  .venv\\Scripts\\activate
  pip install -r requirements.txt
  python app.py  # port 2022
  ```
- **Frontend statis**: 
  ```bash
  cd Frontend
  python -m http.server 8000
  ```

Pastikan folder `Backend/static/uploads/` dapat ditulisi untuk menyimpan gambar properti.
