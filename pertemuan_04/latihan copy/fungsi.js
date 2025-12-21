let dataBarang = [
    {nama: "Buku tulis", harga: 5000},
    {nama: "Pensil", harga: 2000},
    {nama: "Pulpen", harga: 3000}
];

let filteredData = [...dataBarang];

function loadFromStorage() {
    const saved = localStorage.getItem('productData');
    if (saved) {
        dataBarang = JSON.parse(saved);
        filteredData = [...dataBarang];
    }
}

function saveToStorage() {
    localStorage.setItem('productData', JSON.stringify(dataBarang));
}

function showBarang(dataToShow = filteredData) {
    const listBarang = document.getElementById("list-barang");
    listBarang.innerHTML = "";
    
    if (dataToShow.length === 0) {
        listBarang.innerHTML = '<li class="empty-state">No products found. Add some products to get started! 🛍️</li>';
        updateStats();
        return;
    }
    
    dataToShow.forEach((item, index) => {
        const originalIndex = dataBarang.findIndex(p => p.nama === item.nama && p.harga === item.harga);
        const listItem = document.createElement('li');
        listItem.className = 'product-item';
        listItem.innerHTML = `
            <div class="product-info">
                <div class="product-name">${item.nama}</div>
                <div class="product-price">Rp ${item.harga.toLocaleString()}</div>
            </div>
            <div class="product-actions">
                <button class="btn-edit" onclick="editBarang(${originalIndex})">✏️ Edit</button>
                <button class="btn-delete" onclick="hapusBarang(${originalIndex})">🗑️ Delete</button>
            </div>
        `;
        listBarang.appendChild(listItem);
    });
    
    updateStats();
}

function addBarang() {
    const namaBarang = document.querySelector("input[name=barang]").value.trim();
    const hargaBarang = parseInt(document.querySelector("input[name=harga]").value);
    
    if (namaBarang === "" || isNaN(hargaBarang) || hargaBarang < 0) {
        showNotification("Please fill in valid product name and price!", "error");
        return;
    }
    
    if (dataBarang.some(item => item.nama.toLowerCase() === namaBarang.toLowerCase())) {
        showNotification("Product with this name already exists!", "warning");
        return;
    }
    
    dataBarang.push({nama: namaBarang, harga: hargaBarang});
    filteredData = [...dataBarang];
    
    document.querySelector("input[name=barang]").value = "";
    document.querySelector("input[name=harga]").value = "";
    
    saveToStorage();
    showBarang();
    showNotification(`Product "${namaBarang}" added successfully!`, "success");
}

function editBarang(id) {
    const product = dataBarang[id];
    const newNama = prompt("Edit product name:", product.nama);
    
    if (newNama !== null && newNama.trim() !== "") {
        const newHarga = prompt("Edit product price:", product.harga);
        if (newHarga !== null && !isNaN(newHarga) && parseInt(newHarga) >= 0) {
            const existingProduct = dataBarang.find((item, index) => 
                index !== id && item.nama.toLowerCase() === newNama.toLowerCase()
            );
            
            if (existingProduct) {
                showNotification("Product with this name already exists!", "warning");
                return;
            }
            
            dataBarang[id].nama = newNama.trim();
            dataBarang[id].harga = parseInt(newHarga);
            filteredData = [...dataBarang];
            
            saveToStorage();
            showBarang();
            showNotification(`Product "${newNama}" updated successfully!`, "success");
        }
    }
}

function hapusBarang(id) {
    const productName = dataBarang[id].nama;
    if (confirm(`Are you sure you want to delete "${productName}"?`)) {
        dataBarang.splice(id, 1);
        filteredData = [...dataBarang];
        
        saveToStorage();
        showBarang();
        showNotification(`Product "${productName}" deleted successfully!`, "success");
    }
}

function searchProducts() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    filteredData = dataBarang.filter(item => 
        item.nama.toLowerCase().includes(searchTerm)
    );
    showBarang();
}

function sortProducts() {
    const sortValue = document.getElementById("sortSelect").value;
    const [field, direction] = sortValue.split('-');
    
    filteredData.sort((a, b) => {
        let comparison = 0;
        
        if (field === 'name') {
            comparison = a.nama.localeCompare(b.nama);
        } else if (field === 'price') {
            comparison = a.harga - b.harga;
        }
        
        return direction === 'desc' ? -comparison : comparison;
    });
    
    showBarang();
}

function updateStats() {
    const totalProducts = document.getElementById("totalProducts");
    const totalValue = document.getElementById("totalValue");
    const averagePrice = document.getElementById("averagePrice");
    const highestPrice = document.getElementById("highestPrice");
    
    const total = dataBarang.length;
    const totalVal = dataBarang.reduce((sum, item) => sum + item.harga, 0);
    const avg = total > 0 ? totalVal / total : 0;
    const highest = total > 0 ? Math.max(...dataBarang.map(item => item.harga)) : 0;
    
    totalProducts.textContent = total;
    totalValue.textContent = `Rp ${totalVal.toLocaleString()}`;
    averagePrice.textContent = `Rp ${Math.round(avg).toLocaleString()}`;
    highestPrice.textContent = `Rp ${highest.toLocaleString()}`;
}

function showNotification(message, type = "info") {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: bold;
        z-index: 1000;
        animation: slideIn 0.3s ease-out;
    `;
    
    const colors = {
        success: '#4CAF50',
        error: '#f44336',
        warning: '#ff9800',
        info: '#2196F3'
    };
    
    notification.style.backgroundColor = colors[type] || colors.info;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

document.addEventListener('DOMContentLoaded', function() {
    loadFromStorage();
    showBarang();
    
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});