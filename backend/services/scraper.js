const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const scrapeHackerNews = async () => {
    try {
        const { data } = await axios.get('https://news.ycombinator.com/');
        const $ = cheerio.load(data);
        const stories = [];

        $('.athing').slice(0, 30).each((index, element) => {
            const titleElement = $(element).find('.titleline > a');
            const title = titleElement.text();
            let url = titleElement.attr('href');

            // Fix relative URLs (e.g. "item?id=12345" for Ask HN, Show HN, etc.)
            if (url && !url.startsWith('http')) {
                url = `https://news.ycombinator.com/${url}`;
            }
            
            const subtext = $(element).next();
            const points = parseInt(subtext.find('.score').text()) || 0;
            const author = subtext.find('.hnuser').text() || 'N/A';
            const postedAt = subtext.find('.age').text() || 'N/A';
            // Grab the HN discussion link (always available)
            const itemId = $(element).attr('id');
            const hnLink = itemId ? `https://news.ycombinator.com/item?id=${itemId}` : null;

            if (title && url) {
                stories.push({
                    title,
                    url,
                    hnLink,
                    points,
                    author,
                    postedAt
                });
            }
        });

        // Save to DB
        for (const storyData of stories) {
            await Story.findOneAndUpdate(
                { url: storyData.url },
                storyData,
                { upsert: true, new: true }
            );
        }

        return stories;
    } catch (error) {
        console.error(`Scraping Error: ${error.message}`);
        throw error;
    }
};

module.exports = { scrapeHackerNews };
