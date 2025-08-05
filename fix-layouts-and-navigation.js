const fs = require('fs');
const path = require('path');

// List of HTML files to update
const htmlFiles = [
    'index.html',
    'services.html',
    'ai-lead-generation.html',
    'local-seo.html',
    'google-ppc.html',
    'meta-ads.html',
    'cold-email.html',
    'marketing-automation.html',
    'ai-demo.html',
    'pricing.html',
    'success-stories.html',
    'case-study-stucco-dominance.html',
    'guarantee.html',
    'about.html',
    'contact.html',
    'faq.html',
    'privacy-policy.html',
    'terms-of-service.html'
];

// New navigation structure with max 4 items
const newNavigationHTML = `
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
                <li class="nav-item">
                    <a href="about.html">About</a>
                    <div class="dropdown">
                        <a href="about.html">🏢 About Us</a>
                        <a href="success-stories.html">🏆 Success Stories</a>
                        <a href="case-study-stucco-dominance.html">📈 Case Studies</a>
                        <a href="guarantee.html">🛡️ Our Guarantee</a>
                    </div>
                </li>
                <li class="nav-item">
                    <a href="pricing.html">Resources</a>
                    <div class="dropdown">
                        <a href="pricing.html">💰 Pricing</a>
                        <a href="ai-demo.html">🤖 AI Demo</a>
                        <a href="faq.html">❓ FAQ</a>
                        <a href="privacy-policy.html">🔒 Privacy Policy</a>
                        <a href="terms-of-service.html">📄 Terms of Service</a>
                    </div>
                </li>
                <li class="nav-item"><a href="contact.html">Contact</a></li>
            </ul>`;

// New mobile navigation
const newMobileNavHTML = `
                <nav class="mobile-nav">
                    <a href="services.html" class="mobile-nav-link">Services</a>
                    <a href="about.html" class="mobile-nav-link">About</a>
                    <a href="pricing.html" class="mobile-nav-link">Resources</a>
                    <a href="contact.html" class="mobile-nav-link">Contact</a>
                    <a href="#contact" class="mobile-cta-button">Start Generating Leads</a>
                </nav>`;

function fixLayoutsAndNavigation(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let changesMade = false;
        
        // 1. Replace navigation menu
        const navMenuRegex = /<ul class="nav-menu">[\s\S]*?<\/ul>/;
        if (navMenuRegex.test(content)) {
            content = content.replace(navMenuRegex, newNavigationHTML);
            changesMade = true;
            console.log(`  ✓ Updated navigation menu to 4 items with dropdowns`);
        }
        
        // 2. Replace mobile navigation
        const mobileNavRegex = /<nav class="mobile-nav">[\s\S]*?<\/nav>/;
        if (mobileNavRegex.test(content)) {
            content = content.replace(mobileNavRegex, newMobileNavHTML);
            changesMade = true;
            console.log(`  ✓ Updated mobile navigation`);
        }
        
        // 3. Fix hero margin on mobile (from 106px to 70px)
        content = content.replace(/\.hero\s*{\s*margin-top:\s*106px/g, '.hero {\n                margin-top: 70px');
        
        // 4. Remove any remaining urgency-banner CSS
        const urgencyBannerCSSRegex = /\.urgency-banner\s*{[^}]*}/g;
        content = content.replace(urgencyBannerCSSRegex, '');
        
        const urgencyContentCSSRegex = /\.urgency-content\s*{[^}]*}/g;
        content = content.replace(urgencyContentCSSRegex, '');
        
        const countdownCSSRegex = /\.countdown\s*{[^}]*}/g;
        content = content.replace(countdownCSSRegex, '');
        
        // 5. Fix section padding for better spacing
        content = content.replace(/\.section\s*{\s*padding:\s*60px\s*0;/g, '.section {\n            padding: 80px 0;');
        
        // 6. Add better dropdown styling
        const dropdownStyleFix = `
        .dropdown {
            position: absolute;
            top: 100%;
            left: 0;
            background: white;
            min-width: 280px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.15);
            border-radius: 8px;
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
            transition: all 0.3s ease;
            z-index: 1000;
            border: 1px solid #e2e8f0;
            max-height: 400px;
            overflow-y: auto;
        }`;
        
        // Replace existing dropdown style
        content = content.replace(/\.dropdown\s*{[^}]*}/g, dropdownStyleFix);
        
        // 7. Fix container max-width for better content width
        if (!content.includes('.container {')) {
            const containerStyle = `
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }`;
            content = content.replace('/* Hero Section */', containerStyle + '\n\n        /* Hero Section */');
            changesMade = true;
        }
        
        // 8. Ensure proper hero section spacing
        content = content.replace(/\.hero\s*{([^}]*margin-top:\s*)\d+px/g, '.hero {$180px');
        
        // 9. Fix mobile breakpoint issues
        content = content.replace(/@media\s*\(max-width:\s*768px\)\s*{[^}]*\.hero\s*{[^}]*}/g, function(match) {
            return match.replace(/margin-top:\s*\d+px/, 'margin-top: 70px');
        });
        
        if (changesMade) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated ${path.basename(filePath)}`);
        } else {
            console.log(`⏭️  No changes needed for ${path.basename(filePath)}`);
        }
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

console.log('🚀 Starting layout and navigation fixes...\n');
console.log('📋 New Navigation Structure:');
console.log('   1. Services (dropdown)');
console.log('   2. About (dropdown)');
console.log('   3. Resources (dropdown)');
console.log('   4. Contact\n');

// Process each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`\nProcessing ${file}:`);
        fixLayoutsAndNavigation(filePath);
    } else {
        console.log(`\n⚠️  File not found: ${file}`);
    }
});

console.log('\n✨ Layout and navigation fixes complete!');
console.log('\n📝 Summary of changes:');
console.log('   - Navigation condensed to 4 main items with dropdowns');
console.log('   - Fixed hero section margins (80px desktop, 70px mobile)');
console.log('   - Removed all urgency banner CSS remnants');
console.log('   - Improved section padding for better spacing');
console.log('   - Enhanced dropdown styling');
console.log('   - Fixed mobile responsive issues');
console.log('\n🔄 Next: Run build-static.js to update the dist folder');