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

console.log('🔧 Fixing CSS and JavaScript errors...');

htmlFiles.forEach(filename => {
    const filePath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${filename} not found, skipping...`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    console.log(`\n📄 Processing ${filename}...`);
    
    // 1. Fix hamburger line heights (should be 3px, not 80px)
    content = content.replace(/\.hamburger-line\s*\{[^}]*height:\s*80px/g, '.hamburger-line {\n            width: 25px;\n            height: 3px');
    if (content.includes('height: 3px')) {
        changed = true;
        console.log(`✅ ${filename}: Fixed hamburger line heights`);
    }
    
    // 2. Fix mobile logo heights (should be 75px, not 80px)
    content = content.replace(/\.mobile-logo\s*\{[^}]*height:\s*80px/g, '.mobile-logo {\n            height: 75px');
    if (content.includes('.mobile-logo')) {
        changed = true;
        console.log(`✅ ${filename}: Fixed mobile logo height`);
    }
    
    // 3. Fix close menu button heights (should be 40px, not 80px)
    content = content.replace(/\.close-menu\s*\{[^}]*height:\s*80px/g, '.close-menu {\n            background: none;\n            border: none;\n            color: white;\n            font-size: 2rem;\n            cursor: pointer;\n            padding: 0;\n            width: 40px;\n            height: 40px');
    
    // 4. Fix contact icon heights (should be 50px, not 80px)
    content = content.replace(/\.contact-icon\s*\{[^}]*height:\s*80px/g, '.contact-icon {\n            background: var(--gradient-primary);\n            color: white;\n            width: 50px;\n            height: 50px');
    
    // 5. Fix feature icon heights (should be 70px, not 80px)
    content = content.replace(/\.feature-icon\s*\{[^}]*height:\s*80px/g, '.feature-icon {\n            background: linear-gradient(135deg, #16a571 0%, #138a5e 100%);\n            color: white;\n            width: 70px;\n            height: 70px');
    
    // 6. Fix step number heights (should be 50px, not 80px)
    content = content.replace(/\.step-number\s*\{[^}]*height:\s*80px/g, '.step-number {\n            background: #16a571;\n            color: white;\n            width: 50px;\n            height: 50px');
    
    // 7. Fix loader heights (should be 50px, not 80px)
    content = content.replace(/\.loader\s*\{[^}]*height:\s*80px/g, '.loader {\n            width: 50px;\n            height: 50px');
    
    // 8. Fix dropdown max-height (should be 400px, not 80px)
    content = content.replace(/\.dropdown\s*\{[^}]*max-height:\s*80px/g, '.dropdown {\n            position: absolute;\n            top: 100%;\n            left: 0;\n            background: white;\n            min-width: 280px;\n            box-shadow: 0 10px 25px rgba(0,0,0,0.15);\n            border-radius: 8px;\n            opacity: 0;\n            visibility: hidden;\n            transform: translateY(-10px);\n            transition: all 0.2s ease;\n            z-index: 1000;\n            border: 1px solid #e2e8f0;\n            max-height: 400px');
    
    // 9. Fix hamburger menu heights (should be 30px, not 80px)
    content = content.replace(/\.hamburger-menu\s*\{[^}]*height:\s*80px/g, '.hamburger-menu {\n            display: none;\n            flex-direction: column;\n            justify-content: space-around;\n            width: 30px;\n            height: 30px');
    
    // 10. Fix any remaining 80px heights that should be smaller
    content = content.replace(/min-height:\s*80px/g, 'min-height: 120px');
    content = content.replace(/padding:\s*80px\s+0/g, 'padding: 80px 0');
    
    // 11. Clean up broken JavaScript syntax
    content = content.replace(/\}\); when clicking/g, '});\n\n        // Close menu when clicking');
    content = content.replace(/\}\); scrolling/g, '});\n\n        // Smooth scrolling');
    content = content.replace(/\}\); else \{/g, '});\n\n        function altFunction() {');
    content = content.replace(/\s+\); when clicking nav links/g, '});\n\n        // Close menu when clicking nav links');
    
    // 12. Remove duplicate function definitions
    const functionNames = ['toggleMenu', 'toggleMobileMenu', 'closeMobileMenu'];
    functionNames.forEach(funcName => {
        const regex = new RegExp(`function ${funcName}\\([^{]*\\{[^}]*\\}`, 'g');
        const matches = content.match(regex);
        if (matches && matches.length > 1) {
            // Keep only the first occurrence
            for (let i = 1; i < matches.length; i++) {
                content = content.replace(matches[i], '');
            }
            changed = true;
            console.log(`✅ ${filename}: Removed duplicate ${funcName} function`);
        }
    });
    
    // 13. Remove incomplete JavaScript statements
    content = content.replace(/document\.addEventListener\('click', function\(event\)[^}]*\)\s*;\s*\)/g, '');
    content = content.replace(/\s+else \{\s*mobileMenu\.style\.display = 'block';\s*\}/g, '');
    content = content.replace(/\s+\} else \{\s*mobileMenu\.style\.display = 'block';\s*\}/g, '');
    
    // 14. Fix broken event listeners
    content = content.replace(/\}\); when clicking on navigation links/g, '});\n\n        // Close menu when clicking on navigation links');
    content = content.replace(/\}\);\s*when clicking nav links/g, '});\n\n        // Close menu when clicking nav links');
    
    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`💾 ${filename}: CSS and JS errors fixed`);
    } else {
        console.log(`ℹ️  ${filename}: No CSS/JS errors found`);
    }
});

console.log('\n🎉 CSS and JavaScript error fixes completed!');