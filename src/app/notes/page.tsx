'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/providers/auth-provider';
import NoteForm from '../components/NoteForm';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import NoteCard from '../components/NoteCard';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt: Date;
}

export default function NotesPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: isAuthLoading, isInitialized } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  useEffect(() => {
    if (isInitialized && !isAuthLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, isAuthLoading, isInitialized, router]);

  if (isAuthLoading || !isInitialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size={14} color="var(--color-primary)" />
      </div>
    );
  }


  if (!isAuthenticated) {
    return null;
  }

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
               <NoteCard key={note._id} note={note} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
