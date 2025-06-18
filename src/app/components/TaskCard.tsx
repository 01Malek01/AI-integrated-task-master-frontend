import { Task } from '@/types/task';
import React, { useState } from 'react';
import { formatNoteDate } from '../../utils/dateUtils';
import useGenerateSubtasks from '../hooks/api/AI/useGenerateSubtasks';
import { Sparkles, ChevronDown, ChevronUp } from 'lucide-react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { motion, AnimatePresence } from 'framer-motion';
import useUpdateTaskStatus from '../hooks/api/task/useUpdateTaskStatus';
import useUpdateSubtaskStatus from '../hooks/api/task/useUpdateSubtaskStatus';

// Base props for TaskCard and SubTaskCard
interface TaskCardBaseProps {
  task: Task;
  isUpdating?: boolean; // Prop to indicate if a parent operation is ongoing (e.g., main task update)
  level?: number; // Visual nesting level
}

// Props for the main TaskCard, including state setters
interface TaskCardProps extends TaskCardBaseProps {
  refetch: () => void; // Function to refetch data, useful after complex operations like subtask generation
  setTasks: (tasks: Task[]) => void; // Function to update the parent's tasks state
}

// Props for the SubTaskCard
interface SubTaskCardProps {
  subtask: Task; // The specific subtask object
  task: Task; // The parent task object (needed to identify which task's subtask is being updated)
  isUpdating: boolean; // Prop to indicate if a parent operation is ongoing
  setTasks: (tasks: Task[]) => void; // Function to update the parent's tasks state
}

/**
 * Renders an individual subtask card.
 * Handles updating the subtask's status and reflecting it in the UI.
 */
const SubTaskCard: React.FC<SubTaskCardProps> = ({ 
  subtask,
  task,
  isUpdating, 
  setTasks // Pass setTasks to update parent state
}) => {
  // Hook to update subtask status via API
  const { updateSubtaskStatus, isPending: isUpdatingSubtaskStatus } = useUpdateSubtaskStatus();
  
  /**
   * Handles the change in subtask status.
   * Updates the backend via API and then optimistically updates the local state.
   * @param newStatus The new status for the subtask.
   */
  const handleSubtaskStatusChange = async (newStatus: 'todo' | 'in-progress' | 'completed') => {
    try {
      // Call the API to update the subtask status
      await updateSubtaskStatus({ 
        id: task._id, // Parent task ID
        subtaskId: subtask._id, // Subtask ID
        status: newStatus 
      });

      // Optimistically update the local state to reflect the status change immediately
      setTasks((prevTasks: Task[]) => {
        return prevTasks.map(t =>
          t._id === task._id // Find the parent task
            ? {
                ...t,
                subTasks: t.subTasks?.map(st =>
                  st._id === subtask._id ? { ...st, status: newStatus } : st // Update the specific subtask
                )
              }
            : t // Return other tasks unchanged
        );
      });

    } catch (error) {
      console.error('Failed to update subtask status:', error);
      // In a real app, you might want to revert the optimistic update or show a user error message
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
      transition={{ duration: 0.2 }}
      className="w-full border-l-2 border-green-100 ml-3 pl-3 md:ml-4 md:pl-4"
    >
      <div className="flex items-center gap-3 bg-green-50 px-3 py-2 md:px-4 min-h-[56px] md:min-h-[60px] justify-between hover:bg-green-100/50 transition-colors rounded-lg">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <p 
              className={`text-sm md:text-base font-medium truncate ${
                subtask.status === 'completed' 
                  ? 'text-green-600 line-through' 
                  : 'text-gray-800'
              }`}
              title={subtask.title}
            >
              {subtask.title}
            </p>
            {subtask.priority && (
              <span className={`text-xs md:text-sm font-medium px-2 py-0.5 rounded-full self-start mt-1 ${
                subtask.priority === 'high' 
                  ? 'bg-red-100 text-red-800' 
                  : subtask.priority === 'medium' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-blue-100 text-blue-800'
              }`}>
                {subtask.priority}
              </span>
            )}
          </div>
        </div>
        <div className="shrink-0 ml-2">
          {/* Dropdown to change subtask status */}
          <select
            aria-label={`Change status for subtask: ${subtask.title}`}
            title={`Change status for subtask: ${subtask.title}`}
            value={subtask.status}
            onChange={(e) => handleSubtaskStatusChange(e.target.value as 'todo' | 'in-progress' | 'completed')}
            disabled={isUpdating || isUpdatingSubtaskStatus} // Disable if parent is updating or this subtask is
            className={`rounded-lg border border-green-200 bg-white text-xs md:text-sm focus:ring-2 focus:ring-green-300 focus:border-green-400 focus:outline-none cursor-pointer px-2 py-1 ${
              (isUpdating || isUpdatingSubtaskStatus) ? 'opacity-50 cursor-not-allowed' : ''
            } ${
              subtask.status === 'completed' ? 'bg-green-50 text-green-700' : 
              subtask.status === 'in-progress' ? 'bg-blue-50 text-blue-700' : 
              'bg-gray-50 text-gray-700'
            }`}
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * Renders an individual task card, which can also contain subtasks.
 * Handles updating the main task's status and generating subtasks via AI.
 */
const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  refetch, 
  isUpdating = false, 
  level = 0, 
  setTasks // Receive setTasks to update parent state
}) => {
  const hasSubtasks = task.subTasks && task.subTasks.length > 0;
  // Hook for AI subtask generation
  const { generateSubtasks, isPending, error } = useGenerateSubtasks();
  const [isGenerating, setIsGenerating] = useState(false); // Local state for AI generation loading
  const [showSubtasks, setShowSubtasks] = useState(false); // State to toggle subtask visibility
  // Hook to update main task status via API
  const { updateTaskStatus, isPending: isUpdatingStatus } = useUpdateTaskStatus();
  
  /**
   * Handles the change in main task status.
   * Updates the backend via API and then optimistically updates the local state.
   * @param newStatus The new status for the main task.
   */
  const handleTaskStatusChange = async (newStatus: 'todo' | 'in-progress' | 'completed') => {
    try {
      // Call the API to update the task status
      await updateTaskStatus({ 
        id: task._id, 
        status: newStatus 
      });

      // Optimistically update the local state to reflect the status change immediately
      setTasks((prevTasks: Task[]) => {
        return prevTasks.map(t =>
          t._id === task._id ? { ...t, status: newStatus } : t // Update the specific task
        );
      });

    } catch (error) {
      console.error('Failed to update task status:', error);
      // In a real app, you might want to revert the optimistic update or show a user error message
    }
  }; 
  
  /**
   * Triggers AI subtask generation.
   * Updates local state and then calls refetch to get the latest task data.
   */
  const genSubtasks = async () => {
    try {
      setIsGenerating(true); // Set loading state for generation
      const response = await generateSubtasks({ title: task.title, taskId: task._id });
      
      // Update the tasks state with the new task data that includes generated subtasks
      setTasks((prevTasks: Task[]) => {
        return prevTasks.map(t => t._id === task._id ? response.task : t);
      });
      
      // If refetch is provided, call it to ensure data consistency
      if (refetch && typeof refetch === 'function') {
        await refetch();
      }
      
      setShowSubtasks(true); // Automatically show subtasks after generation
    } catch (error) {
      console.error('Error generating subtasks:', error);
    } finally {
      setIsGenerating(false); // Reset loading state
    }
  };

  /**
   * Renders skeleton placeholders while subtasks are being generated.
   */
  const renderSkeletonSubtasks = () => {
    return (
      <motion.div 
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.2 }}
        className="w-full border-l-2 border-green-100 ml-3 pl-3 md:ml-4 md:pl-4 space-y-2 mt-2"
      >
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center gap-3 bg-green-50 px-3 py-2 md:px-4 min-h-[56px] md:min-h-[60px] rounded-lg">
            <Skeleton width={24} height={24} className="rounded-full" />
            <div className="flex-1 min-w-0">
              <Skeleton width={Math.floor(Math.random() * 150) + 100} height={16} className="mb-1" />
              <Skeleton width={60} height={12} />
            </div>
            <Skeleton width={90} height={32} className="rounded-lg" />
          </div>
        ))}
      </motion.div>
    );
  };

  /**
   * Toggles the visibility of subtasks, preventing click through to specific elements.
   * @param e The mouse event.
   */
  const toggleSubtasks = (e: React.MouseEvent) => {
    // Prevent toggle when clicking on status dropdown or AI button
    const target = e.target as HTMLElement;
    if (
      target.tagName === 'SELECT' || 
      target.closest('button')?.ariaLabel === 'Generate subtasks with AI'
    ) {
      return;
    }
    setShowSubtasks(!showSubtasks);
  };

  return (
    <div className="w-full space-y-2">
      <motion.div 
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-3 bg-green-50 px-3 py-2 md:px-4 min-h-[64px] md:min-h-[72px] justify-between hover:bg-green-100/50 transition-colors rounded-lg ${
          level === 0 ? 'shadow-sm' : ''
        } ${hasSubtasks ? 'cursor-pointer' : ''}`}
        onClick={hasSubtasks ? toggleSubtasks : undefined} // Only toggle if there are subtasks
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="text-green-600 flex items-center justify-center rounded-lg bg-green-100 shrink-0 size-10 md:size-12">
            {/* Task icon */}
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="20px" 
              height="20px" 
              fill="currentColor" 
              viewBox="0 0 256 256"
              className="md:w-6 md:h-6"
            >
              <path d="M80,64a8,8,0,0,1,8-8H216a8,8,0,0,1,0,16H88A8,8,0,0,1,80,64Zm136,56H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Zm0,64H88a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16ZM44,52A12,12,0,1,0,56,64,12,12,0,0,0,44,52Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,116Zm0,64a12,12,0,1,0,12,12A12,12,0,0,0,44,180Z"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-center flex-1 min-w-0">
            <p 
              className={`text-sm md:text-base font-medium truncate ${
                task.status === 'completed' 
                  ? 'text-green-600 line-through' 
                  : 'text-gray-900'
              }`}
              title={task.title}
            >
              {task.title}
            </p>
            {task.dueDate && (
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs md:text-sm text-green-600 font-medium">
                  Due {formatNoteDate(task.dueDate)}
                </span>
                {task.priority && (
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                    task.priority === 'high' 
                      ? 'bg-red-100 text-red-800' 
                      : task.priority === 'medium' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-blue-100 text-blue-800'
                  }`}>
                    {task.priority}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="shrink-0 flex items-center gap-2">
          {/* Dropdown to change main task status */}
          <select
            aria-label={`Change status for task: ${task.title}`}
            value={task.status}
            onChange={(e) => handleTaskStatusChange(e.target.value as 'todo' | 'in-progress' | 'completed')}
            disabled={isUpdating || isUpdatingStatus} // Disable if parent is updating or this task is
            className={`rounded-lg border border-green-200 bg-white text-xs md:text-sm focus:ring-2 focus:ring-green-300 focus:border-green-400 focus:outline-none cursor-pointer px-2 py-1 ${
              (isUpdating || isUpdatingStatus) ? 'opacity-50 cursor-not-allowed' : ''
            } ${
              task.status === 'completed' ? 'bg-green-50 text-green-700' : 
              task.status === 'in-progress' ? 'bg-blue-50 text-blue-700' : 
              'bg-gray-50 text-gray-700'
            }`}
            onClick={(e) => e.stopPropagation()} // Prevent toggling subtasks when clicking dropdown
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          {/* AI Subtask Generation Button */}
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent toggling subtasks when clicking button
              genSubtasks();
            }}
            disabled={isGenerating}
            className={`text-green-600 hover:text-green-700 transition-colors bg-white rounded-full p-1 cursor-pointer hover:bg-green-100 ${
              isGenerating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title="Generate subtasks with AI"
            aria-label="Generate subtasks with AI"
          >
            <Sparkles className="w-4 h-4 md:w-5 md:h-5" />
          </button>
          {/* Toggle Subtasks button/icon */}
          {hasSubtasks && (
            <motion.div
              animate={{ rotate: showSubtasks ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-500 ml-1"
            >
              {showSubtasks ? (
                <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
      
      {/* Subtasks section with animations */}
      <AnimatePresence>
        {isGenerating && renderSkeletonSubtasks()} {/* Show skeletons while generating */}
        {showSubtasks && hasSubtasks && !isGenerating && ( // Show subtasks if toggled, exist, and not generating
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full pl-2 md:pl-3 space-y-2"
          >
            {task.subTasks?.map((subtask) => (
              <SubTaskCard
                key={subtask._id}
                subtask={subtask}
                task={task}
                isUpdating={isUpdating}
                setTasks={setTasks} // Pass setTasks down to subtask card
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TaskCard;
