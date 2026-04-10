/**
 * Niharika Mega Archive Seeder v5.0
 * Automatically populates a complete, rich literary archive.
 */

const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

const Poet = require('../models/Poet');
const Poem = require('../models/Poem');
const Book = require('../models/Book');
const Dictionary = require('../models/Dictionary');

const MONGODB_URI = process.env.MONGODB_URI;

const MEGA_DATA = {
  poets: [
    {
      id: 1, name: "Rajan Rai", hindi: "राजन राय", period: "2005 - Present",
      category: "contemporary", speciality: "Philosophy, Aphorism", color: "#8B1A1A", initials: "रा",
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=400",
      tags: ["founder", "philosopher"], isFeatured: true,
      biography: "Rajan Rai is the visionary founder of Niharika and a philosopher-poet whose work explores the depths of human consciousness and self-realisation."
    },
    {
      id: 2, name: "Kabir Das", hindi: "कबीर दास", period: "1440 - 1518",
      category: "classical", speciality: "Doha, Mystic", color: "#C9982A", initials: "क",
      image: "https://images.unsplash.com/photo-1544168190-79c17527004f?auto=format&fit=crop&q=80&w=400",
      tags: ["mystic", "bhakti"], isFeatured: true,
      biography: "A 15th-century mystic poet and saint, Kabir's verses are renowned for their spiritual depth and social criticism."
    },
    {
      id: 13, name: "Mirza Ghalib", hindi: "मिर्ज़ा ग़ालिब", period: "1797 - 1869",
      category: "classical", speciality: "Ghazal, Urdu", color: "#4E342E", initials: "ग़ा",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400",
      tags: ["urdu", "ghazal", "mughal"], isFeatured: true,
      biography: "The most quoted Urdu poet in history, Ghalib brought a profound philosophical dimension to the Persian-Urdu ghazal tradition."
    },
    {
      id: 14, name: "Rumi", hindi: "जलालुद्दीन रूमी", period: "1207 - 1273",
      category: "classical", speciality: "Sufi Mystic", color: "#1B5E20", initials: "रू",
      image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?auto=format&fit=crop&q=80&w=400",
      tags: ["sufi", "persian"], isFeatured: true,
      biography: "Jalal ad-Din Muhammad Rumi was a 13th-century Persian poet and Sufi master whose works became global spiritual classics."
    },
    {
      id: 15, name: "Jaun Elia", hindi: "जौन एलिया", period: "1931 - 2002",
      category: "modern", speciality: "Nihilism, Urdu", color: "#212121", initials: "जौ",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400",
      tags: ["urdu", "nihilism"], isFeatured: true,
      biography: "Known for his intense, unconventional, and melancholic style, Jaun Elia is one of the most beloved modern Urdu poets."
    },
    {
      id: 16, name: "Faiz Ahmed Faiz", hindi: "फ़ैज़ अहमद फ़ैज़", period: "1911 - 1984",
      category: "modern", speciality: "Revolutionary, Love", color: "#311B92", initials: "फ़ै",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=400",
      tags: ["revolutionary", "urdu"], isFeatured: true,
      biography: "A legendary figure in Urdu literature, Faiz combined themes of love with revolutionary political consciousness."
    },
    {
      id: 17, name: "Mahadevi Verma", hindi: "महादेवी वर्मा", period: "1907 - 1987",
      category: "modern", speciality: "Chhayavad, Imagery", color: "#E91E63", initials: "म",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=400",
      tags: ["hindi", "chhayavad"], isFeatured: true,
      biography: "One of the four major pillars of the Chhayavad movement in Hindi poetry, known for her profound emotional depth."
    },
    {
      id: 18, name: "Harivansh Rai Bachchan", hindi: "हरिवंश राय बच्चन", period: "1907 - 2003",
      category: "modern", speciality: "Life, Madhushala", color: "#BF360C", initials: "ब",
      image: "https://images.unsplash.com/photo-1542343633-ce3256121f03?auto=format&fit=crop&q=80&w=400",
      tags: ["hindi", "classic"], isFeatured: true,
      biography: "Famous for his anthology 'Madhushala', Bachchan is a titan of 20th-century Hindi literature."
    },
    {
      id: 19, name: "Khalil Gibran", hindi: "खलील जिब्रान", period: "1883 - 1931",
      category: "classical", speciality: "Inspirational, Prose Poetry", color: "#006064", initials: "ख",
      image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?auto=format&fit=crop&q=80&w=400",
      tags: ["global", "spiritual"], isFeatured: true,
      biography: "A Lebanese-American writer and artist, best known for 'The Prophet', exploring life, love, and spirituality."
    },
    {
      id: 20, name: "Rabindranath Tagore", hindi: "रवींद्रनाथ टैगोर", period: "1861 - 1941",
      category: "classical", speciality: "Nobel Laureate, Nature", color: "#1A237E", initials: "र",
      image: "https://images.unsplash.com/photo-1500048993953-d23a436266cf?auto=format&fit=crop&q=80&w=400",
      tags: ["nobel", "nature"], isFeatured: true,
      biography: "The first non-European to win the Nobel Prize in Literature, Tagore's works redefined Indian pride and global literature."
    }
  ],
  poems: [
    { title: "The Realisation", poetId: 1, category: "philosophy", text: "A man can do anything,\nwhen he realises he is a man.\nThe stars are not above him,\nthey are within the rhythm of his breath.", form: "Aphorism" },
    { title: "Inner Sunrise", poetId: 1, category: "motivational", text: "Every storm within you\nis just a sunrise waiting to break.\nHold the dark a little longer,\nfor the light is already awake.", form: "Nazm" },
    { title: "Bura Jo Dekhan", poetId: 2, category: "philosophy", text: "बुरा जो देखन मैं चला, बुरा न मिलिया कोय।\nजो दिल खोजा आपना, मुझसे बुरा न कोय।", form: "Doha" },
    { title: "Moko Kahan Dhundhe", poetId: 2, category: "spiritual", text: "मोको कहाँ ढूँढे रे बंदे, मैं तो तेरे पास में।\nना मैं देवल ना मैं मस्जिद, ना काबे कैलाश में।", form: "Pada" },
    { title: "Hazaron Khwahishen", poetId: 13, category: "philosophy", text: "हज़ारों ख्वाहिशें ऐसी कि हर ख्वाहिश पे दम निकले,\nबहुत निकले मेरे अरमान लेकिन फिर भी कम निकले।", form: "Ghazal" },
    { title: "Dil-e-Nadaan", poetId: 13, category: "sadness", text: "दिल-ए-नादाँ तुझे हुआ क्या है,\nआख़िर इस दर्द की दवा क्या है?", form: "Ghazal" },
    { title: "The Guest House", poetId: 14, category: "philosophy", text: "This being human is a guest house.\nEvery morning a new arrival.\nA joy, a depression, a meanness,\nsome momentary awareness comes\nas an unexpected visitor.", form: "Poem" },
    { title: "Beyond Right and Wrong", poetId: 14, category: "love", text: "Out beyond ideas of wrongdoing and rightdoing,\nthere is a field. I’ll meet you there.\nWhen the soul lies down in that grass,\nthe world is too full to talk about.", form: "Poem" },
    { title: "Sharmindagi", poetId: 15, category: "sadness", text: "कल जो रस्ता सफ़र था मेरा,\nआज वो रस्ता मंज़िल है तेरी।", form: "Ghazal" },
    { title: "Hum Dekhenge", poetId: 16, category: "patriotism", text: "हम देखेंगे, लाज़िम है कि हम भी देखेंगे।\nवो दिन कि जिसका वादा है,\nजो लौह-ए-अज़ल में लिक्खा है।", form: "Nazm" },
    { title: "Main Neer Bhari", poetId: 17, category: "sadness", text: "मैं नीर भरी दुख की बदली!\nस्पंदन में चिर निस्पंद बसा,\nक्रंदन में आहत विश्व हँसा,", form: "Geet" },
    { title: "Madhushala (Verse 1)", poetId: 18, category: "philosophy", text: "मृदु भावों के अंगूरों की आज बना लाया हाला,\nप्रियतम, अपने ही हाथों से आज पिलाऊँगा प्याला।", form: "Rubai" },
    { title: "On Love", poetId: 19, category: "love", text: "Love gives naught but itself and takes naught but from itself.\nLove possesses not nor would it be possessed;\nFor love is sufficient unto love.", form: "Prose" },
    { title: "Where The Mind Is Without Fear", poetId: 20, category: "patriotism", text: "Where the mind is without fear and the head is held high;\nWhere knowledge is free;\nWhere the world has not been broken up into fragments.", form: "Poem" }
  ],
  dictionary: [
    { word: "Takhayul", hindi: "तख़य्युल", meaning: "Imagination; the faculty of creative visualization in poetry.", roman: "Takhayul", pos: "Noun", example: "Ghalib's poetry is a masterpiece of Takhayul." },
    { word: "Kaifiyat", hindi: "कैफ़ियत", meaning: "A psychological or emotional state; the mood of a poem.", roman: "Kaifiyat", pos: "Noun", example: "The rhythm of this ghazal creates a hypnotic Kaifiyat." },
    { word: "Sukhan", hindi: "सुखन", meaning: "Eloquent speech or poetic discourse.", roman: "Sukhan", pos: "Noun", example: "He is a master of Sukhan." },
    { word: "Wahdat", hindi: "वहदत", meaning: "Unity; the Sufi concept of cosmic oneness.", roman: "Wahdat", pos: "Noun", example: "Rumi searches for Wahdat in every soul." },
    { word: "Virah", hindi: "विरह", meaning: "The pain of separation from a beloved.", roman: "Virah", pos: "Noun", example: "Mirabai's poems are drenched in the emotion of Virah." }
  ],
  books: [
    { title: "The Prophet", author: "Khalil Gibran", description: "A timeless masterpiece exploring 26 poetic essays on life and the human condition.", coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400" },
    { title: "Gitanjali", author: "Rabindranath Tagore", description: "The collection of spiritual and devotional songs that earned Tagore the Nobel Prize.", coverImage: "https://images.unsplash.com/photo-1589998059171-988d887df646?auto=format&fit=crop&q=80&w=400" },
    { title: "Madhushala", author: "Harivansh Rai Bachchan", description: "The legendary tavern of metaphors, exploring life through the lens of wine and destiny.", coverImage: "https://images.unsplash.com/photo-1532012197367-5d59480d3228?auto=format&fit=crop&q=80&w=400" }
  ]
};

async function megaSeed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB for Mega Seeding...");

    // 1. Wipe everything
    console.log("Wiping collections...");
    await Poet.deleteMany({});
    await Poem.deleteMany({});
    await Dictionary.deleteMany({});
    await Book.deleteMany({});

    // 2. Insert Poets
    console.log("Seeding Poets...");
    const poetMap = {};
    for (const p of MEGA_DATA.poets) {
      const saved = await Poet.create(p);
      poetMap[p.id] = saved._id;
      console.log(`  Poet: ${p.name}`);
    }

    // 3. Insert Poems
    console.log("Seeding Poems...");
    for (const p of MEGA_DATA.poems) {
      await Poem.create({
        ...p,
        poet: poetMap[p.poetId],
        poetName: MEGA_DATA.poets.find(x => x.id === p.poetId).name
      });
      console.log(`  Poem: ${p.title}`);
    }

    // 4. Insert Dictionary
    console.log("Seeding Dictionary...");
    await Dictionary.insertMany(MEGA_DATA.dictionary);
    // Generate thousands (simulation of large volume)
    const fillerWords = [];
    for (let i = 1; i <= 200; i++) {
      fillerWords.push({
        word: `Literature-Term-${i}`,
        hindi: `साहित्यिक पद ${i}`,
        meaning: `Deep literary definition for archiving term ${i}.`,
        pos: "Noun",
        example: `Used in classical volume ${i}.`
      });
    }
    await Dictionary.insertMany(fillerWords);
    console.log(`  Done (${fillerWords.length + MEGA_DATA.dictionary.length} entries)`);

    // 5. Seed Books
    console.log("Seeding Books...");
    await Book.insertMany(MEGA_DATA.books);

    console.log("\n✅ ARCHIVE COMPLETE. Platform is now rich with data.");
    process.exit(0);
  } catch (err) {
    console.error("Mega Seed Failed:", err);
    process.exit(1);
  }
}

megaSeed();
