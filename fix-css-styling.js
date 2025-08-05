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

// Complete working CSS for the header and navigation
const completeHeaderCSS = `        /* Header Styles */
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

// Essential CSS components
const containerCSS = `        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }`;

const heroCSS = `        /* Hero Section */
        .hero {
            background: var(--gradient-secondary);
            color: white;
            padding: 60px 0 80px;
            text-align: center;
            margin-top: 80px;
            position: relative;
            overflow: hidden;
        }

        .hero::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('data:image/svg+xml,<svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg"><g fill="%23ffffff" fill-opacity="0.03"><polygon points="20 0 40 20 20 40 0 20"/></g></svg>');
            background-size: 40px 40px;
        }

        .hero h1 {
            font-size: 3.5rem;
            margin-bottom: 1.5rem;
            line-height: 1.2;
            font-weight: 800;
            letter-spacing: -0.02em;
            animation: fadeInUp 0.8s ease-out;
            position: relative;
            z-index: 1;
        }

        .hero-highlight {
            color: #16a571;
        }

        .hero-subtext {
            font-size: 1.25rem;
            margin-bottom: 2rem;
            opacity: 0.9;
            max-width: 700px;
            margin-left: auto;
            margin-right: auto;
            position: relative;
            z-index: 1;
        }`;

const sectionCSS = `        .section {
            padding: 80px 0;
            clear: both;
        }

        .section-header {
            text-align: center;
            margin-bottom: 4rem;
        }

        .section-header h2 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #1a202c;
        }`;

function fixCSSStylesheet(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let changesMade = false;
        
        console.log(`\nProcessing ${path.basename(filePath)}:`);
        
        // 1. Fix broken header CSS by replacing entire header styles section
        const headerCSSRegex = /\/\*\s*Header Styles\s*\*\/[\s\S]*?(?=\/\*\s*Hamburger Menu\s*\*\/)/;
        if (headerCSSRegex.test(content)) {
            content = content.replace(headerCSSRegex, completeHeaderCSS + '\n\n        ');
            changesMade = true;
            console.log('  ✓ Fixed broken header CSS');
        }
        
        // 2. Ensure container CSS exists
        if (!content.includes('.container {')) {
            // Find where to insert container CSS
            if (content.includes('/* Hero Section */')) {
                content = content.replace('/* Hero Section */', containerCSS + '\n\n        /* Hero Section */');
                changesMade = true;
                console.log('  ✓ Added container CSS');
            }
        }
        
        // 3. Fix hero section CSS
        const heroCSSRegex = /\/\*\s*Hero Section\s*\*\/[\s\S]*?(?=\.section\s*{|\/\*.*\*\/)/;
        if (heroCSSRegex.test(content)) {
            content = content.replace(heroCSSRegex, heroCSS + '\n\n        @keyframes fadeInUp {\n            from {\n                opacity: 0;\n                transform: translateY(30px);\n            }\n            to {\n                opacity: 1;\n                transform: translateY(0);\n            }\n        }\n\n        ');
            changesMade = true;
            console.log('  ✓ Fixed hero section CSS');
        }
        
        // 4. Ensure section CSS is proper
        if (!content.includes('.section {')) {
            // Add section CSS after hero section
            const heroEndRegex = /}\s*\n\s*@keyframes fadeInUp/;
            if (heroEndRegex.test(content)) {
                content = content.replace(heroEndRegex, '}\n\n        ' + sectionCSS + '\n\n        @keyframes fadeInUp');
                changesMade = true;
                console.log('  ✓ Added section CSS');
            }
        } else {
            // Fix existing section CSS
            content = content.replace(/\.section\s*{[^}]*}/g, '.section {\n            padding: 80px 0;\n            clear: both;\n        }');
        }
        
        // 5. Fix mobile responsive CSS
        const mobileCSSRegex = /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?}/;
        const fixedMobileCSS = `@media (max-width: 768px) {
            .nav-container {
                padding: 0 1rem;
            }

            .logo img {
                height: 50px;
                max-width: 150px;
            }

            .header {
                height: 70px;
            }

            .nav-menu {
                display: none;
            }

            .hamburger-menu {
                display: flex !important;
            }

            .header .cta-button {
                display: none;
            }

            .hero {
                margin-top: 70px;
                padding: 40px 0 60px;
            }

            .hero h1 {
                font-size: 2.5rem;
            }

            .section-header h2 {
                font-size: 2rem;
            }

            .container {
                padding: 0 1rem;
            }

            .services-grid {
                grid-template-columns: 1fr;
            }
        }`;
        
        if (mobileCSSRegex.test(content)) {
            content = content.replace(mobileCSSRegex, fixedMobileCSS);
            changesMade = true;
            console.log('  ✓ Fixed mobile responsive CSS');
        }
        
        // 6. Remove any broken CSS fragments
        content = content.replace(/\.nav-item:hover\s*\.dropdown\s*{\s*\n\s*\.dropdown/g, '.nav-item:hover .dropdown {\n            opacity: 1;\n            visibility: visible;\n            transform: translateY(0);\n        }\n\n        .dropdown');
        
        // 7. Fix any duplicate or broken selectors
        content = content.replace(/\.\w+\s*{\s*\n\s*\.\w+\s*{/g, function(match) {
            // This catches broken CSS where one selector opens and another starts without closing
            const lines = match.split('\n');
            if (lines.length >= 2) {
                return lines[0] + '\n        }\n\n        ' + lines[lines.length - 1];
            }
            return match;
        });
        
        if (changesMade) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Fixed CSS styling for ${path.basename(filePath)}`);
        } else {
            console.log(`⏭️  No CSS fixes needed for ${path.basename(filePath)}`);
        }
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

console.log('🎨 Starting CSS styling fixes...\n');

// Process each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        fixCSSStylesheet(filePath);
    } else {
        console.log(`⚠️  File not found: ${file}`);
    }
});

console.log('\n✨ CSS styling fixes complete!');
console.log('\n📋 What was fixed:');
console.log('   ✓ Repaired broken header CSS with proper closing braces');
console.log('   ✓ Fixed dropdown hover functionality');
console.log('   ✓ Ensured container CSS exists on all pages');
console.log('   ✓ Corrected hero section styling');
console.log('   ✓ Fixed section padding and spacing');
console.log('   ✓ Repaired mobile responsive breakpoints');
console.log('   ✓ Removed broken CSS fragments');
console.log('\n🔄 Next: Run build-static.js to deploy the fixes!');