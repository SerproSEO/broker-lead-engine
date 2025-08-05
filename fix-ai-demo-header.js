const fs = require('fs');
const path = require('path');

// Read both files
const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');
const aiDemoContent = fs.readFileSync(path.join(__dirname, 'ai-demo.html'), 'utf8');

// Extract header section from index.html (from <!DOCTYPE to just before the hero section)
const indexHeaderMatch = indexContent.match(/(<!DOCTYPE[\s\S]*?<\/div>\s*<!-- Loading Overlay -->[\s\S]*?<\/div>\s*<\/div>)/);
const indexHeader = indexHeaderMatch ? indexHeaderMatch[1] : '';

// Find where ai-demo's actual content starts (at the hero section)
const aiDemoMainContent = aiDemoContent.match(/<section class="hero">[\s\S]*/);
const mainContent = aiDemoMainContent ? aiDemoMainContent[0] : '';

// Combine header from index with main content from ai-demo
const newContent = indexHeader + '\n    ' + mainContent;

// Write the fixed content
fs.writeFileSync(path.join(__dirname, 'ai-demo.html'), newContent, 'utf8');

console.log('✅ ai-demo.html header fixed!');