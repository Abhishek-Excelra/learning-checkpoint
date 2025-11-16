import { useState } from 'react';
import { X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import LoadingSpinner from './LoadingSpinner';

function AddCategoryModal({ isOpen, onClose }) {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createCategory } = useApp();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    setIsSubmitting(true);
    try {
      await createCategory(name.trim());
      setName('');
      onClose();
    } catch (error) {
      console.error('Failed to create category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-neutral-900">Add New Category</h2>
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
            <label htmlFor="categoryName" className="block text-sm font-medium text-neutral-700 mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-neutral-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="e.g., Docker, React, Python"
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
              disabled={!name.trim() || isSubmitting}
            >
              {isSubmitting && <LoadingSpinner size="sm" />}
              <span>{isSubmitting ? 'Creating...' : 'Create Category'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCategoryModal;
