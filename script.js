// Intersection Observer for scroll animations
class ScrollAnimations {
    constructor() {
        this.observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px',
            threshold: 0.1
        };
        this.init();
    }

    init() {
        this.setupObserver();
        this.addAnimationClasses();
    }

    setupObserver() {
        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateElement(entry.target);
                }
            });
        }, this.observerOptions);

        this.observeElements();
    }

    addAnimationClasses() {
        // Add CSS classes for animation states
        const style = document.createElement('style');
        style.textContent = `
            /* Animation States */
            .fade-in-up {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .fade-in-up.animated {
                opacity: 1;
                transform: translateY(0);
            }
            
            .fade-in-left {
                opacity: 0;
                transform: translateX(-30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .fade-in-left.animated {
                opacity: 1;
                transform: translateX(0);
            }
            
            .fade-in-right {
                opacity: 0;
                transform: translateX(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .fade-in-right.animated {
                opacity: 1;
                transform: translateX(0);
            }
            
            .scale-in {
                opacity: 0;
                transform: scale(0.9);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .scale-in.animated {
                opacity: 1;
                transform: scale(1);
            }
            
            /* Stagger animation delays */
            .stagger-1 { transition-delay: 0.1s; }
            .stagger-2 { transition-delay: 0.2s; }
            .stagger-3 { transition-delay: 0.3s; }
            .stagger-4 { transition-delay: 0.4s; }
            .stagger-5 { transition-delay: 0.5s; }
            .stagger-6 { transition-delay: 0.6s; }
        `;
        document.head.appendChild(style);
    }

    observeElements() {
        // Section titles
        const sectionTitles = document.querySelectorAll('.plants h2, .about h2, .contact h2');
        sectionTitles.forEach(title => {
            title.classList.add('fade-in-up');
            this.observer.observe(title);
        });

        // Plant cards with stagger effect
        const plantCards = document.querySelectorAll('.plant-card');
        plantCards.forEach((card, index) => {
            card.classList.add('fade-in-up', `stagger-${index + 1}`);
            this.observer.observe(card);
        });

        // About section content
        const aboutText = document.querySelector('.about-text');
        if (aboutText) {
            aboutText.classList.add('fade-in-left');
            this.observer.observe(aboutText);
        }

        const aboutImage = document.querySelector('.about-image');
        if (aboutImage) {
            aboutImage.classList.add('fade-in-right');
            this.observer.observe(aboutImage);
        }

        // Features with stagger
        const features = document.querySelectorAll('.feature');
        features.forEach((feature, index) => {
            feature.classList.add('fade-in-up', `stagger-${index + 1}`);
            this.observer.observe(feature);
        });

        // Contact items with stagger
        const contactItems = document.querySelectorAll('.contact-item');
        contactItems.forEach((item, index) => {
            item.classList.add('scale-in', `stagger-${index + 1}`);
            this.observer.observe(item);
        });

        // Hero content
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.classList.add('fade-in-left');
            this.observer.observe(heroContent);
        }

        const heroImage = document.querySelector('.hero-image');
        if (heroImage) {
            heroImage.classList.add('fade-in-right');
            this.observer.observe(heroImage);
        }
    }

    animateElement(element) {
        element.classList.add('animated');
        // Stop observing this element once animated
        this.observer.unobserve(element);
    }
}

// Smooth scrolling for navigation links
class SmoothScroll {
    constructor() {
        this.init();
    }

    init() {
        const navLinks = document.querySelectorAll('a[href^="#"]');
        navLinks.forEach(link => {
            link.addEventListener('click', this.handleClick.bind(this));
        });
    }

    handleClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }
}

// Header scroll effect
class HeaderScroll {
    constructor() {
        this.header = document.querySelector('header');
        this.init();
    }

    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const scrollTop = window.pageYOffset;
        
        if (scrollTop > 100) {
            this.header.style.background = 'rgba(250, 251, 250, 0.98)';
            this.header.style.boxShadow = '0 4px 20px rgba(45, 90, 39, 0.15)';
        } else {
            this.header.style.background = 'rgba(250, 251, 250, 0.95)';
            this.header.style.boxShadow = '0 4px 6px rgba(45, 90, 39, 0.1)';
        }
    }
}

// Mobile Menu Handler
class MobileMenu {
    constructor() {
        this.overlay = document.querySelector('.mobile-menu-overlay');
        this.toggleBtn = document.querySelector('.mobile-menu-toggle');
        this.closeBtn = document.querySelector('.mobile-menu-close');
        this.navLinks = document.querySelectorAll('.mobile-nav a');
        this.init();
    }

    init() {
        if (!this.overlay || !this.toggleBtn || !this.closeBtn) return;
        
        this.toggleBtn.addEventListener('click', this.openMenu.bind(this));
        this.closeBtn.addEventListener('click', this.closeMenu.bind(this));
        this.overlay.addEventListener('click', this.handleOverlayClick.bind(this));
        
        // Close menu when clicking nav links
        this.navLinks.forEach(link => {
            link.addEventListener('click', this.closeMenu.bind(this));
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.overlay.classList.contains('active')) {
                this.closeMenu();
            }
        });
    }

    openMenu() {
        this.overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        this.toggleBtn.setAttribute('aria-expanded', 'true');
    }

    closeMenu() {
        this.overlay.classList.remove('active');
        document.body.style.overflow = '';
        this.toggleBtn.setAttribute('aria-expanded', 'false');
    }

    handleOverlayClick(e) {
        if (e.target === this.overlay) {
            this.closeMenu();
        }
    }
}

// Initialize all animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ScrollAnimations();
    new SmoothScroll();
    new HeaderScroll();
    new MobileMenu();
    
    // Add loading animation to body
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Preload critical images
const preloadImages = () => {
    const criticalImages = [
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=800&fit=crop&fm=webp',
        'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=400&h=400&fit=crop&fm=webp'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
};

// Preload images when page loads
window.addEventListener('load', preloadImages);