const vehicles = [
    {
        id: 1,
        name: 'Aurora E',
        type: 'Sähkö',
        price: 44990,
        range: '510 km',
        power: '258 hv',
        image: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 2,
        name: 'Halo Hybrid',
        type: 'Hybridi',
        price: 35990,
        range: '850 km',
        power: '195 hv',
        image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 3,
        name: 'Volt X',
        type: 'Sport',
        price: 58990,
        range: '620 km',
        power: '340 hv',
        image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 4,
        name: 'Nova E',
        type: 'Sähkö',
        price: 41400,
        range: '390 km',
        power: '204 hv',
        image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 5,
        name: 'Horizon S',
        type: 'Hybridi',
        price: 46800,
        range: '480 km',
        power: '245 hv',
        image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=500&q=60'
    },
    {
        id: 6,
        name: 'Apex GT',
        type: 'Sport',
        price: 82900,
        range: '480 km',
        power: '640 hv',
        image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=500&q=60'
    }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];
let selectedCar = vehicles[0];

function formatPrice(price) {
    return new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR' }).format(price);
}

function renderCars(filter = 'kaikki', search = '') {
    let filtered = vehicles;
    
    if (filter !== 'kaikki') {
        filtered = filtered.filter(car => car.type.toLowerCase() === filter);
    }
    
    if (search) {
        filtered = filtered.filter(car => car.name.toLowerCase().includes(search.toLowerCase()));
    }
    
    const grid = document.getElementById('carGrid');
    grid.innerHTML = filtered.map(car => `
        <div class="car-card" onclick="selectCar(${car.id})">
            <div class="car-image">
                <img src="${car.image}" alt="${car.name}">
            </div>
            <div class="car-content">
                <h3>${car.name}</h3>
                <p>${car.type}</p>
                <div class="car-specs">
                    <span>${car.range}</span>
                    <span>${car.power}</span>
                </div>
                <div class="car-price">${formatPrice(car.price)}</div>
                <button class="car-btn" onclick="event.stopPropagation(); addToCart(${car.id})">Lisää koriin</button>
            </div>
        </div>
    `).join('');
}

function selectCar(id) {
    selectedCar = vehicles.find(car => car.id === id);
    updateShowcase();
    document.getElementById('esittely').scrollIntoView({ behavior: 'smooth' });
}

function updateShowcase() {
    document.getElementById('showcaseImg').src = selectedCar.image;
    document.getElementById('showcaseName').textContent = selectedCar.name;
    document.getElementById('showcaseDesc').textContent = `${selectedCar.type} - ${selectedCar.range} kantamalla`;
    document.getElementById('showcasePrice').textContent = formatPrice(selectedCar.price);
    document.getElementById('showcaseRange').textContent = selectedCar.range;
    document.getElementById('showcasePower').textContent = selectedCar.power;
}

function addToCart(id) {
    const car = vehicles.find(c => c.id === id);
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.qty += 1;
    } else {
        cart.push({ ...car, qty: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    toggleCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function updateCart() {
    const cartCount = document.getElementById('cartCount');
    const cartItems = document.getElementById('cartItems');
    const cartTotalPrice = document.getElementById('cartTotalPrice');
    
    const totalCount = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCount.textContent = totalCount;
    
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    cartTotalPrice.textContent = formatPrice(totalPrice);
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p style="text-align: center; color: #9fb3c8; padding: 20px;">Ostoskori on tyhjä</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="cart-item-info">
                    <h4>${item.name}</h4>
                    <p>${item.type}</p>
                    <span class="cart-item-price">${formatPrice(item.price)}</span>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})">×</button>
            </div>
        `).join('');
    }
}

function toggleCart() {
    document.getElementById('cartDrawer').classList.toggle('open');
}

document.getElementById('cartBtn').addEventListener('click', toggleCart);

document.getElementById('searchInput').addEventListener('input', (e) => {
    const filter = document.getElementById('filterSelect').value;
    renderCars(filter, e.target.value);
});

document.getElementById('filterSelect').addEventListener('change', (e) => {
    const search = document.getElementById('searchInput').value;
    renderCars(e.target.value, search);
});

document.getElementById('downPayment').addEventListener('input', updateFinance);
document.getElementById('loanMonths').addEventListener('input', updateFinance);

function updateFinance() {
    const downPayment = parseFloat(document.getElementById('downPayment').value);
    const months = parseInt(document.getElementById('loanMonths').value);
    const price = selectedCar.price;
    
    document.getElementById('downValue').textContent = formatPrice(downPayment);
    document.getElementById('monthsValue').textContent = months + ' kk';
    
    const principal = price - downPayment;
    const rate = 0.049 / 12;
    const monthlyPayment = (principal * rate) / (1 - Math.pow(1 + rate, -months));
    
    document.getElementById('monthlyPayment').textContent = formatPrice(monthlyPayment);
}

renderCars();
updateShowcase();
updateCart();
updateFinance();

if (document.getElementById('cartBtn')) {
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
}

if (document.querySelector('.close-btn')) {
    document.querySelector('.close-btn').addEventListener('click', toggleCart);
}

if (document.getElementById('showcaseImg')) {
    document.getElementById('showcaseImg').src = selectedCar.image;
}

if (document.getElementById('cartDrawer')) {
    document.getElementById('cartDrawer').classList.remove('open');
}

if (document.getElementById('searchInput')) {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const filter = document.getElementById('filterSelect').value;
        renderCars(filter, e.target.value);
    });
}

if (document.getElementById('filterSelect')) {
    document.getElementById('filterSelect').addEventListener('change', (e) => {
        const search = document.getElementById('searchInput').value;
        renderCars(e.target.value, search);
    });
}

if (document.getElementById('downPayment')) {
    document.getElementById('downPayment').addEventListener('input', updateFinance);
}

if (document.getElementById('loanMonths')) {
    document.getElementById('loanMonths').addEventListener('input', updateFinance);
}

if (document.getElementById('addBtn')) {
    document.getElementById('addBtn').addEventListener('click', () => addToCart(selectedCar.id));
}

if (document.getElementById('cartBtn')) {
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
}

if (document.querySelector('.close-btn')) {
    document.querySelector('.close-btn').addEventListener('click', toggleCart);
}

if (document.getElementById('showcaseImg')) {
    document.getElementById('showcaseImg').src = selectedCar.image;
}

if (document.getElementById('cartDrawer')) {
    document.getElementById('cartDrawer').classList.remove('open');
}

if (document.getElementById('searchInput')) {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const filter = document.getElementById('filterSelect').value;
        renderCars(filter, e.target.value);
    });
}

if (document.getElementById('filterSelect')) {
    document.getElementById('filterSelect').addEventListener('change', (e) => {
        const search = document.getElementById('searchInput').value;
        renderCars(e.target.value, search);
    });
}

if (document.getElementById('downPayment')) {
    document.getElementById('downPayment').addEventListener('input', updateFinance);
}

if (document.getElementById('loanMonths')) {
    document.getElementById('loanMonths').addEventListener('input', updateFinance);
}

if (document.getElementById('addBtn')) {
    document.getElementById('addBtn').addEventListener('click', () => addToCart(selectedCar.id));
}

if (document.getElementById('cartBtn')) {
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
}

if (document.querySelector('.close-btn')) {
    document.querySelector('.close-btn').addEventListener('click', toggleCart);
}

if (document.getElementById('showcaseImg')) {
    document.getElementById('showcaseImg').src = selectedCar.image;
}

if (document.getElementById('cartDrawer')) {
    document.getElementById('cartDrawer').classList.remove('open');
}

if (document.getElementById('searchInput')) {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const filter = document.getElementById('filterSelect').value;
        renderCars(filter, e.target.value);
    });
}

if (document.getElementById('filterSelect')) {
    document.getElementById('filterSelect').addEventListener('change', (e) => {
        const search = document.getElementById('searchInput').value;
        renderCars(e.target.value, search);
    });
}

if (document.getElementById('downPayment')) {
    document.getElementById('downPayment').addEventListener('input', updateFinance);
}

if (document.getElementById('loanMonths')) {
    document.getElementById('loanMonths').addEventListener('input', updateFinance);
}

if (document.getElementById('addBtn')) {
    document.getElementById('addBtn').addEventListener('click', () => addToCart(selectedCar.id));
}

if (document.getElementById('cartBtn')) {
    document.getElementById('cartBtn').addEventListener('click', toggleCart);
}

if (document.querySelector('.close-btn')) {
    document.querySelector('.close-btn').addEventListener('click', toggleCart);
}

if (document.getElementById('showcaseImg')) {
    document.getElementById('showcaseImg').src = selectedCar.image;
}

if (document.getElementById('cartDrawer')) {
    document.getElementById('cartDrawer').classList.remove('open');
}

if (document.getElementById('searchInput')) {
    document.getElementById('searchInput').addEventListener('input', (e) => {
        const filter = document.getElementById('filterSelect').value;
        renderCars(filter, e.target.value);
    });
}

if (document.getElementById('filterSelect')) {
    document.getElementById('filterSelect').addEventListener('change', (e) => {
        const search = document.getElementById('searchInput').value;
        renderCars(e.target.value, search);
    });
}

if (document.getElementById('downPayment')) {
    document.getElementById('downPayment').addEventListener('input', updateFinance);
}

if (document.getElementById('loanMonths')) {
    document.getElementById('loanMonths').addEventListener('input', updateFinance);
}

if (document.getElementById('addBtn')) {
    document.getElementById('addBtn').addEventListener('click', () => addToCart(selectedCar.id));
}
