// models/post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: String,
    author: String,
    timestamp: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
});

module.exports = mongoose.model('Post', postSchema);



