import express from 'express';
import {
  createPurity,
  getPurities,
  updatePurity,
  deletePurity,
} from '../controllers/purity.controller.js';
import { protect } from '../middleware/auth.js';
import { validateDeletePurity, validatePurity, validateUpdatePurity } from '../middleware/purityValidation.js';

const router = express.Router();


router.post("/", validatePurity, createPurity);
router.get("/", protect, getPurities);
router.put("/:id", validateUpdatePurity, updatePurity);
router.delete("/:id", validateDeletePurity, deletePurity);


export default router;

