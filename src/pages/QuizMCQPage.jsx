import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../utils/api";

const SECTION_SIZE = 5;

const QuizMCQPage = () => {
  const { slug } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showHints, setShowHints] = useState({});
  const [sectionIdx, setSectionIdx] = useState(0); // current section index
  const [current, setCurrent] = useState(0); // index within section
  const [selected, setSelected] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [answers, setAnswers] = useState([]); // {selected, correct}
  const [sectionAnswers, setSectionAnswers] = useState([]); // answers for current section
  const [sectionCompleted, setSectionCompleted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showReview, setShowReview] = useState(false);
  const [showFullReview, setShowFullReview] = useState(false);
  const [reviewIdx, setReviewIdx] = useState(0);
  const [sectionReviewOpen, setSectionReviewOpen] = useState(false);
  const [sectionReviewIdx, setSectionReviewIdx] = useState(0);

  // Split questions into sections
  const sections = [];
  for (let i = 0; i < questions.length; i += SECTION_SIZE) {
    sections.push(questions.slice(i, i + SECTION_SIZE));
  }
  const currentSection = sections[sectionIdx] || [];

  useEffect(() => {
    async function fetchQuizAndQuestions() {
      try {
        setLoading(true);
        const { data: quizData } = await api.get(
          `/quiz/categories/slug/${slug}`
        );
        setQuiz(quizData);
        const { data: questionsData } = await api.get(
          `/quiz/categories/${quizData._id}/questions`
        );
        setQuestions(Array.isArray(questionsData) ? questionsData : []);
      } catch (err) {
        setError("Failed to load quiz or MCQs for this quiz category.");
      } finally {
        setLoading(false);
      }
    }
    fetchQuizAndQuestions();
  }, [slug]);

  useEffect(() => {
    // Reset section state when section changes
    setCurrent(0);
    setSelected(null);
    setShowFeedback(false);
    setSectionAnswers([]);
    setSectionCompleted(false);
    setShowReview(false);
    setShowHints({});
  }, [sectionIdx]);

  useEffect(() => {
    // Reset selection and feedback when question changes
    setSelected(null);
    setShowFeedback(false);
  }, [current]);

  const toggleHint = (questionId) => {
    setShowHints((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleSelect = (idx) => {
    setSelected(idx);
  };

  const handleSubmit = () => {
    if (selected === null) return;
    setShowFeedback(true);
    const q = currentSection[current];
    const isCorrect = selected === q.correctOption;
    if (sectionAnswers.length === current) {
      setSectionAnswers([...sectionAnswers, { selected, correct: isCorrect }]);
    }
  };

  const handleNext = () => {
    if (current < currentSection.length - 1) {
      setCurrent((c) => c + 1);
    } else {
      setSectionCompleted(true);
    }
  };

  const handlePrev = () => {
    if (current > 0) setCurrent((c) => c - 1);
  };

  const handleRestart = () => {
    setSectionIdx(0);
    setCurrent(0);
    setSectionAnswers([]);
    setShowFeedback(false);
    setQuizCompleted(false);
    setAnswers([]);
    setSectionCompleted(false);
    setShowReview(false);
    setShowHints({});
  };

  const handleNextSection = () => {
    // Save section answers to global answers
    const startIdx = sectionIdx * SECTION_SIZE;
    const updatedAnswers = [...answers];
    for (let i = 0; i < sectionAnswers.length; i++) {
      updatedAnswers[startIdx + i] = sectionAnswers[i];
    }
    setAnswers(updatedAnswers);
    if (sectionIdx < sections.length - 1) {
      setSectionIdx(sectionIdx + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  const handleReviewSection = () => {
    setSectionReviewIdx(0);
    setSectionReviewOpen(true);
  };

  const handleCloseSectionReview = () => {
    setSectionReviewOpen(false);
    setSectionReviewIdx(0);
  };

  // Helper function for rendering options
  function renderOption(opt) {
    const trimmed = (opt || "").trim();
    if (trimmed.includes("\n")) {
      return (
        <pre
          className="inline-block bg-gray-100 text-gray-800 font-mono text-sm px-2 py-1 rounded whitespace-pre-wrap align-middle m-0 border-0"
          style={{ margin: 0, padding: "2px 6px", verticalAlign: "middle" }}
        >
          {trimmed}
        </pre>
      );
    } else {
      return <span className="whitespace-pre-line">{trimmed}</span>;
    }
  }

  if (loading) return <div className="text-center py-8">Loading MCQs...</div>;
  if (error)
    return <div className="text-center text-red-500 py-8">{error}</div>;

  if (questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">
          Quiz MCQs
        </h1>
        <div className="text-center text-gray-500">
          No MCQs found for this quiz category.
        </div>
      </div>
    );
  }

  // Full quiz review modal
  if (showFullReview) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-xl w-full relative overflow-y-auto max-h-[90vh]">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            onClick={() => {
              setShowFullReview(false);
              setReviewIdx(0);
            }}
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="text-xl font-bold mb-4 dark:text-white">
            Quiz Review
          </h2>
          {questions.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow">
                <div className="font-semibold mb-2 dark:text-white">
                  Q{reviewIdx + 1}:{" "}
                  <span className="whitespace-pre-line">
                    {questions[reviewIdx].question}
                  </span>
                </div>
                <ul className="mb-2">
                  {questions[reviewIdx].options.map((opt, i) => {
                    const ans = answers[reviewIdx];
                    return (
                      <li
                        key={i}
                        className={
                          i === questions[reviewIdx].correctOption
                            ? "font-bold text-green-600 dark:text-green-400"
                            : ans &&
                              i === ans.selected &&
                              i !== questions[reviewIdx].correctOption
                            ? "font-bold text-red-600 dark:text-red-400"
                            : "text-gray-700 dark:text-gray-200"
                        }
                      >
                        {String.fromCharCode(65 + i)}. {renderOption(opt)}
                        {i === questions[reviewIdx].correctOption && (
                          <span className="ml-2 text-xs">(Correct)</span>
                        )}
                        {ans &&
                          i === ans.selected &&
                          i !== questions[reviewIdx].correctOption && (
                            <span className="ml-2 text-xs">(Your answer)</span>
                          )}
                      </li>
                    );
                  })}
                </ul>
                {answers[reviewIdx] &&
                answers[reviewIdx].selected ===
                  questions[reviewIdx].correctOption ? (
                  <div className="text-green-700 font-semibold dark:text-green-400">
                    Correct
                  </div>
                ) : (
                  <div className="text-red-600 font-semibold dark:text-red-400">
                    Incorrect
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded shadow disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200"
                  onClick={() => setReviewIdx((idx) => Math.max(0, idx - 1))}
                  disabled={reviewIdx === 0}
                >
                  Previous
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-semibold"
                  onClick={() =>
                    setReviewIdx((idx) =>
                      Math.min(questions.length - 1, idx + 1)
                    )
                  }
                  disabled={reviewIdx === questions.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Final scoreboard
  if (quizCompleted) {
    const right = answers.filter((a) => a && a.correct).length;
    const wrong = answers.filter((a) => a && !a.correct).length;
    const accuracy =
      questions.length > 0 ? Math.round((right / questions.length) * 100) : 0;
    let message = "Good job!";
    if (accuracy === 100) message = "🏆 Perfect! You're a quiz master!";
    else if (accuracy >= 80) message = "🎉 Excellent work!";
    else if (accuracy >= 60) message = "👏 Nice effort!";
    else message = "Keep practicing!";
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-white flex items-center justify-center gap-2">
          {accuracy === 100 && (
            <span className="text-yellow-400 text-3xl">🏆</span>
          )}
          You did it! Quiz complete
        </h1>
        <div className="mb-4 text-lg font-semibold text-center text-blue-300">
          {message}
        </div>
        <div className="w-full max-w-2xl mb-8">
          <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-700"
              style={{ width: `${accuracy}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-900 dark:bg-blue-950 rounded-xl shadow p-6 flex flex-col items-center transition-transform hover:scale-105">
              <div className="text-gray-400 text-sm mb-1">Score</div>
              <div className="text-3xl font-extrabold text-white">
                {right}/{questions.length}
              </div>
            </div>
            <div className="bg-gray-900 dark:bg-blue-950 rounded-xl shadow p-6 flex flex-col items-center transition-transform hover:scale-105">
              <div className="text-gray-400 text-sm mb-1">Accuracy</div>
              <div className="text-3xl font-extrabold text-white">
                {accuracy}%
              </div>
            </div>
            <div className="bg-gray-900 dark:bg-blue-950 rounded-xl shadow p-6 flex flex-col items-center transition-transform hover:scale-105">
              <div className="text-gray-400 text-sm mb-1">Right</div>
              <div className="text-2xl font-bold text-green-400">{right}</div>
              <div className="text-gray-400 text-sm mt-2">Wrong</div>
              <div className="text-2xl font-bold text-red-400">{wrong}</div>
            </div>
          </div>
        </div>
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow font-semibold"
          onClick={handleRestart}
        >
          Restart Quiz
        </button>
        <button
          className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded shadow font-semibold mt-4"
          onClick={() => setShowFullReview(true)}
        >
          Review Quiz
        </button>
      </div>
    );
  }

  // Section review modal
  if (sectionReviewOpen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-xl w-full relative overflow-y-auto max-h-[90vh]">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            onClick={handleCloseSectionReview}
            aria-label="Close"
          >
            ×
          </button>
          <h2 className="text-xl font-bold mb-4 dark:text-white">
            Section Review
          </h2>
          {currentSection.length > 0 && (
            <div className="flex flex-col gap-4">
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 shadow">
                <div className="font-semibold mb-2 dark:text-white">
                  Q{sectionReviewIdx + 1}:{" "}
                  <span className="whitespace-pre-line">
                    {currentSection[sectionReviewIdx].question}
                  </span>
                </div>
                <ul className="mb-2">
                  {currentSection[sectionReviewIdx].options.map((opt, i) => {
                    const ans = sectionAnswers[sectionReviewIdx];
                    return (
                      <li
                        key={i}
                        className={
                          i === currentSection[sectionReviewIdx].correctOption
                            ? "font-bold text-green-600 dark:text-green-400"
                            : ans &&
                              i === ans.selected &&
                              i !==
                                currentSection[sectionReviewIdx].correctOption
                            ? "font-bold text-red-600 dark:text-red-400"
                            : "text-gray-700 dark:text-gray-200"
                        }
                      >
                        {String.fromCharCode(65 + i)}. {renderOption(opt)}
                        {i ===
                          currentSection[sectionReviewIdx].correctOption && (
                          <span className="ml-2 text-xs">(Correct)</span>
                        )}
                        {ans &&
                          i === ans.selected &&
                          i !==
                            currentSection[sectionReviewIdx].correctOption && (
                            <span className="ml-2 text-xs">(Your answer)</span>
                          )}
                      </li>
                    );
                  })}
                </ul>
                {sectionAnswers[sectionReviewIdx] &&
                sectionAnswers[sectionReviewIdx].selected ===
                  currentSection[sectionReviewIdx].correctOption ? (
                  <div className="text-green-700 font-semibold dark:text-green-400">
                    Correct
                  </div>
                ) : (
                  <div className="text-red-600 font-semibold dark:text-red-400">
                    Incorrect
                  </div>
                )}
              </div>
              <div className="flex justify-between mt-4">
                <button
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded shadow disabled:opacity-50 dark:bg-gray-700 dark:text-gray-200"
                  onClick={() =>
                    setSectionReviewIdx((idx) => Math.max(0, idx - 1))
                  }
                  disabled={sectionReviewIdx === 0}
                >
                  Previous
                </button>
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-semibold"
                  onClick={() =>
                    setSectionReviewIdx((idx) =>
                      Math.min(currentSection.length - 1, idx + 1)
                    )
                  }
                  disabled={sectionReviewIdx === currentSection.length - 1}
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Section result/scoreboard
  if (sectionCompleted) {
    const right = sectionAnswers.filter((a) => a && a.correct).length;
    const wrong = sectionAnswers.filter((a) => a && !a.correct).length;
    const accuracy =
      sectionAnswers.length > 0
        ? Math.round((right / sectionAnswers.length) * 100)
        : 0;
    let message = "Good job!";
    if (accuracy === 100)
      message = "🏆 Perfect! You're a quiz master for this section!";
    else if (accuracy >= 80) message = "🎉 Excellent work!";
    else if (accuracy >= 60) message = "👏 Nice effort!";
    else message = "Keep practicing!";
    return (
      <div className="container mx-auto px-4 py-12 flex flex-col items-center">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-white flex items-center justify-center gap-2">
          {accuracy === 100 && (
            <span className="text-yellow-400 text-3xl">🏆</span>
          )}
          Section {sectionIdx + 1} Complete
        </h1>
        <div className="mb-4 text-lg font-semibold text-center text-blue-300">
          {message}
        </div>
        <div className="w-full max-w-2xl mb-8">
          <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden mb-6">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-blue-500 transition-all duration-700"
              style={{ width: `${accuracy}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-gray-900 dark:bg-blue-950 rounded-xl shadow p-6 flex flex-col items-center transition-transform hover:scale-105">
              <div className="text-gray-400 text-sm mb-1">Score</div>
              <div className="text-3xl font-extrabold text-white">
                {right}/{sectionAnswers.length}
              </div>
            </div>
            <div className="bg-gray-900 dark:bg-blue-950 rounded-xl shadow p-6 flex flex-col items-center transition-transform hover:scale-105">
              <div className="text-gray-400 text-sm mb-1">Accuracy</div>
              <div className="text-3xl font-extrabold text-white">
                {accuracy}%
              </div>
            </div>
            <div className="bg-gray-900 dark:bg-blue-950 rounded-xl shadow p-6 flex flex-col items-center transition-transform hover:scale-105">
              <div className="text-gray-400 text-sm mb-1">Right</div>
              <div className="text-2xl font-bold text-green-400">{right}</div>
              <div className="text-gray-400 text-sm mt-2">Wrong</div>
              <div className="text-2xl font-bold text-red-400">{wrong}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow font-semibold"
            onClick={handleRestart}
          >
            Restart Quiz
          </button>
          <button
            className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded shadow font-semibold"
            onClick={handleReviewSection}
          >
            Review Section
          </button>
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded shadow font-semibold"
            onClick={handleNextSection}
          >
            {sectionIdx === sections.length - 1
              ? "Finish Quiz"
              : "Next Section"}
          </button>
        </div>
      </div>
    );
  }

  // Main quiz UI for current section
  const q = currentSection[current];
  const hasAnswered = sectionAnswers.length > current;
  const prevAnswer = hasAnswered ? sectionAnswers[current] : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">
        Quiz MCQs
      </h1>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 max-w-xl mx-auto">
        <div className="font-semibold mb-2 dark:text-white">
          Section {sectionIdx + 1} &mdash; Q{current + 1}:{" "}
          <span className="whitespace-pre-line">{q.question}</span>
        </div>
        {q.hint && (
          <div className="mb-3">
            <button
              onClick={() => toggleHint(q._id)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium dark:text-blue-400 dark:hover:text-blue-300"
            >
              {showHints[q._id] ? "Hide Hint" : "Show Hint"}
            </button>
            {showHints[q._id] && (
              <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-md dark:bg-blue-900 dark:border-blue-700">
                <span className="text-blue-800 text-sm dark:text-blue-200">
                  💡 Hint: {q.hint}
                </span>
              </div>
            )}
          </div>
        )}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <ul className="space-y-2 mb-4">
            {q.options.map((opt, i) => (
              <li key={i} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="option"
                  id={`option-${i}`}
                  value={i}
                  checked={selected === i}
                  disabled={showFeedback || hasAnswered}
                  onChange={() => handleSelect(i)}
                  className="accent-blue-600"
                />
                <label
                  htmlFor={`option-${i}`}
                  className={
                    showFeedback || hasAnswered
                      ? i === q.correctOption
                        ? "font-bold text-green-600 dark:text-green-400"
                        : selected === i && selected !== q.correctOption
                        ? "font-bold text-red-600 dark:text-red-400"
                        : "text-gray-700 dark:text-gray-200"
                      : "text-gray-700 dark:text-gray-200"
                  }
                >
                  {String.fromCharCode(65 + i)}. {renderOption(opt)}
                </label>
              </li>
            ))}
          </ul>
          {!showFeedback && !hasAnswered && (
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded shadow"
              disabled={selected === null}
            >
              Submit
            </button>
          )}
        </form>
        {(showFeedback || hasAnswered) && (
          <div className="mt-4 flex justify-end">
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded shadow font-semibold"
              onClick={handleNext}
            >
              {current === currentSection.length - 1
                ? "Finish Section"
                : "Next"}
            </button>
          </div>
        )}
      </div>
      <div className="text-center text-sm text-gray-500 mt-4 dark:text-gray-300">
        Section {sectionIdx + 1} &mdash; Question {current + 1} of{" "}
        {currentSection.length}
      </div>
    </div>
  );
};

export default QuizMCQPage;
