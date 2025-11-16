import { Note } from '../models/Note.js';

// Get user notes
export const getNotes = async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    
    let note = await Note.findOne({ userId });
    
    // If no note exists, create one
    if (!note) {
      note = await Note.create({ userId, content: '' });
    }
    
    res.json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching notes',
      error: error.message
    });
  }
};

// Update user notes
export const updateNotes = async (req, res) => {
  try {
    const userId = req.query.userId || 'default-user';
    const { content } = req.body;
    
    if (content === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Content is required'
      });
    }
    
    let note = await Note.findOne({ userId });
    
    if (!note) {
      // Create new note if it doesn't exist
      note = await Note.create({ userId, content });
    } else {
      // Update existing note
      note.content = content;
      await note.save();
    }
    
    res.json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating notes',
      error: error.message
    });
  }
};
