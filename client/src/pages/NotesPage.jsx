import { useApp } from '../context/AppContext';
import { FileText, Save } from 'lucide-react';

function NotesPage() {
  const { notes, setNotes } = useApp();

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
  };

  const lastSaved = localStorage.getItem('lc_notes_timestamp');
  const lastSavedDate = lastSaved ? new Date(lastSaved).toLocaleString() : null;

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
                {lastSavedDate && (
                  <span className="text-sm text-neutral-500 ml-2">
                    • Last saved: {lastSavedDate}
                  </span>
                )}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-neutral-500">
            <Save className="h-4 w-4" />
            <span>Auto-saved locally</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        <div className="h-full">
          <textarea
            value={notes}
            onChange={handleNotesChange}
            placeholder="Start writing your learning notes here...

You can use this space to:
• Jot down key concepts and insights
• Track your learning progress
• Write code snippets and examples
• Plan your next learning steps

Your notes are automatically saved locally and will persist across sessions."
            className="w-full h-full p-4 border border-neutral-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm leading-relaxed"
          />
        </div>
      </div>
    </div>
  );
}

export default NotesPage;
