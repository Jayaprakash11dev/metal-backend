import express from 'express';
import { body } from 'express-validator';
import {
  createPurity,
  getPurities,
  updatePurity,
  deletePurity,
} from '../controllers/purity.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getPurities);
router.post(
  '/',
  protect,
  [body('value').notEmpty(), body('metal').isIn(['Gold', 'Silver', 'Platinum'])],
  createPurity
);
router.put('/:id', protect, updatePurity);
router.delete('/:id', protect, deletePurity);

export default router;
