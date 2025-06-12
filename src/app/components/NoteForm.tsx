'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';

interface NoteFormProps {
  onSubmit: (note: { title: string; content: string; category: string }) => void;
}

export default function NoteForm({ onSubmit }: NoteFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('general');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    
    onSubmit({
      title: title.trim(),
      content: content.trim(),
      category
    });

    // Reset form
    setTitle('');
    setContent('');
    setCategory('general');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 card">
      <h2 className="text-xl font-semibold text-[var(--color-text)]">Create New Note</h2>
      
      <div>
        <label htmlFor="note-title" className="form-label">
          Title *
        </label>
        <input
          type="text"
          id="note-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="form-input"
          placeholder="Note title"
          required
        />
      </div>

      <div>
        <label htmlFor="note-category" className="form-label">
          Category
        </label>
        <input
          type="text"
          id="note-category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="form-input"
          placeholder="e.g., Work, Personal, Ideas"
        />
      </div>

      <div>
        <label htmlFor="note-content" className="form-label">
          Content *
        </label>
        <textarea
          id="note-content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="form-input min-h-[150px]"
          placeholder="Write your note here..."
          required
        />
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn-primary inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2"
        >
          <Plus className="mr-2 h-4 w-4" />
          Save Note
        </button>
      </div>
    </form>
  );
}
