import { useState } from "react";
import { API_BASE_URL } from "./SphinxConfig";
import StartScreen from "./screens/StartScreen";
import QuizScreen from "./screens/QuizScreen";
import ResultScreen from "./screens/ResultScreen";

function App() {
  const [screen, setScreen] = useState("start"); 
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  const beginQuiz = async (numQuestions, category) => {
    const url = new URL(`${API_BASE_URL}/api/questions`);
    url.searchParams.append("limit", numQuestions);
    if (category) url.searchParams.append("category", category);

    const res = await fetch(url);
    const data = await res.json();
    setQuestions(data);
    setAnswers([]);
    setScreen("quiz");
  };

  const submitQuiz = async () => {
    const res = await fetch(`${API_BASE_URL}/api/score`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(answers),
    });
    const data = await res.json();
    setResult(data);
    setScreen("result");
  };

  const retryQuiz = () => {
    setQuestions([]);
    setAnswers([]);
    setResult(null);
    setScreen("start");
  };

  if (screen === "start")
    return <StartScreen onBegin={beginQuiz} />;
  if (screen === "quiz")
    return (
      <QuizScreen
        questions={questions}
        answers={answers}
        setAnswers={setAnswers}
        onSubmit={submitQuiz}
      />
    );
  if (screen === "result")
    return <ResultScreen result={result} onRetry={retryQuiz} />;

  return null;
}

export default App;
