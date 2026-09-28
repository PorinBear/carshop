:root {
    --bg: #0b0f14;
    --bg-dark: #05080c;
    --border: #1a222c;
    --text: #fff;
    --text-muted: #9fb3c8;
    --primary: #00e5ff;
    --primary-dark: #0099cc;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
}

html {
    scroll-behavior: smooth;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.site-header {
    background: var(--bg-dark);
    border-bottom: 1px solid var(--border);
    position: sticky;
    top: 0;
    z-index: 100;
}

.nav-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
}

.logo {
    font-size: 24px;
    font-weight: bold;
    color: var(--primary);
    text-decoration: none;
}

.main-nav {
    display: flex;
    gap: 30px;
}

.main-nav a {
    color: var(--text);
    text-decoration: none;
    transition: color 0.3s;
}

.main-nav a:hover {
    color: var(--primary);
}

.cart-btn {
    background: transparent;
    border: 1px solid var(--primary);
    color: var(--primary);
    padding: 8px 15px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
}

.cart-btn span {
    background: var(--primary);
    color: var(--bg);
    padding: 2px 6px;
    border-radius: 3px;
    margin-left: 5px;
}

.hero {
    background: linear-gradient(to right, #0b0f14, #101826);
    padding: 100px 0;
    text-align: center;
}

.hero h1 {
    font-size: 56px;
    margin-bottom: 20px;
    line-height: 1.2;
}

.hero h1 span {
    color: var(--primary);
}

.hero p {
    font-size: 18px;
    color: var(--text-muted);
    margin-bottom: 30px;
}

.btn {
    padding: 12px 25px;
    border: none;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
}

.btn-primary {
    background: var(--primary);
    color: var(--bg);
}

.btn-primary:hover {
    background: var(--primary-dark);
}

.full-width {
    width: 100%;
}

.section {
    padding: 60px 0;
}

.section h2 {
    font-size: 36px;
    margin-bottom: 40px;
}

.bg-dark {
    background: var(--bg-dark);
}

.toolbar {
    display: flex;
    gap: 15px;
    margin-bottom: 30px;
}

.search-box {
    flex: 1;
    padding: 12px 15px;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: 5px;
}

.filter-select {
    padding: 12px 15px;
    background: transparent;
    border: 1px solid var(--border);
    color: var(--text);
    border-radius: 5px;
}

.car-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
}

.car-card {
    background: #111826;
    border: 1px solid var(--border);
    border-radius: 10px;
    overflow: hidden;
    transition: transform 0.3s, border-color 0.3s;
    cursor: pointer;
}

.car-card:hover {
    transform: translateY(-5px);
    border-color: var(--primary);
}

.car-image {
    width: 100%;
    height: 200px;
    background: #1a222c;
    object-fit: cover;
}

.car-card img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.car-content {
    padding: 20px;
}

.car-content h3 {
    font-size: 20px;
    margin-bottom: 8px;
}

.car-content p {
    color: var(--text-muted);
    font-size: 14px;
    margin-bottom: 15px;
}

.car-specs {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
    font-size: 13px;
    color: var(--text-muted);
}

.car-price {
    font-size: 24px;
    font-weight: bold;
    color: var(--primary);
    margin-bottom: 15px;
}

.car-btn {
    width: 100%;
    background: var(--primary);
    color: var(--bg);
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
    font-weight: bold;
    transition: 0.3s;
}

.car-btn:hover {
    background: var(--primary-dark);
}

.showcase {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 40px;
    align-items: center;
}

.showcase-image {
    background: #1a222c;
    border-radius: 10px;
    overflow: hidden;
    height: 400px;
}

.showcase-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.showcase-info h3 {
    font-size: 32px;
    margin-bottom: 15px;
}

.showcase-info p {
    color: var(--text-muted);
    margin-bottom: 25px;
    font-size: 16px;
}

.specs {
    display: flex;
    gap: 30px;
    margin-bottom: 25px;
}

.specs div strong {
    display: block;
    font-size: 24px;
    color: var(--primary);
    margin-bottom: 5px;
}

.specs div small {
    color: var(--text-muted);
    font-size: 12px;
}

.finance-calc {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    gap: 30px;
    background: #111826;
    padding: 40px;
    border-radius: 10px;
    border: 1px solid var(--border);
}

.calc-input label {
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
}

.calc-input input[type="range"] {
    width: 100%;
    cursor: pointer;
    margin-bottom: 10px;
}

.calc-input span {
    color: var(--primary);
    font-weight: bold;
}

.calc-result {
    background: var(--bg-dark);
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    border: 1px solid var(--border);
}

.calc-result p {
    color: var(--text-muted);
    margin-bottom: 10px;
}

.calc-result h3 {
    font-size: 32px;
    color: var(--primary);
}

.features-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 25px;
}

.feature-card {
    background: #111826;
    padding: 25px;
    border-radius: 10px;
    border: 1px solid var(--border);
    text-align: center;
    transition: transform 0.3s;
}

.feature-card:hover {
    transform: translateY(-5px);
}

.feature-card .icon {
    font-size: 40px;
    display: block;
    margin-bottom: 15px;
}

.feature-card h3 {
    font-size: 20px;
    margin-bottom: 10px;
}

.feature-card p {
    color: var(--text-muted);
    font-size: 14px;
}

.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
}

.info-card {
    background: #111826;
    padding: 25px;
    border-radius: 10px;
    border: 1px solid var(--border);
}

.info-card h3 {
    font-size: 20px;
    margin-bottom: 15px;
}

.info-card p {
    color: var(--text-muted);
    font-size: 14px;
    line-height: 1.8;
}

.cart-drawer {
    position: fixed;
    top: 0;
    right: -400px;
    width: 400px;
    height: 100vh;
    background: var(--bg-dark);
    border-left: 1px solid var(--border);
    transition: right 0.3s;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.cart-drawer.open {
    right: 0;
}

.cart-header {
    padding: 20px;
    border-bottom: 1px solid var(--border);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.cart-header h3 {
    margin: 0;
}

.close-btn {
    background: none;
    border: none;
    color: var(--text);
    font-size: 24px;
    cursor: pointer;
}

.cart-items {
    flex: 1;
    overflow-y: auto;
    padding: 15px;
}

.cart-item {
    display: flex;
    gap: 15px;
    padding: 15px 0;
    border-bottom: 1px solid var(--border);
}

.cart-item img {
    width: 80px;
    height: 60px;
    object-fit: cover;
    border-radius: 5px;
}

.cart-item-info {
    flex: 1;
}

.cart-item-info h4 {
    margin: 0 0 5px 0;
}

.cart-item-info p {
    color: var(--text-muted);
    font-size: 12px;
    margin: 0 0 8px 0;
}

.cart-item-price {
    color: var(--primary);
    font-weight: bold;
}

.cart-item-remove {
    background: none;
    border: none;
    color: var(--text-muted);
    cursor: pointer;
    font-size: 18px;
}

.cart-footer {
    padding: 20px;
    border-top: 1px solid var(--border);
}

.cart-total {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    font-size: 18px;
    font-weight: bold;
}

.cart-total strong {
    color: var(--primary);
}

.site-footer {
    background: var(--bg-dark);
    border-top: 1px solid var(--border);
    padding: 30px 0;
    text-align: center;
    color: var(--text-muted);
}

@media (max-width: 768px) {
    .nav-wrap {
        flex-direction: column;
        gap: 15px;
    }

    .main-nav {
        flex-direction: column;
        gap: 10px;
    }

    .hero h1 {
        font-size: 36px;
    }

    .showcase {
        grid-template-columns: 1fr;
    }

    .finance-calc {
        grid-template-columns: 1fr;
    }

    .info-grid {
        grid-template-columns: 1fr;
    }

    .toolbar {
        flex-direction: column;
    }

    .cart-drawer {
        width: 100%;
        right: -100%;
    }
}
