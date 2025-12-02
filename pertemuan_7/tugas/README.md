# Tugas - Aplikasi Penjualan Computer

Aplikasi penjualan komputer dengan fitur input data melalui modal pop-up, perhitungan diskon, pajak, dan harga total.

## Deskripsi

Aplikasi ini memungkinkan user untuk memilih kategori barang (PC/Laptop atau Aksesoris), memilih item spesifik dengan harga, mengatur jumlah, memilih jenis penjualan (Tunai/Kredit), dan menghitung total harga termasuk diskon dan pajak.

## Fitur Aplikasi

### Input Data Barang
- Pilih kategori: PC/Laptop atau Aksesoris
- Pilih item barang dengan harga
- Atur jumlah barang
- Pilih jenis penjualan: Tunai atau Kredit

### Modal Pop-up
- Modal kategori untuk memilih jenis barang
- Modal PC/Laptop dengan radio buttons
- Modal aksesoris dengan checkboxes (multiple selection)
- Modal jenis penjualan dengan checkboxes

### Perhitungan Otomatis
- Total penjualan: Harga satuan x Jumlah
- Diskon: 10% jika pembayaran Tunai
- Pajak: 15% untuk barang utama, 10% untuk aksesoris
- Harga total: Total penjualan - Diskon + Pajak

## Ketentuan Diskon dan Pajak

### Diskon
- Diskon 10% dari total penjualan jika pembayaran Tunai

### Pajak
- 15% dari harga satuan untuk Barang Utama (PC/Laptop)
- 10% dari harga satuan untuk Barang Aksesoris

## Struktur File

- **index.html** - Struktur aplikasi dengan form dan modal
- **style.css** - Styling untuk form, modal, dan tampilan
- **script.js** - Logika aplikasi dan perhitungan

## Cara Menggunakan

1. Buka file `index.html` di browser
2. Klik tombol "Select" pada field Kategori
3. Pilih kategori: PC/Laptop atau Aksesoris
4. Klik tombol "Select" pada field Nama Barang
5. Pilih item barang (radio button untuk PC/Laptop, checkbox untuk Aksesoris)
6. Isi jumlah barang
7. Klik tombol "Select" pada field Jenis Penjualan
8. Pilih jenis pembayaran: Tunai atau Kredit
9. Klik tombol "Hitung" untuk menghitung total
10. Klik tombol "Reset" untuk menghapus semua data

## Data Barang

### PC/Laptop
- PC IBM Core i7 - Rp. 5.600.000
- Laptop Asus Core i5 - Rp. 4.500.000
- Laptop Lenovo AMD Ryzen 5 - Rp. 9.500.000

### Aksesoris
- Flasdisk 32gb - Rp. 50.000
- Hardisk 256 gb - Rp. 1.250.000
- Speaker Aktif - Rp. 255.000

## Konsep yang Dipelajari

### Modal Management
- Multiple modal pop-ups
- Modal overlay dengan klik di luar untuk close
- Tombol close (X) pada setiap modal
- Radio buttons dan checkboxes dalam modal

### Form Handling
- Input validation
- Dynamic form field population
- Read-only calculated fields
- Form reset functionality

### Business Logic
- Conditional pricing (main items vs accessories)
- Tax calculation based on item type
- Discount calculation based on payment method
- Currency formatting

### Event Handling
- Click events untuk modal control
- Change events untuk form updates
- Submit events untuk calculations
- Click outside to close modal

## Teknologi

- HTML5 untuk struktur form dan modal
- CSS3 untuk styling sederhana tanpa advanced effects
- JavaScript untuk logika aplikasi dan event handling

## Contoh Perhitungan

**Contoh 1: PC IBM Core i7, 2 unit, Tunai**
- Total penjualan: 5.600.000 x 2 = 11.200.000
- Diskon (10%): 1.120.000
- Pajak (15%): 5.600.000 x 15% x 2 = 1.680.000
- Harga total: 11.200.000 - 1.120.000 + 1.680.000 = 11.760.000

**Contoh 2: Flasdisk 32gb + Speaker Aktif, 1 unit, Kredit**
- Total penjualan: (50.000 + 255.000) x 1 = 305.000
- Diskon (0%): 0
- Pajak (10%): 305.000 x 10% = 30.500
- Harga total: 305.000 + 30.500 = 335.500

---

**Dibuat untuk pembelajaran Modal Pop-up dan Form Handling dengan Business Logic**
