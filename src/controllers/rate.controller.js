import mongoose from "mongoose";
import MetalRate from "../models/MetalRate.js";
import { successResponse, errorResponse } from "../utils/responseFormatter.js";

// add rate ........

export const addRate = async (req, res) => {
  try {
    const { metal, purityId, rate, date } = req.body;

    if (!mongoose.Types.ObjectId.isValid(purityId)) {
      return errorResponse(res, 400, "Invalid Purity ID format");
    }

    const newRate = await MetalRate.create({
      metal,
      purityId,
      rate,
      date: date || new Date(),
    });

    return successResponse(res, 201, "Metal rate added successfully", newRate);
  } catch (err) {
    return errorResponse(res, 500, "Server error while adding rate", err.message);
  }
};

// get latest rates......

export const getLatestRate = async (req, res) => {
  try {
    const { metal, purityId } = req.query;

    const latestRate = await MetalRate.findOne({ metal, purityId, activeStatus: "Active" })
      .sort({ date: -1 })
      .populate("purityId");

    return successResponse(res, 200, "Latest metal rate fetched", latestRate || {});
  } catch (err) {
    return errorResponse(res, 500, "Server error fetching latest rate", err.message);
  }
};

// get rate history...........

export const getRateHistory = async (req, res) => {
  try {
    const { metal, purityId } = req.query;

    const query = {
      metal,
      activeStatus: "Active"
    };

    if (purityId) {
      if (!mongoose.Types.ObjectId.isValid(purityId)) {
        return errorResponse(res, 400, "Invalid Purity ID format");
      }
      query.purityId = purityId;
    }

    const rates = await MetalRate.find(query)
      .sort({ date: -1 })
      .populate("purityId");

    return successResponse(res, 200, "Rate history fetched", rates);
  } catch (err) {
    return errorResponse(res, 500, "Server error fetching rates", err.message);
  }
};

// delete rate...........

export const deleteRate = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return errorResponse(res, 400, "Invalid Rate ID format");
    }

    const result = await MetalRate.findByIdAndUpdate(id, { activeStatus: "Deactive" });

    if (!result) return errorResponse(res, 404, "Rate not found");

    return successResponse(res, 200, "Rate deactivated successfully");
  } catch (err) {
    return errorResponse(res, 500, "Failed to deactivate rate", err.message);
  }
};
