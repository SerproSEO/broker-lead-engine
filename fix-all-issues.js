const fs = require('fs');
const path = require('path');

// List of HTML files to fix
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

// Correct header HTML with CTA button
const correctHeaderHTML = `    <!-- Header -->
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
        </nav>`;

// Fixed CSS for proper layout
const fixedCSS = `        /* Header Styles */
        .header {
            background: var(--secondary);
            color: white;
            padding: 1rem 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            box-shadow: var(--shadow-lg);
            backdrop-filter: blur(10px);
            background: rgba(26, 32, 44, 0.98);
            height: 80px;
            display: flex;
            align-items: center;
        }

        .nav-container {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 2rem;
            width: 100%;
        }

        .logo {
            display: flex;
            align-items: center;
            gap: 0.5rem;
        }

        .logo img {
            height: 60px;
            width: auto;
            max-width: 180px;
            object-fit: contain;
        }

        .nav-menu {
            display: flex;
            list-style: none;
            gap: 0;
            align-items: center;
            margin: 0;
            padding: 0;
        }

        .nav-item {
            position: relative;
        }

        .nav-item > a {
            color: white;
            text-decoration: none;
            font-weight: 500;
            padding: 1rem 1.5rem;
            display: block;
            transition: all 0.3s;
            border-radius: 6px;
        }

        .nav-item > a:hover {
            color: #16a571;
            background: rgba(22, 165, 113, 0.1);
        }

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
            transition: all 0.2s ease;
            z-index: 1000;
            border: 1px solid #e2e8f0;
            max-height: 400px;
            overflow-y: auto;
        }

        .nav-item:hover .dropdown {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }

        .dropdown a {
            color: #1a202c;
            text-decoration: none;
            padding: 1rem 1.5rem;
            display: block;
            transition: all 0.2s ease;
            border-bottom: 1px solid #f1f5f9;
        }

        .dropdown a:hover {
            background: #f8fafc;
            color: #16a571;
            padding-left: 2rem;
        }

        .cta-button {
            background: var(--gradient-primary);
            color: white;
            padding: 0.875rem 2rem;
            border: none;
            border-radius: 8px;
            font-weight: 600;
            text-decoration: none;
            transition: var(--transition-base);
            cursor: pointer;
            display: inline-block;
            position: relative;
            overflow: hidden;
            box-shadow: var(--shadow-md);
            white-space: nowrap;
        }

        .cta-button::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.2);
            transition: left 0.5s;
        }

        .cta-button:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-xl);
        }

        .cta-button:hover::before {
            left: 100%;
        }`;

function fixAllIssues(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        console.log(`\nProcessing ${path.basename(filePath)}:`);
        
        // 1. Replace entire header section
        const headerRegex = /<!-- Header -->[\s\S]*?<\/header>/;
        if (headerRegex.test(content)) {
            content = content.replace(headerRegex, correctHeaderHTML + '\n    </header>');
            console.log('  ✓ Fixed header with CTA button');
        }
        
        // 2. Fix header CSS
        const headerCSSRegex = /\/\* Header Styles \*\/[\s\S]*?(?=\/\* Hamburger Menu \*\/)/;
        if (headerCSSRegex.test(content)) {
            content = content.replace(headerCSSRegex, fixedCSS + '\n\n        ');
            console.log('  ✓ Fixed header CSS');
        }
        
        // 3. Ensure container CSS exists
        if (!content.includes('.container {')) {
            const containerCSS = `
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
`;
            content = content.replace('/* Hero Section */', containerCSS + '        /* Hero Section */');
            console.log('  ✓ Added container CSS');
        }
        
        // 4. Fix hero section margin
        content = content.replace(/\.hero\s*{([^}]*margin-top:\s*)\d+px/g, '.hero {$180px');
        
        // 5. Fix mobile responsive issues
        content = content.replace(/@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?}/g, function(match) {
            // Fix header height
            match = match.replace(/\.header\s*{[^}]*}/g, `.header {
                height: 70px;
            }`);
            
            // Fix logo size
            match = match.replace(/\.logo\s+img\s*{[^}]*}/g, `.logo img {
                height: 50px;
                max-width: 150px;
            }`);
            
            // Fix hero margin
            match = match.replace(/\.hero\s*{[^}]*}/g, `.hero {
                margin-top: 70px;
                padding: 40px 0 60px;
            }`);
            
            // Hide desktop nav and show hamburger
            if (!match.includes('.nav-menu {')) {
                match = match.replace('}', `}
            
            .nav-menu {
                display: none;
            }
            
            .hamburger-menu {
                display: flex !important;
            }
            
            .header .cta-button {
                display: none;
            }`);
            }
            
            return match;
        });
        
        // 6. Remove any duplicate or broken content
        // Remove any text that appears outside of proper HTML tags
        content = content.replace(/Services\s+About\s+Resources\s+Contact\s+Start\s+Generating\s+Leads(?![^<]*>)/g, '');
        
        // 7. Ensure proper section structure
        content = content.replace(/\.section\s*{([^}]*)}/g, function(match, group1) {
            if (!group1.includes('padding:')) {
                return `.section {${group1}
            padding: 80px 0;
        }`;
            }
            return match;
        });
        
        // Write the fixed content
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed ${path.basename(filePath)}`);
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

console.log('🔧 Starting comprehensive fix for all issues...');

// Process each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        fixAllIssues(filePath);
    }
});

console.log('\n✨ All issues fixed!');
console.log('\n📋 What was fixed:');
console.log('   ✓ Restored CTA button in header');
console.log('   ✓ Fixed header layout and styling');
console.log('   ✓ Corrected logo sizing');
console.log('   ✓ Removed duplicate/broken text');
console.log('   ✓ Fixed responsive design issues');
console.log('   ✓ Ensured proper section spacing');
console.log('\n🔄 Next: Run build-static.js to update the dist folder');