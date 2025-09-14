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
    }
});

// Scroll animations removed per user request

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

// Hero scroll fade effect removed per user request

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

// Simple mobile menu toggle
function toggleMenu() {
    const nav = document.getElementById('navigation');
    const menuBtn = document.querySelector('.menu-toggle');
    
    nav.classList.toggle('open');
    menuBtn.classList.toggle('active');
    
    // Prevent body scroll when menu is open
    if (nav.classList.contains('open')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
}

// Close menu when clicking on nav links
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav-link, .cta-button');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            const nav = document.getElementById('navigation');
            const menuBtn = document.querySelector('.menu-toggle');
            
            if (nav.classList.contains('open')) {
                nav.classList.remove('open');
                menuBtn.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
        });
    });
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const nav = document.getElementById('navigation');
    const menuBtn = document.querySelector('.menu-toggle');
    
    if (nav.classList.contains('open') && 
        !nav.contains(event.target) && 
        !menuBtn.contains(event.target)) {
        nav.classList.remove('open');
        menuBtn.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

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

// Analytics and tracking setup
// Google Analytics 4 (replace GA_MEASUREMENT_ID with actual ID)
function gtag(){dataLayer.push(arguments);}
window.dataLayer = window.dataLayer || [];
gtag('js', new Date());
// gtag('config', 'GA_MEASUREMENT_ID');

// Form analytics tracking
function trackFormSubmission(formType) {
    // Track form submissions for conversion analysis
    if (typeof gtag !== 'undefined') {
        gtag('event', 'form_submit', {
            'form_type': formType,
            'event_category': 'Lead Generation',
            'event_label': 'Professional Liability SEO'
        });
    }
}

// Phone number click tracking
function trackPhoneClick() {
    if (typeof gtag !== 'undefined') {
        gtag('event', 'phone_click', {
            'event_category': 'Lead Generation',
            'event_label': 'Phone Number Click'
        });
    }
}

// Page load time tracking
window.addEventListener('load', function() {
    const loadTime = performance.now();
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_load_time', {
            'event_category': 'Performance',
            'event_label': 'Page Load',
            'value': Math.round(loadTime)
        });
    }
});

// SEO-friendly navigation updates
function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage ||
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}

// Call on page load
document.addEventListener('DOMContentLoaded', updateActiveNav);

// Add event tracking to all contact forms
document.addEventListener('DOMContentLoaded', function() {
    const contactForms = document.querySelectorAll('#contactForm');
    contactForms.forEach(form => {
        form.addEventListener('submit', function() {
            trackFormSubmission('professional_liability_seo_contact');
        });
    });
});

// Schema.org structured data for SEO
const schemaData = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Broker Lead Engine",
    "description": "Professional liability insurance SEO specialists. Guaranteed top 3 Google Maps rankings within 90 days.",
    "url": "https://brokerleadengine.com",
    "areaServed": {
        "@type": "State",
        "name": "New York"
    },
    "serviceType": "SEO Services",
    "provider": {
        "@type": "Organization",
        "name": "Broker Lead Engine LLC"
    },
    "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Professional Liability Insurance SEO Services",
        "itemListElement": [
            {
                "@type": "Offer",
                "itemOffered": {
                    "@type": "Service",
                    "name": "Local SEO Domination Package",
                    "description": "Complete professional liability insurance SEO package with 90-day ranking guarantee"
                },
                "price": "2497",
                "priceCurrency": "USD",
                "priceSpecification": {
                    "@type": "UnitPriceSpecification",
                    "price": "2497",
                    "priceCurrency": "USD",
                    "billingDuration": "P1M"
                }
            }
        ]
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "4",
        "bestRating": "5",
        "worstRating": "1"
    }
};

// Inject schema data
const script = document.createElement('script');
script.type = 'application/ld+json';
script.text = JSON.stringify(schemaData);
document.head.appendChild(script);