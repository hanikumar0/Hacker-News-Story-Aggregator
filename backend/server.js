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

// 1. CORS Configuration for Local & Production
const allowedOrigins = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    process.env.FRONTEND_URL
].filter(Boolean); // removes undefined

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(new Error('The CORS policy for this site does not allow access from the specified Origin.'), false);
        }
        return callback(null, true);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// 2. Request Logging Middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// 3. Database Connection Middleware (Awaits connection before routing)
app.use(async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error('DB Middleware Error:', error.message);
        return res.status(500).json({ success: false, message: 'Database connection failed', error: error.message });
    }
});

// 4. Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);
app.use('/api/scrape', scrapeRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({ success: true, message: 'Hacker News Aggregator API is running...' });
});

// 5. Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('Unhandled Server Error:', err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// Start Server locally
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, async () => {
        console.log(`Server running on port ${PORT}`);
        
        // Auto scrape on startup locally
        try {
            console.log('Running initial scrape...');
            await connectDB();
            await scrapeHackerNews();
            console.log('Initial scrape completed.');
        } catch (err) {
            console.error('Initial scrape failed:', err.message);
        }
    });
}

// Export app for Vercel Serverless
module.exports = app;
