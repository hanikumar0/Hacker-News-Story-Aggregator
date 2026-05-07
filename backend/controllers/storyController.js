const Story = require('../models/Story');
const User = require('../models/User');

// @desc    Get all stories
// @route   GET /api/stories
exports.getStories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;

        const stories = await Story.find()
            .sort({ points: -1 })
            .skip(skip)
            .limit(limit);

        const total = await Story.countDocuments();

        res.status(200).json({ 
            success: true, 
            count: stories.length,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            },
            data: stories 
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get single story
// @route   GET /api/stories/:id
exports.getStoryById = async (req, res) => {
    try {
        const story = await Story.findById(req.params.id);
        if (!story) {
            return res.status(404).json({ success: false, message: 'Story not found' });
        }
        res.status(200).json({ success: true, data: story });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Toggle bookmark
// @route   POST /api/stories/:id/bookmark
exports.toggleBookmark = async (req, res) => {
    try {
        const storyId = req.params.id;
        const user = req.user; // Already populated by protect middleware

        // Verify story exists
        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ success: false, message: 'Story not found' });
        }

        // Check if already bookmarked (handling ObjectId comparison)
        const isBookmarked = user.bookmarks.some(id => id.toString() === storyId);

        if (isBookmarked) {
            user.bookmarks = user.bookmarks.filter(id => id.toString() !== storyId);
        } else {
            user.bookmarks.push(storyId);
        }

        await user.save();

        res.status(200).json({ 
            success: true, 
            message: isBookmarked ? 'Bookmark removed' : 'Bookmark added',
            bookmarks: user.bookmarks 
        });
    } catch (error) {
        console.error('Bookmark toggle error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get bookmarked stories
// @route   GET /api/stories/bookmarks
exports.getBookmarks = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).populate('bookmarks');
        res.status(200).json({ success: true, count: user.bookmarks.length, data: user.bookmarks });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
