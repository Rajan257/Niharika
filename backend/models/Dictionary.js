const mongoose = require('mongoose');

const DictionarySchema = new mongoose.Schema({
    word: { type: String, required: true, unique: true },
    hindi: String,
    roman: String,
    pos: String,
    meaning: String,
    example: String
}, { timestamps: true });

module.exports = mongoose.model('Dictionary', DictionarySchema);
