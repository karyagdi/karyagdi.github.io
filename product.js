document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const productsList = document.getElementById('products-list');
    const addProductBtn = document.getElementById('add-product-btn');
    const productModal = document.getElementById('product-modal');
    const deleteModal = document.getElementById('delete-modal');
    const productForm = document.getElementById('product-form');
    const modalTitle = document.getElementById('modal-title');
    const modalCloseButtons = document.querySelectorAll('.modal-close, .modal-close-btn');
    const confirmDeleteBtn = document.getElementById('confirm-delete');
    const productSearch = document.getElementById('product-search');
    const productImage = document.getElementById('product-image');
    const imagePreview = document.getElementById('image-preview');
    
    // Ürün verilerini localStorage'dan al
    let products = JSON.parse(localStorage.getItem('products')) || [];
    
    // Kategori listesi
    const categories = [
        { id: 1, name: 'Seramik' },
        { id: 2, name: 'Banyo Bataryaları' },
        { id: 3, name: 'Mutfak Bataryaları' },
        { id: 4, name: 'Klozet' }
    ];
    
    let editingProductId = null;
    let selectedProductId = null;
    let imageBase64 = null;
    
    // Ürünleri listele
    function renderProducts(productList) {
        if (!productsList) return;
        
        if (productList.length === 0) {
            productsList.innerHTML = `
                <tr>
                    <td colspan="6" class="text-center">Henüz ürün bulunmuyor</td>
                </tr>
            `;
            return;
        }
        
        productsList.innerHTML = productList.map(product => `
            <tr>
                <td>${product.id}</td>
                <td>
                    <img src="${product.image}" alt="${product.name}" class="products-table-image">
                </td>
                <td>${product.name}</td>
                <td>${product.categoryName}</td>
                <td>${product.price.toFixed(2)} ₺</td>
                <td class="table-actions">
                    <button class="edit-btn" data-id="${product.id}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="delete-btn" data-id="${product.id}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');
        
        // Düzenleme ve silme butonlarına event listener ekle
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                editProduct(id);
            });
        });
        
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const id = parseInt(this.getAttribute('data-id'));
                showDeleteModal(id);
            });
        });
    }
    
    // İlk ürün listesini yükle
    renderProducts(products);
    
    // Modalı aç
    function openModal(modal) {
        if (!modal) return;
        modal.style.display = 'flex';
    }
    
    // Modalı kapat
    function closeModal(modal) {
        if (!modal) return;
        modal.style.display = 'none';
    }
    
    // Yeni ürün ekle modalını göster
    function showAddProductModal() {
        modalTitle.textContent = 'Yeni Ürün Ekle';
        productForm.reset();
        imagePreview.style.backgroundImage = '';
        editingProductId = null;
        imageBase64 = null;
        openModal(productModal);
    }
    
    // Ürün düzenleme modalını göster
    function editProduct(id) {
        const product = products.find(p => p.id === id);
        if (!product) return;
        
        modalTitle.textContent = 'Ürün Düzenle';
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-description').value = product.description || '';
        imagePreview.style.backgroundImage = `url('${product.image}')`;
        
        editingProductId = id;
        openModal(productModal);
    }
    
    // Silme onay modalını göster
    function showDeleteModal(id) {
        selectedProductId = id;
        openModal(deleteModal);
    }
    
    // Ürün kaydet (ekle veya güncelle)
    function saveProduct(e) {
        e.preventDefault();
        
        const name = document.getElementById('product-name').value;
        const categoryId = parseInt(document.getElementById('product-category').value);
        const price = parseFloat(document.getElementById('product-price').value);
        const description = document.getElementById('product-description').value;
        
        // Kategori adını bul
        const category = categories.find(c => c.id === categoryId);
        if (!category) {
            alert('Lütfen geçerli bir kategori seçin');
            return;
        }
        
        // Yeni veya güncellenmiş ürün
        const product = {
            name,
            category: categoryId,
            categoryName: category.name,
            price,
            description,
            image: imageBase64 || (editingProductId ? products.find(p => p.id === editingProductId).image : 'https://via.placeholder.com/150?text=Ürün')
        };
        
        if (editingProductId) {
            // Mevcut ürünü güncelle
            const index = products.findIndex(p => p.id === editingProductId);
            if (index !== -1) {
                product.id = editingProductId;
                products[index] = product;
                showNotification('Ürün başarıyla güncellendi', 'success');
            }
        } else {
            // Yeni ürün ekle
            product.id = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
            products.push(product);
            showNotification('Ürün başarıyla eklendi', 'success');
        }
        
        // LocalStorage'a kaydet
        localStorage.setItem('products', JSON.stringify(products));
        
        // UI'ı güncelle ve modalı kapat
        renderProducts(products);
        closeModal(productModal);
    }
    
    // Ürün sil
    function deleteProduct() {
        if (!selectedProductId) return;
        
        products = products.filter(p => p.id !== selectedProductId);
        localStorage.setItem('products', JSON.stringify(products));
        renderProducts(products);
        
        closeModal(deleteModal);
        showNotification('Ürün başarıyla silindi', 'success');
        selectedProductId = null;
    }
    
    // Bildirim göster
    function showNotification(message, type) {
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
    
    // Resim yükleme ve önizleme
    if (productImage) {
        productImage.addEventListener('change', function(e) {
            if (!e.target.files.length) return;
            
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onload = function(event) {
                imageBase64 = event.target.result;
                imagePreview.style.backgroundImage = `url('${imageBase64}')`;
            };
            
            reader.readAsDataURL(file);
        });
    }
    
    // Ürün arama
    if (productSearch) {
        productSearch.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase().trim();
            if (!searchTerm) {
                renderProducts(products);
                return;
            }
            
            const filteredProducts = products.filter(product => 
                product.name.toLowerCase().includes(searchTerm) || 
                product.description.toLowerCase().includes(searchTerm) ||
                product.categoryName.toLowerCase().includes(searchTerm)
            );
            
            renderProducts(filteredProducts);
        });
    }
    
    // Event Listeners
    if (addProductBtn) {
        addProductBtn.addEventListener('click', showAddProductModal);
    }
    
    if (productForm) {
        productForm.addEventListener('submit', saveProduct);
    }
    
    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', deleteProduct);
    }
    
    // Modal kapatma düğmeleri
    modalCloseButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.admin-modal');
            closeModal(modal);
        });
    });
    
    // Sayfa dışına tıklayınca modalı kapat
    window.addEventListener('click', function(e) {
        if (e.target === productModal) {
            closeModal(productModal);
        }
        if (e.target === deleteModal) {
            closeModal(deleteModal);
        }
    });
    
    // İlk ürün listesini yükle
    // Sayfalama ile ürün listesini oluştur
function renderProductsWithPagination(productList, currentPage = 1, itemsPerPage = 10) {
    if (!productsList) return;
    
    // Toplam ürün sayısını göster
    const totalProductCount = document.getElementById('total-product-count');
    if (totalProductCount) {
        totalProductCount.textContent = productList.length;
    }
    
    if (productList.length === 0) {
        productsList.innerHTML = `
            <tr>
                <td colspan="6" class="text-center">Henüz ürün bulunmuyor</td>
            </tr>
        `;
        return;
    }
    
    // Mevcut sayfa için ürünleri al
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, productList.length);
    const currentPageProducts = productList.slice(startIndex, endIndex);
    
    // Ürünleri listele
    productsList.innerHTML = currentPageProducts.map(product => `
        <tr>
            <td>${product.id}</td>
            <td>
                <img src="${product.image}" alt="${product.name}" class="products-table-image">
            </td>
            <td>${product.name}</td>
            <td>${product.categoryName}</td>
            <td>${product.price.toFixed(2)} ₺</td>
            <td class="table-actions">
                <button class="edit-btn" data-id="${product.id}">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="delete-btn" data-id="${product.id}">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        </tr>
    `).join('');
    
    // Sayfalama butonları oluştur
    const totalPages = Math.ceil(productList.length / itemsPerPage);
    
    // Sayfalama konteynerini bul veya oluştur
    let paginationContainer = document.querySelector('.admin-pagination');
    if (!paginationContainer) {
        paginationContainer = document.createElement('div');
        paginationContainer.className = 'admin-pagination';
        productsList.parentElement.parentElement.appendChild(paginationContainer);
    }
    
    // Sayfalama HTML'ini oluştur
    let paginationHTML = '';
    
    // Önceki sayfa butonu
    paginationHTML += `<button class="page-btn prev" ${currentPage === 1 ? 'disabled' : ''}>&laquo;</button>`;
    
    // Sayfa numaraları
    for (let i = 1; i <= totalPages; i++) {
        if (
            i === 1 || // İlk sayfa
            i === totalPages || // Son sayfa
            (i >= currentPage - 1 && i <= currentPage + 1) // Mevcut sayfanın çevresi
        ) {
            paginationHTML += `<button class="page-btn ${i === currentPage ? 'active' : ''}" data-page="${i}">${i}</button>`;
        } else if (
            (i === 2 && currentPage > 3) ||
            (i === totalPages - 1 && currentPage < totalPages - 2)
        ) {
            paginationHTML += `<span class="page-ellipsis">...</span>`;
        }
    }
    
    // Sonraki sayfa butonu
    paginationHTML += `<button class="page-btn next" ${currentPage === totalPages ? 'disabled' : ''}>&raquo;</button>`;
    
    // Sayfalama HTML'ini ekle
    paginationContainer.innerHTML = paginationHTML;
    
    // Sayfalama olay dinleyicileri ekle
    paginationContainer.querySelectorAll('.page-btn').forEach(btn => {
        if (btn.classList.contains('prev')) {
            btn.addEventListener('click', () => {
                if (currentPage > 1) {
                    renderProductsWithPagination(productList, currentPage - 1, itemsPerPage);
                }
            });
        } else if (btn.classList.contains('next')) {
            btn.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    renderProductsWithPagination(productList, currentPage + 1, itemsPerPage);
                }
            });
        } else {
            btn.addEventListener('click', () => {
                const page = parseInt(btn.getAttribute('data-page'));
                renderProductsWithPagination(productList, page, itemsPerPage);
            });
        }
    });
    
    // Düzenleme ve silme butonlarına event listener ekle
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            editProduct(id);
        });
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            showDeleteModal(id);
        });
    });
}

// İlk ürün listesini sayfalama ile yükle
renderProductsWithPagination(products);
});
