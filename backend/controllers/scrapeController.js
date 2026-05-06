const { scrapeHackerNews } = require('../services/scraper');

// @desc    Trigger scraper manually
// @route   POST /api/scrape
exports.triggerScrape = async (req, res) => {
    try {
        const stories = await scrapeHackerNews();
        res.status(200).json({ 
            success: true, 
            message: 'Scraping successful', 
            count: stories.length,
            data: stories 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Scraping failed: ' + error.message });
    }
};
