import { useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Heart } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import QuestionsList from '../components/QuestionsList';

function FavoritesPage() {
  const { favoriteQuestions, loading, loadFavoriteQuestions } = useApp();

  useEffect(() => {
    loadFavoriteQuestions();
  }, [loadFavoriteQuestions]);

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center space-x-3">
          <Heart className="h-6 w-6 text-red-500" />
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Favorite Questions</h1>
            <p className="text-neutral-600 mt-1">
              {favoriteQuestions.length} {favoriteQuestions.length === 1 ? 'favorite question' : 'favorite questions'}
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        ) : favoriteQuestions.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Heart className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No Favorites Yet</h3>
              <p className="text-neutral-600">
                Mark questions as favorites by clicking the heart icon to see them here.
              </p>
            </div>
          </div>
        ) : (
          <QuestionsList questions={favoriteQuestions} showCategory={true} />
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;
