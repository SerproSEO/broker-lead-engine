// Smooth scrolling for anchor links
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
    });
});

// Contact form modal functions
function openContactForm() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
        // Add fade-in animation
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.opacity = '1';
        }, 10);
    }
}

function closeContactForm() {
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }, 300);
    }
}

// Close modal when clicking outside of it
window.addEventListener('click', function(event) {
    const modal = document.getElementById('contactModal');
    if (event.target === modal) {
        closeContactForm();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeContactForm();
    }
});

// Enhanced header scroll effect
let lastScrollY = window.scrollY;
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const currentScrollY = window.scrollY;
    
    if (header) {
        if (currentScrollY > 100) {
            header.style.background = 'rgba(15, 23, 42, 0.98)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.borderBottom = '1px solid rgba(59, 130, 246, 0.2)';
        } else {
            header.style.background = 'rgba(15, 23, 42, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
            header.style.borderBottom = '1px solid rgba(59, 130, 246, 0.1)';
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollY = currentScrollY;
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Special animations for different elements
            if (entry.target.classList.contains('feature-card')) {
                entry.target.style.animationDelay = `${Math.random() * 0.5}s`;
                entry.target.classList.add('animate-in');
            }
            
            if (entry.target.classList.contains('stat-card')) {
                // Animate numbers counting up
                animateCountUp(entry.target);
            }
        }
    });
}, observerOptions);

// Apply fade-in effect to elements
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .stat-card, .guarantee-section, .cta-section');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Number counting animation
function animateCountUp(element) {
    const valueElement = element.querySelector('.stat-value');
    if (!valueElement) return;
    
    const finalValue = valueElement.textContent;
    const numericValue = parseFloat(finalValue.replace(/[^0-9.]/g, ''));
    const suffix = finalValue.replace(/[0-9.]/g, '');
    
    if (!isNaN(numericValue)) {
        let current = 0;
        const increment = numericValue / 30; // 30 frames for smooth animation
        const timer = setInterval(() => {
            current += increment;
            if (current >= numericValue) {
                current = numericValue;
                clearInterval(timer);
            }
            valueElement.textContent = Math.round(current) + suffix;
        }, 50);
    }
}

// Form submission handling
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            
            // Simulate form submission (replace with actual endpoint)
            setTimeout(() => {
                // Success message
                showNotification('Thank you! We\'ll contact you within 24 hours to schedule your free analysis.', 'success');
                closeContactForm();
                this.reset();
                
                // Restore button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                
                // Track conversion (analytics placeholder)
                trackConversion('contact_form_submit', data);
            }, 1500);
        });
    }
});

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✅' : type === 'error' ? '❌' : 'ℹ️'}</span>
            <span class="notification-message">${message}</span>
            <button class="notification-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    notification.querySelector('.notification-content').style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.5rem;
    `;
    
    notification.querySelector('.notification-close').style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        margin-left: auto;
        padding: 0;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Analytics tracking (placeholder for Google Analytics, Facebook Pixel, etc.)
function trackConversion(eventName, data = {}) {
    console.log(`Tracking conversion: ${eventName}`, data);
    
    // Google Analytics 4 example
    if (typeof gtag !== 'undefined') {
        gtag('event', eventName, {
            'event_category': 'lead_generation',
            'event_label': 'contact_form',
            'value': 1,
            ...data
        });
    }
    
    // Facebook Pixel example
    if (typeof fbq !== 'undefined') {
        fbq('track', 'Lead', {
            content_name: 'Contact Form',
            content_category: 'Lead Generation'
        });
    }
    
    // Custom analytics endpoint
    fetch('/api/track', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            event: eventName,
            data: data,
            timestamp: new Date().toISOString(),
            url: window.location.href,
            userAgent: navigator.userAgent
        })
    }).catch(error => {
        console.log('Analytics tracking error:', error);
    });
}

// Enhanced button click tracking
document.addEventListener('DOMContentLoaded', function() {
    // Track all CTA button clicks
    document.querySelectorAll('.btn-primary, .btn-secondary, .cta-button, .cta-button-white, .guarantee-button').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const buttonText = this.textContent.trim();
            const buttonClass = this.className;
            const section = this.closest('section')?.className || 'unknown';
            
            trackConversion('cta_click', {
                button_text: buttonText,
                button_class: buttonClass,
                section: section
            });
        });
    });
    
    // Track navigation clicks
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            trackConversion('navigation_click', {
                link_text: this.textContent.trim(),
                target: this.getAttribute('href')
            });
        });
    });
    
    // Track feature card interactions
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('click', function() {
            const featureTitle = this.querySelector('.feature-title')?.textContent;
            trackConversion('feature_interest', {
                feature_name: featureTitle
            });
        });
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.hero::before');
    const speed = 0.5;
    
    // Apply subtle parallax to hero background
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * speed}px)`;
    }
});

// Dynamic dashboard stats (simulate real-time updates)
document.addEventListener('DOMContentLoaded', function() {
    const statValues = document.querySelectorAll('.stat-value');
    
    // Simulate periodic updates
    setInterval(() => {
        statValues.forEach(stat => {
            if (Math.random() < 0.1) { // 10% chance to update each stat
                const currentValue = parseInt(stat.textContent);
                const change = Math.floor(Math.random() * 5) + 1;
                const newValue = currentValue + change;
                
                // Animate the change
                stat.style.transform = 'scale(1.1)';
                stat.style.color = 'var(--accent)';
                setTimeout(() => {
                    stat.textContent = newValue;
                    setTimeout(() => {
                        stat.style.transform = 'scale(1)';
                        stat.style.color = '';
                    }, 200);
                }, 100);
            }
        });
    }, 10000); // Update every 10 seconds
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', function(e) {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
    }
});

document.addEventListener('mousedown', function() {
    document.body.classList.remove('keyboard-navigation');
});

// Loading state management
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
    
    // Trigger initial animations
    setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-content > *');
        heroElements.forEach((el, index) => {
            setTimeout(() => {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }, 500);
});

// Error handling for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
            console.log('Image failed to load:', this.src);
        });
    });
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
    const nav = document.querySelector('.nav');
    const isOpen = nav.classList.contains('mobile-open');
    
    if (isOpen) {
        nav.classList.remove('mobile-open');
    } else {
        nav.classList.add('mobile-open');
    }
}

// Preload critical resources
document.addEventListener('DOMContentLoaded', function() {
    // Preload fonts
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap';
    link.as = 'style';
    document.head.appendChild(link);
});

console.log('🚀 Broker Lead Engine - Site loaded successfully!');