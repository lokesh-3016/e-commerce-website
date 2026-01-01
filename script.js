const imageMap = {
    macbook: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    dell: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed",
    hp: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef",
    asus: "https://images.unsplash.com/photo-1611078489935-0cb964de46d6",
    lenovo: "https://images.unsplash.com/photo-1593642634367-d91a135587b5",

    iphone: "https://images.unsplash.com/photo-1695048133142-1a20484b42c6",
    samsung: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf",
    pixel: "https://images.unsplash.com/photo-1603898037225-08b4d7a4b47c",
    oneplus: "https://images.unsplash.com/photo-1627637811170-ff47b8c1c20d",
    xiaomi: "https://images.unsplash.com/photo-1622737133809-d95047b9e673",

    sony: "https://images.unsplash.com/photo-1519183071298-a2962eadcdb2",
    canon: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c",
    nikon: "https://images.unsplash.com/photo-1516724562728-afc824a36e84",
    fujifilm: "https://images.unsplash.com/photo-1508898578281-774ac4893a2d",
    panasonic: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
};

function getRelevantImage(name) {
    const n = name.toLowerCase();
    for (let key in imageMap) {
        if (n.includes(key)) {
            return imageMap[key] + "?w=600&q=80";
        }
    }
    return "https://images.unsplash.com/photo-1518770660439-4636190af475";
}

const techData = [
    { type: 'laptop', names: ['MacBook Pro', 'Dell XPS', 'HP Spectre', 'Asus ROG', 'Lenovo ThinkPad'], specs: ['16GB RAM', '512GB SSD', '4K Display', '12Hr Battery'] },
    { type: 'smartphone', names: ['iPhone 15', 'Samsung S24', 'Pixel 8', 'OnePlus 12', 'Xiaomi 14'], specs: ['8GB RAM', 'AMOLED', '50MP Camera'] },
    { type: 'camera', names: ['Sony Alpha', 'Canon EOS', 'Nikon Z6', 'Fujifilm XT5', 'Panasonic GH6'], specs: ['4K Video', '33MP Sensor'] }
];

let inventory = [];
let selectedProduct = null;

function initApp() {
    for (let i = 0; i < 30; i++) {
        const cat = techData[i % techData.length];
        const name = cat.names[i % cat.names.length];

        inventory.push({
            id: i,
            name: name + " v" + (i + 1),
            type: cat.type,
            price: Math.floor(Math.random() * 100000) + 20000,
            specs: cat.specs,
            image: getRelevantImage(name),
            desc: `Experience premium performance with ${name}.`
        });
    }
    renderGrid(inventory);
}

function renderGrid(data) {
    document.getElementById('main-grid').innerHTML = data.map(p => `
        <div class="card" onclick="openSpecs(${p.id})">
            <img src="${p.image}">
            <h3>${p.name}</h3>
            <p style="color:#fb641b;font-weight:bold">₹${p.price.toLocaleString('en-IN')}</p>
            <button class="buy-btn" style="width:100%">BUY NOW</button>
        </div>
    `).join('');
}

function openSpecs(id) {
    selectedProduct = inventory.find(p => p.id === id);
    document.getElementById('spec-name').innerText = selectedProduct.name;
    document.getElementById('spec-desc').innerText = selectedProduct.desc;
    document.getElementById('spec-price').innerText = "₹" + selectedProduct.price.toLocaleString('en-IN');
    document.getElementById('spec-img-wrap').innerHTML = `<img src="${selectedProduct.image}">`;
    document.getElementById('spec-list').innerHTML = selectedProduct.specs.map(s => `<li>${s}</li>`).join('');
    document.getElementById('detail-modal').style.display = 'flex';
}

function openOrderModal() {
    closeModal('detail-modal');
    document.getElementById('order-summary-text').innerText = "Ordering: " + selectedProduct.name;
    document.getElementById('order-modal').style.display = 'flex';
}

function finalizeOrder() {
    alert("Order placed successfully!");
    closeModal('order-modal');
}

function closeModal(id) {
    document.getElementById(id).style.display = 'none';
}

function liveSearch() {
    const q = document.getElementById('global-search').value.toLowerCase();
    renderGrid(inventory.filter(p => p.name.toLowerCase().includes(q)));
}

initApp();
