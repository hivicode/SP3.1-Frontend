function jumlahkansemuanya (...bilangan) {
    let total = 0;
    for (let bil of bilangan) {
        total += bil;
    }
    return total;
}

let hasil = jumlahkansemuanya(1, 2, 3, 4, 5);
let hasil2 = jumlahkansemuanya(10, 20, 30, 40, 50);

alert(hasil);
alert(hasil2);