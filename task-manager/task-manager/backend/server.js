// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

// Create express app
const app = express();

// Middlewares
app.use(cors());
app.use(express.json()); // so we can read req.body

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(function() {
    console.log('Connected to MongoDB!');
  })
  .catch(function(err) {
    console.log('MongoDB connection error:', err.message);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);

// Simple test route
app.get('/', function(req, res) {
  res.json({ message: 'Task Manager API is running!' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, function() {
  console.log('Server is running on port ' + PORT);
});
