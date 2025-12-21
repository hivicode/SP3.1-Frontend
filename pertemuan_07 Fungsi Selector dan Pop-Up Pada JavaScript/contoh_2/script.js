var databarang = [];

var modal = document.getElementById("popupModal");
var btnBuka = document.getElementById("bukaFormulir");
var spanTutup = document.getElementsByClassName("tutup")[0];
var form = document.getElementById("formbarang");
var daftar = document.getElementById("daftarbarang");

function tampilkanData() {
    daftar.innerHTML = "";
    databarang.forEach(function(barang, index) {
        var li = document.createElement("li");
        li.textContent = (index + 1) + ". Kode Barang: " + barang.kode + " - Nama Barang: " + barang.nama + " - Harga Barang: " + barang.harga;
        daftar.appendChild(li);
    });
}

btnBuka.onclick = function() {
    modal.style.display = "block";
}

spanTutup.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    var kodeInput = document.getElementById("kode").value;
    var namaInput = document.getElementById("nama").value;
    var hargaInput = document.getElementById("harga").value;

    var barangbaru = {
        kode: kodeInput,
        nama: namaInput,
        harga: hargaInput
    };

    databarang.push(barangbaru);

    tampilkanData();

    form.reset();
    modal.style.display = "none";
    console.log("Data tersimpan:", databarang);
});

tampilkanData();