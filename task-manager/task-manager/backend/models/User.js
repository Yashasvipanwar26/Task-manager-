const mongoose = require('mongoose');

// User schema - defines what a user document looks like
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,  // no two users can have same email
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create model from schema
const User = mongoose.model('User', userSchema);

module.exports = User;
