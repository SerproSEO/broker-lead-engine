const axios = require('axios');

async function getKeywordData() {
  const username = 'sam@serproseo.com';
  const password = 'Ochoacueva1.';
  
  try {
    const keywords = [
      'insurance lead generation',
      'insurance broker leads', 
      'commercial insurance leads',
      'insurance marketing automation',
      'insurance agent leads',
      'B2B insurance leads',
      'cyber insurance leads',
      'professional liability leads',
      'insurance marketing services',
      'insurance lead generation company'
    ];
    
    const requestData = [{
      keywords: keywords,
      location_name: 'United States',
      language_name: 'English'
    }];

    console.log('Fetching keyword data...');
    
    const auth = Buffer.from(`${username}:${password}`).toString('base64');
    
    const response = await axios.post(
      'https://api.dataforseo.com/v3/keywords_data/google_ads/search_volume/live',
      requestData,
      {
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    if (response.data.status_code === 20000) {
      console.log('\n=== KEYWORD RESEARCH RESULTS ===\n');
      
      response.data.tasks[0].result.forEach(item => {
        console.log(`Keyword: ${item.keyword}`);
        console.log(`Search Volume: ${item.search_volume || 'N/A'}`);
        console.log(`Competition: ${item.competition || 'N/A'}`);
        console.log(`CPC: $${item.cpc || 'N/A'}`);
        console.log('---');
      });
    } else {
      console.log('Error:', response.data.status_message);
    }
  } catch (error) {
    console.error('API Error:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

getKeywordData();