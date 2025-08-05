const fs = require('fs');
const path = require('path');

// Read index.html which we know works
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Extract everything from the start up to (but not including) the hero section
const headerEndIndex = indexHtml.indexOf('<section class="hero">');
const workingHeader = indexHtml.substring(0, headerEndIndex).trim();

// Read ai-demo.html
const aiDemoHtml = fs.readFileSync(path.join(__dirname, 'ai-demo.html'), 'utf8');

// Find where the hero section starts in ai-demo
const aiDemoHeroIndex = aiDemoHtml.indexOf('<section class="hero">');
const aiDemoContent = aiDemoHtml.substring(aiDemoHeroIndex);

// Combine
const fixedContent = workingHeader + '\n\n    ' + aiDemoContent;

// Write back
fs.writeFileSync(path.join(__dirname, 'ai-demo.html'), fixedContent, 'utf8');

console.log('✅ Copied working header from index.html to ai-demo.html');