const mongoose = require('mongoose');

// Task schema - defines what a task looks like
const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true,
    default: ''
  },
  isCompleted: {
    type: Boolean,
    default: false  // new tasks start as not completed
  },
  // Each task belongs to a user
  // We store the user's ID here
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
