const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

router.post("/submit", async (req, res) => {
  const { name, rollNo, dept, score } = req.body;

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
    res.status(500).json({ error: "Submission failed" });
  }
});

module.exports = router;
