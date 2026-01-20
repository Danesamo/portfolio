// ============================================
// DANIELA SAMO - PORTFOLIO JAVASCRIPT
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functions
    initNavbar();
    initTypingEffect();
    initScrollAnimations();
    initMobileMenu();
});

// ============================================
// NAVBAR SCROLL EFFECT
// ============================================
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Update active nav link based on scroll position
        updateActiveNavLink();
    });

    // Smooth scroll for nav links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });

                // Close mobile menu if open
                document.getElementById('nav-menu').classList.remove('active');
                document.getElementById('nav-toggle').classList.remove('active');
            }
        });
    });
}

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.classList.add('active');
        }
    });
}

// ============================================
// TYPING EFFECT
// ============================================
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-text');
    const titles = [
        'Data Engineer',
        'Big Data Architect',
        'NLP Enthusiast',
        'Pipeline Builder',
        'Problem Solver'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            // Pause at the end of word
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect
    setTimeout(type, 1000);
}

// ============================================
// SCROLL ANIMATIONS
// ============================================
function initScrollAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.skill-category, .project-card, .timeline-item, .about-content, .contact-content'
    );

    animatedElements.forEach(el => {
        el.classList.add('animate-element');
        observer.observe(el);
    });

    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        .animate-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }

        .animate-element.animate-in {
            opacity: 1;
            transform: translateY(0);
        }

        .skill-category:nth-child(2) { transition-delay: 0.1s; }
        .skill-category:nth-child(3) { transition-delay: 0.2s; }
        .skill-category:nth-child(4) { transition-delay: 0.3s; }
        .skill-category:nth-child(5) { transition-delay: 0.4s; }
        .skill-category:nth-child(6) { transition-delay: 0.5s; }

        .project-card:nth-child(2) { transition-delay: 0.1s; }
        .project-card:nth-child(3) { transition-delay: 0.2s; }
        .project-card:nth-child(4) { transition-delay: 0.3s; }
        .project-card:nth-child(5) { transition-delay: 0.4s; }
        .project-card:nth-child(6) { transition-delay: 0.5s; }

        .timeline-item:nth-child(2) { transition-delay: 0.1s; }
        .timeline-item:nth-child(3) { transition-delay: 0.2s; }
        .timeline-item:nth-child(4) { transition-delay: 0.3s; }
        .timeline-item:nth-child(5) { transition-delay: 0.4s; }
    `;
    document.head.appendChild(style);
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// ============================================
// CONSOLE EASTER EGG
// ============================================
console.log(`
%c Daniela Samo Chouake %c Data Engineer

%c Looking for the source code?
%c Check out: https://github.com/Danesamo/danesamo.github.io

%c Let's connect! %c chouakedaniela@gmail.com
`,
    'background: linear-gradient(135deg, #6366f1, #8b5cf6); color: white; padding: 10px 20px; font-size: 16px; font-weight: bold; border-radius: 5px;',
    'color: #a5b4fc; font-size: 14px;',
    'color: #71717a; font-size: 12px;',
    'color: #6366f1; font-size: 12px;',
    'color: #22c55e; font-size: 12px;',
    'color: #a5b4fc; font-size: 12px;'
);
