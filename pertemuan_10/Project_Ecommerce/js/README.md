# JavaScript - Project Ecommerce

`script.js` menangani interaksi jQuery UI, filter produk, dan keranjang belanja.

## Alur Utama
- Inisialisasi dialog keranjang (`#cartDialog`) dan price slider (`#priceSlider`)
- Fungsi `updatePriceLabel`, `filterByPrice`, dan `filterByCategory` untuk menyembunyikan kartu sesuai rentang/kategori
- Event handler tombol kategori untuk toggle class `active`
- Event "Masukkan ke Keranjang" menambah item ke array `cart`, merender ulang list, dan membuka dialog

## Rentang Slider
- Min: 50.000
- Max: 8.000.000
- Nilai awal: [50.000, 3.000.000]

Pastikan jQuery dan jQuery UI sudah termuat sebelum menjalankan skrip ini.
