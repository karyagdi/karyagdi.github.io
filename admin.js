document.addEventListener('DOMContentLoaded', function() {
    const inputs = document.querySelectorAll('.input-with-icon input');
    
    inputs.forEach(input => {
        // Input alanında değişiklik olduğunda
        input.addEventListener('input', function() {
            const icon = this.parentNode.querySelector('i');
            if (icon) {
                // Eğer input içinde değer varsa simgeyi gizle
                if (this.value.trim() !== '') {
                    icon.style.opacity = '0';
                } else {
                    icon.style.opacity = '1';
                }
            }
        });
        
        // Sayfa yüklendiğinde kontrol et
        if (input.value.trim() !== '') {
            const icon = input.parentNode.querySelector('i');
            if (icon) icon.style.opacity = '0';
        }
    });
    // Sidebar toggle işlevselliği
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.admin-sidebar');
    const sidebarClose = document.querySelector('.sidebar-close');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.add('active');
        });
    }
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', function() {
            sidebar.classList.remove('active');
        });
    }
     // Örnek kategorileri yükle
    initializeCategories();
    
    // Kategori sayfasındaysa, kategori listesini yükle
    if (window.location.pathname.includes('categories.html')) {
        refreshCategoryList();
        
        // Kategori formuna olay dinleyicisi ekle
        const categoryForm = document.getElementById('category-form');
        if (categoryForm) {
            categoryForm.addEventListener('submit', saveCategory);
        }
        
        // Formu sıfırlama butonu
        const resetButton = document.getElementById('category-reset-btn');
        if (resetButton) {
            resetButton.addEventListener('click', function(e) {
                e.preventDefault();
                resetCategoryForm();
            });
        }
    }
    // Admin giriş işlemi
    const adminLoginForm = document.getElementById('adminLoginForm');
    if (adminLoginForm) {
        adminLoginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            // Basit demo giriş kontrolü (gerçek projede bu güvenli bir API ile yapılmalı)
            if (username === 'admin' && password === 'admin123') {
                // Giriş başarılı - oturumu kaydet ve dashboard'a yönlendir
                localStorage.setItem('adminLoggedIn', 'true');
                localStorage.setItem('adminUsername', 'Admin Kullanıcı');
                
                window.location.href = 'dashboard.html';
            } else {
                // Giriş başarısız - hata mesajı göster
                showNotification('Kullanıcı adı veya şifre hatalı!', 'error');
            }
        });
    }
    
    // Çıkış işlevi
    window.adminLogout = function() {
        localStorage.removeItem('adminLoggedIn');
        localStorage.removeItem('adminUsername');
        window.location.href = 'admin.html';
    };
    
 // Admin kontrolü yapan fonksiyon
function checkAdminAuth() {
    // Ana sayfaya dönme bayrağı kontrol et
    if (localStorage.getItem('bypassAdminCheck') === 'true') {
        localStorage.removeItem('bypassAdminCheck');
        return true; // Kontrolü bypass et
    }
    
    // URL kontrol et - eğer index.html ise admin kontrolü yapma
    const currentPage = window.location.pathname;
    if (currentPage.endsWith('index.html') || currentPage === '/' || currentPage.endsWith('/')) {
        return true; // Ana sayfada ise kontrol yapma
    }

    // Normal admin kontrolü
    const isLoggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    if (!isLoggedIn && !currentPage.endsWith('admin.html')) {
        window.location.href = 'admin.html';
        return false;
    }
    
    return isLoggedIn;
}
    
    // Dashboard sayfası için veri yüklemesi
    function loadDashboardData() {
        // Ürün ve kategori sayılarını localStorage'dan al
        const products = JSON.parse(localStorage.getItem('products')) || [];
        const categories = [];
        
        // Kategori sayısını hesapla (benzersiz kategoriler)
        const uniqueCategories = new Set();
        products.forEach(product => {
            uniqueCategories.add(product.category);
        });
        
        // İstatistikleri güncelle
        const productCount = document.getElementById('product-count');
        const categoryCount = document.getElementById('category-count');
        
        if (productCount) productCount.textContent = products.length;
        if (categoryCount) categoryCount.textContent = uniqueCategories.size;
        
        // Son eklenen ürünleri listele
        const recentProducts = document.getElementById('recent-products');
        if (recentProducts && products.length > 0) {
            // Son 5 ürünü al
            const latestProducts = [...products]
                .sort((a, b) => b.id - a.id)
                .slice(0, 5);
            
            recentProducts.innerHTML = latestProducts.map(product => `
                <tr>
                    <td>${product.name}</td>
                    <td>${product.categoryName}</td>
                    <td>${product.price.toFixed(2)} ₺</td>
                    <td class="table-actions">
                        <a href="products.html?edit=${product.id}" title="Düzenle">
                            <i class="fas fa-edit"></i>
                        </a>
                    </td>
                </tr>
            `).join('');
        } else if (recentProducts) {
            recentProducts.innerHTML = `
                <tr>
                    <td colspan="4" class="text-center">Henüz ürün eklenmemiş</td>
                </tr>
            `;
        }
    }
    // Kategori yönetimi fonksiyonları

// Kategorileri localStorage'dan yükleme
function loadCategories() {
    return JSON.parse(localStorage.getItem('categories')) || [];
}

// Kategorileri localStorage'a kaydetme
function saveCategories(categories) {
    localStorage.setItem('categories', JSON.stringify(categories));
}

// Kategori listesini yenileme
function refreshCategoryList() {
    const categories = loadCategories();
    const categoryList = document.getElementById('category-list');
    
    if (!categoryList) return;
    
    // Kategori listesini temizle
    categoryList.innerHTML = '';
    
    // Kategorileri listele
    if (categories.length === 0) {
        categoryList.innerHTML = '<tr><td colspan="4" class="text-center">Henüz kategori eklenmemiş</td></tr>';
        return;
    }
    
    categories.forEach(category => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${category.id}</td>
            <td>${category.name}</td>
            <td>${category.description || '-'}</td>
            <td class="table-actions">
                <button class="action-btn edit-btn" data-id="${category.id}" title="Düzenle">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete-btn" data-id="${category.id}" title="Sil">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        categoryList.appendChild(row);
    });
    
    // Düzenleme ve silme butonlarına olay dinleyicileri ekle
    attachCategoryEventListeners();
}

// Kategori olay dinleyicileri
function attachCategoryEventListeners() {
    // Kategori düzenleme butonları
    const editButtons = document.querySelectorAll('#category-list .edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', function() {
            const categoryId = parseInt(this.dataset.id);
            editCategory(categoryId);
        });
    });
    
    // Kategori silme butonları
    const deleteButtons = document.querySelectorAll('#category-list .delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const categoryId = parseInt(this.dataset.id);
            deleteCategory(categoryId);
        });
    });
}
// Ürün formundaki kategori dropdown'ını güncelle 
function updateCategoryDropdown() {
    const categorySelect = document.getElementById('product-category');
    if (!categorySelect) return;
    
    const categories = loadCategories();
    
    // Dropdown'ı temizle
    categorySelect.innerHTML = '<option value="">Kategori Seçin</option>';
    
    // Kategorileri ekle
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}
// Site ayarları fonksiyonları

// Varsayılan site ayarları
const defaultSettings = {
    general: {
        siteTitle: 'Onur İnşaat',
        siteDescription: 'Yapı marketinizde seramik, banyo ve mutfak bataryaları',
        siteKeywords: 'seramik, banyo bataryası, mutfak bataryası, inşaat malzemeleri'
    },
    contact: {
        address: 'Atatürk Caddesi No: 123, 34000 İstanbul',
        phone: '+90 212 123 45 67',
        email: 'info@onurinsaat.com',
        hours: 'Hafta içi: 09:00-18:00, Cumartesi: 09:00-13:00'
    },
    social: {
        facebook: 'https://facebook.com/onurinsaat',
        instagram: 'https://instagram.com/onurinsaat',
        twitter: 'https://twitter.com/onurinsaat',
        youtube: 'https://youtube.com/onurinsaat'
    },
    footer: {
        copyrightText: '© 2025 Onur İnşaat - Tüm Hakları Saklıdır'
    }
};

// Site ayarlarını localStorage'dan yükle
function loadSettings() {
    const storedSettings = localStorage.getItem('siteSettings');
    return storedSettings ? JSON.parse(storedSettings) : defaultSettings;
}

// Site ayarlarını localStorage'a kaydet
function saveSettings(settings) {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
}

// Form alanlarını mevcut ayarlarla doldur
function populateSettingsForm() {
    const settings = loadSettings();
    
    // Genel ayarlar
    document.getElementById('site-title').value = settings.general.siteTitle || '';
    document.getElementById('site-description').value = settings.general.siteDescription || '';
    document.getElementById('site-keywords').value = settings.general.siteKeywords || '';
    
    // İletişim bilgileri
    document.getElementById('contact-address').value = settings.contact.address || '';
    document.getElementById('contact-phone').value = settings.contact.phone || '';
    document.getElementById('contact-email').value = settings.contact.email || '';
    document.getElementById('contact-hours').value = settings.contact.hours || '';
    
    // Sosyal medya
    document.getElementById('social-facebook').value = settings.social.facebook || '';
    document.getElementById('social-instagram').value = settings.social.instagram || '';
    document.getElementById('social-twitter').value = settings.social.twitter || '';
    document.getElementById('social-youtube').value = settings.social.youtube || '';
    
    // Footer metni
    document.getElementById('footer-text').value = settings.footer.copyrightText || '';
}

// Form verilerinden ayarları güncelle
function updateSettingsFromForm() {
    const settings = {
        general: {
            siteTitle: document.getElementById('site-title').value,
            siteDescription: document.getElementById('site-description').value,
            siteKeywords: document.getElementById('site-keywords').value
        },
        contact: {
            address: document.getElementById('contact-address').value,
            phone: document.getElementById('contact-phone').value,
            email: document.getElementById('contact-email').value,
            hours: document.getElementById('contact-hours').value
        },
        social: {
            facebook: document.getElementById('social-facebook').value,
            instagram: document.getElementById('social-instagram').value,
            twitter: document.getElementById('social-twitter').value,
            youtube: document.getElementById('social-youtube').value
        },
        footer: {
            copyrightText: document.getElementById('footer-text').value
        }
    };
    
    saveSettings(settings);
    return settings;
}

// Site ayarları formunu başlat ve olay dinleyicisi ekle
document.addEventListener('DOMContentLoaded', function() {
    // Ayarlar sayfasındaysa form işlemlerini başlat
    if (window.location.pathname.includes('settings.html')) {
        // Formu mevcut ayarlarla doldur
        populateSettingsForm();
        
        // Form gönderildiğinde ayarları kaydet
        const settingsForm = document.getElementById('site-settings-form');
        if (settingsForm) {
            settingsForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                updateSettingsFromForm();
                showNotification('Site ayarları başarıyla kaydedildi.', 'success');
            });
        }
    }
    
    // Ana sayfada ayarları uygula (footer, başlık vb.)
    applySettingsToSite();
});

// Site ayarlarını web sayfasına uygula
function applySettingsToSite() {
    const settings = loadSettings();
    
    // Sayfa başlığını güncelle
    document.title = settings.general.siteTitle;
    
    // Footer metnini güncelle
    const footerCopyright = document.querySelector('.footer-copyright');
    if (footerCopyright) {
        footerCopyright.textContent = settings.footer.copyrightText;
    }
    
    // İletişim bilgilerini güncelle
    const contactElements = {
        'contact-address': settings.contact.address,
        'contact-phone': settings.contact.phone,
        'contact-email': settings.contact.email,
        'contact-hours': settings.contact.hours
    };
    
    Object.keys(contactElements).forEach(id => {
        const element = document.getElementById(id);
        if (element) element.textContent = contactElements[id];
    });
    
    // Sosyal medya linklerini güncelle
    const socialLinks = {
        'social-facebook': settings.social.facebook,
        'social-instagram': settings.social.instagram,
        'social-twitter': settings.social.twitter,
        'social-youtube': settings.social.youtube
    };
    
    Object.keys(socialLinks).forEach(id => {
        const element = document.querySelector(`a[href*="${id.replace('social-', '')}"]`);
        if (element && socialLinks[id]) element.href = socialLinks[id];
    });
}

// Ürün sayfasında kategori dropdown'ını yükle
if (window.location.pathname.includes('products.html')) {
    updateCategoryDropdown();
}

// Yeni kategori ekleme veya var olanı güncelleme
function saveCategory(event) {
    event.preventDefault();
    
    const categoryForm = document.getElementById('category-form');
    const categoryId = parseInt(categoryForm.dataset.categoryId) || 0;
    const categoryName = document.getElementById('category-name').value.trim();
    const categoryDescription = document.getElementById('category-description').value.trim();
    
    if (!categoryName) {
        showNotification('Kategori adı boş olamaz!', 'error');
        return;
    }
    
    const categories = loadCategories();
    
    // Var olan kategoriyi güncelleme
    if (categoryId > 0) {
        const index = categories.findIndex(cat => cat.id === categoryId);
        if (index !== -1) {
            categories[index] = {
                ...categories[index],
                name: categoryName,
                description: categoryDescription,
            };
            saveCategories(categories);
            showNotification('Kategori başarıyla güncellendi', 'success');
        }
    } 
    // Yeni kategori ekleme
    else {
        // Yeni ID oluştur (mevcut en büyük ID + 1 veya 1)
        const newId = categories.length > 0 
            ? Math.max(...categories.map(cat => cat.id)) + 1 
            : 1;
            
        const newCategory = {
            id: newId,
            name: categoryName,
            description: categoryDescription,
        };
        
        categories.push(newCategory);
        saveCategories(categories);
        showNotification('Yeni kategori başarıyla eklendi', 'success');
    }
    
    // Formu temizle ve listeyi yenile
    resetCategoryForm();
    refreshCategoryList();
}

// Kategori düzenleme
function editCategory(categoryId) {
    const categories = loadCategories();
    const category = categories.find(cat => cat.id === categoryId);
    
    if (!category) {
        showNotification('Kategori bulunamadı', 'error');
        return;
    }
    
    // Form alanlarını doldur
    const categoryForm = document.getElementById('category-form');
    categoryForm.dataset.categoryId = category.id;
    
    document.getElementById('category-name').value = category.name;
    document.getElementById('category-description').value = category.description || '';
    
    // Form başlığını güncelle
    document.getElementById('category-form-title').textContent = 'Kategori Düzenle';
    document.getElementById('category-submit-btn').textContent = 'Güncelle';
}

// Kategori silme
function deleteCategory(categoryId) {
    if (!confirm('Bu kategoriyi silmek istediğinize emin misiniz?')) {
        return;
    }
    
    const categories = loadCategories();
    const updatedCategories = categories.filter(cat => cat.id !== categoryId);
    
    saveCategories(updatedCategories);
    showNotification('Kategori başarıyla silindi', 'success');
    refreshCategoryList();
}

// Kategori formunu sıfırlama
function resetCategoryForm() {
    const categoryForm = document.getElementById('category-form');
    categoryForm.reset();
    delete categoryForm.dataset.categoryId;
    
    // Form başlığını güncelle
    document.getElementById('category-form-title').textContent = 'Yeni Kategori Ekle';
    document.getElementById('category-submit-btn').textContent = 'Ekle';
}

// Örnek kategorileri yükle (eğer yoksa)
function initializeCategories() {
    const categories = loadCategories();
    
    // Eğer kategoriler zaten varsa, yeniden oluşturmaya gerek yok
    if (categories.length > 0) return;
    
    // Örnek kategoriler
    const sampleCategories = [
        { id: 1, name: 'Seramik', description: 'Yer ve duvar seramikleri' },
        { id: 2, name: 'Banyo Bataryaları', description: 'Lavabo, duş ve küvet bataryaları' },
        { id: 3, name: 'Mutfak Bataryaları', description: 'Eviye ve ankastre bataryalar' },
        { id: 4, name: 'Klozet', description: 'Klozet ve rezervuarlar' },
    ];
    
    // Örnek kategorileri kaydet
    saveCategories(sampleCategories);
    console.log('Örnek kategoriler oluşturuldu:', sampleCategories.length);
}
    
    // Bildirim gösterme fonksiyonu
    window.showNotification = function(message, type = 'info') {
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
    
    // Sayfa yüklendiğinde çalıştırılacak kodlar
    const isAdmin = checkAdminAuth();
    
    if (isAdmin) {
        // Admin kullanıcı bilgilerini göster
        const adminUsername = localStorage.getItem('adminUsername');
        const usernameElements = document.querySelectorAll('.sidebar-profile h4, .user-name');
        
        usernameElements.forEach(el => {
            if (el) el.textContent = adminUsername || 'Admin';
        });
        
        // Dashboard sayfasıysa verileri yükle
        if (window.location.pathname.endsWith('dashboard.html')) {
            loadDashboardData();
        }
    }

// Web sayfasındaki ürünleri localStorage'a import eden fonksiyon
function importProductsFromWebPage() {
    // ÖNEMLİ: Zorla ürünleri yeniden yükle - bir kerelik kullanım için
    localStorage.removeItem('products');
    
    // Temel ürün verilerini oluştur
    const products = [
        // Seramik ürünleri
        {
            id: 101,
            name: 'Statiuario Goya Yer Seramiği',
            category: 1,
            categoryName: 'Seramik',
            price: 450.00,
            description: '30x60 cm, Parlak Yüzey',
            image: 'images/statuariogoya.png'
        },
        {
            id: 102,
            name: 'Nomerles White Yer Seramiği',
            category: 1,
            categoryName: 'Seramik',
            price: 380.00,
            description: '60x120, 0.7cm, Mat Yüzey',
            image: 'images/nomerleswhite.jpg'
        },
       
        {
        id: 103,
        name: 'Shanti Yer Seramiği',
        category: 1,
        categoryName: 'Seramik',
        price: 520.00,
        description: '60x120, 0.7cm, Ahşap Görünüm',
        image: 'images/shanti.jpg'
    },
    {
        id: 104,
        name: 'Nomerles Grey Yer Seramiği',
        category: 1,
        categoryName: 'Seramik',
        price: 490.00,
        description: '60x120, 0.7cm, Parlak Yüzey',
        image: 'images/nomerlesgrey.png'
    },
    {
        id: 105,
        name: 'Lagom Gra Yer Seramiği',
        category: 1,
        categoryName: 'Seramik',
        price: 620.00,
        description: '60x120, 0.7cm, 3D Yüzey',
        image: 'images/lagomgra.jpg'
    },
    {
        id: 106,
        name: 'Leeds White Yer Seramiği',
        category: 1,
        categoryName: 'Seramik',
        price: 420.00,
        description: '60x120 cm, Su Geçirmez',
        image: 'images/leedswhite.jpg'
    },
    {
        id: 107,
        name: 'Afyon Beyaz Yer Seramiği',
        category: 1,
        categoryName: 'Seramik',
        price: 480.00,
        description: '60x60 cm, Leke Tutmaz',
        image: 'images/afyonbeyaz.jpg'
    },
    {
        id: 108,
        name: 'Noble Statuario White Yer Seramiği',
        category: 1,
        categoryName: 'Seramik',
        price: 550.00,
        description: '30x60 cm, Dona Dayanıklı',
        image: 'images/noblestatuariowhite.jpg'
    },
    {
        id: 109,
        name: 'Prima Gri Yer Seramiği',
        category: 1,
        categoryName: 'Seramik',
        price: 720.00,
        description: '60x60 cm, Ultra Dayanıklı',
        image: 'images/primakoyu.jpg'
    },
    {
        id: 110,
        name: 'Prima Beyaz Yer Seramiği',
        category: 1,
        categoryName: 'Seramik',
        price: 850.00,
        description: '60x60 cm, Dekoratif',
        image: 'images/primabeyaz.jpg'
    },
     {
        id: 111,
        name: 'Gildo Lavabo Bataryası',
        category: 2,
        categoryName: 'Banyo Bataryaları',
        price: 2149.00,
        description: 'Krom Kaplama, Su Tasarruflu',
        image: 'images/gildolavabogumus.jpg'
    },
    {
        id: 112,
        name: 'Gildo Lavabo Bataryası',
        category: 2,
        categoryName: 'Banyo Bataryaları',
        price: 2549.00,
        description: 'Siyah Kaplama, Su Tasarruflu',
        image: 'images/gildolavabo.jpg'
    },
    {
        id: 113,
        name: 'Gildo Tek Gövde Lavabo Bataryası',
        category: 2,
        categoryName: 'Banyo Bataryaları',
        price: 3099.00,
        description: 'Siyah Kaplama, Su Tasarruflu',
        image: 'images/gildolavabosr.jpg'
    },
    {
        id: 114,
        name: 'Adrio Lavabo Bataryası',
        category: 2,
        categoryName: 'Banyo Bataryaları',
        price: 1699.00,
        description: 'Krom Kaplama, Su Tasarruflu',
        image: 'images/adriolavabo.jpg'
    },
    {
        id: 115,
        name: 'Atros Lavabo Bataryası',
        category: 2,
        categoryName: 'Banyo Bataryaları',
        price: 2099.00,
        description: 'Krom Kaplama, Su Tasarruflu',
        image: 'images/atroslavabo.jpg'
    },
    {
        id: 116,
        name: 'Espina Lavabo Bataryası',
        category: 2,
        categoryName: 'Banyo Bataryaları',
        price: 2049.00,
        description: 'Krom Kaplama, Su Tasarruflu',
        image: 'images/espinalavabo.jpg'
    },
    {
        id: 117,
        name: 'Ritmo Lavabo Bataryası',
        category: 2,
        categoryName: 'Banyo Bataryaları',
        price: 2499.00,
        description: 'Krom Kaplama, Su Tasarruflu',
        image: 'images/ritmolavabo.jpg'
    },
    {
        id: 118,
        name: 'Provido Lavabo Bataryası',
        category: 2,
        categoryName: 'Banyo Bataryaları',
        price: 4499.00,
        description: 'Gold Kaplama, Su Tasarruflu',
        image: 'images/providolavaboa.jpg'
    },
    {
    id: 119,
    name: 'Tauro Lavabo Bataryası',
    category: 2,
    categoryName: 'Banyo Bataryaları',
    price: 3200.00,
    description: 'Siyah Kaplama, Su Tasarruflu',
    image: 'images/taurolavabosiyah.jpg'
},
{
    id: 120,
    name: 'Tauro Set Üstü Lavabo Bataryası',
    category: 2,
    categoryName: 'Banyo Bataryaları',
    price: 1750.00,
    description: 'Siyah Kaplama, Su Tasarruflu',
    image: 'images/taurolavabos.jpg'
},
{
    id: 121,
    name: 'Pruva Lavabo Bataryası',
    category: 2,
    categoryName: 'Banyo Bataryaları',
    price: 750.00,
    description: 'Krom Kaplama, Su Tasarruflu',
    image: 'images/pruvalavabo.jpg'
},
{
    id: 122,
    name: 'Atros Eviye Bataryası',
    category: 1,
    categoryName: 'Mutfak Bataryaları',
    price: 920.00,
    description: 'Krom Kaplama, Su Tasarruflu',
    image: 'images/atrosevye.jpg'
},
{
    id: 123,
    name: 'Espina Eviye Bataryası',
    category: 1,
    categoryName: 'Mutfak Bataryaları',
    price: 850.00,
    description: 'Krom Kaplama, Su Tasarruflu',
    image: 'images/espinaevye.jpg'
},
{
    id: 124,
    name: 'Felis Eviye Bataryası',
    category: 1,
    categoryName: 'Mutfak Bataryaları',
    price: 1200.00,
    description: 'Krom Kaplama, Su Tasarruflu',
    image: 'images/felisevye.jpg'
},
{
    id: 125,
    name: 'Florus Eviye Bataryası',
    category: 1,
    categoryName: 'Mutfak Bataryaları',
    price: 1850.00,
    description: 'Krom Kaplama, Su Tasarruflu',
    image: 'images/florusevye.jpg'
},

{
    "id": 126,
    "name": "Frezia Eviye Bataryası",
    "category": 1,
    "categoryName": "Mutfak Bataryaları",
    "price": 1450.00,
    "description": "Krom Kaplama, Su Tasarruflu",
    "image": "images/freziaevye.jpg"
  },
  {
    "id": 127,
    "name": "Tauro Eviye Bataryası",
    "category": 1,
    "categoryName": "Mutfak Bataryaları",
    "price": 2200.00,
    "description": "Krom Kaplama, Su Tasarruflu",
    "image": "images/gpdtauroevye.jpg"
  },
  {
    "id": 128,
    "name": "Provido Eviye Bataryası",
    "category": 1,
    "categoryName": "Mutfak Bataryaları",
    "price": 980.00,
    "description": "Gold Kaplama, Su Tasarruflu",
    "image": "images/providoevye.jpg"
  },
  {
    "id": 129,
    "name": "Pedra Eviye Bataryası",
    "category": 1,
    "categoryName": "Mutfak Bataryaları",
    "price": 3200.00,
    "description": "Krom Kaplama, Su Tasarruflu",
    "image": "images/pedraevye.jpg"
  },
  {
    "id": 130,
    "name": "Ritmo Eviye Bataryası",
    "category": 1,
    "categoryName": "Mutfak Bataryaları",
    "price": 1750.00,
    "description": "Krom Kaplama, Su Tasarruflu",
    "image": "images/ritmoevye.jpg"
  },
  {
    "id": 131,
    "name": "Solus Eviye Bataryası",
    "category": 1,
    "categoryName": "Mutfak Bataryaları",
    "price": 1750.00,
    "description": "Krom Kaplama, Su Tasarruflu",
    "image": "images/solusevye.jpg"
  },
  {
    "id": 132,
    "name": "Claire Eviye Bataryası",
    "category": 1,
    "categoryName": "Mutfak Bataryaları",
    "price": 980.00,
    "description": "Krom Kaplama, Su Tasarruflu",
    "image": "images/claireevye.jpg"
  },
  {
    "id": 133,
    "name": "Spiralli Eviye Bataryası",
    "category": 1,
    "categoryName": "Mutfak Bataryaları",
    "price": 3200.00,
    "description": "Krom Kaplama, Su Tasarruflu",
    "image": "images/spirallievye.jpg"
  },
  {
    "id": 134,
    "name": "Kare Spiral Eviye Bataryası",
    "category": 1,
    "categoryName": "Mutfak Bataryaları",
    "price": 1750.00,
    "description": "Krom Kaplama, Su Tasarruflu",
    "image": "images/karespiralevye.jpg"
  },
  {
    "id": 135,
    "name": "Pruva Eviye Bataryası",
    "category": 1,
    "categoryName": "Mutfak Bataryaları",
    "price": 1750.00,
    "description": "Krom Kaplama, Su Tasarruflu",
    "image": "images/pruvaevye.jpg"
  },
  {
    "id": 136,
    "name": "Atros Banyo Bataryası",
    "category": 2,
    "categoryName": "Banyo Bataryaları",
    "price": 3200.00,
    "description": "Krom Kaplama, Su Tasarruflu",
    "image": "images/atrosbanyo.jpg"
  },
  {
    "id": 137,
    "name": "Espina Banyo Bataryası",
    "category": 2,
    "categoryName": "Banyo Bataryaları",
    "price": 1750.00,
    "description": "Krom Kaplama, Su Tasarruflu",
    "image": "images/espinabanyo.jpg"
  },
  {
    "id": 138,
    "name": "Florus Banyo Bataryası",
    "category": 2,
    "categoryName": "Banyo Bataryaları",
    "price": 1750.00,
    "description": "Krom Kaplama, Su Tasarruflu",
    "image": "images/florusbanyo.jpg"
  },
  {
    "id": 139,
    "name": "Gildo Banyo Bataryası",
    "category": 2,
    "categoryName": "Banyo Bataryaları",
    "price": 980.00,
    "description": "Siyah Kaplama, Su Tasarruflu",
    "image": "images/gildobanyosr.jpg"
  },
  {
    "id": 140,
    "name": "Provido Banyo Bataryası",
    "category": 2,
    "categoryName": "Banyo Bataryaları",
    "price": 3200.00,
    "description": "Krom Kaplama, Su Tasarruflu",
    "image": "images/gpdprovido.jpg"
  },
  {
    "id": 141,
    "name": "Tauro Banyo Bataryası",
    "category": 2,
    "categoryName": "Banyo Bataryaları",
    "price": 1750.00,
    "description": "Gold Kaplama, Su Tasarruflu",
    "image": "images/taurobanyoa.jpg"
  },

        // Daha fazla ürünü elleriyle ekleyin veya otomatik oluşturun
    ];
    
    // localStorage'a kaydet
    localStorage.setItem('products', JSON.stringify(products));
    console.log('Ürünler başarıyla içe aktarıldı: ' + products.length + ' ürün');
    
    // Sayfa yenilemesi için kullanıcıya bilgi ver
    showNotification('Ürünler yeniden yüklendi. Toplam: ' + products.length, 'success');
}

// İşlevi çağır - sayfanın sonunda
importProductsFromWebPage();

});
