const FirecrawlApp = require('@mendable/firecrawl-js').default;

const app = new FirecrawlApp({ apiKey: 'fc-ff2409277e1b443eb8a51ca3a7221c5e' });

async function scrapePages() {
  const pages = [
    { url: 'https://seal-app-he5wy.ondigitalocean.app/', name: 'Home' },
    { url: 'https://seal-app-he5wy.ondigitalocean.app/services.html', name: 'Services' },
    { url: 'https://seal-app-he5wy.ondigitalocean.app/pricing.html', name: 'Pricing' },
    { url: 'https://seal-app-he5wy.ondigitalocean.app/about.html', name: 'About' }
  ];

  for (const page of pages) {
    console.log(`\n=== SCRAPING ${page.name.toUpperCase()} PAGE ===`);
    console.log(`URL: ${page.url}`);
    
    try {
      const result = await app.scrapeUrl(page.url, {
        formats: ['html', 'markdown'],
        onlyMainContent: false,
        includeTags: ['nav', 'header', 'a'],
        excludeTags: ['script', 'style']
      });
      
      console.log('Full result:', JSON.stringify(result, null, 2));
      
      if (result.success && result.data) {
        console.log(`\n--- NAVIGATION HTML for ${page.name} ---`);
        
        // Extract navigation-related HTML
        const html = result.data.html || result.data.content;
        
        // Look for nav elements
        const navMatches = html.match(/<nav[^>]*>.*?<\/nav>/gis);
        if (navMatches) {
          navMatches.forEach((nav, index) => {
            console.log(`\nNav Element ${index + 1}:`);
            console.log(nav);
          });
        } else {
          console.log('No <nav> elements found');
        }
        
        // Look for header elements that might contain navigation
        const headerMatches = html.match(/<header[^>]*>.*?<\/header>/gis);
        if (headerMatches) {
          headerMatches.forEach((header, index) => {
            console.log(`\nHeader Element ${index + 1}:`);
            console.log(header);
          });
        } else {
          console.log('No <header> elements found');
        }
        
        // Extract navigation links specifically
        const linkMatches = html.match(/<a[^>]*href=[^>]*>.*?<\/a>/gis);
        if (linkMatches) {
          console.log(`\n--- NAVIGATION LINKS for ${page.name} ---`);
          const navLinks = linkMatches.filter(link => {
            const cleanLink = link.replace(/\s+/g, ' ').trim();
            // Filter for likely navigation links (not too long, not external scripts)
            return cleanLink.length < 200 && 
                   !cleanLink.includes('javascript:') &&
                   !cleanLink.includes('mailto:') &&
                   (cleanLink.includes('.html') || cleanLink.includes('href="/"') || cleanLink.includes('href="#'));
          });
          
          navLinks.forEach((link, index) => {
            const cleanLink = link.replace(/\s+/g, ' ').trim();
            console.log(`${index + 1}. ${cleanLink}`);
          });
        }
        
        // Extract menu text content for analysis
        console.log(`\n--- MENU ANALYSIS for ${page.name} ---`);
        const menuKeywords = ['Home', 'Services', 'Pricing', 'About', 'Contact', 'Success Stories', 'AI Demo', 'Guarantee'];
        menuKeywords.forEach(keyword => {
          const found = html.toLowerCase().includes(keyword.toLowerCase());
          console.log(`${keyword}: ${found ? 'FOUND' : 'MISSING'}`);
        });
        
      } else {
        console.log(`Failed to scrape ${page.name}: ${result.error}`);
      }
      
      // Add delay between requests
      await new Promise(resolve => setTimeout(resolve, 2000));
      
    } catch (error) {
      console.log(`Error scraping ${page.name}: ${error.message}`);
    }
  }
}

scrapePages().catch(console.error);