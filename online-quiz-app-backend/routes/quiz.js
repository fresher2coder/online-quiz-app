const express = require("express");
const router = express.Router();
const Question = require("../models/Question");

router.post("/questions", async (req, res) => {
  try {
    const questions = await Question.aggregate([{ $sample: { size: 15 } }]);
    res.json(questions);
  } catch (err) {
    res.status(500).json({ error: "Failed to get questions" });
  }
});

module.exports = router;
