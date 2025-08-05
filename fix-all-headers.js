const fs = require('fs');
const path = require('path');

// Get all HTML files except index.html (which we already fixed)
const htmlFiles = [
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

console.log('🔧 Fixing headers across all pages...');

htmlFiles.forEach(filename => {
    const filePath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${filename} not found, skipping...`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    // 1. Make logo clickable to homepage
    const logoPattern = /<div class="logo">\s*<img src="logo\.png" alt="[^"]*">\s*<\/div>/;
    const newLogo = `<div class="logo">
                <a href="index.html">
                    <img src="logo.png" alt="Broker Lead Engine Logo">
                </a>
            </div>`;
    
    if (logoPattern.test(content)) {
        content = content.replace(logoPattern, newLogo);
        changed = true;
        console.log(`✅ ${filename}: Made logo clickable`);
    }
    
    // 2. Fix dropdown menus that might be incorrectly visible
    // Add CSS to ensure dropdowns are hidden by default
    const dropdownFix = `
        /* Ensure dropdowns are hidden by default */
        .dropdown {
            opacity: 0;
            visibility: hidden;
            transform: translateY(-10px);
        }
        
        .nav-item:hover .dropdown {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
        }`;
    
    // Check if the fix is already applied
    if (!content.includes('Ensure dropdowns are hidden by default')) {
        // Find the end of the existing dropdown styles and add the fix
        const dropdownStylesEnd = content.indexOf('.nav-item:hover .dropdown {');
        if (dropdownStylesEnd !== -1) {
            const insertPoint = content.indexOf('}', dropdownStylesEnd) + 1;
            content = content.slice(0, insertPoint) + dropdownFix + content.slice(insertPoint);
            changed = true;
            console.log(`✅ ${filename}: Fixed dropdown visibility`);
        }
    }
    
    // 3. Ensure logo styles are consistent
    const logoStylePattern = /\.logo img \{[^}]*\}/g;
    const correctLogoStyle = `.logo img {
            height: 150px;
            width: auto;
            max-width: 150px;
            object-fit: contain;
        }`;
    
    if (logoStylePattern.test(content)) {
        content = content.replace(logoStylePattern, correctLogoStyle);
        changed = true;
        console.log(`✅ ${filename}: Fixed logo styles`);
    }
    
    // 4. Add logo link styles
    const logoLinkStyles = `
        .logo a {
            display: flex;
            align-items: center;
            text-decoration: none;
        }`;
    
    if (!content.includes('.logo a {')) {
        // Insert after logo img styles
        const logoImgEnd = content.indexOf('.logo img {');
        if (logoImgEnd !== -1) {
            const insertPoint = content.indexOf('}', logoImgEnd) + 1;
            content = content.slice(0, insertPoint) + logoLinkStyles + content.slice(insertPoint);
            changed = true;
            console.log(`✅ ${filename}: Added logo link styles`);
        }
    }
    
    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`💾 ${filename}: Changes saved`);
    } else {
        console.log(`ℹ️  ${filename}: No changes needed`);
    }
});

console.log('🎉 Header fixes completed!');