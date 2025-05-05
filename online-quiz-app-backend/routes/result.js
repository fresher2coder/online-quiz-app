const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

router.post("/submit", async (req, res) => {
  const { name, rollno, dept, score } = req.body;
  try {
    const existing = await Result.findOne({ rollno });
    if (existing) {
      return res.status(400).json({ error: "Already submitted" });
    }
    const result = new Result({ name, rollno, dept, score });
    await result.save();
    res.json({ message: "Result saved" });
  } catch (err) {
    res.status(500).json({ error: "Submission failed" });
  }
});

module.exports = router;
