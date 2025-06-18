import React from 'react';
import { format } from 'date-fns';
import { Task } from '@/types/task';

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
  onStatusChange?: (status: 'todo' | 'in-progress' | 'completed') => void;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onClose, onStatusChange }) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (onStatusChange) {
      onStatusChange(e.target.value as 'todo' | 'in-progress' | 'completed');
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
              {task.dueDate && (
                <p className="text-sm text-gray-500 mt-1">
                  Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
                </p>
              )}
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-500 p-1 -m-1"
              aria-label="Close"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div className="mt-4 flex flex-wrap gap-2">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[task.priority]}`}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[task.status]}`}>
              {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
            </span>
          </div>

          {task.dueDate && (
            <div className="mt-4">
              <p className="text-sm text-gray-500">Due Date</p>
              <p className="text-gray-700">
                {new Date(task.dueDate).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}

          <div className="mt-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  id="status"
                  value={task.status}
                  onChange={handleStatusChange}
                  className="mt-1 block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 sm:text-sm rounded-md"
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              
              {task.priority && (
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Priority</p>
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    priorityColors[task.priority as keyof typeof priorityColors]
                  }`}>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </div>
                </div>
              )}
            </div>

            {task.description && (
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-1">Description</h3>
                <div className="mt-1 text-sm text-gray-700 bg-gray-50 p-3 rounded-md">
                  {task.description}
                </div>
              </div>
            )}

            <div className="pt-2 text-xs text-gray-500">
              <p>Created: {format(new Date(task.createdAt), 'MMM d, yyyy h:mm a')}</p>
              <p>Last updated: {format(new Date(task.updatedAt), 'MMM d, yyyy h:mm a')}</p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200 flex justify-end">
            <div>
              <p>Created: {new Date(task.createdAt).toLocaleString()}</p>
              {task.updatedAt !== task.createdAt && (
                <p>Updated: {new Date(task.updatedAt).toLocaleString()}</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
