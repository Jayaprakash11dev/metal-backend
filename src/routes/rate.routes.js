import express from 'express';
import { protect } from '../middleware/auth.js';
import {
  addRate,
  deleteRate,
  getLatestRate,
  getRateHistory,
} from '../controllers/rate.controller.js';

const router = express.Router();

router.post('/', protect, addRate);
router.get('/latest', protect, getLatestRate);
router.get('/history', protect, getRateHistory);
router.delete("/:id", protect, deleteRate);
export default router;
