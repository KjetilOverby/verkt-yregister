const mongoose = require("mongoose");

const NewBladesSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  serial: {
    type: String,
  },
  updated: {
    type: Date,
  },
});

module.exports =
  mongoose.models.NewBlades || mongoose.model("NewBlades", NewBladesSchema);
