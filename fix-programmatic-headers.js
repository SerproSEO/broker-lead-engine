const fs = require('fs');
const path = require('path');

// List of programmatic SEO pages to fix
const programmaticPages = [
    'farm-insurance-marketing-butler-county-kansas.html',
    'boat-insurance-marketing-lake-county-michigan.html',
    'mobile-home-insurance-marketing-rural-texas.html',
    'how-to-market-life-insurance-in-springfield-missouri.html',
    'rv-insurance-marketing-rural-montana.html'
];

// Read the homepage to get the header
const homepagePath = path.join(__dirname, 'index.html');
const homepageContent = fs.readFileSync(homepagePath, 'utf8');

// Extract header HTML from homepage (from <!-- Header --> to after </header> and mobile menu)
const headerMatch = homepageContent.match(/<!-- Header -->([\s\S]*?)<!-- Loading Overlay -->/);
if (!headerMatch) {
    console.error('Could not find header in homepage');
    process.exit(1);
}
const headerHTML = headerMatch[1].trim();

// Extract header CSS from homepage
const headerCSSMatch = homepageContent.match(/\/\* Header Styles \*\/([\s\S]*?)\/\* Loading Overlay \*\//);
if (!headerCSSMatch) {
    console.error('Could not find header CSS in homepage');
    process.exit(1);
}
const headerCSS = `/* Header Styles */` + headerCSSMatch[1];

// Extract mobile menu JavaScript
const mobileMenuJS = `
    // Mobile Menu Toggle
    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
    const closeMenu = document.getElementById('close-menu');
    
    function toggleMenu() {
        if (hamburgerMenu && mobileMenuOverlay) {
            hamburgerMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.style.overflow = mobileMenuOverlay.classList.contains('active') ? 'hidden' : '';
        }
    }
    
    // Event listeners
    if (hamburgerMenu) hamburgerMenu.addEventListener('click', toggleMenu);
    if (closeMenu) closeMenu.addEventListener('click', toggleMenu);
    
    // Close menu when clicking outside
    if (mobileMenuOverlay) {
        mobileMenuOverlay.addEventListener('click', function(e) {
            if (e.target === mobileMenuOverlay) {
                toggleMenu();
            }
        });
    }
    
    // Close menu when clicking on navigation links
    document.querySelectorAll('.mobile-nav-link, .mobile-cta-button').forEach(link => {
        link.addEventListener('click', function() {
            toggleMenu();
        });
    });
`;

// Process each programmatic page
programmaticPages.forEach(pageFile => {
    const pagePath = path.join(__dirname, pageFile);
    
    if (!fs.existsSync(pagePath)) {
        console.log(`⚠️  File not found: ${pageFile}`);
        return;
    }
    
    let content = fs.readFileSync(pagePath, 'utf8');
    
    // Remove existing header HTML (everything from <!-- Header --> to before <!-- Hero Section -->)
    content = content.replace(/<!-- Header -->[\s\S]*?<!-- Hero Section -->/g, `${headerHTML}

    <!-- Hero Section -->`);
    
    // Remove existing header CSS and replace with homepage header CSS
    // First, remove all header-related CSS
    content = content.replace(/\.header\s*\{[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.nav-container\s*\{[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.logo\s*\{[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.logo\s+a\s*\{[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.logo\s+img\s*\{[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.nav-menu\s*\{[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.nav-item\s*\{[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.nav-item\s*>\s*a\s*\{[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.nav-item\s*>\s*a:hover\s*\{[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.dropdown\s*\{[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.nav-item:hover\s+\.dropdown\s*\{[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.dropdown\s+a\s*\{[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.dropdown\s+a:hover\s*\{[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\/\*\s*Hamburger Menu[^}]*\}(?:\s*\})?/g, '');
    content = content.replace(/\.hamburger-menu[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.hamburger-menu\s+span[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.hamburger-menu\.active[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\/\*\s*Mobile Menu Overlay[^}]*\}(?:\s*\})?/g, '');
    content = content.replace(/\.mobile-menu-overlay[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.mobile-menu-content[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.mobile-menu-header[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.mobile-logo[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.close-menu[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.mobile-nav[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.mobile-nav-link[\s\S]*?\n\s*\}/g, '');
    content = content.replace(/\.mobile-cta-button[\s\S]*?\n\s*\}/g, '');
    
    // Add the homepage header CSS right after the :root variables
    const rootEndIndex = content.indexOf('}', content.indexOf(':root'));
    if (rootEndIndex > -1) {
        content = content.slice(0, rootEndIndex + 1) + '\n\n        ' + headerCSS + '\n' + content.slice(rootEndIndex + 1);
    }
    
    // Update the mobile menu JavaScript
    // First, remove any existing mobile menu JS
    content = content.replace(/\/\/\s*Mobile Menu Toggle[\s\S]*?(?=\/\/\s*\w+|<\/script>)/g, '');
    
    // Add the new mobile menu JS before the closing script tag
    content = content.replace(/<\/script>/, mobileMenuJS + '\n        </script>');
    
    // Ensure hero section has proper margin
    content = content.replace(/\.hero\s*\{([^}]*)\}/g, (match, p1) => {
        // Remove any existing margin-top
        let styles = p1.replace(/margin-top:\s*[^;]+;/g, '');
        // Add the correct margin-top
        return `.hero {${styles}
            margin-top: 80px;
        }`;
    });
    
    // Write the updated content
    fs.writeFileSync(pagePath, content);
    console.log(`✅ Fixed header in ${pageFile}`);
});

console.log('\n✨ All programmatic pages have been updated with the homepage header!');