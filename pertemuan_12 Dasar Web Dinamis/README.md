# Pertemuan 12 - Dasar Web Dinamis (Flask + MongoDB)

Contoh minimal aplikasi Flask yang merender daftar produk, detail produk, dan halaman keranjang menggunakan template Bootstrap 5. Data diambil dari koleksi MongoDB.

## Struktur
- `app.py` - Routing Flask dan koneksi MongoDB (`MongoClient("mongodb:///localhost:27017/")`)
- `templates/` - Template Bootstrap (index, detail, cart)
- `static/` - Aset statis untuk gambar produk

## Menjalankan
1. Buat virtualenv dan aktifkan.
2. Install dependensi: `pip install flask pymongo bson` (atau gunakan `requirements.txt` jika tersedia).
3. Jalankan `python app.py` lalu buka `http://localhost:5000` (port default Flask).
4. Pastikan MongoDB berjalan dan koleksi `nama-database.nama-table` memiliki field `nama`, `harga`, `jumlah`, dan `gambar`.

## Catatan
- Sesuaikan connection string MongoDB dan nama database/koleksi sesuai environment Anda.
- Template menggunakan path gambar `/static/image/{{ product.gambar }}`; simpan file gambar pada folder tersebut.
