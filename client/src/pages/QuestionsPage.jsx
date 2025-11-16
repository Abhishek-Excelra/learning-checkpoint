import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, BookOpen } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import AddQuestionForm from '../components/AddQuestionForm';
import QuestionsList from '../components/QuestionsList';

function QuestionsPage() {
  const { selectedCategory, questions, loading } = useApp();
  const [showAddQuestion, setShowAddQuestion] = useState(false);

  if (!selectedCategory) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-neutral-900 mb-2">No Category Selected</h3>
          <p className="text-neutral-600">
            Select a category from the sidebar to view questions, or create a new category to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-neutral-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">{selectedCategory.name}</h1>
            <p className="text-neutral-600 mt-1">
              {questions.length} {questions.length === 1 ? 'question' : 'questions'}
              {questions.length > 0 && (
                <>
                  {' • '}
                  {questions.filter(q => q.completed).length} completed
                </>
              )}
            </p>
          </div>
          
          <button
            onClick={() => setShowAddQuestion(true)}
            className="btn-primary flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Add Question</span>
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <LoadingSpinner size="lg" />
          </div>
        ) : questions.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <BookOpen className="h-16 w-16 text-neutral-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-neutral-900 mb-2">No Questions Yet</h3>
              <p className="text-neutral-600 mb-4">
                Start building your learning checklist by adding your first question.
              </p>
              <button
                onClick={() => setShowAddQuestion(true)}
                className="btn-primary"
              >
                Add First Question
              </button>
            </div>
          </div>
        ) : (
          <QuestionsList questions={questions} showCategory={false} />
        )}
      </div>

      {/* Add Question Modal */}
      {showAddQuestion && (
        <AddQuestionForm
          categoryId={selectedCategory._id}
          onClose={() => setShowAddQuestion(false)}
          onSuccess={() => setShowAddQuestion(false)}
        />
      )}
    </div>
  );
}

export default QuestionsPage;
