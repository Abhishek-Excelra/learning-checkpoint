import { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import ChecklistView from './components/ChecklistView';
import NotesView from './components/NotesView';
import AdminView from './components/AdminView';

function AppContent() {
  const [activeView, setActiveView] = useState('javascript');

  const renderMainContent = () => {
    switch (activeView) {
      case 'javascript':
        return <ChecklistView />;
      case 'notes':
        return <NotesView />;
      case 'admin':
        return <AdminView />;
      case 'node':
      case 'django':
        return (
          <div className="p-6 text-center">
            <div className="text-neutral-400 mb-4">
              <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-neutral-900 mb-2">Coming Soon</h3>
            <p className="text-neutral-600">
              {activeView === 'node' ? 'Node.js' : 'Django'} learning resources are currently being prepared.
            </p>
          </div>
        );
      default:
        return <ChecklistView />;
    }
  };

  return (
    <div className="h-screen flex flex-col bg-neutral-50">
      <Header />
      <div className="flex-1 flex overflow-hidden">
        <Sidebar activeView={activeView} setActiveView={setActiveView} />
        <main className="flex-1 overflow-auto">
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
