import { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import LoadingSpinner from './LoadingSpinner';

function AddQuestionForm({ categoryId, onClose, onSuccess }) {
  const [questionText, setQuestionText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createQuestion } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;

    setIsSubmitting(true);
    try {
      await createQuestion(categoryId, questionText.trim());
      setQuestionText('');
      onSuccess();
    } catch (error) {
      console.error('Failed to create question:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">Add New Question</h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-600"
            disabled={isSubmitting}
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="questionText" className="block text-sm font-medium text-neutral-700 mb-2">
              Question Text
            </label>
            <textarea
              id="questionText"
              value={questionText}
              onChange={(e) => setQuestionText(e.target.value)}
              rows={4}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              placeholder="Enter your learning question or topic..."
              disabled={isSubmitting}
              autoFocus
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex items-center space-x-2"
              disabled={!questionText.trim() || isSubmitting}
            >
              {isSubmitting && <LoadingSpinner size="sm" />}
              <span>{isSubmitting ? 'Adding...' : 'Add Question'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddQuestionForm;
