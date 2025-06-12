'use client';

import { useState } from 'react';
import NoteForm from '../components/NoteForm';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
}

export default function NotesPage() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const handleAddNote = (newNote: Omit<Note, 'id' | 'createdAt'>) => {
    const note: Note = {
      ...newNote,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setNotes([...notes, note]);
  };

  const deleteNote = (noteId: string) => {
    setNotes(notes.filter(note => note.id !== noteId));
  };

  const categories = ['all', ...new Set(notes.map(note => note.category).filter(Boolean))];
  
  const filteredNotes = activeCategory === 'all' 
    ? notes 
    : notes.filter(note => note.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-[var(--color-text)]">My Notes</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="card mb-6">
              <NoteForm onSubmit={handleAddNote} />
            </div>
          </div>

          <div>
            <div className="card">
              <h2 className="text-xl font-semibold text-[var(--color-text)] mb-4">Categories</h2>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`w-full text-left px-4 py-2 rounded-md transition-colors ${
                      activeCategory === category 
                        ? 'bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] font-medium' 
                        : 'text-[var(--color-text-light)] hover:bg-[var(--color-bg-dark)]'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                    <span className="text-[var(--color-text-lighter)] text-sm ml-2">
                      ({category === 'all' ? notes.length : notes.filter(n => n.category === category).length})
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-semibold text-[var(--color-text)] mb-4">
            {activeCategory === 'all' ? 'All Notes' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Notes`}
          </h2>
          
          {filteredNotes.length === 0 ? (
            <div className="text-center py-12 text-[var(--color-text-lighter)] bg-[var(--color-bg-light)] rounded-lg shadow-[var(--shadow)]">
              <p>No notes found. Create your first note to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredNotes.map((note) => (
                <div 
                  key={note.id}
                  className="bg-[var(--color-bg-light)] rounded-lg shadow-[var(--shadow)] overflow-hidden hover:shadow-[var(--shadow-md)] transition-shadow"
                >
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-[var(--color-text)]">{note.title}</h3>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="text-[var(--color-text-lighter)] hover:text-[var(--color-error)] transition-colors"
                        aria-label="Delete note"
                        title="Delete note"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                    {note.category && (
                      <span className="inline-block bg-[var(--color-primary-light)] text-[var(--color-primary-dark)] text-xs px-2 py-1 rounded-full mb-3">
                        {note.category}
                      </span>
                    )}
                    <p className="text-[var(--color-text-light)] mt-2 whitespace-pre-line">
                      {note.content}
                    </p>
                    <div className="mt-4 pt-3 border-t border-[var(--color-border)]">
                      <p className="text-xs text-[var(--color-text-lighter)]">
                        Created: {new Date(note.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
