import mongoose from 'mongoose';

const metalRateSchema = new mongoose.Schema({
  metal: { type: String, required: true },
  purityId: { type: mongoose.Schema.Types.ObjectId, ref: "Purity", required: true },
  rate: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  activeStatus: { type: String, default: "Active", enum: ["Active", "Deactive"] }
}, { timestamps: true });

export default mongoose.model('MetalRate', metalRateSchema);
