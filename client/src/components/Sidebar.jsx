import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { BookOpen, Heart, FileText, Plus, Settings } from 'lucide-react';
import AddCategoryModal from './AddCategoryModal';

function Sidebar() {
  const location = useLocation();
  const { categories, selectedCategory, setSelectedCategory } = useApp();
  const [showAddCategory, setShowAddCategory] = useState(false);

  const navigationItems = [
    {
      path: '/questions',
      label: 'Questions',
      icon: BookOpen,
      active: location.pathname === '/' || location.pathname === '/questions'
    },
    {
      path: '/favorites',
      label: 'Favorites',
      icon: Heart,
      active: location.pathname === '/favorites'
    },
    {
      path: '/notes',
      label: 'Notes',
      icon: FileText,
      active: location.pathname === '/notes'
    }
  ];

  return (
    <>
      <aside className="w-64 bg-white border-r border-neutral-200 h-full flex flex-col">
        {/* Navigation */}
        <div className="p-4 border-b border-neutral-100">
          <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
            Navigation
          </h2>
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`nav-item ${item.active ? 'active' : ''}`}
                >
                  <Icon className="h-4 w-4" />
                  <span className="ml-3">{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Categories */}
        <div className="p-4 flex-1 overflow-auto">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide">
              Categories
            </h2>
            <button
              onClick={() => setShowAddCategory(true)}
              className="p-1 text-neutral-400 hover:text-neutral-600 rounded"
              title="Add Category"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          
          <div className="space-y-1">
            {categories.map((category) => (
              <button
                key={category._id}
                onClick={() => setSelectedCategory(category)}
                className={`
                  w-full text-left px-3 py-2 text-sm rounded-md transition-colors duration-200
                  ${selectedCategory?._id === category._id 
                    ? 'bg-primary-100 text-primary-700 border border-primary-200' 
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="truncate">{category.name}</span>
                  <Settings className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </button>
            ))}
            
            {categories.length === 0 && (
              <div className="text-center py-8 text-neutral-400">
                <BookOpen className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No categories yet</p>
                <button
                  onClick={() => setShowAddCategory(true)}
                  className="text-primary-600 hover:text-primary-700 text-sm mt-1"
                >
                  Add your first category
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>

      {showAddCategory && (
        <AddCategoryModal
          isOpen={showAddCategory}
          onClose={() => setShowAddCategory(false)}
        />
      )}
    </>
  );
}

export default Sidebar;
