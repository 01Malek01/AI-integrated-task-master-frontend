'use client';

import { useState } from 'react';
import { Plus, Sparkles } from 'lucide-react';
import useCreateTask  from '@/app/hooks/api/task/useCreateTask';
import { toast } from 'react-hot-toast';
import { Task } from '@/types/task';
import useGenerateDesc from '../hooks/api/AI/useGenerateDesc';
import {z} from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
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
    form.setValue('description', desc?.description || '');
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

const taskSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    dueDate: z.string().optional().refine(
      (val) => (val === '' || !isNaN(Date.parse(val))) && val > new Date().toISOString() ,
      { message: 'Invalid date' }
    ),
    priority: z.enum(['low', 'medium', 'high']),
    status: z.string().optional().default('todo'),
  });

const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
        title: '',
        description: '',
        dueDate: '',
        priority: 'medium',
        status: 'todo',
    }
});
const { register, formState: { errors }, handleSubmit, watch } = form;
const watchedTitle = watch('title');
type TaskFormValues = z.infer<typeof taskSchema>;

    const onSubmit = (data: TaskFormValues) => {
      createTask({
        title: data.title.trim(),
        description: data.description?.trim() || '',
        dueDate: data.dueDate || new Date().toISOString(),
        priority: data.priority,
        status: data.status || 'todo',
      }, {
        onSuccess: (res) => {
          // Reset form on success
          form.reset({
            title: '',
            description: '',
            dueDate: '',
            priority: 'medium',
            status: 'todo',
          });
          toast.success('Task created successfully');
          refetch();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || 'Failed to create task');
        }
      });
      setTasks(prev => [...prev, data]);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 card" noValidate>
      <h2 className="text-xl font-semibold text-[var(--color-text)]">Create New Task</h2>
      
      <div>
        <label htmlFor="title" className="form-label">
          Title 
        </label>
        <input
          type="text"
          id="title"
          {...register('title')}
          className="form-input"
          placeholder="Task title"
          required
        />
        {errors.title && (
          <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between relative">
          <label htmlFor="description" className="form-label">
            Description
          </label>
          {watchedTitle?.trim() && (
            <button
              onClick={() => !isGenerating && generateTaskDescription(watchedTitle)}
              type="button"
              className={`text-[var(--color-primary)] hover:text-[var(--color-primary-dark)] transition-colors absolute right-2 top-8 bg-white rounded-full p-1 cursor-pointer hover:bg-[var(--color-primary-light)] ${isGenerating ? 'opacity-50 animate-bounce cursor-not-allowed' : ''}`}
              title="Generate a description with AI"
              disabled={isGenerating}
            >
              <Sparkles className="w-5 h-5" />
            </button>
          )}
        </div>
        <textarea
          id="description"
            {...register('description')}
          className="form-input min-h-[100px]"
          placeholder={form.getValues('title').trim() ? "Describe your task..." : "Task description"}
          rows={3}
        />
        {errors.description && (
          <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="dueDate" className="form-label">
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
              {...register('dueDate')}
            className="form-input"
          />
          {errors.dueDate && (
            <p className="text-red-500 text-xs mt-1">{errors.dueDate.message}</p>
          )}
        </div>

        <div>
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            id="priority"
              {...register('priority')}
            className="form-input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="text-red-500 text-xs mt-1">{errors.priority.message}</p>
          )}
        </div>
        {/* <div>
          <label htmlFor="category  " className="form-label">
            Category
          </label>
          <select
            id="category"
              {...register('category')}
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
