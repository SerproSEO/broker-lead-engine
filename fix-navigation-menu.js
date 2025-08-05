const fs = require('fs');
const path = require('path');

// List of HTML files to fix
const htmlFiles = [
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

const navMenuCSS = `
        .nav-menu {
            display: flex;
            list-style: none;
            gap: 0;
            align-items: center;
            margin: 0;
            padding: 0;
        }`;

function fixNavigationMenu(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        console.log(`\nFixing navigation menu for ${path.basename(filePath)}:`);
        
        // Check if nav-menu CSS is missing from the main CSS section
        if (content.includes('<ul class="nav-menu">') && !content.includes('.nav-menu {')) {
            // Find the spot after .logo img and add nav-menu CSS
            const logoImgRegex = /\.logo\s+img\s*{[^}]*object-fit:\s*contain;}\s*\n\s*\.nav-item/g;
            
            if (logoImgRegex.test(content)) {
                content = content.replace(
                    /\.logo\s+img\s*{[^}]*object-fit:\s*contain;}\s*\n\s*\.nav-item/g,
                    function(match) {
                        return match.replace(/}\s*\n\s*\.nav-item/, '}' + navMenuCSS + '\n\n        .nav-item');
                    }
                );
                console.log('  ✓ Added missing .nav-menu CSS');
            }
        }
        
        // Also fix the broken object-fit syntax if present
        content = content.replace(/object-fit:\s*contain;}\s*\n\s*\.nav-item/g, 'object-fit: contain;\n        }' + navMenuCSS + '\n\n        .nav-item');
        
        // Write the fixed content
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed navigation menu for ${path.basename(filePath)}`);
        
    } catch (error) {
        console.error(`❌ Error fixing ${filePath}:`, error.message);
    }
}

console.log('🔧 Fixing navigation menu CSS across all pages...\n');

// Process each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        fixNavigationMenu(filePath);
    } else {
        console.log(`⚠️  File not found: ${file}`);
    }
});

console.log('\n✨ Navigation menu fixes complete!');
console.log('\n📋 What was fixed:');
console.log('   ✓ Added missing .nav-menu CSS to all pages');
console.log('   ✓ Fixed broken object-fit syntax');
console.log('   ✓ Ensured proper navigation display');
console.log('\n🔄 Navigation menus should now work properly!');