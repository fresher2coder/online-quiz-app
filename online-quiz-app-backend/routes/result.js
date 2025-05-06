const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

router.post("/submit", async (req, res) => {
  const { name, rollNo, dept, score } = req.body;

  if (!name || !rollNo || !dept || typeof score !== "number") {
    return res.status(400).json({ error: "Missing or invalid data." });
  }

  try {
    const existing = await Result.findOne({ rollNo });
    if (existing) {
      return res.status(400).json({ error: "Already submitted" });
    }

    const result = new Result({ name, rollNo, dept, score });
    await result.save();
    res.json({ message: "Result saved" });
  } catch (err) {
    console.error("Submission error:", err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/auto-save", async (req, res) => {
  const { name, rollNo, dept, score } = req.body;

  if (!name || !rollNo || !dept || typeof score !== "number") {
    return res.status(400).json({ error: "Invalid data for auto-save" });
  }

  try {
    // Upsert: update if exists, else insert, but don't block final submit
    await Result.updateOne(
      { rollNo },
      { $set: { name, dept, score, isAutoSaved: true } },
      { upsert: true }
    );
    res.json({ message: "Auto-save successful" });
  } catch (err) {
    console.error("Auto-save error:", err);
    res.status(500).json({ error: "Auto-save failed" });
  }
});

module.exports = router;
