const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });
const Poet = require('../models/Poet');
const Poem = require('../models/Poem');
const masterPoets = require('../data/master-poets');

const MONGODB_URI = process.env.MONGODB_URI;

async function fetchWikiData(wikiSearchName) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(wikiSearchName)}`;
    try {
        const response = await fetch(url);
        if (!response.ok) return null;
        const data = await response.json();
        
        let imageUrl = null;
        if (data.originalimage && data.originalimage.source) {
            imageUrl = data.originalimage.source;
        } else if (data.thumbnail && data.thumbnail.source) {
            imageUrl = data.thumbnail.source;
            // Attempt to get a larger version if it's a thumb
            imageUrl = imageUrl.replace(/\/\d+px-/, '/400px-');
        }

        return {
            extract: data.extract,
            image: imageUrl
        };
    } catch (e) {
        return null;
    }
}

async function ingest() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB cluster.");

        const lastPoet = await Poet.findOne().sort({ id: -1 });
        let existingMaxId = (lastPoet && lastPoet.id >= 500) ? lastPoet.id : 500;
        console.log(`Starting poet IDs from: ${existingMaxId + 1}`);

        for (const p of masterPoets) {
            console.log(`Processing: ${p.fallbackName}...`);
            const wikiData = await fetchWikiData(p.wikiSearch) || {};

            const bioText = wikiData.extract || "An acclaimed and deeply revered poet.";
            const imageUrl = wikiData.image || `https://via.placeholder.com/400/${p.color.replace('#','')}/FFFFFF?text=${encodeURIComponent(p.initials)}`;

            const updateData = {
                name: p.fallbackName,
                hindi: p.hindi,
                category: p.category,
                tags: p.tags,
                color: p.color,
                initials: p.initials,
                speciality: p.speciality,
                biography: bioText,
                image: imageUrl,
                isFeatured: true
            };

            // Find or create poet
            let poetDoc = await Poet.findOne({ name: p.fallbackName });
            if (!poetDoc) {
                updateData.id = ++existingMaxId;
                poetDoc = await Poet.create({ ...updateData, works_count: p.poems.length });
            } else {
                poetDoc = await Poet.findOneAndUpdate({ _id: poetDoc._id }, updateData, { new: true });
                poetDoc.works_count = p.poems.length;
                await poetDoc.save();
            }

            // Sync Poems
            await Poem.deleteMany({ poet: poetDoc._id }); // Reset poems to avoid duplicates
            
            for (let i = 0; i < p.poems.length; i++) {
                const poemObj = p.poems[i];
                let cat = poemObj.category || 'philosophy';
                const validCategories = ['love', 'philosophy', 'nature', 'sadness', 'motivational', 'patriotism', 'social', 'spiritual'];
                
                // mappings
                if (cat === 'devotional') cat = 'spiritual';
                if (cat === 'revolutionary') cat = 'social';
                if (cat === 'patriotic') cat = 'patriotism';
                
                if (!validCategories.includes(cat)) cat = 'philosophy';

                await Poem.create({
                    title: poemObj.title,
                    text: poemObj.text,
                    poet: poetDoc._id,
                    poetName: poetDoc.name,
                    category: cat,
                    form: poemObj.form,
                    likes: Math.floor(Math.random() * 50000) + 1000,
                    hindi_text: poemObj.isHindi ? poemObj.text : null
                });
            }
            console.log(`  -> Synced successfully with Wikipedia Extract & ${p.poems.length} poems.`);
            
            // small delay to avoid wiki rate limits
            await new Promise(r => setTimeout(r, 700));
        }

        console.log("\\n✅ Mass Ingestion Complete!");
        process.exit(0);
    } catch (err) {
        console.error("Ingestion failed:", err);
        process.exit(1);
    }
}

ingest();
