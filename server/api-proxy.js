const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

const PAGESPEED_API_KEY = 'AIzaSyAkdvJHVLLANuoXCfI9hUOWNgfnHUgJC28';
const PAGESPEED_BASE_URL = 'https://www.googleapis.com/pagespeedonline/v5/runPagespeed';

// Proxy endpoint for PageSpeed Insights API
app.get('/api/pagespeed', async (req, res) => {
  try {
    const { url, strategy = 'mobile' } = req.query;
    
    if (!url) {
      return res.status(400).json({ error: 'URL parameter is required' });
    }

    console.log(`🔍 Proxying PageSpeed Insights request for: ${url} (${strategy})`);

    const params = new URLSearchParams({
      url: url,
      key: PAGESPEED_API_KEY,
      strategy: strategy,
      category: ['performance', 'accessibility', 'best-practices', 'seo'].join(','),
      locale: 'en'
    });

    const apiUrl = `${PAGESPEED_BASE_URL}?${params}`;
    console.log('📡 Making API request to Google PageSpeed Insights...');

    const response = await fetch(apiUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ PageSpeed API Error (${response.status}):`, errorText);
      throw new Error(`PageSpeed API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Successfully received data from PageSpeed Insights');
    
    res.json(data);
  } catch (error) {
    console.error('❌ Proxy error:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch PageSpeed data',
      details: error.message 
    });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
  console.log(`🚀 PageSpeed API Proxy Server running on port ${PORT}`);
  console.log(`📊 Ready to proxy PageSpeed Insights requests`);
});

module.exports = app; 