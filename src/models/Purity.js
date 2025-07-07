import mongoose from 'mongoose';

const puritySchema = new mongoose.Schema({
  metal: { type: String, required: true },
  value: { type: String, required: true },
  activeStatus: { type: String, default: "Active", enum: ["Active", "Deactive"] }
}, { timestamps: true });

export default mongoose.model('Purity', puritySchema);
