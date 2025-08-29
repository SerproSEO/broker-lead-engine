const fs = require('fs');
const path = require('path');

// Function to remove citation-related CSS
function removeCitationCSS(content) {
    // Remove citation CSS rules
    const patterns = [
        // Remove entire CSS blocks for citation classes
        /\.citation-number\s*{[^}]*}/g,
        /\.stat-with-citation\s*{[^}]*}/g,
        /\.stat-with-citation\s+\.source\s*{[^}]*}/g,
        /\.stat-with-citation:hover\s+\.source\s*{[^}]*}/g,
        /\.citation-item\s*{[^}]*}/g,
        // Remove any leftover citation references
        /\/\*[^*]*Citation[^*]*\*\//gi
    ];
    
    patterns.forEach(pattern => {
        content = content.replace(pattern, '');
    });
    
    // Clean up multiple empty lines
    content = content.replace(/\n\s*\n\s*\n/g, '\n\n');
    
    return content;
}

// List of HTML files that might have citation CSS
const files = [
    'cyber-insurance-sales-guide-brokers.html',
    'cyber-insurance-cost-guide.html',
    'seo-content-template.html'
];

// Process each file
files.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove citation CSS
        content = removeCitationCSS(content);
        
        // Write the updated content back
        fs.writeFileSync(filePath, content);
        console.log(`✓ Cleaned CSS in: ${file}`);
    } else {
        console.log(`✗ File not found: ${file}`);
    }
});

console.log('\nCSS cleanup complete!');