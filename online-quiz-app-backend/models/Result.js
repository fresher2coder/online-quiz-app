const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  name: String,
  dept: String,
  rollNo: { type: String, unique: true },
  score: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", ResultSchema);
