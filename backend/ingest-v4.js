/**
 * Niharika Data Expansion Script v4.0
 * Massively expands the Poets, Poems, and Dictionary database.
 */

const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });
const mongoose = require('mongoose');
const Poet = require('./models/Poet');
const Dictionary = require('./models/Dictionary');

const MONGODB_URI = process.env.MONGODB_URI;

const NEW_POETS = [
    {
        id: 1, name: "Rajan Rai", rawId: 1, hindi: "राजन राय", period: "16/08/2005 - Present",
        category: "contemporary", speciality: "Philosophical Poetry, Aphorism", color: "#8B1A1A", initials: "रा",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400", // Placeholder for production
        tags: ["founder", "contemporary", "philosopher"], isFeatured: true,
        bio: "Rajan Rai is the visionary founder of Niharika and a philosopher-poet whose work explores the depths of human consciousness and self-realisation. His writings are characterized by a blend of ancient wisdom and modern existential inquiry.",
        quotes: ["A man can do anything, when he realises he is a man.", "Silence is the loudest answer the soul ever gives."],
        poems: [
            { title: "The Realisation", group: "philosophy", text: "A man can do anything,\nwhen he realises he is a man.\nThe stars are not above him,\nthey are within the rhythm of his breath.", form: "Aphorism", category: "philosophical" },
            { title: "Inner Sunrise", group: "motivational", text: "Every storm within you\nis just a sunrise waiting to break.\nHold the dark a little longer,\nfor the light is already awake.", form: "Nazm", category: "motivational" }
        ]
    },
    {
        id: 2, name: "Kabir Das", rawId: 2, hindi: "कबीर दास", period: "1440 - 1518",
        category: "classical", speciality: "Doha, Bhakti", color: "#C9982A", initials: "क",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400",
        tags: ["classical", "bhakti", "mystic"], isFeatured: true,
        bio: "Kabir Das was a 15th-century Indian mystic poet and saint, whose writings influenced Hinduism's Bhakti movement and his verses are found in Sikhism's scripture Guru Granth Sahib.",
        poems: [
            { title: "Man Re Tan Kagad Ka Putla", text: "मन रे तन कागद का पुतला,\nलागे बूंद बिनसि जाए छिन में,\nगरब करे क्या इतना।", form: "Doha", category: "philosophical" },
            { title: "Knowledge and Devotion", text: "पोथी पढ़ि पढ़ि जग मुआ, पंडित भया न कोइ,\nढाई आखर प्रेम का, पढ़े सो पंडित होइ।", form: "Doha", category: "love" }
        ]
    },
    {
        id: 13, name: "Mirza Ghalib", rawId: 13, hindi: "मिर्ज़ा ग़ालिब", period: "1797 - 1869",
        category: "classical", speciality: "Ghazal, Urdu Poetry", color: "#4E342E", initials: "ग़ा",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
        tags: ["urdu", "ghazal", "mughal"], isFeatured: true,
        bio: "Mirza Asadullah Baig Khan, known as Ghalib, was a preeminent Urdu and Persian poet during the last years of the Mughal Empire. He is one of the most popular and influential Urdu poets in history.",
        poems: [
            { title: "Hazaron Khwahishen Aisi", text: "हज़ारों ख्वाहिशें ऐसी कि हर ख्वाहिश पे दम निकले,\nबहुत निकले मेरे अरमान लेकिन फिर भी कम निकले।", form: "Ghazal", category: "philosophical" },
            { title: "Dil-e-Nadaan", text: "दिल-ए-नादाँ तुझे हुआ क्या है,\nआख़िर इस दर्द की दवा क्या है?", form: "Ghazal", category: "sadness" }
        ]
    },
    {
        id: 14, name: "Rumi", rawId: 14, hindi: "रूमी", period: "1207 - 1273",
        category: "classical", speciality: "Sufi Mystic, Persian Poetry", color: "#1B5E20", initials: "रू",
        image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400",
        tags: ["sufi", "mystic", "persian"], isFeatured: true,
        bio: "Jalal ad-Din Muhammad Rumi was a 13th-century Persian poet, Hanafi faqih, Islamic scholar, Maturidi theologian, and Sufi mystic originally from Greater Khorasan in Greater Iran.",
        poems: [
            { title: "The Guest House", text: "This being human is a guest house.\nEvery morning a new arrival.\nA joy, a depression, a meanness,\nsome momentary awareness comes\nas an unexpected visitor.", form: "Spiritual", category: "philosophical" },
            { title: "Beyond Right and Wrong", text: "Out beyond ideas of wrongdoing and rightdoing,\nthere is a field. I’ll meet you there.\nWhen the soul lies down in that grass,\nthe world is too full to talk about.", form: "Spiritual", category: "love" }
        ]
    },
    {
        id: 15, name: "Jaun Elia", rawId: 15, hindi: "जौन एलिया", period: "1931 - 2002",
        category: "modern", speciality: "Urdu Poetry, Nihilism", color: "#212121", initials: "जौ",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
        tags: ["urdu", "modern", "nihilism"], isFeatured: true,
        bio: "Jaun Elia was a Pakistani philosopher, biographer, scholar, and Urdu poet. He was the brother of Rais Amrohvi and Syed Muhammad Taqi, who were renowned journalists and philosophers. He was fluent in Arabic, Persian, and Hebrew.",
        poems: [
            { title: "Sharmindagi", text: "कल जो रस्ता सफ़र था मेरा,\nआज वो रस्ता मंज़िल है तेरी।", form: "Ghazal", category: "sadness" },
            { title: "Ghurur", text: "क्या ग़म है जो दुनिया समझती ही नहीं,\nआख़िर हम भी तो दुनिया को नहीं समझते।", form: "Sher", category: "philosophical" }
        ]
    }
];

const NEW_WORDS = [
    { word: "Takhayul", hindi: "तख़य्युल", meaning: "Imagination; the power of visualization and creative thought in poetry.", roman: "Takhayul", pos: "Noun", example: "ग़ालिब का तख़य्युल अद्वितीय था।" },
    { word: "Kaifiyat", hindi: "कैफ़ियत", meaning: "State of mind or soul; an atmosphere or mood created by a poem.", roman: "Kaifiyat", pos: "Noun", example: "इस नज़्म ने एक अजीब कैफ़ियत पैदा कर दी है।" },
    { word: "Mushaira", hindi: "मुशायरा", meaning: "A poetic symposium where poets gather to read their works.", roman: "Mushaira", pos: "Noun", example: "आज रात शहर में एक भव्य मुशायरा है।" },
    { word: "Sukhan", hindi: "सुखन", meaning: "Speech, words, or poetry; the art of eloquent expression.", roman: "Sukhan", pos: "Noun", example: "अहले-सुखन (Poetry lovers) के लिए यह किताब एक तोहफ़ा है।" },
    { word: "Wahdat", hindi: "वहदत", meaning: "Oneness, unity; the Sufi concept of spiritual singularity.", roman: "Wahdat", pos: "Noun", example: "रूमी की शायरी वहदत का संदेश देती है।" }
];

async function ingest() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log("Connected to MongoDB...");

        // 1. Expand Poets (Upsert to preserve existing data but update with new fields like image)
        for (const p of NEW_POETS) {
            await Poet.findOneAndUpdate({ name: p.name }, p, { upsert: true, new: true });
            console.log(`  Added/Updated Poet: ${p.name}`);
        }

        // 2. Expand Dictionary
        for (const w of NEW_WORDS) {
            await Dictionary.findOneAndUpdate({ word: w.word }, w, { upsert: true, new: true });
            console.log(`  Added/Updated Word: ${w.word}`);
        }

        console.log("\n✅ Database Expansion (V4) Complete!");
        process.exit(0);
    } catch (err) {
        console.error("Ingestion failed:", err);
        process.exit(1);
    }
}

ingest();
