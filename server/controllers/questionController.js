import { Question } from '../models/Question.js';
import { Category } from '../models/Category.js';

// Get questions by category
export const getQuestionsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    
    const questions = await Question.find({ categoryId })
      .sort({ orderIndex: 1 })
      .populate('categoryId', 'name');
    
    res.json({
      success: true,
      data: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching questions',
      error: error.message
    });
  }
};

// Get single question by ID
export const getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const question = await Question.findById(id).populate('categoryId', 'name');
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching question',
      error: error.message
    });
  }
};

// Create new question
export const createQuestion = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { questionText } = req.body;
    
    if (!questionText?.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Question text is required'
      });
    }
    
    // Verify category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: 'Category not found'
      });
    }
    
    // Get the next order index
    const lastQuestion = await Question.findOne({ categoryId }).sort({ orderIndex: -1 });
    const orderIndex = lastQuestion ? lastQuestion.orderIndex + 1 : 0;
    
    const question = await Question.create({
      categoryId,
      questionText: questionText.trim(),
      orderIndex
    });
    
    const populatedQuestion = await Question.findById(question._id).populate('categoryId', 'name');
    
    res.status(201).json({
      success: true,
      data: populatedQuestion
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating question',
      error: error.message
    });
  }
};

// Update question
export const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const { questionText, favorite, completed } = req.body;
    
    const updateData = {};
    if (questionText !== undefined) {
      if (!questionText.trim()) {
        return res.status(400).json({
          success: false,
          message: 'Question text cannot be empty'
        });
      }
      updateData.questionText = questionText.trim();
    }
    
    if (favorite !== undefined) {
      updateData.favorite = Boolean(favorite);
    }

    if (completed !== undefined) {
      updateData.completed = Boolean(completed);
    }
    
    const question = await Question.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('categoryId', 'name');
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating question',
      error: error.message
    });
  }
};

// Delete question
export const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    
    const question = await Question.findByIdAndDelete(id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Question deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting question',
      error: error.message
    });
  }
};

// Reorder questions
export const reorderQuestions = async (req, res) => {
  try {
    const { questions } = req.body;
    
    if (!Array.isArray(questions)) {
      return res.status(400).json({
        success: false,
        message: 'Questions array is required'
      });
    }
    
    // Update each question's orderIndex
    const updatePromises = questions.map((item, index) => 
      Question.findByIdAndUpdate(
        item.id,
        { orderIndex: index },
        { new: true }
      )
    );
    
    await Promise.all(updatePromises);
    
    res.json({
      success: true,
      message: 'Questions reordered successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error reordering questions',
      error: error.message
    });
  }
};

// Get favorite questions
export const getFavoriteQuestions = async (req, res) => {
  try {
    const questions = await Question.find({ favorite: true })
      .sort({ updatedAt: -1 })
      .populate('categoryId', 'name');
    
    res.json({
      success: true,
      data: questions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching favorite questions',
      error: error.message
    });
  }
};
