import React from 'react';
import { useApp } from '../context/AppContext';
import ItemCard from './ItemCard';

export default function FavoritesView() {
  const { favorites, removeFromFavorites } = useApp();

  const handleRemoveFavorite = (itemId) => {
    removeFromFavorites(itemId);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900 mb-2">Favorites</h1>
            <p className="text-neutral-600">
              Your saved learning resources for quick access.
            </p>
          </div>
          <div className="text-sm text-neutral-500">
            {favorites.length} {favorites.length === 1 ? 'item' : 'items'}
          </div>
        </div>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-neutral-400 mb-4">
            <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No favorites yet</h3>
          <p className="text-neutral-600 mb-4">
            Start adding items to your favorites by clicking the heart icon on any learning resource.
          </p>
          <button
            onClick={() => window.location.reload()} // Simple way to navigate back
            className="btn-primary"
          >
            Browse JavaScript Resources
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {favorites.map((item) => (
            <ItemCard 
              key={item.id} 
              item={item} 
              showRemove={true}
              onRemove={handleRemoveFavorite}
            />
          ))}
        </div>
      )}
    </div>
  );
}
