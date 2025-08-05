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

console.log('🔧 Fixing mobile logo sizes across all pages...');

htmlFiles.forEach(filename => {
    const filePath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${filename} not found, skipping...`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // Fix mobile logo sizes in media queries - should be 75px not 150px
    const mobileLogoPattern = /@media[^{]*\{\s*[^}]*\.logo img \{[^}]*height: 150px[^}]*\}/g;
    
    // Replace 150px with 75px in mobile media queries only
    content = content.replace(/@media \(max-width: 768px\)[^{]*\{([^{}]*\{[^{}]*\})*[^{}]*\.logo img \{[^}]*height: 150px([^}]*)\}/g, (match) => {
        return match.replace('height: 150px', 'height: 75px').replace('max-width: 150px', 'max-width: 75px');
    });
    
    // More comprehensive fix for nested media queries
    if (content.includes('@media (max-width: 768px)')) {
        const mediaQueryRegex = /@media \(max-width: 768px\)[^{]*\{((?:[^{}]|\{[^{}]*\})*)\}/g;
        content = content.replace(mediaQueryRegex, (match, innerContent) => {
            if (innerContent.includes('.logo img') && innerContent.includes('height: 150px')) {
                const fixed = innerContent
                    .replace(/height: 150px/g, 'height: 75px')
                    .replace(/max-width: 150px/g, 'max-width: 75px');
                changed = true;
                console.log(`✅ ${filename}: Fixed mobile logo size`);
                return match.replace(innerContent, fixed);
            }
            return match;
        });
    }
    
    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`💾 ${filename}: Changes saved`);
    } else {
        console.log(`ℹ️  ${filename}: No mobile logo fixes needed`);
    }
});

console.log('🎉 Mobile logo fixes completed!');