# Frontend - UAS Project Perumahan

Halaman statis untuk katalog dan pemesanan properti. Menggunakan HTML/CSS/JS murni dengan data contoh di `properties.js`.

## Halaman
- `index.html` - Landing page/hero dan highlight properti
- `listing.html` - Daftar properti dengan filter/sortir sederhana
- `property.html` - Detail properti tunggal
- `checkout.html` - Formulir booking
- `contact.html` - Kontak/perusahaan

## Skrip & Data
- `properties.js` - Data sample properti (`window.PLANB_PROPERTIES`)
- `rent.js` - Logika filtering/listing dan integrasi checkout
- `script.js` - Interaksi umum (navbar, slider, dsb.)

## Komponen & Styling
- `components/header*.html`, `components/footer.html` - Potongan reusable
- `css/*.css` - Styling khusus tiap halaman (index, listing, rent/checkout, contact)

## Menjalankan
Jalankan HTTP server dari folder ini, contoh:
```bash
python -m http.server 8000
```
Lalu buka `http://localhost:8000/index.html`.
