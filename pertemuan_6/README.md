# Pertemuan 6 - AJAX dan DOM Manipulation

Folder ini berisi materi pembelajaran AJAX (Asynchronous JavaScript and XML) dan manipulasi DOM untuk membuat aplikasi web interaktif.

## 📋 Materi yang Dipelajari

### 1. AJAX dengan XMLHttpRequest
- **index.html** & **script.js** - Implementasi AJAX untuk mengambil data JSON
- **data.json** - Data mahasiswa dalam format JSON
- **index1.html** - Variasi implementasi AJAX

### 2. DOM Manipulation
- **select.html** & **data-lokasi.js** - Select bertingkat dengan manipulasi DOM
- **data-lokasi.js** - Data lokasi benua dan negara
- Implementasi select dependent (negara bergantung pada benua)

### 3. Tugas Praktis
- **tugas/shipping-calculator.html** - Kalkulator biaya kirim paket
- **tugas/shipping-calculator.js** - Logika perhitungan biaya kirim
- **tugas/kota.xml** - Data kota dalam format XML

## 🚀 Cara Menjalankan

### Untuk AJAX (Membutuhkan HTTP Server)
```bash
# Gunakan HTTP server (bukan file://)
# Contoh dengan Python:
python -m http.server 8000

# Atau dengan Node.js:
npx serve .

# Kemudian buka: http://localhost:8000/index.html
```

### Untuk DOM Manipulation
```bash
# Buka file HTML langsung di browser
open select.html
```

## 📝 Konsep Penting

### AJAX dengan XMLHttpRequest
```javascript
function loadData() {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', 'data.json', true);
    
    xhr.onload = function() {
        if (xhr.status === 200) {
            var data = JSON.parse(xhr.responseText);
            // Proses data
        }
    };
    xhr.send();
}
```

### DOM Manipulation
```javascript
// Membuat elemen baru
let option = document.createElement('option');
option.text = 'Text';
option.value = 'value';
selectElement.appendChild(option);

// Event listener
element.addEventListener('change', function() {
    // Handler
});
```

### Select Dependent
```javascript
function updateNegara() {
    const benua = selectBenua.value;
    selectNegara.innerHTML = '';
    
    if (benua) {
        const negaraArray = dataLokasi[benua];
        negaraArray.forEach(negara => {
            // Tambahkan option
        });
    }
}
```

## 🎯 Fitur Aplikasi

### AJAX Data Loader
- ✅ Mengambil data dari file JSON
- ✅ Menampilkan data mahasiswa
- ✅ Error handling untuk request gagal
- ✅ Loading state management

### Select Bertingkat
- ✅ Pilih benua terlebih dahulu
- ✅ Negara otomatis terupdate
- ✅ Validasi pilihan
- ✅ Display hasil pilihan

### Kalkulator Biaya Kirim
- ✅ Input nomor resi dan berat
- ✅ Pilih kota asal dan tujuan
- ✅ Perhitungan biaya berdasarkan berat dan jarak
- ✅ Tabel harga terintegrasi
- ✅ Validasi form

## 💡 Logika Bisnis Kalkulator Kirim

### Biaya Berat
- 0 - 1 Kg: Rp 1.500
- 1.1 - 5 Kg: Rp 2.500
- 5.1 - 10 Kg: Rp 3.500
- Diatas 10 Kg: Rp 4.500

### Biaya Jarak (per Kg)
- Banyuwangi ↔ Jember: Rp 7.500
- Banyuwangi ↔ Probolinggo: Rp 10.000
- Banyuwangi ↔ Surabaya: Rp 15.000
- Jember ↔ Probolinggo: Rp 8.500
- Jember ↔ Surabaya: Rp 12.500
- Probolinggo ↔ Surabaya: Rp 6.500

### Perhitungan
```
Total Biaya = (Biaya Berat × Berat) + (Biaya Jarak × Berat)
```

## 🔧 Teknologi yang Digunakan

- **HTML5** - Struktur halaman
- **CSS3** - Styling dan layout
- **JavaScript ES6+** - Logika aplikasi
- **XMLHttpRequest** - AJAX requests
- **JSON** - Data format
- **XML** - Data format alternatif

## 📚 Prasyarat

- Memahami konsep dasar JavaScript (pertemuan_3)
- Pengetahuan DOM manipulation (pertemuan_5)
- Browser modern yang mendukung ES6
- HTTP server untuk testing AJAX

## 🎓 Tips Pembelajaran

1. Mulai dengan select bertingkat untuk memahami DOM manipulation
2. Pelajari AJAX dengan data sederhana terlebih dahulu
3. Gunakan browser DevTools untuk debugging
4. Perhatikan error handling dalam AJAX
5. Pahami perbedaan antara JSON dan XML
6. Eksperimen dengan berbagai HTTP methods

## 🔍 Browser DevTools

Gunakan Network tab untuk:
- Monitor AJAX requests
- Lihat response data
- Debug request errors
- Analisis loading time

Gunakan Console untuk:
```javascript
// Debug AJAX
console.log(xhr.responseText);

// Debug DOM
console.log(element.innerHTML);
```

## 📚 Referensi

- [MDN - Using XMLHttpRequest](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest)
- [MDN - DOM Manipulation](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model)
- [JSON.org](https://www.json.org/)
- [W3Schools - AJAX Tutorial](https://www.w3schools.com/xml/ajax_intro.asp)

---

**Dibuat untuk pembelajaran AJAX dan DOM Manipulation**
