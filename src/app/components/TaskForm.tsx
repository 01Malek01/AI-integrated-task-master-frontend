'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

type Priority = 'low' | 'medium' | 'high';

interface TaskFormProps {
  onSubmit: (task: { title: string; description: string; dueDate: string; priority: Priority }) => void;
}

export default function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({
      title: title.trim(),
      description: description.trim(),
      dueDate,
      priority
    });

    // Reset form
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('medium');
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          placeholder="Task title"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-input min-h-[100px]"
          placeholder="Task description"
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
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="form-input"
          />
        </div>

        <div>
          <label htmlFor="priority" className="form-label">
            Priority
          </label>
          <select
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="form-input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Task
        </button>
      </div>
    </form>
  );
}
