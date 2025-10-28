var kategori = "";
var namaBarang = "";
var hargaSatuan = 0;
var jumlah = 1;
var jenisPenjualan = "";
var isMainItem = false;

var modalKategori = document.getElementById("modalKategori");
var modalPC = document.getElementById("modalPC");
var modalAksesoris = document.getElementById("modalAksesoris");
var modalJenisPenjualan = document.getElementById("modalJenisPenjualan");

var btnKategori = document.getElementById("btnKategori");
var btnNamaBarang = document.getElementById("btnNamaBarang");
var btnJenisPenjualan = document.getElementById("btnJenisPenjualan");

var inputKategori = document.getElementById("kategori");
var inputNamaBarang = document.getElementById("namaBarang");
var inputHargaSatuan = document.getElementById("hargaSatuan");
var inputJumlah = document.getElementById("jumlah");
var inputJenisPenjualan = document.getElementById("jenisPenjualan");
var inputTotalPenjualan = document.getElementById("totalPenjualan");
var inputDiskon = document.getElementById("diskon");
var inputPajak = document.getElementById("pajak");
var inputHargaTotal = document.getElementById("hargaTotal");

var btnHitung = document.getElementById("btnHitung");
var btnReset = document.getElementById("btnReset");

var allModals = [modalKategori, modalPC, modalAksesoris, modalJenisPenjualan];

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

btnKategori.onclick = function() {
    openModal(modalKategori);
};

var kategoriOptions = modalKategori.getElementsByClassName("option");
for (var i = 0; i < kategoriOptions.length; i++) {
    kategoriOptions[i].onclick = function() {
        kategori = this.getAttribute("data-value");
        inputKategori.value = kategori;
        
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

var aksesorisCheckboxes = modalAksesoris.querySelectorAll('input[type="checkbox"]');
var selectedAksesoris = [];
var selectedHarga = 0;

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

btnJenisPenjualan.onclick = function() {
    openModal(modalJenisPenjualan);
};

var jenisCheckboxes = modalJenisPenjualan.querySelectorAll('input[type="checkbox"]');
for (var i = 0; i < jenisCheckboxes.length; i++) {
    jenisCheckboxes[i].onchange = function() {
        var checked = modalJenisPenjualan.querySelectorAll('input[type="checkbox"]:checked');
        if (checked.length > 0) {
            jenisPenjualan = checked[0].value;
            inputJenisPenjualan.value = jenisPenjualan;
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

inputJumlah.onchange = function() {
    jumlah = parseInt(this.value) || 1;
};

function formatCurrency(value) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function calculate() {
    jumlah = parseInt(inputJumlah.value) || 1;
    
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
    
    var hargaTotal = totalPenjualan - diskon + pajak;
    inputHargaTotal.value = formatCurrency(hargaTotal);
}

btnHitung.onclick = function() {
    if (kategori === "" || namaBarang === "" || jenisPenjualan === "") {
        alert("Lengkapi semua data terlebih dahulu!");
        return;
    }
    calculate();
};

btnReset.onclick = function() {
    if (confirm("Apakah anda yakin ingin reset semua data?")) {
        kategori = "";
        namaBarang = "";
        hargaSatuan = 0;
        jumlah = 1;
        jenisPenjualan = "";
        isMainItem = false;
        
        inputKategori.value = "";
        inputNamaBarang.value = "";
        inputHargaSatuan.value = "";
        inputJumlah.value = "1";
        inputJenisPenjualan.value = "";
        inputTotalPenjualan.value = "";
        inputDiskon.value = "";
        inputPajak.value = "";
        inputHargaTotal.value = "";
        
        var allRadios = modalPC.querySelectorAll('input[type="radio"]');
        for (var i = 0; i < allRadios.length; i++) {
            allRadios[i].checked = false;
        }
        
        var allCheckboxes = modalAksesoris.querySelectorAll('input[type="checkbox"]');
        for (var i = 0; i < allCheckboxes.length; i++) {
            allCheckboxes[i].checked = false;
        }
        
        allCheckboxes = modalJenisPenjualan.querySelectorAll('input[type="checkbox"]');
        for (var i = 0; i < allCheckboxes.length; i++) {
            allCheckboxes[i].checked = false;
        }
    }
};
