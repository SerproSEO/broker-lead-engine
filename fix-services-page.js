const fs = require('fs');
const path = require('path');

// Read the working index.html
const indexHtml = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8');

// Extract the exact header part (styles + header structure)
const headerEndIndex = indexHtml.indexOf('<section class="hero">');
const workingHeaderPart = indexHtml.substring(0, headerEndIndex).trim();

// Read the current services.html
const servicesPath = path.join(__dirname, 'services.html');
let servicesHtml;
try {
    servicesHtml = fs.readFileSync(servicesPath, 'utf8');
} catch (error) {
    console.log('services.html not found, skipping...');
    process.exit(0);
}

// Find where the hero/main content starts in services.html (after the header)
let contentStartIndex = servicesHtml.indexOf('<section class="hero">');
if (contentStartIndex === -1) {
    contentStartIndex = servicesHtml.indexOf('<main');
    if (contentStartIndex === -1) {
        contentStartIndex = servicesHtml.indexOf('<section');
    }
}

if (contentStartIndex === -1) {
    console.log('Could not find main content in services.html');
    process.exit(1);
}

const servicesContent = servicesHtml.substring(contentStartIndex);

// Update the title and meta description for services page
let updatedHeader = workingHeaderPart;
updatedHeader = updatedHeader.replace(
    '<title>Broker Lead Engine - AI Lead Generation for Insurance Agencies</title>',
    '<title>Our Services - Insurance Lead Generation & Marketing | Broker Lead Engine</title>'
);
updatedHeader = updatedHeader.replace(
    '<meta name="description" content="Advanced AI automation system designed for $1M-$5M insurance agencies. Generate 50+ qualified leads weekly with proven methodology.">',
    '<meta name="description" content="Comprehensive insurance marketing services including AI lead generation, local SEO, Google PPC, and automated lead nurturing for insurance agencies.">'
);

// Combine the working header with services content
const fixedServicesHtml = updatedHeader + '\n\n    ' + servicesContent;

// Write the fixed content
fs.writeFileSync(servicesPath, fixedServicesHtml, 'utf8');

console.log('✅ Fixed services.html with working header from index.html');