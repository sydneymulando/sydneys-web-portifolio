document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll function
    const smoothScroll = (target, duration = 1000) => {
        const targetElement = document.querySelector(target);
        if (!targetElement) return;

        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = currentTime => {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);
            const ease = t => t < .5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
            
            window.scrollTo(0, startPosition + (distance * ease(progress)));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            }
        };

        requestAnimationFrame(animation);
    };

    // Navbar scroll effect with fade
    const nav = document.querySelector('nav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            nav.classList.add('scrolled');
            nav.style.background = 'rgba(26, 26, 26, 0.85)';
            nav.style.backdropFilter = 'blur(10px)';
        } else {
            nav.classList.remove('scrolled');
            nav.style.background = 'transparent';
            nav.style.backdropFilter = 'none';
        }
        
        lastScroll = currentScroll;
    });

    // Animate sections on scroll
    const observeElements = (elements, className) => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '-50px'
        });

        elements.forEach(element => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'all 0.6s ease-out';
            observer.observe(element);
        });
    };

    // Observe sections
    const sections = document.querySelectorAll('section, main');
    observeElements(sections, 'visible');

    // Smooth scroll for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            smoothScroll(target);
        });
    });

    // Button hover effects
    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Portfolio item hover effects
    document.querySelectorAll('.portfolio-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.portfolio-item-content').style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.portfolio-item-content').style.transform = 'translateY(100%)';
        });
    });

    // Create and append scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollTopBtn);

    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        smoothScroll('#home');
    });

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollTopBtn.style.display = 'block';
            scrollTopBtn.style.opacity = '1';
        } else {
            scrollTopBtn.style.opacity = '0';
            setTimeout(() => {
                if (window.scrollY <= 300) {
                    scrollTopBtn.style.display = 'none';
                }
            }, 300);
        }
    });

    // Form handling (if contact form exists)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Handle form submission
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        });
    }

    // Add page transition effect
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);

    // Add hover effect to service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
// Mobile navigation functionality
const menuToggle = document.querySelector('.menu-toggle');
const closeMenu = document.querySelector('.close-menu');
const mobileSidebar = document.getElementById('mobileSidebar');
const mobileNavOverlay = document.getElementById('mobileNavOverlay');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        mobileSidebar.classList.add('active');
        mobileNavOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
}

if (closeMenu) {
    closeMenu.addEventListener('click', () => {
        mobileSidebar.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

if (mobileNavOverlay) {
    mobileNavOverlay.addEventListener('click', () => {
        mobileSidebar.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Close mobile menu when clicking on a nav link
const mobileNavLinks = document.querySelectorAll('.mobile-sidebar .nav-links a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileSidebar.classList.remove('active');
        mobileNavOverlay.classList.remove('active');
        document.body.style.overflow = '';
    });
});
