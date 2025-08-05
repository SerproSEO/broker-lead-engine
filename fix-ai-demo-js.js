const fs = require('fs');
const path = require('path');

// Read index.html to get the correct JavaScript
const indexContent = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Extract the script section from index.html
const scriptMatch = indexContent.match(/<script>([\s\S]*?)<\/script>/);
const correctScript = scriptMatch ? scriptMatch[1] : '';

// Read ai-demo.html
let aiDemoContent = fs.readFileSync(path.join(__dirname, 'ai-demo.html'), 'utf8');

// Replace the entire script section
aiDemoContent = aiDemoContent.replace(/<script>[\s\S]*?<\/script>/, '<script>' + correctScript + '</script>');

// Write back
fs.writeFileSync(path.join(__dirname, 'ai-demo.html'), aiDemoContent, 'utf8');

console.log('✅ Fixed JavaScript in ai-demo.html');