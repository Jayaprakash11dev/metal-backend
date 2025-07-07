// src/controllers/purity.controller.js

import Purity from "../models/Purity.js";
import { validationResult } from "express-validator";
import mongoose from "mongoose";
import { successResponse, errorResponse } from "../utils/responseFormatter.js";

// create purities.......

export const createPurity = async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return errorResponse(res, 422, "Validation failed", errors.array());

  const { value, metal } = req.body;

  try {

    const exists = await Purity.findOne({ value, metal, activeStatus: "Active" });
    if (exists) return errorResponse(res, 409, "Purity already exists");

    const purity = await Purity.create({ value, metal });
    return successResponse(res, 201, "Purity created successfully", purity);
  } catch (err) {
    return errorResponse(res, 500, "Server error while creating purity", err.message);
  }
};

// get purities........

export const getPurities = async (req, res) => {
  try {
    const purities = await Purity.find({ activeStatus: "Active" }).sort({ metal: 1, value: 1 });
    return successResponse(res, 200, "Purities fetched successfully", purities);
  } catch (err) {
    return errorResponse(res, 500, "Server error while fetching purities", err.message);
  }
};

// update purity........

export const updatePurity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse(res, 400, "Invalid ID format");
  }

  const errors = validationResult(req);
  if (!errors.isEmpty())
    return errorResponse(res, 422, "Validation failed", errors.array());

  try {
    const updated = await Purity.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return errorResponse(res, 404, "Purity not found");

    return successResponse(res, 200, "Purity updated successfully", updated);
  } catch (err) {
    return errorResponse(res, 500, "Server error while updating purity", err.message);
  }
};

// delete purity......

export const deletePurity = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return errorResponse(res, 400, "Invalid ID format");
  }

  try {
    const deleted = await Purity.findByIdAndUpdate(id, { activeStatus: "Deactive" });
    if (!deleted) return errorResponse(res, 404, "Purity not found");

    return successResponse(res, 200, "Purity deactivated successfully");
  } catch (err) {
    return errorResponse(res, 500, "Server error while deactivating purity", err.message);
  }
};
