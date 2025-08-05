/**
 * Advanced Typeform Integrations for Broker Lead Engine
 * 
 * This file contains JavaScript code for advanced Typeform features:
 * - Exit-intent popups
 * - Scroll-triggered forms
 * - Custom events and tracking
 * - Lead scoring integration
 */

// ========================================
// 1. EXIT-INTENT POPUP TYPEFORM
// ========================================

class ExitIntentTypeform {
    constructor(typeformId) {
        this.typeformId = typeformId;
        this.hasShown = false;
        this.isEnabled = true;
        this.init();
    }

    init() {
        // Don't show on mobile
        if (window.innerWidth < 768) return;
        
        // Don't show if user already converted
        if (localStorage.getItem('converted') === 'true') return;

        document.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
    }

    handleMouseLeave(e) {
        // Only trigger if mouse is leaving from the top
        if (e.clientY <= 0 && !this.hasShown && this.isEnabled) {
            this.showPopup();
            this.hasShown = true;
        }
    }

    showPopup() {
        // Create overlay
        const overlay = document.createElement('div');
        overlay.id = 'typeform-exit-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            z-index: 10000;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.3s ease-out;
        `;

        // Create popup container
        const popup = document.createElement('div');
        popup.style.cssText = `
            background: white;
            border-radius: 16px;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 80vh;
            overflow: auto;
            position: relative;
            animation: slideUp 0.3s ease-out;
        `;

        // Close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.style.cssText = `
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            color: #666;
            z-index: 1;
        `;
        closeBtn.onclick = () => this.closePopup();

        // Popup content
        popup.innerHTML = `
            <div style="text-align: center; margin-bottom: 2rem;">
                <h2 style="color: #1a202c; margin-bottom: 1rem;">Wait! Don't Leave Empty Handed 🚨</h2>
                <p style="color: #666; font-size: 1.1rem;">Get your free Google Ads audit before you go!</p>
            </div>
            <div data-tf-widget="${this.typeformId}" data-tf-opacity="100" style="width:100%;height:400px;"></div>
        `;

        popup.appendChild(closeBtn);
        overlay.appendChild(popup);
        document.body.appendChild(overlay);

        // Load Typeform
        this.loadTypeformScript();

        // Track event
        this.trackEvent('exit_intent_popup_shown');
    }

    closePopup() {
        const overlay = document.getElementById('typeform-exit-overlay');
        if (overlay) {
            overlay.remove();
        }
        this.trackEvent('exit_intent_popup_closed');
    }

    trackEvent(eventName) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'typeform',
                event_label: this.typeformId
            });
        }

        // Facebook Pixel
        if (typeof fbq !== 'undefined') {
            fbq('trackCustom', eventName);
        }
    }

    loadTypeformScript() {
        if (!document.getElementById('tf-embed-script')) {
            const script = document.createElement('script');
            script.id = 'tf-embed-script';
            script.src = '//embed.typeform.com/next/embed.js';
            document.head.appendChild(script);
        }
    }
}

// ========================================
// 2. SCROLL-TRIGGERED TYPEFORM
// ========================================

class ScrollTriggerTypeform {
    constructor(typeformId, triggerPercentage = 75) {
        this.typeformId = typeformId;
        this.triggerPercentage = triggerPercentage;
        this.hasTriggered = false;
        this.init();
    }

    init() {
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        if (this.hasTriggered) return;

        const scrollPercent = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
        
        if (scrollPercent >= this.triggerPercentage) {
            this.showInlineForm();
            this.hasTriggered = true;
        }
    }

    showInlineForm() {
        const container = document.createElement('div');
        container.id = 'scroll-typeform-container';
        container.style.cssText = `
            background: linear-gradient(135deg, #16a571 0%, #138a5e 100%);
            color: white;
            padding: 3rem 2rem;
            margin: 3rem 0;
            border-radius: 16px;
            text-align: center;
            animation: slideIn 0.5s ease-out;
        `;

        container.innerHTML = `
            <h3 style="margin-bottom: 1rem;">🎯 Ready to Get More Insurance Leads?</h3>
            <p style="margin-bottom: 2rem; opacity: 0.9;">Since you've read this far, you're clearly serious about growing your agency...</p>
            <div data-tf-widget="${this.typeformId}" data-tf-opacity="100" style="width:100%;height:400px; background: white; border-radius: 12px;"></div>
        `;

        // Insert after the main content
        const mainContent = document.querySelector('main') || document.body;
        mainContent.appendChild(container);

        this.loadTypeformScript();
        this.trackEvent('scroll_trigger_shown');
    }

    trackEvent(eventName) {
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, {
                event_category: 'typeform',
                scroll_depth: this.triggerPercentage
            });
        }
    }

    loadTypeformScript() {
        if (!document.getElementById('tf-embed-script')) {
            const script = document.createElement('script');
            script.id = 'tf-embed-script';
            script.src = '//embed.typeform.com/next/embed.js';
            document.head.appendChild(script);
        }
    }
}

// ========================================
// 3. TYPEFORM EVENT TRACKING
// ========================================

class TypeformAnalytics {
    constructor() {
        this.init();
    }

    init() {
        // Listen for Typeform events
        window.addEventListener('message', this.handleTypeformEvents.bind(this));
    }

    handleTypeformEvents(event) {
        if (event.origin !== 'https://embed.typeform.com') return;

        const data = event.data;
        
        switch(data.type) {
            case 'form_ready':
                this.trackEvent('typeform_loaded', { form_id: data.formId });
                break;
                
            case 'form_submit':
                this.trackEvent('typeform_submitted', { 
                    form_id: data.formId,
                    response_id: data.responseId 
                });
                this.handleFormSubmission(data);
                break;
                
            case 'form_screen_changed':
                this.trackEvent('typeform_page_change', { 
                    form_id: data.formId,
                    screen: data.screen 
                });
                break;
        }
    }

    handleFormSubmission(data) {
        // Mark user as converted
        localStorage.setItem('converted', 'true');
        
        // Trigger conversion events
        if (typeof gtag !== 'undefined') {
            gtag('event', 'conversion', {
                send_to: 'AW-CONVERSION_ID/CONVERSION_LABEL', // Replace with your Google Ads conversion
                value: 1000, // Estimated lead value
                currency: 'USD'
            });
        }

        if (typeof fbq !== 'undefined') {
            fbq('track', 'Lead', {
                value: 1000,
                currency: 'USD'
            });
        }

        // Custom lead scoring (send to your CRM)
        this.sendToWebhook(data);
    }

    sendToWebhook(data) {
        // Send lead data to your CRM or automation system
        fetch('/api/typeform-webhook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                form_id: data.formId,
                response_id: data.responseId,
                timestamp: new Date().toISOString(),
                source: 'website'
            })
        }).catch(err => console.log('Webhook error:', err));
    }

    trackEvent(eventName, parameters = {}) {
        // Google Analytics 4
        if (typeof gtag !== 'undefined') {
            gtag('event', eventName, parameters);
        }

        // Custom analytics
        console.log('Typeform Event:', eventName, parameters);
    }
}

// ========================================
// 4. LEAD SCORING INTEGRATION
// ========================================

class LeadScoring {
    constructor() {
        this.scores = {
            // Revenue ranges
            'under-500k': 20,
            '500k-1m': 40,
            '1m-2m': 60,
            '2m-5m': 80,
            '5m+': 100,
            
            // Ad spend budgets
            'under-1000': 10,
            '1000-2500': 30,
            '2500-5000': 50,
            '5000-10000': 70,
            '10000+': 90,
            
            // Urgency indicators
            'this-week': 90,
            'next-week': 70,
            'within-month': 50,
            'just-info': 20
        };
    }

    calculateScore(responses) {
        let totalScore = 0;
        let factors = 0;

        for (const [key, value] of Object.entries(responses)) {
            if (this.scores[value]) {
                totalScore += this.scores[value];
                factors++;
            }
        }

        // Additional scoring logic
        if (responses.role === 'owner') totalScore += 20;
        if (responses.current_marketing === 'not-working') totalScore += 15;
        if (responses.timeline === 'urgent') totalScore += 25;

        return factors > 0 ? Math.round(totalScore / factors) : 50;
    }

    getLeadPriority(score) {
        if (score >= 80) return 'hot';
        if (score >= 60) return 'warm';
        if (score >= 40) return 'cold';
        return 'unqualified';
    }
}

// ========================================
// 5. INITIALIZATION & USAGE
// ========================================

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize analytics tracking
    new TypeformAnalytics();
    
    // Initialize exit-intent popup (only on key pages)
    if (window.location.pathname.includes('services') || 
        window.location.pathname.includes('pricing')) {
        new ExitIntentTypeform('YOUR_EXIT_INTENT_FORM_ID');
    }
    
    // Initialize scroll trigger on blog/content pages
    if (window.location.pathname.includes('blog') || 
        window.location.pathname.includes('case-study')) {
        new ScrollTriggerTypeform('YOUR_SCROLL_FORM_ID', 60);
    }
    
});

// ========================================
// 6. UTILITY FUNCTIONS
// ========================================

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; }
        to { opacity: 1; }
    }
    
    @keyframes slideUp {
        from { transform: translateY(50px); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideIn {
        from { transform: translateX(-50px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Export for use in other files
window.TypeformUtils = {
    ExitIntentTypeform,
    ScrollTriggerTypeform,
    TypeformAnalytics,
    LeadScoring
};

// ========================================
// 7. USAGE EXAMPLES
// ========================================

/*

// Example 1: Custom exit intent with delay
setTimeout(() => {
    new ExitIntentTypeform('abc123def');
}, 30000); // Show after 30 seconds

// Example 2: Multiple scroll triggers
new ScrollTriggerTypeform('lead-form', 50); // At 50% scroll
new ScrollTriggerTypeform('consultation-form', 90); // At 90% scroll

// Example 3: Custom lead scoring
const scorer = new LeadScoring();
const score = scorer.calculateScore({
    revenue: '2m-5m',
    ad_spend: '5000-10000',
    timeline: 'this-week'
});
console.log('Lead score:', score); // High score = hot lead

*/