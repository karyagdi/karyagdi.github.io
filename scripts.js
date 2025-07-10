document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
    const seoConfigs = {
    'index': {
        title: 'Onur İnşaat - Afyonkarahisar İnşaat Malzemeleri | 25 Yıllık Deneyim',
        description: '25+ yıllık deneyimle Afyonkarahisar\'da kaliteli inşaat malzemeleri. Onur İnşaat güvencesiyle seramik, banyo, mutfak bataryaları.',
        keywords: 'onur inşaat, afyonkarahisar inşaat, seramik, banyo bataryası, mutfak bataryası'
    },
    'kategoriler': {
        title: 'Kategoriler - Onur İnşaat | Afyonkarahisar Seramik Banyo Mutfak',
        description: 'Onur İnşaat kategoriler: Seramik, banyo bataryaları, mutfak bataryaları, klozet ve lavabo. 25 yıldır Afyonkarahisar.',
        keywords: 'onur inşaat kategoriler, seramik afyon, banyo bataryası, mutfak bataryası, klozet'
    },
    'urunler': {
        title: 'Ürünler - Onur İnşaat | Afyonkarahisar İnşaat Malzemeleri Kataloğu',
        description: 'Onur İnşaat ürün kataloğu. Binlerce çeşit kaliteli inşaat malzemesi. Uygun fiyatlar, 25 yıllık güven.',
        keywords: 'onur inşaat ürünler, inşaat malzemeleri, seramik çeşitleri, banyo ürünleri'
    },
    'iletisim': {
        title: 'İletişim - Onur İnşaat | Afyonkarahisar Adres Telefon Harita',
        description: 'Onur İnşaat iletişim bilgileri: Ali & Mustafa Karyağdı. Afyonkarahisar adres, telefon, harita. 25 yıldır hizmetinizde.',
        keywords: 'onur inşaat iletişim, afyonkarahisar adres, ali karyağdı, mustafa karyağdı'
    },
    'sepet': {
        title: 'Sepetim - Onur İnşaat | Afyonkarahisar Alışveriş Sepeti',
        description: 'Onur İnşaat alışveriş sepetiniz. Seçtiğiniz ürünleri görüntüleyin, sipariş verin. Güvenli alışveriş.',
        keywords: 'onur inşaat sepet, alışveriş, sipariş, afyonkarahisar'
    },
    'favoriler': {
        title: 'Favorilerim - Onur İnşaat | Afyonkarahisar Beğenilen Ürünler',
        description: 'Onur İnşaat favori ürünleriniz. Beğendiğiniz ürünleri takip edin. 25 yıllık kalite güvencesi.',
        keywords: 'onur inşaat favoriler, beğenilen ürünler, afyonkarahisar'
    },
    'onur': {
        title: 'Ali & Mustafa Karyağdı - Onur İnşaat | Kurucular İletişim',
        description: 'Onur İnşaat kurucuları Ali ve Mustafa Karyağdı. 25 yıllık deneyim, iletişim bilgileri, telefon numaraları.',
        keywords: 'ali karyağdı, mustafa karyağdı, onur inşaat kurucular, afyonkarahisar'
    }
};
    if (seoConfigs[currentPage]) {
        setSEOMeta(seoConfigs[currentPage]);
    }
    if (currentPage !== 'index') {
        const main = document.querySelector('main');
        if (main) {
            main.insertAdjacentHTML('afterbegin', createBreadcrumb());
        }
    }
});
function initSlider() {
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.querySelector('.prev-slide');
const nextBtn = document.querySelector('.next-slide');
let currentSlide = 0;
let slideInterval;
function startSlideInterval() {
slideInterval = setInterval(() => {
goToNextSlide();
}, 5000);
}
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
clearInterval(slideInterval);
goToNextSlide();
startSlideInterval();
}

if (touchEndX - touchStartX > 50) {
clearInterval(slideInterval);
goToPrevSlide();
startSlideInterval();
}
}
startSlideInterval();
}
function setupMobileMenu() {
const hamburgerBtn = document.getElementById('hamburger-menu');
const overlay = document.getElementById('mobile-menu-overlay');
const closeBtn = document.getElementById('close-overlay');

if (!hamburgerBtn || !overlay || !closeBtn) return;
hamburgerBtn.addEventListener('click', function() {
overlay.classList.add('active');
document.body.style.overflow = 'hidden';
});
closeBtn.addEventListener('click', function() {
overlay.classList.remove('active');
document.body.style.overflow = '';
});
const cartCount = document.getElementById('cart-count');
const cartCountMobile = document.getElementById('cart-count-mobile');

if (cartCount && cartCountMobile) {
cartCountMobile.textContent = cartCount.textContent;

const observer = new MutationObserver(function(mutations) {
mutations.forEach(function(mutation) {
if (mutation.type === 'characterData' || mutation.type === 'childList') {
cartCountMobile.textContent = cartCount.textContent;
}
});
});

observer.observe(cartCount, { characterData: true, childList: true, subtree: true });
}
}

function initProductModal() {

const modal = document.getElementById('product-modal');
const modalImg = document.getElementById('modal-image');
const modalCaption = document.getElementById('modal-caption');
const closeModal = document.querySelector('.close-modal');

if (!modal || !modalImg || !closeModal) {
console.log('Modal elementleri bulunamadı');
return;
}


function addClickListeners() {
const productImages = document.querySelectorAll('.product-image img, .product-card img, .item-image');

productImages.forEach(img => {

if (!img.hasAttribute('data-modal-active')) {
img.setAttribute('data-modal-active', 'true');
img.style.cursor = 'pointer';

img.addEventListener('click', function() {
modal.style.display = 'block';
modalImg.src = this.src;


const productCard = this.closest('.product-card, .product, .cart-item, .favorite-item');
let caption = 'Ürün Görseli';

if (productCard) {
const titleElement = productCard.querySelector('h3, .item-title, .product-title');
if (titleElement) {
caption = titleElement.textContent.trim();
}
}

modalCaption.textContent = caption;
document.body.style.overflow = 'hidden';
});
}
});
}

function closeModalFunction() {
modal.style.display = 'none';
document.body.style.overflow = '';
}

closeModal.addEventListener('click', closeModalFunction);

modal.addEventListener('click', function(e) {
if (e.target === modal) {
closeModalFunction();
}
});

document.addEventListener('keydown', function(e) {
if (e.key === 'Escape' && modal.style.display === 'block') {
closeModalFunction();
}
});

addClickListeners();

const observer = new MutationObserver(function(mutations) {
mutations.forEach(function(mutation) {
if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {

setTimeout(() => {
addClickListeners();
}, 100);
}
});
});

const productsGrid = document.querySelector('.products-grid, .featured-products, .cart-items, .favorites-container');
if (productsGrid) {
observer.observe(productsGrid, {
childList: true,
subtree: true
});
}
}

const filterBtn = document.querySelector('.filter-btn');
if (filterBtn) {
filterBtn.addEventListener('click', function() {

const minPrice = parseFloat(document.getElementById('min-price').value) || 0;
const maxPrice = parseFloat(document.getElementById('max-price').value) || 999999;

console.log('Fiyat filtresi çalıştı:', minPrice, '-', maxPrice);

const productCards = document.querySelectorAll('.product-card');


let productsFound = false;

productCards.forEach(card => {

let priceText = card.querySelector('.product-price').innerText;

priceText = priceText.replace(/[^\d]/g, '');

let price = parseInt(priceText) / 100;
if (isNaN(price)) {
price = parseInt(priceText);
}

console.log('Ürün fiyatı:', price);

if (price >= minPrice && (maxPrice === 0 || price <= maxPrice)) {
card.style.display = 'block';
productsFound = true;
} else {
card.style.display = 'none';
}
});

const noResultsMessage = document.querySelector('.no-results-message') || 
document.createElement('div');
if (!productsFound) {
noResultsMessage.className = 'no-results-message';
noResultsMessage.textContent = 'Bu fiyat aralığında ürün bulunamadı.';

const productsGrid = document.querySelector('.products-grid');
if (productsGrid) {
if (!document.querySelector('.no-results-message')) {
productsGrid.appendChild(noResultsMessage);
}
}
} else {

if (document.contains(noResultsMessage)) {
noResultsMessage.remove();
}
}
});
}

function setupPriceFilter() {
const filterBtn = document.querySelector('.filter-btn');
const priceInputs = document.querySelectorAll('.price-input');

if (!filterBtn) return;


['click', 'touchend'].forEach(eventType => {
filterBtn.addEventListener(eventType, function(e) {
if (eventType === 'touchend') {
e.preventDefault();
}

applyPriceFilter();
});
});

priceInputs.forEach(input => {
if (!input) return;

input.addEventListener('keyup', function(e) {
if (e.key === 'Enter') {
applyPriceFilter();
}
});

input.addEventListener('input', function() {

clearTimeout(this.debounceTimer);
this.debounceTimer = setTimeout(() => {
applyPriceFilter();
}, 1000);
});
});
}

function applyPriceFilter() {
try {

const productCards = document.querySelectorAll('.product-card');
if (!productCards.length) {
console.log('Ürün kartları bulunamadı');
return;
}

const minInput = document.getElementById('min-price');
const maxInput = document.getElementById('max-price');

const minPrice = minInput && !isNaN(minInput.value) ? parseFloat(minInput.value) : 0;
const maxPrice = maxInput && !isNaN(maxInput.value) ? parseFloat(maxInput.value) : Infinity;

console.log(`Fiyat filtresi uygulanıyor: ${minPrice} - ${maxPrice}`);

let visibleCount = 0;

productCards.forEach(card => {

const priceElement = card.querySelector('.product-price');
if (!priceElement) return;

const priceText = priceElement.textContent;
const price = parseFloat(priceText.replace(/[^0-9.,]/g, '').replace(',', '.'));

if (isNaN(price)) {
console.warn('Geçersiz fiyat:', priceText);
return;
}


const isVisible = price >= minPrice && (maxPrice === Infinity || price <= maxPrice);
card.style.display = isVisible ? 'block' : 'none';


if (isVisible) visibleCount++;
});

const productsGrid = document.querySelector('.products-grid');
if (productsGrid) {

const existingMessage = productsGrid.querySelector('.no-filtered-products');
if (existingMessage) existingMessage.remove();

if (visibleCount === 0) {
const noProductsMessage = document.createElement('div');
noProductsMessage.className = 'no-filtered-products';
noProductsMessage.innerHTML = `
                   <div style="padding: 20px; text-align: center; color: #666;">
                       <i class="fas fa-search" style="font-size: 24px; margin-bottom: 10px;"></i>
                       <p>Bu fiyat aralığında ürün bulunamadı.</p>
                       <button class="reset-filter-btn">Filtreyi Temizle</button>
                   </div>
               `;
productsGrid.appendChild(noProductsMessage);


const resetBtn = noProductsMessage.querySelector('.reset-filter-btn');
if (resetBtn) {
resetBtn.addEventListener('click', function() {
if (minInput) minInput.value = '';
if (maxInput) maxInput.value = '';
applyPriceFilter();
});
}
}
}

if (typeof saveFilterState === 'function') {
saveFilterState();
}


animateFilterResults();

} catch (error) {
console.error('Fiyat filtreleme hatası:', error);
if (typeof showNotification === 'function') {
showNotification('Filtreleme yapılırken bir hata oluştu', 'error');
}
}
}


function animateFilterResults() {
const visibleCards = document.querySelectorAll('.product-card[style="display: block;"]');

visibleCards.forEach((card, index) => {

card.style.opacity = '0';
card.style.transform = 'translateY(20px)';

setTimeout(() => {
card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
card.style.opacity = '1';
card.style.transform = 'translateY(0)';
}, index * 50);
});
}

function saveFilterState() {
const minValue = document.querySelectorAll('.price-input')[0].value;
const maxValue = document.querySelectorAll('.price-input')[1].value;

if (minValue || maxValue) {
sessionStorage.setItem('minPrice', minValue);
sessionStorage.setItem('maxPrice', maxValue);
}
}

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


if ((minPrice || maxPrice) && document.querySelector('.filter-btn')) {
document.querySelector('.filter-btn').click();
}
}

function initMap() {

const mapContainer = document.getElementById('map');
if (!mapContainer) return;

console.log("Harita başlatılıyor...");

const map = L.map('map', {
attributionControl: false,
maxZoom: 19,
zoomControl: true
}).setView([38.70760, 31.03403], 13);

const standardMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '',
maxZoom: 19
});

const satelliteMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
attribution: '',
maxZoom: 19
});

satelliteMap.addTo(map);

const marker = L.marker([38.70760, 31.03403]).addTo(map);
marker.bindPopup('Onur İnşaat Burada!').openPopup();

window.switchToSatellite = function() {
map.removeLayer(standardMap);
map.addLayer(satelliteMap);
};

window.switchToMap = function() {
map.removeLayer(satelliteMap);
map.addLayer(standardMap);
};

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

window.toggleFullscreen = function() {
const mapContainer = document.getElementById('map-container');

if (mapContainer.classList.contains('map-fullscreen')) {

mapContainer.classList.remove('map-fullscreen');
document.body.style.overflow = 'auto';


const exitBtn = document.querySelector('.exit-fullscreen-btn');
if (exitBtn) exitBtn.remove();

const fullscreenBtn = document.querySelector('.fullscreen-btn i');
if (fullscreenBtn) {
fullscreenBtn.className = 'fas fa-expand';
}

} else {

mapContainer.classList.add('map-fullscreen');
document.body.style.overflow = 'hidden';

const exitBtn = document.createElement('button');
exitBtn.className = 'exit-fullscreen-btn';
exitBtn.innerHTML = '<i class="fas fa-compress"></i> Normal Boyuta Dön';
exitBtn.onclick = toggleFullscreen;
mapContainer.appendChild(exitBtn);

const fullscreenBtn = document.querySelector('.fullscreen-btn i');
if (fullscreenBtn) {
fullscreenBtn.className = 'fas fa-compress';
}
}

setTimeout(function() {
map.invalidateSize();
}, 100);
}

const directionsBtn = document.getElementById('directions-btn');
if (directionsBtn) {
directionsBtn.addEventListener('click', function() {
const lat = 38.70760;
const lng = 31.03403;
const locationName = encodeURIComponent("Onur İnşaat");

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

map.whenReady(function() {
setTimeout(function() {
map.invalidateSize();
}, 100);
});

map.on('zoomend', function() {
if (map.getZoom() > 17) {
map.setZoom(17);
}
});
}

function setupCategoryFilter() {
const categoryCheckboxes = document.querySelectorAll('input[name="category"]');
if (!categoryCheckboxes.length) return;

categoryCheckboxes.forEach(checkbox => {
['change', 'touchend'].forEach(eventType => {
checkbox.addEventListener(eventType, function(e) {
if (eventType === 'touchend') {
e.preventDefault();
this.checked = !this.checked;
}
filterProducts();
});
});
});

function filterProducts() {
const selectedCategories = Array.from(categoryCheckboxes)
.filter(cb => cb.checked)
.map(cb => cb.value);

const products = document.querySelectorAll('.product-card');

products.forEach(product => {
const category = product.dataset.category;

if (selectedCategories.length === 0 || selectedCategories.includes(category)) {
product.style.display = 'block';
} else {
product.style.display = 'none';
}
});

if (document.querySelector('.price-input')) {
applyPriceFilter();
}
}
}

function applyPriceFilter() {
const minPrice = parseFloat(document.querySelectorAll('.price-input')[0].value) || 0;
const maxPrice = parseFloat(document.querySelectorAll('.price-input')[1].value) || Infinity;

const products = document.querySelectorAll('.product-card');

products.forEach(product => {
if (product.style.display === 'none') return;

const priceText = product.querySelector('.product-price').textContent;
const price = parseFloat(priceText.replace(/[^\d.]/g, ''));

if (price >= minPrice && price <= maxPrice) {
product.style.display = 'block';
} else {
product.style.display = 'none';
}
});
}

function setupSortingFilter() {
const sortSelect = document.querySelector('.sort-select');
if (!sortSelect) return;

sortSelect.addEventListener('change', function() {
const sortBy = this.value;
const products = Array.from(document.querySelectorAll('.product-card'));
const productsGrid = document.querySelector('.products-grid');

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
else {
const idA = a.querySelector('.add-to-cart-btn').dataset.id;
const idB = b.querySelector('.add-to-cart-btn').dataset.id;
return idA - idB;
}
});

products.forEach(product => productsGrid.appendChild(product));
});
}

function loadProductsFromAdmin() {
console.log("Ürünler yükleniyor...");
const productsGrid = document.querySelector('.products-grid');

if (!productsGrid) {
console.error("Ürün grid bulunamadı");
return;
}

productsGrid.innerHTML = '<div class="loading" style="text-align:center; padding:30px; font-size:18px;">Ürünler yükleniyor...</div>';

const basicProducts = [
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
price: 2199.00,
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
price: 3299.00,
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
price: 2349.00,
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
price: 3549.00,
description: 'Siyah Kaplama, Su Tasarruflu',
image: 'images/taurolavabosiyah.jpg'
},
{
id: 120,
name: 'Tauro Set Üstü Lavabo Bataryası',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 4749.00,
description: 'Siyah Kaplama, Su Tasarruflu',
image: 'images/taurolavabos.jpg'
},
{
id: 121,
name: 'Pruva Lavabo Bataryası',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 2249.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/pruvalavabo.jpg'
},
{
id: 122,
name: 'Atros Eviye Bataryası',
category: 1,
categoryName: 'Mutfak Bataryaları',
price: 2199.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/atrosevye.jpg'
},
{
id: 123,
name: 'Espina Spiralli Eviye Bataryası',
category: 1,
categoryName: 'Mutfak Bataryaları',
price: 3549.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/espinaevye.jpg'
},
{
id: 124,
name: 'Felis Eviye Bataryası',
category: 1,
categoryName: 'Mutfak Bataryaları',
price: 2299.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/felisevye.jpg'
},
{
id: 125,
name: 'Florus Eviye Bataryası',
category: 1,
categoryName: 'Mutfak Bataryaları',
price: 2199.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/florusevye.jpg'
},

// Tüm ürünler için standartlaştırılmış format
{
id: 126,
name: 'Frezia Eviye Bataryası',
category: 3,
categoryName: 'Mutfak Bataryaları',
price: 2699.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/freziaevye.jpg'
},
{
id: 127,
name: 'Tauro Eviye Bataryası',
category: 3,
categoryName: 'Mutfak Bataryaları',
price: 4699.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/gpdtauroevye.jpg'
},
{
id: 128,
name: 'Provido Eviye Bataryası',
category: 3,
categoryName: 'Mutfak Bataryaları',
price: 5599.00,
description: 'Gold Kaplama, Su Tasarruflu',
image: 'images/providoevye.jpg'
},
{
id: 129,
name: 'Pedra Eviye Bataryası',
category: 3,
categoryName: 'Mutfak Bataryaları',
price: 2999.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/pedraevye.jpg'
},
{
id: 130,
name: 'Ritmo Eviye Bataryası',
category: 3,
categoryName: 'Mutfak Bataryaları',
price: 3299.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/ritmoevye.jpg'
},
{
id: 131,
name: 'Solus Eviye Bataryası',
category: 3,
categoryName: 'Mutfak Bataryaları',
price: 2199.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/solusevye.jpg'
},
{
id: 132,
name: 'Claire Eviye Bataryası',
category: 3,
categoryName: 'Mutfak Bataryaları',
price: 2299.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/claireevye.jpg'
},
{
id: 133,
name: 'Spiralli U Borulu Eviye Bataryası',
category: 3,
categoryName: 'Mutfak Bataryaları',
price: 5699.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/spirallievye.jpg'
},
{
id: 134,
name: 'Kare Spiral Eviye Bataryası',
category: 3,
categoryName: 'Mutfak Bataryaları',
price: 3549.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/karespiralevye.jpg'
},
{
id: 135,
name: 'Pruva Eviye Bataryası',
category: 3,
categoryName: 'Mutfak Bataryaları',
price: 3099.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/pruvaevye.jpg'
},
{
id: 136,
name: 'Atros Banyo Bataryası',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 3399.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/atrosbanyo.jpg'
},
{
id: 137,
name: 'Espina Banyo Bataryası',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 2799.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/espinabanyo.jpg'
},
{
id: 138,
name: 'Florus Banyo Bataryası',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 2599.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/florusbanyo.jpg'
},
{
id: 139,
name: 'Gildo Banyo Bataryası',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 4999.00,
description: 'Siyah Kaplama, Su Tasarruflu',
image: 'images/gildobanyosr.jpg'
},
{
id: 140,
name: 'Provido Banyo Bataryası',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 4399.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/gpdprovido.jpg'
},
{
id: 141,
name: 'Tauro Banyo Bataryası',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 4999.00,
description: 'Gold Kaplama, Su Tasarruflu',
image: 'images/taurobanyoa.jpg'
},
        {
    id: 159,
    name: 'Pietra Piyano 5 Tuşlu Akıllı Granit Evye',
    category: 2,
    categoryName: 'Banyo Bataryaları',
    price: 0,
    description: 'PİYANO 5 Tuşlu Akıllı Evye, Şelale Evye, Bardak Yıkama, Arıtma Bataryası, Dijital Şelale Batarya, Kesme Tahtası,İki Tane Yıkama Haznesi',
    image: 'images/akıllıevye2.webp'
},
{
    id: 160,
    name: 'Pietra Şelale Teknolojik Mutfak Evye Seti',
    category: 2,
    categoryName: 'Banyo Bataryaları',
    price: 0,
    description: 'Akıllı Evye, Şelale Evye, Bardak Yıkama, Arıtma Bataryası, Şelale Batarya, Kesme Tahtası,İki Tane Yıkama Haznesi',
    image: 'images/akillievye.webp'
},
{
id: 142,
name: 'Slim Line Kare Lavabo',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 4999.00,
description: '38x38 cm',
image: 'images/slimlavabo.jpg'
},
{
id: 143,
name: 'Bien Dor Asma Klozet + Slim soft Kapak',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 3599.00,
description: '',
image: 'images/biendor.png'
},
{
id: 144,
name: 'Bien İon Asma Klozet + Slim soft Kapak',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 3599.00,
description: '',
image: 'images/bienion.png'
},
{
id: 145,
name: 'Bien Nicole Asma Klozet + Slim soft Kapak',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 3599.00,
description: '',
image: 'images/biennicole.png'
},
{
id: 146,
name: 'Bien Neptün Gizli Asma Klozet + Slim soft Kapak',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 4999.00,
description: '',
image: 'images/bienneptüngizli.jpg'
},
{
id: 147,
name: 'Bien Vokha Asma Klozet + Slim soft Kapak',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 5499.00,
description: '',
image: 'images/bienvokha.png'
},
{
id: 148,
name: 'Bien Harmony Gizli Asma Klozet + Slim soft Kapak',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 4499.00,
description: 'No Rim',
image: 'images/bienharmonygizli.png'
},
{
id: 148,
name: 'Bien Pent Klozet + Slim soft Kapak',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 5699.00,
description: 'No Rim',
image: 'images/bienpent.png'
},
{
id: 149,
name: 'Bien Leo Asma Klozet + Slim soft Kapak',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 2999.00,
description: 'No Rim',
image: 'images/bienleo.png'
},
{
id: 150,
name: 'Bien Orion Klozet+ Rezervuar + Slim soft Kapak + visam basmalı iç takım',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 5499.00,
description: '',
image: 'images/bienorion.jpg'
},
{
id: 151,
name: 'Bien Capri Klozet+ Rezervuar + Slim soft Kapak + visam basmalı iç takım',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 5499.00,
description: '',
image: 'images/biencapri.png'
},
{
id: 152,
name: 'Bien Capri Klozet+ Rezervuar + Slim soft Kapak + visam basmalı iç takım',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 5799.00,
description: 'No Rim',
image: 'images/biencapri.png'
},
{
id: 153,
name: 'Bien Goya Klozet+ Rezervuar + Slim soft Kapak + visam basmalı iç takım',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 6099.00,
description: '',
image: 'images/biengoya.png'
},
{
id: 154,
name: 'Bien Venüs Klozet+ Rezervuar + Slim soft Kapak + visam basmalı iç takım',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 6599.00,
description: '',
image: 'images/bienvenus.png'
},
{
id: 155,
name: 'Bien Milady Klozet+ Rezervuar + Slim soft Kapak + visam basmalı iç takım',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 8999.00,
description: '',
image: 'images/bienmilady.png'
},

{
    
id: 158,
name: 'Baylan Kartlı Su Sayacı',
category: 2,
categoryName: 'Banyo Bataryaları',
  price: 0,
description: '',
image: 'images/baylansayac.jpg'
},
  {
id: 161,
name: 'Isvea Karizma Klozet + Rezervuar +D80 Drp. Soft Kapak + Çift Bas. İç Tk',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 4699.00,
description: '',
image: 'images/isveasentimenti.jpg'
},
{
    
id: 162,
name: 'Isvea Soluzione 2 Asma Klozet + 44H PP Soft Kapanan Kapak',
category: 2,
categoryName: 'Banyo Bataryaları',
  price: 3299,
description: '',
image: 'images/isveasoluziobe2.jpg'
},
  {
id: 163,
name: 'Isvea Infinity Asma Klozet + KF Drp. Soft Kapanan Kapak',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 4699.00,
description: '',
image: 'images/isveainfinityrimless.jpg'
},
{
    
id: 164,
name: 'Turkuaz YUMURCAK KRK + Kapak + İç Takım',
category: 2,
categoryName: 'Banyo Bataryaları',
  price: 5399,
description: '',
image: 'images/turkuazyumurcak.png'
},
  {
id: 165,
name: 'Vitra S50',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 6699.00,
description: ' Asma Klozet +Arkitekt PP Soft Kapak',
image: 'images/vitras50.webp'
},
{
    
id: 166,
name: 'Vitra S60',
category: 2,
categoryName: 'Banyo Bataryaları',
  price: 9999.00,
description: 'Smooth Flush Asma Klozet +Slim Soft Üniversal 2 Kapak',
image: 'images/vitras60.webp'
},
    {
id: 167,
name: 'Vitra INTEGRA Square',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 10999.00,
description: 'Asma Klozet +Shift Slim Soft Drp. Kapak',
image: 'images/vitraintegrasquare.webp'
},
{
    
id: 168,
name: 'Vitra INTEGRA Square Rim-Ex',
category: 2,
categoryName: 'Banyo Bataryaları',
  price: 11999.00,
description: 'Rim-Ex Asma Klozet 54 cm +Shift Slim Soft Drp. Kapak',
image: 'images/vitraintegrasquare.webp'
},
{
    
id: 170,
name: 'Vitra S20',
category: 2,
categoryName: 'Banyo Bataryaları',
  price: 10999.00,
description: 'Klozet + Rezervuar + Klz. Kapağı',
image: 'images/vitras20.webp'
},
    {
id: 171,
name: 'Vitra Optima',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 3199.00,
description: 'Asma Klozet +Arkitekt Ünv. U-Shape Kapak',
image: 'images/vitraoptima.webp'
},
{
    
id: 172,
name: 'Vitra Arkitekt',
category: 2,
categoryName: 'Banyo Bataryaları',
  price: 3299.00,
description: 'Kanalsız Asma Klozet +Arkitekt Ünv. U-Shape Kapak',
image: 'images/vitraarkitekt.jpg'
},
    {
id: 173,
name: 'Vitra S 20 Köşeli 48 cm',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 6399.00,
description: '48 cm Asma Klozet +S 20 Soft NP Kapak',
image: 'images/vitras20koseli.webp'
},
{
    
id: 174,
name: 'Vitra S 20 Round 54 cm',
category: 2,
categoryName: 'Banyo Bataryaları',
  price: 4799.00,
description: 'Asma Klozet +Arkitekt Ünv. U-Shape Kapak',
image: 'images/vitras20round.webp'
},
   {
id: 175,
name: 'Turkuaz Lila',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 2099.00,
description: 'Asma Klozet Majestik +ABS PP Kapak',
image: 'images/turkuazlila.png'
},
{
    
id: 176,
name: 'Turkuaz Noura',
category: 2,
categoryName: 'Banyo Bataryaları',
  price: 3799.00,
description: 'Rimless Asma Klozet +Noura PP Slim Soft Kapak',
image: 'images/turkuaznoura.png'
},
   {
id: 177,
name: 'Turkuaz Aqua',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 3849.00,
description: 'Rimless Asma Klozet +Duru PP Slim Soft Kapak',
image: 'images/turkuazaqua.png'
},
{
    
id: 178,
name: 'Turkuaz City',
category: 2,
categoryName: 'Banyo Bataryaları',
  price: 4399.00,
description: 'Rimless Asma Klozet +Bella Droplast Slim Soft Kapak',
image: 'images/turkuazcity.png'
},
   {
id: 179,
name: 'Turkuaz İbiza',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 4699.00,
description: 'Rimless Asma Klozet +İbiza Droplast Soft Kapak',
image: 'images/turkuazibiza.png'
},
{
    
id: 180,
name: 'Turkuaz Hera',
category: 2,
categoryName: 'Banyo Bataryaları',
  price: 5099.00,
description: 'Rimless Asma Klozet +İbiza Droplast Soft Kapak',
image: 'images/turkuazhera.png'
},
   {
id: 181,
name: 'Turkuaz Bella',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 7199.00,
description: 'Rimless Klozet + Rezervuar + Lila PP Slim Soft Kapak + Damla Çift Basmalı İç Takım',
image: 'images/turkuazbella.png'
},
{
    
id: 182,
name: 'Turkuaz Duru',
category: 2,
categoryName: 'Banyo Bataryaları',
  price: 7999.00,
description: 'Duru Rimless Klozet + Bella Rezervuar + Duru PP Soft Kapak + Damla Çift Basmalı İç Takım',
image: 'images/turkuazduru.png'
},


];

setTimeout(() => {
try {
productsGrid.innerHTML = ''; 

basicProducts.forEach(product => {
const card = document.createElement('div');
card.className = 'product-card';


card.setAttribute('data-category', product.categoryName.toLowerCase().includes('seramik') ? 'seramik' : 
product.categoryName.toLowerCase().includes('banyo') ? 'banyo' :
product.categoryName.toLowerCase().includes('mutfak') ? 'mutfak' : 'diger');

card.innerHTML = `
       <div class="product-image">
           <img src="${product.image}" alt="${product.name}" loading="lazy">
       </div>
       <div class="product-info">
           <h3>${product.name}</h3>
           <p>${product.description}</p>
           <div class="product-price">${product.price.toFixed(2)} TL</div>
           <button class="btn add-to-cart-btn" 
                   data-id="${product.id}" 
                   data-name="${product.name}" 
                   data-price="${product.price}" 
                   data-image="${product.image}">
               Sepete Ekle
           </button>
       </div>
   `;
productsGrid.appendChild(card);
});

console.log("Ürünler başarıyla yüklendi");
} catch (error) {
console.error("Ürün yükleme hatası:", error);
productsGrid.innerHTML = '<div class="error" style="text-align:center; padding:20px; color:red;">Hata oluştu. Sayfayı yenileyin.</div>';
}
}, 500);
}

function openQuickView(button) {
const productCard = button.closest('.product-card');
const modal = document.getElementById('product-modal');

if (productCard && modal) {
const img = productCard.querySelector('.product-image img');
const title = productCard.querySelector('h3').textContent;

const modalImg = document.getElementById('modal-image');
const captionText = document.getElementById('modal-caption');

if (modalImg && captionText) {
modal.style.display = 'block';
modalImg.src = img.src;
captionText.innerHTML = title;
document.body.style.overflow = 'hidden';
}
}
}
function checkFilterVisibility() {
const filterSection = document.querySelector('.filter-section');
const productsGrid = document.querySelector('.products-grid');

if (!filterSection || !productsGrid) return;

const isMobile = window.innerWidth <= 768;

if (isMobile) {
console.log('Mobil cihaz: Filtreler kontrol ediliyor');

filterSection.style.display = 'block';

filterSection.style.width = '100%';
}
}

function normalizeProductCardHeights() {

const productCards = document.querySelectorAll('.product-card');
if (!productCards.length) return;


productCards.forEach(card => {
card.style.height = 'auto';
});


const grid = document.querySelector('.products-grid');
if (!grid) return;

const gridStyles = window.getComputedStyle(grid);
const gap = parseInt(gridStyles.getPropertyValue('gap')) || 20;
const cardWidth = productCards[0].offsetWidth;
const gridWidth = grid.clientWidth;
const cardsPerRow = Math.floor(gridWidth / (cardWidth + gap));


for (let i = 0; i < productCards.length; i += cardsPerRow) {
const rowCards = Array.from(productCards).slice(i, i + cardsPerRow);
const maxHeight = Math.max(...rowCards.map(card => card.scrollHeight));

rowCards.forEach(card => {
card.style.height = `${maxHeight}px`;
});
}
}

function loadProducts(products, container) {
container.innerHTML = '';

if (products.length === 0) {
container.innerHTML = '<div class="no-products">Bu kriterlere uygun ürün bulunamadı.</div>';
return;
}

products.forEach(product => {
const productCard = document.createElement('div');
productCard.classList.add('product-card');

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

document.querySelectorAll('.add-to-cart-btn').forEach(button => {
button.addEventListener('click', function() {
const productId = parseInt(this.dataset.id);
addToCart(productId);
});
});
}

document.addEventListener('DOMContentLoaded', function () {

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

setupMobileMenu();

Promise.all([
loadTemplate('header'),
loadTemplate('footer')
]).then(() => {

updateCartCount();
initTheme();


if (document.querySelector('.products-grid')) {

loadProductsFromAdmin();

setTimeout(() => {
setupCategoryFilter();
setupPriceFilter();
setupSortingFilter();
initProductModal();
normalizeProductCardHeights();
}, 300);
} 
else if (document.querySelector('.hero-slider')) {

initSlider();
displayFeaturedProducts();
} 
else if (document.querySelector('.product-detail-page')) {

loadProductDetails();
}


if (document.getElementById('map')) {
initMap();
}


}).catch((error) => {
console.error('Template yükleme hatası:', error);
showNotification('Sayfa içerikleri yüklenirken hata oluştu', 'error');
});

console.log("Sayfa yüklendi");



function displayFeaturedProducts() {
const featuredProductsContainer = document.querySelector('.featured-products .fixed-grid-3');
if (!featuredProductsContainer) return;

const products = JSON.parse(localStorage.getItem('products')) || [];

let featuredProducts = products.slice(-6).reverse();

if (featuredProducts.length === 0) {
featuredProducts = [
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
id: 111,
name: 'Gildo Lavabo Bataryası',
category: 2,
categoryName: 'Banyo Bataryaları',
price: 2149.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/gildolavabogumus.jpg'
},
{
id: 124,
name: 'Felis Eviye Bataryası',
category: 1,
categoryName: 'Mutfak Bataryaları',
price: 1200.00,
description: 'Krom Kaplama, Su Tasarruflu',
image: 'images/felisevye.jpg'
}
];
}

if (featuredProducts.length > 0) {
featuredProductsContainer.innerHTML = featuredProducts.map(product => `
               <div class="product">
                   <a href="product-details.html?id=${product.id}">
                       <img src="${product.image}" alt="${product.name}">
                   </a>
                   <h3><a href="product-details.html?id=${product.id}">${product.name}</a></h3>
                   <p>${product.description}</p>
                   <div class="product-footer">
                       <div class="price-container">
                           <span class="price">${product.price.toFixed(2)} TL</span>
                       </div>
                       <div class="button-container">
                           <button class="add-to-cart-btn" 
                               data-id="${product.id}" 
                               data-name="${product.name}" 
                               data-price="${product.price}" 
                               data-image="${product.image}">Sepete Ekle</button>
                       </div>
                   </div>
               </div>
           `).join('');

featuredProductsContainer.querySelectorAll('.add-to-cart-btn').forEach(button => {
button.addEventListener('click', function() {
addToCart(this);
});
});
}
}


function showNotification(message, type = 'info') {
const notification = document.createElement('div');
notification.className = `notification ${type}`;
notification.textContent = message;

document.body.appendChild(notification);


setTimeout(() => {
notification.classList.add('show');
}, 10);


setTimeout(() => {
notification.classList.remove('show');
setTimeout(() => {
notification.remove();
}, 300);
}, 3000);
}

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

if (document.querySelector('.products-grid')) {

loadProductsFromAdmin();
setTimeout(() => {
setupCategoryFilter();
setupPriceFilter();
setupSortingFilter();
initProductModal();
normalizeProductCardHeights();
}, 100);
} else if (document.querySelector('.hero-slider')) {

initSlider();
}
}).catch(() => {
showNotification('Şablon yükleme hatası', 'error');
});

elements.addToCartButtons.forEach(button =>
button.addEventListener('click', () => addToCart(button))
);
});
