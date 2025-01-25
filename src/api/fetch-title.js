const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { url } = req.query;
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    const title = $('title').text().trim();
    res.json({ title });
  } catch (error) {
    console.error('Error fetching title:', error);
    res.status(500).json({ error: 'Failed to fetch title' });
  }
});

module.exports = router;