// models/comment.js
const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content: String,
    author: String,
    timestamp: { type: Date, default: Date.now },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Like' }],
});
module.exports = mongoose.model('Comment', commentSchema);
