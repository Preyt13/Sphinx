export default function ResultScreen({ result, onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Quiz Results</h2>
      <p className="mb-2">Score: {result.score}/{result.total}</p>
      <p className="mb-2">Percentage: {result.percentage}%</p>
      <p className="mb-6">Rating: {result.rating}</p>
      <button
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        onClick={onRetry}
      >
        Retry Quiz
      </button>
    </div>
  );
}
