const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// REGISTER - POST /api/auth/register
router.post('/register', async function(req, res) {
  try {
    // Get data from request body
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;

    // Check all fields are provided
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Check if user with this email already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password before saving
    // 10 is the salt rounds - higher = more secure but slower
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name: name,
      email: email,
      password: hashedPassword
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: 'Account created successfully!' });

  } catch (err) {
    console.log('Register error:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// LOGIN - POST /api/auth/login
router.post('/login', async function(req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    // Check fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Find user by email
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare entered password with stored hashed password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Create JWT token
    // This token will be stored in the browser and sent with every request
    const token = jwt.sign(
      { userId: user._id, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }  // token expires in 7 days
    );

    // Send token and user info back
    res.json({
      message: 'Login successful!',
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.log('Login error:', err.message);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

module.exports = router;
