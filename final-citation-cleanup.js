const fs = require('fs');
const path = require('path');

// Function to remove ALL remaining citation formats
function removeRemainingCitations(content, filename) {
    // Skip the citations.html file
    if (filename.includes('citations.html')) {
        return content;
    }
    
    // Remove citations in parentheses at end of sentences or spans
    content = content.replace(/\s*\(Ahrefs\)/g, '');
    content = content.replace(/\s*\(First Page Sage\)/g, '');
    content = content.replace(/\s*\(LinkedIn\)/g, '');
    content = content.replace(/\s*\(LinkedIn Research\)/g, '');
    content = content.replace(/\s*\(DMA 2024\)/g, '');
    content = content.replace(/\s*\(Content Marketing Institute\)/g, '');
    content = content.replace(/\s*\(Gartner\)/g, '');
    content = content.replace(/\s*\(HubSpot\)/g, '');
    content = content.replace(/\s*\(Industry Research\)/g, '');
    content = content.replace(/\s*\(WordStream\)/g, '');
    content = content.replace(/\s*\(DMA\)/g, '');
    
    // Clean up any double spaces or extra whitespace
    content = content.replace(/  +/g, ' ');
    
    return content;
}

// Get all HTML files
function getAllHtmlFiles() {
    const files = [];
    
    // Get root directory HTML files
    const rootFiles = fs.readdirSync(__dirname)
        .filter(file => file.endsWith('.html') && !file.includes('citations.html'));
    rootFiles.forEach(file => {
        files.push(path.join(__dirname, file));
    });
    
    // Get public directory HTML files if it exists
    const publicDir = path.join(__dirname, 'public');
    if (fs.existsSync(publicDir)) {
        const publicFiles = fs.readdirSync(publicDir)
            .filter(file => file.endsWith('.html') && !file.includes('citations.html'));
        publicFiles.forEach(file => {
            files.push(path.join(publicDir, file));
        });
    }
    
    // Get blog directory HTML files if it exists
    const blogDir = path.join(__dirname, 'blog');
    if (fs.existsSync(blogDir)) {
        const blogFiles = fs.readdirSync(blogDir)
            .filter(file => file.endsWith('.html'));
        blogFiles.forEach(file => {
            files.push(path.join(blogDir, file));
        });
    }
    
    return files;
}

// Process all files
const files = getAllHtmlFiles();
let processedCount = 0;
let modifiedCount = 0;

console.log(`Processing ${files.length} HTML files for final citation cleanup...\n`);

files.forEach(filePath => {
    const filename = path.basename(filePath);
    const originalContent = fs.readFileSync(filePath, 'utf8');
    const newContent = removeRemainingCitations(originalContent, filename);
    
    if (originalContent !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log(`✓ Cleaned: ${filename}`);
        modifiedCount++;
    }
    processedCount++;
});

console.log(`\n==============================`);
console.log(`Final cleanup complete!`);
console.log(`Files processed: ${processedCount}`);
console.log(`Files cleaned: ${modifiedCount}`);
console.log(`==============================`);