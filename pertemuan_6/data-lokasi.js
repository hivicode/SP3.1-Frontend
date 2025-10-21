const dataLokasi = {
    asia: ["Jepang", "Indonesia", "Malaysia"],
    eropa: ["Jerman", "Italia", "Spanyol"],
    amerika: ["Amerika Serikat", "Kanada", "Mexico"]
};

function inisialisasiBenua() {
   const selectBenua = document.getElementById('benua');

   let defaultOption = document.createElement('option');
   defaultOption.text = 'Pilih Benua';
   defaultOption.value = '';
   selectBenua.appendChild(defaultOption);

   for (const benua in dataLokasi) {
    let option = document.createElement('option');
    option.value = benua;
    option.textContent = benua.charAt(0).toUpperCase() + benua.slice(1);
    selectBenua.appendChild(option);
   }
}

function updateNegara() {
    const selectBenua = document.getElementById('benua');
    const selectNegara = document.getElementById('negara');
    const hasilElement = document.getElementById('hasil');

    const benua = selectBenua.value;

    selectNegara.innerHTML = '';
    hasilElement.textContent = '';

    if (benua) {
        let defaultOption = document.createElement('option');
        defaultOption.text = 'Pilih Negara';
        defaultOption.value = '';
        selectNegara.appendChild(defaultOption);

        const negaraArray = dataLokasi[benua];
        negaraArray.forEach(negara => {
            let option = document.createElement('option');
            option.text = negara.charAt(0).toUpperCase() + negara.slice(1);
            option.value = negara;
            selectNegara.appendChild(option);
        });

        selectNegara.onchange = tampilkanHasil;

    } else {
        let defaultOption = document.createElement('option');
        defaultOption.text = 'Pilih Benua Terlebih Dahulu';
        defaultOption.value = '';
        selectNegara.appendChild(defaultOption);
    }
}

function tampilkanHasil() {
    const selectBenua = document.getElementById('benua');
    const selectNegara = document.getElementById('negara');
    const hasilElement = document.getElementById('hasil');
    const benuaTeks = selectBenua.options[selectBenua.selectedIndex].textContent;
    const negaraTeks = selectNegara.options[selectNegara.selectedIndex].textContent;

    if (selectNegara.value) {
        hasilElement.textContent = `Anda memilih: ${negaraTeks} yang terletak di ${benuaTeks}`;
        hasilElement.style.color = 'green';
    } else {
        hasilElement.textContent = 'Pilih Terlebih Dahulu';
        hasilElement.style.color = 'orange';
    }
}

document.addEventListener('DOMContentLoaded', inisialisasiBenua);