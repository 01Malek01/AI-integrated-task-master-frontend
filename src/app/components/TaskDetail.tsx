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
  todo: 'bg-gray-100 text-gray-800',
  'in-progress': 'bg-yellow-100 text-yellow-800',
  completed: 'bg-green-100 text-green-800',
};

const getEventColor = (priority: 'low' | 'medium' | 'high') => {
  switch (priority) {
    case 'high':
      return '#EF4444';
    case 'medium':
      return '#F59E0B';
    case 'low':
    default:
      return '#3B82F6';
  }
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
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-1 min-w-0">
              {isEditing ? (
                <input
                  type="text"
                  value={editTask.title}
                  onChange={(e) => setEditTask({ ...editTask, title: e.target.value })}
                  className="w-full text-2xl font-bold text-gray-900 dark:text-white bg-transparent border-b border-gray-200 dark:border-gray-700 focus:outline-none focus:border-indigo-500 px-1 py-1"
                  placeholder="Task title"
                />
              ) : (
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white truncate">{task.title}</h2>
              )}
            </div>

            <div className="flex items-center space-x-2">
              {isEditing ? (
                <button
                  onClick={handleSave}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1 ${
                    isLoading 
                      ? 'bg-green-400 cursor-not-allowed' 
                      : 'bg-green-600 hover:bg-green-700 text-white cursor-pointer'
                  }`}
                >
                  {isUpdating ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Saving</span>
                    </>
                  ) : 'Save'}
                </button>
              ) : (
                <button
                  onClick={() => !isLoading && setIsEditing(true)}
                  className="p-2 text-green-600 hover:text-green-700 dark:text-green-400 dark:hover:text-green-300 rounded-full hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors cursor-pointer"
                  aria-label="Edit task"
                >
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </button>
              )}

              <button
                onClick={handleDeleteTask}
                disabled={isLoading}
                className={`p-2 rounded-full transition-colors ${isLoading ? 'text-red-300 cursor-not-allowed' : 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:text-red-400 cursor-pointer'}`}
                aria-label="Delete task"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>

              <button
                onClick={() => !isLoading && onClose()}
                className="p-2 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-300 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
              {isEditing ? (
                <textarea
                  value={editTask.description}
                  onChange={(e) => setEditTask({ ...editTask, description: e.target.value })}
                  className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Add a detailed description..."
                  rows={4}
                />
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  {task.description ? (
                    <p className="text-gray-700 dark:text-gray-300 whitespace-pre-line">{task.description}</p>
                  ) : (
                    <p className="text-gray-400 italic">No description provided</p>
                  )}
                </div>
              )}
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Start Date</label>
              {isEditing ? (
                <div className="relative">
                  <input
                    type="date"
                    value={editTask.startDate}
                    onChange={(e) => setEditTask({ ...editTask, startDate: e.target.value })}
                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white cursor-pointer"
                  />
                  <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
              ) : (
                <div className="flex items-center text-gray-700 dark:text-gray-300 p-2.5">
                  <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {format(new Date(task.startDate), 'MMM d, yyyy')}
                </div>
              )}
            </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Due Date</label>
                {isEditing ? (
                  <div className="relative">
                    <input
                      type="date"
                      value={editTask.dueDate}
                      onChange={(e) => setEditTask({ ...editTask, dueDate: e.target.value })}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white cursor-pointer"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                      <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center text-gray-700 dark:text-gray-300 p-2.5">
                    <svg className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {format(new Date(task.dueDate), 'MMM d, yyyy')}
                  </div>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Priority</label>
                {isEditing ? (
                  <select
                    aria-label="Task priority"
                    title="Select task priority"
                    value={editTask.priority}
                    onChange={(e) => setEditTask({ ...editTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white cursor-pointer"
                  >
                    <option value="low" className="dark:bg-gray-700">Low</option>
                    <option value="medium" className="dark:bg-gray-700">Medium</option>
                    <option value="high" className="dark:bg-gray-700">High</option>
                  </select>
                ) : (
                  <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${priorityColors[task.priority]} dark:bg-opacity-20`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      task.priority === 'high' ? 'bg-red-500' :
                      task.priority === 'medium' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></span>
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</label>
                {isEditing ? (
                  <select
                    aria-label="Task status"
                    title="Select task status"
                    value={editTask.status}
                    onChange={(e) => setEditTask({ ...editTask, status: e.target.value as 'todo' | 'in-progress' | 'completed' })}
                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white cursor-pointer"
                  >
                    <option value="todo" className="dark:bg-gray-700">To Do</option>
                    <option value="in-progress" className="dark:bg-gray-700">In Progress</option>
                    <option value="completed" className="dark:bg-gray-700">Completed</option>
                  </select>
                ) : (
                  <div className={`inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium ${statusColors[task.status]} dark:bg-opacity-20`}>
                    <span className={`w-2 h-2 rounded-full mr-2 ${
                      task.status === 'completed' ? 'bg-green-500' :
                      task.status === 'in-progress' ? 'bg-yellow-500' : 'bg-blue-500'
                    }`}></span>
                    {task.status === 'in-progress' ? 'In Progress' : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                  </div>
                )}
              </div>
            </div>


            {task.category && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</label>
                <div className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                  {task.category}
                </div>
              </div>
            )}
          </div>

          <div className="mt-4 px-6 py-4 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-700 rounded-b-xl flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800 transition-colors cursor-pointer"
            >
              Close
            </button>
            {isEditing && (
              <button
                onClick={handleSave}
                disabled={isLoading}
                className={`px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 dark:focus:ring-offset-gray-800 transition-colors ${
                  isLoading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer'
                }`}
              >
                {isUpdating ? 'Saving...' : 'Save Changes'}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TaskDetail;
