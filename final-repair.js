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

function repairFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let changesMade = false;
        
        console.log(`\nProcessing ${path.basename(filePath)}:`);
        
        // 1. Fix missing closing braces in @keyframes
        content = content.replace(/@keyframes spin\s*{\s*to\s*{\s*transform:\s*rotate\(360deg\);\s*}/g, 
            '@keyframes spin {\n            to { transform: rotate(360deg); }\n        }');
        
        content = content.replace(/@keyframes pulse\s*{\s*0%\s*{\s*transform:\s*scale\(1\);\s*}\s*50%\s*{\s*transform:\s*scale\(1\.05\);\s*}\s*100%\s*{\s*transform:\s*scale\(1\);\s*}/g,
            '@keyframes pulse {\n            0% { transform: scale(1); }\n            50% { transform: scale(1.05); }\n            100% { transform: scale(1); }\n        }');
        
        content = content.replace(/@keyframes fadeInUp\s*{\s*from\s*{\s*opacity:\s*0;\s*transform:\s*translateY\(30px\);\s*}\s*to\s*{\s*opacity:\s*1;\s*transform:\s*translateY\(0\);\s*}/g,
            '@keyframes fadeInUp {\n            from {\n                opacity: 0;\n                transform: translateY(30px);\n            }\n            to {\n                opacity: 1;\n                transform: translateY(0);\n            }\n        }');
        
        // 2. Fix missing closing braces in CSS rules
        content = content.replace(/object-fit:\s*contain;}\s*\n\s*\.nav-menu/g, 'object-fit: contain;\n        }\n\n        .nav-menu');
        
        // 3. Fix broken JavaScript syntax
        content = content.replace(/toggleMenu\(\);\s*}\)\);/g, 'toggleMenu();\n            }\n        });');
        content = content.replace(/toggleMenu\(\);\s*}\)\);/g, 'toggleMenu();\n                }\n            });\n        });');
        
        // 4. Fix misplaced CSS that's outside style blocks
        content = content.replace(/}\s*}\s*<\/style>/g, '}\n    </style>');
        
        // 5. Fix duplicate "Mobile Styles" comments
        content = content.replace(/\/\*\s*Mobile\s*Styles\s*\*\/\s*\n\s*\/\*\s*Mobile\s*Styles\s*\*\//g, '/* Mobile Styles */');
        
        // 6. Fix CSS that's appearing after </style>
        content = content.replace(/<\/style>\s*\/\*\s*Loading\s*Overlay\s*\*\//g, '</style>');
        
        // 7. Ensure proper CSS structure around .hero-highlight
        content = content.replace(/}\s*\n\s*\.hero-highlight\s*{/g, '}\n\n        .hero-highlight {');
        
        // 8. Fix any broken @media queries
        content = content.replace(/}\s*\/\*\s*Loading\s*Overlay\s*\*\//g, '}\n\n        /* Loading Overlay */');
        
        // 9. Add missing closing braces where needed
        content = content.replace(/animation:\s*fadeInUp\s*0\.8s\s*ease-out;\s*}\)\);/g, 'animation: \'fadeInUp 0.8s ease-out\';\n                }\n            });\n        }, observerOptions);');
        
        // 10. Ensure all JavaScript event listeners are properly closed
        content = content.replace(/}\)\);\s*}\s*observerOptions\);/g, '});\n        }, observerOptions);');
        
        if (changesMade || content !== fs.readFileSync(filePath, 'utf8')) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Repaired ${path.basename(filePath)}`);
        } else {
            console.log(`⏭️  No repairs needed for ${path.basename(filePath)}`);
        }
        
    } catch (error) {
        console.error(`❌ Error processing ${filePath}:`, error.message);
    }
}

console.log('🔧 Starting final repair of broken CSS and JavaScript...\n');

// Process each HTML file
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        repairFile(filePath);
    } else {
        console.log(`⚠️  File not found: ${file}`);
    }
});

console.log('\n✨ Final repair complete!');
console.log('\n📋 What was repaired:');
console.log('   ✓ Fixed missing closing braces in @keyframes');
console.log('   ✓ Fixed broken CSS rules (object-fit, etc.)');
console.log('   ✓ Fixed broken JavaScript event listeners');
console.log('   ✓ Fixed misplaced CSS outside style blocks');
console.log('   ✓ Fixed duplicate comments');
console.log('   ✓ Ensured proper CSS structure');
console.log('\n🎯 All pages should now have proper CSS and JavaScript!');