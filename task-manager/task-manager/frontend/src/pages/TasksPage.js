import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import TaskCard from '../components/TaskCard';
import AddTaskForm from '../components/AddTaskForm';
import './TasksPage.css';

function TasksPage() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Get logged-in user info from localStorage
  const user = JSON.parse(localStorage.getItem('user'));
  const token = localStorage.getItem('token');

  // Create axios config with token in headers
  // This is needed for all protected API calls
  const config = {
    headers: {
      Authorization: 'Bearer ' + token
    }
  };

  // Load tasks when page first opens
  useEffect(function() {
    fetchTasks();
  }, []);

  // Get all tasks from backend
  async function fetchTasks() {
    try {
      const response = await axios.get('/api/tasks', config);
      setTasks(response.data);
    } catch (err) {
      setError('Could not load tasks');
    }
    setLoading(false);
  }

  // Add new task to the list
  async function handleAddTask(title, description) {
    try {
      const response = await axios.post('/api/tasks', {
        title: title,
        description: description
      }, config);

      // Add new task to top of list
      setTasks([response.data, ...tasks]);

    } catch (err) {
      setError('Could not add task');
    }
  }

  // Toggle task complete/incomplete
  async function handleToggleTask(taskId, currentStatus) {
    try {
      const response = await axios.put('/api/tasks/' + taskId, {
        isCompleted: !currentStatus
      }, config);

      // Update the task in state
      const updatedTasks = tasks.map(function(task) {
        if (task._id === taskId) {
          return response.data;
        }
        return task;
      });

      setTasks(updatedTasks);

    } catch (err) {
      setError('Could not update task');
    }
  }

  // Delete a task
  async function handleDeleteTask(taskId) {
    try {
      await axios.delete('/api/tasks/' + taskId, config);

      // Remove task from state
      const remainingTasks = tasks.filter(function(task) {
        return task._id !== taskId;
      });

      setTasks(remainingTasks);

    } catch (err) {
      setError('Could not delete task');
    }
  }

  // Logout - clear localStorage and go to login
  function handleLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  // Count completed tasks
  const completedCount = tasks.filter(function(t) { return t.isCompleted; }).length;
  const pendingCount = tasks.length - completedCount;

  return (
    <div className="tasks-page">

      {/* Top navigation bar */}
      <nav className="navbar">
        <h1 className="nav-title">📝 Task Manager</h1>
        <div className="nav-right">
          <span className="nav-user">Hello, {user?.name}!</span>
          <button onClick={handleLogout} className="btn-logout">Logout</button>
        </div>
      </nav>

      <div className="tasks-container">

        {/* Summary cards */}
        <div className="summary-cards">
          <div className="summary-card total">
            <h3>{tasks.length}</h3>
            <p>Total Tasks</p>
          </div>
          <div className="summary-card pending">
            <h3>{pendingCount}</h3>
            <p>Pending</p>
          </div>
          <div className="summary-card completed">
            <h3>{completedCount}</h3>
            <p>Completed</p>
          </div>
        </div>

        {/* Add task form */}
        <AddTaskForm onAddTask={handleAddTask} />

        {/* Error message */}
        {error && <p className="error-msg">{error}</p>}

        {/* Tasks list */}
        {loading ? (
          <p className="loading-msg">Loading tasks...</p>
        ) : tasks.length === 0 ? (
          <p className="empty-msg">No tasks yet. Add your first task above!</p>
        ) : (
          <div className="tasks-list">
            {tasks.map(function(task) {
              return (
                <TaskCard
                  key={task._id}
                  task={task}
                  onToggle={handleToggleTask}
                  onDelete={handleDeleteTask}
                />
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}

export default TasksPage;
