# SP3.1 Front End

Proyek pembelajaran front-end yang mencakup konsep dasar JavaScript meliputi array, percabangan, perulangan, fungsi, event handling, DOM manipulation, dan AJAX.

## Struktur Proyek

### pertemuan_3/
Berisi materi pembelajaran JavaScript dasar:
- **Array**: Operasi dasar array, menambah/menghapus data
- **Percabangan**: if/else, switch case, ternary operator, nested conditions
- **Perulangan**: for, while, do-while, forEach, nested loops

### pertemuan_4/
Berisi materi pembelajaran fungsi dan modul JavaScript:
- **Fungsi**: Parameter required/optional, callback, rest parameter, overflow arguments
- **Modul**: Export/import ES6 modules
- **Latihan**: Aplikasi manajemen barang sederhana

### pertemuan_5/
Berisi materi pembelajaran event handling JavaScript:
- **Event Click**: Click, double click, context menu
- **Event Mouse**: MouseOver, MouseOut, MouseMove, MouseDown/Up
- **Event Keyboard**: KeyDown, KeyUp, keyboard shortcuts
- **Event Change**: Select, input, checkbox, radio change
- **Event Form**: Submit, reset, focus, blur, validation
- **Custom Events**: Membuat dan menggunakan custom events
- **Program Utama**: Aplikasi penjualan motor dengan semua jenis event

### pertemuan_6/
Berisi materi pembelajaran AJAX dan DOM manipulation:
- **AJAX**: XMLHttpRequest, JSON data loading, asynchronous programming
- **DOM Manipulation**: Select bertingkat, dynamic content creation
- **Data Formats**: JSON dan XML data handling
- **Tugas Praktis**: Kalkulator biaya kirim paket dengan validasi form

### pertemuan_7/
Berisi materi pembelajaran modal pop-up dan aplikasi input data:
- **Modal Pop-up**: Implementasi modal dengan overlay dan close button
- **Form Handling**: Input data dengan validasi dan reset form
- **Aplikasi Barang**: Manajemen data barang UMKM dengan array storage
- **Event Control**: Buka/tutup modal dengan berbagai cara
- **Tugas**: Aplikasi penjualan komputer dengan modal dan perhitungan

### UTS/
Aplikasi penjualan komputer untuk Ujian Tengah Semester dengan fitur lengkap:
- **Data Loading**: Load data barang dari JSON menggunakan XMLHttpRequest
- **Modal Management**: Multiple modal dengan validasi
- **Form Validation**: Validasi input real-time dengan error highlighting
- **Calculation**: Perhitungan diskon, pajak, dan total harga
- **Payment Calculator**: Kalkulator bayar dan kembalian untuk transaksi tunai
- **Transaction History**: Simpan dan tampilkan history transaksi menggunakan localStorage
- **Reset Logic**: Reset otomatis saat kategori berubah

## Cara Menjalankan

1. Buka file HTML di browser
2. Untuk modul ES6 (`pertemuan_4/module/`), pastikan menggunakan HTTP server (bukan file://)
3. Untuk aplikasi dengan AJAX (`pertemuan_6/`, `UTS/`), gunakan HTTP server
4. Gunakan Live Server extension di VS Code untuk pengembangan

## Teknologi yang Digunakan

- **HTML5**: Struktur halaman dan form
- **CSS3**: Styling dan layout
- **JavaScript (ES6+)**: Logika aplikasi, DOM manipulation, event handling
- **AJAX/XMLHttpRequest**: Data loading asinkron
- **localStorage**: Penyimpanan data client-side

## Fitur Utama

### Fitur Dasar
- Array manipulation
- Conditional statements
- Loops dan iteration
- Function definitions
- Event handling

### Fitur Menengah
- ES6 Modules (import/export)
- DOM manipulation
- AJAX data loading
- Modal pop-ups
- Form validation

### Fitur Lanjutan (UTS)
- Dynamic data loading dari JSON
- Real-time form validation dengan error highlighting
- Kalkulator pembayaran dan kembalian
- Transaction history dengan localStorage
- Auto-reset saat kategori berubah

## Catatan Pembelajaran

Setiap folder berisi contoh praktis dengan komentar yang menjelaskan konsep yang digunakan. File-file HTML dapat dibuka langsung di browser, kecuali untuk modul ES6 dan aplikasi AJAX yang memerlukan HTTP server.

## Struktur File Penting

```
SP3.1 Front End/
├── README.md (file ini)
├── pertemuan_3/        # JavaScript Dasar
├── pertemuan_4/        # Fungsi & Modul
├── pertemuan_5/        # Event Handling
├── pertemuan_6/        # AJAX & DOM
├── pertemuan_7/        # Modal & Form
└── UTS/               # Aplikasi UTS Lengkap
```

---

**Dibuat untuk pembelajaran Front-End Development dengan JavaScript**
