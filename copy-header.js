#!/usr/bin/env node

/**
 * Copy Header from index.html to all other pages
 * Excluding landing pages as requested
 */

const fs = require('fs');
const path = require('path');

// Source header from index.html
const HEADER_SECTION = `    <!-- Urgency Banner -->
    <div class="urgency-banner">
        <div class="urgency-content">
            <span>🚀 Limited Time: 50% OFF Launch Offer - Premium Insurance Marketing Solutions</span>
            <span class="countdown" id="countdown">90:23:59:47</span>
        </div>
    </div>

    <!-- Header -->
    <header class="header">
        <nav class="nav-container">
            <div class="logo">
                <img src="logo.png" alt="Broker Lead Engine Logo">
            </div>
            <ul class="nav-menu">
                <li class="nav-item">
                    <a href="services.html">Services</a>
                    <div class="dropdown">
                        <a href="ai-lead-generation.html">🤖 AI Lead Generation</a>
                        <a href="local-seo.html">📍 Local SEO</a>
                        <a href="google-ppc.html">🎯 Google PPC</a>
                        <a href="meta-ads.html">📱 Meta Ads</a>
                        <a href="cold-email.html">📧 Cold Email</a>
                        <a href="marketing-automation.html">⚙️ Marketing Automation</a>
                    </div>
                </li>
                <li class="nav-item"><a href="ai-demo.html">AI Demo</a></li>
                <li class="nav-item"><a href="pricing.html">Pricing</a></li>
                <li class="nav-item"><a href="case-study-stucco-dominance.html">Success Stories</a></li>
                <li class="nav-item"><a href="guarantee.html">Guarantee</a></li>
                <li class="nav-item"><a href="about.html">About</a></li>
                <li class="nav-item"><a href="contact.html">Contact</a></li>
            </ul>
            <a href="#contact" class="cta-button">Start Generating Leads</a>
            
            <!-- Hamburger Menu Button -->
            <button class="hamburger-menu" id="hamburger-menu" aria-label="Toggle navigation menu">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>
        </nav>
        
        <!-- Mobile Menu Overlay -->
        <div class="mobile-menu-overlay" id="mobile-menu-overlay">
            <div class="mobile-menu-content">
                <div class="mobile-menu-header">
                    <img src="logo.png" alt="Broker Lead Engine" class="mobile-logo">
                    <button class="close-menu" id="close-menu" aria-label="Close menu">&times;</button>
                </div>
                <nav class="mobile-nav">
                    <a href="services.html" class="mobile-nav-link">Services</a>
                    <a href="ai-demo.html" class="mobile-nav-link">AI Demo</a>
                    <a href="pricing.html" class="mobile-nav-link">Pricing</a>
                    <a href="case-study-stucco-dominance.html" class="mobile-nav-link">Success Stories</a>
                    <a href="guarantee.html" class="mobile-nav-link">Guarantee</a>
                    <a href="about.html" class="mobile-nav-link">About</a>
                    <a href="contact.html" class="mobile-nav-link">Contact</a>
                    <a href="#contact" class="mobile-cta-button">Start Generating Leads</a>
                </nav>
            </div>
        </div>
    </header>`;

// Pages to update (excluding landing pages and index.html)
const PAGES_TO_UPDATE = [
    'about.html',
    'ai-demo.html',
    'ai-lead-generation.html', 
    'case-study-stucco-dominance.html',
    'cold-email.html',
    'contact.html',
    'faq.html',
    'google-ppc.html',
    'guarantee.html',
    'local-seo.html',
    'marketing-automation.html',
    'meta-ads.html',
    'pricing.html',
    'privacy-policy.html',
    'services.html',
    'success-stories.html',
    'terms-of-service.html'
];

function replaceHeader(filename) {
    if (!fs.existsSync(filename)) {
        console.log(`⚠️  ${filename} not found, skipping...`);
        return false;
    }

    console.log(`🔄 Updating ${filename}...`);
    
    try {
        let content = fs.readFileSync(filename, 'utf8');
        
        // Find existing header section patterns
        let headerStart = -1;
        let headerEnd = -1;
        
        // Look for various header patterns
        const headerPatterns = [
            /<header[^>]*>/i,
            /<nav[^>]*class="nav-container"[^>]*>/i,
            /<!-- Header -->/i,
            /<!-- Navigation -->/i,
            /<div[^>]*urgency-banner[^>]*>/i
        ];
        
        for (const pattern of headerPatterns) {
            const match = content.match(pattern);
            if (match) {
                headerStart = match.index;
                break;
            }
        }
        
        // If no header found, look for body tag and insert after it
        if (headerStart === -1) {
            const bodyMatch = content.match(/<body[^>]*>/i);
            if (bodyMatch) {
                headerStart = bodyMatch.index + bodyMatch[0].length;
                headerEnd = headerStart;
                console.log(`  📍 No existing header found, inserting after <body> tag`);
            }
        } else {
            // Find the end of the header section
            const endPatterns = [
                /<\/header>/i,
                /<\/nav>/i,
                /<!-- Hero Section -->/i,
                /<section[^>]*class="[^"]*hero[^"]*"/i,
                /<main[^>]*>/i
            ];
            
            for (const pattern of endPatterns) {
                const match = content.slice(headerStart).match(pattern);
                if (match) {
                    if (pattern.source.includes('</')) {
                        // Include the closing tag
                        headerEnd = headerStart + match.index + match[0].length;
                    } else {
                        // Stop before the next section
                        headerEnd = headerStart + match.index;
                    }
                    break;
                }
            }
        }
        
        if (headerStart === -1) {
            console.log(`  ❌ Could not find insertion point in ${filename}`);
            return false;
        }
        
        if (headerEnd === -1) {
            console.log(`  ⚠️  Could not find header end, inserting at start position`);
            headerEnd = headerStart;
        }
        
        // Replace the header section
        const beforeHeader = content.substring(0, headerStart);
        const afterHeader = content.substring(headerEnd);
        
        const newContent = beforeHeader + HEADER_SECTION + '\n\n' + afterHeader;
        
        // Write the updated content
        fs.writeFileSync(filename, newContent, 'utf8');
        
        console.log(`  ✅ Successfully updated ${filename}`);
        return true;
        
    } catch (error) {
        console.log(`  ❌ Error updating ${filename}: ${error.message}`);
        return false;
    }
}

function main() {
    console.log('🚀 Copying header from index.html to all pages (excluding landing pages)...\n');
    
    let successCount = 0;
    let failCount = 0;
    
    for (const filename of PAGES_TO_UPDATE) {
        if (replaceHeader(filename)) {
            successCount++;
        } else {
            failCount++;
        }
    }
    
    console.log(`\n📊 Summary:`);
    console.log(`✅ Successfully updated: ${successCount} pages`);
    console.log(`❌ Failed to update: ${failCount} pages`);
    console.log(`📁 Total pages processed: ${PAGES_TO_UPDATE.length}`);
    
    if (successCount > 0) {
        console.log(`\n🎉 Header copying completed! All pages now have consistent navigation.`);
        console.log(`🚀 Run "npm run build" to prepare for deployment.`);
    }
}

main();