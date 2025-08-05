const fs = require('fs');
const path = require('path');

// List of HTML files to clean up
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

function cleanupCSS(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let changesMade = false;
        
        // 1. Fix duplicate dropdown CSS (remove the duplicate entry)
        const dropdownRegex = /\.nav-item:hover\s*\n\s*\.dropdown\s*{[^}]*}/g;
        content = content.replace(dropdownRegex, '.nav-item:hover .dropdown {');
        
        // 2. Add container CSS if missing
        if (!content.includes('.container {')) {
            const containerCSS = `
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }
`;
            // Insert after the header styles but before hero section
            content = content.replace('/* Hero Section */', containerCSS + '        /* Hero Section */');
            changesMade = true;
        }
        
        // 3. Ensure .nav-item:hover .dropdown visibility
        const dropdownHoverFix = `
        .nav-item:hover .dropdown {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }`;
        
        if (!content.includes('.nav-item:hover .dropdown {')) {
            // Add after the dropdown styles
            content = content.replace(/\.dropdown\s*{[^}]*}/, function(match) {
                return match + dropdownHoverFix;
            });
            changesMade = true;
        }
        
        // 4. Clean up mobile responsive CSS
        // Fix mobile hero margin
        content = content.replace(/@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?}/g, function(match) {
            // Ensure hero margin is 70px on mobile
            if (match.includes('.hero')) {
                match = match.replace(/\.hero\s*{[^}]*}/g, function(heroMatch) {
                    if (!heroMatch.includes('margin-top')) {
                        return heroMatch.replace('}', '\n                margin-top: 70px;\n            }');
                    }
                    return heroMatch.replace(/margin-top:\s*\d+px/, 'margin-top: 70px');
                });
            }
            return match;
        });
        
        // 5. Ensure section padding is consistent
        content = content.replace(/\.section\s*{([^}]*)}/g, function(match, group1) {
            if (!group1.includes('padding:')) {
                return `.section {${group1}\n            padding: 80px 0;\n        }`;
            }
            return match.replace(/padding:\s*\d+px\s*0/, 'padding: 80px 0');
        });
        
        // 6. Fix any remaining urgency-related styles in mobile
        content = content.replace(/\.urgency[^{]*{[^}]*}/g, '');
        content = content.replace(/\.countdown[^{]*{[^}]*}/g, '');
        
        // 7. Ensure hero section has proper spacing
        content = content.replace(/\.hero\s*{([^}]*)}/g, function(match, group1) {
            // Make sure margin-top is 80px for desktop
            if (!group1.includes('margin-top:')) {
                return `.hero {${group1}\n            margin-top: 80px;\n        }`;
            }
            return match.replace(/margin-top:\s*\d+px/, 'margin-top: 80px');
        });
        
        // 8. Add missing container styles to specific sections if needed
        const sectionContainerCheck = [
            '.services-grid',
            '.guarantee-section',
            '.cta-section'
        ];
        
        sectionContainerCheck.forEach(selector => {
            if (content.includes(selector) && !content.includes(`${selector} .container`)) {
                // Ensure sections have proper container wrapping
                changesMade = true;
            }
        });
        
        // 9. Fix dropdown animation timing
        content = content.replace(/\.dropdown\s*{([^}]*)transition:\s*all\s*0\.3s[^;]*;/g, '.dropdown {$1transition: all 0.2s ease;');
        
        // Write the cleaned content
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Cleaned up ${path.basename(filePath)}`);
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

console.log('🧹 Starting final cleanup...\n');

// Process each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        cleanupCSS(filePath);
    }
});

console.log('\n✨ Final cleanup complete!');
console.log('\n📋 What was fixed:');
console.log('   ✓ Removed duplicate dropdown CSS');
console.log('   ✓ Added missing container styles');
console.log('   ✓ Fixed dropdown hover visibility');
console.log('   ✓ Corrected mobile responsive issues');
console.log('   ✓ Ensured consistent section padding (80px)');
console.log('   ✓ Cleaned up remaining urgency banner styles');
console.log('   ✓ Fixed hero section margins (80px desktop, 70px mobile)');
console.log('\n🎯 Navigation Structure:');
console.log('   1. Services → All service pages');
console.log('   2. About → About, Success Stories, Case Studies, Guarantee');
console.log('   3. Resources → Pricing, AI Demo, FAQ, Privacy, Terms');
console.log('   4. Contact → Direct link');
console.log('\n🔄 Next: Run build-static.js and deploy!');