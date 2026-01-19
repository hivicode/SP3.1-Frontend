# Project Ecommerce - jQuery UI

Halaman marketplace dengan filter harga dan kategori berbasis jQuery UI. Keranjang belanja disajikan sebagai dialog modal ringan tanpa backend.

## Fitur Utama
- **Price slider**: Rentang Rp50.000 - Rp8.000.000 dengan label live
- **Category toggle**: Tombol filter `data-category` (all/fashion/electronics/home)
- **Cart dialog**: Menampilkan item yang dipilih dan total harga
- **Product grid**: Kartu responsif dengan badge status, deskripsi singkat, dan CTA

## Dependensi
- jQuery 3.6.0
- jQuery UI 1.13.2 (slider + dialog)
- CDN font fallback via CSS

## Menjalankan
1. Jalankan HTTP server dari folder ini.
2. Buka `index.html` di browser modern.
3. Seret slider untuk menyaring harga atau gunakan tombol kategori, lalu klik "Masukkan ke Keranjang" untuk melihat dialog cart.

## Berkas
- `index.html` - Markup utama dan import CDN
- `css/style.css` - Styling warna, layout, dan dialog
- `js/script.js` - Inisialisasi slider, filter kategori, serta logika keranjang
