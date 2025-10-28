# Pertemuan 4 - Fungsi dan Modul JavaScript

Folder ini berisi materi pembelajaran fungsi dan modul JavaScript, termasuk parameter, callback, dan ES6 modules. Dilengkapi dengan aplikasi praktis untuk manajemen barang.

## Struktur Folder

### 1/ - Konsep Dasar Fungsi
- **1_required_parameter.js** - Fungsi dengan parameter wajib
- **2_optional_parameter** - Fungsi dengan parameter opsional
- **3_callback_function.js** - Implementasi callback function
- **4_overflow_argument.js** - Menangani argument berlebih
- **5_rest_parameter.js** - Menggunakan rest parameter (...)
- **pertemuan 4.js** - Ringkasan konsep fungsi

### latihan/ - Latihan Praktis
- **index.html** - Interface aplikasi manajemen barang
- **fungsi.js** - Implementasi CRUD dengan fungsi

### latihan copy/ - Backup Latihan
- **index.html** - Backup interface aplikasi
- **fungsi.js** - Backup implementasi CRUD

### module / - ES6 Modules
- **bola.js** - Modul untuk menghitung volume bola
- **lingkaran.js** - Modul untuk menghitung luas lingkaran
- **math-constant.js** - Konstanta matematika (PI)
- **tes-bola.html** - Testing modul bola
- **tes-lingkaran.html** - Testing modul lingkaran

## Cara Menjalankan

### Untuk Latihan Biasa
```bash
# Buka file HTML langsung di browser
open latihan/index.html
```

### Untuk ES6 Modules
```bash
# Gunakan HTTP server (bukan file://)
# Contoh dengan Python:
python -m http.server 8000

# Atau dengan Node.js:
npx serve .

# Kemudian buka: http://localhost:8000/module /tes-bola.html
```

## Konsep Penting

### Arrow Functions
```javascript
// Single parameter
const halo = nama => `Halo ${nama}!`;

// Multiple parameters
const penjumlahan = (param1, param2) => param1 + param2;

// Function body
const luasLingkaran = radius => {
    const PI = 22/7;
    return PI * radius ** 2;
};
```

### Callback Functions
```javascript
const tampilkanhasil = (hasil) => alert(`Hasil = ${hasil}`);

const penjumlahan = (a, b, display) => {
    let hasil = a + b;
    display(hasil);
};

penjumlahan(10, 20, tampilkanhasil);
```

### Rest Parameters
```javascript
function jumlahkansemuanya(...bilangan) {
    let total = 0;
    for (let bil of bilangan) {
        total += bil;
    }
    return total;
}
```

### ES6 Modules
```javascript
// Export
export default volume;
export {PI};

// Import
import volume from './bola.js';
import {PI} from './math-constant.js';
```

## Fitur Aplikasi Latihan

Aplikasi manajemen barang memiliki fitur:
- Tambah barang baru
- Lihat daftar barang
- Edit barang existing
- Hapus barang
- Validasi input

## Prasyarat

- Memahami konsep dasar JavaScript (pertemuan_3)
- Pengetahuan dasar HTML dan DOM
- Browser modern yang mendukung ES6 modules
