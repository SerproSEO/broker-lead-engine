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

const essentialCSS = `        }

        /* Loading Overlay */
        .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: white;
            z-index: 9999;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: opacity 0.5s;
        }

        .loading-overlay.loaded {
            opacity: 0;
            pointer-events: none;
        }

        .loader {
            width: 50px;
            height: 50px;
            border: 3px solid var(--gray-200);
            border-top-color: var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        }

        /* Smooth Scroll */
        html {
            scroll-behavior: smooth;
        }

        /* Selection Color */
        ::selection {
            background: var(--primary);
            color: white;
        }`;

function fixLoadingIssue(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        
        console.log(`\nProcessing ${path.basename(filePath)}:`);
        
        // Check if the mobile CSS is properly closed
        const mobileMediaRegex = /@media\s*\(max-width:\s*768px\)\s*{[\s\S]*?services-grid[\s\S]*?1fr[\s\S]*?}\s*<\/style>/;
        
        if (mobileMediaRegex.test(content)) {
            // The CSS is ending too early - we need to add the missing essential CSS
            content = content.replace(
                /}\s*<\/style>/,
                essentialCSS + '\n    </style>'
            );
            console.log('  ✓ Added missing essential CSS (loading overlay, etc.)');
        }
        
        // Also check for incomplete mobile media queries
        const incompleteMobileRegex = /}\s*}\s*<\/style>/;
        if (incompleteMobileRegex.test(content)) {
            content = content.replace(
                /}\s*}\s*<\/style>/,
                essentialCSS + '\n    </style>'
            );
            console.log('  ✓ Fixed incomplete mobile CSS and added essential styles');
        }
        
        // Make sure the @keyframes for spin exists
        if (!content.includes('@keyframes spin')) {
            const spinKeyframes = `
        @keyframes spin {
            to { transform: rotate(360deg); }
        }`;
            content = content.replace('/* Smooth Scroll */', spinKeyframes + '\n\n        /* Smooth Scroll */');
            console.log('  ✓ Added missing spin animation');
        }
        
        // Ensure the JavaScript for removing loading overlay is present and correct
        if (!content.includes("getElementById('loadingOverlay')")) {
            const loadingJS = `
        // Remove loading overlay
        window.addEventListener('load', () => {
            document.getElementById('loadingOverlay').classList.add('loaded');
        });`;
            
            content = content.replace('<script>', '<script>' + loadingJS);
            console.log('  ✓ Added loading overlay removal JavaScript');
        }
        
        // Write the fixed content
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed loading issue for ${path.basename(filePath)}`);
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

console.log('🔧 Fixing loading spinner issues...\n');

// Process each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        fixLoadingIssue(filePath);
    } else {
        console.log(`⚠️  File not found: ${file}`);
    }
});

console.log('\n✨ Loading issue fixes complete!');
console.log('\n📋 What was fixed:');
console.log('   ✓ Added missing loading overlay CSS');
console.log('   ✓ Fixed incomplete mobile CSS structures');
console.log('   ✓ Added spin animation keyframes');
console.log('   ✓ Ensured loading overlay JavaScript is present');
console.log('   ✓ Added smooth scroll and selection styles');
console.log('\n🔄 The site should now load properly without infinite spinning!');