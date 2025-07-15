import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";

const SECTION_SIZE = 5;

// Slugify function to generate a URL-friendly slug from the quiz name
function slugify(text) {
  return text
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(/[^a-z0-9-]/g, "") // Remove all non-alphanumeric except -
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start
    .replace(/-+$/, ""); // Trim - from end
}

const QuizListPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [questionCounts, setQuestionCounts] = useState({});

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const { data } = await api.get("/quiz/categories");
        setQuizzes(Array.isArray(data) ? data : data.data || []);
      } catch (err) {
        setQuizzes([]);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  useEffect(() => {
    // Fetch question counts for each quiz
    const fetchCounts = async () => {
      const counts = {};
      await Promise.all(
        quizzes.map(async (quiz) => {
          try {
            const { data } = await api.get(
              `/quiz/categories/${quiz._id}/question-count`
            );
            counts[quiz._id] = data.count;
          } catch {
            counts[quiz._id] = 0;
          }
        })
      );
      setQuestionCounts(counts);
    };
    if (quizzes.length > 0) fetchCounts();
  }, [quizzes]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center dark:text-white">
        Quizzes
      </h1>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {quizzes.length === 0 ? (
            <div className="col-span-full text-center text-gray-500">
              No quizzes available.
            </div>
          ) : (
            quizzes.map((quiz) => {
              const count = questionCounts[quiz._id] || 0;
              const numSections = Math.ceil(count / SECTION_SIZE);
              return (
                <div
                  key={quiz._id}
                  className="rounded-lg shadow p-8 flex flex-col items-center bg-teal-200 dark:bg-blue-950"
                >
                  <h2 className="text-2xl font-bold mb-4 dark:text-white">
                    {quiz.name}
                  </h2>
                  {quiz.description && quiz.description.trim() !== "" && (
                    <p className="mb-6 text-center dark:text-blue-100">
                      {quiz.description}
                    </p>
                  )}
                  <div className="mb-4 text-sm font-semibold text-gray-700 dark:text-blue-200">
                    {count > 0 ? (
                      <>
                        {count} question{count !== 1 ? "s" : ""} &bull;{" "}
                        {numSections} section{numSections !== 1 ? "s" : ""}
                      </>
                    ) : (
                      <>No questions</>
                    )}
                  </div>
                  <Link
                    to={`/quiz/${quiz.slug}`}
                    className="bg-green-500 hover:bg-green-600 text-white font-semibold px-6 py-2 rounded-full transition"
                  >
                    Start Quiz
                  </Link>
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default QuizListPage;
