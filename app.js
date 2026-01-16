// ===========================
// Navigation Active Link Handler
// ===========================

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        // Remove active class from all links
        document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
        // Add active class to clicked link
        this.classList.add('active');
    });
});

// Update active link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===========================
// Smooth Scroll Behavior
// ===========================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===========================
// Intersection Observer for Fade-in Effects
// ===========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe feature cards and program cards
document.querySelectorAll('.feature-card, .program-card, .why-card, .contact-item').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// ===========================
// Mobile Menu Toggle
// ===========================

const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// ===========================
// Button Hover Effects
// ===========================

document.querySelectorAll('.program-button:not(.coming-soon)').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1)';
    });
});

// ===========================
// CTA Button Click Handler
// ===========================

const ctaButton = document.querySelector('.cta-button');
if (ctaButton) {
    ctaButton.addEventListener('click', function() {
        const programsSection = document.querySelector('#programs');
        if (programsSection) {
            programsSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
}

// ===========================
// Page Load Animation
// ===========================

window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// ===========================
// Add Active Styling to CSS
// ===========================

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        background-color: rgba(255, 255, 255, 0.2);
        border-bottom: 2px solid var(--white);
    }
    
    .feature-card,
    .program-card,
    .why-card,
    .contact-item {
        opacity: 1;
    }
`;
document.head.appendChild(style);

// ===========================
// Analytics & Tracking
// ===========================

// Track which programs users click on
document.querySelectorAll('.program-button').forEach(button => {
    button.addEventListener('click', function(e) {
        const programName = this.closest('.program-card').querySelector('.program-header h3').textContent;
        console.log('User clicked on: ' + programName);
        
        // You can add tracking code here (Google Analytics, etc.)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'program_click', {
                'program_name': programName
            });
        }
    });
});

// ===========================
// Accessibility Enhancements
// ===========================

// Add keyboard navigation support
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        // Can be used to close any modals in the future
    }
});

// ===========================
// Performance: Lazy Load Images (if any added in future)
// ===========================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                observer.unobserve(entry.target);
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

console.log('Wellness Hub - JavaScript loaded successfully! 🌟');
