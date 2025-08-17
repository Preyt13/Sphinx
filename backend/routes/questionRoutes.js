const express = require("express");
const router = express.Router();
const Question = require("../models/Questions");

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 5; // default to 5 if not specified
    const category = req.query.category;
    const matchStage = category ? { $match: { category } } : { $match: {} };

    // Fetch random N questions
    const questions = await Question.aggregate([
      matchStage,
      { $sample: { size: limit } },
      { $project: { answer: 0 } }   // exclude 'answer' field
    ]);

    // Shuffle options for each question
    const shuffledQuestions = questions.map(q => {
      const shuffled = [...q.options];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return { ...q, options: shuffled };
    });

    res.json(shuffledQuestions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
