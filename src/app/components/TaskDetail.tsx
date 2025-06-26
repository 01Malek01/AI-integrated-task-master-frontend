import React, { useState } from 'react';
import { format } from 'date-fns';
import { motion } from 'framer-motion'; 
import useUpdateTaskStatus from '../hooks/api/task/useUpdateTaskStatus';
import useDeleteTask from '../hooks/api/task/useDeleteTask';
import useUpdateTask from '../hooks/api/task/useUpdateTask';
import { Task } from '../../../types';
import toast from 'react-hot-toast';

interface TaskDetailProps {
  task: Task;
  onClose: () => void;
  onStatusChange?: (status: 'todo' | 'in-progress' | 'completed') => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

const priorityColors = {
  low: 'bg-blue-100 text-blue-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const statusColors = {
  todo: 'bg-blue-100 text-blue-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
};

const TaskDetail: React.FC<TaskDetailProps> = ({ task, onClose, onStatusChange, setTasks }) => {
  const { updateTaskStatus, isPending: isUpdatingStatus } = useUpdateTaskStatus();
  const { updateTask, isPending: isUpdating, error: updateError } = useUpdateTask();
  const { deleteTask, isPending: isDeleting, error: deleteError } = useDeleteTask();

  const [editTask, setEditTask] = useState({
    title: task.title,
    dueDate: task.dueDate,
    description: task.description,
    priority: task.priority,
    status: task.status,
    category: task.category,
    startDate: task.startDate,
  });

  const [isEditing, setIsEditing] = useState(false);
  const isLoading = isUpdating || isDeleting;

  const handleSave = () => {
    if (isUpdating) return;
    if (!editTask.title.trim() || !editTask.description.trim()) {
      toast.error('Title and description are required');
      return;
    }

    const taskData = {
      id: task._id as string,
      title: editTask.title.trim(),
      description: editTask.description.trim(),
      dueDate: editTask.dueDate,
      startDate: editTask.startDate,
      priority: editTask.priority,
      status: editTask.status,
      category: editTask.category,
    };

    updateTask(taskData, {
      onSuccess: () => {
        toast.success('Task updated successfully');
        setIsEditing(false);
        setTasks((tasks: Task[]) => tasks.map((t: Task) => (t._id === task._id ? { ...t, ...taskData } : t)));
        onClose();
      },
    });
  };

  const handleTaskStatusChange = async (newStatus: 'todo' | 'in-progress' | 'completed') => {
    try {
      await updateTaskStatus({ status: newStatus, id: task._id });
      setTasks((tasks: Task[]) => tasks.map((t: Task) => (t._id === task._id ? { ...t, status: newStatus } : t)));
      onClose();
      if (onStatusChange) onStatusChange(newStatus);
    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  };

  const handleDeleteTask = async () => {
    try {
      await deleteTask({ id: task._id });
      setTasks((tasks: Task[]) => tasks.filter((t: Task) => t._id !== task._id));
      onClose();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 bg-opacity-20 backdrop-blur-lg flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start">
            {isEditing ? (
              <input
                type="text"
                value={editTask.title}
                onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                className="text-2xl font-bold text-gray-900 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Task title"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-900">{task.title}</h2>
            )}

            <div className="flex space-x-2">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className={`text-white px-3 py-1 rounded text-sm font-medium ${
                    isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                  }`}
                >
                  {isUpdating ? 'Saving...' : 'Save'}
                </button>
              ) : (
                <button
                  onClick={() => !isLoading && setIsEditing(true)}
                  className="text-indigo-600 hover:text-indigo-800"
                  aria-label="Edit task"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}

              <button
                onClick={handleDeleteTask}
                disabled={isLoading}
                className={`${isLoading ? 'text-red-400' : 'text-red-600 hover:text-red-800'}`}
                aria-label="Delete task"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>

              <button
                onClick={() => !isLoading && onClose()}
                className="text-gray-400 hover:text-gray-500 cursor-pointer"
                aria-label="Close"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            {isEditing ? (
              <textarea
                value={editTask.description}
                onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Task description"
              />
            ) : (
              <p className="text-gray-700">{task.description}</p>
            )}
          </div>

          <div className="mt-4 flex flex-col md:flex-row gap-4">
            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editTask.startDate}
                  onChange={(e) => setEditTask({ ...editTask, startDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p>{format(new Date(task.startDate), 'MMM d, yyyy')}</p>
              )}
            </div>

            <div className="w-full">
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              {isEditing ? (
                <input
                  type="date"
                  value={editTask.dueDate}
                  onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded"
                />
              ) : (
                <p>{format(new Date(task.dueDate), 'MMM d, yyyy')}</p>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                value={editTask.category || ''}
                onChange={(e) => setEditTask({ ...editTask, category: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          )}

          <div className="pt-6 text-xs text-gray-500 border-t mt-6">
            <p>Created: {new Date(task.createdAt).toLocaleString()}</p>
            <p>Updated: {new Date(task.updatedAt).toLocaleString()}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskDetail;
