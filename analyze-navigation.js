// Analyze navigation from Firecrawl results
const navigationResults = {
  home: {
    desktop: ['Services', 'AI Demo', 'Pricing', 'Success Stories', 'Guarantee', 'About', 'Contact'],
    mobile: ['Services', 'AI Demo', 'Pricing', 'Success Stories', 'Guarantee', 'About', 'Contact']
  },
  services: {
    desktop: ['Services', 'AI Demo', 'Pricing', 'Success Stories', 'Guarantee', 'About', 'Contact'],
    mobile: ['Services', 'AI Demo', 'Pricing', 'Guarantee', 'About'] // MISSING Success Stories and Contact
  },
  pricing: {
    desktop: ['Services', 'AI Demo', 'Pricing', 'Success Stories', 'Guarantee', 'About', 'Contact'],
    mobile: ['Services', 'AI Demo', 'Pricing', 'Guarantee', 'About'] // MISSING Success Stories and Contact
  }
};

const expectedMenuItems = ['Services', 'AI Demo', 'Pricing', 'Success Stories', 'Guarantee', 'About', 'Contact'];

console.log('=== NAVIGATION ANALYSIS RESULTS ===\n');

Object.keys(navigationResults).forEach(page => {
  console.log(`${page.toUpperCase()} PAGE:`);
  
  console.log('  Desktop Navigation:');
  expectedMenuItems.forEach(item => {
    const present = navigationResults[page].desktop.includes(item);
    console.log(`    ${item}: ${present ? '✅ PRESENT' : '❌ MISSING'}`);
  });
  
  console.log('  Mobile Navigation:');
  expectedMenuItems.forEach(item => {
    const present = navigationResults[page].mobile.includes(item);
    console.log(`    ${item}: ${present ? '✅ PRESENT' : '❌ MISSING'}`);
  });
  
  console.log('');
});

console.log('=== SUMMARY ===');
console.log('❌ PROBLEM IDENTIFIED:');
console.log('- Services and Pricing pages are missing "Success Stories" and "Contact" from mobile navigation');
console.log('- Home page has complete navigation on both desktop and mobile');
console.log('- Desktop navigation is consistent across all pages');
console.log('\n✅ SOLUTION NEEDED:');
console.log('- Fix mobile navigation HTML on Services and Pricing pages');
console.log('- Ensure mobile navigation matches desktop navigation structure');