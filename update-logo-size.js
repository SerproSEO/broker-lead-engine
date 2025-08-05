const fs = require('fs');
const path = require('path');

console.log('🔧 Updating logo size to 150px on all pages...\n');

// Get all HTML files in the directory
const htmlFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));

let updatedCount = 0;
let errorCount = 0;

htmlFiles.forEach(file => {
    try {
        console.log(`📄 Processing ${file}...`);
        let content = fs.readFileSync(file, 'utf8');
        
        // Update desktop logo size from 60px to 150px
        const desktopLogoRegex = /\.logo img \{[\s\S]*?height: \d+px;[\s\S]*?max-width: \d+px;[\s\S]*?\}/g;
        const newDesktopLogoCSS = `.logo img {
            height: 150px;
            width: auto;
            max-width: 150px;
            object-fit: contain;
        }`;
        
        if (content.match(desktopLogoRegex)) {
            content = content.replace(desktopLogoRegex, newDesktopLogoCSS);
            console.log(`   ✓ Updated desktop logo size`);
        }
        
        // Update mobile logo size from 50px to 75px (proportional)
        const mobileLogoRegex = /\.logo img \{[\s\S]*?height: \d+px;[\s\S]*?max-width: \d+px;[\s\S]*?\}/g;
        content = content.replace(/height: 50px;\s*max-width: 150px;/g, 'height: 75px;\n                max-width: 75px;');
        
        // Also update any other mobile logo references
        content = content.replace(/\.mobile-logo \{[\s\S]*?height: \d+px;[\s\S]*?\}/g, `.mobile-logo {
            height: 75px;
            width: auto;
        }`);
        
        fs.writeFileSync(file, content);
        updatedCount++;
        console.log(`   ✅ Successfully updated ${file}`);
        
    } catch (error) {
        console.error(`   ❌ Error processing ${file}:`, error.message);
        errorCount++;
    }
});

console.log(`\n📊 Logo size update complete!`);
console.log(`✅ Updated: ${updatedCount} files`);
if (errorCount > 0) {
    console.log(`❌ Errors: ${errorCount} files`);
}
console.log(`🖼️  Logo size changed to 150px on desktop, 75px on mobile`);