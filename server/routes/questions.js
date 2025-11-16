import express from 'express';
import {
  getQuestionsByCategory,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  reorderQuestions,
  getFavoriteQuestions
} from '../controllers/questionController.js';

const router = express.Router();

// GET /api/questions/favorites
router.get('/favorites', getFavoriteQuestions);

// PATCH /api/questions/reorder
router.patch('/reorder', reorderQuestions);

// GET /api/categories/:categoryId/questions
router.get('/category/:categoryId', getQuestionsByCategory);

// POST /api/categories/:categoryId/questions
router.post('/category/:categoryId', createQuestion);

// GET /api/questions/:id
router.get('/:id', getQuestionById);

// PATCH /api/questions/:id
router.patch('/:id', updateQuestion);

// DELETE /api/questions/:id
router.delete('/:id', deleteQuestion);

export default router;
