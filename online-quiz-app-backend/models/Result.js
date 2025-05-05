const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  name: String,
  rollno: { type: String, unique: true },
  dept: String,
  score: Number,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Result", ResultSchema);
