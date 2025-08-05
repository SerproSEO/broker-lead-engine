const fs = require('fs');
const path = require('path');

// Start fresh - read original ai-demo content (backup if exists)
let originalContent = '';
try {
    originalContent = fs.readFileSync(path.join(__dirname, 'ai-demo-backup.html'), 'utf8');
} catch (e) {
    // If no backup, read current and save as backup
    originalContent = fs.readFileSync(path.join(__dirname, 'ai-demo.html'), 'utf8');
    fs.writeFileSync(path.join(__dirname, 'ai-demo-backup.html'), originalContent, 'utf8');
}

// Extract just the main content (hero section onwards)
const mainContentMatch = originalContent.match(/<section class="hero">[\s\S]*<\/body>/);
const mainContent = mainContentMatch ? mainContentMatch[0].replace('</body>', '') : '';

// Read index.html
const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Extract everything up to the hero section from index.html
const headerMatch = indexContent.match(/^[\s\S]*?(?=<section class="hero">)/);
const headerSection = headerMatch ? headerMatch[0].trim() : '';

// Extract the closing script and body tags from index
const closingMatch = indexContent.match(/<\/script>\s*<\/body>\s*<\/html>\s*$/);
const closingTags = closingMatch ? closingMatch[0] : '</script>\n</body>\n</html>';

// Build new ai-demo.html
let newContent = headerSection + '\n\n    ' + mainContent + closingTags;

// Write the rebuilt file
fs.writeFileSync(path.join(__dirname, 'ai-demo.html'), newContent, 'utf8');

console.log('✅ ai-demo.html rebuilt with clean header from index.html');