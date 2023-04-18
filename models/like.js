// models/like.js
const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    author: String,
    timestamp: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Like', likeSchema);
