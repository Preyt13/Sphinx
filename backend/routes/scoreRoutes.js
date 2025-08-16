const express = require("express");
const router = express.Router();
const Question = require("../models/Questions");

// POST /api/score
router.post("/", async (req, res) => {
  try {
    const userAnswers = req.body; 
    let score = 0;

    for (let ua of userAnswers) {
      const question = await Question.findById(ua.questionId);

      if (question && question.answer === ua.userAnswer) {
        score++;
      }
    }

    const total = userAnswers.length;
    const percentage = (score / total) * 100;

    let rating;
    if (percentage >= 90) {
      rating = "Genius";
    } else if (percentage >= 60) {
      rating = "Average";
    } else {
      rating = "Try Again";
    }

    res.json({
      score,
      total,
      rating,
      percentage
    });

  } catch (err) {
    console.error("Error calculating score:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
