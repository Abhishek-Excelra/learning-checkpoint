import { useState, useEffect, useCallback } from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Save, CheckCircle } from 'lucide-react';

function NotesPage() {
  const { notes, updateNotes } = useApp();
  const [localNotes, setLocalNotes] = useState(notes);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Update local notes when context notes change
  useEffect(() => {
    setLocalNotes(notes);
  }, [notes]);

  // Debounced save function
  const debouncedSave = useCallback(
    debounce(async (content) => {
      setIsSaving(true);
      try {
        await updateNotes(content);
        setLastSaved(new Date());
      } catch (error) {
        console.error('Failed to save notes:', error);
      } finally {
        setIsSaving(false);
      }
    }, 1000),
    [updateNotes]
  );

  const handleNotesChange = (e) => {
    const newContent = e.target.value;
    setLocalNotes(newContent);
    debouncedSave(newContent);
  };

  // Simple debounce function
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <FileText className="h-6 w-6 text-primary-600" />
            <div>
              <h1 className="text-2xl font-bold text-neutral-900">Notes</h1>
              <p className="text-neutral-600 mt-1">
                Your personal learning notes
                {lastSaved && (
                  <span className="text-sm text-neutral-500 ml-2">
                    • Last saved: {lastSaved.toLocaleString()}
                  </span>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            {isSaving ? (
              <>
                <Save className="h-4 w-4 text-blue-500 animate-pulse" />
                <span className="text-blue-500">Saving...</span>
              </>
            ) : lastSaved ? (
              <>
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-green-500">Saved to database</span>
              </>
            ) : (
              <>
                <Save className="h-4 w-4 text-neutral-500" />
                <span className="text-neutral-500">Auto-save enabled</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="h-full">
          <textarea
            value={localNotes}
            onChange={handleNotesChange}
            placeholder="Start writing your learning notes here...

You can use this space to:
• Jot down key concepts and insights
• Track your learning progress
• Write code snippets and examples
• Plan your next learning steps

Your notes are automatically saved to the database and will persist across sessions."
            className="w-full h-full p-4 border border-neutral-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}

export default NotesPage;
