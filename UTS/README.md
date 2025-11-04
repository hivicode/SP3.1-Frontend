# UTS - Aplikasi Penjualan Computer

Aplikasi penjualan komputer lengkap untuk Ujian Tengah Semester dengan fitur input data melalui modal pop-up, validasi form, perhitungan diskon/pajak, kalkulator pembayaran, keranjang belanja (multi-item), dan history transaksi.

## Deskripsi

Aplikasi ini memungkinkan user untuk:
- Memilih kategori barang (PC/Laptop, Aksesoris, atau Printer) dari data JSON
- Memilih item spesifik dengan harga yang dinamis
- Mengatur jumlah barang dengan validasi
- Memilih jenis penjualan (Tunai/Kredit)
- Menambahkan banyak barang ke Keranjang lalu menghitung total (multi-item)
- Menghitung total harga termasuk diskon dan pajak per kategori
- Menghitung kembalian untuk transaksi tunai
- Menyimpan dan melihat history transaksi

## Fitur Aplikasi

### 1. Data Loading dari JSON
- Data barang dimuat dari `data.json` menggunakan XMLHttpRequest
- Render dinamis opsi barang ke dalam modal
- Tidak ada hardcode data di HTML

### 2. Input Data Barang
- **Kategori**: PC/Laptop, Aksesoris, atau Printer (dipilih via modal)
- **Nama Barang**: Radio button untuk PC/Laptop, checkbox untuk Aksesoris (multiple selection)
- **Harga Satuan**: Auto-update berdasarkan pilihan
- **Jumlah**: Input number dengan validasi minimal 1
- **Jenis Penjualan**: Tunai atau Kredit (via modal)

### 2b. Keranjang Belanja (baru)
- Tombol "Tambah ke Keranjang" untuk memasukkan barang yang dipilih beserta jumlah
- Keranjang menampilkan daftar item lintas kategori, subtotal, dan pajak per item
- Dapat menghapus item tertentu atau membersihkan seluruh keranjang

### 3. Modal Pop-up
- **Modal Kategori**: Pilih kategori barang
- **Modal PC/Laptop**: Radio buttons dengan data dari JSON
- **Modal Aksesoris**: Checkboxes dengan data dari JSON (multiple selection)
- **Modal Printer**: Radio buttons dengan data dari JSON
- **Modal Jenis Penjualan**: Radio buttons untuk Tunai/Kredit
- **Modal History**: Tampilkan daftar transaksi tersimpan
- Semua modal dapat ditutup dengan klik di luar atau tombol X

### 4. Validasi Input
- **Validasi Jumlah**: Minimal 1, harus angka positif
- **Validasi Bayar**: Harus >= harga total untuk transaksi tunai
- **Error Highlighting**: Field error ditandai dengan border merah
- **Real-time Validation**: Validasi saat user mengetik

### 5. Perhitungan
- Jika keranjang terisi: total dijumlah dari semua item di keranjang
- Jika keranjang kosong: total dihitung dari item tunggal yang dipilih
- **Total Penjualan**: Σ (harga satuan × jumlah) per item
- **Diskon**: 10% dari total penjualan jika pembayaran Tunai
- **Pajak per Kategori**:
  - 15% untuk PC/Laptop
  - 10% untuk Aksesoris
  - 12% untuk Printer
- **Harga Total**: Total Penjualan - Diskon + Σ Pajak

### 6. Kalkulator Pembayaran (Tunai)
- Field "Bayar" muncul otomatis untuk jenis penjualan Tunai
- Hitung kembalian otomatis saat user memasukkan jumlah bayar
- Validasi jika bayar kurang dari total
- Tampilkan pesan "Kurang: Rp. X" jika bayar kurang

### 7. History Transaksi
- Simpan transaksi ke localStorage
- Tampilkan daftar history dengan detail lengkap
- Maksimal 50 transaksi terbaru
- Hapus semua history dengan konfirmasi
- Setiap transaksi menyimpan:
  - Tanggal & waktu
  - Daftar items (kategori, nama, harga satuan, jumlah)
  - Jenis penjualan
  - Total penjualan, diskon, pajak total
  - Bayar & kembalian (jika tunai)
  - Harga total

### 8. Auto-Reset
- Reset semua field via tombol Reset
- Keranjang dapat dibersihkan via tombol khusus di section Keranjang

## Ketentuan Diskon dan Pajak

### Diskon
- **10%** dari total penjualan jika pembayaran **Tunai**
- **0%** jika pembayaran **Kredit**

### Pajak
- **15%** untuk **PC/Laptop**
- **10%** untuk **Aksesoris**
- **12%** untuk **Printer**

## Struktur File

- **index.html** - Struktur aplikasi dengan form, modal, dan history
- **style.css** - Styling lengkap untuk form, modal, history, dan error states
- **script.js** - Logika aplikasi dengan komentar section yang jelas
- **data.json** - Data barang (PC, Aksesoris, dan Printer) dalam format JSON

## Cara Menggunakan

1. Buka file `index.html` di browser (pastikan menggunakan HTTP server)
2. Klik tombol "Select" pada field **Kategori**
3. Pilih kategori: PC/Laptop atau Aksesoris
4. Klik tombol "Select" pada field **Nama Barang**
5. Pilih item barang:
   - Radio button untuk PC/Laptop (single selection)
   - Checkbox untuk Aksesoris (multiple selection)
6. Klik "Simpan" di modal untuk konfirmasi pilihan
7. Isi **Jumlah** barang (minimal 1)
8. Klik tombol "Select" pada field **Jenis Penjualan**
9. Pilih jenis pembayaran: Tunai atau Kredit
10. Jika **Tunai**, field "Bayar" akan muncul
11. Klik tombol **"Hitung"** untuk menghitung total
12. Jika **Tunai**, masukkan jumlah bayar dan kembalian akan dihitung otomatis
13. Klik **"Simpan Transaksi"** untuk menyimpan ke history
14. Klik **"History Transaksi"** untuk melihat daftar transaksi
15. Klik **"Reset"** untuk menghapus semua data

## Data Barang

Data barang disimpan di `data.json` dan dimuat secara dinamis:

### PC/Laptop
- PC IBM Core i7 - Rp. 5.600.000
- Laptop Asus Core i5 - Rp. 4.500.000
- Laptop Lenovo AMD Ryzen 5 - Rp. 9.500.000

### Aksesoris
- Flasdisk 32gb - Rp. 50.000
- Hardisk 256 gb - Rp. 1.250.000
- Speaker Aktif - Rp. 255.000

## Konsep yang Dipelajari

### 1. Data Loading (Pertemuan 6)
- XMLHttpRequest untuk load data JSON
- Asynchronous data loading
- Dynamic content rendering

### 2. Modal Management (Pertemuan 7)
- Multiple modal pop-ups
- Modal overlay dengan klik di luar untuk close
- Tombol close (X) pada setiap modal
- Radio buttons dan checkboxes dalam modal

### 3. Form Handling & Validation (Pertemuan 5 & 7)
- Input validation real-time
- Error highlighting dengan CSS
- Dynamic form field population
- Read-only calculated fields
- Form reset functionality
- Field reset saat kategori berubah

- Conditional pricing per kategori
- Tax calculation based on kategori (PC 15%, Aksesoris 10%, Printer 12%)
- Discount calculation based on payment method
- Currency formatting
- Payment calculator

### 5. Event Handling (Pertemuan 5)
- Click events untuk modal control
- Change events untuk form updates
- Input events untuk real-time validation
- Click outside to close modal

### 6. LocalStorage (Advanced)
- Save transaction history
- Retrieve stored data
- Clear history with confirmation
- Limit storage (max 50 transactions)

- State keranjang & form
- Auto-hide/show fields based on selection
- Conditional UI rendering

## Teknologi

- **HTML5**: Struktur form, modal, dan layout
- **CSS3**: Styling, modal overlay, error states, responsive design
- **JavaScript (ES6+)**: 
  - Logika aplikasi dan perhitungan
  - Event handling
  - DOM manipulation
  - XMLHttpRequest untuk data loading
  - localStorage untuk history
  - Currency formatting

## Contoh Perhitungan

### Contoh 1: PC IBM Core i7, 2 unit, Tunai
- **Total penjualan**: 5.600.000 × 2 = **11.200.000**
- **Diskon (10%)**: 11.200.000 × 10% = **1.120.000**
- **Pajak (15%)**: 5.600.000 × 15% × 2 = **1.680.000**
- **Harga total**: 11.200.000 - 1.120.000 + 1.680.000 = **11.760.000**
- **Bayar**: Rp. 12.000.000
- **Kembalian**: 12.000.000 - 11.760.000 = **240.000**

### Contoh 2: Flasdisk 32gb + Speaker Aktif, 1 unit, Kredit
- **Total penjualan**: (50.000 + 255.000) × 1 = **305.000**
- **Diskon (0%)**: **0**
- **Pajak (10%)**: 305.000 × 10% = **30.500**
- **Harga total**: 305.000 + 30.500 = **335.500**

## Fitur Tambahan untuk UTS

### Fitur yang Sudah Diimplementasikan
1. ✅ Load data dari JSON (Pertemuan 6)
2. ✅ Validasi input real-time dengan error highlighting
3. ✅ Kalkulator bayar/kembalian untuk transaksi tunai
4. ✅ History transaksi dengan localStorage
5. ✅ Modal management yang lengkap
6. ✅ Currency formatting
7. ✅ Komentar section yang jelas di kode
8. ✅ Kategori baru: Printer (pajak 12%)
9. ✅ Keranjang belanja (multi-item) dengan pajak per kategori

### Fitur Opsional (Bisa Ditambahkan)
- Perhitungan cicilan untuk Kredit
- Search/filter barang di modal
- Export history ke file
- Print transaksi
- Dark mode toggle
- Dashboard statistik

## Cara Menjalankan

1. Pastikan semua file ada di folder yang sama:
   - `index.html`
   - `style.css`
   - `script.js`
   - `data.json`

2. Gunakan HTTP server (tidak bisa file:// karena AJAX):
   - Gunakan Live Server di VS Code
   - Atau gunakan Python: `python -m http.server 8000`
   - Atau gunakan Node.js: `npx http-server`

3. Buka `index.html` di browser melalui HTTP server

## Struktur Kode

Kode JavaScript diorganisir dengan komentar section yang jelas:
- State & Data Model
- Modal References
- Action Buttons
- Form Inputs
- Sections & Lists
- Modal Utils
- Data Loading
- Render Options
- Option Event Bindings
- Open Modals
- Modal Actions
- Validation
- Number Utils
- Field Events
- Currency Formatter
- Calculation
- Primary Actions
- History Storage

---

**Dibuat untuk Ujian Tengah Semester - Aplikasi Penjualan Computer dengan fitur lengkap**


