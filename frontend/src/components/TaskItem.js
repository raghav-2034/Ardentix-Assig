import React, { useState } from 'react';
import { Edit2, Trash2, Calendar, Flag, Check, X } from 'lucide-react';

const TaskItem = ({ task, onEdit, onDelete, onToggle }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleToggleComplete = () => {
    onToggle(task._id, !task.completed);
  };

  const handleDelete = () => {
    onDelete(task._id);
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return dueDate < today && !task.completed;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'badge-high';
      case 'medium':
        return 'badge-medium';
      case 'low':
        return 'badge-low';
      default:
        return 'badge-medium';
    }
  };

  const getPriorityIcon = (priority) => {
    const iconClass = priority === 'high' ? 'text-red-500' : 
                     priority === 'medium' ? 'text-yellow-500' : 'text-green-500';
    return <Flag className={`h-3 w-3 ${iconClass}`} />;
  };

  return (
    <div className={`card transition-all duration-200 hover:shadow-md ${
      task.completed ? 'opacity-75' : ''
    }`}>
      <div className="card-content">
        <div className="flex items-start space-x-4">
          {/* Checkbox */}
          <button
            onClick={handleToggleComplete}
            className={`flex-shrink-0 mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
              task.completed
                ? 'bg-primary-600 border-primary-600 text-white'
                : 'border-gray-300 hover:border-primary-500'
            }`}
          >
            {task.completed && <Check className="h-3 w-3" />}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`text-lg font-medium ${
                  task.completed ? 'line-through text-gray-500' : 'text-gray-900'
                }`}>
                  {task.title}
                </h3>
                
                {task.description && (
                  <p className={`mt-1 text-sm ${
                    task.completed ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {task.description}
                  </p>
                )}

                {/* Task Meta */}
                <div className="flex items-center space-x-4 mt-3">
                  {/* Priority */}
                  <div className="flex items-center space-x-1">
                    {getPriorityIcon(task.priority)}
                    <span className={`badge ${getPriorityColor(task.priority)}`}>
                      {task.priority}
                    </span>
                  </div>

                  {/* Due Date */}
                  {task.dueDate && (
                    <div className={`flex items-center space-x-1 text-sm ${
                      isOverdue(task.dueDate) ? 'text-red-600' : 'text-gray-500'
                    }`}>
                      <Calendar className="h-3 w-3" />
                      <span>
                        {formatDate(task.dueDate)}
                        {isOverdue(task.dueDate) && ' (Overdue)'}
                      </span>
                    </div>
                  )}

                  {/* Created Date */}
                  <div className="text-xs text-gray-400">
                    Created {formatDate(task.createdAt)}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onEdit(task)}
                  className="p-2 text-gray-400 hover:text-primary-600 hover:bg-primary-50 rounded-md transition-colors"
                  title="Edit task"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => setShowDeleteConfirm(true)}
                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
                  title="Delete task"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Delete Confirmation */}
        {showDeleteConfirm && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-800">
                  Are you sure you want to delete this task?
                </p>
                <p className="text-xs text-red-600 mt-1">
                  This action cannot be undone.
                </p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={handleDelete}
                  className="btn-danger text-xs px-3 py-1 h-auto"
                >
                  <Check className="h-3 w-3 mr-1" />
                  Delete
                </button>
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn-secondary text-xs px-3 py-1 h-auto"
                >
                  <X className="h-3 w-3 mr-1" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskItem;