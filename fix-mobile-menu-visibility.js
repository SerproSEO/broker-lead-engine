const fs = require('fs');

console.log('🔧 Fixing mobile menu visibility issue...\n');

// Get all HTML files
const htmlFiles = fs.readdirSync('./').filter(file => file.endsWith('.html'));

let fixedCount = 0;

htmlFiles.forEach(file => {
    try {
        console.log(`📄 Processing ${file}...`);
        let content = fs.readFileSync(file, 'utf8');
        
        // Fix mobile menu overlay CSS to ensure it's properly hidden
        const mobileMenuOverlayRegex = /\.mobile-menu-overlay \{[\s\S]*?transform: translateX\(-100%\);[\s\S]*?transition: transform 0\.3s ease-in-out;[\s\S]*?\}/g;
        
        const fixedMobileMenuCSS = `.mobile-menu-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: rgba(26, 32, 44, 0.95);
            backdrop-filter: blur(10px);
            z-index: 1000;
            transform: translateX(-100%);
            transition: transform 0.3s ease-in-out;
            opacity: 0;
            visibility: hidden;
        }`;
        
        if (content.match(mobileMenuOverlayRegex)) {
            content = content.replace(mobileMenuOverlayRegex, fixedMobileMenuCSS);
            console.log(`   ✓ Fixed mobile menu overlay CSS`);
        }
        
        // Ensure the active state is also properly defined
        const activeStateRegex = /\.mobile-menu-overlay\.active \{[\s\S]*?\}/g;
        const fixedActiveState = `.mobile-menu-overlay.active {
            transform: translateX(0);
            opacity: 1;
            visibility: visible;
        }`;
        
        if (content.match(activeStateRegex)) {
            content = content.replace(activeStateRegex, fixedActiveState);
            console.log(`   ✓ Fixed mobile menu active state`);
        }
        
        // Add desktop-only rule to ensure mobile menu is never visible on desktop
        if (content.includes('@media (min-width: 769px)')) {
            // Desktop media query already exists, add rule to it
            const mobileHideRule = `
        @media (min-width: 769px) {
            .mobile-menu-overlay {
                display: none !important;
            }
        }`;
            
            if (!content.includes('.mobile-menu-overlay {\n                display: none !important;')) {
                content = content.replace('@media (min-width: 769px) {', `@media (min-width: 769px) {
            .mobile-menu-overlay {
                display: none !important;
            }`);
                console.log(`   ✓ Added desktop hide rule to existing media query`);
            }
        } else {
            // Add new desktop media query
            const desktopHideRule = `
        /* Desktop - Hide Mobile Menu */
        @media (min-width: 769px) {
            .mobile-menu-overlay {
                display: none !important;
            }
        }`;
            
            // Insert before the closing </style> tag
            if (content.includes('</style>') && !content.includes('display: none !important;')) {
                content = content.replace('</style>', `${desktopHideRule}
    </style>`);
                console.log(`   ✓ Added desktop hide rule`);
            }
        }
        
        fs.writeFileSync(file, content);
        fixedCount++;
        console.log(`   ✅ Successfully fixed ${file}`);
        
    } catch (error) {
        console.error(`   ❌ Error processing ${file}:`, error.message);
    }
});

console.log(`\n📊 Mobile menu visibility fix complete!`);
console.log(`✅ Fixed: ${fixedCount} files`);
console.log(`🔒 Mobile menu now properly hidden on desktop`);