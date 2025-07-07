import { body, param, validationResult } from "express-validator";
import mongoose from "mongoose";
import { protect } from "../auth.js";


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

export const validatePurity = [
  protect,

  body("metal")
    .notEmpty().withMessage("Metal is required")
    .isString().withMessage("Metal must be a string"),

  body("value")
    .notEmpty().withMessage("Value is required"),
  validateResult,
];

export const validateUpdatePurity = [
  protect,

  param("id")
    .notEmpty().withMessage("Purity ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid Purity ID format"),

  validateResult,
];


export const validateDeletePurity = [
  protect,

  param("id")
    .notEmpty().withMessage("Purity ID is required")
    .custom((value) => mongoose.Types.ObjectId.isValid(value))
    .withMessage("Invalid Purity ID format"),

  validateResult,
];
