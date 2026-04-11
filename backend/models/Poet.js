const mongoose = require('mongoose');

const PoetSchema = new mongoose.Schema({
    id: { type: Number, unique: true }, // Legacy ID support
    name: { type: String, required: true },
    hindi: String,
    period: String,
    country: { type: String, default: 'India' },
    color: { type: String, default: '#8B1A1A' },
    initials: String,
    category: { type: String, enum: ['classical', 'modern', 'contemporary'] },
    speciality: String,
    literary_style: String,
    biography: String,
    philosophy: String,
    stories: [String],
    era: String,
    image: String,
    tags: [String],
    isFeatured: { type: Boolean, default: false },
    quotes: [String],
    // Note: Poems are now in a separate collection referenced by poet ID
    works_count: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Poet', PoetSchema);
