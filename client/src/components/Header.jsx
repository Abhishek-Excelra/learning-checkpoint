import { useApp } from '../context/AppContext';
import { BookOpen, Heart, FileText } from 'lucide-react';

function Header() {
  const { categories, questions, favoriteQuestions } = useApp();

  const totalQuestions = questions.length;
  const completedQuestions = questions.filter(q => q.completed).length;
  const totalFavorites = favoriteQuestions.length;

  return (
    <header className="bg-white border-b border-neutral-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <BookOpen className="h-8 w-8 text-primary-600" />
          <div>
            <h1 className="text-xl font-bold text-neutral-900">Learning Checkpoint</h1>
            <p className="text-sm text-neutral-500">Track your learning progress</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="flex items-center space-x-2 text-sm">
            <BookOpen className="h-4 w-4 text-neutral-400" />
            <span className="text-neutral-600">
              {categories.length} {categories.length === 1 ? 'Category' : 'Categories'}
            </span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-neutral-600">
                {completedQuestions}/{totalQuestions} Completed
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-sm">
            <Heart className="h-4 w-4 text-red-400" />
            <span className="text-neutral-600">
              {totalFavorites} {totalFavorites === 1 ? 'Favorite' : 'Favorites'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
