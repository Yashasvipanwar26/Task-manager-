import React, { useState } from 'react';
import './AddTaskForm.css';

function AddTaskForm({ onAddTask }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showForm, setShowForm] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) return;

    // Call the function passed from parent (TasksPage)
    onAddTask(title, description);

    // Clear form
    setTitle('');
    setDescription('');
    setShowForm(false);
  }

  return (
    <div className="add-task-container">

      {/* Toggle button to show/hide form */}
      {!showForm ? (
        <button
          className="btn-add-toggle"
          onClick={function() { setShowForm(true); }}
        >
          + Add New Task
        </button>
      ) : (
        <div className="add-task-form">
          <h3>Add New Task</h3>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="Task title *"
                value={title}
                onChange={function(e) { setTitle(e.target.value); }}
                autoFocus
              />
            </div>

            <div className="form-group">
              <textarea
                placeholder="Description (optional)"
                value={description}
                onChange={function(e) { setDescription(e.target.value); }}
                rows="3"
              />
            </div>

            <div className="form-buttons">
              <button type="submit" className="btn-save">Add Task</button>
              <button
                type="button"
                className="btn-cancel"
                onClick={function() { setShowForm(false); }}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default AddTaskForm;
