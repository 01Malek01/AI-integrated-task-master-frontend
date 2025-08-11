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
import TaskDetail from './TaskDetail';

interface TaskCardBaseProps {
  task: Task;
  isUpdating?: boolean;
  level?: number;
}

interface TaskCardProps extends TaskCardBaseProps {
  refetch: () => void;
  setTasks: (tasks: Task[]) => void;
}

interface SubTaskCardProps {
  subtask: Task;
  task: Task;
  isUpdating: boolean;
  setTasks: (tasks: Task[]) => void;
}

const SubTaskCard: React.FC<SubTaskCardProps> = ({ 
  subtask,
  task,
  isUpdating, 
  setTasks
}) => {
  const { updateSubtaskStatus, isPending: isUpdatingSubtaskStatus } = useUpdateSubtaskStatus();

  const handleSubtaskStatusChange = async (newStatus: 'todo' | 'in-progress' | 'completed') => {
    try {
      await updateSubtaskStatus({ 
        id: task._id,
        subtaskId: subtask._id,
        status: newStatus 
      });
      setTasks((prevTasks: Task[]) => {
        return prevTasks.map(t =>
          t._id === task._id
            ? {
                ...t,
                subTasks: t.subTasks?.map(st =>
                  st._id === subtask._id ? { ...st, status: newStatus } : st
                )
              }
            : t
        );
      });
    } catch (error) {
      console.error('Failed to update subtask status:', error);
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
          <select
            aria-label={`Change status for subtask: ${subtask.title}`}
            title={`Change status for subtask: ${subtask.title}`}
            value={subtask.status}
            onChange={(e) => handleSubtaskStatusChange(e.target.value as 'todo' | 'in-progress' | 'completed')}
            disabled={isUpdating || isUpdatingSubtaskStatus}  
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

const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  refetch, 
  isUpdating = false, 
  level = 0, 
  setTasks  
}) => {
  const hasSubtasks = task.subTasks && task.subTasks.length > 0;
  const { generateSubtasks, isPending, error } = useGenerateSubtasks();
  const [isGenerating, setIsGenerating] = useState(false);  
  const [showSubtasks, setShowSubtasks] = useState(false);  
  const [openTaskModal , setOpenTaskModal] = useState<boolean>(false);

  const { updateTaskStatus, isPending: isUpdatingStatus } = useUpdateTaskStatus();
  
  const handleOpenTaskModal = (task:Task) => {
    setOpenTaskModal(true);

  }
  const handleTaskStatusChange = async (newStatus: 'todo' | 'in-progress' | 'completed') => {
    try {
      await updateTaskStatus({ 
        id: task._id, 
        status: newStatus 
      });

      setTasks((prevTasks: Task[]) => {
        return prevTasks.map(t =>
          t._id === task._id ? { ...t, status: newStatus } : t  
        );
      });

    } catch (error) {
      console.error('Failed to update task status:', error);
    }
  }; 
  
  const genSubtasks = async () => {
    try {
      setIsGenerating(true);  
      const response = await generateSubtasks({ title: task.title, taskId: task._id });
      
      setTasks((prevTasks: Task[]) => {
        return prevTasks.map(t => t._id === task._id ? response.task : t);
      });
      
      if (refetch && typeof refetch === 'function') {
        await refetch();
      }
      
      setShowSubtasks(true);  
    } catch (error) {
      console.error('Error generating subtasks:', error);
    } finally {
      setIsGenerating(false);  
    }
  };

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

  return (
    <>
    <AnimatePresence >
{
  openTaskModal && (
    <TaskDetail setTasks={setTasks} task={task} onClose={()=> setOpenTaskModal(false)}/>
  )
}
    </AnimatePresence>
    <div className="w-full space-y-2 cursor-pointer">
      <motion.div 
      onClick={()=> setOpenTaskModal(true)}
        whileTap={{ scale: 0.98 }}
        className={`flex items-center gap-3 bg-green-50 px-3 py-2 md:px-4 min-h-[64px] md:min-h-[72px] justify-between hover:bg-green-100/50 transition-colors rounded-lg ${
          level === 0 ? 'shadow-sm' : ''
        }`}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="text-green-600 flex items-center justify-center rounded-lg bg-green-100 shrink-0 size-10 md:size-12">
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
                  Due {formatNoteDate(task?.dueDate) || 'N/A'} 
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
          <select
            aria-label={`Change status for task: ${task.title}`}
            value={task.status}
            onChange={(e) => handleTaskStatusChange(e.target.value as 'todo' | 'in-progress' | 'completed')}
            disabled={isUpdating || isUpdatingStatus}  
            className={`rounded-lg border border-green-200 bg-white text-xs md:text-sm focus:ring-2 focus:ring-green-300 focus:border-green-400 focus:outline-none cursor-pointer px-2 py-1 ${
              (isUpdating || isUpdatingStatus) ? 'opacity-50 cursor-not-allowed' : ''
            } ${
              task.status === 'completed' ? 'bg-green-50 text-green-700' : 
              task.status === 'in-progress' ? 'bg-blue-50 text-blue-700' : 
              'bg-gray-50 text-gray-700'
            }`}
            onClick={(e) => e.stopPropagation()}  
          >
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <button
            onClick={(e) => {
              e.stopPropagation();  
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
          {hasSubtasks && (
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setShowSubtasks(!showSubtasks);
              }}
              animate={{ rotate: showSubtasks ? 360 : 0 }}
              transition={{ duration: 0.2 }}
              className="text-gray-500 ml-1 hover:bg-green-300 rounded-full p-1 cursor-pointer bg-green-400"
              aria-label={showSubtasks ? "Collapse subtasks" : "Expand subtasks"}
            >
              {showSubtasks ? (
                <ChevronUp className="w-4 h-4 md:w-5 md:h-5" />
              ) : (
                <ChevronDown className="w-4 h-4 md:w-5 md:h-5" />
              )}
            </motion.button>
          )}
        </div>
      </motion.div>
      
      {/* { Subtasks section with animations } */}
      <AnimatePresence>
        {isGenerating && renderSkeletonSubtasks()} 
        {showSubtasks && hasSubtasks && !isGenerating && (  
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
                setTasks={setTasks}  
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
          </>
  );
};

export default TaskCard;
