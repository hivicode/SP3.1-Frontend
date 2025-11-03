/* ==========================================================================
   STATE & DATA MODEL
   - Menyimpan state aplikasi dan struktur data barang
   ========================================================================== */
var kategori = "";
var namaBarang = "";
var hargaSatuan = 0;
var jumlah = 1;
var jenisPenjualan = "";
var isMainItem = false;
var barangData = {pc: [], aksesoris: []};
var hargaTotal = 0;

/* ==========================================================================
   MODAL REFERENCES
   - Referensi elemen modal yang dipakai
   ========================================================================== */
var modalKategori = document.getElementById("modalKategori");
var modalPC = document.getElementById("modalPC");
var modalAksesoris = document.getElementById("modalAksesoris");
var modalJenisPenjualan = document.getElementById("modalJenisPenjualan");
var modalHistory = document.getElementById("modalHistory");

/* ==========================================================================
   ACTION BUTTONS
   - Tombol aksi utama
   ========================================================================== */
var btnKategori = document.getElementById("btnKategori");
var btnNamaBarang = document.getElementById("btnNamaBarang");
var btnJenisPenjualan = document.getElementById("btnJenisPenjualan");
var btnHitung = document.getElementById("btnHitung");
var btnSimpan = document.getElementById("btnSimpan");
var btnReset = document.getElementById("btnReset");
var btnHistory = document.getElementById("btnHistory");
var btnClearHistory = document.getElementById("btnClearHistory");

/* ==========================================================================
   FORM INPUTS
   - Referensi input form utama
   ========================================================================== */
var inputKategori = document.getElementById("kategori");
var inputNamaBarang = document.getElementById("namaBarang");
var inputHargaSatuan = document.getElementById("hargaSatuan");
var inputJumlah = document.getElementById("jumlah");
var inputJenisPenjualan = document.getElementById("jenisPenjualan");
var inputTotalPenjualan = document.getElementById("totalPenjualan");
var inputDiskon = document.getElementById("diskon");
var inputPajak = document.getElementById("pajak");
var inputHargaTotal = document.getElementById("hargaTotal");
var inputBayar = document.getElementById("bayar");
var inputKembalian = document.getElementById("kembalian");

/* ==========================================================================
   SECTIONS & LISTS
   - Section pembayaran dan daftar history
   ========================================================================== */
var pembayaranSection = document.getElementById("pembayaranSection");
var historyList = document.getElementById("historyList");

/* ==========================================================================
   MODAL UTILS
   - Helper untuk buka/tutup modal dan daftar semua modal
   ========================================================================== */
var allModals = [modalKategori, modalPC, modalAksesoris, modalJenisPenjualan, modalHistory];

function openModal(modal) {
    modal.style.display = "block";
}

function closeModal(modal) {
    modal.style.display = "none";
}

allModals.forEach(function(modal) {
    modal.addEventListener("click", function(event) {
        if (event.target === modal) {
            closeModal(modal);
        }
    });
    
    var closeBtn = modal.getElementsByClassName("tutup")[0];
    if (closeBtn) {
        closeBtn.onclick = function() {
            closeModal(modal);
        };
    }
});

/* ==========================================================================
   DATA LOADING
   - Memuat data barang dari data.json
   ========================================================================== */
function loadBarangData() {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "data.json", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            barangData = JSON.parse(xhr.responseText);
            renderBarangData();
        }
    };
    xhr.send();
}

/* ==========================================================================
   RENDER OPTIONS
   - Render opsi barang ke dalam modal dari data yang dimuat
   ========================================================================== */
function renderBarangData() {
    var pcRadioGroup = modalPC.querySelector(".radio-group");
    var aksesorisCheckboxGroup = modalAksesoris.querySelector(".checkbox-group");
    
    pcRadioGroup.innerHTML = "";
    barangData.pc.forEach(function(item) {
        var label = document.createElement("label");
        var radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "pc";
        radio.value = item.nama;
        radio.setAttribute("data-harga", item.harga);
        label.appendChild(radio);
        label.appendChild(document.createTextNode(" " + item.nama + " - Rp. " + formatCurrency(item.harga)));
        pcRadioGroup.appendChild(label);
    });
    
    aksesorisCheckboxGroup.innerHTML = "";
    barangData.aksesoris.forEach(function(item) {
        var label = document.createElement("label");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = "aksesoris";
        checkbox.value = item.nama;
        checkbox.setAttribute("data-harga", item.harga);
        label.appendChild(checkbox);
        label.appendChild(document.createTextNode(" " + item.nama + " - Rp. " + formatCurrency(item.harga)));
        aksesorisCheckboxGroup.appendChild(label);
    });
    
    setupEventListeners();
}

/* ==========================================================================
   OPTION EVENT BINDINGS
   - Binding event untuk radio/checkbox barang
   ========================================================================== */
function setupEventListeners() {
    var pcRadios = modalPC.querySelectorAll('input[type="radio"]');
    for (var i = 0; i < pcRadios.length; i++) {
        pcRadios[i].onchange = function() {
            namaBarang = this.value;
            hargaSatuan = parseInt(this.getAttribute("data-harga"));
            inputNamaBarang.value = namaBarang;
            inputHargaSatuan.value = formatCurrency(hargaSatuan);
            isMainItem = true;
        };
    }
    
    var aksesorisCheckboxes = modalAksesoris.querySelectorAll('input[type="checkbox"]');
    for (var i = 0; i < aksesorisCheckboxes.length; i++) {
        aksesorisCheckboxes[i].onchange = function() {
            selectedAksesoris = [];
            selectedHarga = 0;
            
            var checked = modalAksesoris.querySelectorAll('input[type="checkbox"]:checked');
            for (var j = 0; j < checked.length; j++) {
                var value = checked[j].value;
                var harga = parseInt(checked[j].getAttribute("data-harga"));
                selectedAksesoris.push(value);
                selectedHarga += harga;
            }
            
            namaBarang = selectedAksesoris.join(", ");
            hargaSatuan = selectedHarga;
            inputNamaBarang.value = namaBarang;
            inputHargaSatuan.value = formatCurrency(hargaSatuan);
            isMainItem = false;
        };
    }
}

var selectedAksesoris = [];
var selectedHarga = 0;

loadBarangData();

/* ==========================================================================
   OPEN MODALS
   - Handler membuka modal kategori/nama barang
   ========================================================================== */
btnKategori.onclick = function() {
    openModal(modalKategori);
};

var kategoriOptions = modalKategori.getElementsByClassName("option");
for (var i = 0; i < kategoriOptions.length; i++) {
    kategoriOptions[i].onclick = function() {
        kategori = this.getAttribute("data-value");
        inputKategori.value = kategori;
        // Reset dependent fields when category changes
        namaBarang = "";
        hargaSatuan = 0;
        isMainItem = false;
        jumlah = 1;
        jenisPenjualan = "";
        hargaTotal = 0;
        selectedAksesoris = [];
        selectedHarga = 0;
        
        inputNamaBarang.value = "";
        inputHargaSatuan.value = "";
        inputJumlah.value = "1";
        inputJenisPenjualan.value = "";
        inputTotalPenjualan.value = "";
        inputDiskon.value = "";
        inputPajak.value = "";
        inputHargaTotal.value = "";
        if (inputBayar) inputBayar.value = "";
        if (inputKembalian) inputKembalian.value = "";
        if (pembayaranSection) pembayaranSection.style.display = "none";
        if (btnSimpan) btnSimpan.style.display = "none";
        
        // Uncheck all selections in item and jenis modals
        var allPCRadios = modalPC.querySelectorAll('input[type="radio"]');
        for (var r = 0; r < allPCRadios.length; r++) allPCRadios[r].checked = false;
        var allAksesoris = modalAksesoris.querySelectorAll('input[type="checkbox"]');
        for (var c = 0; c < allAksesoris.length; c++) allAksesoris[c].checked = false;
        var allJenisRadios = modalJenisPenjualan.querySelectorAll('input[type="radio"]');
        for (var j = 0; j < allJenisRadios.length; j++) allJenisRadios[j].checked = false;
        
        var btnSave = modalKategori.getElementsByClassName("btn-simpan")[0];
        btnSave.onclick = function() {
            closeModal(modalKategori);
        };
    };
}

btnNamaBarang.onclick = function() {
    if (kategori === "PC / LAPTOP") {
        openModal(modalPC);
    } else if (kategori === "AKSESORIS") {
        openModal(modalAksesoris);
    } else {
        alert("Pilih kategori terlebih dahulu!");
    }
};

/* ==========================================================================
   MODAL PC/AKSESORIS ACTIONS
   - Handler simpan/batal pada modal barang
   ========================================================================== */
var btnSavePC = modalPC.getElementsByClassName("btn-simpan")[0];
btnSavePC.onclick = function() {
    if (namaBarang === "") {
        alert("Pilih salah satu PC/Laptop!");
        return;
    }
    closeModal(modalPC);
};

var btnBatalPC = modalPC.getElementsByClassName("btn-batal")[0];
btnBatalPC.onclick = function() {
    closeModal(modalPC);
};

var btnSaveAksesoris = modalAksesoris.getElementsByClassName("btn-simpan")[0];
btnSaveAksesoris.onclick = function() {
    if (selectedAksesoris.length === 0) {
        alert("Pilih setidaknya satu aksesoris!");
        return;
    }
    closeModal(modalAksesoris);
};

var btnBatalAksesoris = modalAksesoris.getElementsByClassName("btn-batal")[0];
btnBatalAksesoris.onclick = function() {
    closeModal(modalAksesoris);
};

/* ==========================================================================
   MODAL JENIS PENJUALAN
   - Handler buka/simpan/batal dan toggle pembayaran
   ========================================================================== */
btnJenisPenjualan.onclick = function() {
    if (jenisPenjualan === "") {
        var radiosToClear = modalJenisPenjualan.querySelectorAll('input[type="radio"]');
        for (var i = 0; i < radiosToClear.length; i++) {
            radiosToClear[i].checked = false;
        }
    }
    openModal(modalJenisPenjualan);
};

var jenisRadios = modalJenisPenjualan.querySelectorAll('input[type="radio"]');
for (var i = 0; i < jenisRadios.length; i++) {
    jenisRadios[i].onchange = function() {
        jenisPenjualan = this.value;
        inputJenisPenjualan.value = jenisPenjualan;
        if (jenisPenjualan === "Tunai") {
            pembayaranSection.style.display = "block";
        } else {
            pembayaranSection.style.display = "none";
            inputBayar.value = "";
            inputKembalian.value = "";
        }
    };
}

var btnSaveJenis = modalJenisPenjualan.getElementsByClassName("btn-simpan")[0];
btnSaveJenis.onclick = function() {
    closeModal(modalJenisPenjualan);
};

var btnBatalJenis = modalJenisPenjualan.getElementsByClassName("btn-batal")[0];
btnBatalJenis.onclick = function() {
    closeModal(modalJenisPenjualan);
};

/* ==========================================================================
   VALIDATION
   - Validasi input jumlah dan bayar
   ========================================================================== */
function validateInput() {
    var isValid = true;
    
    if (parseInt(inputJumlah.value) < 1 || isNaN(parseInt(inputJumlah.value))) {
        inputJumlah.classList.add("input-error");
        isValid = false;
    } else {
        inputJumlah.classList.remove("input-error");
    }
    
    if (jenisPenjualan === "Tunai" && inputBayar.value) {
        var bayarValue = parseNumber(inputBayar.value);
        if (bayarValue < hargaTotal) {
            inputBayar.classList.add("input-error");
            isValid = false;
        } else {
            inputBayar.classList.remove("input-error");
        }
    }
    
    return isValid;
}

/* ==========================================================================
   NUMBER UTILS
   - Helper parsing angka dari string yang sudah diformat
   ========================================================================== */
function parseNumber(str) {
    return parseInt(str.replace(/\./g, "")) || 0;
}

/* ==========================================================================
   FIELD EVENTS
   - Handler perubahan jumlah dan bayar
   ========================================================================== */
inputJumlah.onchange = function() {
    jumlah = parseInt(this.value) || 1;
    if (jumlah < 1) {
        jumlah = 1;
        this.value = "1";
    }
    validateInput();
};

inputJumlah.oninput = function() {
    validateInput();
};

inputBayar.oninput = function() {
    var bayarValue = parseNumber(this.value);
    if (jenisPenjualan === "Tunai" && hargaTotal > 0) {
        if (bayarValue >= hargaTotal) {
            var kembalian = bayarValue - hargaTotal;
            inputKembalian.value = formatCurrency(kembalian);
            this.classList.remove("input-error");
        } else if (this.value) {
            inputKembalian.value = "Kurang: " + formatCurrency(hargaTotal - bayarValue);
            this.classList.add("input-error");
        } else {
            inputKembalian.value = "";
            this.classList.remove("input-error");
        }
    }
};

/* ==========================================================================
   CURRENCY FORMATTER
   - Format angka ke format ribuan (Rp. tanpa simbol)
   ========================================================================== */
function formatCurrency(value) {
    if (value === 0 || value === "") return "0";
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/* ==========================================================================
   CALCULATION
   - Hitung total penjualan, diskon, pajak, dan total akhir
   ========================================================================== */
function calculate() {
    if (kategori === "" || namaBarang === "" || jenisPenjualan === "") {
        return false;
    }
    
    jumlah = parseInt(inputJumlah.value) || 1;
    if (jumlah < 1) {
        jumlah = 1;
        inputJumlah.value = "1";
    }
    
    var totalPenjualan = hargaSatuan * jumlah;
    inputTotalPenjualan.value = formatCurrency(totalPenjualan);
    
    var diskon = 0;
    if (jenisPenjualan === "Tunai") {
        diskon = totalPenjualan * 0.10;
    }
    inputDiskon.value = formatCurrency(diskon);
    
    var pajakRate = isMainItem ? 0.15 : 0.10;
    var pajak = hargaSatuan * pajakRate * jumlah;
    inputPajak.value = formatCurrency(pajak);
    
    hargaTotal = totalPenjualan - diskon + pajak;
    inputHargaTotal.value = formatCurrency(hargaTotal);
    
    if (jenisPenjualan === "Tunai" && inputBayar.value) {
        var bayarValue = parseNumber(inputBayar.value);
        if (bayarValue >= hargaTotal) {
            var kembalian = bayarValue - hargaTotal;
            inputKembalian.value = formatCurrency(kembalian);
        }
    }
    
    validateInput();
    btnSimpan.style.display = hargaTotal > 0 ? "inline-block" : "none";
    
    return true;
}

/* ==========================================================================
   PRIMARY ACTIONS
   - Hitung manual, Simpan transaksi, Tampilkan history, Reset
   ========================================================================== */
btnHitung.onclick = function() {
    if (kategori === "" || namaBarang === "" || jenisPenjualan === "") {
        alert("Lengkapi semua data terlebih dahulu!");
        return;
    }
    if (!validateInput()) {
        alert("Mohon periksa input yang Anda masukkan!");
        return;
    }
    calculate();
};

function saveTransaction() {
    if (kategori === "" || namaBarang === "" || jenisPenjualan === "" || hargaTotal === 0) {
        alert("Data transaksi belum lengkap!");
        return;
    }
    
    var transaction = {
        id: Date.now(),
        tanggal: new Date().toLocaleString("id-ID"),
        kategori: kategori,
        namaBarang: namaBarang,
        hargaSatuan: hargaSatuan,
        jumlah: jumlah,
        jenisPenjualan: jenisPenjualan,
        totalPenjualan: parseNumber(inputTotalPenjualan.value),
        diskon: parseNumber(inputDiskon.value),
        pajak: parseNumber(inputPajak.value),
        hargaTotal: hargaTotal,
        bayar: jenisPenjualan === "Tunai" ? parseNumber(inputBayar.value) : 0,
        kembalian: jenisPenjualan === "Tunai" ? parseNumber(inputKembalian.value) : 0
    };
    
    var history = getHistory();
    history.unshift(transaction);
    if (history.length > 50) {
        history = history.slice(0, 50);
    }
    localStorage.setItem("transactionHistory", JSON.stringify(history));
    
    alert("Transaksi berhasil disimpan!");
    renderHistory();
}

btnSimpan.onclick = function() {
    saveTransaction();
};

/* ==========================================================================
   HISTORY STORAGE
   - Ambil/simpan/bersihkan riwayat transaksi di localStorage
   ========================================================================== */
function getHistory() {
    var stored = localStorage.getItem("transactionHistory");
    return stored ? JSON.parse(stored) : [];
}

function renderHistory() {
    var history = getHistory();
    historyList.innerHTML = "";
    
    if (history.length === 0) {
        historyList.innerHTML = '<div class="history-empty">Belum ada transaksi</div>';
        return;
    }
    
    history.forEach(function(transaction) {
        var item = document.createElement("div");
        item.className = "history-item";
        
        var html = '<div class="history-item-header">';
        html += '<div class="history-item-title">Transaksi #' + transaction.id + '</div>';
        html += '<div class="history-item-date">' + transaction.tanggal + '</div>';
        html += '</div>';
        html += '<div class="history-item-detail"><strong>Kategori:</strong> ' + transaction.kategori + '</div>';
        html += '<div class="history-item-detail"><strong>Barang:</strong> ' + transaction.namaBarang + '</div>';
        html += '<div class="history-item-detail"><strong>Harga Satuan:</strong> Rp. ' + formatCurrency(transaction.hargaSatuan) + '</div>';
        html += '<div class="history-item-detail"><strong>Jumlah:</strong> ' + transaction.jumlah + '</div>';
        html += '<div class="history-item-detail"><strong>Jenis Penjualan:</strong> ' + transaction.jenisPenjualan + '</div>';
        html += '<div class="history-item-detail"><strong>Total Penjualan:</strong> Rp. ' + formatCurrency(transaction.totalPenjualan) + '</div>';
        html += '<div class="history-item-detail"><strong>Diskon:</strong> Rp. ' + formatCurrency(transaction.diskon) + '</div>';
        html += '<div class="history-item-detail"><strong>Pajak:</strong> Rp. ' + formatCurrency(transaction.pajak) + '</div>';
        if (transaction.jenisPenjualan === "Tunai" && transaction.bayar > 0) {
            html += '<div class="history-item-detail"><strong>Bayar:</strong> Rp. ' + formatCurrency(transaction.bayar) + '</div>';
            html += '<div class="history-item-detail"><strong>Kembalian:</strong> Rp. ' + formatCurrency(transaction.kembalian) + '</div>';
        }
        html += '<div class="history-item-total"><strong>Harga Total:</strong> Rp. ' + formatCurrency(transaction.hargaTotal) + '</div>';
        
        item.innerHTML = html;
        historyList.appendChild(item);
    });
}

btnHistory.onclick = function() {
    renderHistory();
    openModal(modalHistory);
};

var btnBatalHistory = modalHistory.getElementsByClassName("btn-batal")[0];
btnBatalHistory.onclick = function() {
    closeModal(modalHistory);
};

btnClearHistory.onclick = function() {
    if (confirm("Apakah Anda yakin ingin menghapus semua history transaksi?")) {
        localStorage.removeItem("transactionHistory");
        renderHistory();
        alert("History transaksi telah dihapus!");
    }
};

btnReset.onclick = function() {
    if (confirm("Apakah anda yakin ingin reset semua data?")) {
        kategori = "";
        namaBarang = "";
        hargaSatuan = 0;
        jumlah = 1;
        jenisPenjualan = "";
        isMainItem = false;
        hargaTotal = 0;
        selectedAksesoris = [];
        selectedHarga = 0;
        
        inputKategori.value = "";
        inputNamaBarang.value = "";
        inputHargaSatuan.value = "";
        inputJumlah.value = "1";
        inputJenisPenjualan.value = "";
        inputTotalPenjualan.value = "";
        inputDiskon.value = "";
        inputPajak.value = "";
        inputHargaTotal.value = "";
        inputBayar.value = "";
        inputKembalian.value = "";
        
        pembayaranSection.style.display = "none";
        btnSimpan.style.display = "none";
        
        var allRadios = modalPC.querySelectorAll('input[type="radio"]');
        for (var i = 0; i < allRadios.length; i++) {
            allRadios[i].checked = false;
        }
        
        var allCheckboxes = modalAksesoris.querySelectorAll('input[type="checkbox"]');
        for (var i = 0; i < allCheckboxes.length; i++) {
            allCheckboxes[i].checked = false;
        }
        
        var jenisRadiosReset = modalJenisPenjualan.querySelectorAll('input[type="radio"]');
        for (var i = 0; i < jenisRadiosReset.length; i++) {
            jenisRadiosReset[i].checked = false;
        }
        
        inputJumlah.classList.remove("input-error");
        inputBayar.classList.remove("input-error");
    }
};
