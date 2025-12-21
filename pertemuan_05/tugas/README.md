# Tugas Pertemuan 5 - Program Penjualan Motor

Folder ini berisi tugas praktis untuk mengimplementasikan semua jenis event handling JavaScript dalam satu aplikasi penjualan motor yang lengkap.

## 📋 Deskripsi Tugas

Membuat program penjualan motor yang mengintegrasikan semua jenis event handling yang telah dipelajari:
- Event Click (click, double click, context menu)
- Event Mouse (hover, enter, leave, move)
- Event Keyboard (keydown, keyup, shortcuts)
- Event Change (select, input, checkbox, radio)
- Event Form (submit, reset, focus, blur)
- Custom Events (priceCalculated, purchaseComplete)

## 📁 File Tugas

### **program_penjualan_motor.html**
Program penjualan motor lengkap dengan semua jenis event handling.

## 🎯 Fitur Program

### 1. **Event Click**
- Button "Proses" untuk menghitung total harga
- Button "Reset" untuk mengosongkan form
- Click pada baris tabel untuk detail
- Double click untuk aksi khusus
- Right click untuk context menu

### 2. **Event Mouse**
- Hover effects pada input fields
- Mouse enter/leave logging
- Hover pada checkbox/radio items
- Visual feedback saat mouse interaction

### 3. **Event Keyboard**
- Keyboard event tracking pada input
- Shortcuts: Ctrl+Enter (submit), Ctrl+R (reset)
- Real-time input monitoring
- Key display dan logging

### 4. **Event Change**
- Select dropdown untuk merk motor
- Checkbox untuk aksesoris
- Radio button untuk cara pembayaran
- Auto-calculation saat ada perubahan

### 5. **Event Form**
- Form submission dengan validasi
- Focus/blur visual feedback
- Form reset handling
- Input validation

### 6. **Custom Events**
- `priceCalculated` - Dipanggil saat harga dihitung
- `purchaseComplete` - Dipanggil saat pembelian selesai
- Event log untuk monitoring

## 💰 Logika Bisnis

### **Harga Motor:**
- Honda: Rp 15.000.000
- Yamaha: Rp 14.000.000
- Suzuki: Rp 13.000.000

### **Harga Aksesoris:**
- Velg Racing: Rp 450.000
- Helm: Rp 250.000
- Jaket: Rp 300.000

### **Cara Pembayaran:**
- Tunai: Diskon 10%
- Kredit: Bunga 15%

### **Perhitungan:**
```
1. Total = Harga Motor + Total Aksesoris
2. Jika Tunai: Final = Total - (Total × 10%)
3. Jika Kredit: Final = Total + (Total × 15%)
```

## 🚀 Cara Menjalankan

1. Buka `program_penjualan_motor.html` di browser
2. Isi form dengan data motor
3. Pilih aksesoris yang diinginkan
4. Pilih cara pembayaran
5. Klik "Proses" untuk menghitung total
6. Lihat event log untuk monitoring

## 🎓 Tujuan Pembelajaran

1. **Integrasi Event Handling**: Menggabungkan semua jenis event dalam satu aplikasi
2. **User Experience**: Membuat interface yang responsif dan interaktif
3. **Event Management**: Mengelola multiple event listeners
4. **Custom Events**: Membuat dan menggunakan custom events
5. **Form Validation**: Implementasi validasi form yang baik
6. **Business Logic**: Menerapkan logika bisnis yang kompleks

## 🔧 Teknologi yang Digunakan

- **HTML5** - Struktur form dan layout
- **CSS3** - Styling dan responsive design
- **JavaScript ES6+** - Event handling dan logika
- **DOM Manipulation** - Dynamic content updates
- **Event Delegation** - Efficient event management

## 📝 Event Log Features

Program ini dilengkapi dengan event log yang menampilkan:
- Semua event yang terjadi
- Timestamp event
- Event type dan target
- Data yang terkait dengan event
- Custom event details

## 🎯 Kriteria Penilaian

- ✅ Implementasi semua jenis event handling
- ✅ User interface yang menarik dan responsif
- ✅ Logika bisnis yang benar
- ✅ Event log yang informatif
- ✅ Code yang clean dan terstruktur
- ✅ Error handling yang baik

## 🔍 Tips Pengembangan

1. Gunakan browser DevTools untuk debugging
2. Monitor event log untuk memahami flow
3. Test semua jenis event interaction
4. Pastikan validasi form berfungsi dengan baik
5. Optimalkan performance dengan event delegation

---

**Tugas ini menguji kemampuan mengintegrasikan semua konsep event handling JavaScript dalam aplikasi praktis.**
