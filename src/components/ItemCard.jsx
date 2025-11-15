import React, { useState } from 'react';
import { useApp } from '../context/AppContext';

export default function ItemCard({ item, showRemove = false, onRemove }) {
  const { addToFavorites, removeFromFavorites, isFavorite } = useApp();
  const [showDetails, setShowDetails] = useState(false);
  const isItemFavorite = isFavorite(item.id);

  const handleFavoriteToggle = () => {
    if (isItemFavorite) {
      removeFromFavorites(item.id);
    } else {
      addToFavorites(item);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-neutral-100 text-neutral-800';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'lesson':
        return (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        );
      case 'snippet':
        return (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
          </svg>
        );
      case 'exercise':
        return (
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="card">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <span className="text-neutral-500">
            {getTypeIcon(item.type)}
          </span>
          <h3 className="font-semibold text-neutral-900">{item.title}</h3>
        </div>
        <div className="flex items-center space-x-2">
          {showRemove ? (
            <button
              onClick={() => onRemove(item.id)}
              className="p-1 text-red-500 hover:text-red-700 transition-colors duration-200"
              title="Remove from favorites"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleFavoriteToggle}
              className={`p-1 transition-colors duration-200 ${
                isItemFavorite 
                  ? 'text-red-500 hover:text-red-700' 
                  : 'text-neutral-400 hover:text-red-500'
              }`}
              title={isItemFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg 
                className="h-4 w-4" 
                fill={isItemFavorite ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          )}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="p-1 text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
            title={showDetails ? 'Hide details' : 'Show details'}
          >
            <svg 
              className={`h-4 w-4 transition-transform duration-200 ${showDetails ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>

      <p className="text-neutral-600 text-sm mb-3 leading-relaxed">
        {item.description}
      </p>

      <div className="flex items-center justify-between mb-3">
        <div className="flex flex-wrap gap-1">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-neutral-100 text-neutral-700 text-xs px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <span className={`text-xs px-2 py-1 rounded-full font-medium ${getDifficultyColor(item.difficulty)}`}>
          {item.difficulty}
        </span>
      </div>

      {showDetails && (
        <div className="mt-4 pt-4 border-t border-neutral-100">
          <h4 className="text-sm font-medium text-neutral-700 mb-2">Code Example:</h4>
          <pre className="bg-neutral-50 border border-neutral-200 rounded-md p-3 text-sm overflow-x-auto">
            <code className="text-neutral-800">{item.content}</code>
          </pre>
        </div>
      )}
    </div>
  );
}
