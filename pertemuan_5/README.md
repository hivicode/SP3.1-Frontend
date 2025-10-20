# Pertemuan 5 - Event Handling in JavaScript

Latihan penggunaan berbagai jenis event dalam JavaScript, termasuk event click, mouse, keyboard, change, form, dan custom events.

## 📁 Daftar File

### Program Utama
- **program_penjualan_motor.html** - Program penjualan motor lengkap dengan semua jenis event handling

### File Pembelajaran Per Event Type

1. **1_event_click.html** - Event Click
   - Click event pada button
   - Double click event
   - Right click (context menu)
   - Click counter
   - Event logging

2. **2_event_mouse.html** - Event Mouse
   - MouseOver & MouseOut
   - MouseEnter & MouseLeave
   - MouseMove (tracking posisi mouse)
   - MouseDown & MouseUp
   - Mouse wheel event

3. **3_event_keyboard.html** - Event Keyboard
   - KeyDown, KeyUp, KeyPress
   - Keyboard shortcuts (Ctrl+S, Ctrl+D, Esc)
   - Key display (menampilkan key yang ditekan)
   - Text counter (karakter & kata)
   - Modifier keys detection

4. **4_event_change.html** - Event Change
   - Select dropdown change
   - Input text change
   - Checkbox change
   - Radio button change
   - File input change
   - Range slider change
   - Color picker change
   - Date picker change

5. **5_event_form.html** - Event Form
   - Form submit
   - Form reset
   - Focus & Blur events
   - Input event (real-time)
   - Form validation
   - Invalid event
   - Field status indicators

6. **6_event_custom.html** - Custom Events
   - Membuat custom event sederhana
   - Custom event dengan data (CustomEvent)
   - Event bubbling pada custom event
   - Shopping cart system menggunakan custom events
   - Event communication antar komponen

## 🎯 Konsep yang Dipelajari

### 1. Event Click
- `click` - Saat elemen diklik
- `dblclick` - Double click
- `contextmenu` - Right click

### 2. Event Mouse
- `mouseover` - Mouse masuk ke elemen
- `mouseout` - Mouse keluar dari elemen
- `mouseenter` - Mouse memasuki elemen (tidak bubble)
- `mouseleave` - Mouse meninggalkan elemen (tidak bubble)
- `mousemove` - Mouse bergerak di dalam elemen
- `mousedown` - Tombol mouse ditekan
- `mouseup` - Tombol mouse dilepas
- `wheel` - Mouse wheel di-scroll

### 3. Event Keyboard
- `keydown` - Tombol keyboard ditekan
- `keyup` - Tombol keyboard dilepas
- `keypress` - Tombol keyboard ditekan (deprecated)
- Properties: `e.key`, `e.code`, `e.keyCode`
- Modifier keys: `e.ctrlKey`, `e.shiftKey`, `e.altKey`, `e.metaKey`

### 4. Event Change
- `change` - Nilai input berubah (setelah kehilangan focus)
- `input` - Nilai input berubah (real-time)
- Bekerja pada: select, input, textarea, checkbox, radio

### 5. Event Form
- `submit` - Form di-submit
- `reset` - Form di-reset
- `focus` - Elemen mendapat focus
- `blur` - Elemen kehilangan focus
- `focusin` - Focus event yang bubble
- `focusout` - Blur event yang bubble
- `invalid` - Validasi form gagal

### 6. Custom Events
- `new Event('eventName')` - Event sederhana
- `new CustomEvent('eventName', { detail: data })` - Event dengan data
- `element.dispatchEvent(event)` - Trigger event
- `bubbles: true` - Mengaktifkan event bubbling

## 💡 Fitur Program Penjualan Motor

Program penjualan motor mencakup:

1. **Event Click**
   - Button "Proses" untuk menghitung total
   - Button "Reset" untuk clear form
   - Click pada table rows

2. **Event Mouse**
   - Hover effects pada input fields
   - Mouse enter/leave logging
   - Hover pada checkbox/radio items

3. **Event Keyboard**
   - Keyboard event tracking pada input
   - Shortcuts: Ctrl+Enter (submit), Ctrl+R (reset)
   - Real-time input monitoring

4. **Event Change**
   - Select dropdown untuk merk motor
   - Checkbox untuk aksesoris
   - Radio button untuk cara pembayaran
   - Auto-calculation saat ada perubahan

5. **Event Form**
   - Form submission dengan validasi
   - Focus/blur visual feedback
   - Form reset handling

6. **Custom Events**
   - `priceCalculated` - Dipanggil saat harga dihitung
   - `purchaseComplete` - Dipanggil saat pembelian selesai
   - Event log untuk monitoring

## 🚀 Cara Menggunakan

1. Buka salah satu file HTML di browser
2. Interaksi dengan elemen di halaman
3. Perhatikan Event Log untuk melihat event yang terjadi
4. Pelajari source code untuk memahami implementasi

## 📝 Logika Bisnis Program Motor

- **Harga Motor:**
  - Honda: Rp 15.000.000
  - Yamaha: Rp 14.000.000
  - Suzuki: Rp 13.000.000

- **Harga Aksesoris:**
  - Velg Racing: Rp 450.000
  - Helm: Rp 250.000
  - Jaket: Rp 300.000

- **Cara Pembayaran:**
  - Tunai: Diskon 10%
  - Kredit: Bunga 15%

- **Perhitungan:**
  1. Total = Harga Motor + Total Aksesoris
  2. Jika Tunai: Final = Total - (Total × 10%)
  3. Jika Kredit: Final = Total + (Total × 15%)

## 🎓 Tips Pembelajaran

1. Mulai dari file event individu (1-6) untuk memahami setiap konsep
2. Pelajari event log untuk melihat urutan dan flow event
3. Eksperimen dengan mengubah kode
4. Gunakan browser DevTools Console untuk debugging
5. Perhatikan perbedaan antara event yang bubble dan tidak
6. Pahami kapan menggunakan `change` vs `input` event

## 🔍 Browser DevTools

Gunakan Console untuk:
```javascript
// Melihat semua event listeners pada elemen
getEventListeners(document.getElementById('elementId'))

// Monitor event
monitorEvents(document.getElementById('elementId'))

// Stop monitoring
unmonitorEvents(document.getElementById('elementId'))
```

## 📚 Referensi

- [MDN - Introduction to Events](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events)
- [MDN - Event Reference](https://developer.mozilla.org/en-US/docs/Web/Events)
- [MDN - CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent)

---

**Dibuat untuk pembelajaran JavaScript Event Handling**
