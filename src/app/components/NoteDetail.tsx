import React, { useState } from 'react';

interface NoteDetailProps {
  note: {
    id: string;
    title: string;
    content: string;
    category?: string;
    tags?: string[];
    createdAt: string;
    updatedAt: string;
  };
  onClose: () => void;
  onSave?: (updatedNote: { title: string; content: string; category?: string; tags?: string[] }) => void;
  onDelete?: () => void;
  isEditable?: boolean;
}

const NoteDetail: React.FC<NoteDetailProps> = ({
  note,
  onClose,
  onSave,
  onDelete,
  isEditable = false,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState({
    title: note.title,
    content: note.content,
    category: note.category || '',
    tags: note.tags ? [...note.tags] : [],
  });
  const [newTag, setNewTag] = useState('');

  const handleSave = () => {
    if (onSave) {
      onSave(editedNote);
    }
    setIsEditing(false);
  };

  const handleTagAdd = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      if (!editedNote.tags.includes(newTag.trim())) {
        setEditedNote({
          ...editedNote,
          tags: [...(editedNote.tags || []), newTag.trim()],
        });
      }
      setNewTag('');
    }
  };

  const handleTagRemove = (tagToRemove: string) => {
    setEditedNote({
      ...editedNote,
      tags: editedNote.tags?.filter((tag) => tag !== tagToRemove) || [],
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
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
              {isEditable && (
                <>
                  {isEditing ? (
                    <button
                      onClick={handleSave}
                      className="text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-sm font-medium"
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="text-indigo-600 hover:text-indigo-800"
                      aria-label="Edit note"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={onDelete}
                      className="text-red-600 hover:text-red-800"
                      aria-label="Delete note"
                    >
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </>
              )}
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-500"
                aria-label="Close"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {(note.category || (isEditing && isEditable)) && (
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

          {(note.tags?.length || isEditing) && (
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2 items-center">
                {isEditing ? (
                  <>
                    {editedNote.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleTagRemove(tag)}
                          className="ml-1.5 inline-flex items-center justify-center flex-shrink-0 h-4 w-4 text-indigo-600 hover:text-indigo-900"
                        >
                          <span className="sr-only">Remove tag</span>
                          <svg className="h-2 w-2" stroke="currentColor" fill="none" viewBox="0 0 8 8">
                            <path strokeLinecap="round" strokeWidth="1.5" d="M1 1l6 6m0-6L1 7" />
                          </svg>
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyDown={handleTagAdd}
                      className="text-sm border-0 p-1 focus:ring-0 focus:outline-none"
                      placeholder="Add a tag and press Enter"
                    />
                  </>
                ) : (
                  note.tags?.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                    >
                      {tag}
                    </span>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        <div className="px-6 py-3 bg-gray-50 text-right text-xs text-gray-500 border-t border-gray-200">
          <div className="flex justify-between">
            <div>
              Created: {new Date(note.createdAt).toLocaleString()}
              {note.updatedAt !== note.createdAt && (
                <span className="ml-2">
                  • Updated: {new Date(note.updatedAt).toLocaleString()}
                </span>
              )}
            </div>
            {isEditable && !isEditing && (
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
    </div>
  );
};

export default NoteDetail;
