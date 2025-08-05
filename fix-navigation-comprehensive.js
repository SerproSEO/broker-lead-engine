const fs = require('fs');
const path = require('path');

// Get all HTML files
const htmlFiles = [
    'index.html',
    'ai-demo.html',
    'ai-lead-generation.html', 
    'about.html',
    'case-study-stucco-dominance.html',
    'cold-email.html',
    'contact.html',
    'faq.html',
    'google-ppc.html',
    'guarantee.html',
    'local-seo.html',
    'marketing-automation.html',
    'meta-ads.html',
    'ppc-audit-landing.html',
    'pricing.html',
    'privacy-policy.html',
    'services.html',
    'success-stories.html',
    'terms-of-service.html',
    'thank-you.html'
];

// Standard header HTML structure
const standardHeader = `    <!-- Header -->
    <header class="header">
        <nav class="nav-container">
            <div class="logo">
                <a href="index.html">
                    <img src="logo.png" alt="Broker Lead Engine Logo">
                </a>
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
            </ul>
            <a href="contact.html" class="cta-button">Start Generating Leads</a>
            
            <!-- Hamburger Menu Button -->
            <button class="hamburger-menu" id="hamburger-menu" aria-label="Toggle navigation menu">
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            </button>
        </nav>
    </header>
        
        <!-- Mobile Menu Overlay -->
        <div class="mobile-menu-overlay" id="mobile-menu-overlay">
            <div class="mobile-menu-content">
                <div class="mobile-menu-header">
                    <img src="logo.png" alt="Broker Lead Engine" class="mobile-logo">
                    <button class="close-menu" id="close-menu" aria-label="Close menu">&times;</button>
                </div>
                <nav class="mobile-nav">
                    <a href="services.html" class="mobile-nav-link">Services</a>
                    <a href="about.html" class="mobile-nav-link">About</a>
                    <a href="pricing.html" class="mobile-nav-link">Resources</a>
                    <a href="contact.html" class="mobile-nav-link">Contact</a>
                    <a href="contact.html" class="mobile-cta-button">Start Generating Leads</a>
                </nav>
            </div>
        </div>`;

// Standard JavaScript for mobile menu
const standardMobileJS = `        // Mobile Menu Toggle
        const hamburgerMenu = document.getElementById('hamburger-menu');
        const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
        const closeMenu = document.getElementById('close-menu');

        function toggleMenu() {
            if (hamburgerMenu && mobileMenuOverlay) {
                hamburgerMenu.classList.toggle('active');
                mobileMenuOverlay.classList.toggle('active');
                document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
            }
        }

        if (hamburgerMenu) hamburgerMenu.addEventListener('click', toggleMenu);
        if (closeMenu) closeMenu.addEventListener('click', toggleMenu);

        // Close menu when clicking outside
        if (mobileMenuOverlay) {
            mobileMenuOverlay.addEventListener('click', function(e) {
                if (e.target === mobileMenuOverlay) {
                    toggleMenu();
                }
            });
        }

        // Close menu when clicking on navigation links
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (this.getAttribute('href').startsWith('#')) {
                    toggleMenu();
                }
            });
        });`;

console.log('🔧 Comprehensively fixing navigation across all pages...');

htmlFiles.forEach(filename => {
    const filePath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${filename} not found, skipping...`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    console.log(`\n📄 Processing ${filename}...`);
    
    // 1. Remove all existing header/nav structures (clean slate approach)
    const headerPatterns = [
        /<!-- Header -->\s*<header class="header">.*?<\/header>/s,
        /<header class="header">.*?<\/header>/s,
        /<!-- Mobile Menu Overlay -->\s*<div class="mobile-menu-overlay".*?<\/div>\s*<\/div>/s,
        /<div class="mobile-menu-overlay".*?<\/div>\s*<\/div>/s,
        /<div class="mobile-menu".*?<\/div>/s
    ];
    
    headerPatterns.forEach(pattern => {
        if (pattern.test(content)) {
            content = content.replace(pattern, '');
            changed = true;
        }
    });
    
    // 2. Insert standard header after <body> tag
    if (content.includes('<body>')) {
        content = content.replace('<body>', '<body>\n' + standardHeader);
        changed = true;
        console.log(`✅ ${filename}: Replaced header with standard structure`);
    }
    
    // 3. Fix header height in CSS - ensure exactly 80px
    const headerHeightPattern = /\.header\s*\{[^}]*height:\s*\d+px[^}]*\}/g;
    if (headerHeightPattern.test(content)) {
        content = content.replace(/height:\s*\d+px/g, 'height: 80px');
        changed = true;
        console.log(`✅ ${filename}: Fixed header height to 80px`);
    }
    
    // 4. Fix mobile header height - ensure exactly 70px  
    content = content.replace(/@media \(max-width: 768px\)[^{]*\{([^{}]*\{[^{}]*\})*[^{}]*\.header[^{]*\{[^}]*height:\s*\d+px([^}]*)\}/g, (match) => {
        return match.replace(/height:\s*\d+px/g, 'height: 70px');
    });
    
    // 5. Fix hero section margin-top to 124px (80px header + 44px banner)
    const heroMarginPattern = /\.hero\s*\{[^}]*margin-top:\s*\d+px[^}]*\}/g;
    if (heroMarginPattern.test(content)) {
        content = content.replace(/margin-top:\s*\d+px/g, 'margin-top: 124px');
        changed = true;
        console.log(`✅ ${filename}: Fixed hero margin-top to 124px`);
    }
    
    // 6. Clean up any duplicate mobile menu JavaScript
    const jsCleanupPatterns = [
        /function toggleMobileMenu\(\)[^}]*\}/g,
        /const mobileMenu = document\.getElementById\('mobileMenu'\);[^}]*\}/g,
        /\.mobile-menu-button[^}]*\}/g
    ];
    
    jsCleanupPatterns.forEach(pattern => {
        if (pattern.test(content)) {
            content = content.replace(pattern, '');
            changed = true;
        }
    });
    
    // 7. Replace/add standard mobile menu JavaScript
    if (content.includes('</script>')) {
        // Find the last script tag and insert our mobile menu JS before it closes
        const lastScriptEnd = content.lastIndexOf('</script>');
        if (lastScriptEnd !== -1) {
            const beforeScript = content.substring(0, lastScriptEnd);
            const afterScript = content.substring(lastScriptEnd);
            
            // Remove any existing mobile menu JS
            let cleanedBeforeScript = beforeScript.replace(/\/\/ Mobile Menu Toggle[\s\S]*?(?=\/\/|<\/script>|$)/g, '');
            
            content = cleanedBeforeScript + '\n' + standardMobileJS + '\n    ' + afterScript;
            changed = true;
            console.log(`✅ ${filename}: Added standard mobile menu JavaScript`);
        }
    }
    
    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`💾 ${filename}: All changes saved`);
    } else {
        console.log(`ℹ️  ${filename}: No changes needed`);
    }
});

console.log('\n🎉 Comprehensive navigation fixes completed!');