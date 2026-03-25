const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const authMiddleware = require('../middleware/authMiddleware');

// All task routes are protected - user must be logged in
// authMiddleware runs before every route below

// GET ALL TASKS - GET /api/tasks
router.get('/', authMiddleware, async function(req, res) {
  try {
    // Find all tasks that belong to the logged-in user
    // req.user.userId comes from the JWT token (set in authMiddleware)
    const tasks = await Task.find({ user: req.user.userId });

    res.json(tasks);

  } catch (err) {
    console.log('Get tasks error:', err.message);
    res.status(500).json({ message: 'Could not get tasks' });
  }
});

// CREATE TASK - POST /api/tasks
router.post('/', authMiddleware, async function(req, res) {
  try {
    const title = req.body.title;
    const description = req.body.description;

    // Title is required
    if (!title) {
      return res.status(400).json({ message: 'Task title is required' });
    }

    // Create new task and link it to the logged-in user
    const newTask = new Task({
      title: title,
      description: description,
      user: req.user.userId
    });

    // Save to database
    const savedTask = await newTask.save();

    res.status(201).json(savedTask);

  } catch (err) {
    console.log('Create task error:', err.message);
    res.status(500).json({ message: 'Could not create task' });
  }
});

// UPDATE TASK - PUT /api/tasks/:id
router.put('/:id', authMiddleware, async function(req, res) {
  try {
    const taskId = req.params.id;

    // Find the task first
    const task = await Task.findById(taskId);

    // Check if task exists
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Check if this task belongs to the logged-in user
    // We convert to string because one is ObjectId and other is string
    if (task.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not allowed to update this task' });
    }

    // Update the task
    const updatedTask = await Task.findByIdAndUpdate(
      taskId,
      {
        title: req.body.title || task.title,
        description: req.body.description || task.description,
        isCompleted: req.body.isCompleted !== undefined ? req.body.isCompleted : task.isCompleted
      },
      { new: true }  // return updated task
    );

    res.json(updatedTask);

  } catch (err) {
    console.log('Update task error:', err.message);
    res.status(500).json({ message: 'Could not update task' });
  }
});

// DELETE TASK - DELETE /api/tasks/:id
router.delete('/:id', authMiddleware, async function(req, res) {
  try {
    const taskId = req.params.id;

    // Find the task
    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    // Make sure task belongs to this user
    if (task.user.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not allowed to delete this task' });
    }

    // Delete the task
    await Task.findByIdAndDelete(taskId);

    res.json({ message: 'Task deleted successfully' });

  } catch (err) {
    console.log('Delete task error:', err.message);
    res.status(500).json({ message: 'Could not delete task' });
  }
});

module.exports = router;
