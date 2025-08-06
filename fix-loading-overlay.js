const fs = require('fs');
const path = require('path');

// List of HTML files to fix
const htmlFiles = [
    'faq.html',
    'guarantee.html', 
    'success-stories.html',
    'case-study-stucco-dominance.html',
    'privacy-policy.html',
    'terms-of-service.html',
    'ai-lead-generation.html'
];

// Fixed JavaScript for loading overlay
const fixedLoadingJS = `
            // Remove loading overlay
            const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                setTimeout(() => {
                    loadingOverlay.classList.add('loaded');
                }, 100);
            }`;

// Function to fix each file
function fixLoadingOverlay(filename) {
    const filePath = path.join(__dirname, filename);
    
    if (!fs.existsSync(filePath)) {
        console.log(`File ${filename} does not exist, skipping...`);
        return;
    }
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Find and replace various broken patterns
    const patterns = [
        // Pattern 1: window.addEventListener without proper loading overlay handling
        {
            search: /window\.addEventListener\('load',\s*\(\)\s*=>\s*\{\s*document\.getElementById\('loadingOverlay'\)\.classList\.add\('loaded'\);\s*\}\);/g,
            replace: `document.addEventListener('DOMContentLoaded', function() {${fixedLoadingJS}`
        },
        // Pattern 2: Missing DOMContentLoaded wrapper
        {
            search: /\/\/ Remove loading overlay\s*document\.getElementById\('loadingOverlay'\)\.classList\.add\('loaded'\);/g,
            replace: `// Remove loading overlay${fixedLoadingJS}`
        },
        // Pattern 3: Standalone getElementById without timeout
        {
            search: /document\.getElementById\('loadingOverlay'\)\.classList\.add\('loaded'\);/g,
            replace: `const loadingOverlay = document.getElementById('loadingOverlay');
            if (loadingOverlay) {
                setTimeout(() => {
                    loadingOverlay.classList.add('loaded');
                }, 100);
            }`
        }
    ];
    
    let modified = false;
    patterns.forEach(pattern => {
        if (pattern.search.test(content)) {
            content = content.replace(pattern.search, pattern.replace);
            modified = true;
        }
    });
    
    // If no DOMContentLoaded wrapper exists, add it
    if (!content.includes('DOMContentLoaded') && content.includes('loadingOverlay')) {
        // Find the script tag and wrap content
        content = content.replace(
            /<script>\s*([\s\S]*?)\s*<\/script>/g,
            (match, scriptContent) => {
                if (scriptContent.includes('loadingOverlay')) {
                    return `<script>
        document.addEventListener('DOMContentLoaded', function() {${fixedLoadingJS}
        });
    </script>`;
                }
                return match;
            }
        );
        modified = true;
    }
    
    if (modified) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`✅ Fixed loading overlay in ${filename}`);
    } else {
        console.log(`ℹ️  No changes needed for ${filename}`);
    }
}

// Fix all files
console.log('🔄 Fixing loading overlay across all pages...\n');
htmlFiles.forEach(fixLoadingOverlay);
console.log('\n✅ Loading overlay fix complete!');