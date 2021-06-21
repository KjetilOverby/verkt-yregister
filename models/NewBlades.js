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
  newid: {
    type: String,
  },
});

module.exports =
  mongoose.models.NewBlades || mongoose.model("NewBlades", NewBladesSchema);
