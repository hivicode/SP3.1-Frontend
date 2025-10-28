# Pertemuan 3 - JavaScript Dasar

Folder ini berisi materi pembelajaran JavaScript dasar meliputi array, percabangan, dan perulangan. Setiap konsep dilengkapi dengan contoh praktis dan latihan interaktif.

## Materi yang Dipelajari

### 1. Array Operations
- **array1.html** & **array1.js** - Konsep dasar array dan cara mengakses elemen
- **array_tambah_data.html** - Menambahkan data ke array (push, unshift)
- **array_hapus_data_depan.html** - Menghapus data dari depan array (shift)
- **array_hapus_data_belakang.html** - Menghapus data dari belakang array (pop)
- **arrray_ambil_dengan_perulangan.html** - Mengakses array menggunakan perulangan

### 2. Percabangan (Conditionals)
- **percabangan_if.html** - Percabangan sederhana dengan if
- **percabangan_if_else.html** - Percabangan dengan if-else
- **percabangan_if_else_if.html** - Percabangan bertingkat dengan if-else-if
- **percabangan_bersarang.html** - Percabangan bersarang (nested if)
- **percabangan_dengan_ternary.html** - Operator ternary sebagai alternatif if-else
- **percabangan_switch_case.html** - Percabangan dengan switch-case

### 3. Perulangan (Loops)
- **perulangan_for.html** - Perulangan dengan for loop
- **perulangan_while.html** - Perulangan dengan while loop
- **perulangan_do_while.html** - Perulangan dengan do-while loop
- **perulangan_foreach.html** - Perulangan dengan forEach method
- **perulangan_repeat.html** - Perulangan dengan repeat method
- **perulangan_bersarang.html** - Perulangan bersarang (nested loops)

## Cara Menjalankan

1. Buka file HTML di browser
2. Lihat hasil di console atau halaman web
3. Interaksi dengan prompt() untuk input user

## Konsep Penting

### Array Operations
```javascript
// Menambah data
array.push(data);     // Belakang
array.unshift(data);  // Depan

// Menghapus data
array.pop();          // Belakang
array.shift();        // Depan
```

### Percabangan
```javascript
// If-else
if (kondisi) {
    // kode
} else if (kondisi2) {
    // kode
} else {
    // kode
}

// Ternary
kondisi ? nilai1 : nilai2;

// Switch-case
switch (nilai) {
    case 'a': break;
    default: break;
}
```

### Perulangan
```javascript
// For loop
for (let i = 0; i < array.length; i++) {
    // kode
}

// ForEach
array.forEach(item => {
    // kode
});

// While
while (kondisi) {
    // kode
}
```
