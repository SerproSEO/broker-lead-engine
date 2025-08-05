const fs = require('fs');
const path = require('path');

// List of pages to update (excluding index.html and ai-demo.html which are already done)
const pagesToUpdate = [
    { file: 'about.html', title: 'About Us - Insurance Marketing Experts | Broker Lead Engine', description: 'Learn about our team of insurance marketing experts and proven methodology for generating qualified leads for insurance agencies nationwide.' },
    { file: 'local-seo.html', title: 'Local SEO for Insurance Agencies | Broker Lead Engine', description: 'Dominate local search results with our specialized SEO services for insurance agencies. Rank #1 for insurance keywords in your area.' },
    { file: 'google-ppc.html', title: 'Google PPC Advertising for Insurance | Broker Lead Engine', description: 'Generate immediate insurance leads with our proven Google Ads campaigns. Professional PPC management for insurance agencies.' },
    { file: 'meta-ads.html', title: 'Facebook & Meta Ads for Insurance | Broker Lead Engine', description: 'Reach potential insurance clients on Facebook and Instagram with targeted advertising campaigns designed for insurance agencies.' },
    { file: 'cold-email.html', title: 'Cold Email Marketing for Insurance | Broker Lead Engine', description: 'Professional cold email campaigns that convert prospects into insurance clients. Automated outreach that gets results.' },
    { file: 'marketing-automation.html', title: 'Marketing Automation for Insurance | Broker Lead Engine', description: 'Streamline your insurance marketing with automated lead nurturing, email sequences, and client engagement systems.' },
    { file: 'pricing.html', title: 'Pricing - Insurance Marketing Services | Broker Lead Engine', description: 'Transparent pricing for our insurance marketing services. Choose the perfect package for your agency with our flexible plans.' },
    { file: 'contact.html', title: 'Contact Us - Start Generating Insurance Leads | Broker Lead Engine', description: 'Ready to start generating qualified insurance leads? Contact us today for a free consultation and see how we can grow your agency.' },
    { file: 'faq.html', title: 'FAQ - Insurance Marketing Questions | Broker Lead Engine', description: 'Get answers to common questions about our insurance marketing services, lead generation process, and agency partnerships.' },
    { file: 'guarantee.html', title: 'Our Guarantee - Risk-Free Insurance Marketing | Broker Lead Engine', description: '90-day money-back guarantee on all insurance marketing services. We guarantee results or refund your investment.' },
    { file: 'success-stories.html', title: 'Success Stories - Insurance Agency Results | Broker Lead Engine', description: 'Real results from real insurance agencies. See how our clients have grown their business with our proven marketing system.' },
    { file: 'case-study-stucco-dominance.html', title: 'Case Study - Insurance Agency Growth | Broker Lead Engine', description: 'Detailed case study showing how we helped an insurance agency dominate their local market and increase revenue by 300%.' },
    { file: 'privacy-policy.html', title: 'Privacy Policy | Broker Lead Engine', description: 'Our privacy policy and data protection practices for insurance agency partners and website visitors.' },
    { file: 'terms-of-service.html', title: 'Terms of Service | Broker Lead Engine', description: 'Terms of service for insurance marketing services and website usage.' }
];

// Read the working index.html
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Extract the exact header part (from start to just before hero section)
const headerEndIndex = indexHtml.indexOf('<section class="hero">');
const workingHeaderPart = indexHtml.substring(0, headerEndIndex).trim();

let updatedCount = 0;
let errorCount = 0;

pagesToUpdate.forEach(pageInfo => {
    const filePath = path.join(__dirname, pageInfo.file);
    
    try {
        // Check if file exists
        if (!fs.existsSync(filePath)) {
            console.log(`⚠️  ${pageInfo.file} does not exist, skipping...`);
            return;
        }

        // Read current file
        const currentHtml = fs.readFileSync(filePath, 'utf8');
        
        // Find where the main content starts (after header)
        let contentStartIndex = currentHtml.indexOf('<section class="hero">');
        if (contentStartIndex === -1) {
            contentStartIndex = currentHtml.indexOf('<main');
            if (contentStartIndex === -1) {
                contentStartIndex = currentHtml.indexOf('<section');
            }
        }

        if (contentStartIndex === -1) {
            console.log(`❌ Could not find main content in ${pageInfo.file}`);
            errorCount++;
            return;
        }

        const pageContent = currentHtml.substring(contentStartIndex);
        
        // Update the header with page-specific title and description
        let updatedHeader = workingHeaderPart;
        updatedHeader = updatedHeader.replace(
            '<title>Broker Lead Engine - AI Lead Generation for Insurance Agencies</title>',
            `<title>${pageInfo.title}</title>`
        );
        updatedHeader = updatedHeader.replace(
            '<meta name="description" content="Advanced AI automation system designed for $1M-$5M insurance agencies. Generate 50+ qualified leads weekly with proven methodology.">',
            `<meta name="description" content="${pageInfo.description}">`
        );

        // Combine header with page content
        const fixedHtml = updatedHeader + '\n\n    ' + pageContent;
        
        // Write the fixed content
        fs.writeFileSync(filePath, fixedHtml, 'utf8');
        
        console.log(`✅ Fixed ${pageInfo.file}`);
        updatedCount++;
        
    } catch (error) {
        console.log(`❌ Error processing ${pageInfo.file}: ${error.message}`);
        errorCount++;
    }
});

console.log(`\n📊 Summary:`);
console.log(`✅ Successfully updated: ${updatedCount} pages`);
console.log(`❌ Errors: ${errorCount} pages`);
console.log(`\n🎉 Header copy operation completed!`);