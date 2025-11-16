import express from 'express';
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from '../controllers/categoryController.js';

const router = express.Router();

// GET /api/categories
router.get('/', getCategories);

// POST /api/categories
router.post('/', createCategory);

// PATCH /api/categories/:id
router.patch('/:id', updateCategory);

// DELETE /api/categories/:id
router.delete('/:id', deleteCategory);

export default router;
