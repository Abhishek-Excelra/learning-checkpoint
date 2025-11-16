import mongoose from 'mongoose';

const questionSchema = new mongoose.Schema({
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'Category ID is required']
  },
  questionText: {
    type: String,
    required: [true, 'Question text is required'],
    trim: true
  },
  orderIndex: {
    type: Number,
    required: true,
    default: 0
  },
  favorite: {
    type: Boolean,
    default: false
  },
  completed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Index for efficient querying
questionSchema.index({ categoryId: 1, orderIndex: 1 });

export const Question = mongoose.model('Question', questionSchema);
