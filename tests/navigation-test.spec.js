const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

// Website URL
const BASE_URL = 'https://seal-app-he5wy.ondigitalocean.app';

// Pages to test
const PAGES_TO_TEST = [
  { path: '/', name: 'Home' },
  { path: '/services.html', name: 'Services' },
  { path: '/pricing.html', name: 'Pricing' },
  { path: '/about.html', name: 'About' },
  { path: '/guarantee.html', name: 'Guarantee' },
  { path: '/ai-demo.html', name: 'AI Demo' },
  { path: '/ai-lead-generation.html', name: 'AI Lead Generation' },
  { path: '/contact.html', name: 'Contact' }
];

// Expected navigation items
const EXPECTED_NAV_ITEMS = [
  'Services',
  'AI Demo', 
  'Pricing',
  'Success Stories',
  'Guarantee',
  'About',
  'Contact'
];

// Create results directory
const RESULTS_DIR = path.join(__dirname, '..', 'test-results');
if (!fs.existsSync(RESULTS_DIR)) {
  fs.mkdirSync(RESULTS_DIR, { recursive: true });
}

test.describe('Navigation Testing Suite', () => {
  
  test('Complete Navigation Analysis', async ({ page }) => {
    console.log('🚀 Starting comprehensive navigation analysis...\n');
    
    const results = {
      timestamp: new Date().toISOString(),
      baseUrl: BASE_URL,
      pages: [],
      summary: {
        totalPages: PAGES_TO_TEST.length,
        pagesWithCompleteNav: 0,
        pagesWithIncompleteNav: 0,
        commonIssues: []
      }
    };

    // Test each page
    for (const pageInfo of PAGES_TO_TEST) {
      console.log(`📄 Testing ${pageInfo.name} (${pageInfo.path})...`);
      
      const pageResult = {
        name: pageInfo.name,
        path: pageInfo.path,
        url: BASE_URL + pageInfo.path,
        status: 'unknown',
        navigation: {
          desktop: { items: [], html: '', missing: [] },
          mobile: { items: [], html: '', missing: [] }
        },
        screenshots: {},
        errors: []
      };

      try {
        // Navigate to page
        const response = await page.goto(pageResult.url, { 
          waitUntil: 'networkidle',
          timeout: 10000 
        });
        
        pageResult.status = response.status();
        
        // Wait for page to load
        await page.waitForLoadState('domcontentloaded');
        await page.waitForTimeout(2000);

        // **DESKTOP NAVIGATION ANALYSIS**
        console.log(`  🖥️  Analyzing desktop navigation...`);
        
        // Take desktop screenshot
        await page.setViewportSize({ width: 1920, height: 1080 });
        const desktopScreenshot = path.join(RESULTS_DIR, `${pageInfo.name}-desktop.png`);
        await page.screenshot({ 
          path: desktopScreenshot,
          clip: { x: 0, y: 0, width: 1920, height: 200 } // Just the header
        });
        pageResult.screenshots.desktop = desktopScreenshot;

        // Extract desktop navigation HTML
        const desktopNavHtml = await page.locator('nav, .nav-menu, header nav, .navigation').first().innerHTML().catch(() => '');
        pageResult.navigation.desktop.html = desktopNavHtml;

        // Get desktop navigation items
        const desktopNavItems = await page.locator('.nav-menu a, nav a, .nav-item a').allTextContents().catch(() => []);
        pageResult.navigation.desktop.items = desktopNavItems.filter(item => item.trim() !== '');

        // Check for missing items (desktop)
        for (const expectedItem of EXPECTED_NAV_ITEMS) {
          const hasItem = desktopNavItems.some(item => 
            item.toLowerCase().includes(expectedItem.toLowerCase()) ||
            (expectedItem === 'Success Stories' && item.toLowerCase().includes('success'))
          );
          if (!hasItem) {
            pageResult.navigation.desktop.missing.push(expectedItem);
          }
        }

        // **MOBILE NAVIGATION ANALYSIS**
        console.log(`  📱 Analyzing mobile navigation...`);
        
        // Switch to mobile view
        await page.setViewportSize({ width: 375, height: 667 });
        await page.waitForTimeout(1000);

        // Take mobile screenshot
        const mobileScreenshot = path.join(RESULTS_DIR, `${pageInfo.name}-mobile.png`);
        await page.screenshot({ 
          path: mobileScreenshot,
          clip: { x: 0, y: 0, width: 375, height: 200 }
        });
        pageResult.screenshots.mobile = mobileScreenshot;

        // Try to open mobile menu if it exists
        const mobileMenuButton = page.locator('.hamburger-menu, .mobile-menu-button, .menu-toggle, [aria-label*="menu"], [aria-label*="Menu"]').first();
        const hasMobileMenu = await mobileMenuButton.isVisible().catch(() => false);
        
        if (hasMobileMenu) {
          await mobileMenuButton.click().catch(() => {});
          await page.waitForTimeout(500);
          
          // Take screenshot with menu open
          const mobileMenuScreenshot = path.join(RESULTS_DIR, `${pageInfo.name}-mobile-menu.png`);
          await page.screenshot({ path: mobileMenuScreenshot });
          pageResult.screenshots.mobileMenu = mobileMenuScreenshot;
        }

        // Extract mobile navigation items
        const mobileNavItems = await page.locator('.mobile-nav a, .mobile-menu a, .mobile-nav-link').allTextContents().catch(() => []);
        pageResult.navigation.mobile.items = mobileNavItems.filter(item => item.trim() !== '');

        // Check for missing items (mobile)
        for (const expectedItem of EXPECTED_NAV_ITEMS) {
          const hasItem = mobileNavItems.some(item => 
            item.toLowerCase().includes(expectedItem.toLowerCase()) ||
            (expectedItem === 'Success Stories' && item.toLowerCase().includes('success'))
          );
          if (!hasItem) {
            pageResult.navigation.mobile.missing.push(expectedItem);
          }
        }

        // Determine if navigation is complete
        const isComplete = pageResult.navigation.desktop.missing.length === 0 && 
                          pageResult.navigation.mobile.missing.length === 0;
        
        if (isComplete) {
          results.summary.pagesWithCompleteNav++;
          console.log(`  ✅ Complete navigation`);
        } else {
          results.summary.pagesWithIncompleteNav++;
          console.log(`  ❌ Missing items - Desktop: [${pageResult.navigation.desktop.missing.join(', ')}], Mobile: [${pageResult.navigation.mobile.missing.join(', ')}]`);
        }

      } catch (error) {
        pageResult.errors.push(error.message);
        console.log(`  🚨 Error: ${error.message}`);
      }

      results.pages.push(pageResult);
      console.log('');
    }

    // Generate comprehensive report
    const reportPath = path.join(RESULTS_DIR, 'navigation-analysis-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(results, null, 2));

    // Generate human-readable summary
    const summaryPath = path.join(RESULTS_DIR, 'navigation-summary.txt');
    let summary = `NAVIGATION ANALYSIS REPORT
Generated: ${results.timestamp}
Website: ${BASE_URL}

SUMMARY:
========
Total Pages Tested: ${results.summary.totalPages}
Pages with Complete Navigation: ${results.summary.pagesWithCompleteNav}
Pages with Incomplete Navigation: ${results.summary.pagesWithIncompleteNav}

DETAILED RESULTS:
================
`;

    results.pages.forEach(page => {
      summary += `
${page.name} (${page.path}):
  Status: ${page.status}
  Desktop Navigation Items: [${page.navigation.desktop.items.join(', ')}]
  Desktop Missing: [${page.navigation.desktop.missing.join(', ')}]
  Mobile Navigation Items: [${page.navigation.mobile.items.join(', ')}]
  Mobile Missing: [${page.navigation.mobile.missing.join(', ')}]
  Screenshots: Desktop: ${path.basename(page.screenshots.desktop || 'none')}, Mobile: ${path.basename(page.screenshots.mobile || 'none')}
`;
    });

    summary += `
RECOMMENDATIONS:
===============
`;

    // Find most common missing items
    const missingItems = {};
    results.pages.forEach(page => {
      [...page.navigation.desktop.missing, ...page.navigation.mobile.missing].forEach(item => {
        missingItems[item] = (missingItems[item] || 0) + 1;
      });
    });

    Object.entries(missingItems).forEach(([item, count]) => {
      summary += `- "${item}" is missing from ${count} page(s)\n`;
    });

    fs.writeFileSync(summaryPath, summary);

    console.log(`📊 Analysis complete!`);
    console.log(`📁 Results saved to: ${RESULTS_DIR}`);
    console.log(`📋 Summary: ${results.summary.pagesWithCompleteNav}/${results.summary.totalPages} pages have complete navigation`);
    console.log(`📸 Screenshots saved for all tested pages`);

    // Fail test if navigation is inconsistent
    expect(results.summary.pagesWithIncompleteNav).toBe(0);
  });
});