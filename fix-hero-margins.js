#!/usr/bin/env node

/**
 * Fix Hero Section Margins - Batch Update Script
 * Fixes the white bar issue by setting consistent margin-top values
 */

const fs = require('fs');
const path = require('path');

// Pages that need hero margin fixes (excluding index.html, dist/, and Alphatype 1/)
const PAGES_TO_FIX = [
    'meta-ads.html',
    'services.html', 
    'pricing.html',
    'guarantee.html',
    'contact.html',
    'faq.html',
    'privacy-policy.html',
    'terms-of-service.html',
    'success-stories.html'
];

function fixHeroMargin(filename) {
    if (!fs.existsSync(filename)) {
        console.log(`⚠️  ${filename} not found, skipping...`);
        return false;
    }

    console.log(`🔄 Fixing ${filename}...`);
    
    try {
        let content = fs.readFileSync(filename, 'utf8');
        
        // Pattern 1: Fix margin-top: 80px to 124px and add missing properties
        const pattern1 = /(\s+\.hero\s*\{[^}]*?)margin-top:\s*80px;([^}]*?\})/g;
        let updated = false;
        
        content = content.replace(pattern1, (match, before, after) => {
            updated = true;
            let newAfter = after;
            
            // Add position and overflow if not present
            if (!newAfter.includes('position:')) {
                newAfter = newAfter.replace('}', '            position: relative;\n        }');
            }
            if (!newAfter.includes('overflow:')) {
                newAfter = newAfter.replace('}', '            overflow: hidden;\n        }');
            }
            
            return before + 'margin-top: 124px;' + newAfter;
        });
        
        // Pattern 2: Add margin-top: 124px where missing (for hero sections without any margin-top)
        const pattern2 = /(\s+\.hero\s*\{[^}]*?text-align:\s*center;)([^}]*?\})/g;
        content = content.replace(pattern2, (match, before, after) => {
            if (!match.includes('margin-top:')) {
                updated = true;
                let newAfter = after;
                
                // Add missing properties
                if (!newAfter.includes('margin-top:')) {
                    newAfter = newAfter.replace('}', '            margin-top: 124px;\n        }');
                }
                if (!newAfter.includes('position:')) {
                    newAfter = newAfter.replace('}', '            position: relative;\n        }');
                }
                if (!newAfter.includes('overflow:')) {
                    newAfter = newAfter.replace('}', '            overflow: hidden;\n        }');
                }
                
                return before + newAfter;
            }
            return match;
        });
        
        if (updated) {
            fs.writeFileSync(filename, content, 'utf8');
            console.log(`  ✅ Successfully fixed ${filename}`);
            return true;
        } else {
            console.log(`  ℹ️  No changes needed for ${filename}`);
            return true;
        }
        
    } catch (error) {
        console.log(`  ❌ Error fixing ${filename}: ${error.message}`);
        return false;
    }
}

function main() {
    console.log('🚀 Fixing hero section margins to eliminate white bar...\\n');
    
    let successCount = 0;
    let failCount = 0;
    
    for (const filename of PAGES_TO_FIX) {
        if (fixHeroMargin(filename)) {
            successCount++;
        } else {
            failCount++;
        }
    }
    
    console.log(`\\n📊 Summary:`);
    console.log(`✅ Successfully processed: ${successCount} pages`);
    console.log(`❌ Failed to process: ${failCount} pages`);
    console.log(`📁 Total pages processed: ${PAGES_TO_FIX.length}`);
    
    if (successCount > 0) {
        console.log(`\\n🎉 Hero margin fixes completed! White bar issue should be resolved.`);
        console.log(`🚀 Run "npm run build" to prepare for deployment.`);
    }
}

main();