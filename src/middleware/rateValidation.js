import { body, query, param, validationResult } from "express-validator";
import mongoose from "mongoose";
import { protect } from "./auth.js";

const validateResult = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }
  next();
};

export const validateRate = [
  protect,

  body("metal")
    .notEmpty().withMessage("Metal is required")
    .isString().withMessage("Metal must be a string"),

  body("purityId")
    .notEmpty().withMessage("Purity ID is required")
    .isMongoId().withMessage("Invalid Purity ID format"),

  body("rate")
    .notEmpty().withMessage("Rate is required")
    .isNumeric().withMessage("Rate must be a number"),

  validateResult,
];

export const validateGetLatestRate = [
  protect,

  query("metal")
    .notEmpty().withMessage("Metal is required")
    .isString().withMessage("Metal must be a string"),

  query("purityId")
    .notEmpty().withMessage("Purity ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid Purity ID format"),

  validateResult,
];

export const validateGetRateHistory = [
  protect,

  query("metal")
    .notEmpty().withMessage("Metal is required")
    .isString().withMessage("Metal must be a string"),

  query("purityId")
    .optional()
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid Purity ID format"),

  validateResult,
];


export const validateDeleteRate = [
  protect,

  param("id")
    .notEmpty().withMessage("Rate ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid Rate ID format"),

  validateResult,
];
