// Enhanced JavaScript for AI Wellness Buddy Landing Page

document.addEventListener('DOMContentLoaded', function() {
    // Off-canvas menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const offCanvasMenu = document.getElementById('off-canvas-menu');
    const closeMenuButton = document.getElementById('close-menu');
    const overlay = document.getElementById('overlay');
    
    function openOffCanvasMenu() {
        offCanvasMenu.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    function closeOffCanvasMenu() {
        offCanvasMenu.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
    
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', openOffCanvasMenu);
    }
    
    if (closeMenuButton) {
        closeMenuButton.addEventListener('click', closeOffCanvasMenu);
    }
    
    if (overlay) {
        overlay.addEventListener('click', closeOffCanvasMenu);
    }

    // Enhanced smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
            // Close off-canvas menu if open
            closeOffCanvasMenu();
        });
    });

    // Enhanced intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Add staggered animation for child elements
                const children = entry.target.querySelectorAll('.stagger-animation');
                children.forEach((child, index) => {
                    setTimeout(() => {
                        child.classList.add('animate-in');
                    }, index * 100);
                });
            }
        });
    }, observerOptions);

    // Observe all elements with fade-in class
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Enhanced form submission handling with loading state and validation
    const waitlistForm = document.querySelector('form[action*="formsubmit"]');
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            const emailInput = this.querySelector('input[type="email"]');
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            // Validate email
            if (!validateEmail(emailInput.value)) {
                e.preventDefault();
                showNotification('Please enter a valid email address', 'error');
                emailInput.focus();
                return;
            }
            
            // Add loading state with enhanced animation
            submitButton.disabled = true;
            submitButton.innerHTML = '<i class="fas fa-spinner fa-spin mr-3"></i>Joining...';
            submitButton.classList.add('opacity-75');
            
            // Success feedback (this would normally be handled by the server)
            setTimeout(() => {
                showNotification('Welcome to the waitlist! Check your email for confirmation.', 'success');
            }, 1000);
            
            // Re-enable after 3 seconds (fallback)
            setTimeout(() => {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
                submitButton.classList.remove('opacity-75');
            }, 3000);
        });
    }

    // Enhanced email validation with real-time feedback
    const emailInput = document.querySelector('input[type="email"]');
    if (emailInput) {
        emailInput.addEventListener('input', function() {
            const email = this.value;
            if (email.length > 0) {
                if (validateEmail(email)) {
                    this.classList.remove('border-red-500');
                    this.classList.add('border-green-500');
                } else {
                    this.classList.remove('border-green-500');
                    this.classList.add('border-red-500');
                }
            } else {
                this.classList.remove('border-red-500', 'border-green-500');
            }
        });
        
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            if (email && !validateEmail(email)) {
                showNotification('Please enter a valid email address', 'warning');
            }
        });
    }

    // Enhanced navbar with glassmorphism effect on scroll
    const navbar = document.querySelector('nav');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('bg-white/95', 'backdrop-blur-md', 'shadow-xl');
                navbar.classList.remove('bg-white/90');
            } else {
                navbar.classList.remove('bg-white/95', 'backdrop-blur-md', 'shadow-xl');
                navbar.classList.add('bg-white/90');
            }
        });
    }

    // Enhanced parallax effect for hero section
    const heroSection = document.querySelector('.hero-gradient');
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }

    // Animated counter for statistics
    function animateCounter(element, target, duration = 2000, suffix = '') {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            element.textContent = Math.floor(start) + suffix;
            
            if (start >= target) {
                element.textContent = target + suffix;
                clearInterval(timer);
            }
        }, 16);
    }

    // Enhanced notification system with better styling
    function showNotification(message, type = 'info', duration = 5000) {
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 p-6 rounded-2xl text-white z-50 transition-all duration-500 transform translate-x-full shadow-2xl backdrop-blur-md border border-white/20 max-w-sm`;
        
        let bgClass, iconClass;
        switch (type) {
            case 'success':
                bgClass = 'bg-green-500/90';
                iconClass = 'fas fa-check-circle';
                break;
            case 'error':
                bgClass = 'bg-red-500/90';
                iconClass = 'fas fa-exclamation-circle';
                break;
            case 'warning':
                bgClass = 'bg-yellow-500/90';
                iconClass = 'fas fa-exclamation-triangle';
                break;
            default:
                bgClass = 'bg-blue-500/90';
                iconClass = 'fas fa-info-circle';
        }
        
        notification.classList.add(bgClass);
        
        notification.innerHTML = `
            <div class="flex items-start">
                <i class="${iconClass} mr-3 text-xl mt-1"></i>
                <div class="flex-1">
                    <span class="font-medium">${message}</span>
                </div>
                <button class="ml-4 text-white/80 hover:text-white transition-colors" onclick="this.parentElement.parentElement.remove()">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Auto remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.remove();
                }
            }, 500);
        }, duration);
    }

    // Enhanced email validation function
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
        return emailRegex.test(email);
    }

    // Enhanced keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press Escape to close off-canvas menu
        if (e.key === 'Escape') {
            closeOffCanvasMenu();
        }
        
        // Press Enter on mobile menu button
        if (e.key === 'Enter' && e.target === mobileMenuButton) {
            openOffCanvasMenu();
        }
    });

    // Lazy loading for images with intersection observer
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: '50px' });

    images.forEach(img => imageObserver.observe(img));

    // Enhanced page load performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const perfData = performance.timing;
            const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
            
            // Only log in development
            if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
                console.log(`🚀 Page loaded in ${pageLoadTime}ms`);
            }
            
            // Track Core Web Vitals
            if ('web-vital' in window) {
                // This would integrate with analytics
                console.log('Core Web Vitals tracking enabled');
            }
        });
    }

    // Service Worker registration for PWA features
    if ('serviceWorker' in navigator && 'production' === 'production') {
        window.addEventListener('load', function() {
            navigator.serviceWorker.register('/sw.js')
                .then(registration => {
                    console.log('✅ Service Worker registered');
                })
                .catch(registrationError => {
                    console.log('❌ Service Worker registration failed:', registrationError);
                });
        });
    }

    // Add dynamic year to footer
    const currentYear = new Date().getFullYear();
    const yearElements = document.querySelectorAll('.current-year');
    yearElements.forEach(el => {
        el.textContent = currentYear;
    });

    // Initialize tooltips for accessibility
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });

    function showTooltip(e) {
        const text = e.target.dataset.tooltip;
        const tooltip = document.createElement('div');
        tooltip.className = 'absolute bg-gray-900 text-white px-3 py-2 rounded-lg text-sm z-50 pointer-events-none';
        tooltip.textContent = text;
        tooltip.id = 'tooltip';
        
        document.body.appendChild(tooltip);
        
        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = rect.left + 'px';
        tooltip.style.top = (rect.top - tooltip.offsetHeight - 5) + 'px';
    }

    function hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // Add loading states to external links
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.addEventListener('click', function() {
            this.innerHTML += ' <i class="fas fa-external-link-alt text-xs ml-1"></i>';
        });
    });

    console.log('🌿 AI Wellness Buddy - Enhanced Landing Page Loaded Successfully!');
});
