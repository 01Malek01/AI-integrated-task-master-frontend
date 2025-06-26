'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import TaskForm from '../components/TaskForm';
import useGetTasks from '../hooks/api/task/useGetTasks';
import { Task } from '@/types/task';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useDeleteTask from '../hooks/api/task/useDeleteTask';
import useUpdateTaskStatus from '../hooks/api/task/useUpdateTaskStatus';
import TaskCard from '../components/TaskCard';

export default function TasksPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading, isInitialized } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data, isLoading, error: getTasksError, refetch } = useGetTasks();
  const { deleteTask, isPending: isDeletePending } = useDeleteTask();
  const { updateTaskStatus, isPending: isUpdatePending } = useUpdateTaskStatus();
  useEffect(() => {
    if (isInitialized && !isAuthLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isAuthLoading, isInitialized, router]);

  useEffect(() => {
    if (data && !isLoading) {
      // Ensure all tasks have subTasks array and process subtasks recursively
      const processTasks = (tasks: any[]): Task[] => {
        return tasks.map(task => ({
          ...task,
          subTasks: task.subTasks ? processTasks(task.subTasks) : []
        }));
      };
      
      const tasksWithSubtasks = processTasks(data);
      setTasks(tasksWithSubtasks);
    }
  }, [data, isLoading, refetch]);

  const handleToggleTask = async (taskId: string, newStatus: 'todo' | 'in-progress' | 'completed'): Promise<void> => {
    // Save the current task state for potential rollback
    const previousTasks = [...tasks];
    
    // Optimistic update
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task._id === taskId 
          ? { ...task, status: newStatus } 
          : task
      )
    );
    
    try {
      await updateTaskStatus({ id: taskId, status: newStatus });
      await refetch();
    } catch (error) {
      console.error('Failed to update task status:', error);
      // Revert optimistic update on error
      setTasks(previousTasks);
    }
  };

  const deleteTaskHandler = async (taskId: string) => {
    try {
      await deleteTask({ id: taskId });
      await refetch();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  if (isLoading || isAuthLoading || !isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={14} className="text-green-500" />
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Tasks</h1>
        
        <div className="mb-8">
          <TaskForm refetch={refetch} setTasks={setTasks} />
        </div>

        <div className="space-y-4">
          {isLoading || isAuthLoading ? (
            <div className="flex justify-center">
              <LoadingSpinner size={14} className="text-green-500" />
            </div>
          ) : getTasksError ? (
            <div className="text-red-600">Error loading tasks. Please try again.</div>
          ) : tasks.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No tasks found. Create your first task!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {tasks.map((task: Task) => (
                <div key={task._id} >
                <TaskCard 
                  task={task}
                  setTasks={setTasks}
                  refetch={refetch}
                  isUpdating={isUpdatePending}
                  />
                  </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
