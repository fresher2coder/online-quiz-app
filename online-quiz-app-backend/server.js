const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const quizRoutes = require("./routes/quiz");
const resultRoutes = require("./routes/result");
const userRoutes = require("./routes/user");

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "https://online-quiz-app-jet.vercel.app", // Allow only your frontend domain
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true, // Allow cookies and headers like authorization
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Accept",
      "X-Requested-With",
      "Origin",
    ],
  })
);

app.use(express.json());

app.use("/api/quiz", quizRoutes);
app.use("/api/result", resultRoutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Server running on port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.error(err));
