/**
 * Portfolio Landing Page JavaScript
 * Handles navigation, smooth scrolling, animations, and form interactions
 */

(function() {
    'use strict';

    // ===================================
    // Configuration
    // ===================================
    const CONFIG = {
        navbarScrollThreshold: 50,
        animationObserverThreshold: 0.1,
        smoothScrollDuration: 800,
        formSubmitDelay: 1500
    };

    // ===================================
    // DOM Elements
    // ===================================
    const DOM = {
        navbar: document.getElementById('navbar'),
        navToggle: document.getElementById('navToggle'),
        navMenu: document.getElementById('navMenu'),
        navLinks: document.querySelectorAll('.nav-link'),
        sections: document.querySelectorAll('section[id]'),
        contactForm: document.getElementById('contactForm'),
        scrollIndicator: document.querySelector('.scroll-indicator')
    };

    // ===================================
    // Navbar Functionality
    // ===================================
    class NavbarController {
        constructor() {
            this.isMenuOpen = false;
            this.init();
        }

        init() {
            this.handleScroll();
            this.setupEventListeners();
        }

        setupEventListeners() {
            // Scroll event for navbar background
            window.addEventListener('scroll', () => this.handleScroll(), { passive: true });

            // Mobile menu toggle
            DOM.navToggle.addEventListener('click', () => this.toggleMenu());

            // Navigation link clicks
            DOM.navLinks.forEach(link => {
                link.addEventListener('click', (e) => this.handleNavClick(e));
            });

            // Close menu when clicking outside
            document.addEventListener('click', (e) => this.handleOutsideClick(e));

            // Close menu on escape key
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isMenuOpen) {
                    this.closeMenu();
                }
            });
        }

        handleScroll() {
            const scrollY = window.scrollY;

            // Add/remove scrolled class for navbar styling
            if (scrollY > CONFIG.navbarScrollThreshold) {
                DOM.navbar.classList.add('scrolled');
            } else {
                DOM.navbar.classList.remove('scrolled');
            }

            // Update active navigation link based on scroll position
            this.updateActiveNavLink();

            // Hide scroll indicator after scrolling
            if (DOM.scrollIndicator && scrollY > 100) {
                DOM.scrollIndicator.style.opacity = '0';
            } else if (DOM.scrollIndicator) {
                DOM.scrollIndicator.style.opacity = '1';
            }
        }

        updateActiveNavLink() {
            const scrollY = window.scrollY;
            const navbarHeight = DOM.navbar.offsetHeight;

            DOM.sections.forEach(section => {
                const sectionTop = section.offsetTop - navbarHeight - 100;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    DOM.navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen;
            DOM.navMenu.classList.toggle('active');
            DOM.navToggle.classList.toggle('active');

            // Prevent body scroll when menu is open
            document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
        }

        closeMenu() {
            this.isMenuOpen = false;
            DOM.navMenu.classList.remove('active');
            DOM.navToggle.classList.remove('active');
            document.body.style.overflow = '';
        }

        handleNavClick(e) {
            const href = e.currentTarget.getAttribute('href');

            // Only handle internal links
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    this.scrollToSection(targetSection);
                    this.closeMenu();
                }
            }
        }

        scrollToSection(section) {
            const navbarHeight = DOM.navbar.offsetHeight;
            const targetPosition = section.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }

        handleOutsideClick(e) {
            if (this.isMenuOpen &&
                !DOM.navMenu.contains(e.target) &&
                !DOM.navToggle.contains(e.target)) {
                this.closeMenu();
            }
        }
    }

    // ===================================
    // Scroll Animations
    // ===================================
    class ScrollAnimations {
        constructor() {
            this.observer = null;
            this.init();
        }

        init() {
            // Create Intersection Observer for scroll animations
            this.observer = new IntersectionObserver(
                (entries) => this.handleIntersection(entries),
                {
                    threshold: CONFIG.animationObserverThreshold,
                    rootMargin: '0px 0px -100px 0px'
                }
            );

            // Observe all animatable elements
            this.observeElements();
        }

        observeElements() {
            const animatableElements = document.querySelectorAll(`
                .project-card,
                .skill-item,
                .stat-item,
                .contact-method,
                .about-text,
                .skills-container,
                .contact-form
            `);

            animatableElements.forEach(element => {
                element.style.opacity = '0';
                element.style.transform = 'translateY(30px)';
                element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                this.observer.observe(element);
            });
        }

        handleIntersection(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    this.observer.unobserve(entry.target);
                }
            });
        }
    }

    // ===================================
    // Contact Form Handler
    // ===================================
    class ContactFormHandler {
        constructor() {
            this.form = DOM.contactForm;
            this.init();
        }

        init() {
            if (!this.form) return;
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
        }

        async handleSubmit(e) {
            e.preventDefault();

            const formData = new FormData(this.form);
            const data = Object.fromEntries(formData);

            // Validate form
            if (!this.validateForm(data)) {
                return;
            }

            // Get submit button
            const submitBtn = this.form.querySelector('.btn-submit');
            const originalText = submitBtn.innerHTML;

            try {
                // Disable button and show loading state
                submitBtn.disabled = true;
                submitBtn.innerHTML = 'Sending...';

                // Simulate form submission (replace with actual API call)
                await this.simulateSubmission(data);

                // Show success message
                this.showMessage('success', 'Message sent successfully! I\'ll get back to you soon.');
                this.form.reset();

            } catch (error) {
                // Show error message
                this.showMessage('error', 'Failed to send message. Please try again or contact me directly.');
                console.error('Form submission error:', error);

            } finally {
                // Re-enable button
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }, CONFIG.formSubmitDelay);
            }
        }

        validateForm(data) {
            const { name, email, subject, message } = data;

            if (!name || !email || !subject || !message) {
                this.showMessage('error', 'Please fill in all fields.');
                return false;
            }

            if (!this.isValidEmail(email)) {
                this.showMessage('error', 'Please enter a valid email address.');
                return false;
            }

            return true;
        }

        isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        simulateSubmission(data) {
            // Simulate API call - replace with actual implementation
            return new Promise((resolve) => {
                console.log('Form data:', data);
                setTimeout(resolve, 1500);
            });
        }

        showMessage(type, text) {
            // Remove existing messages
            const existingMessage = document.querySelector('.form-message');
            if (existingMessage) {
                existingMessage.remove();
            }

            // Create message element
            const message = document.createElement('div');
            message.className = `form-message form-message-${type}`;
            message.textContent = text;
            message.style.cssText = `
                padding: 1rem;
                margin-bottom: 1rem;
                border-radius: 0.5rem;
                font-weight: 500;
                animation: slideDown 0.3s ease;
                ${type === 'success'
                    ? 'background-color: #d1fae5; color: #065f46; border: 1px solid #34d399;'
                    : 'background-color: #fee2e2; color: #991b1b; border: 1px solid #f87171;'
                }
            `;

            // Insert message at the top of the form
            this.form.insertBefore(message, this.form.firstChild);

            // Remove message after 5 seconds
            setTimeout(() => {
                message.style.animation = 'slideUp 0.3s ease';
                setTimeout(() => message.remove(), 300);
            }, 5000);
        }
    }

    // ===================================
    // Performance Utilities
    // ===================================
    class PerformanceUtils {
        static debounce(func, wait) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }

        static throttle(func, limit) {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        }
    }

    // ===================================
    // Project Card Interactions
    // ===================================
    class ProjectCardInteractions {
        constructor() {
            this.cards = document.querySelectorAll('.project-card');
            this.init();
        }

        init() {
            this.cards.forEach(card => {
                this.addHoverEffect(card);
            });
        }

        addHoverEffect(card) {
            card.addEventListener('mouseenter', () => {
                card.style.transform = 'translateY(-10px) scale(1.02)';
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'translateY(0) scale(1)';
            });
        }
    }

    // ===================================
    // Parallax Effects
    // ===================================
    class ParallaxEffects {
        constructor() {
            this.shapes = document.querySelectorAll('.hero-shape');
            this.init();
        }

        init() {
            if (this.shapes.length === 0) return;

            const handleScroll = PerformanceUtils.throttle(() => {
                const scrolled = window.scrollY;

                this.shapes.forEach((shape, index) => {
                    const speed = 0.5 + (index * 0.2);
                    const yPos = -(scrolled * speed);
                    shape.style.transform = `translateY(${yPos}px)`;
                });
            }, 10);

            window.addEventListener('scroll', handleScroll, { passive: true });
        }
    }

    // ===================================
    // Keyboard Navigation
    // ===================================
    class KeyboardNavigation {
        constructor() {
            this.init();
        }

        init() {
            document.addEventListener('keydown', (e) => {
                // Handle arrow keys for section navigation
                if (e.key === 'ArrowDown' && e.ctrlKey) {
                    e.preventDefault();
                    this.navigateToNextSection();
                } else if (e.key === 'ArrowUp' && e.ctrlKey) {
                    e.preventDefault();
                    this.navigateToPreviousSection();
                }
            });
        }

        navigateToNextSection() {
            const currentSection = this.getCurrentSection();
            const nextSection = currentSection?.nextElementSibling;

            if (nextSection && nextSection.tagName === 'SECTION') {
                this.scrollToSection(nextSection);
            }
        }

        navigateToPreviousSection() {
            const currentSection = this.getCurrentSection();
            const prevSection = currentSection?.previousElementSibling;

            if (prevSection && prevSection.tagName === 'SECTION') {
                this.scrollToSection(prevSection);
            }
        }

        getCurrentSection() {
            const scrollY = window.scrollY;
            let currentSection = null;

            DOM.sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                if (scrollY >= sectionTop) {
                    currentSection = section;
                }
            });

            return currentSection;
        }

        scrollToSection(section) {
            const navbarHeight = DOM.navbar.offsetHeight;
            const targetPosition = section.offsetTop - navbarHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // ===================================
    // Analytics Tracker (Optional)
    // ===================================
    class AnalyticsTracker {
        static trackEvent(category, action, label) {
            // Integrate with your analytics platform
            console.log('Analytics Event:', { category, action, label });

            // Example: Google Analytics
            // if (window.gtag) {
            //     gtag('event', action, {
            //         'event_category': category,
            //         'event_label': label
            //     });
            // }
        }

        static init() {
            // Track navigation clicks
            DOM.navLinks.forEach(link => {
                link.addEventListener('click', () => {
                    this.trackEvent('Navigation', 'Click', link.textContent);
                });
            });

            // Track project card clicks
            document.querySelectorAll('.project-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    this.trackEvent('Projects', 'Click', btn.textContent);
                });
            });

            // Track form submission
            if (DOM.contactForm) {
                DOM.contactForm.addEventListener('submit', () => {
                    this.trackEvent('Contact', 'Submit', 'Contact Form');
                });
            }
        }
    }

    // ===================================
    // Page Load Performance
    // ===================================
    class PageLoadOptimizer {
        static init() {
            // Lazy load images if needed
            if ('IntersectionObserver' in window) {
                const imageObserver = new IntersectionObserver((entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            if (img.dataset.src) {
                                img.src = img.dataset.src;
                                img.removeAttribute('data-src');
                                imageObserver.unobserve(img);
                            }
                        }
                    });
                });

                document.querySelectorAll('img[data-src]').forEach(img => {
                    imageObserver.observe(img);
                });
            }

            // Log page load performance
            window.addEventListener('load', () => {
                if (window.performance) {
                    const perfData = window.performance.timing;
                    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                    console.log(`Page load time: ${pageLoadTime}ms`);
                }
            });
        }
    }

    // ===================================
    // Initialization
    // ===================================
    class App {
        static init() {
            // Wait for DOM to be fully loaded
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', () => this.initializeComponents());
            } else {
                this.initializeComponents();
            }
        }

        static initializeComponents() {
            console.log('Initializing portfolio...');

            // Initialize all components
            new NavbarController();
            new ScrollAnimations();
            new ContactFormHandler();
            new ProjectCardInteractions();
            new ParallaxEffects();
            new KeyboardNavigation();

            // Optional components
            AnalyticsTracker.init();
            PageLoadOptimizer.init();

            console.log('Portfolio initialized successfully!');
        }
    }

    // Start the application
    App.init();

    // ===================================
    // CSS Animation Keyframes (injected)
    // ===================================
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideDown {
            from {
                opacity: 0;
                transform: translateY(-20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        @keyframes slideUp {
            from {
                opacity: 1;
                transform: translateY(0);
            }
            to {
                opacity: 0;
                transform: translateY(-20px);
            }
        }
    `;
    document.head.appendChild(style);

})();
