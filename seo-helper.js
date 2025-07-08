function setSEOMeta(pageConfig) {
    document.title = pageConfig.title;
    updateOrCreateMeta('description', pageConfig.description);
    updateOrCreateMeta('keywords', pageConfig.keywords);
    updateOrCreateMeta('og:title', pageConfig.title, 'property');
    updateOrCreateMeta('og:description', pageConfig.description, 'property');
    updateOrCreateMeta('og:url', window.location.href, 'property');
    updateOrCreateLink('canonical', window.location.href);
}

function updateOrCreateMeta(name, content, attribute = 'name') {
    let meta = document.querySelector(`meta[${attribute}="${name}"]`);
    if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, name);
        document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
}

function updateOrCreateLink(rel, href) {
    let link = document.querySelector(`link[rel="${rel}"]`);
    if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', rel);
        document.head.appendChild(link);
    }
    link.setAttribute('href', href);
}

function createBreadcrumb() {
    const path = window.location.pathname;
    const pageName = path.split('/').pop().replace('.html', '');
    
    const breadcrumbMap = {
        'kategoriler': 'Kategoriler', 
        'urunler': 'Ürünler',
        'iletisim': 'İletişim',
        'sepet': 'Sepetim',
        'favoriler': 'Favorilerim'
    };
    
    if (pageName !== 'index' && pageName !== '') {
        return `
            <nav class="breadcrumb">
                <a href="index.html">Ana Sayfa</a>
                <span class="breadcrumb-separator">></span>
                <span>${breadcrumbMap[pageName] || pageName}</span>
            </nav>
        `;
    }
    return '';
}
