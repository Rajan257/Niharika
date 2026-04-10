// backend/server.js - Niharika API Server v3.0
// Complete upgrade with auth, extended data, voice chatbot

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');
const mongoose = require('mongoose');

const app    = express();
const PORT   = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI;

// ── Database Connection ────────────────────────────────────────────────
if (MONGODB_URI) {
  mongoose.connect(MONGODB_URI)
    .then(() => console.log('  MongoDB connected successfully'))
    .catch(err => console.error('  MongoDB connection error:', err));
} else {
  console.warn('  WARNING: MONGODB_URI not found in environment. Database features will be limited.');
}

// Models
const Poet = require('./models/Poet');
const Dictionary = require('./models/Dictionary');
const Book = require('./models/Book');
const User = require('./models/User');

// Legacy DB Helpers
const DB_PATH = path.join(__dirname, 'db.json');
const readDB = () => {
  try {
    return JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
  } catch (err) {
    return { poets: [], poems: [], dictionary: {}, quotes: [], subscribers: [] };
  }
};
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// Extended Data (for fallback and searching before full DB index)
const { EXTENDED_POETS } = require('./data/poets-extended');
const { EXTENDED_DICTIONARY } = require('./data/dictionary-extended');

// ── Middleware ──────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// Health check
app.get('/api/health', async (req, res) => {
  const poetCount = await Poet.countDocuments();
  const dictCount = await Dictionary.countDocuments();
  res.json({ 
    status: 'ok', 
    platform: 'Niharika', 
    version: '4.0.0',
    stats: { poets: poetCount, dictionary: dictCount },
    dbStatus: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString() 
  });
});

// ── Auth Routes ───────────────────────────────────────────────────────
const { register, login, getMe, verifyToken, addFavorite, getFavorites, addBookmark, getBookmarks, addHistory } = require('./routes/auth');

app.post('/api/auth/register', register);
app.post('/api/auth/login',    login);
app.get('/api/auth/me',        verifyToken, getMe);

// User data routes
app.post('/api/user/favorites',  verifyToken, addFavorite);
app.get('/api/user/favorites',   verifyToken, getFavorites);
app.post('/api/user/bookmarks',  verifyToken, addBookmark);
app.get('/api/user/bookmarks',   verifyToken, getBookmarks);
app.post('/api/user/history',    verifyToken, addHistory);

// ── Poets ─────────────────────────────────────────────────────────────
app.get('/api/poets', async (req, res) => {
  try {
    const { category, search, featured, era, country, limit, page } = req.query;
    let query = {};

    if (category && category !== 'all') {
      query.$or = [{ category: category }, { tags: category }];
    }
    if (era) {
      query.era = { $regex: new RegExp(era, 'i') };
    }
    if (country) {
      query.country = { $regex: new RegExp(country, 'i') };
    }
    if (search) {
      const q = new RegExp(search, 'i');
      query.$or = [
        { name: q },
        { hindi: q },
        { bio: q },
        { speciality: q }
      ];
    }
    if (featured === 'true') query.isFeatured = true;

    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    const skip = (pageNum - 1) * limitNum;

    const poets = await Poet.find(query).skip(skip).limit(limitNum).sort({ name: 1 });
    const total = await Poet.countDocuments(query);

    res.json({ success: true, count: poets.length, total, page: pageNum, data: poets });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/poets/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const poet = await Poet.findOne({ id: id });
    if (!poet) return res.status(404).json({ success: false, message: 'Poet not found' });
    
    // We can also fetch dedicated poems if they are stored separately, 
    // but in our current schema, they are part of the Poet object.
    res.json({ success: true, data: poet });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── Poems ─────────────────────────────────────────────────────────────
app.get('/api/poems', (req, res) => {
  const db = readDB();
  let poems = db.poems;
  const { form, poetId, limit, isRajan, category } = req.query;
  if (form)            poems = poems.filter(p => p.form?.toLowerCase() === form.toLowerCase());
  if (poetId)          poems = poems.filter(p => p.poetId === parseInt(poetId));
  if (isRajan === 'true') poems = poems.filter(p => p.isRajanQuote);
  if (category) {
    const catMap = { love:['prem','love','mohabbat','virah'], philosophical:['philosophy','wisdom','aphorism'], motivational:['motivation','hope','strength'], shayari:['sher','ghazal','nazm'] };
    const tags = catMap[category.toLowerCase()] || [category.toLowerCase()];
    poems = poems.filter(p => tags.some(t => (p.form||'').toLowerCase().includes(t) || (p.text||'').toLowerCase().includes(t)));
  }
  if (limit) poems = poems.slice(0, parseInt(limit));
  res.json({ success: true, count: poems.length, data: poems });
});

// Extended poems from poets' inline arrays
app.get('/api/poems/extended', (req, res) => {
  const { category } = req.query;
  const allPoems = [];
  ALL_POETS.forEach(poet => {
    if (poet.poems) {
      poet.poems.forEach((poem, i) => {
        allPoems.push({
          id: `${poet.id}_${i}`,
          poetId: poet.id,
          poet: poet.name,
          poetHindi: poet.hindi,
          text: poem.text,
          title: poem.title,
          form: poem.form,
          likes: Math.floor(Math.random()*30000)+1000
        });
      });
    }
  });
  res.json({ success: true, count: allPoems.length, data: allPoems });
});

// Category poems endpoint
app.get('/api/categories/:cat/poems', (req, res) => {
  const cat = req.params.cat.toLowerCase();
  const db = readDB();
  const catPoets = {
    love: [4,6,7], philosophical: [1,2,9,11], motivational: [1,5,12], shayari: [9,2,10],
  };
  const poetIds = catPoets[cat] || [];
  const db_poems = db.poems.filter(p => poetIds.includes(p.poetId));
  const ext_poems = [];
  ALL_POETS.filter(p => poetIds.includes(p.id) || (cat==='love' && p.speciality?.toLowerCase().includes('love'))).forEach(poet => {
    (poet.poems || []).forEach((poem, i) => {
      ext_poems.push({ id: `${poet.id}_${i}`, poetId: poet.id, poet: poet.name, ...poem, likes: Math.floor(Math.random()*20000)+1000 });
    });
  });
  res.json({ success: true, category: cat, count: db_poems.length + ext_poems.length, data: [...db_poems, ...ext_poems] });
});

app.post('/api/poems/:id/like', (req, res) => {
  const db  = readDB();
  const idx = db.poems.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.json({ success: true, data: { likes: 1000 } }); // extended poem
  db.poems[idx].likes++;
  writeDB(db);
  res.json({ success: true, data: { likes: db.poems[idx].likes } });
});

// ── Quotes ─────────────────────────────────────────────────────────────
app.get('/api/quotes', (req, res) => {
  const db = readDB();
  let quotes = db.quotes;
  if (req.query.founder === 'true') quotes = quotes.filter(q => q.isFounder);
  res.json({ success: true, count: quotes.length, data: quotes });
});
app.get('/api/quotes/daily',  (req, res) => {
  const db  = readDB();
  const day = Math.floor(Date.now() / 86400000);
  res.json({ success: true, data: db.quotes[day % db.quotes.length] });
});
app.get('/api/quotes/random', (req, res) => {
  const db = readDB();
  let q = db.quotes;
  if (req.query.founder === 'true') q = q.filter(x => x.isFounder);
  res.json({ success: true, data: q[Math.floor(Math.random() * q.length)] });
});

// ── Dictionary ─────────────────────────────────────────────────────────
app.get('/api/dictionary', async (req, res) => {
  try {
    const { search, letter, page, limit } = req.query;
    let query = {};
    
    if (search) {
      const q = new RegExp(search, 'i');
      query.$or = [{ word: q }, { hindi: q }, { meaning: q }];
    }
    if (letter) {
      query.word = { $regex: new RegExp('^' + letter, 'i') };
    }
    
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 50;
    const skip = (pageNum - 1) * limitNum;
    
    const entries = await Dictionary.find(query).skip(skip).limit(limitNum).sort({ word: 1 });
    const total = await Dictionary.countDocuments(query);
    
    res.json({ success: true, count: entries.length, total, page: pageNum, data: entries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/dictionary/:word', async (req, res) => {
  try {
    const word = req.params.word.toLowerCase().trim();
    let entry = await Dictionary.findOne({ word });
    
    if (!entry) {
      // Fuzzy search for partial match
      entry = await Dictionary.findOne({ word: { $regex: new RegExp(word, 'i') } });
      if (entry) return res.json({ success: true, fuzzy: true, data: entry });
      return res.status(404).json({ success: false, message: `"${req.params.word}" not found.` });
    }
    res.json({ success: true, data: entry });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── Library & Books ────────────────────────────────────────────────────
app.get('/api/library', async (req, res) => {
  try {
    const books = await Book.find({ isAvailable: true }).sort({ createdAt: -1 });
    res.json({ success: true, count: books.length, data: books });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

app.get('/api/library/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ success: false, message: 'Book not found' });
    res.json({ success: true, data: book });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── Blog ──────────────────────────────────────────────────────────────
app.get('/api/blog', async (req, res) => {
  try {
    // For now, returning sample static data or we could create a Blog model
    // Let's assume we'll use a Blog model later, but for now we keep it simple
    res.json({ success: true, count: 0, data: [] }); 
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── Misc ──────────────────────────────────────────────────────────────
app.get('/api/categories', async (req, res) => {
    // Categories can be derived from Poets tags or kept static
    const categories = ['classical', 'modern', 'contemporary', 'bhakti', 'urdu', 'progressive', 'romantic', 'patriotic'];
    res.json({ success: true, data: categories });
});

app.get('/api/videos', async (req, res) => {
    // Placeholder for video metadata from DB
    res.json({ success: true, data: [] });
});

app.get('/api/quiz', async (req, res) => {
    // Placeholder for quiz questions from DB
    res.json({ success: true, data: [] });
});

// ── Search ─────────────────────────────────────────────────────────────
app.get('/api/search', async (req, res) => {
  const { q } = req.query;
  if (!q) return res.json({ success: true, data: [] });
  
  try {
    const query = new RegExp(q, 'i');
    
    // Search Poets
    const poets = await Poet.find({
      $or: [
        { name: query },
        { hindi: query },
        { bio: query },
        { speciality: query }
      ]
    }).limit(10);

    // Search Dictionary
    const dict = await Dictionary.find({
      $or: [
        { word: query },
        { hindi: query },
        { meaning: query }
      ]
    }).limit(10);

    const results = [
      ...poets.map(p => ({ type: 'poet', label: p.name, sublabel: p.hindi || p.period, id: p.id, icon: 'feather-alt' })),
      ...dict.map(d => ({ type: 'word', label: d.word, sublabel: d.hindi, id: d.word, icon: 'book' }))
    ];

    res.json({ success: true, count: results.length, data: results.slice(0, 15) });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── Chatbot ────────────────────────────────────────────────────────────
const { generateResponse } = require('./routes/chatbot');
app.post('/api/chatbot/message', async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string')
    return res.status(400).json({ success: false, message: 'Message is required' });
  try {
    // For chatbot, we'll pass a snippet of data as context or let it fetch independently
    const samplePoets = await Poet.find().limit(20);
    const response = await generateResponse(message.trim(), { poets: samplePoets });
    res.json({ success: true, data: response });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Sakhi encountered an error. Please try again.' });
  }
});

// ── Founder ────────────────────────────────────────────────────────────
app.get('/api/founder', async (req, res) => {
  try {
    const founder = await Poet.findOne({ tags: 'founder' });
    res.json({ success: true, data: founder });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── Newsletter ─────────────────────────────────────────────────────────
app.post('/api/subscribe', (req, res) => {
  const { email } = req.body;
  if (!email?.includes('@')) return res.status(400).json({ success: false, message: 'Invalid email.' });
  const db = readDB();
  if (!db.subscribers) db.subscribers = [];
  if (db.subscribers.includes(email)) return res.json({ success: false, message: 'Already subscribed!' });
  db.subscribers.push(email);
  writeDB(db);
  res.json({ success: true, message: 'Welcome to Niharika! You are now subscribed.' });
});

// ── Poet Letters (A-Z) ──────────────────────────────────────────────────
app.get('/api/poets/letters', async (req, res) => {
  try {
    const poets = await Poet.find({}, 'name');
    const letters = {};
    poets.forEach(p => {
      const l = p.name.charAt(0).toUpperCase();
      if (!letters[l]) letters[l] = 0;
      letters[l]++;
    });
    res.json({ success: true, data: letters });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ── 404 API ───────────────────────────────────────────────────────────
app.use('/api/*', (req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// ── Start ──────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n  ======================================');
  console.log('    NIHARIKA SERVER v3.0 RUNNING');
  console.log('  ======================================');
  console.log(`\n  Frontend : http://localhost:${PORT}`);
  console.log(`  API      : http://localhost:${PORT}/api/`);
  console.log(`  Auth     : http://localhost:${PORT}/api/auth/`);
  buildMergedData();
  console.log('\n  Ready!\n');
});
