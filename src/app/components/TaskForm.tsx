'use client';

import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import useCreateTask  from '@/app/hooks/api/task/useCreateTask';
import { toast } from 'react-hot-toast';
import { Task } from '@/types/task';
import useGenerateDesc from '../hooks/api/AI/useGenerateDesc';

type Priority = 'low' | 'medium' | 'high';

export default function TaskForm({ refetch,setTasks }: { refetch: () => void ,setTasks: (tasks: Task[]) => void }) {
  const { createTask, isPending ,error } = useCreateTask();
const [ isGenerating  , setIsGenerating] = useState(false);
const { generateDesc, error : descError , isPending : descIsPending } = useGenerateDesc();

const generateTaskDescription = async(title:string) => {
  setIsGenerating(true);
  try {
    const desc = await generateDesc(title);
    console.log('desc',desc);
    setFormData({ ...formData, description: desc?.description || '' });
    setIsGenerating(false);
    

  } catch (error) {
      console.error(error);
     setIsGenerating(false);
     }
}
const [formData , setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'todo',
})


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      toast.error('Title is required');
      return;
    }
    
    createTask({
      title: formData.title.trim(),
      description: formData.description.trim(),
      dueDate: formData.dueDate || new Date().toISOString(),
      priority: formData.priority,
      status: formData.status,
      }, {
      onSuccess: () => {
        // Reset form on success
        setFormData({
            title: '',
            description: '',
            dueDate: '',
            priority: 'medium',
            status: 'todo',
            // category: 'general'
        });
        toast.success('Task created successfully');
          setTasks(prev => [...prev, formData]);
        },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || 'Failed to create task');
      }
    });
    refetch();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 card">
      <h2 className="text-xl font-semibold text-[var(--color-text)]">Create New Task</h2>
      
      <div>
        <label htmlFor="title" className="form-label">
          Title *
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="form-input"
          placeholder="Task title"
          required
        />
      </div>

      <div>
        <div className="flex items-center justify-between relative">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          {formData.title.trim() && (
            <button
             onClick={() => generateTaskDescription(formData.title)}
              type="button"
              className={`text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors absolute right-2 top-8 bg-white rounded-full p-1 cursor-pointer hover:bg-[var(--color-primary-light)] ${isGenerating ? 'opacity-50 animate-bounce cursor-not-allowed' : ''}`}
              title="Generate with AI"
            >
              <Sparkles className="w-5 h-5" />
            </button>
          )}
        </div>
        <textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="form-input min-h-[100px]"
          placeholder={formData.title.trim() ? "Describe your task..." : "Task description"}
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            value={ formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            id="priority"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value as Priority })}
            className="form-input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        {/* <div>
          <label htmlFor="category  " className="form-label">
            Category
          </label>
          <select
            id="category"
            value={ formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value as Priority })}
            className="form-input"
          >
            <option value="general">General</option>
            <option value="personal">Personal</option>
            <option value="work">Work</option>
          </select>
        </div> */}
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="cursor-pointer btn-primary inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </button>
      </div>
    </form>
  );
}
