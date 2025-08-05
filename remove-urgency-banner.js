const fs = require('fs');
const path = require('path');

// List of HTML files to update (excluding dist folder and other directories)
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
    'terms-of-service.html',
    'ppc-sales-page.html',
    'playbook-styled.html'
];

function removeUrgencyBanner(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let changesMade = false;
        
        // Remove the urgency banner HTML
        const urgencyBannerRegex = /<!-- Urgency Banner -->[\s\S]*?<\/div>\s*<\/div>/g;
        if (urgencyBannerRegex.test(content)) {
            content = content.replace(urgencyBannerRegex, '');
            changesMade = true;
            console.log(`  ✓ Removed urgency banner HTML`);
        }
        
        // Remove countdown JavaScript
        const countdownJsRegex = /\/\/ Countdown Timer[\s\S]*?updateCountdown\(\);\s*setInterval\(updateCountdown, 1000\);\s*/g;
        if (countdownJsRegex.test(content)) {
            content = content.replace(countdownJsRegex, '');
            changesMade = true;
            console.log(`  ✓ Removed countdown JavaScript`);
        }
        
        // Update hero section margin from 124px to 80px
        const heroMarginRegex = /margin-top:\s*124px/g;
        if (heroMarginRegex.test(content)) {
            content = content.replace(heroMarginRegex, 'margin-top: 80px');
            changesMade = true;
            console.log(`  ✓ Updated hero margin from 124px to 80px`);
        }
        
        // Update any references to urgency-banner height in CSS
        const urgencyHeightRegex = /\.urgency-banner\s*{[^}]*height:\s*44px[^}]*}/g;
        if (urgencyHeightRegex.test(content)) {
            content = content.replace(urgencyHeightRegex, '');
            changesMade = true;
            console.log(`  ✓ Removed urgency banner CSS`);
        }
        
        // Remove urgency-banner styles
        const urgencyStylesRegex = /\/\*\s*Urgency Banner\s*\*\/[\s\S]*?(?=\/\*|@media|<\/style>)/g;
        if (urgencyStylesRegex.test(content)) {
            content = content.replace(urgencyStylesRegex, '');
            changesMade = true;
            console.log(`  ✓ Removed urgency banner styles`);
        }
        
        if (changesMade) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated ${path.basename(filePath)}`);
        } else {
            console.log(`⏭️  No urgency banner found in ${path.basename(filePath)}`);
        }
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

console.log('🚀 Starting urgency banner removal...\n');

// Process each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        console.log(`\nProcessing ${file}:`);
        removeUrgencyBanner(filePath);
    } else {
        console.log(`\n⚠️  File not found: ${file}`);
    }
});

console.log('\n✨ Urgency banner removal complete!');
console.log('\n📝 Note: The urgency banner has been removed from all pages.');
console.log('   Hero sections have been adjusted from 124px to 80px margin-top.');
console.log('\n🔄 Next steps:');
console.log('   1. Run build-static.js to update the dist folder');
console.log('   2. Deploy the changes to DigitalOcean');