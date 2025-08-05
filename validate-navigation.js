#!/usr/bin/env node

/**
 * Navigation Validation Script
 * 
 * This script validates that all HTML pages have consistent navigation menus
 */

const fs = require('fs');
const path = require('path');

// Standard navigation items that should be on every page
const STANDARD_NAV_ITEMS = [
    'services.html',
    'ai-demo.html', 
    'pricing.html',
    'case-study-stucco-dominance.html',
    'guarantee.html',
    'about.html',
    'contact.html'
];

// Files to check
const HTML_FILES = [
    'index.html',
    'services.html',
    'pricing.html', 
    'about.html',
    'guarantee.html',
    'ai-demo.html',
    'ai-lead-generation.html',
    'local-seo.html',
    'google-ppc.html',
    'meta-ads.html',
    'cold-email.html',
    'marketing-automation.html',
    'contact.html'
];

function validateNavigation() {
    console.log('🔍 Validating Navigation Consistency...\n');
    
    let allValid = true;
    const results = [];
    
    HTML_FILES.forEach(file => {
        if (fs.existsSync(file)) {
            const content = fs.readFileSync(file, 'utf8');
            const result = {
                file: file,
                hasStandardNav: true,
                missing: [],
                hasServicesDropdown: content.includes('dropdown')
            };
            
            // Check for each standard nav item
            STANDARD_NAV_ITEMS.forEach(navItem => {
                if (!content.includes(navItem)) {
                    result.hasStandardNav = false;
                    result.missing.push(navItem.replace('.html', ''));
                }
            });
            
            results.push(result);
            
            // Console output
            if (result.hasStandardNav) {
                console.log(`✅ ${file} - Complete navigation`);
            } else {
                console.log(`❌ ${file} - Missing: ${result.missing.join(', ')}`);
                allValid = false;
            }
        } else {
            console.log(`⚠️  ${file} - File not found`);
        }
    });
    
    console.log('\n📊 Summary:');
    console.log(`Total files checked: ${results.length}`);
    console.log(`Files with complete navigation: ${results.filter(r => r.hasStandardNav).length}`);
    console.log(`Files with missing items: ${results.filter(r => !r.hasStandardNav).length}`);
    
    if (allValid) {
        console.log('\n🎉 All navigation menus are consistent!');
    } else {
        console.log('\n⚠️  Some navigation menus need fixing');
    }
    
    return {
        allValid,
        results,
        totalFiles: results.length,
        validFiles: results.filter(r => r.hasStandardNav).length
    };
}

function generateNavigationReport() {
    console.log('\n📋 Navigation Structure Report:');
    console.log('==============================');
    
    const expectedStructure = [
        'Services (with dropdown)',
        '  ├── 🤖 AI Lead Generation',
        '  ├── 📍 Local SEO', 
        '  ├── 🎯 Google PPC',
        '  ├── 📱 Meta Ads',
        '  ├── 📧 Cold Email',
        '  └── ⚙️ Marketing Automation',
        'AI Demo',
        'Pricing',
        'Success Stories',
        'Guarantee', 
        'About',
        'Contact'
    ];
    
    expectedStructure.forEach(item => {
        console.log(item);
    });
    
    console.log('\n🎯 CTA Button: "Start Generating Leads" or "Get Free Audit"');
    console.log('📱 Mobile Menu: Hamburger menu with same items');
}

// Run validation
const validation = validateNavigation();
generateNavigationReport();

console.log('\n🚀 Run this script anytime with: node validate-navigation.js');

module.exports = { validateNavigation };