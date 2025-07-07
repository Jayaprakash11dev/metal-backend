import MetalRate from '../models/MetalRate.js';

export const addRate = async (req, res) => {
  const { metal, purityId, rate, date } = req.body;

  const newRate = await MetalRate.create({
    metal,
    purityId,
    rate,
    date: date || new Date(),
  });

  res.status(201).json(newRate);
};

export const getLatestRate = async (req, res) => {
  const { metal, purityId } = req.query;

  const latestRate = await MetalRate.findOne({ metal, purityId })
    .sort({ date: -1 })
    .populate('purityId');

  res.json(latestRate || {});
};

export const getRateHistory = async (req, res) => {
  try {
    const { metal, purityId } = req.query;

    if (!metal) {
      return res.status(400).json({ message: "Metal is required." });
    }

    const query = {
      metal
    };

    if (purityId && mongoose.Types.ObjectId.isValid(purityId)) {
      query.purityId = purityId;
    }

    const rates = await MetalRate.find(query)
      .sort({ date: -1 })
      .populate("purityId");

    res.json(rates);
  } catch (err) {
    console.error("Rate fetch error:", err);
    res.status(500).json({ message: "Server error fetching rates" });
  }
};


export const deleteRate = async (req, res) => {
  try {
    const { id } = req.params;
    await MetalRate.findByIdAndUpdate(id, { activeStatus: "Deactive" });
    res.json({ message: "Rate deactivated" });
  } catch (err) {
    res.status(500).json({ message: "Failed to deactivate rate" });
  }
};
