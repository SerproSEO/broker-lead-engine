const fs = require('fs');

console.log('🔍 Checking logo size consistency across all pages...\n');

// Get all HTML files
const htmlFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));

let inconsistencies = [];
let allLogos = [];

htmlFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check for .logo img height
        const logoMatches = content.match(/\.logo img \{[\s\S]*?height: (\d+)px;/g);
        const mobileLogoMatches = content.match(/\.mobile-logo \{[\s\S]*?height: (\d+)px;/g);
        
        if (logoMatches) {
            logoMatches.forEach(match => {
                const height = match.match(/height: (\d+)px/)[1];
                allLogos.push({ file, type: 'desktop', height: parseInt(height) });
            });
        }
        
        if (mobileLogoMatches) {
            mobileLogoMatches.forEach(match => {
                const height = match.match(/height: (\d+)px/)[1];
                allLogos.push({ file, type: 'mobile', height: parseInt(height) });
            });
        }
        
        // Also check mobile media query logo sizes
        const mobileMediaMatches = content.match(/@media \(max-width: 768px\)[\s\S]*?\.logo img \{[\s\S]*?height: (\d+)px;/g);
        if (mobileMediaMatches) {
            mobileMediaMatches.forEach(match => {
                const height = match.match(/height: (\d+)px/)[1];
                allLogos.push({ file, type: 'mobile-media', height: parseInt(height) });
            });
        }
        
    } catch (error) {
        console.error(`❌ Error reading ${file}:`, error.message);
    }
});

console.log('📊 Logo sizes found:');
console.log('====================');

// Group by type
const desktopLogos = allLogos.filter(l => l.type === 'desktop');
const mobileLogos = allLogos.filter(l => l.type === 'mobile' || l.type === 'mobile-media');

console.log('\n🖥️  Desktop Logo Sizes:');
const desktopSizes = {};
desktopLogos.forEach(logo => {
    if (!desktopSizes[logo.height]) desktopSizes[logo.height] = [];
    desktopSizes[logo.height].push(logo.file);
});

Object.keys(desktopSizes).forEach(size => {
    console.log(`   ${size}px: ${desktopSizes[size].length} files - ${desktopSizes[size].slice(0, 3).join(', ')}${desktopSizes[size].length > 3 ? '...' : ''}`);
});

console.log('\n📱 Mobile Logo Sizes:');
const mobileSizes = {};
mobileLogos.forEach(logo => {
    if (!mobileSizes[logo.height]) mobileSizes[logo.height] = [];
    mobileSizes[logo.height].push(logo.file);
});

Object.keys(mobileSizes).forEach(size => {
    console.log(`   ${size}px: ${mobileSizes[size].length} files - ${mobileSizes[size].slice(0, 3).join(', ')}${mobileSizes[size].length > 3 ? '...' : ''}`);
});

// Check for inconsistencies
console.log('\n🔍 Consistency Check:');
console.log('=====================');

const desktopSizeKeys = Object.keys(desktopSizes);
const mobileSizeKeys = Object.keys(mobileSizes);

if (desktopSizeKeys.length > 1) {
    console.log(`❌ Desktop logo sizes are inconsistent: ${desktopSizeKeys.join(', ')}px`);
    inconsistencies.push('desktop');
} else {
    console.log(`✅ Desktop logo sizes are consistent: ${desktopSizeKeys[0] || 'N/A'}px`);
}

if (mobileSizeKeys.length > 1) {
    console.log(`❌ Mobile logo sizes are inconsistent: ${mobileSizeKeys.join(', ')}px`);
    inconsistencies.push('mobile');
} else {
    console.log(`✅ Mobile logo sizes are consistent: ${mobileSizeKeys[0] || 'N/A'}px`);
}

if (inconsistencies.length > 0) {
    console.log(`\n⚠️  Found ${inconsistencies.length} inconsistency type(s): ${inconsistencies.join(', ')}`);
} else {
    console.log('\n🎉 All logo sizes are consistent!');
}

// Check for mobile menu issues
console.log('\n🔍 Checking mobile menu issues...');
let mobileMenuIssues = [];

htmlFiles.forEach(file => {
    try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check if mobile menu overlay exists
        if (!content.includes('mobile-menu-overlay')) {
            mobileMenuIssues.push(`${file}: Missing mobile menu overlay`);
        }
        
        // Check if hamburger button exists
        if (!content.includes('hamburger-menu')) {
            mobileMenuIssues.push(`${file}: Missing hamburger menu button`);
        }
        
        // Check if mobile menu toggle JavaScript exists
        if (!content.includes('toggleMenu')) {
            mobileMenuIssues.push(`${file}: Missing mobile menu JavaScript`);
        }
        
    } catch (error) {
        mobileMenuIssues.push(`${file}: Error reading file - ${error.message}`);
    }
});

if (mobileMenuIssues.length > 0) {
    console.log('❌ Mobile menu issues found:');
    mobileMenuIssues.forEach(issue => console.log(`   ${issue}`));
} else {
    console.log('✅ Mobile menu components appear to be present on all pages');
}