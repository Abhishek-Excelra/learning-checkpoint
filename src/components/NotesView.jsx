import { useState, useEffect } from 'react';
import { getNotes, setNotes, getLastSavedTimestamp, setLastSavedTimestamp } from '../utils/localStorage';

export default function NotesView() {
  const [localNotes, setLocalNotes] = useState('');
  const [lastSaved, setLastSaved] = useState(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Load notes from localStorage on mount
    const savedNotes = getNotes();
    setLocalNotes(savedNotes);
    const timestamp = getLastSavedTimestamp();
    setLastSaved(timestamp);
  }, []);

  useEffect(() => {
    // Auto-save with debounce
    const timeoutId = setTimeout(() => {
      const savedNotes = getNotes();
      if (localNotes !== savedNotes) {
        setIsSaving(true);
        setNotes(localNotes);
        setLastSavedTimestamp();
        setLastSaved(new Date());
        setTimeout(() => setIsSaving(false), 500);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [localNotes]);

  const handleNotesChange = (e) => {
    setLocalNotes(e.target.value);
  };

  const handleManualSave = () => {
    setIsSaving(true);
    setNotes(localNotes);
    setLastSavedTimestamp();
    setLastSaved(new Date());
    setTimeout(() => setIsSaving(false), 500);
  };

  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Never';
    
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="p-6 h-full flex flex-col">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Notes</h1>
            <p className="text-neutral-600">
              Your personal learning notes. Changes are automatically saved.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="text-sm text-neutral-500">
              {isSaving ? (
                <span className="flex items-center text-primary-600">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </span>
              ) : (
                <span>Last saved: {formatTimestamp(lastSaved)}</span>
              )}
            </div>
            <button
              onClick={handleManualSave}
              disabled={isSaving || localNotes === getNotes()}
              className={`btn-secondary ${
                (isSaving || localNotes === getNotes()) 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:bg-neutral-300'
              }`}
            >
              Save Now
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="bg-white border border-neutral-200 rounded-lg flex-1 flex flex-col">
          <div className="border-b border-neutral-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-neutral-900">Your Learning Notes</h3>
              <div className="flex items-center space-x-2 text-sm text-neutral-500">
                <span>{localNotes.length} characters</span>
                <span>•</span>
                <span>{localNotes.split('\n').length} lines</span>
              </div>
            </div>
          </div>
          
          <textarea
            value={localNotes}
            onChange={handleNotesChange}
            placeholder="Start writing your learning notes here...

You can use this space to:
• Jot down key concepts and insights
• Copy and paste code snippets for reference
• Write summaries of what you've learned
• Plan your learning goals and track progress
• Keep track of useful resources and links

Your notes are automatically saved as you type!"
            className="flex-1 p-4 border-none resize-none focus:outline-none focus:ring-0 font-mono text-sm leading-relaxed"
            style={{ minHeight: '400px' }}
          />
        </div>
        
        <div className="mt-4 p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
          <h4 className="font-medium text-neutral-900 mb-2">Tips for effective note-taking:</h4>
          <ul className="text-sm text-neutral-600 space-y-1">
            <li>• Use markdown syntax for better formatting</li>
            <li>• Include code examples with explanations</li>
            <li>• Add timestamps for learning sessions</li>
            <li>• Reference external resources and documentation</li>
            <li>• Review and update your notes regularly</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
