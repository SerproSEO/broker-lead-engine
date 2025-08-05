#!/usr/bin/env node

/**
 * Quick Mobile Navigation Validation
 */

const fs = require('fs');

const FILES_TO_CHECK = [
    'services.html',
    'pricing.html', 
    'about.html',
    'guarantee.html',
    'ai-demo.html'
];

const REQUIRED_MOBILE_NAV_ITEMS = [
    'Success Stories',
    'Contact'
];

console.log('🔍 Validating Mobile Navigation Fixes...\n');

let allFixed = true;

FILES_TO_CHECK.forEach(file => {
    if (fs.existsSync(file)) {
        const content = fs.readFileSync(file, 'utf8');
        
        console.log(`📱 ${file}:`);
        
        REQUIRED_MOBILE_NAV_ITEMS.forEach(item => {
            const hasItem = content.includes(`mobile-nav-link">${item}`) || 
                           (item === 'Success Stories' && content.includes('case-study-stucco-dominance.html" class="mobile-nav-link">Success Stories'));
            
            if (hasItem) {
                console.log(`  ✅ ${item}`);
            } else {
                console.log(`  ❌ Missing: ${item}`);
                allFixed = false;
            }
        });
        
        console.log('');
    } else {
        console.log(`⚠️  ${file} not found`);
    }
});

if (allFixed) {
    console.log('🎉 All mobile navigation menus are now fixed!');
    console.log('📱 Every page now has Success Stories and Contact in mobile nav');
} else {
    console.log('❌ Some mobile navigation issues remain');
}

console.log('\n🚀 Ready for deployment and testing!');