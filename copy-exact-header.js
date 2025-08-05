const fs = require('fs');
const path = require('path');

// Read the index.html to get the exact header
const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Extract header CSS (from /* Header Styles */ to before /* Service Cards */)
const headerCSSMatch = indexContent.match(/\/\* Header Styles \*\/[\s\S]*?(?=\/\* Service Cards \*\/|\/\* Hero Section \*\/)/);
const headerCSS = headerCSSMatch ? headerCSSMatch[0] : '';

// Extract hamburger and mobile menu CSS
const hamburgerCSSMatch = indexContent.match(/\/\* Hamburger Menu - Clean Implementation \*\/[\s\S]*?\.mobile-menu-overlay\.active\s*\{[^}]*\}/);
const hamburgerCSS = hamburgerCSSMatch ? hamburgerCSSMatch[0] : '';

// Extract mobile-specific CSS
const mobileCSSMatch = indexContent.match(/@media \(max-width: 768px\)\s*\{[\s\S]*?\.hamburger-menu\s*\{[^}]*display:\s*block\s*!important[^}]*\}[\s\S]*?\}/);
const mobileCSS = mobileCSSMatch ? mobileCSSMatch[0] : '';

// Extract desktop hide mobile menu CSS
const desktopHideMobileMatch = indexContent.match(/\/\* Desktop - Hide Mobile Menu \*\/[\s\S]*?@media \(min-width: 769px\)\s*\{[\s\S]*?\.mobile-menu-overlay\s*\{[^}]*\}[\s\S]*?\}/);
const desktopHideMobile = desktopHideMobileMatch ? desktopHideMobileMatch[0] : '';

// Extract the HTML header (from <!-- Header --> to end of mobile menu overlay)
const headerHTMLMatch = indexContent.match(/<!-- Header -->[\s\S]*?<\/div>\s*<!-- Loading Overlay -->/);
const headerHTML = headerHTMLMatch ? headerHTMLMatch[0].replace(/\s*<!-- Loading Overlay -->/, '') : '';

// Extract the mobile menu JavaScript
const mobileMenuJSMatch = indexContent.match(/\/\/ Mobile Menu Toggle - Clean Implementation[\s\S]*?\}\)\(\);/);
const mobileMenuJS = mobileMenuJSMatch ? mobileMenuJSMatch[0] : '';

// Function to update a page
function updatePage(filename) {
    console.log(`\n📄 Processing ${filename}...`);
    
    const filePath = path.join(__dirname, filename);
    if (!fs.existsSync(filePath)) {
        console.log(`⚠️  ${filename} not found, skipping...`);
        return false;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove old header CSS
    content = content.replace(/\/\* Header[^\/]*\*\/[\s\S]*?(?=\/\* |<\/style>)/g, '');
    content = content.replace(/\.header\s*\{[\s\S]*?\}(?:\s*\.nav-[\s\S]*?\})*/, '');
    
    // Remove old hamburger CSS
    content = content.replace(/\/\* Hamburger[^\/]*\*\/[\s\S]*?\.mobile-menu-overlay\.active\s*\{[^}]*\}/g, '');
    
    // Remove old mobile menu CSS in media queries
    content = content.replace(/@media[^{]*\{[^}]*\.hamburger-menu[^}]*\{[^}]*\}[^}]*\}/g, '');
    
    // Add the new CSS before </style>
    const cssToAdd = `
        ${headerCSS}
        
        ${hamburgerCSS}
        
        ${mobileCSS}
        
        ${desktopHideMobile}
    `;
    
    content = content.replace('</style>', cssToAdd + '\n    </style>');
    
    // Replace the HTML header (from <!-- Header --> to before main content)
    content = content.replace(/<!-- Header -->[\s\S]*?(?=<!-- Main Content|<main|<div class="main-content"|<section)/, headerHTML + '\n    ');
    
    // Replace or add mobile menu JavaScript
    if (content.includes('// Mobile Menu Toggle')) {
        content = content.replace(/\/\/ Mobile Menu Toggle[\s\S]*?}\);[\s\S]*?}\);/, mobileMenuJS);
    } else {
        // Add before closing script tag
        content = content.replace('</script>\n</body>', mobileMenuJS + '\n    </script>\n</body>');
    }
    
    // Write the updated content
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`✅ ${filename} header updated successfully!`);
    
    return true;
}

// Process one page at a time
const pagesToUpdate = [
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
    'pricing.html',
    'privacy-policy.html',
    'services.html',
    'success-stories.html',
    'terms-of-service.html',
    'thank-you.html'
];

// Start with the first page
console.log('🔧 Starting header copy process...');
console.log('📋 Will update pages one by one with confirmation');

// Export for use
module.exports = { updatePage, pagesToUpdate };