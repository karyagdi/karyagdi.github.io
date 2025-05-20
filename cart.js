// cart.js dosyası
document.addEventListener('DOMContentLoaded', function() {
    // Sepete ekle butonları
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.dataset.id);
            const quantity = document.getElementById('product-quantity') ? 
                parseInt(document.getElementById('product-quantity').value) : 1;
                
            addToCart(productId, quantity);
        });
    });
    
    // Sepet ikonunda ürün sayısını güncelle
    updateCartCounter();
});

// Sepete ürün ekle
function addToCart(productId, quantity = 1) {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    const product = products.find(p => p.id === productId);
    
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Ürün zaten sepette mi kontrol et
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Bildirim göster
    showNotification('Ürün sepete eklendi', 'success');
    
    // Sepet sayacını güncelle
    updateCartCounter();
}

// Sepet sayacını güncelle
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    
    const cartCounter = document.querySelector('.cart-count');
    if (cartCounter) {
        cartCounter.textContent = totalItems;
        
        if (totalItems > 0) {
            cartCounter.classList.add('has-items');
        } else {
            cartCounter.classList.remove('has-items');
        }
    }
}
