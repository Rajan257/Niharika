// backend/server.js - Niharika API Server v3.0
// Complete upgrade with auth, extended data, voice chatbot

require('dotenv').config();
const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');

const app    = express();
const PORT   = 5000;
const DB_PATH = path.join(__dirname, 'db.json');

// ── Middleware ──────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// ── DB Helpers ──────────────────────────────────────────────────────────
const readDB  = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// ── Extended Data (loaded once at startup) ──────────────────────────────
const { EXTENDED_POETS }      = require('./data/poets-extended');
const { EXTENDED_DICTIONARY } = require('./data/dictionary-extended');

// Build merged poet list (db.json poets + extended poets)
let ALL_POETS = [];
let ALL_DICTIONARY = {};

function buildMergedData() {
  const db = readDB();
  const existingIds = new Set(db.poets.map(p => p.id));
  const newPoets = EXTENDED_POETS.filter(p => !existingIds.has(p.id));
  ALL_POETS = [...db.poets, ...newPoets];
  ALL_DICTIONARY = { ...db.dictionary, ...EXTENDED_DICTIONARY };
  console.log(`  Poets loaded   : ${ALL_POETS.length}`);
  console.log(`  Dict entries   : ${Object.keys(ALL_DICTIONARY).length}`);
}

buildMergedData();

// ── Health ────────────────────────────────────────────────────────────  
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', platform: 'Niharika', version: '3.0.0',
    stats: { poets: ALL_POETS.length, dictionary: Object.keys(ALL_DICTIONARY).length },
    timestamp: new Date().toISOString() });
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
app.get('/api/poets', (req, res) => {
  let poets = [...ALL_POETS];
  const { category, search, featured, era, country, limit, page } = req.query;
  if (category && category !== 'all')
    poets = poets.filter(p => p.category === category || p.tags?.includes(category));
  if (era)
    poets = poets.filter(p => p.era?.toLowerCase() === era.toLowerCase() || p.category?.toLowerCase() === era.toLowerCase());
  if (country)
    poets = poets.filter(p => p.country?.toLowerCase().includes(country.toLowerCase()));
  if (search) {
    const q = search.toLowerCase();
    poets = poets.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.hindi || '').includes(q) ||
      (p.bio  || '').toLowerCase().includes(q) ||
      (p.speciality || '').toLowerCase().includes(q)
    );
  }
  if (featured === 'true') poets = poets.filter(p => p.isFeatured);
  
  const total = poets.length;
  const pageNum  = parseInt(page)  || 1;
  const limitNum = parseInt(limit) || poets.length;
  const start = (pageNum - 1) * limitNum;
  const paged = poets.slice(start, start + limitNum);
  
  res.json({ success: true, count: paged.length, total, page: pageNum, data: paged });
});

app.get('/api/poets/:id', (req, res) => {
  const db   = readDB();
  const id   = parseInt(req.params.id);
  const poet = ALL_POETS.find(p => p.id === id);
  if (!poet) return res.status(404).json({ success: false, message: 'Poet not found' });
  
  // Get poems from db.json or from poet's own poems array
  const dbPoems = db.poems.filter(p => p.poetId === id);
  const inlinePoems = (poet.poems || []).map((p, i) => ({ id: `${id}_${i}`, poetId: id, poet: poet.name, ...p, likes: p.likes || Math.floor(Math.random()*20000)+1000 }));
  const allPoems = [...dbPoems, ...(dbPoems.length ? [] : inlinePoems)];
  
  const quotes = poet.quotes || (poet.tags?.includes('founder') ? db.quotes.filter(q => q.isFounder) : []);
  res.json({ success: true, data: { ...poet, poems: allPoems, quotes } });
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
app.get('/api/dictionary', (req, res) => {
  const { search, letter, page, limit } = req.query;
  let entries = Object.entries(ALL_DICTIONARY);
  if (search) {
    const q = search.toLowerCase();
    entries = entries.filter(([k, v]) =>
      k.includes(q) || v.word?.toLowerCase().includes(q) ||
      (v.hindi || '').includes(q) || (v.meaning || '').toLowerCase().includes(q)
    );
  }
  if (letter) entries = entries.filter(([k]) => k.startsWith(letter.toLowerCase()));
  const total = entries.length;
  const pageNum  = parseInt(page)  || 1;
  const limitNum = parseInt(limit) || 50;
  const start = (pageNum - 1) * limitNum;
  const paged = entries.slice(start, start + limitNum);
  res.json({ success: true, count: paged.length, total, page: pageNum,
    data: paged.map(([k, v]) => ({ key: k, ...v })) });
});

app.get('/api/dictionary/:word', (req, res) => {
  const key   = req.params.word.toLowerCase().trim();
  const entry = ALL_DICTIONARY[key];
  if (!entry) {
    // Fuzzy search
    const fuzzy = Object.entries(ALL_DICTIONARY).find(([k]) => k.includes(key) || key.includes(k));
    if (fuzzy) return res.json({ success: true, fuzzy: true, data: { key: fuzzy[0], ...fuzzy[1] } });
    return res.status(404).json({ success: false, message: `"${req.params.word}" not found in dictionary.` });
  }
  res.json({ success: true, data: { key, ...entry } });
});

// ── Blog ──────────────────────────────────────────────────────────────
app.get('/api/blog', (req, res) => {
  const db = readDB();
  let posts = db.blog;
  if (req.query.limit) posts = posts.slice(0, parseInt(req.query.limit));
  res.json({ success: true, count: posts.length, data: posts });
});

// ── Misc ──────────────────────────────────────────────────────────────
app.get('/api/categories', (req, res) => res.json({ success: true, data: readDB().categories }));
app.get('/api/videos',     (req, res) => res.json({ success: true, data: readDB().videos }));
app.get('/api/quiz',       (req, res) => {
  const quiz = [...readDB().quiz].sort(() => Math.random() - 0.5);
  res.json({ success: true, data: quiz });
});

// ── Search ─────────────────────────────────────────────────────────────
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.json({ success: true, data: [] });
  const db    = readDB();
  const query = q.toLowerCase();
  const results = [];

  ALL_POETS.forEach(p => {
    if (p.name.toLowerCase().includes(query) || (p.hindi || '').includes(query) || (p.bio||'').toLowerCase().includes(query))
      results.push({ type: 'poet', label: p.name, sublabel: p.hindi || p.period, id: p.id, icon: 'feather-alt' });
  });
  db.poems.forEach(p => {
    if (p.text.toLowerCase().includes(query) || p.poet.toLowerCase().includes(query))
      results.push({ type: 'poem', label: p.text.slice(0, 60) + '...', sublabel: '- ' + p.poet, id: p.id, icon: 'scroll' });
  });
  Object.entries(ALL_DICTIONARY).forEach(([k, v]) => {
    if (k.includes(query) || (v.word||'').toLowerCase().includes(query) || (v.meaning||'').toLowerCase().includes(query))
      results.push({ type: 'word', label: v.word, sublabel: v.hindi, key: k, icon: 'book' });
  });
  db.quotes.forEach(q2 => {
    if (q2.text.toLowerCase().includes(query) || q2.author.toLowerCase().includes(query))
      results.push({ type: 'quote', label: q2.text.slice(0, 60) + '...', sublabel: '- ' + q2.author, icon: 'quote-left' });
  });

  res.json({ success: true, count: results.length, data: results.slice(0, 10) });
});

// ── Chatbot ────────────────────────────────────────────────────────────
const { generateResponse } = require('./routes/chatbot');
app.post('/api/chatbot/message', async (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string')
    return res.status(400).json({ success: false, message: 'Message is required' });
  try {
    const response = await generateResponse(message.trim(), { poets: ALL_POETS, dictionary: ALL_DICTIONARY });
    res.json({ success: true, data: response });
  } catch (e) {
    console.error(e);
    res.status(500).json({ success: false, message: 'Sakhi encountered an error. Please try again.' });
  }
});

// ── Founder ────────────────────────────────────────────────────────────
app.get('/api/founder', (req, res) => {
  const db      = readDB();
  const founder = ALL_POETS.find(p => p.tags?.includes('founder'));
  const poems   = db.poems.filter(p => p.isRajanQuote);
  const quotes  = db.quotes.filter(q => q.isFounder);
  res.json({ success: true, data: { ...founder, poems, quotes } });
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
app.get('/api/poets/letters', (req, res) => {
  const letters = {};
  ALL_POETS.forEach(p => {
    const l = p.name.charAt(0).toUpperCase();
    if (!letters[l]) letters[l] = 0;
    letters[l]++;
  });
  res.json({ success: true, data: letters });
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
