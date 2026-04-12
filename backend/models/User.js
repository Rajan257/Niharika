const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, unique: true, sparse: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' },
    isVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },
    profilePictureUrl: { type: String },
    favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poem' }],
    likedPoets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Poet' }],
    bio: String,
    avatar: String // Initials fallback
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
