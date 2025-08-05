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

console.log('🔧 Fixing header height and white bar gap...');

htmlFiles.forEach(filename => {
    const filePath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${filename} not found, skipping...`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;
    
    console.log(`\n📄 Processing ${filename}...`);
    
    // 1. Fix header height - ensure it's exactly 80px
    const headerHeightRegex = /\.header\s*\{[^}]*height:\s*\d+px[^}]*\}/g;
    if (content.match(headerHeightRegex)) {
        content = content.replace(headerHeightRegex, (match) => {
            return match.replace(/height:\s*\d+px/, 'height: 80px');
        });
        changed = true;
        console.log(`✅ ${filename}: Fixed header height to 80px`);
    }
    
    // 2. Fix main content margin-top - should be 80px (header height)
    const mainContentRegex = /\.main-content\s*\{[^}]*margin-top:\s*\d+px[^}]*\}/g;
    if (content.match(mainContentRegex)) {
        content = content.replace(mainContentRegex, (match) => {
            return match.replace(/margin-top:\s*\d+px/, 'margin-top: 80px');
        });
        changed = true;
        console.log(`✅ ${filename}: Fixed main-content margin-top to 80px`);
    }
    
    // 3. Fix hero section margin-top - should be 80px (header height)
    const heroMarginRegex = /\.hero[^{]*\{[^}]*margin-top:\s*\d+px[^}]*\}/g;
    if (content.match(heroMarginRegex)) {
        content = content.replace(heroMarginRegex, (match) => {
            return match.replace(/margin-top:\s*\d+px/, 'margin-top: 80px');
        });
        changed = true;
        console.log(`✅ ${filename}: Fixed hero margin-top to 80px`);
    }
    
    // 4. Add header height and hero margin if missing
    if (!content.includes('.header') && content.includes('<header')) {
        // Add basic header CSS
        const headerCSS = `
        .header {
            background: var(--secondary);
            color: white;
            padding: 1rem 0;
            position: fixed;
            width: 100%;
            top: 0;
            z-index: 1000;
            box-shadow: var(--shadow-lg);
            height: 80px;
            display: flex;
            align-items: center;
        }`;
        
        content = content.replace('</style>', headerCSS + '\n    </style>');
        changed = true;
        console.log(`✅ ${filename}: Added header CSS`);
    }
    
    // 5. Ensure hero sections have proper margin-top
    if (content.includes('class="hero') && !content.includes('margin-top: 80px')) {
        const heroCSS = `
        .hero {
            margin-top: 80px;
        }`;
        
        content = content.replace('</style>', heroCSS + '\n    </style>');
        changed = true;
        console.log(`✅ ${filename}: Added hero margin-top`);
    }
    
    // 6. Fix any mobile header heights
    const mobileHeaderRegex = /@media[^{]*max-width:\s*768px[^}]*\{[^}]*\.header[^}]*height:\s*\d+px[^}]*\}/g;
    if (content.match(mobileHeaderRegex)) {
        content = content.replace(mobileHeaderRegex, (match) => {
            return match.replace(/height:\s*\d+px/, 'height: 70px');
        });
        changed = true;
        console.log(`✅ ${filename}: Fixed mobile header height to 70px`);
    }
    
    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`💾 ${filename}: Header height fixes applied`);
    } else {
        console.log(`ℹ️  ${filename}: No header height issues found`);
    }
});

console.log('\n🎉 Header height fixes completed!');