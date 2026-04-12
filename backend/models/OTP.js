const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  otp: {
    type: String,
    required: true
  },
  expiresAt: {
    type: Date,
    required: true,
    index: { expires: '0s' } // MongoDB TTL index to auto-delete when current time >= expiresAt
  }
}, { timestamps: true });

module.exports = mongoose.model('OTP', otpSchema);
