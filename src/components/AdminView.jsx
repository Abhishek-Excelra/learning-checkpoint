import { useState, useEffect } from 'react';
import apiService from '../services/api';

export default function AdminView() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTopic, setNewTopic] = useState({
    title: '',
    dayNumber: 1,
    dayTitle: '',
    language: 'javascript',
    order: 0,
    difficulty: 'beginner',
    estimatedTime: 30,
    description: ''
  });

  useEffect(() => {
    loadTopics();
  }, []);

  const loadTopics = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getTopics('javascript');
      
      if (response.success) {
        setTopics(response.data);
      }
    } catch (err) {
      console.error('Error loading topics:', err);
      setError('Failed to load topics');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTopic = async (e) => {
    e.preventDefault();
    
    try {
      setError(null);
      const response = await apiService.createTopic(newTopic);
      
      if (response.success) {
        // Reset form
        setNewTopic({
          title: '',
          dayNumber: 1,
          dayTitle: '',
          language: 'javascript',
          order: 0,
          difficulty: 'beginner',
          estimatedTime: 30,
          description: ''
        });
        setShowAddForm(false);
        
        // Reload topics
        await loadTopics();
        
        alert('Topic added successfully!');
      }
    } catch (err) {
      console.error('Error adding topic:', err);
      setError('Failed to add topic');
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type } = e.target;
    setNewTopic(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value
    }));
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-sm border border-neutral-200 p-6 mb-6">
        <h1 className="text-3xl font-bold text-neutral-900 text-center mb-6">
          Admin Panel - Manage Topics
        </h1>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex">
              <div className="text-red-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Add Topic Button */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-neutral-800">
            JavaScript Learning Topics ({topics.reduce((sum, day) => sum + day.topics.length, 0)} total)
          </h2>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            {showAddForm ? 'Cancel' : 'Add New Topic'}
          </button>
        </div>

        {/* Add Topic Form */}
        {showAddForm && (
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <h3 className="text-lg font-semibold mb-4">Add New Topic</h3>
            <form onSubmit={handleAddTopic} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={newTopic.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Arrow functions and 'this' binding"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Day Number *
                </label>
                <input
                  type="number"
                  name="dayNumber"
                  value={newTopic.dayNumber}
                  onChange={handleInputChange}
                  min="1"
                  max="30"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Day Title *
                </label>
                <input
                  type="text"
                  name="dayTitle"
                  value={newTopic.dayTitle}
                  onChange={handleInputChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="e.g., Functions Deep Dive"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Order in Day *
                </label>
                <input
                  type="number"
                  name="order"
                  value={newTopic.order}
                  onChange={handleInputChange}
                  min="0"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <select
                  name="difficulty"
                  value={newTopic.difficulty}
                  onChange={handleInputChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Time (minutes)
                </label>
                <input
                  type="number"
                  name="estimatedTime"
                  value={newTopic.estimatedTime}
                  onChange={handleInputChange}
                  min="5"
                  max="180"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  name="description"
                  value={newTopic.description}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Brief description of what this topic covers..."
                />
              </div>

              <div className="md:col-span-2 flex gap-4">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Add Topic
                </button>
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Topics List */}
        <div className="space-y-6">
          {topics.map((day) => (
            <div key={day.day} className="border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Day {day.day} — {day.title} ({day.topics.length} topics)
              </h3>
              <div className="grid gap-2">
                {day.topics.map((topic, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-gray-500 font-mono">#{index}</span>
                        <span className="font-medium">{topic.title}</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          topic.difficulty === 'beginner' ? 'bg-green-100 text-green-800' :
                          topic.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {topic.difficulty}
                        </span>
                        <span className="text-sm text-gray-500">
                          ~{topic.estimatedTime}min
                        </span>
                      </div>
                      {topic.description && (
                        <p className="text-sm text-gray-600 mt-1 ml-8">{topic.description}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
