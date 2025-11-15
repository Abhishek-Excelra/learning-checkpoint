import { useState, useEffect } from 'react';
import { getChecklistProgress, setChecklistProgress } from '../utils/localStorage';

export default function TestCheckbox() {
  const [progress, setProgress] = useState({});

  useEffect(() => {
    const savedProgress = getChecklistProgress();
    console.log('TestCheckbox: Loaded progress from localStorage:', savedProgress);
    setProgress(savedProgress);
  }, []);

  const handleToggle = (topicId) => {
    console.log('TestCheckbox: Toggling topic:', topicId);
    const newProgress = { ...progress };
    newProgress[topicId] = !newProgress[topicId];
    console.log('TestCheckbox: New progress:', newProgress);
    
    setProgress(newProgress);
    setChecklistProgress(newProgress);
    console.log('TestCheckbox: Saved to localStorage');
  };

  const testTopicId = 'day1_topic0';
  const isChecked = !!progress[testTopicId];

  return (
    <div className="p-4 bg-white border rounded">
      <h3 className="text-lg font-semibold mb-4">Checkbox Test</h3>
      <div className="flex items-center space-x-3">
        <input
          type="checkbox"
          id={testTopicId}
          checked={isChecked}
          onChange={() => handleToggle(testTopicId)}
          className="w-5 h-5 text-green-600 bg-neutral-100 border-neutral-300 rounded focus:ring-green-500 focus:ring-2"
        />
        <label htmlFor={testTopicId} className="text-lg cursor-pointer">
          Test Topic - Global, function, block scope
        </label>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>Current state: {isChecked ? 'Checked' : 'Unchecked'}</p>
        <p>Progress object: {JSON.stringify(progress)}</p>
      </div>
    </div>
  );
}
