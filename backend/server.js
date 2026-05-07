require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const { scrapeHackerNews } = require('./services/scraper');

// Route files
const authRoutes = require('./routes/authRoutes');
const storyRoutes = require('./routes/storyRoutes');
const scrapeRoutes = require('./routes/scrapeRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/scrape', scrapeRoutes);

app.get('/', (req, res) => {
    res.send('Hacker News Aggregator API is running...');
});

const PORT = process.env.PORT || 5000;

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`);
        
        // Auto scrape on startup
        try {
            console.log('Running initial scrape...');
            await scrapeHackerNews();
            console.log('Initial scrape completed.');
        } catch (err) {
            console.error('Initial scrape failed:', err.message);
        }
    });
}

module.exports = app;
