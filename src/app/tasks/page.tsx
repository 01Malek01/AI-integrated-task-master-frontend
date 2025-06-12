'use client';

import { useState } from 'react';
import TaskForm from '../components/TaskForm';

interface Task {
  id: string;
  title: string;
  description: string;
  dueDate: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const task: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks([...tasks, task]);
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (taskId: string) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low':
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-[var(--color-text)] mb-8">My Tasks</h1>
        
        <div className="mb-8">
          <TaskForm onSubmit={handleAddTask} />
        </div>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-12 text-[var(--color-text-lighter)]">
              <p>No tasks yet. Add one above to get started!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {tasks.map((task) => (
                <li 
                  key={task.id}
                  className="bg-[var(--color-bg-light)] p-4 rounded-lg shadow-[var(--shadow)] hover:shadow-[var(--shadow-md)] transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3 flex-1">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="mt-1 h-5 w-5 text-[var(--color-primary)] rounded focus:ring-[var(--color-primary)]"
                        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
                      />
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <h3 className={`text-lg font-medium ${task.completed ? 'line-through text-[var(--color-text-lighter)]' : 'text-[var(--color-text)]'}`}>
                            {task.title}
                          </h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            task.priority === 'high' ? 'priority-high' : 
                            task.priority === 'medium' ? 'priority-medium' : 'priority-low'
                          }`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                        </div>
                        {task.description && (
                          <p className="mt-1 text-[var(--color-text-light)] text-sm">
                            {task.description}
                          </p>
                        )}
                        {task.dueDate && (
                          <p className="mt-2 text-xs text-[var(--color-text-lighter)]">
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="text-[var(--color-text-lighter)] hover:text-[var(--color-error)] transition-colors"
                      aria-label="Delete task"
                      title="Delete task"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
