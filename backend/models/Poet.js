const mongoose = require('mongoose');

const PoetSchema = new mongoose.Schema({
    id: { type: Number, unique: true }, // Legacy ID for transition
    name: { type: String, required: true },
    hindi: String,
    period: String,
    country: String,
    color: String,
    initials: String,
    category: { type: String, enum: ['classical', 'modern', 'contemporary'] },
    speciality: String,
    literary_style: String,
    bio: String,
    era: String,
    tags: [String],
    isFeatured: { type: Boolean, default: false },
    quotes: [String],
    poems: [{
        title: String,
        text: String,
        form: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Poet', PoetSchema);
