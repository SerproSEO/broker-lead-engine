const fs = require('fs');
const path = require('path');

// Function to update content in a file
function updateFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf8');
        let originalContent = content;
        
        // Track if this is a footer section
        let isFooter = false;
        
        // Split content into lines for footer detection
        const lines = content.split('\n');
        const updatedLines = lines.map(line => {
            // Check if we're in a footer section
            if (line.includes('<footer') || line.includes('class="footer') || line.includes('id="footer')) {
                isFooter = true;
            }
            
            let updatedLine = line;
            
            // Handle the legal disclaimer line specifically
            if (line.includes('Legal Disclaimer') && line.includes('Serpro SEO LLC')) {
                // Remove the entire legal disclaimer about DBA
                updatedLine = line.replace(/Legal Disclaimer:.*?Serpro SEO LLC\./gi, '');
            } else if (isFooter && (line.includes('© 20') || line.includes('Copyright') || line.includes('All rights reserved'))) {
                // In footer copyright lines, use LLC
                updatedLine = line.replace(/Serpro SEO LLC DBA Broker Lead Engine/gi, 'Broker Lead Engine LLC');
                updatedLine = updatedLine.replace(/Serpro SEO LLC/gi, 'Broker Lead Engine LLC');
                updatedLine = updatedLine.replace(/SerproSEO LLC/gi, 'Broker Lead Engine LLC');
                updatedLine = updatedLine.replace(/Serpro SEO(?! LLC)/gi, 'Broker Lead Engine LLC');
                updatedLine = updatedLine.replace(/SerproSEO(?! LLC)/gi, 'Broker Lead Engine LLC');
            } else {
                // Everywhere else, no LLC
                updatedLine = line.replace(/Serpro SEO LLC DBA Broker Lead Engine/gi, 'Broker Lead Engine');
                updatedLine = updatedLine.replace(/Serpro SEO LLC/gi, 'Broker Lead Engine');
                updatedLine = updatedLine.replace(/SerproSEO LLC/gi, 'Broker Lead Engine');
                updatedLine = updatedLine.replace(/Serpro SEO/gi, 'Broker Lead Engine');
                updatedLine = updatedLine.replace(/SerproSEO/gi, 'Broker Lead Engine');
                updatedLine = updatedLine.replace(/SERPRO SEO/g, 'BROKER LEAD ENGINE');
            }
            
            // Remove any DBA references
            updatedLine = updatedLine.replace(/DBA Broker Lead Engine/gi, '');
            updatedLine = updatedLine.replace(/\(DBA.*?\)/gi, '');
            updatedLine = updatedLine.replace(/d\/b\/a Broker Lead Engine/gi, '');
            
            // Reset footer flag if we've left the footer
            if (line.includes('</footer>')) {
                isFooter = false;
            }
            
            return updatedLine;
        });
        
        content = updatedLines.join('\n');
        
        // Update email addresses
        content = content.replace(/sam@serproseo\.com/gi, 'contact@brokerleadengine.com');
        content = content.replace(/info@serproseo\.com/gi, 'info@brokerleadengine.com');
        content = content.replace(/support@serproseo\.com/gi, 'support@brokerleadengine.com');
        
        // Update website references
        content = content.replace(/serproseo\.com/gi, 'brokerleadengine.com');
        content = content.replace(/www\.serproseo\.com/gi, 'www.brokerleadengine.com');
        
        // Update social media handles
        content = content.replace(/@serproseo/gi, '@brokerleadengine');
        
        // Update meta tags and titles
        content = content.replace(/<title>([^<]*?)Serpro SEO([^<]*?)<\/title>/gi, '<title>$1Broker Lead Engine$2</title>');
        content = content.replace(/<title>([^<]*?)SerproSEO([^<]*?)<\/title>/gi, '<title>$1Broker Lead Engine$2</title>');
        
        // Update alt text for images
        content = content.replace(/alt="([^"]*?)Serpro SEO([^"]*?)"/gi, 'alt="$1Broker Lead Engine$2"');
        content = content.replace(/alt="([^"]*?)SerproSEO([^"]*?)"/gi, 'alt="$1Broker Lead Engine$2"');
        
        // Clean up any double spaces that might have been created
        content = content.replace(/  +/g, ' ');
        
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`✅ Updated: ${path.basename(filePath)}`);
            return true;
        } else {
            console.log(`⏭️  No changes needed: ${path.basename(filePath)}`);
            return false;
        }
    } catch (error) {
        console.error(`❌ Error updating ${filePath}:`, error.message);
        return false;
    }
}

// Files to update
const htmlFiles = [
    'index.html',
    'about.html',
    'services.html',
    'pricing.html',
    'contact.html',
    'success-stories.html',
    'guarantee.html',
    'faq.html',
    'ai-demo.html',
    'ai-lead-generation.html',
    'local-seo.html',
    'google-ppc.html',
    'meta-ads.html',
    'cold-email.html',
    'case-study-stucco-dominance.html',
    'cold-email-playbook-v1.html',
    'cold-email-playbook-v2.html',
    'cold-email-playbook-v3.html',
    'franchise-prototype-system.html',
    'citations.html',
    'cyber-insurance-cost-guide.html',
    'cyber-insurance-sales-guide-brokers.html',
    'free-audit-landing-page.html',
    'seo-content-template.html',
    'privacy-policy.html',
    'terms-of-service.html'
];

// Blog files
const blogFiles = [
    'blog/commercial-insurance-b2b-lead-system.html',
    'blog/seo-content-template.html',
    'blog/blog-template.html'
];

// Update all files
console.log('🔄 Starting brand update from Serpro SEO to Broker Lead Engine...\n');

let updatedCount = 0;
let totalFiles = 0;

// Update main HTML files
htmlFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        totalFiles++;
        if (updateFile(filePath)) {
            updatedCount++;
        }
    } else {
        console.log(`⚠️  File not found: ${file}`);
    }
});

// Update blog files
blogFiles.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        totalFiles++;
        if (updateFile(filePath)) {
            updatedCount++;
        }
    } else {
        console.log(`⚠️  File not found: ${file}`);
    }
});

console.log(`\n✨ Brand update complete!`);
console.log(`📊 Updated ${updatedCount} out of ${totalFiles} files checked.`);
console.log(`\n🎯 Next steps:`);
console.log(`   1. Update logo files in /images folder`);
console.log(`   2. Update favicon.ico`);
console.log(`   3. Register brokerleadengine.com domain`);
console.log(`   4. Update Google Workspace email`);