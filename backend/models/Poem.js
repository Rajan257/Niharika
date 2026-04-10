const mongoose = require('mongoose');

const PoemSchema = new mongoose.Schema({
    id: Number, // Legacy ID support
    title: { type: String, required: true },
    poetId: { type: Number }, // For faster lookup if needed
    poet: { type: mongoose.Schema.Types.ObjectId, ref: 'Poet', required: true },
    poetName: String, // Denormalized for quick access
    category: { type: String, enum: ['love', 'philosophy', 'nature', 'sadness', 'motivational', 'patriotism', 'social', 'spiritual'] },
    text: { type: String, required: true },
    hindi_text: String,
    form: { type: String, default: 'Poem' }, // Ghazal, Nazm, Dohe, etc.
    likes: { type: Number, default: 0 },
    isFeatured: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Poem', PoemSchema);
