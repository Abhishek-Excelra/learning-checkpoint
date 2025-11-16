import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    default: ''
  },
  userId: {
    type: String,
    default: 'default-user', // For now, using a default user
    required: true
  }
}, {
  timestamps: true
});

// Ensure only one note per user
noteSchema.index({ userId: 1 }, { unique: true });

export const Note = mongoose.model('Note', noteSchema);
