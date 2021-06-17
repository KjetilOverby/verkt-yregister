const mongoose = require("mongoose");

const WasteSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  serial: {
    type: String,
  },
  wasteDate: {
    type: Date,
  },
  wasteNumberOfRetip: {
    type: String,
  },
});

module.exports = mongoose.models.Waste || mongoose.model("Waste", WasteSchema);
