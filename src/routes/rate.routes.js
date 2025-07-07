import express from "express";
import {
  addRate,
  getLatestRate,
  getRateHistory,
  deleteRate,
} from "../controllers/rate.controller.js";

import {
  validateRate,
  validateGetLatestRate,
  validateGetRateHistory,
  validateDeleteRate
} from "../middleware/validation/rateValidation.js";

const router = express.Router();

router.post("/", validateRate, addRate);
router.get("/latest", validateGetLatestRate, getLatestRate);
router.get("/history", validateGetRateHistory, getRateHistory);
router.delete("/:id", validateDeleteRate, deleteRate);

export default router;
