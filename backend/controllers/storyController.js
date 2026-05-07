const Story = require('../models/Story');
const User = require('../models/User');

// @desc    Get all stories
// @route   GET /api/stories
exports.getStories = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 30; // show all scraped stories
        const skip = (page - 1) * limit;

        const stories = await Story.find()
            .sort({ updatedAt: -1 }) // newest/recently updated first — critical for sync
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
        const userId = req.user._id;

        // Verify story exists
        const story = await Story.findById(storyId);
        if (!story) {
            return res.status(404).json({ success: false, message: 'Story not found' });
        }

        // Reload user from DB fresh to get the current bookmarks array
        const user = await User.findById(userId).select('+bookmarks');
        const isBookmarked = user.bookmarks.some(id => id.toString() === storyId);

        let updatedUser;
        if (isBookmarked) {
            // Use $pull to remove — bypasses pre-save hook (no password re-hash)
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { $pull: { bookmarks: storyId } },
                { new: true }
            ).select('bookmarks');
        } else {
            // Use $addToSet to add — prevents duplicates, bypasses pre-save hook
            updatedUser = await User.findByIdAndUpdate(
                userId,
                { $addToSet: { bookmarks: storyId } },
                { new: true }
            ).select('bookmarks');
        }

        res.status(200).json({
            success: true,
            message: isBookmarked ? 'Bookmark removed' : 'Bookmark added',
            bookmarks: updatedUser.bookmarks.map(id => id.toString())
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

        // Filter out any bookmarks that could not be populated (e.g., if story was deleted)
        // This ensures the frontend doesn't receive null values which could cause crashes
        const validBookmarks = (user.bookmarks || []).filter(story => story !== null);

        res.status(200).json({
            success: true,
            count: validBookmarks.length,
            data: validBookmarks
        });
    } catch (error) {
        console.error('Get Bookmarks error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
