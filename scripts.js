document.addEventListener('DOMContentLoaded', function() {
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
                cart.push({
                    id,
                    name,
                    price: parseFloat(price),
                    image,
                    quantity: 1
                });
                showNotification(`${name} sepete eklendi!`, 'success');
            }

            localStorage.setItem('cart', JSON.stringify(cart));
             console.log('addToCart sonrası localStorage:', JSON.parse(localStorage.getItem('cart') || '[]'));
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
              console.log('removeFromCart sonrası localStorage:', JSON.parse(localStorage.getItem('cart') || '[]'));
            updateCartCount();
            showNotification('Ürün sepetten kaldırıldı', 'success');
        } catch (error) {
            showNotification('Ürün kaldırılırken hata oluştu', 'error');
        }
    }

    function displayCart() {
      if (!elements.cartItems) return;

      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      console.log('displayCart içinde localStorage:', cart);
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
              <button class="remove-item">
                  <i class="fas fa-trash"></i>
              </button>
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
              let newQuantity = parseInt(item.quantity, 10) + change;
            
               newQuantity = Math.max(1, Math.min(10, newQuantity)); // Sınırları Uygula
              
                item.quantity = newQuantity;
                 localStorage.setItem('cart', JSON.stringify(cart));

                 const quantityInput = document.querySelector(`.cart-item[data-id="${itemId}"] .quantity-input`);
                if(quantityInput) {
                     quantityInput.value = newQuantity;
                   }
                updateCartCount();
                updateCartTotal();
            }
        } catch (error) {
            console.error('Miktar güncellenirken hata oluştu:', error);
             showNotification('Miktar güncellenirken hata oluştu', 'error');
        }
    }

    // Event Listeners
    elements.addToCartButtons.forEach(button => {
        button.addEventListener('click', () => addToCart(button));
    });

   function attachCartEventListeners() {
        if (!elements.cartItems) return;

        let lastClickTime = 0;
        const CLICK_DELAY = 400;

        elements.cartItems.addEventListener('click', function(e) {
          const now = Date.now();
            if (now - lastClickTime < CLICK_DELAY) return;
             lastClickTime = now;
            const target = e.target;
            const item = target.closest('.cart-item');


            if (!item) return;

              if (target.classList.contains('minus')) {
                 console.log('Minus button clicked for item:', item.dataset.id);
                 updateItemQuantity(item.dataset.id, -1);
             } else if (target.classList.contains('plus')) {
                  console.log('Plus button clicked for item:', item.dataset.id);
                 updateItemQuantity(item.dataset.id, 1);
             } else if (target.closest('.remove-item')) {
                 console.log('Remove button clicked for item:', item.dataset.id);
                removeFromCart(item.dataset.id);
            }
        });
    }


    // Notification System
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        requestAnimationFrame(() => {
            notification.classList.add('show');
        });

        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    // Form Handlers
    if (elements.contactForm) {
        elements.contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Mesajınız başarıyla gönderildi!', 'success');
            this.reset();
        });
    }

    if (elements.loginForm) {
        elements.loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showNotification('Başarıyla giriş yapıldı!', 'success');
        });
    }

    // Theme Management
    function initTheme() {
        if (elements.themeToggle) {
            const isDarkMode = localStorage.getItem('darkMode') === 'true';
            elements.themeToggle.checked = isDarkMode;
            updateTheme(isDarkMode);

            elements.themeToggle.addEventListener('change', function() {
                const isDarkMode = this.checked;
                localStorage.setItem('darkMode', isDarkMode);
                updateTheme(isDarkMode);
                showNotification(
                    isDarkMode ? 'Koyu tema aktifleştirildi' : 'Açık tema aktifleştirildi',
                    'info'
                );
            });
        }
    }

    function updateTheme(isDarkMode) {
        document.body.classList.toggle('dark-mode', isDarkMode);
        document.body.classList.toggle('light-mode', !isDarkMode);
    }

    // Template Loading
    async function loadTemplate(templateName) {
        try {
            const response = await fetch(`templates/${templateName}.html`);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            const data = await response.text();
            document.getElementById(templateName).innerHTML = data;
            if (templateName === 'header') initTheme();
        } catch (error) {
            showNotification(`${templateName} yüklenemedi`, 'error');
        }
    }

    // Initialize
    Promise.all([
        loadTemplate('header'),
        loadTemplate('footer')
    ]).then(() => {
        updateCartCount();
    }).catch(error => {
        showNotification('Şablon yükleme hatası', 'error');
    });
});