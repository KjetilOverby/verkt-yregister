const mongoose = require("mongoose");

const BladesSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  serial: {
    type: String,
    required: true,
  },
  registDate: {
    type: String,
  },
  performer: {
    type: [String],
  },

  date: {
    type: [String],
  },
  comment: {
    type: [String],
  },
  commentDate: {
    type: [String],
  },
  updated: {
    type: Date,
  },
  realRegistDate: {
    type: Date,
  },
});

module.exports =
  mongoose.models.Blades || mongoose.model("Blades", BladesSchema);
