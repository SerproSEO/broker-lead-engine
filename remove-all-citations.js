const fs = require('fs');
const path = require('path');

// Function to remove ALL citation formats
function removeAllCitations(content, filename) {
    // Skip the citations.html file
    if (filename.includes('citations.html')) {
        return content;
    }
    
    // Remove parenthetical citations like (HubSpot, 2024) or (Industry Research, 2024)
    content = content.replace(/\s*\([A-Z][^)]+,\s*20[0-9]{2}\)/g, '');
    
    // Remove specific common citation patterns
    content = content.replace(/\s*\(Industry Research\)/g, '');
    content = content.replace(/\s*\(Gartner\)/g, '');
    content = content.replace(/\s*\(MarketingSherpa\)/g, '');
    
    // Remove any remaining parenthetical years
    content = content.replace(/\s*\(20[0-9]{2}\)/g, '');
    
    // Clean up any double spaces left behind
    content = content.replace(/  +/g, ' ');
    
    // Clean up any period-space-period patterns
    content = content.replace(/\.\s*\./g, '.');
    
    return content;
}

// Get all HTML files in root and public directories
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

console.log(`Found ${files.length} HTML files to process...\n`);

files.forEach(filePath => {
    const filename = path.basename(filePath);
    const originalContent = fs.readFileSync(filePath, 'utf8');
    const newContent = removeAllCitations(originalContent, filename);
    
    if (originalContent !== newContent) {
        fs.writeFileSync(filePath, newContent);
        console.log(`✓ Removed citations from: ${filename}`);
        modifiedCount++;
    } else {
        console.log(`○ No citations found in: ${filename}`);
    }
    processedCount++;
});

console.log(`\n==============================`);
console.log(`Processing complete!`);
console.log(`Files processed: ${processedCount}`);
console.log(`Files modified: ${modifiedCount}`);
console.log(`==============================`);