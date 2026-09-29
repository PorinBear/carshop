const vehicles = [
  {
    id: 'glc-300de',
    name: 'Mercedes-Benz GLC 300 de',
    category: 'Henkilöautot',
    year: 2022,
    mileage: 62000,
    power: 'Hybrid',
    price: 52900,
    tag: 'Premium SUV',
    description: 'Esimerkkikohde: nelivetoinen premium-SUV pitkille matkoille ja arkeen.'
  },
  {
    id: 'xc60-t8',
    name: 'Volvo XC60 T8',
    category: 'Henkilöautot',
    year: 2021,
    mileage: 71000,
    power: 'Hybrid',
    price: 48900,
    tag: 'Pohjoismainen',
    description: 'Esimerkkikohde: turvallisuutta, suorituskykyä ja hiljaista matkantekoa.'
  },
  {
    id: 'transporter',
    name: 'Volkswagen Transporter',
    category: 'Pakettiautot',
    year: 2020,
    mileage: 98000,
    power: 'Diesel',
    price: 33900,
    tag: 'Yritysauto',
    description: 'Esimerkkikohde: työkaluksi yritykselle, kuljetukseen ja päivittäiseen käyttöön.'
  },
  {
    id: 'street-glide',
    name: 'Harley-Davidson Street Glide',
    category: 'Moottoripyörät',
    year: 2019,
    mileage: 28000,
    power: 'Bensiini',
    price: 27900,
    tag: 'Touring',
    description: 'Esimerkkikohde: pitkän matkan cruiser, jossa tyyli ja mukavuus kulkevat yhdessä.'
  },
  {
    id: 'adria-matrix',
    name: 'Adria Matrix',
    category: 'Matkailuajoneuvot',
    year: 2021,
    mileage: 44000,
    power: 'Diesel',
    price: 74900,
    tag: 'Matkailuauto',
    description: 'Esimerkkikohde: ympärivuotiseen matkailuun ja pidempiin reissuihin.'
  },
  {
    id: 'e-class',
    name: 'Mercedes-Benz E 300 de',
    category: 'Henkilöautot',
    year: 2021,
    mileage: 83000,
    power: 'Hybrid',
    price: 43900,
    tag: 'Business',
    description: 'Esimerkkikohde: premium-luokan matkustusmukavuutta yritys- ja yksityiskäyttöön.'
  }
];

const money = new Intl.NumberFormat('fi-FI', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 });
const number = new Intl.NumberFormat('fi-FI');

function vehicleVisual(vehicle) {
  const initials = vehicle.name.split(' ').slice(0, 2).map(part => part[0]).join('');
  return `
    <div class="vehicle-visual" aria-hidden="true">
      <span class="vehicle-initials">${initials}</span>
      <svg viewBox="0 0 420 180" role="img" aria-label="Ajoneuvon tyylitelty esimerkkikuva">
        <path d="M76 111h35l24-47h140l45 47h31c16 0 29 13 29 29v7H42v-7c0-16 15-29 34-29Z" fill="currentColor" opacity=".32"/>
        <path d="M143 74h121l27 37H124l19-37Z" fill="currentColor" opacity=".15"/>
        <circle cx="120" cy="145" r="28" fill="#111822" stroke="currentColor" stroke-width="8"/>
        <circle cx="306" cy="145" r="28" fill="#111822" stroke="currentColor" stroke-width="8"/>
      </svg>
    </div>`;
}

function vehicleCard(vehicle) {
  return `
    <article class="vehicle-card" data-category="${vehicle.category}">
      ${vehicleVisual(vehicle)}
      <div class="vehicle-card-body">
        <div class="vehicle-card-topline">
          <span class="pill">${vehicle.tag}</span>
          <span class="demo-label">DEMO</span>
        </div>
        <h3>${vehicle.name}</h3>
        <p>${vehicle.description}</p>
        <div class="spec-row">
          <span>${vehicle.year}</span>
          <span>${number.format(vehicle.mileage)} km</span>
          <span>${vehicle.power}</span>
        </div>
        <div class="vehicle-card-footer">
          <strong>${money.format(vehicle.price)}</strong>
          <a class="text-link" href="contact.html?vehicle=${encodeURIComponent(vehicle.name)}">Kysy tästä →</a>
        </div>
      </div>
    </article>`;
}

function renderVehicles(target, list) {
  if (!target) return;
  target.innerHTML = list.map(vehicleCard).join('');
}

function initFeatured() {
  renderVehicles(document.querySelector('#featuredVehicles'), vehicles.slice(0, 3));
}

function initCatalog() {
  const grid = document.querySelector('#vehicleGrid');
  if (!grid) return;

  const search = document.querySelector('#vehicleSearch');
  const category = document.querySelector('#categoryFilter');
  const sort = document.querySelector('#sortVehicles');
  const count = document.querySelector('#vehicleCount');

  const update = () => {
    const q = (search?.value || '').trim().toLowerCase();
    const selected = category?.value || 'Kaikki';
    const order = sort?.value || 'featured';

    let result = vehicles.filter(vehicle => {
      const matchesText = `${vehicle.name} ${vehicle.category} ${vehicle.tag}`.toLowerCase().includes(q);
      const matchesCategory = selected === 'Kaikki' || vehicle.category === selected;
      return matchesText && matchesCategory;
    });

    if (order === 'price-asc') result.sort((a, b) => a.price - b.price);
    if (order === 'price-desc') result.sort((a, b) => b.price - a.price);
    if (order === 'year-desc') result.sort((a, b) => b.year - a.year);

    renderVehicles(grid, result);
    if (count) count.textContent = `${result.length} esimerkkikohdetta`;
  };

  [search, category, sort].forEach(control => control?.addEventListener('input', update));
  update();
}

function monthlyPayment(principal, annualRate, months) {
  const monthlyRate = annualRate / 12;
  if (!monthlyRate) return principal / months;
  return (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
}

function initFinance() {
  const form = document.querySelector('#financeCalculator');
  if (!form) return;

  const price = form.querySelector('[name="price"]');
  const down = form.querySelector('[name="down"]');
  const months = form.querySelector('[name="months"]');
  const result = form.querySelector('[data-finance-result]');

  const update = () => {
    const vehiclePrice = Number(price.value || 0);
    const deposit = Math.min(Number(down.value || 0), vehiclePrice);
    const term = Number(months.value || 48);
    const principal = Math.max(vehiclePrice - deposit, 0);
    const estimate = monthlyPayment(principal, 0.059, term);
    result.textContent = `${money.format(Math.round(estimate))} / kk`;
  };

  [price, down, months].forEach(control => control.addEventListener('input', update));
  update();
}

function initContactForm() {
  const form = document.querySelector('#contactForm');
  if (!form) return;
  const message = document.querySelector('#contactMessage');
  const params = new URLSearchParams(window.location.search);
  const subject = form.querySelector('[name="subject"]');
  const vehicle = params.get('vehicle');
  if (vehicle && subject) subject.value = `Kysely: ${vehicle}`;

  form.addEventListener('submit', event => {
    event.preventDefault();
    if (message) {
      message.textContent = 'Demo: lomake toimii käyttöliittymässä. Varsinainen lähetysintegraatio lisätään ennen julkaisua.';
    }
  });
}

function initMobileNav() {
  const button = document.querySelector('[data-menu-button]');
  const nav = document.querySelector('[data-mobile-nav]');
  button?.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
}

initFeatured();
initCatalog();
initFinance();
initContactForm();
initMobileNav();
