var dataBarang = [
    {nama: "Buku tulis", harga: 5000},
    {nama: "Pensil", harga: 2000},
    {nama: "Pulpen", harga: 3000}
];

function showBarang(){
    var listBarang = document.getElementById("list-barang");
    //clear list barang
    listBarang.innerHTML = "";
    //looping data barang
    for(let i = 0; i < dataBarang.length; i++){
        var btnEdit = "<a href='#' onclick='editBarang(" + i + ")'>Edit</a>";
        var btnHapus = "<a href='#' onclick='hapusBarang(" + i + ")'>Hapus</a>";
        listBarang.innerHTML += "<li>" + dataBarang[i].nama + " - Rp " + dataBarang[i].harga.toLocaleString() + " - " + btnEdit + " - " + btnHapus + "</li>";
    }
}

function addBarang(){
    var namaBarang = document.querySelector("input[name=barang]").value;
    var hargaBarang = parseInt(document.querySelector("input[name=harga]").value);
    
    if(namaBarang.trim() === "" || isNaN(hargaBarang) || hargaBarang < 0){
        alert("Mohon isi nama barang dan harga dengan benar!");
        return;
    }
    
    dataBarang.push({nama: namaBarang, harga: hargaBarang});
    document.querySelector("input[name=barang]").value = "";
    document.querySelector("input[name=harga]").value = "";
    showBarang();
}

function editBarang(id){
    var newNama = prompt("Edit nama barang:", dataBarang[id].nama);
    if(newNama !== null && newNama.trim() !== ""){
        var newHarga = prompt("Edit harga barang:", dataBarang[id].harga);
        if(newHarga !== null && !isNaN(newHarga) && parseInt(newHarga) >= 0){
            dataBarang[id].nama = newNama;
            dataBarang[id].harga = parseInt(newHarga);
            showBarang();
        }
    }
}

function hapusBarang(id){
    dataBarang.splice(id, 1);
    showBarang();
}

showBarang();