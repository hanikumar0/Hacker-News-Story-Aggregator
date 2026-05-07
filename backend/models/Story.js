const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please add a title'],
        trim: true
    },
    url: {
        type: String,
        required: [true, 'Please add a URL'],
        unique: true
    },
    points: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        required: [true, 'Please add an author']
    },
    postedAt: {
        type: String,
        required: [true, 'Please add posted time']
    },
    hnLink: {
        type: String,
        default: null
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Story', storySchema);
