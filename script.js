document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navLinksMobile = document.getElementById('nav-links-mobile');

    if (navToggle && navLinksMobile) {
        navToggle.addEventListener('click', function() {
            navLinksMobile.classList.toggle('hidden');
        });
    }
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    if (!navLinksMobile.classList.contains('hidden')) {
                        navLinksMobile.classList.add('hidden');
                    }
                    const offset = 70; 
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - offset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    const backToTopButton = document.getElementById('back-to-top');

    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) { 
            backToTopButton.classList.add('opacity-100');
        } else {
            backToTopButton.classList.remove('opacity-100');
        }
    });

    if (backToTopButton) {
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.getElementById('hero-content');

    if (heroSection && heroContent) {
        setTimeout(() => {
            heroContent.classList.add('fade-in-up');
        }, 300);

        window.addEventListener('scroll', function() {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPositionY = -scrollPosition * 0.3 + 'px'; 
        });
    }
    const sections = document.querySelectorAll('section');
    const options = {
        root: null, 
        rootMargin: '0px',
        threshold: 0.1 
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'features') {
                    const featureCards = entry.target.querySelectorAll('.feature-card');
                    featureCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('slide-in-up');
                        }, index * 100); 
                    });
                } else if (entry.target.id === 'products') {
                    const productCards = entry.target.querySelectorAll('.product-card');
                    productCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('slide-in-up');
                        }, index * 100);
                    });
                } else if (entry.target.id === 'services') {
                    const serviceCards = entry.target.querySelectorAll('.service-card');
                    serviceCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('slide-in-up');
                        }, index * 100);
                    });
                } else if (entry.target.id === 'contact') {
                    const contactForm = entry.target.querySelector('#contact-form');
                    if (contactForm) {
                        contactForm.classList.add('slide-in-up');
                    }
                }
                observer.unobserve(entry.target); 
            }
        });
    }, options);
    sections.forEach(section => {
        observer.observe(section);
    });

    const updatesCarousel = document.getElementById('updates-carousel');
    const prevUpdateBtn = document.getElementById('prev-update');
    const nextUpdateBtn = document.getElementById('next-update');
    let currentIndex = 0;

    const updateCards = updatesCarousel ? updatesCarousel.querySelectorAll('.update-card') : [];

    function showCurrentUpdate() {
        if (!updatesCarousel || updateCards.length === 0) return;
        updateCards.forEach(card => card.classList.remove('active'));
        let cardsInView;
        if (window.innerWidth >= 1024) { 
            cardsInView = 3;
        } else if (window.innerWidth >= 768) { 
            cardsInView = 2;
        } else { 
            cardsInView = 1;
        }
        const cardWidth = updateCards[0].offsetWidth + (parseFloat(getComputedStyle(updateCards[0]).paddingLeft) * 2); 
        const scrollAmount = currentIndex * (updatesCarousel.offsetWidth / cardsInView);
        updatesCarousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });

        for (let i = 0; i < cardsInView; i++) {
            if (updateCards[currentIndex + i]) {
                updateCards[currentIndex + i].classList.add('active');
            }
        }
    }

    if (prevUpdateBtn && nextUpdateBtn && updatesCarousel){

         showCurrentUpdate();

        prevUpdateBtn.addEventListener('click', () => {
            let cardsToMove;
            if (window.innerWidth >= 1024) cardsToMove = 3;
            else if (window.innerWidth >= 768) cardsToMove = 2;
            else cardsToMove = 1;

            currentIndex = Math.max(0, currentIndex - cardsToMove);
            showCurrentUpdate();
        });

        nextUpdateBtn.addEventListener('click', () => {
            let cardsToMove;
            if (window.innerWidth >= 1024) cardsToMove = 3;
            else if (window.innerWidth >= 768) cardsToMove = 2;
            else cardsToMove = 1;

            currentIndex = Math.min(updateCards.length - cardsToMove, currentIndex + cardsToMove);
            showCurrentUpdate();
        });
        window.addEventListener('resize', showCurrentUpdate);
    }
});
