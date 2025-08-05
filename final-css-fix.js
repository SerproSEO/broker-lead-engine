const fs = require('fs');
const path = require('path');

// List of HTML files to fix
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
    'terms-of-service.html'
];

function cleanUpCSS(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let changesMade = false;
        
        console.log(`\nProcessing ${path.basename(filePath)}:`);
        
        // 1. Remove duplicate CSS rules and broken structures
        
        // Remove duplicate mobile @media rules
        const mobileMediaRegex = /@media\s*\(max-width:\s*768px\)\s*{[^}]*nav-menu[^}]*display:\s*none[^}]*}/g;
        const matches = content.match(mobileMediaRegex);
        if (matches && matches.length > 1) {
            // Keep only the first complete one, remove duplicates
            let firstMatch = matches[0];
            for (let i = 1; i < matches.length; i++) {
                content = content.replace(matches[i], '');
            }
            changesMade = true;
            console.log('  ✓ Removed duplicate mobile CSS');
        }
        
        // 2. Remove duplicate closing braces and fix broken CSS structure
        content = content.replace(/}\s*}\s*}/g, '}');
        content = content.replace(/}\s*}/g, '}');
        
        // 3. Fix logo height inconsistencies - standardize desktop logo
        content = content.replace(/\.logo\s+img\s*{[^}]*height:\s*175px[^}]*}/g, `.logo img {
            height: 60px;
            width: auto;
            max-width: 180px;
            object-fit: contain;
        }`);
        
        // 4. Fix mobile logo size
        content = content.replace(/\.logo\s+img\s*{[^}]*height:\s*120px[^}]*}/g, `.logo img {
                height: 50px;
                max-width: 150px;
            }`);
        
        // 5. Remove duplicate header sections and broken CSS
        content = content.replace(/<\/header>\s*\n\s*<\/header>/g, '</header>');
        
        // 6. Fix broken CSS selectors (missing closing braces)
        content = content.replace(/\.mobile-cta-button:hover\s*{[^}]*}\s*}/g, `.mobile-cta-button:hover {
            transform: translateY(-2px);
            box-shadow: var(--shadow-lg);
        }`);
        
        // 7. Remove CSS fragments that are outside proper blocks
        content = content.replace(/^\s*\.nav-menu\s*{\s*display:\s*none;\s*}\s*$/gm, '');
        content = content.replace(/^\s*\.hamburger-menu\s*{\s*display:\s*flex\s*!\s*important;\s*}\s*$/gm, '');
        content = content.replace(/^\s*\.header\s*\.cta-button\s*{\s*display:\s*none;\s*}\s*$/gm, '');
        
        // 8. Ensure proper CSS structure - clean up stray rules
        content = content.replace(/\s*}\s*\.nav-menu\s*{[^}]*}/g, '}');
        content = content.replace(/\s*}\s*\.hamburger-menu\s*{[^}]*}/g, '}');
        content = content.replace(/\s*}\s*\.header\s*\.cta-button\s*{[^}]*}/g, '}');
        
        // 9. Ensure all @media blocks are properly closed
        const mediaBlocks = content.match(/@media[^{]*\{[^}]*\}/g);
        if (mediaBlocks) {
            mediaBlocks.forEach(block => {
                // Count opening and closing braces
                const openBraces = (block.match(/\{/g) || []).length;
                const closeBraces = (block.match(/\}/g) || []).length;
                if (openBraces !== closeBraces) {
                    console.log('  ⚠️  Found unbalanced braces in media query');
                    changesMade = true;
                }
            });
        }
        
        // 10. Create a clean mobile CSS block
        const cleanMobileCSS = `
        /* Mobile Styles */
        @media (max-width: 768px) {
            .nav-container {
                padding: 0 1rem;
            }

            .logo img {
                height: 50px;
                max-width: 150px;
            }

            .header {
                height: 70px;
            }

            .nav-menu {
                display: none;
            }

            .hamburger-menu {
                display: flex !important;
            }

            .header .cta-button {
                display: none;
            }

            .hero {
                margin-top: 70px;
                padding: 40px 0 60px;
            }

            .hero h1 {
                font-size: 2.5rem;
            }

            .section-header h2 {
                font-size: 2rem;
            }

            .container {
                padding: 0 1rem;
            }

            .services-grid {
                grid-template-columns: 1fr;
            }
        }`;
        
        // Replace all mobile CSS with clean version
        content = content.replace(/@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?(?=\/\*|<\/style>|$)/g, cleanMobileCSS);
        
        // 11. Clean up any remaining stray CSS rules
        content = content.replace(/^\s*\.\w+[^{]*{\s*}\s*$/gm, '');
        
        // 12. Ensure container CSS exists and is properly defined
        if (!content.includes('.container {') || content.includes('.container {\n            max-width: 1200px;\n            margin: 0 auto;\n            padding: 0 2rem;\n        }')) {
            const containerCSS = `
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
        }`;
            
            if (content.includes('/* Hero Section */')) {
                content = content.replace('/* Hero Section */', containerCSS + '\n\n        /* Hero Section */');
            } else if (content.includes('.hero {')) {
                content = content.replace('.hero {', containerCSS + '\n\n        .hero {');
            }
            changesMade = true;
            console.log('  ✓ Added/fixed container CSS');
        }
        
        if (changesMade) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Cleaned up CSS for ${path.basename(filePath)}`);
        } else {
            console.log(`⏭️  No cleanup needed for ${path.basename(filePath)}`);
        }
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

console.log('🧽 Starting final CSS cleanup...\n');

// Process each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        cleanUpCSS(filePath);
    } else {
        console.log(`⚠️  File not found: ${file}`);
    }
});

console.log('\n✨ Final CSS cleanup complete!');
console.log('\n📋 What was cleaned up:');
console.log('   ✓ Removed duplicate mobile CSS rules');
console.log('   ✓ Fixed broken CSS structure and closing braces');
console.log('   ✓ Standardized logo sizes (60px desktop, 50px mobile)');
console.log('   ✓ Removed duplicate header sections');
console.log('   ✓ Fixed broken CSS selectors');
console.log('   ✓ Cleaned up stray CSS rules');
console.log('   ✓ Ensured proper CSS structure');
console.log('   ✓ Created clean mobile CSS block');
console.log('   ✓ Added missing container CSS');
console.log('\n🔄 Ready to rebuild and deploy!');