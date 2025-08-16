const mongoose = require("mongoose");
const Question = require("../models/Questions");
const fs = require("fs");

const MONGO_URI = "mongodb://127.0.0.1:27017/Sphinx"; 

async function seedQuestions() {
  try {
    await mongoose.connect(MONGO_URI);

    console.log("Connected to DB");

    // Wipe old questions first
    await Question.deleteMany({});
    console.log("Old questions removed");

    // Load new questions from JSON file
    const data = fs.readFileSync("seed/questions.json");
    const questions = JSON.parse(data);

    // Insert fresh data
    await Question.insertMany(questions);
    console.log(`Inserted ${questions.length} questions`);

    process.exit();
  } catch (err) {
    console.error("Error seeding:", err);
    process.exit(1);
  }
}

seedQuestions();
