#!/usr/bin/env node

/**
 * Quick Navigation Test - Check specific pages
 */

const { chromium } = require('playwright');

async function testNavigation() {
    console.log('🔍 Quick Navigation Test - Checking Fixed Pages...\n');
    
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    const pagesToTest = [
        { name: 'Case Study', url: 'https://seal-app-he5wy.ondigitalocean.app/case-study-stucco-dominance.html' },
        { name: 'Index', url: 'https://seal-app-he5wy.ondigitalocean.app/' },
        { name: 'Services', url: 'https://seal-app-he5wy.ondigitalocean.app/services.html' }
    ];
    
    for (const pageInfo of pagesToTest) {
        try {
            console.log(`📄 Testing ${pageInfo.name}...`);
            
            await page.goto(pageInfo.url, { waitUntil: 'networkidle', timeout: 10000 });
            await page.waitForTimeout(2000);
            
            // Check desktop navigation items
            const navItems = await page.locator('.nav-menu a, nav a, .nav-item a').allTextContents();
            const cleanItems = navItems.filter(item => item.trim() !== '');
            
            console.log(`  Desktop Nav Items (${cleanItems.length}): [${cleanItems.slice(0,8).join(', ')}...]`);
            
            // Check for key items
            const hasServices = cleanItems.some(item => item.toLowerCase().includes('services'));
            const hasDemo = cleanItems.some(item => item.toLowerCase().includes('demo'));
            const hasPricing = cleanItems.some(item => item.toLowerCase().includes('pricing'));
            const hasSuccess = cleanItems.some(item => item.toLowerCase().includes('success') || item.toLowerCase().includes('stories'));
            const hasAbout = cleanItems.some(item => item.toLowerCase().includes('about'));
            const hasContact = cleanItems.some(item => item.toLowerCase().includes('contact'));
            
            const score = [hasServices, hasDemo, hasPricing, hasSuccess, hasAbout, hasContact].filter(Boolean).length;
            
            if (score >= 5) {
                console.log(`  ✅ Navigation looks good (${score}/6 key items found)`);
            } else {
                console.log(`  ❌ Navigation incomplete (${score}/6 key items found)`);
                console.log(`    Missing: ${[
                    !hasServices ? 'Services' : null,
                    !hasDemo ? 'AI Demo' : null,
                    !hasPricing ? 'Pricing' : null, 
                    !hasSuccess ? 'Success Stories' : null,
                    !hasAbout ? 'About' : null,
                    !hasContact ? 'Contact' : null
                ].filter(Boolean).join(', ')}`);
            }
            
        } catch (error) {
            console.log(`  🚨 Error: ${error.message}`);
        }
        
        console.log('');
    }
    
    await browser.close();
    console.log('🎉 Quick test completed!');
}

testNavigation().catch(console.error);