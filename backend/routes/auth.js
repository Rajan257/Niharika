// backend/routes/auth.js - Niharika Authentication Routes
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const fs     = require('fs');
const path   = require('path');

const DB_PATH  = path.join(__dirname, '..', 'db.json');
const JWT_SECRET = 'niharika_sakhi_secret_2025_rajan_rai';

const readDB  = () => JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
const writeDB = (d) => fs.writeFileSync(DB_PATH, JSON.stringify(d, null, 2));

const verifyToken = (req, res, next) => {
  const auth = req.headers.authorization;
  if (!auth || !auth.startsWith('Bearer '))
    return res.status(401).json({ success: false, message: 'No token provided.' });
  try {
    req.user = jwt.verify(auth.slice(7), JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ success: false, message: 'Invalid or expired token.' });
  }
};

const register = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ success: false, message: 'Name, email, and password are required.' });
  if (password.length < 6)
    return res.status(400).json({ success: false, message: 'Password must be at least 6 characters.' });
  if (!email.includes('@'))
    return res.status(400).json({ success: false, message: 'Invalid email address.' });

  const db = readDB();
  if (!db.users) db.users = [];
  if (db.users.find(u => u.email === email.toLowerCase()))
    return res.status(409).json({ success: false, message: 'An account with this email already exists.' });

  const hashed = await bcrypt.hash(password, 10);
  const newUser = {
    id: Date.now(),
    name: name.trim(),
    email: email.toLowerCase().trim(),
    password: hashed,
    createdAt: new Date().toISOString(),
    favorites: [],
    bookmarks: [],
    readingHistory: [],
    avatar: name.trim().charAt(0).toUpperCase()
  };
  db.users.push(newUser);
  writeDB(db);

  const token = jwt.sign({ id: newUser.id, email: newUser.email, name: newUser.name }, JWT_SECRET, { expiresIn: '30d' });
  const { password: _, ...safeUser } = newUser;
  res.status(201).json({ success: true, message: 'Welcome to Niharika!', token, user: safeUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Email and password are required.' });

  const db = readDB();
  if (!db.users) db.users = [];
  const user = db.users.find(u => u.email === email.toLowerCase());
  if (!user) return res.status(401).json({ success: false, message: 'No account found with this email.' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ success: false, message: 'Incorrect password.' });

  const token = jwt.sign({ id: user.id, email: user.email, name: user.name }, JWT_SECRET, { expiresIn: '30d' });
  const { password: _, ...safeUser } = user;
  res.json({ success: true, message: `Welcome back, ${user.name}!`, token, user: safeUser });
};

const getMe = (req, res) => {
  const db   = readDB();
  const user = db.users?.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
  const { password: _, ...safeUser } = user;
  res.json({ success: true, data: safeUser });
};

const addFavorite = (req, res) => {
  const { poemId, poemText, poet } = req.body;
  const db   = readDB();
  const idx  = db.users?.findIndex(u => u.id === req.user.id);
  if (idx === -1) return res.status(404).json({ success: false, message: 'User not found.' });
  if (!db.users[idx].favorites) db.users[idx].favorites = [];
  const exists = db.users[idx].favorites.find(f => f.poemId === poemId);
  if (exists) {
    db.users[idx].favorites = db.users[idx].favorites.filter(f => f.poemId !== poemId);
    writeDB(db);
    return res.json({ success: true, action: 'removed', message: 'Removed from favorites.' });
  }
  db.users[idx].favorites.unshift({ poemId, poemText, poet, savedAt: new Date().toISOString() });
  writeDB(db);
  res.json({ success: true, action: 'added', message: 'Added to favorites!' });
};

const getFavorites = (req, res) => {
  const db   = readDB();
  const user = db.users?.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ success: false });
  res.json({ success: true, data: user.favorites || [] });
};

const addBookmark = (req, res) => {
  const { poetId, poetName } = req.body;
  const db   = readDB();
  const idx  = db.users?.findIndex(u => u.id === req.user.id);
  if (idx === -1) return res.status(404).json({ success: false });
  if (!db.users[idx].bookmarks) db.users[idx].bookmarks = [];
  const exists = db.users[idx].bookmarks.find(b => b.poetId === poetId);
  if (exists) {
    db.users[idx].bookmarks = db.users[idx].bookmarks.filter(b => b.poetId !== poetId);
    writeDB(db);
    return res.json({ success: true, action: 'removed', message: 'Bookmark removed.' });
  }
  db.users[idx].bookmarks.unshift({ poetId, poetName, savedAt: new Date().toISOString() });
  writeDB(db);
  res.json({ success: true, action: 'added', message: 'Poet bookmarked!' });
};

const getBookmarks = (req, res) => {
  const db   = readDB();
  const user = db.users?.find(u => u.id === req.user.id);
  if (!user) return res.status(404).json({ success: false });
  res.json({ success: true, data: user.bookmarks || [] });
};

const addHistory = (req, res) => {
  const { poetId, poetName } = req.body;
  const db   = readDB();
  const idx  = db.users?.findIndex(u => u.id === req.user.id);
  if (idx === -1) return res.status(404).json({ success: false });
  if (!db.users[idx].readingHistory) db.users[idx].readingHistory = [];
  db.users[idx].readingHistory = db.users[idx].readingHistory.filter(h => h.poetId !== poetId);
  db.users[idx].readingHistory.unshift({ poetId, poetName, visitedAt: new Date().toISOString() });
  if (db.users[idx].readingHistory.length > 20)
    db.users[idx].readingHistory = db.users[idx].readingHistory.slice(0, 20);
  writeDB(db);
  res.json({ success: true, message: 'History updated.' });
};

module.exports = { register, login, getMe, verifyToken, addFavorite, getFavorites, addBookmark, getBookmarks, addHistory };
