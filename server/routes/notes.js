import express from 'express';
import { getNotes, updateNotes } from '../controllers/noteController.js';

const router = express.Router();

// GET /api/notes
router.get('/', getNotes);

// PUT /api/notes
router.put('/', updateNotes);

export default router;
