import { useState } from 'react';
import { javascriptLearningPlan, getDayProgress, getOverallProgress } from '../data/javascriptItems';

const STORAGE_KEY = "lc_checklist_progress";

export default function ChecklistView() {
  const [, forceUpdate] = useState({});

  // Force re-render function
  const triggerRerender = () => forceUpdate({});

  // Direct localStorage functions (matching reference file approach)
  const loadState = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : {};
    } catch (e) {
      console.error("Error reading localStorage", e);
      return {};
    }
  };

  const saveState = (state) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Error writing localStorage", e);
    }
  };

  const handleResetAll = () => {
    if (window.confirm('Reset all progress? This will clear all your completed topics.')) {
      localStorage.removeItem(STORAGE_KEY);
      triggerRerender();
    }
  };

  const handleToggleTopic = (topicId) => {
    const state = loadState();
    state[topicId] = !state[topicId];
    saveState(state);
    triggerRerender();
  };

  // Get current state for calculations
  const currentState = loadState();
  const overallProgress = getOverallProgress(currentState);

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 text-center mb-4">
          JavaScript Learning Checklist
        </h1>
        
        {/* Controls */}
        <div className="flex justify-between items-center mb-6 text-sm text-neutral-600">
          <div>
            Local progress is stored in <code className="bg-neutral-100 px-2 py-1 rounded">localStorage</code>.
          </div>
          <button
            onClick={handleResetAll}
            className="bg-neutral-600 text-white px-4 py-2 rounded hover:bg-neutral-700 transition-colors duration-200"
          >
            Reset All
          </button>
        </div>

        {/* Overall Progress */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-medium text-neutral-700">
              Overall progress: {overallProgress.percentage}%
            </span>
            <span className="text-sm text-neutral-500">
              {overallProgress.completed}/{overallProgress.total} topics
            </span>
          </div>
          <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-green-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${overallProgress.percentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Days List */}
      <div className="space-y-6">
        {javascriptLearningPlan.map((day) => {
          const dayProgress = getDayProgress(day.day, currentState);
          
          return (
            <div key={day.day} className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6">
              {/* Day Header */}
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-neutral-800 border-b-2 border-neutral-200 pb-2">
                  Day {day.day} — {day.title}
                </h2>
                <span className="text-sm text-neutral-500 bg-neutral-50 px-3 py-1 rounded-full">
                  {dayProgress.completed}/{dayProgress.total} ({dayProgress.percentage}%)
                </span>
              </div>

              {/* Topics */}
              <div className="space-y-3">
                {day.topics.map((topic, topicIndex) => {
                  const topicId = `day${day.day}_topic${topicIndex}`;
                  const isCompleted = !!currentState[topicId];
                  
                  return (
                    <div key={topicIndex} className="flex items-center py-2">
                      <input
                        type="checkbox"
                        id={topicId}
                        checked={isCompleted}
                        onChange={() => handleToggleTopic(topicId)}
                        className="w-5 h-5 text-green-600 bg-neutral-100 border-neutral-300 rounded focus:ring-green-500 focus:ring-2 mr-4 cursor-pointer"
                      />
                      <label
                        htmlFor={topicId}
                        className={`text-lg cursor-pointer transition-colors duration-200 ${
                          isCompleted 
                            ? 'text-neutral-500' 
                            : 'text-neutral-700 hover:text-neutral-900'
                        }`}
                      >
                        {topic}
                      </label>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-8 text-center text-sm text-neutral-500">
        <p>Complete this 14-day JavaScript learning plan to master core concepts!</p>
        <p className="mt-2">
          Progress is automatically saved to your browser&apos;s local storage.
        </p>
      </div>
    </div>
  );
}
