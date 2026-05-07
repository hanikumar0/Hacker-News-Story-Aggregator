const axios = require('axios');
const cheerio = require('cheerio');
const Story = require('../models/Story');

const scrapeHackerNews = async () => {
    try {
        // Cache-bust the HN request so we always get the live front page,
        // not a stale response from Node's HTTP keep-alive agent or a CDN
        const { data } = await axios.get('https://news.ycombinator.com/', {
            headers: {
                'Cache-Control': 'no-cache, no-store, must-revalidate',
                'Pragma': 'no-cache',
                'Expires': '0',
                // Randomise user-agent to avoid bot detection caching
                'User-Agent': `Mozilla/5.0 (compatible; HNAggregator/1.0; +${Date.now()})`,
            },
            // Disable axios' built-in response caching
            params: { _t: Date.now() },
        });

        const $ = cheerio.load(data);
        const stories = [];

        $('.athing').slice(0, 30).each((index, element) => {
            const titleElement = $(element).find('.titleline > a');
            const title = titleElement.text().trim();
            let url = titleElement.attr('href');

            if (!title || !url) return;

            // Fix relative URLs (e.g. "item?id=12345" for Ask HN, Show HN, jobs)
            if (!url.startsWith('http')) {
                url = `https://news.ycombinator.com/${url}`;
            }

            const subtext = $(element).next();
            const points = parseInt(subtext.find('.score').text()) || 0;
            const author = subtext.find('.hnuser').text().trim() || 'N/A';
            const postedAt = subtext.find('.age').attr('title') || subtext.find('.age').text().trim() || 'N/A';

            // Always capture the HN item discussion link
            const itemId = $(element).attr('id');
            const hnLink = itemId ? `https://news.ycombinator.com/item?id=${itemId}` : null;

            stories.push({ title, url, hnLink, points, author, postedAt });
        });

        console.log(`[Scraper] Fetched ${stories.length} stories from HN`);

        // Upsert each story — using $set ensures updatedAt is always touched,
        // which causes the feed to re-sort correctly after every sync.
        for (const storyData of stories) {
            await Story.findOneAndUpdate(
                { url: storyData.url },
                { $set: storyData },        // $set forces Mongoose to update updatedAt
                { upsert: true, new: true }
            );
        }

        return stories;
    } catch (error) {
        console.error(`[Scraper] Error: ${error.message}`);
        throw error;
    }
};

module.exports = { scrapeHackerNews };
