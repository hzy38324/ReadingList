import axios from 'axios';
import * as cheerio from 'cheerio';

export default function fetchTitlePlugin() {
  return {
    name: 'fetch-title-plugin',
    configureServer(server) {
      server.middlewares.use('/api/fetch-title', async (req, res) => {
        try {
          // Parse and validate URL
          const urlSearchParams = new URL(req.url, 'http://localhost').searchParams;
          const url = urlSearchParams.get('url');
          if (!url || !/^https?:\/\//.test(url)) {
            res.statusCode = 400;
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify({ error: 'Invalid URL' }));
          }

          // Set timeout and headers
          const response = await axios.get(url, {
            timeout: 5000,
            headers: {
              'User-Agent': 'Mozilla/5.0'
            }
          });

          // Handle non-HTML content
          const contentType = response.headers['content-type'] || '';
          if (!contentType.includes('text/html')) {
            res.statusCode = 400;
            return res.end(JSON.stringify({ error: 'URL does not return HTML content' }));
          }

          // Parse title
          const $ = cheerio.load(response.data);
          const title = $('title').text().trim() || 'Untitled';
          
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ title }));
        } catch (error) {
          console.error('Error fetching title:', error);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ 
            error: 'Failed to fetch title',
            details: error.message 
          }));
        }
      });
    }
  };
}