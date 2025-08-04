// 🌐 AUTOMATED WEBSITE GENERATION & DEPLOYMENT SYSTEM
// Generate high-converting insurance broker websites in minutes, not days

const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const cheerio = require('cheerio');
require('dotenv').config();

class WebsiteAutomationSystem {
    constructor() {
        this.templates = {
            insurance: 'insurance-broker-template',
            commercial: 'commercial-insurance-template', 
            personal: 'personal-insurance-template',
            health: 'health-insurance-template'
        };
        
        this.components = {
            hero: 'generateHeroSection',
            services: 'generateServicesSection', 
            about: 'generateAboutSection',
            testimonials: 'generateTestimonialsSection',
            contact: 'generateContactSection',
            footer: 'generateFooterSection'
        };
    }

    // 🚀 MAIN WEBSITE GENERATION ENGINE
    async generateClientWebsite(clientData) {
        console.log(`🌐 Generating website for ${clientData.name}...`);
        
        try {
            // 1. Analyze client requirements
            const requirements = await this.analyzeClientRequirements(clientData);
            
            // 2. Generate content strategy
            const contentStrategy = await this.generateContentStrategy(clientData, requirements);
            
            // 3. Create website structure
            const siteStructure = this.createSiteStructure(clientData, contentStrategy);
            
            // 4. Generate all pages
            const pages = await this.generateAllPages(clientData, siteStructure, contentStrategy);
            
            // 5. Generate CSS and JavaScript
            const styles = await this.generateCustomStyles(clientData);
            const scripts = await this.generateCustomScripts(clientData);
            
            // 6. Create deployment package
            const websitePath = await this.createDeploymentPackage(clientData, pages, styles, scripts);
            
            // 7. Deploy to hosting
            const websiteUrl = await this.deployWebsite(clientData, websitePath);
            
            // 8. Setup analytics and tracking
            await this.setupWebsiteTracking(clientData, websiteUrl);
            
            console.log(`✅ Website deployed: ${websiteUrl}`);
            
            return {
                url: websiteUrl,
                pages: Object.keys(pages).length,
                deployedAt: new Date().toISOString(),
                analytics: true,
                seoOptimized: true,
                mobileResponsive: true,
                leadCapture: true
            };
            
        } catch (error) {
            console.error('Website generation error:', error);
            throw error;
        }
    }

    // 📊 CLIENT REQUIREMENTS ANALYSIS
    async analyzeClientRequirequirements(clientData) {
        const { industry, location, targetKeywords, competitors, budget } = clientData;
        
        const requirements = {
            // Determine template type
            templateType: this.determineTemplateType(industry),
            
            // Color scheme based on industry
            colorScheme: this.generateColorScheme(industry),
            
            // Required pages
            pages: this.determineRequiredPages(industry, budget),
            
            // SEO requirements
            seo: {
                primaryKeywords: targetKeywords.slice(0, 5),
                localSEO: location ? true : false,
                competitorAnalysis: competitors ? true : false
            },
            
            // Conversion optimization
            cro: {
                leadCaptureForms: true,
                callToActions: this.generateCTAStrategy(industry),
                trustSignals: this.determineTrustSignals(industry),
                socialProof: true
            },
            
            // Mobile optimization
            mobile: {
                responsive: true,
                amp: budget > 2000,
                pwa: budget > 5000
            }
        };
        
        return requirements;
    }

    // 📝 CONTENT STRATEGY GENERATION
    async generateContentStrategy(clientData, requirements) {
        console.log('📝 Generating content strategy...');
        
        const strategy = {
            messaging: {
                mainHeadline: await this.generateMainHeadline(clientData),
                valueProposition: await this.generateValueProposition(clientData),
                uniqueSellingPoints: await this.generateUSPs(clientData)
            },
            
            content: {
                homepage: await this.generateHomepageContent(clientData),
                services: await this.generateServicesContent(clientData),
                about: await this.generateAboutContent(clientData),
                blog: await this.generateBlogContentPlan(clientData)
            },
            
            seo: {
                titleTags: await this.generateTitleTags(clientData, requirements.seo.primaryKeywords),
                metaDescriptions: await this.generateMetaDescriptions(clientData),
                headingStructure: await this.generateHeadingStructure(clientData),
                internalLinking: await this.generateInternalLinkingStrategy(clientData)
            },
            
            conversion: {
                leadMagnets: await this.generateLeadMagnets(clientData),
                formFields: this.optimizeFormFields(clientData.industry),
                followUpSequence: await this.generateFollowUpSequence(clientData)
            }
        };
        
        return strategy;
    }

    // 🏗️ WEBSITE STRUCTURE CREATION
    createSiteStructure(clientData, contentStrategy) {
        const structure = {
            navigation: {
                main: ['Home', 'Services', 'About', 'Contact'],
                footer: ['Privacy Policy', 'Terms of Service', 'Sitemap']
            },
            
            pages: {
                'index.html': { 
                    title: 'Home', 
                    template: 'homepage',
                    priority: 1.0 
                },
                'services.html': { 
                    title: 'Services', 
                    template: 'services',
                    priority: 0.9 
                },
                'about.html': { 
                    title: 'About', 
                    template: 'about',
                    priority: 0.8 
                },
                'contact.html': { 
                    title: 'Contact', 
                    template: 'contact',
                    priority: 0.9 
                },
                'quote.html': { 
                    title: 'Get Quote', 
                    template: 'quote-form',
                    priority: 1.0 
                }
            },
            
            // Add industry-specific pages
            industryPages: this.getIndustrySpecificPages(clientData.industry)
        };
        
        // Merge industry-specific pages
        Object.assign(structure.pages, structure.industryPages);
        
        return structure;
    }

    // 📄 PAGE GENERATION
    async generateAllPages(clientData, siteStructure, contentStrategy) {
        console.log('📄 Generating all website pages...');
        
        const pages = {};
        
        for (const [filename, pageConfig] of Object.entries(siteStructure.pages)) {
            try {
                const pageContent = await this.generatePage(
                    pageConfig.template,
                    clientData,
                    contentStrategy,
                    pageConfig
                );
                
                pages[filename] = pageContent;
                
            } catch (error) {
                console.error(`Error generating ${filename}:`, error);
            }
        }
        
        return pages;
    }

    // 🎨 PAGE TEMPLATE GENERATION
    async generatePage(template, clientData, contentStrategy, pageConfig) {
        const baseTemplate = await this.getBaseTemplate();
        
        let content = '';
        
        switch (template) {
            case 'homepage':
                content = await this.generateHomepage(clientData, contentStrategy);
                break;
            case 'services':
                content = await this.generateServicesPage(clientData, contentStrategy);
                break;
            case 'about':
                content = await this.generateAboutPage(clientData, contentStrategy);
                break;
            case 'contact':
                content = await this.generateContactPage(clientData, contentStrategy);
                break;
            case 'quote-form':
                content = await this.generateQuotePage(clientData, contentStrategy);
                break;
            default:
                content = await this.generateGenericPage(template, clientData, contentStrategy);
        }
        
        // Inject content into base template
        const fullPage = baseTemplate
            .replace('{{TITLE}}', `${pageConfig.title} | ${clientData.name}`)
            .replace('{{META_DESCRIPTION}}', contentStrategy.seo.metaDescriptions[template] || '')
            .replace('{{CONTENT}}', content)
            .replace('{{CLIENT_NAME}}', clientData.name)
            .replace('{{PHONE}}', clientData.phone || '')
            .replace('{{EMAIL}}', clientData.email || '')
            .replace('{{ADDRESS}}', clientData.address || '');
        
        return fullPage;
    }

    // 🏠 HOMEPAGE GENERATION
    async generateHomepage(clientData, contentStrategy) {
        const homepage = `
        ${await this.generateHeroSection(clientData, contentStrategy)}
        ${await this.generateServicesPreview(clientData, contentStrategy)}
        ${await this.generateValuePropositionSection(clientData, contentStrategy)}
        ${await this.generateTestimonialsSection(clientData, contentStrategy)}
        ${await this.generateCTASection(clientData, contentStrategy)}
        `;
        
        return homepage;
    }

    // 🦸‍♂️ HERO SECTION GENERATION
    async generateHeroSection(clientData, contentStrategy) {
        const heroContent = `
        <section class="hero-section">
            <div class="hero-container">
                <div class="hero-content">
                    <h1 class="hero-headline">${contentStrategy.messaging.mainHeadline}</h1>
                    <p class="hero-subheadline">${contentStrategy.messaging.valueProposition}</p>
                    <div class="hero-cta">
                        <a href="/quote.html" class="btn btn-primary btn-large">Get Free Quote</a>
                        <a href="/contact.html" class="btn btn-secondary btn-large">Call ${clientData.phone || '(555) 123-4567'}</a>
                    </div>
                </div>
                <div class="hero-image">
                    <img src="/images/hero-insurance.jpg" alt="${clientData.name} Insurance Services" />
                </div>
            </div>
        </section>
        `;
        
        return heroContent;
    }

    // 🛠️ SERVICES SECTION GENERATION
    async generateServicesSection(clientData, contentStrategy) {
        const services = this.getIndustryServices(clientData.industry);
        
        let servicesHTML = '<section class="services-section"><div class="container">';
        servicesHTML += '<h2>Our Insurance Services</h2><div class="services-grid">';
        
        services.forEach(service => {
            servicesHTML += `
            <div class="service-card">
                <div class="service-icon">
                    <i class="${service.icon}"></i>
                </div>
                <h3>${service.name}</h3>
                <p>${service.description}</p>
                <a href="/services.html#${service.slug}" class="service-link">Learn More</a>
            </div>
            `;
        });
        
        servicesHTML += '</div></div></section>';
        return servicesHTML;
    }

    // 📞 CONTACT FORM GENERATION
    async generateContactPage(clientData, contentStrategy) {
        const contactForm = `
        <section class="contact-section">
            <div class="container">
                <div class="contact-content">
                    <div class="contact-info">
                        <h1>Contact ${clientData.name}</h1>
                        <p>Get your free insurance quote today!</p>
                        
                        <div class="contact-details">
                            <div class="contact-item">
                                <i class="fas fa-phone"></i>
                                <span>${clientData.phone || '(555) 123-4567'}</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-envelope"></i>
                                <span>${clientData.email || 'info@' + clientData.name.toLowerCase().replace(/\s+/g, '') + '.com'}</span>
                            </div>
                            <div class="contact-item">
                                <i class="fas fa-map-marker-alt"></i>
                                <span>${clientData.address || clientData.location || 'Your City, ST'}</span>
                            </div>
                        </div>
                    </div>
                    
                    <div class="contact-form">
                        <h2>Get Your Free Quote</h2>
                        <form id="quoteForm" action="/api/submit-quote" method="POST">
                            <div class="form-row">
                                <div class="form-group">
                                    <label for="firstName">First Name *</label>
                                    <input type="text" id="firstName" name="firstName" required>
                                </div>
                                <div class="form-group">
                                    <label for="lastName">Last Name *</label>
                                    <input type="text" id="lastName" name="lastName" required>
                                </div>
                            </div>
                            
                            <div class="form-group">
                                <label for="email">Email Address *</label>
                                <input type="email" id="email" name="email" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="phone">Phone Number *</label>
                                <input type="tel" id="phone" name="phone" required>
                            </div>
                            
                            <div class="form-group">
                                <label for="insuranceType">Insurance Type *</label>
                                <select id="insuranceType" name="insuranceType" required>
                                    <option value="">Select Insurance Type</option>
                                    <option value="auto">Auto Insurance</option>
                                    <option value="home">Home Insurance</option>
                                    <option value="business">Business Insurance</option>
                                    <option value="health">Health Insurance</option>
                                    <option value="life">Life Insurance</option>
                                </select>
                            </div>
                            
                            <div class="form-group">
                                <label for="message">Additional Details</label>
                                <textarea id="message" name="message" rows="4"></textarea>
                            </div>
                            
                            <button type="submit" class="btn btn-primary btn-large">Get My Free Quote</button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
        `;
        
        return contactForm;
    }

    // 🎨 CSS GENERATION
    async generateCustomStyles(clientData) {
        const primaryColor = this.generateColorScheme(clientData.industry).primary;
        const secondaryColor = this.generateColorScheme(clientData.industry).secondary;
        
        const css = `
/* ${clientData.name} - Custom Insurance Website Styles */

:root {
    --primary-color: ${primaryColor};
    --secondary-color: ${secondaryColor};
    --text-color: #333333;
    --bg-color: #ffffff;
    --gray-light: #f8f9fa;
    --gray-medium: #6c757d;
    --success-color: #28a745;
    --font-primary: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: var(--font-primary);
    line-height: 1.6;
    color: var(--text-color);
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

/* Hero Section */
.hero-section {
    background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
    color: white;
    padding: 100px 0;
    text-align: center;
}

.hero-headline {
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 20px;
}

.hero-subheadline {
    font-size: 1.25rem;
    margin-bottom: 40px;
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
}

.hero-cta {
    display: flex;
    gap: 20px;
    justify-content: center;
    flex-wrap: wrap;
}

/* Buttons */
.btn {
    display: inline-block;
    padding: 15px 30px;
    border-radius: 5px;
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    border: none;
    cursor: pointer;
}

.btn-primary {
    background-color: var(--success-color);
    color: white;
}

.btn-primary:hover {
    background-color: #218838;
    transform: translateY(-2px);
}

.btn-secondary {
    background-color: transparent;
    color: white;
    border: 2px solid white;
}

.btn-secondary:hover {
    background-color: white;
    color: var(--primary-color);
}

/* Services Section */
.services-section {
    padding: 80px 0;
    background-color: var(--gray-light);
}

.services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 50px;
}

.service-card {
    background: white;
    padding: 30px;
    border-radius: 10px;
    text-align: center;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    transition: transform 0.3s ease;
}

.service-card:hover {
    transform: translateY(-5px);
}

.service-icon {
    font-size: 3rem;
    color: var(--primary-color);
    margin-bottom: 20px;
}

/* Contact Form */
.contact-section {
    padding: 80px 0;
}

.contact-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: start;
}

.form-group {
    margin-bottom: 25px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    font-weight: 600;
    color: var(--text-color);
}

.form-group input,
.form-group select,
.form-group textarea {
    width: 100%;
    padding: 12px 15px;
    border: 2px solid #e9ecef;
    border-radius: 5px;
    font-size: 16px;
    transition: border-color 0.3s ease;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
    outline: none;
    border-color: var(--primary-color);
}

.form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}

/* Responsive Design */
@media (max-width: 768px) {
    .hero-headline {
        font-size: 2.5rem;
    }
    
    .contact-content {
        grid-template-columns: 1fr;
        gap: 40px;
    }
    
    .form-row {
        grid-template-columns: 1fr;
    }
    
    .hero-cta {
        flex-direction: column;
        align-items: center;
    }
}

/* Lead Capture Optimization */
.sticky-cta {
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 1000;
}

.pulse {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}
        `;
        
        return css;
    }

    // 📱 JAVASCRIPT GENERATION
    async generateCustomScripts(clientData) {
        const js = `
// ${clientData.name} - Website Functionality

// Lead Capture Form Handler
document.addEventListener('DOMContentLoaded', function() {
    const quoteForm = document.getElementById('quoteForm');
    
    if (quoteForm) {
        quoteForm.addEventListener('submit', handleQuoteSubmission);
    }
    
    // Phone number formatting
    const phoneInputs = document.querySelectorAll('input[type="tel"]');
    phoneInputs.forEach(input => {
        input.addEventListener('input', formatPhoneNumber);
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});

// Quote Form Submission
async function handleQuoteSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Submitting...';
    submitBtn.disabled = true;
    
    try {
        const response = await fetch('/api/submit-quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        });
        
        if (response.ok) {
            // Success - redirect to thank you page
            window.location.href = '/thank-you.html';
        } else {
            throw new Error('Submission failed');
        }
        
    } catch (error) {
        alert('There was an error submitting your quote request. Please try again or call us directly.');
        console.error('Quote submission error:', error);
    } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }
}

// Phone Number Formatting
function formatPhoneNumber(e) {
    const value = e.target.value.replace(/\D/g, '');
    const formattedValue = value.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3');
    e.target.value = formattedValue;
}

// Analytics Tracking
function trackEvent(category, action, label = '') {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track quote form interactions
document.addEventListener('click', function(e) {
    if (e.target.matches('.btn-primary')) {
        trackEvent('CTA', 'click', e.target.textContent);
    }
    
    if (e.target.matches('a[href*="tel:"]')) {
        trackEvent('Contact', 'phone_click', '${clientData.phone || ''}');
    }
    
    if (e.target.matches('a[href*="mailto:"]')) {
        trackEvent('Contact', 'email_click', '${clientData.email || ''}');
    }
});

// Exit Intent Lead Capture
let exitIntentShown = false;
document.addEventListener('mouseleave', function(e) {
    if (e.clientY <= 0 && !exitIntentShown) {
        exitIntentShown = true;
        showExitIntentPopup();
    }
});

function showExitIntentPopup() {
    // Create exit intent popup
    const popup = document.createElement('div');
    popup.className = 'exit-intent-popup';
    popup.innerHTML = \`
        <div class="popup-content">
            <h3>Wait! Don't Leave Without Your Free Quote</h3>
            <p>Get a personalized insurance quote in under 60 seconds.</p>
            <a href="/quote.html" class="btn btn-primary">Get My Free Quote</a>
            <button class="close-popup">&times;</button>
        </div>
    \`;
    
    document.body.appendChild(popup);
    
    // Close popup functionality
    popup.querySelector('.close-popup').addEventListener('click', function() {
        document.body.removeChild(popup);
    });
    
    trackEvent('ExitIntent', 'popup_shown');
}
        `;
        
        return js;
    }

    // Helper Methods
    determineTemplateType(industry) {
        const mapping = {
            'commercial': 'commercial',
            'personal': 'personal', 
            'health': 'health',
            'auto': 'personal',
            'home': 'personal'
        };
        return mapping[industry] || 'insurance';
    }

    generateColorScheme(industry) {
        const schemes = {
            commercial: { primary: '#2c5aa0', secondary: '#4a90b8' },
            personal: { primary: '#28a745', secondary: '#20c997' },
            health: { primary: '#dc3545', secondary: '#fd7e14' },
            auto: { primary: '#007bff', secondary: '#6610f2' },
            default: { primary: '#17a2b8', secondary: '#6c757d' }
        };
        
        return schemes[industry] || schemes.default;
    }

    determineRequiredPages(industry, budget) {
        const basePages = ['home', 'services', 'about', 'contact', 'quote'];
        
        if (budget > 3000) {
            basePages.push('blog', 'testimonials', 'faq');
        }
        
        if (budget > 5000) {
            basePages.push('resources', 'case-studies', 'team');
        }
        
        return basePages;
    }

    getIndustryServices(industry) {
        const services = {
            commercial: [
                { name: 'General Liability', icon: 'fas fa-shield-alt', description: 'Protect your business from claims', slug: 'general-liability' },
                { name: 'Workers Compensation', icon: 'fas fa-users', description: 'Coverage for employee injuries', slug: 'workers-comp' },
                { name: 'Commercial Property', icon: 'fas fa-building', description: 'Protect your business property', slug: 'commercial-property' }
            ],
            personal: [
                { name: 'Auto Insurance', icon: 'fas fa-car', description: 'Complete vehicle protection', slug: 'auto' },
                { name: 'Home Insurance', icon: 'fas fa-home', description: 'Protect your home and belongings', slug: 'home' },
                { name: 'Life Insurance', icon: 'fas fa-heart', description: 'Financial protection for your family', slug: 'life' }
            ]
        };
        
        return services[industry] || services.personal;
    }

    async generateMainHeadline(clientData) {
        const headlines = [
            `${clientData.location} Insurance Experts - Save Up to 40% Today`,
            `Trusted Insurance Coverage for ${clientData.location} Businesses & Families`,
            `Get the Best Insurance Rates in ${clientData.location} - Free Quote in 60 Seconds`
        ];
        
        return headlines[0]; // Use first for consistency
    }

    async generateValueProposition(clientData) {
        return `Compare quotes from top-rated insurance companies and save hundreds on your premium. Local expertise, personalized service, and unbeatable rates in ${clientData.location}.`;
    }

    async createDeploymentPackage(clientData, pages, styles, scripts) {
        const siteName = clientData.name.toLowerCase().replace(/\s+/g, '-');
        const deploymentPath = path.join(__dirname, 'generated-websites', siteName);
        
        // Create directory structure
        await fs.mkdir(deploymentPath, { recursive: true });
        await fs.mkdir(path.join(deploymentPath, 'css'), { recursive: true });
        await fs.mkdir(path.join(deploymentPath, 'js'), { recursive: true });
        await fs.mkdir(path.join(deploymentPath, 'images'), { recursive: true });
        
        // Write HTML pages
        for (const [filename, content] of Object.entries(pages)) {
            await fs.writeFile(path.join(deploymentPath, filename), content);
        }
        
        // Write CSS
        await fs.writeFile(path.join(deploymentPath, 'css', 'styles.css'), styles);
        
        // Write JavaScript
        await fs.writeFile(path.join(deploymentPath, 'js', 'main.js'), scripts);
        
        // Generate sitemap
        await this.generateSitemap(clientData, Object.keys(pages), deploymentPath);
        
        // Generate robots.txt
        await this.generateRobotsTxt(deploymentPath);
        
        return deploymentPath;
    }

    async deployWebsite(clientData, websitePath) {
        // Simulate deployment to hosting provider
        const domain = `${clientData.name.toLowerCase().replace(/\s+/g, '-')}.brokerleadengine.com`;
        
        console.log(`🚀 Deploying to https://${domain}...`);
        
        // In real implementation, this would:
        // 1. Upload files to hosting provider (AWS S3, Netlify, etc.)
        // 2. Configure DNS
        // 3. Setup SSL certificate
        // 4. Configure CDN
        
        return `https://${domain}`;
    }

    async getBaseTemplate() {
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}}</title>
    <meta name="description" content="{{META_DESCRIPTION}}">
    <link rel="stylesheet" href="/css/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
    
    <!-- Google Analytics -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
    <script>
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'GA_MEASUREMENT_ID');
    </script>
</head>
<body>
    <header class="site-header">
        <nav class="main-nav">
            <a href="/" class="logo">{{CLIENT_NAME}}</a>
            <ul class="nav-menu">
                <li><a href="/">Home</a></li>
                <li><a href="/services.html">Services</a></li>
                <li><a href="/about.html">About</a></li>
                <li><a href="/contact.html">Contact</a></li>
                <li><a href="/quote.html" class="btn btn-primary">Get Quote</a></li>
            </ul>
        </nav>
    </header>
    
    <main>
        {{CONTENT}}
    </main>
    
    <footer class="site-footer">
        <div class="container">
            <p>&copy; 2025 {{CLIENT_NAME}}. All rights reserved.</p>
            <p>{{PHONE}} | {{EMAIL}} | {{ADDRESS}}</p>
        </div>
    </footer>
    
    <script src="/js/main.js"></script>
</body>
</html>
        `;
    }

    async generateSitemap(clientData, pages, deploymentPath) {
        const domain = `https://${clientData.name.toLowerCase().replace(/\s+/g, '-')}.brokerleadengine.com`;
        
        let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
        sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
        
        pages.forEach(page => {
            const url = page === 'index.html' ? domain : `${domain}/${page}`;
            sitemap += `  <url>\n    <loc>${url}</loc>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>\n`;
        });
        
        sitemap += '</urlset>';
        
        await fs.writeFile(path.join(deploymentPath, 'sitemap.xml'), sitemap);
    }

    async generateRobotsTxt(deploymentPath) {
        const robots = `User-agent: *
Allow: /

Sitemap: /sitemap.xml`;
        
        await fs.writeFile(path.join(deploymentPath, 'robots.txt'), robots);
    }
}

module.exports = WebsiteAutomationSystem;

// Auto-start if running directly
if (require.main === module) {
    const websiteSystem = new WebsiteAutomationSystem();
    
    // Example usage
    const testClient = {
        name: 'Metro Insurance Group',
        industry: 'commercial',
        location: 'New York, NY',
        targetKeywords: ['commercial insurance', 'business insurance', 'NYC insurance'],
        phone: '(212) 555-0123',
        email: 'info@metroinsurance.com',
        budget: 5000
    };
    
    websiteSystem.generateClientWebsite(testClient)
        .then(result => console.log('Website generated:', result))
        .catch(error => console.error('Generation failed:', error));
}