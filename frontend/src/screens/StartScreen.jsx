import { useState } from "react";

export default function StartScreen({ onBegin }) {
  const [numQuestions, setNumQuestions] = useState(5);
  const [category, setCategory] = useState("");

  const handleStart = () => {
    onBegin(numQuestions, category);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Welcome to the Quiz!</h1>

      {/* Number of Questions */}
      <div className="mb-4">
        <label className="block mb-2 font-medium text center">Number of Questions</label>
        <select
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          className="border p-2 rounded-lg w-full"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* Category */}
      <div className="mb-6">
        <label className="block mb-2 font-medium text-center">Category</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded-lg w-full"
        >
          <option value="">Any</option>
          <option value="Math">Math</option>
          <option value="Geography">Geography</option>
          <option value="Biology">Biology</option>
        </select>
      </div>

      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        onClick={handleStart}
      >
        Begin Quiz
      </button>
    </div>
  );
}
