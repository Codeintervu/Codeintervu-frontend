import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaBookmark,
  FaBookmark as FaBookmarkSolid,
  FaShare,
  FaTrash,
} from "react-icons/fa";
import api from "../utils/api";

const BookmarkedQuestionsPage = () => {
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set());

  useEffect(() => {
    loadBookmarkedQuestions();
  }, []);

  const loadBookmarkedQuestions = async () => {
    try {
      setLoading(true);

      // Load bookmarked IDs from localStorage
      const savedBookmarks = localStorage.getItem("bookmarkedQuestions");
      if (!savedBookmarks) {
        setBookmarkedQuestions([]);
        setBookmarkedIds(new Set());
        return;
      }

      const bookmarkIds = JSON.parse(savedBookmarks);
      setBookmarkedIds(new Set(bookmarkIds));

      if (bookmarkIds.length === 0) {
        setBookmarkedQuestions([]);
        return;
      }

      // Fetch all bookmarked questions from the API
      const allQuestions = [];
      for (const id of bookmarkIds) {
        try {
          const response = await api.get(`/interview-questions/${id}`);
          if (response.data.success) {
            allQuestions.push(response.data.data);
          }
        } catch (error) {
          console.error(`Error fetching question ${id}:`, error);
          // Remove invalid bookmark
          const newBookmarkIds = bookmarkIds.filter((bid) => bid !== id);
          localStorage.setItem(
            "bookmarkedQuestions",
            JSON.stringify(newBookmarkIds)
          );
        }
      }

      setBookmarkedQuestions(allQuestions);
    } catch (error) {
      console.error("Error loading bookmarked questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveBookmark = (questionId) => {
    const newBookmarkIds = Array.from(bookmarkedIds).filter(
      (id) => id !== questionId
    );
    setBookmarkedIds(new Set(newBookmarkIds));
    setBookmarkedQuestions((prev) => prev.filter((q) => q._id !== questionId));

    // Update localStorage
    localStorage.setItem("bookmarkedQuestions", JSON.stringify(newBookmarkIds));

    showToast("Bookmark removed!", "info");
  };

  const handleRemoveAllBookmarks = () => {
    if (window.confirm("Are you sure you want to remove all bookmarks?")) {
      setBookmarkedIds(new Set());
      setBookmarkedQuestions([]);
      localStorage.removeItem("bookmarkedQuestions");
      showToast("All bookmarks removed!", "info");
    }
  };

  const handleShare = (question) => {
    const shareText = `Check out this interview question: ${question.question}`;
    const shareUrl = `${
      window.location.origin
    }/interview-questions?q=${encodeURIComponent(question.question)}`;

    if (navigator.share) {
      navigator.share({
        title: "Interview Question",
        text: shareText,
        url: shareUrl,
      });
    } else {
      // Fallback: copy to clipboard
      const fullText = `${shareText}\n\nAnswer: ${question.answer}\n\n${shareUrl}`;
      navigator.clipboard.writeText(fullText);
      showToast("Question copied to clipboard!", "success");
    }
  };

  const showToast = (message, type = "info") => {
    // Create toast element
    const toast = document.createElement("div");
    toast.className = `fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full ${
      type === "success" ? "bg-green-500 text-white" : "bg-blue-500 text-white"
    }`;
    toast.textContent = message;

    // Add to DOM
    document.body.appendChild(toast);

    // Animate in
    setTimeout(() => {
      toast.classList.remove("translate-x-full");
    }, 100);

    // Remove after 3 seconds
    setTimeout(() => {
      toast.classList.add("translate-x-full");
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <Link
                to="/interview-questions"
                className="flex items-center gap-2 text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium"
              >
                <FaArrowLeft className="w-4 h-4" />
                Back to Questions
              </Link>
            </div>
            {bookmarkedQuestions.length > 0 && (
              <button
                onClick={handleRemoveAllBookmarks}
                className="flex items-center gap-2 px-3 py-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 font-medium"
              >
                <FaTrash className="w-4 h-4" />
                Remove All
              </button>
            )}
          </div>

          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Bookmarked Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Your saved questions for quick access and review
          </p>

          {/* Stats */}
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FaBookmarkSolid className="text-yellow-500" />
              <span>{bookmarkedQuestions.length} bookmarked questions</span>
            </div>
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Your Bookmarks ({bookmarkedQuestions.length})
            </h2>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Loading bookmarked questions...
              </p>
            </div>
          ) : bookmarkedQuestions.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
                📚
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No bookmarked questions
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Start bookmarking questions to see them here for quick access.
              </p>
              <Link
                to="/interview-questions"
                className="inline-flex items-center gap-2 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Browse Questions
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {bookmarkedQuestions.map((question) => (
                <div
                  key={question._id}
                  className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            question.difficulty === "Easy"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : question.difficulty === "Medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                              : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                          }`}
                        >
                          {question.difficulty}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {question.categoryName}
                        </span>
                        <span className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
                          <FaBookmarkSolid className="w-3 h-3" />
                          Bookmarked
                        </span>
                      </div>

                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {question.question}
                      </h3>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {question.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                          Answer:
                        </h4>
                        <p className="text-gray-700 dark:text-gray-300">
                          {question.answer}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 ml-4">
                      <button
                        onClick={() => handleRemoveBookmark(question._id)}
                        className="p-2 text-red-500 hover:text-red-600 rounded-lg transition-colors"
                        title="Remove bookmark"
                      >
                        <FaTrash />
                      </button>
                      <button
                        onClick={() => handleShare(question)}
                        className="p-2 text-gray-400 hover:text-teal-500 rounded-lg transition-colors"
                        title="Share question"
                      >
                        <FaShare />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookmarkedQuestionsPage;
