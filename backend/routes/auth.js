// backend/routes/auth.js - Niharika Authentication Routes
const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const path   = require('path');
const multer = require('multer');
const User   = require('../models/User');
const OTP    = require('../models/OTP');
const { sendOtpEmail, sendPasswordResetEmail } = require('../utils/mailer');

const JWT_SECRET = 'niharika_sakhi_secret_2025_rajan_rai';

// ── Multer Configuration for Profile Pictures ──────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, 'avatar-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) cb(null, true);
    else cb(new Error('Only images are allowed'));
  }
});

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

const requestSignupOTP = async (req, res) => {
  const { email, name } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });

  try {
    // Check if verified user exists
    const existing = await User.findOne({ email: email.toLowerCase(), isVerified: true });
    if (existing) return res.status(409).json({ success: false, message: 'This email is already registered and verified.' });

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes

    // Store in OTP collection (upsert based on email)
    await OTP.findOneAndUpdate(
      { email: email.toLowerCase() },
      { otp, expiresAt },
      { upsert: true, new: true }
    );

    // Send Email
    const mailResult = await sendOtpEmail(email.toLowerCase(), otp, name || 'User');
    if (!mailResult.success) {
      console.error("[AUTH] Mail Error:", mailResult.error);
      return res.status(500).json({ success: false, message: 'Failed to send OTP email. Please try again later.' });
    }

    res.json({ success: true, message: 'OTP sent to your email! Valid for 5 minutes.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const register = async (req, res) => {
  const { name, email, phone, password, otp } = req.body;
  
  if (!name || !email || !password || !otp)
    return res.status(400).json({ success: false, message: 'All fields including OTP are required.' });
  
  try {
    // 1. Verify OTP first
    const otpDoc = await OTP.findOne({ email: email.toLowerCase() });
    
    if (!otpDoc) 
      return res.status(400).json({ success: false, message: 'OTP expired or not requested. Please request a new one.' });
    
    if (otpDoc.otp !== otp)
      return res.status(400).json({ success: false, message: 'Invalid OTP. Please check and try again.' });

    // 2. Check if user already exists
    const existingEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingEmail && existingEmail.isVerified)
      return res.status(409).json({ success: false, message: 'An account with this email already exists.' });

    // 3. Clear existing unverified user if any (to avoid dupe key errors)
    if (existingEmail) await User.deleteOne({ email: email.toLowerCase() });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = new User({
      username: name.trim(),
      email: email.toLowerCase().trim(),
      phone: phone || null,
      password: hashed,
      isVerified: true, // AUTO VERIFY because OTP was valid
      avatar: name.trim().charAt(0).toUpperCase(),
      bio: 'Poetry lover exploring Niharika...'
    });
    
    await newUser.save();

    // 4. Delete the OTP after successful use
    await OTP.deleteOne({ email: email.toLowerCase() });

    // 5. Auto login by providing token
    const token = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.username }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({ 
      success: true, 
      message: 'Account created and verified successfully!',
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        phone: newUser.phone,
        avatar: newUser.avatar,
        bio: newUser.bio,
        createdAt: newUser.createdAt
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const verifyOtp = async (req, res) => {
  // Logic moved to register route
  res.status(410).json({ success: false, message: 'This endpoint is deprecated.' });
};

const login = async (req, res) => {
  const { identifier, password } = req.body; // identifier can be email or phone
  if (!identifier || !password)
    return res.status(400).json({ success: false, message: 'Login identifier and password are required.' });

  try {
    const query = identifier.includes('@') 
      ? { email: identifier.toLowerCase().trim() } 
      : { phone: identifier.trim() };

    const user = await User.findOne(query);
    if (!user) return res.status(401).json({ success: false, message: 'No account found with these credentials.' });

    if (!user.isVerified)
      return res.status(403).json({ success: false, message: 'Please verify your account first.', unverified: true, email: user.email });

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
  // History is currently kept simple
  res.json({ success: true, message: 'History tracking updated.' });
};

const updateProfile = async (req, res) => {
  const { name, phone, bio } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    if (name) user.username = name.trim();
    if (phone) user.phone = phone.trim();
    if (bio !== undefined) user.bio = bio.trim();
    
    if (req.file) {
      user.profilePictureUrl = `/uploads/${req.file.filename}`;
    }

    await user.save();
    const { password: _, ...safeUser } = user.toObject();
    res.json({ success: true, message: 'Profile updated successfully!', user: safeUser });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const resendOtp = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });
    if (user.isVerified) return res.status(400).json({ success: false, message: 'Account already verified.' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    await sendOtpEmail(user.email, otp, user.username);
    res.json({ success: true, message: 'A new OTP has been sent to your email.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ success: false, message: 'Email is required.' });

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 15 * 60 * 1000); // 15 mins for reset
    await user.save();

    await sendPasswordResetEmail(user.email, otp, user.username);
    res.json({ success: true, message: 'Password reset code sent to your email.' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;
  if (!email || !otp || !newPassword)
    return res.status(400).json({ success: false, message: 'All fields are required.' });

  try {
    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) return res.status(404).json({ success: false, message: 'User not found.' });

    if (user.otp !== otp || user.otpExpires < Date.now())
      return res.status(400).json({ success: false, message: 'Invalid or expired code.' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = jwt.sign({ id: user._id, email: user.email, name: user.username }, JWT_SECRET, { expiresIn: '7d' });
    const { password: _, ...safeUser } = user.toObject();

    res.json({ 
      success: true, 
      message: 'Password reset successfully! Logging you in...', 
      token, 
      user: safeUser 
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { 
  register, verifyOtp, login, getMe, verifyToken, requestSignupOTP,
  updateProfile, upload, resendOtp, forgotPassword, resetPassword,
  addFavorite, getFavorites, addBookmark, getBookmarks, addHistory 
};

