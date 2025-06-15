'use client';

import { useEffect , useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import TaskForm from '../components/TaskForm';
import useGetTasks from '../hooks/api/task/useGetTasks';
import { Task } from '@/types/task';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useDeleteTask from '../hooks/api/task/useDeleteTask';
import TaskCard from '../components/TaskCard';


export default function TasksPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading, isInitialized } = useAuth();
  const [tasks, setTasks] = useState<Task[]>([]);
  const { data, isLoading, error: getTasksError, refetch } = useGetTasks();
  const { deleteTask ,isPending : isDeletePending, error: deleteTaskError } = useDeleteTask();

  useEffect(() => {
    if (isInitialized && !isAuthLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isAuthLoading, isInitialized, router]);


useEffect(() => {
    if (data && !isLoading) {
      setTasks(data);
    }
  }, [data , isLoading, refetch]); 


const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task._id === taskId ? { ...task, status: task.status === 'completed' ? 'todo' : 'completed' } : task
    ));
  };

  const deleteTaskHandler = (taskId: string) => {
    setTasks (tasks.filter(task =>
      task._id !== taskId
    ));
    deleteTask( {id: taskId});
      refetch();
  };

  if (isAuthLoading || !isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={14} color="var(--color-primary)" />
      </div>
    );
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-8">My Tasks</h1>
        
        <div className="mb-8">
          <TaskForm refetch={refetch} setTasks={setTasks} />
        </div>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12 text-[var(--color-text-lighter)]">
              <p>No tasks yet. Add one above to get started!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task : Task) => (
              <TaskCard key={task._id} task={task} toggleTask={toggleTaskCompletion} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
