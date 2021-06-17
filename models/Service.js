const mongoose = require("mongoose");

const ServiceSchema = new mongoose.Schema({
  type: {
    type: String,
  },
  serial: {
    type: String,
  },
  serviceDate: {
    type: Date,
  },
});

module.exports =
  mongoose.models.Service || mongoose.model("Service", ServiceSchema);
