// backend/server.js — Niharika API Server v2.0

const express = require('express');
const cors    = require('cors');
const path    = require('path');
const fs      = require('fs');

const app    = express();
const PORT   = 5000;
const DB_PATH = path.join(__dirname, 'db.json');

// ── Middleware ──────────────────────────────────────
app.use(cors());
app.use(express.json());

// Serve frontend from the ../frontend folder
app.use(express.static(path.join(__dirname, '..', 'frontend')));

// ── DB Helpers ──────────────────────────────────────
const readDB  = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
const writeDB = (data) => fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));

// ── Health ──────────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', platform: 'Niharika', version: '2.0.0', timestamp: new Date().toISOString() });
});

// ── Poets ────────────────────────────────────────────
app.get('/api/poets', (req, res) => {
  const db = readDB();
  let poets = db.poets;
  const { category, search, featured } = req.query;
  if (category && category !== 'all')
    poets = poets.filter(p => p.category === category || p.tags?.includes(category));
  if (search) {
    const q = search.toLowerCase();
    poets = poets.filter(p => p.name.toLowerCase().includes(q) || (p.hindi || '').includes(q));
  }
  if (featured === 'true') poets = poets.filter(p => p.isFeatured);
  res.json({ success: true, count: poets.length, data: poets });
});

app.get('/api/poets/:id', (req, res) => {
  const db   = readDB();
  const poet = db.poets.find(p => p.id === parseInt(req.params.id));
  if (!poet) return res.status(404).json({ success: false, message: 'Poet not found' });
  const poems  = db.poems.filter(p => p.poetId === poet.id);
  const quotes = poet.tags?.includes('founder') ? db.quotes.filter(q => q.isFounder) : [];
  res.json({ success: true, data: { ...poet, poems, quotes } });
});

// ── Poems ────────────────────────────────────────────
app.get('/api/poems', (req, res) => {
  const db = readDB();
  let poems = db.poems;
  const { form, poetId, limit, isRajan } = req.query;
  if (form)            poems = poems.filter(p => p.form.toLowerCase() === form.toLowerCase());
  if (poetId)          poems = poems.filter(p => p.poetId === parseInt(poetId));
  if (isRajan === 'true') poems = poems.filter(p => p.isRajanQuote);
  if (limit)           poems = poems.slice(0, parseInt(limit));
  res.json({ success: true, count: poems.length, data: poems });
});

app.post('/api/poems/:id/like', (req, res) => {
  const db  = readDB();
  const idx = db.poems.findIndex(p => p.id === parseInt(req.params.id));
  if (idx === -1) return res.status(404).json({ success: false });
  db.poems[idx].likes++;
  writeDB(db);
  res.json({ success: true, data: { likes: db.poems[idx].likes } });
});

// ── Quotes ───────────────────────────────────────────
app.get('/api/quotes', (req, res) => {
  const db = readDB();
  let quotes = db.quotes;
  if (req.query.founder === 'true') quotes = quotes.filter(q => q.isFounder);
  res.json({ success: true, count: quotes.length, data: quotes });
});

app.get('/api/quotes/daily', (req, res) => {
  const db  = readDB();
  const day = Math.floor(Date.now() / 86400000);
  res.json({ success: true, data: db.quotes[day % db.quotes.length] });
});

app.get('/api/quotes/random', (req, res) => {
  const db = readDB();
  let quotes = db.quotes;
  if (req.query.founder === 'true') quotes = quotes.filter(q => q.isFounder);
  res.json({ success: true, data: quotes[Math.floor(Math.random() * quotes.length)] });
});

// ── Dictionary ───────────────────────────────────────
app.get('/api/dictionary', (req, res) => {
  const db    = readDB();
  const words = Object.entries(db.dictionary).map(([key, val]) => ({ key, ...val }));
  res.json({ success: true, count: words.length, data: words });
});

app.get('/api/dictionary/:word', (req, res) => {
  const db  = readDB();
  const key = req.params.word.toLowerCase().trim();
  const entry = db.dictionary[key];
  if (!entry) return res.status(404).json({ success: false, message: `"${req.params.word}" not found` });
  res.json({ success: true, data: { key, ...entry } });
});

// ── Blog ─────────────────────────────────────────────
app.get('/api/blog', (req, res) => {
  const db = readDB();
  let posts = db.blog;
  if (req.query.limit) posts = posts.slice(0, parseInt(req.query.limit));
  res.json({ success: true, count: posts.length, data: posts });
});

// ── Misc ─────────────────────────────────────────────
app.get('/api/categories', (req, res) => res.json({ success: true, data: readDB().categories }));
app.get('/api/videos',     (req, res) => res.json({ success: true, data: readDB().videos }));
app.get('/api/quiz',       (req, res) => {
  const quiz = [...readDB().quiz].sort(() => Math.random() - 0.5);
  res.json({ success: true, data: quiz });
});

// ── Search ───────────────────────────────────────────
app.get('/api/search', (req, res) => {
  const { q } = req.query;
  if (!q) return res.json({ success: true, data: [] });
  const db      = readDB();
  const query   = q.toLowerCase();
  const results = [];
  db.poets.forEach(p => {
    if (p.name.toLowerCase().includes(query) || (p.hindi || '').includes(query))
      results.push({ type: 'poet', label: p.name, sublabel: p.hindi, id: p.id, icon: 'feather-alt' });
  });
  db.poems.forEach(p => {
    if (p.text.toLowerCase().includes(query) || p.poet.toLowerCase().includes(query))
      results.push({ type: 'poem', label: p.text.slice(0, 55) + '...', sublabel: p.poet, id: p.id, icon: 'scroll' });
  });
  Object.entries(db.dictionary).forEach(([k, v]) => {
    if (k.includes(query) || v.word.toLowerCase().includes(query))
      results.push({ type: 'word', label: v.word, sublabel: v.hindi, key: k, icon: 'book' });
  });
  res.json({ success: true, count: results.length, data: results.slice(0, 8) });
});

// ── Chatbot ──────────────────────────────────────────
const { generateResponse } = require('./routes/chatbot');

app.post('/api/chatbot/message', (req, res) => {
  const { message } = req.body;
  if (!message || typeof message !== 'string')
    return res.status(400).json({ success: false, message: 'Message is required' });
  try {
    const response = generateResponse(message.trim());
    res.json({ success: true, data: response });
  } catch (e) {
    res.status(500).json({ success: false, message: 'Sakhi encountered an error. Please try again.' });
  }
});

// ── Founder ──────────────────────────────────────────
app.get('/api/founder', (req, res) => {
  const db      = readDB();
  const founder = db.poets.find(p => p.tags?.includes('founder'));
  const poems   = db.poems.filter(p => p.isRajanQuote);
  const quotes  = db.quotes.filter(q => q.isFounder);
  res.json({ success: true, data: { ...founder, poems, quotes } });
});

// ── Newsletter ───────────────────────────────────────
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

// ── 404 API ──────────────────────────────────────────
app.use('/api/*', (req, res) => res.status(404).json({ success: false, message: 'Route not found' }));

// ── Start ─────────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n  ════════════════════════════════════');
  console.log('    NIHARIKA SERVER v2.0 RUNNING');
  console.log('  ════════════════════════════════════');
  console.log(`\n  Frontend : http://localhost:${PORT}`);
  console.log(`  API      : http://localhost:${PORT}/api/`);
  console.log(`  Chatbot  : http://localhost:${PORT}/api/chatbot/message`);
  console.log(`  Health   : http://localhost:${PORT}/api/health\n`);
});
