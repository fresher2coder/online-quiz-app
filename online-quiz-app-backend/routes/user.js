// routes/userRoutes.js
const express = require("express");
const router = express.Router();
const User = require("../models/User"); // Make sure User model exists
const Result = require("../models/Result"); // Make sure User model exists

// POST /api/check-roll
router.post("/check-roll", async (req, res) => {
  const { rollNo } = req.body;

  try {
    const userExists = await User.findOne({ rollNo });
    const resultExists = await Result.findOne({ rollNo });

    const existsInBoth = userExists && resultExists;
    console.log("User exists:", userExists);
    console.log("Result exists:", resultExists);
    console.log("Exists in both:", !!existsInBoth);
    res.json({ exists: !!existsInBoth });
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
    const userExists = await User.findOne({ rollNo });

    if (userExists) {
      return res.status(400).json({ error: "User already registered." });
    }

    const newUser = new User({ name, rollNo, dept });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    console.error("Error registering user:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
