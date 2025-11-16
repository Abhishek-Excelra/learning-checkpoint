import { useState, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { useApp } from '../context/AppContext';
import SortableQuestionCard from './SortableQuestionCard';

function QuestionsList({ questions, showCategory = true }) {
  const { reorderQuestions } = useApp();
  const [localQuestions, setLocalQuestions] = useState(questions);
  const [isDragging, setIsDragging] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    setLocalQuestions(questions);
  }, [questions]);

  const handleDragStart = () => {
    setIsDragging(true);
  };

  const handleDragEnd = async (event) => {
    setIsDragging(false);
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = localQuestions.findIndex((item) => item._id === active.id);
      const newIndex = localQuestions.findIndex((item) => item._id === over.id);

      const newQuestions = arrayMove(localQuestions, oldIndex, newIndex);
      setLocalQuestions(newQuestions);

      try {
        await reorderQuestions(newQuestions);
      } catch (error) {
        // Revert on error
        setLocalQuestions(localQuestions);
        console.error('Failed to reorder questions:', error);
      }
    }
  };

  if (localQuestions.length === 0) {
    return null;
  }

  return (
    <div className="p-6">
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext items={localQuestions.map(q => q._id)} strategy={verticalListSortingStrategy}>
          <div className="space-y-3">
            {localQuestions.map((question) => (
              <SortableQuestionCard
                key={question._id}
                question={question}
                isDragging={isDragging}
                showCategory={showCategory}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
}

export default QuestionsList;
