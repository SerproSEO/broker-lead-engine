const fs = require('fs');
const path = require('path');

// Function to remove inline citations from content
function removeInlineCitations(content) {
    // Remove citation numbers like [1], [2], etc.
    content = content.replace(/<span class="citation-number">\[\d+\]<\/span>/g, '');
    
    // Remove inline source spans
    content = content.replace(/<span class="source">Source:[^<]*<\/span>/g, '');
    
    // Remove stat-with-citation class wrapper but keep the content
    content = content.replace(/<span class="stat-with-citation">([^<]*)<\/span>/g, '$1');
    
    // Remove standalone citation numbers in tables or text
    content = content.replace(/\[\d+\]/g, '');
    
    // Remove citation sections at the bottom of pages
    content = content.replace(/<h3>Sources & Citations<\/h3>[\s\S]*?<div class="citation-item">\[\d+\][^<]*<\/div>/g, '');
    content = content.replace(/<div class="citation-item">\[\d+\][^<]*<\/div>/g, '');
    
    return content;
}

// Function to ensure citations link is in footer
function ensureCitationsInFooter(content, filename) {
    // Check if there's already a citations link in the footer
    if (!content.includes('href="citations.html"')) {
        // Find the footer and add citations link if not present
        const footerPattern = /<footer[^>]*>([\s\S]*?)<\/footer>/;
        const footerMatch = content.match(footerPattern);
        
        if (footerMatch) {
            let footerContent = footerMatch[1];
            
            // Add citations link to the footer links section
            if (footerContent.includes('Terms of Service')) {
                footerContent = footerContent.replace(
                    /<a href="terms-of-service\.html"[^>]*>Terms of Service<\/a>/,
                    '<a href="terms-of-service.html" style="color: #16a571; text-decoration: none;">Terms of Service</a> | <a href="citations.html" style="color: #16a571; text-decoration: none;">Citations</a>'
                );
                content = content.replace(footerPattern, `<footer>${footerContent}</footer>`);
            }
        }
    }
    
    return content;
}

// List of files to process
const files = [
    'cyber-insurance-sales-guide-brokers.html',
    'cyber-insurance-cost-guide.html',
    'seo-content-template.html',
    'index.html',
    'services.html',
    'pricing.html',
    'about.html',
    'contact.html',
    'success-stories.html',
    'guarantee.html',
    'faq.html',
    'ai-demo.html',
    'ai-lead-generation.html',
    'local-seo.html',
    'google-ppc.html',
    'meta-ads.html',
    'cold-email.html'
];

// Process each file
files.forEach(file => {
    const filePath = path.join(__dirname, file);
    
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Remove inline citations
        content = removeInlineCitations(content);
        
        // Ensure citations link in footer
        content = ensureCitationsInFooter(content, file);
        
        // Write the updated content back
        fs.writeFileSync(filePath, content);
        console.log(`✓ Processed: ${file}`);
    } else {
        console.log(`✗ File not found: ${file}`);
    }
});

console.log('\nAll files processed successfully!');
console.log('- Removed all inline citations');
console.log('- Ensured citations link in all footers');