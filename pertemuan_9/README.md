# Pertemuan 9 - CRUD dengan jQuery dan LocalStorage

Materi pembelajaran implementasi aplikasi CRUD (Create, Read, Update, Delete) menggunakan jQuery dan localStorage untuk penyimpanan data client-side.

## Deskripsi

Aplikasi CRUD sederhana untuk mengelola data pengguna (Nama dan Alamat) dengan fitur lengkap untuk menambah, menampilkan, mengedit, dan menghapus data. Data disimpan menggunakan localStorage browser sehingga tetap tersimpan meskipun halaman di-refresh.

## Fitur

- **Create (Tambah)**: Menambahkan data baru dengan validasi input
- **Read (Baca)**: Menampilkan semua data dalam bentuk tabel
- **Update (Edit)**: Mengedit data yang sudah ada
- **Delete (Hapus)**: Menghapus data dari daftar
- **Data Persistence**: Data tersimpan di localStorage browser
- **Form Validation**: Validasi input tidak boleh kosong
- **Dynamic UI**: Tombol Add/Update berganti secara dinamis

## File Struktur

```
pertemuan_9/
├── crud.html      # File HTML utama dengan struktur form dan tabel
├── style.css      # Styling untuk aplikasi
├── script.js      # Logika CRUD dengan jQuery dan localStorage
└── README.md      # Dokumentasi ini
```

## Teknologi yang Digunakan

- **HTML5**: Struktur form dan tabel
- **CSS3**: Styling dan layout responsif
- **jQuery 3.7.1**: DOM manipulation dan event handling
- **localStorage API**: Penyimpanan data client-side
- **JSON**: Format data untuk serialisasi

## Cara Menggunakan

1. Buka file `crud.html` di browser
2. Masukkan Nama dan Alamat pada form
3. Klik tombol "Tambah" untuk menambahkan data
4. Klik tombol "Edit" pada baris data untuk mengedit
5. Klik tombol "Delete" pada baris data untuk menghapus
6. Data akan otomatis tersimpan di localStorage browser

## Konsep yang Dipelajari

### jQuery
- **Document Ready**: `$(document).ready()` untuk memastikan DOM siap
- **Selector**: `$("#id")`, `$(".class")` untuk memilih elemen
- **Event Handling**: `.click()`, `.on()` untuk event delegation
- **DOM Manipulation**: `.val()`, `.empty()`, `.append()`, `.show()`, `.hide()`
- **Data Attributes**: `.data("index")` untuk menyimpan data di elemen

### LocalStorage
- **setItem()**: Menyimpan data ke localStorage
- **getItem()**: Mengambil data dari localStorage
- **JSON Serialization**: `JSON.stringify()` dan `JSON.parse()`

### Event Delegation
- Menggunakan `.on("click", ".selector", handler)` untuk menangani event pada elemen dinamis
- Berguna untuk tombol Edit dan Delete yang dibuat secara dinamis

### Form Management
- Validasi input sebelum menyimpan
- Reset form setelah operasi
- Toggle visibility tombol Add/Update

## Struktur Data

Data disimpan dalam format array of objects:

```javascript
[
    { nama: "John Doe", alamat: "Jakarta" },
    { nama: "Jane Smith", alamat: "Bandung" }
]
```

## Catatan Penting

- Data tersimpan di localStorage browser, sehingga data akan hilang jika:
  - Browser cache dihapus
  - Menggunakan mode incognito/private
  - Mengganti browser atau perangkat
- Aplikasi ini adalah contoh client-side storage, untuk aplikasi production sebaiknya menggunakan backend database
- jQuery digunakan untuk mempermudah DOM manipulation, namun konsep yang sama bisa diimplementasikan dengan vanilla JavaScript
