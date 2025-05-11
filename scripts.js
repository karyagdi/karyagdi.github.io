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
    initSlider();
    initProductModal();
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
