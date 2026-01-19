# ES6 Modules

Contoh penggunaan modul ES6 untuk perhitungan matematika sederhana.

## Berkas
- `math-constant.js` - Konstanta PI
- `lingkaran.js` - Fungsi luas lingkaran (export)
- `bola.js` - Fungsi volume bola (export default)
- `tes-lingkaran.html` / `tes-bola.html` - Halaman uji import modul

## Menjalankan
Gunakan HTTP server (bukan file://) agar `import` ES6 berfungsi, misalnya:
```bash
python -m http.server 8000
```
Lalu buka `http://localhost:8000/module/tes-lingkaran.html` atau `tes-bola.html`.
