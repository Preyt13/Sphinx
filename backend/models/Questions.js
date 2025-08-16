const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({

    question: {
        type: String,
        required: true,
        unique: true,
    },
    options: {
        type: [String],
        required: true,
        validate: [arrayLimit, "{PATH} must have exactly 4 options"]
    },
    answer: {
        type: String,
        required: true,
    },
    difficulty: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
});

function arrayLimit(val) {
  return val.length === 4;
}

module.exports = mongoose.model("Question", QuestionSchema);