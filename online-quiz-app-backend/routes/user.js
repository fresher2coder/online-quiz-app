// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Make sure User model exists
const Result = require("../models/Result"); // Make sure User model exists

// POST /api/check-roll
router.post("/check-roll", async (req, res) => {
  const { rollNo } = req.body;

  try {
    const [userExists, resultExists] = await Promise.all([
      User.findOne({ rollNo }),
      Result.findOne({ rollNo }),
    ]);

    const existsInBoth = userExists && resultExists;
    res.json({ exists: existsInBoth }); // only true if in both
  } catch (err) {
    console.error("Error checking roll number:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// POST /api/register
router.post("/register", async (req, res) => {
  const { name, rollNo, dept } = req.body;

  if (!name || !rollNo || !dept) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const [userExists, resultExists] = await Promise.all([
      User.findOne({ rollNo }),
      Result.findOne({ rollNo }),
    ]);

    if (userExists && resultExists) {
      return res
        .status(400)
        .json({ error: "You have already completed the quiz." });
    }

    if (userExists && !resultExists) {
      return res
        .status(200)
        .json({ message: "Already registered. Proceed to quiz." });
    }

    // Case: new user
    const newUser = new User({ name, rollNo, dept });
    await newUser.save();
    return res
      .status(201)
      .json({ message: "Registered successfully. Proceed to quiz." });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
