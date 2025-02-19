document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;

    // İlk slaytı göster
    slides[currentSlide].classList.add('active');

    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        slides[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    prevButton.addEventListener('click', prevSlide);
    nextButton.addEventListener('click', nextSlide);

    // Otomatik geçiş için
    setInterval(nextSlide, 5000);
});
/* filepath: /c:/Users/VAHAP/Desktop/yenisite - Kopya/script.js */
document.addEventListener('DOMContentLoaded', function() {
    const header = document.querySelector('header');
    const topBar = document.querySelector('.top-bar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 50) {
            // Scrolling down
            topBar.classList.add('top-bar-hidden');
            header.classList.add('header-scrolled');
        } else if (currentScroll <= 50) {
            // At top
            topBar.classList.remove('top-bar-hidden');
            header.classList.remove('header-scrolled');
        }

        lastScroll = currentScroll;
    });
});
