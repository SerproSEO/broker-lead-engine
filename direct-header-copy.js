const fs = require('fs');
const path = require('path');

// Read the entire index.html
const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Extract everything from the beginning through the header and mobile menu
// This includes all CSS and HTML up to the loading overlay
const headerSection = indexContent.match(/([\s\S]*?<\/div>\s*<!-- Loading Overlay -->)/)[1];

// Extract just the hero section and beyond (everything after loading overlay)
const afterHeaderSection = indexContent.match(/<!-- Loading Overlay -->[\s\S]*?<\/div>\s*\n\s*<\/div>\s*\n\s*([\s\S]*)/)[1];

function updatePageDirectly(filename) {
    console.log(`\n📄 Processing ${filename}...`);
    
    const filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${filename} not found, skipping...`);
        return false;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find where the actual page content starts (after header/mobile menu)
    // Look for common patterns like hero sections, main content, etc.
    let mainContentMatch = content.match(/(<\!-- Loading Overlay -->[\s\S]*?<\/div>\s*<\/div>\s*)([\s\S]*)/);
    
    if (!mainContentMatch) {
        // Try alternative patterns
        mainContentMatch = content.match(/(<\/header>[\s\S]*?<\/div>\s*)([\s\S]*)/);
    }
    
    if (!mainContentMatch) {
        // Try to find main content section
        mainContentMatch = content.match(/([\s\S]*?)(<main|<section|<div class="hero|<div class="main-content)([\s\S]*)/);
        if (mainContentMatch) {
            const mainContent = mainContentMatch[2] + mainContentMatch[3];
            content = headerSection + '\n    ' + mainContent;
        }
    } else {
        const mainContent = mainContentMatch[2];
        content = headerSection + '\n    ' + mainContent;
    }
    
    // Write the updated content
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filename} header copied directly from index.html!`);
    
    return true;
}

// Export for use
module.exports = { updatePageDirectly };

// If run directly
if (require.main === module) {
    const page = process.argv[2];
    if (page) {
        updatePageDirectly(page);
    }
}