import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, GripVertical, Trash2, Edit3, Check, X } from 'lucide-react';

function QuestionCard({ question, dragHandleProps, isDragging, showCategory = true }) {
  const { updateQuestion, deleteQuestion } = useApp();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(question.questionText);
  const [loading, setLoading] = useState(false);

  const handleFavoriteToggle = async (e) => {
    e.stopPropagation(); // Prevent drag events
    try {
      await updateQuestion(question._id, { favorite: !question.favorite });
    } catch (error) {
      console.error('Failed to toggle favorite:', error);
    }
  };

  const handleCompletionToggle = async (e) => {
    e.stopPropagation(); // Prevent drag events
    try {
      await updateQuestion(question._id, { completed: !question.completed });
    } catch (error) {
      console.error('Failed to toggle completion:', error);
    }
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    setIsEditing(true);
    setEditText(question.questionText);
  };

  const handleSaveEdit = async (e) => {
    e.stopPropagation();
    if (!editText.trim() || editText === question.questionText) {
      setIsEditing(false);
      return;
    }

    setLoading(true);
    try {
      await updateQuestion(question._id, { questionText: editText.trim() });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update question:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEdit = (e) => {
    e.stopPropagation();
    setIsEditing(false);
    setEditText(question.questionText);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    if (!window.confirm('Are you sure you want to delete this question?')) {
      return;
    }

    try {
      await deleteQuestion(question._id);
    } catch (error) {
      console.error('Failed to delete question:', error);
    }
  };

  return (
    <div className={`
      bg-white border border-neutral-200 rounded-lg p-4 transition-all duration-200
      ${isDragging ? 'shadow-lg' : 'hover:shadow-md'}
    `}>
      <div className="flex items-start gap-3">
        {/* Completion Checkbox */}
        <div className="mt-1" onClick={(e) => e.stopPropagation()}>
          <input
            type="checkbox"
            checked={question.completed || false}
            onChange={handleCompletionToggle}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 cursor-pointer"
          />
        </div>

        {/* Drag Handle */}
        <div
          {...dragHandleProps}
          className="mt-1 text-neutral-400 hover:text-neutral-600 cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Category Badge */}
          {showCategory && question.categoryId && (
            <div className="mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {question.categoryId.name}
              </span>
            </div>
          )}

          {/* Question Text */}
          {isEditing ? (
            <textarea
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="w-full p-2 text-sm border border-neutral-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
              rows={3}
              autoFocus
            />
          ) : (
            <p className={`text-neutral-900 text-sm leading-relaxed ${question.completed ? 'text-neutral-500' : ''}`}>
              {question.questionText}
            </p>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {isEditing ? (
            <>
              <button
                onClick={handleSaveEdit}
                disabled={loading}
                className="p-1.5 text-green-600 hover:text-green-700 hover:bg-green-50 rounded transition-colors"
                title="Save"
              >
                <Check className="h-4 w-4" />
              </button>
              <button
                onClick={handleCancelEdit}
                className="p-1.5 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-50 rounded transition-colors"
                title="Cancel"
              >
                <X className="h-4 w-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleFavoriteToggle}
                className={`p-1.5 rounded transition-colors ${
                  question.favorite
                    ? 'text-red-500 hover:text-red-600 hover:bg-red-50'
                    : 'text-neutral-400 hover:text-red-500 hover:bg-red-50'
                }`}
                title={question.favorite ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart className={`h-4 w-4 ${question.favorite ? 'fill-current' : ''}`} />
              </button>
              
              <button
                onClick={handleEdit}
                className="p-1.5 text-neutral-400 hover:text-neutral-600 hover:bg-neutral-50 rounded transition-colors"
                title="Edit"
              >
                <Edit3 className="h-4 w-4" />
              </button>
              
              <button
                onClick={handleDelete}
                className="p-1.5 text-neutral-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
                title="Delete"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionCard;
