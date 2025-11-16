import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import QuestionCard from './QuestionCard';

function SortableQuestionCard({ question, isDragging, showCategory = true }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: question._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <QuestionCard
        question={question}
        dragHandleProps={{ ...attributes, ...listeners }}
        isDragging={isDragging}
        showCategory={showCategory}
      />
    </div>
  );
}

export default SortableQuestionCard;
