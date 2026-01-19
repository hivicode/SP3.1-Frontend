# SP3.1 Front End

Proyek pembelajaran front-end yang mencakup dasar hingga lanjutan JavaScript (array, percabangan, perulangan), fungsi dan modul ES6, event handling, DOM dan AJAX, jQuery CRUD, serta contoh aplikasi ecommerce dan full-stack sederhana.

## Struktur Proyek

### pertemuan_3/
Materi JavaScript dasar:
- **Array**: Operasi push/unshift/pop/shift, loop akses data
- **Percabangan**: if/else, switch case, ternary, nested conditions
- **Perulangan**: for, while, do-while, forEach, nested loops

### pertemuan_4/
Fungsi dan modul JavaScript:
- **Fungsi**: Parameter required/optional, callback, rest parameter, overflow arguments
- **Modul**: Export/import ES6 modules
- **Latihan**: Aplikasi manajemen barang sederhana

### pertemuan_5/
Event handling JavaScript:
- **Event Click**: Click, double click, context menu
- **Event Mouse**: MouseOver/Out/Move, MouseDown/Up
- **Event Keyboard**: KeyDown/Up, shortcuts
- **Event Change/Form**: Select/input/checkbox/radio change, submit/reset/validation
- **Custom Events**: Membuat dan menggunakan custom events
- **Program Utama**: Aplikasi penjualan motor dengan semua jenis event

### pertemuan_6/
AJAX dan DOM manipulation:
- **AJAX**: XMLHttpRequest, JSON loading, asynchronous flow
- **DOM**: Select bertingkat, dynamic content creation
- **Data Formats**: JSON dan XML handling
- **Tugas Praktis**: Kalkulator biaya kirim paket dengan validasi form

### pertemuan_7/
Modal pop-up dan aplikasi input data:
- **Modal Pop-up**: Overlay, close button, event control
- **Form Handling**: Input data, validasi, reset
- **Aplikasi Barang**: Manajemen data array storage
- **Tugas**: Aplikasi penjualan komputer dengan modal dan perhitungan

### pertemuan_9/
CRUD dengan jQuery dan localStorage:
- **jQuery**: DOM manipulation, event handling, selector, document ready
- **CRUD**: Create/Read/Update/Delete data pengguna
- **LocalStorage**: Penyimpanan client-side JSON
- **Event Delegation**: Menangani elemen dinamis
- **Form Validation**: Validasi sebelum simpan
- **Dynamic UI**: Toggle tombol Add/Update

### pertemuan_10/
Aplikasi ecommerce jQuery UI:
- **Price Slider**: Filter rentang harga dinamis
- **Category Filter**: Toggle kategori dengan state aktif
- **Cart Dialog**: Keranjang belanja memakai `dialog()` jQuery UI
- **Product Grid**: Kartu produk responsif dengan data kategori/harga

### UTS/
Aplikasi penjualan komputer untuk Ujian Tengah Semester:
- **Data Loading**: JSON via XMLHttpRequest
- **Modal Management**: Multiple modal dengan validasi
- **Form Validation**: Error highlighting real-time
- **Calculation**: Diskon, pajak, total harga
- **Payment Calculator**: Bayar dan kembalian tunai
- **Transaction History**: localStorage
- **Kategori & Pajak**: PC/Laptop 15%, Aksesoris 10%, Printer 12%
- **Keranjang Belanja**: Multi item, hapus/bersihkan, total akumulatif

### pertemuan_12 Dasar Web Dinamis/
Contoh dasar web dinamis dengan Flask + MongoDB:
- **Routing**: Halaman daftar produk, detail, dan keranjang
- **Template**: Bootstrap 5 dengan placeholder data MongoDB
- **Konfigurasi**: `app.py` menyiapkan koneksi Mongo dan render template

### UAS Project Perumahan/
Proyek akhir full-stack listing properti:
- **Backend (Flask + SQLite)**: CRUD properti, upload gambar, booking, admin dashboard, auth sederhana
- **Frontend (Static HTML/JS)**: Landing page, listing, detail properti, formulir booking, komponen header/footer
- **API**: Endpoint `/api/properti` dan `/api/booking` untuk integrasi front-end

## Cara Menjalankan

1. Buka file HTML di browser untuk contoh statis.
2. Untuk modul ES6 (`pertemuan_4/module/`), gunakan HTTP server (bukan file://).
3. Untuk AJAX (`pertemuan_6/`, `UTS/`, `pertemuan_10/`), jalankan via HTTP server atau Live Server.
4. Untuk Flask (`pertemuan_12/`, `UAS Project Perumahan/Backend/`):
   ```bash
   python -m venv .venv
   .venv\\Scripts\\activate
   pip install -r requirements.txt  # tambahkan paket pymongo/flask sesuai kebutuhan
   python app.py
   ```
5. Untuk frontend statis seperti `UAS Project Perumahan/Frontend/`, gunakan server sederhana:
   ```bash
   python -m http.server 8000
   ```

## Teknologi yang Digunakan

- **HTML5** untuk struktur halaman
- **CSS3** untuk styling dan layout
- **JavaScript (ES6+)** untuk logika, DOM, event handling
- **jQuery** untuk DOM dan event (pertemuan_9, pertemuan_10)
- **AJAX/XMLHttpRequest** untuk data async
- **localStorage** untuk penyimpanan client-side
- **Flask** untuk contoh server-side
- **SQLite/MongoDB** untuk penyimpanan data

## Fitur Utama

### Dasar
- Array manipulation
- Conditional statements
- Loops dan iteration
- Function definitions
- Event handling

### Menengah
- ES6 Modules (import/export)
- DOM manipulation
- AJAX data loading
- Modal pop-ups
- Form validation
- jQuery integration
- CRUD dengan localStorage

### Lanjutan
- Dynamic data loading dari JSON
- Real-time validation
- Kalkulator pembayaran/kembalian
- Transaction history dengan localStorage
- jQuery UI slider + dialog
- Backend Flask dengan API dan upload gambar

## Catatan Pembelajaran

Setiap folder berisi contoh praktis dengan komentar. File HTML bisa dibuka langsung, kecuali modul ES6 dan proyek AJAX/Flask yang perlu server HTTP.

## Struktur File Penting

```
SP3.1 Front End/
- README.md
- pertemuan_03/
- pertemuan_04/
- pertemuan_05/
- pertemuan_06/
- pertemuan_07/
- pertemuan_09/
- pertemuan_10/
- pertemuan_12 Dasar Web Dinamis/
- UTS/
- UAS Project Perumahan/
```

---

Dibuat untuk pembelajaran Front-End Development dengan JavaScript
