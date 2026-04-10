const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const Poet = require('./models/Poet');
const Dictionary = require('./models/Dictionary');
const Book = require('./models/Book');
const { EXTENDED_POETS } = require('./data/poets-extended');
const { EXTENDED_DICTIONARY } = require('./data/dictionary-extended');

const MONGODB_URI = process.env.MONGODB_URI;

async function migrate() {
    if (!MONGODB_URI) {
        console.error('Error: MONGODB_URI not found in .env');
        process.exit(1);
    }

    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB for migration');

        // 1. Migrate Poets
        console.log('Migrating Poets...');
        const dbPath = path.join(__dirname, 'db.json');
        const db = JSON.parse(fs.readFileSync(dbPath, 'utf-8'));
        
        const allPoets = [...db.poets, ...EXTENDED_POETS];
        
        for (const poetData of allPoets) {
            await Poet.findOneAndUpdate(
                { id: poetData.id },
                poetData,
                { upsert: true, new: true }
            );
        }
        console.log(`Success: Migrated ${allPoets.length} poets.`);

        // 2. Migrate Dictionary
        console.log('Migrating Dictionary...');
        const mergedDict = { ...db.dictionary, ...EXTENDED_DICTIONARY };
        const allDictWords = Object.keys(mergedDict);

        for (const word of allDictWords) {
            const entry = mergedDict[word];
            try {
                await Dictionary.findOneAndUpdate(
                    { word: word },
                    { word, ...entry },
                    { upsert: true, new: true }
                );
            } catch (err) {
                console.error(`  Error migrating word "${word}":`, err.message);
            }
        }
        console.log(`Success: Migrated ${allDictWords.length} dictionary entries.`);

        // 3. Migrate Sample Books
        console.log('Migrating Sample Books...');
        const sampleBooks = [
            { title: "Madhushala", author: "Harivansh Rai Bachchan", hindi_title: "मधुशाला", coverImage: "https://m.media-amazon.com/images/I/71XmU7S+n+L._SX522_.jpg", description: "A classic collection of 135 quatrains (rubaiyat) by celebrated Hindi poet Harivansh Rai Bachchan." },
            { title: "Godaan", author: "Munshi Premchand", hindi_title: "गोदान", coverImage: "https://m.media-amazon.com/images/I/81e5oGvY3oL.jpg", description: "One of the greatest Hindi novels of all time, exploring the socio-economic deprivations of rural peasants." },
            { title: "Gitanjali", author: "Rabindranath Tagore", hindi_title: "गीतांजलि", coverImage: "https://m.media-amazon.com/images/I/71u-m9v91uL.jpg", description: "The collection of poems that won Tagore the Nobel Prize for Literature." }
        ];

        for (const book of sampleBooks) {
            await Book.findOneAndUpdate({ title: book.title }, book, { upsert: true });
        }
        console.log(`Success: Added ${sampleBooks.length} sample books.`);

        console.log('Migration Complete!');
        process.exit(0);
    } catch (err) {
        console.error('Migration failed:', err);
        process.exit(1);
    }
}

migrate();
