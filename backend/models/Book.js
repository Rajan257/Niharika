const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    author: String,
    hindi_title: String,
    coverImage: String,
    description: String,
    genre: [String],
    viewCount: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
    externalLink: String // Link to buy or read online
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema);
