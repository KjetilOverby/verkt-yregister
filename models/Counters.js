const mongoose = require("mongoose");

const CountersSchema = new mongoose.Schema({
  k2236new: {
    type: String,
  },
  k2236waste: {
    type: String,
  },
});

module.exports =
  mongoose.models.Counters || mongoose.model("Counters", CountersSchema);
