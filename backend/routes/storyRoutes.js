const express = require('express');
const { getStories, toggleBookmark, getBookmarks, getStoryById } = require('../controllers/storyController');
const { protect } = require('../middleware/auth');
const router = express.Router();

router.get('/', getStories);
router.get('/bookmarks', protect, getBookmarks);
router.get('/:id', getStoryById);
router.post('/:id/bookmark', protect, toggleBookmark);

module.exports = router;
