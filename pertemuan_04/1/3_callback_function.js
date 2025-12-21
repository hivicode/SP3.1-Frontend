const tampilkanhasil = (hasil) => alert('Hasil = ${hasil}');

const penjumlahan = (a, b, display) => {
    let hasil = a + b;
    display(hasil);
}

penjumlahan(10, 20, tampilkanhasil);

penjumlahan(10, 20, (hasil) => alert('Hasilnya adalah = ${hasil}'));