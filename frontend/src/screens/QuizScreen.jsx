import { useState } from "react";

export default function QuizScreen({ questions, answers, setAnswers, onSubmit }) {
  const [index, setIndex] = useState(0);

  const currentQuestion = questions[index];

  const handleAnswer = (option) => {
    const newAnswers = [...answers];
    newAnswers[index] = {
      questionId: currentQuestion._id,   
      userAnswer: option,                
    };
    setAnswers(newAnswers);
  };

  const nextQuestion = () => {
    if (index < questions.length - 1) {
      setIndex(index + 1);
    } else {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-xl font-semibold mb-4">
        Question {index + 1} of {questions.length}
      </h2>
      <p className="mb-6">{currentQuestion.question}</p>
      <div className="flex flex-col gap-2 mb-6">
        {currentQuestion.options.map((opt, i) => {
          const selected = answers[index]?.userAnswer === opt;
          return (
            <button
              key={i}
              className={`px-4 py-2 border rounded-lg ${
                selected ? "bg-blue-600 text-white" : "bg-transparent text-black"
              }`}
              onClick={() => handleAnswer(opt)}
            >
              {opt}
            </button>
          );
        })}
      </div>
      <button
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
        onClick={nextQuestion}
        disabled={!answers[index]}
      >
        {index < questions.length - 1 ? "Next Question" : "Submit Quiz"}
      </button>
    </div>
  );
}
