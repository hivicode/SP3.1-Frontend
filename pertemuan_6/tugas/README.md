# Tugas Pertemuan 6 - Kalkulator Biaya Kirim Paket

Folder ini berisi tugas praktis untuk mengimplementasikan AJAX dan DOM manipulation dalam aplikasi kalkulator biaya kirim paket.

## 📋 Deskripsi Tugas

Membuat kalkulator biaya kirim paket yang mengintegrasikan:
- AJAX untuk loading data kota dari XML
- DOM manipulation untuk form handling
- Perhitungan biaya berdasarkan berat dan jarak
- Validasi form dan user experience

## 📁 File Tugas

### **shipping-calculator.html**
Interface utama kalkulator biaya kirim dengan form input dan tabel harga.

### **shipping-calculator.js**
Logika perhitungan biaya kirim, DOM manipulation, dan form handling.

### **kota.xml**
Data XML berisi informasi kota-kota yang tersedia untuk pengiriman.

## 🎯 Fitur Program

### 1. **Form Input**
- Nomor resi (required)
- Berat barang dalam Kg (required)
- Kota asal (dropdown)
- Kota tujuan (dropdown)
- Total biaya (calculated)

### 2. **AJAX Implementation**
- Loading data kota dari XML file
- Error handling untuk request gagal
- Dynamic population of select options

### 3. **DOM Manipulation**
- Dynamic select option creation
- Real-time form validation
- Auto-calculation on input change
- Visual feedback untuk user

### 4. **Business Logic**
- Perhitungan biaya berdasarkan berat
- Perhitungan biaya berdasarkan jarak
- Total biaya = (Biaya Berat × Berat) + (Biaya Jarak × Berat)

## 💰 Struktur Harga

### **Biaya Berat (per Kg):**
- 0 - 1 Kg: Rp 1.500
- 1.1 - 5 Kg: Rp 2.500
- 5.1 - 10 Kg: Rp 3.500
- Diatas 10 Kg: Rp 4.500

### **Biaya Jarak (per Kg):**
| Kota | Banyuwangi | Jember | Probolinggo | Surabaya |
|------|------------|--------|-------------|----------|
| **Banyuwangi** | 5.000 | 7.500 | 10.000 | 15.000 |
| **Jember** | 7.500 | 5.000 | 8.500 | 12.500 |
| **Probolinggo** | 10.000 | 8.500 | 5.000 | 6.500 |
| **Surabaya** | 15.000 | 12.500 | 6.500 | 5.000 |

## 🚀 Cara Menjalankan

### **Setup HTTP Server:**
```bash
# Gunakan HTTP server (bukan file://)
python -m http.server 8000
# atau
npx serve .

# Buka: http://localhost:8000/pertemuan_6/tugas/shipping-calculator.html
```

### **Cara Menggunakan:**
1. Isi nomor resi
2. Masukkan berat barang (contoh: 2.5)
3. Pilih kota asal
4. Pilih kota tujuan
5. Lihat total biaya terhitung otomatis

## 🔧 Implementasi Teknis

### **AJAX Data Loading:**
```javascript
function loadKotaData() {
    // Load XML data and populate select options
    const kotaAsalSelect = document.getElementById('kotaAsal');
    const kotaTujuanSelect = document.getElementById('kotaTujuan');
    // ... implementation
}
```

### **DOM Manipulation:**
```javascript
// Create select options dynamically
const option = document.createElement('option');
option.value = kota;
option.textContent = kota;
selectElement.appendChild(option);
```

### **Calculation Logic:**
```javascript
function calculateTotalCost() {
    const berat = parseFloat(document.getElementById('berat').value);
    const kotaAsal = document.getElementById('kotaAsal').value;
    const kotaTujuan = document.getElementById('kotaTujuan').value;
    
    // Calculate weight cost
    const weightCost = calculateWeightCost(berat);
    
    // Calculate distance cost
    const distanceCost = biayaJarak[kotaAsal][kotaTujuan];
    
    // Total calculation
    const total = (weightCost * berat) + (distanceCost * berat);
    return total;
}
```

## 🎓 Tujuan Pembelajaran

1. **AJAX Implementation**: Menggunakan XMLHttpRequest untuk loading data
2. **DOM Manipulation**: Dynamic content creation dan updates
3. **Form Handling**: Validasi dan user interaction
4. **Business Logic**: Implementasi perhitungan yang kompleks
5. **User Experience**: Interface yang responsif dan informatif
6. **Data Processing**: Handling XML data dan form input

## 🔧 Teknologi yang Digunakan

- **HTML5** - Form structure dan semantic elements
- **CSS3** - Styling dan responsive design
- **JavaScript ES6+** - AJAX dan DOM manipulation
- **XML** - Data format untuk kota
- **XMLHttpRequest** - AJAX requests

## 📝 Form Validation

- **Required Fields**: Nomor resi dan berat wajib diisi
- **Numeric Validation**: Berat harus berupa angka
- **Select Validation**: Kota asal dan tujuan harus dipilih
- **Real-time Feedback**: Validasi saat user mengetik

## 🎯 Kriteria Penilaian

- ✅ Implementasi AJAX yang benar
- ✅ DOM manipulation yang efektif
- ✅ Perhitungan biaya yang akurat
- ✅ Form validation yang baik
- ✅ User interface yang menarik
- ✅ Code yang clean dan terstruktur
- ✅ Error handling yang proper

## 🔍 Tips Pengembangan

1. Pastikan menggunakan HTTP server untuk testing AJAX
2. Test dengan berbagai kombinasi kota dan berat
3. Validasi input dengan berbagai format
4. Monitor network requests di DevTools
5. Implementasi error handling yang robust

## 📊 Testing Scenarios

### **Test Cases:**
1. **Berat 0.5 Kg, Banyuwangi → Surabaya**
   - Biaya Berat: 1.500 × 0.5 = 750
   - Biaya Jarak: 15.000 × 0.5 = 7.500
   - Total: 750 + 7.500 = 8.250

2. **Berat 3 Kg, Jember → Probolinggo**
   - Biaya Berat: 2.500 × 3 = 7.500
   - Biaya Jarak: 8.500 × 3 = 25.500
   - Total: 7.500 + 25.500 = 33.000

---

**Tugas ini menguji kemampuan mengintegrasikan AJAX dan DOM manipulation dalam aplikasi praktis.**
