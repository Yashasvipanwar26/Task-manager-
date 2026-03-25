import React from 'react';
import './TaskCard.css';

function TaskCard({ task, onToggle, onDelete }) {
  return (
    <div className={task.isCompleted ? 'task-card completed' : 'task-card'}>

      {/* Left side - checkbox and task info */}
      <div className="task-left">

        {/* Checkbox to mark complete/incomplete */}
        <input
          type="checkbox"
          checked={task.isCompleted}
          onChange={function() {
            onToggle(task._id, task.isCompleted);
          }}
          className="task-checkbox"
        />

        <div className="task-info">
          <h4 className="task-title">{task.title}</h4>

          {/* Show description only if it exists */}
          {task.description && (
            <p className="task-description">{task.description}</p>
          )}

          {/* Show date task was created */}
          <p className="task-date">
            {new Date(task.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Right side - status badge and delete button */}
      <div className="task-right">
        <span className={task.isCompleted ? 'badge badge-done' : 'badge badge-pending'}>
          {task.isCompleted ? 'Done' : 'Pending'}
        </span>

        <button
          onClick={function() { onDelete(task._id); }}
          className="btn-delete"
          title="Delete task"
        >
          🗑️
        </button>
      </div>

    </div>
  );
}

export default TaskCard;
