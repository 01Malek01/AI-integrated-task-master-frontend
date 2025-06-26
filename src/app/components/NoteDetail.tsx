import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Note, UpdateNoteInput } from '../../../types';
import useUpdateNote from '@/app/hooks/api/note/useUpdateNote';
import useDeleteNote from '@/app/hooks/api/note/useDeleteNote';
import { toast } from 'react-hot-toast';

interface NoteDetailProps {
  note: Note;
  onClose: () => void;
  setNotes : React.Dispatch<React.SetStateAction<Note[]>>;
}

const NoteDetail: React.FC<NoteDetailProps> = ({
  note,
  onClose,
  setNotes,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: note.title || '',
    content: note.content || '',
    category: note.category || undefined
  });

  const { updateNote, isPending: isUpdating, error: updateError } = useUpdateNote();
  const { deleteNote, isPending: isDeleting, error: deleteError } = useDeleteNote();

  useEffect(() => {
    if (updateError) {
      toast.error(`${updateError.message}` || 'Failed to update note');
    }
    if (deleteError) {
      toast.error(deleteError.message || 'Failed to delete note');
    }
  }, [updateError, deleteError]);

  const handleSave = () => {
    if (isUpdating) return;
    
    if (!editedNote.title.trim() || !editedNote.content.trim()) {
      toast.error('Title and content are required');
      return;
    }
    
    const noteData = {
      _id: note._id as string,
      title: editedNote.title.trim(),
      content: editedNote.content.trim(),
      category: editedNote.category?.trim() || undefined
    };
    
    updateNote(
      noteData,
      {
        onSuccess: () => {
          toast.success('Note updated successfully');
         
          setIsEditing(false);
        },
      }
    );
  };

  const handleDelete = () => {
    if (isDeleting) return;  
    
      deleteNote(note._id as string, {
        onSuccess: () => {
          toast.success('Note deleted successfully');
          
          onClose();
        },
      });
    
  };
  
  const isLoading = isUpdating || isDeleting;




  return (
    <motion.div 
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed inset-0 bg-opacity-20 backdrop-blur-lg flex items-center justify-center p-4 z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-3xl max-h-[90vh] flex flex-col">
        <div className="p-6 flex-1 overflow-y-auto">
          <div className="flex justify-between items-start">
            {isEditing ? (
              <input
                type="text"
                value={editedNote.title}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, title: e.target.value })
                }
                className="text-2xl font-bold text-gray-900 w-full border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                placeholder="Note title"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-900">{note.title}</h2>
            )}
            <div className="flex space-x-2">
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      disabled={isLoading}
                      className={`text-white px-3 py-1 rounded text-sm font-medium ${
                        isLoading ? 'bg-indigo-400' : 'bg-indigo-600 hover:bg-indigo-700'
                      }`}
                    >
                      {isUpdating ? 'Saving...' : 'Save'}
                    </button>
                  ) : (
                    <button
                      onClick={() => !isLoading && setIsEditing(true)}
                      className="text-indigo-600 hover:text-indigo-800"
                      aria-label="Edit note"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                    <button
                      onClick={handleDelete}
                      disabled={isLoading}
                      className={`${isLoading ? 'text-red-400' : 'text-red-600 hover:text-red-800'}`}
                      aria-label="Delete note"
                    >
                      <svg 
                        className="h-5 w-5" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                      >
                        <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          strokeWidth={2} 
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                        />
                      </svg>
                    </button>
              <button
                onClick={() => !isLoading && onClose()}
                className="text-gray-400 hover:text-gray-500 cursor-pointer"
                aria-label="Close"
                
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {(note.category || (isEditing )) && (
            <div className="mt-2">
              {isEditing ? (
                <input
                  type="text"
                  value={editedNote.category || ''}
                  onChange={(e) =>
                    setEditedNote({ ...editedNote, category: e.target.value })
                  }
                  className="text-sm text-gray-500 border-b border-gray-300 focus:outline-none focus:border-indigo-500"
                  placeholder="Add a category"
                />
              ) : (
                <span className="text-sm text-gray-500">{note.category}</span>
              )}
            </div>
          )}

          <div className="mt-6">
            {isEditing ? (
              <textarea
                value={editedNote.content}
                onChange={(e) =>
                  setEditedNote({ ...editedNote, content: e.target.value })
                }
                className="w-full min-h-[200px] p-2 border border-gray-300 rounded focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write your note here..."
              />
            ) : (
              <div className="prose max-w-none">
                {note.content.split('\n').map((paragraph, i) => (
                  <p key={i}>{paragraph || <br />}</p>
                ))}
              </div>
            )}
          </div>

 
        </div>

        <div className="px-6 py-3 bg-gray-50 text-right text-xs text-gray-500 border-t border-gray-200">
          <div className="flex justify-between">
            <div>
              Created: {new Date(note?.createdAt as string).toLocaleString()}
              {note.updatedAt !== note.createdAt && (
                <span className="ml-2">
                  • Updated: {new Date(note?.updatedAt as string).toLocaleString()}
                </span>
              )}
            </div>
            { !isEditing && (
              <button
                onClick={() => {
                  if (isEditing) {
                    handleSave();
                  } else {
                    setIsEditing(true);
                  }
                }}
                className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
              >
                {isEditing ? 'Save Changes' : 'Edit Note'}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NoteDetail;
