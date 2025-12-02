const kotaData = {
    'Banyuwangi': 'BW',
    'Jember': 'JM', 
    'Probolinggo': 'PB',
    'Surabaya': 'SB'
};

const biayaBerat = {
    1: 1500,
    5: 2500,
    10: 3500,
    'above': 4500
};

const biayaJarak = {
    'Banyuwangi': {
        'Banyuwangi': 5000,
        'Jember': 7500,
        'Probolinggo': 10000,
        'Surabaya': 15000
    },
    'Jember': {
        'Banyuwangi': 7500,
        'Jember': 5000,
        'Probolinggo': 8500,
        'Surabaya': 12500
    },
    'Probolinggo': {
        'Banyuwangi': 10000,
        'Jember': 8500,
        'Probolinggo': 5000,
        'Surabaya': 6500
    },
    'Surabaya': {
        'Banyuwangi': 15000,
        'Jember': 12500,
        'Probolinggo': 6500,
        'Surabaya': 5000
    }
};

function loadKotaData() {
    const kotaAsalSelect = document.getElementById('kotaAsal');
    const kotaTujuanSelect = document.getElementById('kotaTujuan');
    
    for (const kota in kotaData) {
        const optionAsal = document.createElement('option');
        optionAsal.value = kota;
        optionAsal.textContent = kota;
        kotaAsalSelect.appendChild(optionAsal);
        
        const optionTujuan = document.createElement('option');
        optionTujuan.value = kota;
        optionTujuan.textContent = kota;
        kotaTujuanSelect.appendChild(optionTujuan);
    }
}

function calculateWeightCost(weight) {
    const berat = parseFloat(weight);
    
    if (isNaN(berat) || berat <= 0) {
        return 0;
    }
    
    if (berat <= 1) {
        return biayaBerat[1];
    } else if (berat <= 5) {
        return biayaBerat[5];
    } else if (berat <= 10) {
        return biayaBerat[10];
    } else {
        return biayaBerat['above'];
    }
}

function calculateDistanceCost(origin, destination) {
    if (!origin || !destination || !biayaJarak[origin] || !biayaJarak[origin][destination]) {
        return 0;
    }
    
    return biayaJarak[origin][destination];
}

function calculateTotalCost() {
    const berat = document.getElementById('berat').value;
    const kotaAsal = document.getElementById('kotaAsal').value;
    const kotaTujuan = document.getElementById('kotaTujuan').value;
    const totalBiayaElement = document.getElementById('totalBiaya');
    
    const biayaBeratValue = calculateWeightCost(berat);
    const biayaJarakValue = calculateDistanceCost(kotaAsal, kotaTujuan);
    const totalBiaya = biayaBeratValue + biayaJarakValue;
    
    totalBiayaElement.textContent = totalBiaya.toLocaleString('id-ID');
    
    if (totalBiaya > 0) {
        totalBiayaElement.style.color = '#4CAF50';
    } else {
        totalBiayaElement.style.color = '#666';
    }
}

function validateWeight() {
    const beratInput = document.getElementById('berat');
    const berat = parseFloat(beratInput.value);
    
    if (isNaN(berat) || berat <= 0) {
        beratInput.style.borderColor = '#f44336';
        return false;
    } else {
        beratInput.style.borderColor = '#ddd';
        return true;
    }
}

function setupEventListeners() {
    document.getElementById('berat').addEventListener('input', function() {
        if (validateWeight()) {
            calculateTotalCost();
        }
    });
    
    document.getElementById('kotaAsal').addEventListener('change', function() {
        calculateTotalCost();
    });
    
    document.getElementById('kotaTujuan').addEventListener('change', function() {
        calculateTotalCost();
    });
    
    document.getElementById('resi').addEventListener('input', function() {
        const resi = this.value;
        if (resi.length > 0) {
            this.style.borderColor = '#4CAF50';
        } else {
            this.style.borderColor = '#ddd';
        }
    });
}

function initializeApp() {
    loadKotaData();
    setupEventListeners();
    calculateTotalCost();
}

document.addEventListener('DOMContentLoaded', initializeApp);
