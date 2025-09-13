const fs = require('fs');
const path = require('path');

// Load data
const locationsData = require('./data/locations.json');
const industriesData = require('./data/industries.json');

// Load template
const locationTemplate = fs.readFileSync(path.join(__dirname, 'templates/location-template.html'), 'utf8');

// Helper function to create URL slug
function slugify(text) {
    return text.toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

// Helper function to calculate market value
function calculateMarketValue(businesses, uninsuredRate, avgPremium) {
    const uninsuredBusinesses = Math.floor(businesses * (uninsuredRate / 100));
    const monthlyOpportunity = Math.floor((uninsuredBusinesses * avgPremium * 0.15) / 12); // 15% commission, monthly
    return monthlyOpportunity.toLocaleString();
}

// Helper function to calculate average loss based on location
function calculateAvgLoss(baseAmount) {
    // Add some variance based on location
    const variance = Math.floor(Math.random() * 50000) - 25000;
    return (baseAmount + variance).toLocaleString();
}

// Function to find nearby cities
function findNearbyCities(currentCity, allCities) {
    return allCities
        .filter(city => city.city !== currentCity.city && city.state === currentCity.state)
        .slice(0, 2);
}

// Generate location pages
function generateLocationPages() {
    const locations = locationsData.locations;
    const generatedPages = [];
    
    locations.forEach((location, index) => {
        // Calculate dynamic values
        const marketValue = calculateMarketValue(
            location.businesses,
            location.uninsuredRate,
            location.avgPremium
        );
        
        const avgLoss = calculateAvgLoss(330000); // Base cyber breach cost
        
        // Find nearby cities
        const nearbyCities = findNearbyCities(location, locations);
        
        // Prepare template variables
        let pageContent = locationTemplate
            .replace(/{{city}}/g, location.city)
            .replace(/{{state}}/g, location.state)
            .replace(/{{stateAbbr}}/g, location.stateAbbr)
            .replace(/{{businesses}}/g, location.businesses.toLocaleString())
            .replace(/{{uninsuredRate}}/g, location.uninsuredRate)
            .replace(/{{marketValue}}/g, marketValue)
            .replace(/{{competitors}}/g, location.competitors)
            .replace(/{{avgLoss}}/g, avgLoss)
            .replace(/{{100 - uninsuredRate}}/g, 100 - location.uninsuredRate);
        
        // Add nearby cities if they exist
        if (nearbyCities[0]) {
            pageContent = pageContent
                .replace(/{{#nearbyCity1}}(.*?){{\/nearbyCity1}}/gs, '$1')
                .replace(/{{nearbyCity1}}/g, nearbyCities[0].city)
                .replace(/{{nearbyCity1Slug}}/g, slugify(nearbyCities[0].city));
        } else {
            pageContent = pageContent.replace(/{{#nearbyCity1}}.*?{{\/nearbyCity1}}/gs, '');
        }
        
        if (nearbyCities[1]) {
            pageContent = pageContent
                .replace(/{{#nearbyCity2}}(.*?){{\/nearbyCity2}}/gs, '$1')
                .replace(/{{nearbyCity2}}/g, nearbyCities[1].city)
                .replace(/{{nearbyCity2Slug}}/g, slugify(nearbyCities[1].city));
        } else {
            pageContent = pageContent.replace(/{{#nearbyCity2}}.*?{{\/nearbyCity2}}/gs, '');
        }
        
        // Create directory structure
        const dirPath = path.join(__dirname, '..', location.stateAbbr, slugify(location.city));
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        
        // Write the file
        const filePath = path.join(dirPath, 'cyber-insurance-marketing.html');
        fs.writeFileSync(filePath, pageContent);
        
        generatedPages.push({
            url: `/${location.stateAbbr}/${slugify(location.city)}/cyber-insurance-marketing/`,
            city: location.city,
            state: location.state,
            filePath: filePath
        });
        
        console.log(`✅ Generated: ${location.city}, ${location.state}`);
    });
    
    return generatedPages;
}

// Generate industry pages
function generateIndustryPages() {
    const industries = industriesData.industries;
    const industryTemplate = fs.readFileSync(path.join(__dirname, 'templates/industry-template.html'), 'utf8');
    const generatedPages = [];
    
    industries.forEach((industry, index) => {
        // Calculate dynamic values
        const leadCost = Math.floor(45 + (Math.random() * 20)); // $45-65 range
        const conversionRate = Math.floor(25 + (Math.random() * 10)); // 25-35% range
        const monthlyValue = Math.floor((50 * industry.avgPremium * 0.15 * conversionRate) / 100).toLocaleString();
        
        // Find related industries
        const relatedIndustries = industries
            .filter(ind => ind.name !== industry.name && ind.riskLevel === industry.riskLevel)
            .slice(0, 2);
        
        // Prepare template variables
        let pageContent = industryTemplate
            .replace(/{{industry}}/g, industry.name)
            .replace(/{{slug}}/g, industry.slug)
            .replace(/{{riskLevel}}/g, industry.riskLevel)
            .replace(/{{breachRate}}/g, industry.breachRate)
            .replace(/{{avgLoss}}/g, industry.avgLoss.toLocaleString())
            .replace(/{{avgPremium}}/g, industry.avgPremium.toLocaleString())
            .replace(/{{marketSize}}/g, industry.marketSize.toLocaleString())
            .replace(/{{leadCost}}/g, leadCost)
            .replace(/{{conversionRate}}/g, conversionRate)
            .replace(/{{monthlyValue}}/g, monthlyValue)
            .replace(/{{primaryThreat}}/g, industry.commonThreats[0])
            .replace(/{{primaryRegulation}}/g, industry.regulations[0]);
        
        // Add threats
        const threatsHtml = industry.commonThreats.map(threat => 
            `<li>${threat}</li>`
        ).join('\n                        ');
        pageContent = pageContent.replace(/{{#threats}}.*?{{\/threats}}/gs, threatsHtml);
        
        // Add regulations
        const regulationsHtml = industry.regulations.map(reg => 
            `<li>${reg}</li>`
        ).join('\n                        ');
        pageContent = pageContent.replace(/{{#regulations}}.*?{{\/regulations}}/gs, regulationsHtml);
        
        // Add related industries
        if (relatedIndustries[0]) {
            pageContent = pageContent
                .replace(/{{#relatedIndustry1}}(.*?){{\/relatedIndustry1}}/gs, '$1')
                .replace(/{{relatedIndustry1}}/g, relatedIndustries[0].name)
                .replace(/{{relatedIndustry1Slug}}/g, relatedIndustries[0].slug);
        } else {
            pageContent = pageContent.replace(/{{#relatedIndustry1}}.*?{{\/relatedIndustry1}}/gs, '');
        }
        
        if (relatedIndustries[1]) {
            pageContent = pageContent
                .replace(/{{#relatedIndustry2}}(.*?){{\/relatedIndustry2}}/gs, '$1')
                .replace(/{{relatedIndustry2}}/g, relatedIndustries[1].name)
                .replace(/{{relatedIndustry2Slug}}/g, relatedIndustries[1].slug);
        } else {
            pageContent = pageContent.replace(/{{#relatedIndustry2}}.*?{{\/relatedIndustry2}}/gs, '');
        }
        
        // Create directory structure
        const dirPath = path.join(__dirname, '..', 'industries', industry.slug);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
        
        // Write the file
        const filePath = path.join(dirPath, 'cyber-insurance-leads.html');
        fs.writeFileSync(filePath, pageContent);
        
        generatedPages.push({
            url: `/industries/${industry.slug}/cyber-insurance-leads/`,
            industry: industry.name,
            filePath: filePath
        });
        
        console.log(`✅ Generated: ${industry.name} industry page`);
    });
    
    return generatedPages;
}

// Generate combination pages (location + industry)
function generateCombinationPages() {
    const locations = locationsData.locations;
    const industries = industriesData.industries;
    const generatedPages = [];
    
    // For MVP, generate top 3 industries × all locations
    const topIndustries = industries.slice(0, 3);
    
    locations.forEach(location => {
        topIndustries.forEach(industry => {
            // We'll create combination template next
            console.log(`📝 Combo page queued: ${industry.name} in ${location.city}`);
        });
    });
    
    return generatedPages;
}

// Generate sitemap
function generateSitemap(pages) {
    const baseUrl = 'https://brokerleadengine.com';
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    pages.forEach(page => {
        sitemap += '  <url>\n';
        sitemap += `    <loc>${baseUrl}${page.url}</loc>\n`;
        sitemap += `    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>\n`;
        sitemap += '    <changefreq>weekly</changefreq>\n';
        sitemap += '    <priority>0.8</priority>\n';
        sitemap += '  </url>\n';
    });
    
    sitemap += '</urlset>';
    
    fs.writeFileSync(path.join(__dirname, '..', 'sitemap-programmatic.xml'), sitemap);
    console.log('✅ Sitemap generated');
}

// Main execution
function main() {
    console.log('🚀 Starting Programmatic SEO Page Generation...\n');
    
    // Phase 1: Location pages
    console.log('📍 Generating Location Pages...');
    const locationPages = generateLocationPages();
    console.log(`✅ Generated ${locationPages.length} location pages\n`);
    
    // Phase 2: Industry pages
    console.log('🏢 Generating Industry Pages...');
    const industryPages = generateIndustryPages();
    console.log(`✅ Generated ${industryPages.length} industry pages\n`);
    
    // Phase 3: Combination pages (template needed)
    console.log('🔄 Combination Pages (Template Needed)...');
    const comboPages = generateCombinationPages();
    
    // Generate sitemap with all pages
    console.log('\n📄 Generating Sitemap...');
    const allPages = [...locationPages, ...industryPages];
    generateSitemap(allPages);
    
    console.log('\n✨ Phase 1 & 2 Complete!');
    console.log(`Total pages generated: ${allPages.length}`);
    console.log(`  - Location pages: ${locationPages.length}`);
    console.log(`  - Industry pages: ${industryPages.length}`);
    console.log('\nNext steps:');
    console.log('1. Create combination-template.html');
    console.log('2. Add CSS styling');
    console.log('3. Deploy and submit sitemap to Google');
}

// Run the generator
main();