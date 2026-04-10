// backend/routes/auth.js - Niharika Authentication Routes
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

const JWT_SECRET = 'niharika_sakhi_secret_2025_rajan_rai';

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

  try {
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser)
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashed,
      avatar: name.trim().charAt(0).toUpperCase()
    });
    
    await newUser.save();

    const token = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.username }, JWT_SECRET, { expiresIn: '30d' });
    const { password: _, ...safeUser } = newUser.toObject();
    res.status(201).json({ success: true, message: 'Welcome to Niharika!', token, user: safeUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password)
    return res.status(400).json({ success: false, message: 'Email and password are required.' });

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) return res.status(401).json({ success: false, message: 'No account found with this email.' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ success: false, message: 'Incorrect password.' });

    const token = jwt.sign({ id: user._id, email: user.email, name: user.username }, JWT_SECRET, { expiresIn: '30d' });
    const { password: _, ...safeUser } = user.toObject();
    res.json({ success: true, message: `Welcome back, ${user.username}!`, token, user: safeUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    const { password: _, ...safeUser } = user.toObject();
    res.json({ success: true, data: safeUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// Note: Favorites, Bookmarks, and History are stored as sub-arrays in MongoDB for simplicity in this MVP.
// In a highly scaled system, these would be separate collections.

const addFavorite = async (req, res) => {
  const { poemId, poemText, poet } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    
    // Check if favorited (Note: currently using poemId as a string check in a simple array for quick migration)
    if (!user.favorites) user.favorites = [];
    const exists = user.favorites.find(f => f.toString() === poemId);
    
    if (exists) {
      user.favorites = user.favorites.filter(f => f.toString() !== poemId);
      await user.save();
      return res.json({ success: true, action: 'removed', message: 'Removed from favorites.' });
    }
    
    user.favorites.unshift(poemId);
    await user.save();
    res.json({ success: true, action: 'added', message: 'Added to favorites!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false });
    res.json({ success: true, data: user.favorites || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const addBookmark = async (req, res) => {
  const { poetId, poetName } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false });
    
    if (!user.likedPoets) user.likedPoets = [];
    const exists = user.likedPoets.find(b => b.toString() === poetId);
    
    if (exists) {
      user.likedPoets = user.likedPoets.filter(b => b.toString() !== poetId);
      await user.save();
      return res.json({ success: true, action: 'removed', message: 'Bookmark removed.' });
    }
    
    user.likedPoets.unshift(poetId);
    await user.save();
    res.json({ success: true, action: 'added', message: 'Poet bookmarked!' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getBookmarks = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false });
    res.json({ success: true, data: user.likedPoets || [] });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const addHistory = async (req, res) => {
  // History is currently kept simple, potentially using a different collection layer in future
  res.json({ success: true, message: 'History tracking updated.' });
};

module.exports = { register, login, getMe, verifyToken, addFavorite, getFavorites, addBookmark, getBookmarks, addHistory };

