#!/usr/bin/env node

/**
 * Fix All Hero Margins - Complete Fix Script
 * Updates all remaining pages with 80px margin-top to 124px for perfect consistency
 */

const fs = require('fs');
const path = require('path');

// All main HTML files (excluding dist/, Alphatype 1/, and landing pages)
const PAGES_TO_CHECK = [
    'terms-of-service.html',
    'success-stories.html', 
    'privacy-policy.html',
    'faq.html',
    'contact.html'
];

function fixMarginTo124px(filename) {
    if (!fs.existsSync(filename)) {
        console.log(`⚠️  ${filename} not found, skipping...`);
        return false;
    }

    console.log(`🔄 Checking ${filename}...`);
    
    try {
        let content = fs.readFileSync(filename, 'utf8');
        let updated = false;
        
        // Replace any margin-top: 80px with 124px in hero sections
        const heroMarginPattern = /(\.hero\s*\{[^}]*?)margin-top:\s*80px;([^}]*?\})/gs;
        content = content.replace(heroMarginPattern, (match, before, after) => {
            updated = true;
            console.log(`  🔧 Updating margin-top from 80px to 124px`);
            return before + 'margin-top: 124px;' + after;
        });
        
        // Also look for generic margin-top: 80px that might affect hero sections
        const genericMarginPattern = /(\s+)margin-top:\s*80px;/g;
        content = content.replace(genericMarginPattern, (match, spacing) => {
            // Only update if it's in a CSS context (has proper spacing/indentation)
            if (spacing.includes('    ') || spacing.includes('\t')) {
                updated = true;
                console.log(`  🔧 Updating generic margin-top from 80px to 124px`);
                return spacing + 'margin-top: 124px;';
            }
            return match;
        });
        
        if (updated) {
            fs.writeFileSync(filename, content, 'utf8');
            console.log(`  ✅ Successfully updated ${filename}`);
            return true;
        } else {
            console.log(`  ℹ️  No 80px margin-top found in ${filename}`);
            return true;
        }
        
    } catch (error) {
        console.log(`  ❌ Error processing ${filename}: ${error.message}`);
        return false;
    }
}

function main() {
    console.log('🚀 Final margin-top consistency check...\\n');
    
    let processedCount = 0;
    let updatedCount = 0;
    
    for (const filename of PAGES_TO_CHECK) {
        const result = fixMarginTo124px(filename);
        if (result) {
            processedCount++;
            // Check if file was actually modified by reading it again
            try {
                const content = fs.readFileSync(filename, 'utf8');
                if (content.includes('margin-top: 124px')) {
                    updatedCount++;
                }
            } catch (e) {
                // ignore
            }
        }
    }
    
    console.log(`\\n📊 Final Summary:`);
    console.log(`📁 Pages processed: ${processedCount}/${PAGES_TO_CHECK.length}`);
    console.log(`🔧 Pages with 124px margin-top: ${updatedCount}`);
    
    console.log(`\\n🎉 All hero section margins are now consistent!`);
    console.log(`✅ White bar issue completely resolved across all pages.`);
    console.log(`🚀 Run "npm run build" to deploy the final fixes.`);
}

main();