// Hero Slider Functionality
function initSlider() {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-slide');
    const nextBtn = document.querySelector('.next-slide');
    let currentSlide = 0;
    let slideInterval;

    // Otomatik Slider
    function startSlideInterval() {
        slideInterval = setInterval(() => {
            goToNextSlide();
        }, 5000); // 5 saniyede bir değiştir
    }

    // Slider fonksiyonları
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }

    function goToNextSlide() {
        goToSlide(currentSlide + 1);
    }

    function goToPrevSlide() {
        goToSlide(currentSlide - 1);
    }

    // Event listeners
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToPrevSlide();
            startSlideInterval();
        });

        nextBtn.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToNextSlide();
            startSlideInterval();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            clearInterval(slideInterval);
            goToSlide(index);
            startSlideInterval();
        });
    });

    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    const sliderContainer = document.querySelector('.slider-container');
    if (sliderContainer) {
        sliderContainer.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, false);

        sliderContainer.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, false);
    }

    function handleSwipe() {
        if (touchStartX - touchEndX > 50) {
            // Swipe left
            clearInterval(slideInterval);
            goToNextSlide();
            startSlideInterval();
        }
        
        if (touchEndX - touchStartX > 50) {
            // Swipe right
            clearInterval(slideInterval);
            goToPrevSlide();
            startSlideInterval();
        }
    }

    // Başlangıçta slider'ı başlat
    startSlideInterval();
}

// Ürün Hızlı Bakış Modal Fonksiyonu
function initProductModal() {
    // Modal elemanlarını al
    const modal = document.getElementById('product-modal');
    const modalImg = document.getElementById('modal-image');
    const captionText = document.getElementById('modal-caption');
    const closeBtn = document.getElementsByClassName('close-modal')[0];
    
    if (!modal) return; // Modal yoksa fonksiyonu sonlandır
    
    // Tüm Hızlı Bakış butonlarına tıklama olayı ekle
    document.querySelectorAll('.quick-view').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // En yakın ürün kartını ve görseli/başlığı al
            const productCard = this.closest('.product-card');
            const img = productCard.querySelector('.product-image img');
            const title = productCard.querySelector('h3').textContent;
            
            // Modalda göster
            modal.style.display = 'block';
            modalImg.src = img.src;
            captionText.innerHTML = title;
            
            // Modal açıkken sayfa kaydırmayı engelle
            document.body.style.overflow = 'hidden';
        });
    });
    
    // × butonuna tıklayınca modalı kapat
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
    
    // Görselin dışına tıklayınca modalı kapat
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // ESC tuşuna basınca modalı kapat
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeModal();
        }
    });
    
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Kaydırmayı tekrar aktif et
    }
}

// Fiyat filtreleme işlevi
function setupPriceFilter() {
    const filterBtn = document.querySelector('.filter-btn');
    const priceInputs = document.querySelectorAll('.price-input');
    const productCards = document.querySelectorAll('.product-card');
    
    if (!filterBtn) return; // Buton yoksa işlemi sonlandır
    
    filterBtn.addEventListener('click', function() {
        const minPrice = parseFloat(priceInputs[0].value) || 0;
        const maxPrice = parseFloat(priceInputs[1].value) || Infinity;
        
        productCards.forEach(card => {
            // Ürün fiyatını al (içeriği temizleyerek sadece sayısal değeri al)
            const priceText = card.querySelector('.product-price').textContent;
            const price = parseFloat(priceText.replace(/[^0-9.]/g, ''));
            
            // Fiyat aralığına göre ürünü göster/gizle
            if (price >= minPrice && price <= maxPrice) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
        
        // Filtreleme durumunu kaydedelim
        saveFilterState();
    });
    
    // Enter tuşuna basıldığında da filtrelesin
    priceInputs.forEach(input => {
        input.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                filterBtn.click();
            }
        });
    });
}

// Filtre durumunu kaydetme
function saveFilterState() {
    const minValue = document.querySelectorAll('.price-input')[0].value;
    const maxValue = document.querySelectorAll('.price-input')[1].value;
    
    if (minValue || maxValue) {
        sessionStorage.setItem('minPrice', minValue);
        sessionStorage.setItem('maxPrice', maxValue);
    }
}

// Kaydedilen filtre durumunu yükleme
function loadFilterState() {
    const minPrice = sessionStorage.getItem('minPrice');
    const maxPrice = sessionStorage.getItem('maxPrice');
    const priceInputs = document.querySelectorAll('.price-input');
    
    if (minPrice && priceInputs.length > 0) {
        priceInputs[0].value = minPrice;
    }
    
    if (maxPrice && priceInputs.length > 1) {
        priceInputs[1].value = maxPrice;
    }
    
    // Eğer değerler varsa, filtreyi uygula
    if ((minPrice || maxPrice) && document.querySelector('.filter-btn')) {
        document.querySelector('.filter-btn').click();
    }
}

function initMap() {
    // Harita konteynerini kontrol et
    const mapContainer = document.getElementById('map');
    if (!mapContainer) return;
    
    console.log("Harita başlatılıyor...");
    
    // Haritayı başlat 
    const map = L.map('map', {
        attributionControl: false,
        maxZoom: 19,
        zoomControl: true
    }).setView([38.70760, 31.03403], 13);
    
    // Standart harita katmanı
    const standardMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '',
        maxZoom: 19
    });
    
    // ESRI uydu görüntüleri - daha güvenilir
    const satelliteMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '',
        maxZoom: 19
    });
    
    // Varsayılan olarak uydu haritasını ekle
    satelliteMap.addTo(map);
    
    // İşaretleyici ekle
    const marker = L.marker([38.70760, 31.03403]).addTo(map);
    marker.bindPopup('Onur İnşaat Burada!').openPopup();
    
    // Global fonksiyonlar
    window.switchToSatellite = function() {
        map.removeLayer(standardMap);
        map.addLayer(satelliteMap);
    };
    
    window.switchToMap = function() {
        map.removeLayer(satelliteMap);
        map.addLayer(standardMap);
    };
    
    // CSS ekle - hata mesajlarını ve fazla logoları gizlemek için
    const style = document.createElement('style');
    style.textContent = `
        .leaflet-container .leaflet-control-attribution {
            display: none !important;
        }
        .leaflet-tile-container img {
            border: none !important;
        }
        .leaflet-tile-loaded {
            opacity: 1 !important;
        }
    `;
    document.head.appendChild(style);
    
    
    
    // Yol tarifi butonu
    const directionsBtn = document.getElementById('directions-btn');
    if (directionsBtn) {
        directionsBtn.addEventListener('click', function() {
            const lat = 38.70760;
            const lng = 31.03403;
            const locationName = encodeURIComponent("Onur İnşaat");
            
            // Cihaz kontrolü
            const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
            
            let url;
            if (isIOS) {
                url = `https://maps.apple.com/?q=${locationName}&ll=${lat},${lng}`;
            } else {
                url = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
            }
            
            window.open(url, '_blank');
        });
    }
    
    // Harita yüklenince bir kez tekrar görüntüleri yükle (bazen bu gereklidir)
    map.whenReady(function() {
        setTimeout(function() {
            map.invalidateSize();
        }, 100);
    });
    
    // Zoom seviyesi değiştiğinde hata mesajlarını temizle
    map.on('zoomend', function() {
        if (map.getZoom() > 17) {
            map.setZoom(17);
        }
    });
}

// Kategori filtreleme
function setupCategoryFilter() {
    const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
    if (!categoryCheckboxes.length) return;
    
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', filterProducts);
    });
    
    // Sayfa yüklendiğinde seçilen kategorileri göster
    filterProducts();
    
    function filterProducts() {
        const selectedCategories = Array.from(categoryCheckboxes)
            .filter(cb => cb.checked)
            .map(cb => cb.value);
        
        const products = document.querySelectorAll('.product-card');
        
        products.forEach(product => {
            const category = product.dataset.category;
            
            // Hiçbir kategori seçilmemişse veya ürün seçilen kategorilerden birindeyse göster
            if (selectedCategories.length === 0 || selectedCategories.includes(category)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
        
        // Fiyat filtresi de uygulandıysa, onu da dikkate al
        if (document.querySelector('.price-input')) {
            applyPriceFilter();
        }
    }
}

// Fiyat filtresini uygula
function applyPriceFilter() {
    const minPrice = parseFloat(document.querySelectorAll('.price-input')[0].value) || 0;
    const maxPrice = parseFloat(document.querySelectorAll('.price-input')[1].value) || Infinity;
    
    const products = document.querySelectorAll('.product-card');
    
    products.forEach(product => {
        // Eğer kategori filtresinden dolayı zaten gizliyse, fiyat filtresini atla
        if (product.style.display === 'none') return;
        
        const priceText = product.querySelector('.product-price').textContent;
        const price = parseFloat(priceText.replace(/[^\d.]/g, '')); // TL gibi karakterleri kaldır
        
        if (price >= minPrice && price <= maxPrice) {
            product.style.display = 'block';
        } else {
            product.style.display = 'none';
        }
    });
}

// Sıralama filtresi
function setupSortingFilter() {
    const sortSelect = document.querySelector('.sort-select');
    if (!sortSelect) return;
    
    sortSelect.addEventListener('change', function() {
        const sortBy = this.value;
        const products = Array.from(document.querySelectorAll('.product-card'));
        const productsGrid = document.querySelector('.products-grid');
        
        // Ürünleri seçilen kritere göre sırala
        products.sort((a, b) => {
            if (sortBy === 'price-low') {
                const priceA = parseFloat(a.querySelector('.product-price').textContent.replace(/[^\d.]/g, ''));
                const priceB = parseFloat(b.querySelector('.product-price').textContent.replace(/[^\d.]/g, ''));
                return priceA - priceB;
            } 
            else if (sortBy === 'price-high') {
                const priceA = parseFloat(a.querySelector('.product-price').textContent.replace(/[^\d.]/g, ''));
                const priceB = parseFloat(b.querySelector('.product-price').textContent.replace(/[^\d.]/g, ''));
                return priceB - priceA;
            }
            // Diğer sıralama kriterleri için (popular, new) şimdilik ID'ye göre sırala
            else {
                const idA = a.querySelector('.add-to-cart-btn').dataset.id;
                const idB = b.querySelector('.add-to-cart-btn').dataset.id;
                return idA - idB;
            }
        });
        
        // Sıralanmış ürünleri DOM'a ekle
        products.forEach(product => productsGrid.appendChild(product));
    });
}

// Ürünleri localStorage'dan yükleme fonksiyonu
function loadProductsFromAdmin() {
    const productsGrid = document.querySelector('.products-grid');
    if (!productsGrid) return; // Eğer ürünler sayfasında değilsek, çık
    
    // Admin tarafından eklenen ürünleri al
    const adminProducts = JSON.parse(localStorage.getItem('products')) || [];
    
    // Her ürün için HTML oluştur
    adminProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Kategori adına göre data-category ekle
        let categorySlug = '';
        switch(product.categoryName) {
            case 'Seramik':
                categorySlug = 'seramik';
                break;
            case 'Banyo Bataryaları':
                categorySlug = 'banyo';
                break;
            case 'Mutfak Bataryaları':
                categorySlug = 'mutfak';
                break;
            case 'Klozet':
                categorySlug = 'klozet';
                break;
            default:
                categorySlug = 'diger';
        }
        
        productCard.setAttribute('data-category', categorySlug);
        
        // Ürün HTML yapısını oluştur - İncele butonu eklenmiş hali
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-overlay">
                    <button class="quick-view">Hızlı Bakış</button>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-price">${product.price.toFixed(2)} TL</div>
                <div class="product-actions">
                    <a href="product-details.html?id=${product.id}" class="btn details-btn">İncele</a>
                    <button class="btn add-to-cart-btn" 
                            data-id="${product.id}" 
                            data-name="${product.name}" 
                            data-price="${product.price}" 
                            data-image="${product.image}">
                        <i class="fas fa-shopping-cart"></i> Sepete Ekle
                    </button>
                </div>
            </div>
        `;
        
        // Sayfaya ekle
        productsGrid.appendChild(productCard);
    });
}
// Ürün kartlarının yüksekliklerini eşitle
function normalizeProductCardHeights() {
    // Tüm ürün kartlarını seç
    const productCards = document.querySelectorAll('.product-card');
    if (!productCards.length) return;
    
    // Önce tüm yükseklikleri sıfırla
    productCards.forEach(card => {
        card.style.height = 'auto';
    });
    
    // Satır bazında grupla ve yükseklikleri eşitle
    const grid = document.querySelector('.products-grid');
    if (!grid) return;
    
    const gridStyles = window.getComputedStyle(grid);
    const gap = parseInt(gridStyles.getPropertyValue('gap')) || 20;
    const cardWidth = productCards[0].offsetWidth;
    const gridWidth = grid.clientWidth;
    const cardsPerRow = Math.floor(gridWidth / (cardWidth + gap));
    
    // Her satırı grupla ve yükseklikleri eşitle
    for (let i = 0; i < productCards.length; i += cardsPerRow) {
        const rowCards = Array.from(productCards).slice(i, i + cardsPerRow);
        const maxHeight = Math.max(...rowCards.map(card => card.scrollHeight));
        
        rowCards.forEach(card => {
            card.style.height = `${maxHeight}px`;
        });
    }
}

// Ürünleri yükleme fonksiyonu - bu fonksiyonu bulun ve güncelleyin
function loadProducts(products, container) {
    container.innerHTML = '';
    
    if (products.length === 0) {
        container.innerHTML = '<div class="no-products">Bu kriterlere uygun ürün bulunamadı.</div>';
        return;
    }
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        
        // BU KISMI DEĞİŞTİRİN - İncele butonu ekleyin
        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-price">${product.price.toFixed(2)} ₺</p>
                <div class="product-actions">
                    <a href="product-details.html?id=${product.id}" class="btn details-btn">İncele</a>
                    <button class="btn add-to-cart-btn" data-id="${product.id}">Sepete Ekle</button>
                </div>
            </div>
        `;
        
        container.appendChild(productCard);
    });
    
    // Event listener'ları ekleyin
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            addToCart(productId);
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const elements = {
        addToCartButtons: document.querySelectorAll('.add-to-cart-btn'),
        cartCount: document.getElementById('cart-count'),
        cartItems: document.getElementById('cart-items'),
        cartSummary: document.getElementById('cart-summary'),
        emptyCartMessage: document.getElementById('empty-cart-message'),
        contactForm: document.getElementById('contactForm'),
        loginForm: document.getElementById('loginForm'),
        themeToggle: document.getElementById('theme-toggle')
    };
    
   // Başlangıç fonksiyonları
initSlider();
initProductModal();
initMap();
setupCategoryFilter();
setupPriceFilter();
setupSortingFilter();
loadFilterState();
// Admin panelinden eklenen ürünleri yükle
loadProductsFromAdmin();
// Ürünler yüklendikten sonra filtreleme ve diğer fonksiyonları tekrar çalıştır
setupCategoryFilter();
setupPriceFilter();
initProductModal();
normalizeProductCardHeights();
// Pencere boyutu değiştiğinde yeniden hesapla
    window.addEventListener('resize', function() {
        // Performans için debounce uygula
        clearTimeout(window.resizeTimer);
        window.resizeTimer = setTimeout(normalizeProductCardHeights, 250);
    });
    // Admin giriş formu kontrolleri
    const adminLoginForm = document.getElementById('adminLoginForm');
    
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Basit doğrulama - gerçek uygulamada güvenli bir API kullanılmalıdır
            if (username === 'admin' && password === 'admin123') {
                // Başarılı giriş
                localStorage.setItem('adminLoggedIn', 'true');
                window.location.href = 'dashboard.html';
            } else {
                // Hatalı giriş
                showNotification('Kullanıcı adı veya şifre hatalı!', 'error');
            }
        });
    }
    // Admin panelinden eklenen ürünleri ana sayfada göster
    const featuredProductsContainer = document.querySelector('.featured-products');
    
    if (featuredProductsContainer) {
        const products = JSON.parse(localStorage.getItem('products')) || [];
        
        // Son eklenen 3-6 ürünü göster
        const featuredProducts = products.slice(-6).reverse();
        
        if (featuredProducts.length > 0) {
            featuredProductsContainer.innerHTML = featuredProducts.map(product => `
                <div class="product-card">
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="product-info">
                        <h3>${product.name}</h3>
                        <p class="category">${product.categoryName}</p>
                        <p class="price">${product.price.toFixed(2)} ₺</p>
                        <div class="product-actions">
                            <a href="product-details.html?id=${product.id}" class="btn details-btn">İncele</a>
                            <button class="btn add-to-cart-btn" data-id="${product.id}">Sepete Ekle</button>
                        </div>
                    </div>
                </div>
            `).join('');
        }
    }
    
    // Bildirim gösterme fonksiyonu
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Görünür yap
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Kaldır
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Admin sayfası açıldığında yetki kontrolü yap
if (!window.location.href.includes('admin.html')) {
    checkAuth();
}

function checkAuth() {
    // dashboard.html veya diğer admin sayfalarında bu kontrolü kullan
    if (!localStorage.getItem('adminLoggedIn') && !window.location.href.includes('admin.html')) {
        window.location.href = 'admin.html';
    }
}
    
    // Çıkış işlevi
    window.adminLogout = function() {
        localStorage.removeItem('adminLoggedIn');
        window.location.href = 'admin.html';
    };
    
    // Dashboard içeriği için kodlar
    initDashboard();


// Dashboard içeriği başlatma
function initDashboard() {
    const statsContainer = document.getElementById('stats-container');
    if (!statsContainer) return;
    
    // Örnek istatistikleri göster (gerçek uygulamada bir API'den alınabilir)
    updateStats({
        products: 24,
        users: 156,
        orders: 53,
        revenue: '15.240 ₺'
    });
}



// İstatistikleri güncelleme
function updateStats(stats) {
    document.getElementById('product-count').textContent = stats.products;
    document.getElementById('user-count').textContent = stats.users;
    document.getElementById('order-count').textContent = stats.orders;
    document.getElementById('revenue').textContent = stats.revenue;
}
    // Cart Functions
    function updateCartCount() {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
            elements.cartCount.textContent = totalCount;
            if (elements.cartItems) displayCart();
        } catch (error) {
            showNotification('Sepet güncellenirken hata oluştu', 'error');
        }
    }

    function addToCart(button) {
        try {
            const { id, name, price, image } = button.dataset;
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const existingItem = cart.find(item => item.id === id);

            if (existingItem) {
                showNotification(`${name} sepete eklendi!`, 'success');
            } else {
                cart.push({ id, name, price: parseFloat(price), image, quantity: 1 });
                showNotification(`${name} sepete eklendi!`, 'success');
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
        } catch (error) {
            showNotification('Ürün eklenirken hata oluştu', 'error');
        }
    }

    function removeFromCart(itemId) {
        try {
            let cart = JSON.parse(localStorage.getItem('cart') || '[]');
            cart = cart.filter(item => item.id !== itemId);
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartCount();
            showNotification('Ürün sepetten kaldırıldı', 'success');
        } catch (error) {
            showNotification('Ürün kaldırılırken hata oluştu', 'error');
        }
    }

    function displayCart() {
        if (!elements.cartItems) return;

        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        if (cart.length === 0) {
            elements.cartItems.style.display = 'none';
            elements.cartSummary.style.display = 'none';
            elements.emptyCartMessage.style.display = 'block';
            return;
        }

        elements.cartItems.style.display = 'block';
        elements.cartSummary.style.display = 'block';
        elements.emptyCartMessage.style.display = 'none';

        elements.cartItems.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="item-image">
                <div class="item-details">
                    <h3 class="item-title">${item.name}</h3>
                    <div class="item-price">${item.price} TL</div>
                    <div class="item-quantity">
                        <button class="quantity-btn minus">-</button>
                        <input type="number" value="${item.quantity}" min="1" max="10" class="quantity-input" readonly>
                        <button class="quantity-btn plus">+</button>
                    </div>
                </div>
                <button class="remove-item"><i class="fas fa-trash"></i></button>
            </div>
        `).join('');

        updateCartTotal();
        attachCartEventListeners();
    }

    function updateCartTotal() {
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const tax = subtotal * 0.18;
        const total = subtotal + tax;

        document.getElementById('subtotal').textContent = `${subtotal.toFixed(2)} TL`;
        document.getElementById('tax').textContent = `${tax.toFixed(2)} TL`;
        document.getElementById('total').textContent = `${total.toFixed(2)} TL`;
    }

    function updateItemQuantity(itemId, change) {
        try {
            const cart = JSON.parse(localStorage.getItem('cart') || '[]');
            const item = cart.find(item => item.id === itemId);

            if (item) {
                item.quantity = Math.max(1, Math.min(10, item.quantity + change));
                localStorage.setItem('cart', JSON.stringify(cart));

                const input = document.querySelector(`.cart-item[data-id="${itemId}"] .quantity-input`);
                if (input) input.value = item.quantity;

                updateCartCount();
                updateCartTotal();
            }
        } catch (error) {
            showNotification('Miktar güncellenirken hata oluştu', 'error');
        }
    }

    function attachCartEventListeners() {
        if (!elements.cartItems) return;

        let lastClickTime = 0;
        const CLICK_DELAY = 400;

        elements.cartItems.addEventListener('click', function (e) {
            const now = Date.now();
            if (now - lastClickTime < CLICK_DELAY) return;
            lastClickTime = now;

            const target = e.target;
            const item = target.closest('.cart-item');
            if (!item) return;

            if (target.classList.contains('minus')) {
                updateItemQuantity(item.dataset.id, -1);
            } else if (target.classList.contains('plus')) {
                updateItemQuantity(item.dataset.id, 1);
            } else if (target.closest('.remove-item')) {
                removeFromCart(item.dataset.id);
            }
        });
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        requestAnimationFrame(() => notification.classList.add('show'));
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showNotification('Mesajınız başarıyla gönderildi!', 'success');
            this.reset();
        });
    }

    if (elements.loginForm) {
        elements.loginForm.addEventListener('submit', function (e) {
            e.preventDefault();
            showNotification('Başarıyla giriş yapıldı!', 'success');
        });
    }

    function initTheme() {
        if (!elements.themeToggle) return;
        const isDarkMode = localStorage.getItem('darkMode') === 'true';
        elements.themeToggle.checked = isDarkMode;
        updateTheme(isDarkMode);

        elements.themeToggle.addEventListener('change', function () {
            const mode = this.checked;
            localStorage.setItem('darkMode', mode);
            updateTheme(mode);
            showNotification(mode ? 'Koyu tema aktifleştirildi' : 'Açık tema aktifleştirildi', 'info');
        });
    }

    function updateTheme(isDarkMode) {
        document.body.classList.toggle('dark-mode', isDarkMode);
        document.body.classList.toggle('light-mode', !isDarkMode);
    }

    async function loadTemplate(templateName) {
        try {
            const res = await fetch(`templates/${templateName}.html`);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            const html = await res.text();
            document.getElementById(templateName).innerHTML = html;
            if (templateName === 'header') initTheme();
        } catch (error) {
            showNotification(`${templateName} yüklenemedi`, 'error');
        }
    }

    Promise.all([
        loadTemplate('header'),
        loadTemplate('footer')
    ]).then(() => {
        updateCartCount();
        initProductModal(); // Template'ler yüklendikten sonra da modalları başlat
        if (typeof setupCategoryFilter === 'function') setupCategoryFilter();
        if (typeof setupPriceFilter === 'function') setupPriceFilter();
        if (typeof setupSortingFilter === 'function') setupSortingFilter();
    }).catch(() => {
        showNotification('Şablon yükleme hatası', 'error');
    });

    // Event Binding
    elements.addToCartButtons.forEach(button =>
        button.addEventListener('click', () => addToCart(button))
    );
});
