import Purity from '../models/Purity.js';

export const createPurity = async (req, res) => {
  const { value, metal } = req.body;
  const exists = await Purity.findOne({ value, metal });
  if (exists) return res.status(400).json({ message: 'Purity already exists' });

  const purity = await Purity.create({ value, metal });
  res.status(201).json(purity);
};

export const getPurities = async (req, res) => {
  const purities = await Purity.find().sort({ metal: 1, value: 1 });
  res.json(purities);
};

export const updatePurity = async (req, res) => {
  const { id } = req.params;
  const updated = await Purity.findByIdAndUpdate(id, req.body, { new: true });
  res.json(updated);
};

export const deletePurity = async (req, res) => {
  try {
    const { id } = req.params;
    await Purity.findByIdAndUpdate(id, { activeStatus: "Deactive" });
    res.json({ message: "Purity deactivated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to deactivate purity" });
  }
};

