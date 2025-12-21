# Pertemuan 7 - Modal Pop-up dan Aplikasi Input Data

Folder ini berisi materi pembelajaran tentang implementasi modal pop-up menggunakan HTML, CSS, dan JavaScript. Dilengkapi dengan aplikasi praktis untuk input data barang UMKM.

## Struktur Folder

### contoh_1/ - Modal Pop-up Dasar
Berisi implementasi modal pop-up sederhana dengan overlay dan close button:
- **index.html** - Struktur HTML modal pop-up
- **style.css** - Styling untuk modal overlay, content, dan tombol close
- **script.js** - JavaScript untuk mengontrol buka/tutup modal

Fitur:
- Modal overlay dengan background transparan gelap
- Tombol buka pop-up
- Tombol close (X) di pojok kanan atas
- Close dengan klik di luar area modal
- Animasi smooth dengan CSS transitions

### contoh_2/ - Aplikasi Input Data Barang
Berisi aplikasi lengkap untuk manajemen data barang UMKM:
- **index.html** - Form input data barang dengan modal
- **style.css** - Styling untuk modal, form, dan daftar barang
- **script.js** - Logika aplikasi untuk CRUD data barang

Fitur:
- Tombol "Tambah Data Baru" untuk membuka modal
- Form input dengan field: Kode, Nama, dan Harga barang
- Validasi form input
- Daftar barang dengan format terstruktur
- Reset form setelah submit
- Console logging untuk tracking data
- Array-based data storage

## Cara Menjalankan

### Untuk Modal Pop-up Dasar
```bash
# Buka file HTML langsung di browser
open contoh_1/index.html
```

### Untuk Aplikasi Input Data
```bash
# Buka file HTML langsung di browser
open contoh_2/index.html
```

## Konsep yang Dipelajari

### 1. Modal Pop-up Structure
```html
<div id="modalOverlay" class="popup-tersembunyi">
    <div class="popup-konten">
        <span class="tombol-tutup">&times;</span>
        <h2>Judul Pop-up</h2>
        <p>Isi pop-up</p>
    </div>
</div>
```

### 2. CSS Modal Styling
```css
/* Hidden by default */
.popup-tersembunyi {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
}

/* Show modal */
.popup-tampil {
    display: flex;
    justify-content: center;
    align-items: center;
}
```

### 3. JavaScript Modal Control
```javascript
// Open modal
tombolBuka.addEventListener("click", () => {
    modalOverlay.classList.add("popup-tampil");
});

// Close modal
tombolTutup.addEventListener("click", () => {
    modalOverlay.classList.remove("popup-tampil");
});

// Close on click outside
modalOverlay.addEventListener("click", (e) => {
    if (e.target === modalOverlay) {
        modalOverlay.classList.remove("popup-tampil");
    }
});
```

### 4. Form Handling
```javascript
// Form submission
form.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Get input values
    var inputValue = document.getElementById("inputId").value;
    
    // Create object
    var newItem = {
        field1: value1,
        field2: value2
    };
    
    // Add to array
    dataArray.push(newItem);
    
    // Update display
    updateDisplay();
    
    // Reset form and close modal
    form.reset();
    modal.style.display = "none";
});
```

### 5. Dynamic Content Display
```javascript
function displayData() {
    container.innerHTML = "";
    dataArray.forEach(function(item, index) {
        var li = document.createElement("li");
        li.textContent = (index + 1) + ". " + item.field1 + " - " + item.field2;
        container.appendChild(li);
    });
}
```

## Struktur Data Aplikasi Barang

Aplikasi menggunakan array of objects untuk menyimpan data:
```javascript
var databarang = [
    {
        kode: "BRG001",
        nama: "Produk A",
        harga: 15000
    }
];
```

## Event Handling

### Modal Events
- `click` pada tombol buka - Membuka modal
- `click` pada tombol tutup - Menutup modal
- `click` pada overlay - Menutup modal (jika klik di luar konten)

### Form Events
- `submit` - Menangani submit form
- `preventDefault()` - Mencegah form refresh default
- `reset()` - Reset form setelah submit

## CSS Techniques

### Modal Overlay
- `position: fixed` - Fixed positioning untuk overlay
- `z-index` - Layering control
- `rgba()` - Transparansi background
- `display: flex` - Centering content dengan flexbox

### Modal Content
- `max-width` - Responsive width
- `border-radius` - Rounded corners
- `box-shadow` - Drop shadow effect
- `position: relative` - Context untuk absolute positioned elements

### Close Button
- `position: absolute` - Absolute positioning
- `cursor: pointer` - Pointer cursor
- `&times;` - Multiplication symbol (X)
- `:hover` pseudo-class untuk visual feedback

## Teknologi yang Digunakan

- HTML5 - Struktur modal dan form
- CSS3 - Styling dan layout dengan flexbox
- JavaScript ES6+ - Event handling dan data manipulation
- DOM API - Element creation dan manipulation

## Prasyarat

- Memahami konsep dasar HTML, CSS, JavaScript
- Pengetahuan tentang DOM manipulation
- Familiar dengan event handling (pertemuan_5)
- Browser modern

## Tips Pembelajaran

1. Pahami struktur dasar modal HTML
2. Pelajari cara centering dengan flexbox
3. Eksperimen dengan different overlay transparencies
4. Pahami event delegation untuk click outside
5. Perhatikan preventDefault() pada form submission
6. Gunakan console.log() untuk debugging data array
7. Eksperimen dengan form validation

## Browser DevTools

Gunakan Console untuk:
```javascript
// Debug modal state
console.log(modalOverlay.classList);

// Debug data array
console.log(databarang);

// Monitor event
monitorEvents(modalOverlay);
```

---

**Dibuat untuk pembelajaran Modal Pop-up dan Form Handling**
