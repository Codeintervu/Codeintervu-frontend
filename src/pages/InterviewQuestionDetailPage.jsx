import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  FaBookmark,
  FaShare,
  FaArrowLeft,
  FaCopy,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa";
import api from "../utils/api";
import toast, { Toaster } from "react-hot-toast";
import { generateQuestionMetaTags, resetMetaTags } from "../utils/metaTags";

const InterviewQuestionDetailPage = () => {
  const { category, slug } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(true);
  const [bookmarked, setBookmarked] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [relatedQuestions, setRelatedQuestions] = useState([]);

  useEffect(() => {
    fetchQuestion();
    checkBookmarkStatus();

    // Reset meta tags when component unmounts
    return () => {
      resetMetaTags();
    };
  }, [category, slug]);

  const fetchQuestion = async () => {
    try {
      setLoading(true);
      const response = await api.get(
        `/interview-questions/slug/${category}/${slug}`
      );
      const questionData = response.data.data;
      setQuestion(questionData);
      fetchRelatedQuestions(questionData);

      // Update meta tags for social sharing
      generateQuestionMetaTags(questionData);
    } catch (error) {
      console.error("Error fetching question:", error);
      toast.error("Failed to load question");
      navigate("/interview-questions");
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedQuestions = async (currentQuestion) => {
    try {
      const response = await api.get(
        `/interview-questions?category=${currentQuestion.category}&limit=3`
      );
      const filtered = response.data.data.questions.filter(
        (q) => q._id !== currentQuestion._id
      );
      setRelatedQuestions(filtered.slice(0, 3));
    } catch (error) {
      console.error("Error fetching related questions:", error);
    }
  };

  const checkBookmarkStatus = () => {
    const bookmarks = JSON.parse(
      localStorage.getItem("bookmarkedQuestions") || "[]"
    );
    setBookmarked(bookmarks.includes(question?._id));
  };

  const toggleBookmark = () => {
    const bookmarks = JSON.parse(
      localStorage.getItem("bookmarkedQuestions") || "[]"
    );
    let newBookmarks;

    if (bookmarked) {
      newBookmarks = bookmarks.filter((id) => id !== question._id);
      toast.success("Removed from bookmarks");
    } else {
      newBookmarks = [...bookmarks, question._id];
      toast.success("Added to bookmarks");
    }

    localStorage.setItem("bookmarkedQuestions", JSON.stringify(newBookmarks));
    setBookmarked(!bookmarked);
  };

  const copyToClipboard = async () => {
    const shareUrl = `${window.location.origin}/interview-questions/${category}/${slug}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Link copied to clipboard!");
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const shareOnSocial = (platform) => {
    const shareUrl = `${window.location.origin}/interview-questions/${category}/${slug}`;
    const title = `${question.categoryName} Interview Question: ${question.question}`;
    const text = question.answer.substring(0, 100) + "...";

    let shareLink = "";

    switch (platform) {
      case "linkedin":
        shareLink = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
          shareUrl
        )}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(
          text
        )}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
          title
        )}&url=${encodeURIComponent(
          shareUrl
        )}&hashtags=InterviewQuestions,Programming`;
        break;
      case "whatsapp":
        shareLink = `https://wa.me/?text=${encodeURIComponent(
          `${title} ${shareUrl}`
        )}`;
        break;
      default:
        return;
    }

    window.open(shareLink, "_blank", "width=600,height=400");
    setShowShareModal(false);
  };

  const getDifficultyColor = (difficulty) => {
    if (difficulty === "Easy") difficulty = "Beginner";
    if (difficulty === "Medium") difficulty = "Intermediate";
    if (difficulty === "Hard") difficulty = "Expert";
    switch (difficulty) {
      case "Beginner":
        return "bg-green-500";
      case "Intermediate":
        return "bg-yellow-500";
      case "Expert":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Question not found</h2>
          <Link
            to="/interview-questions"
            className="text-teal-500 hover:text-teal-600"
          >
            Back to Questions
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/interview-questions")}
              className="flex items-center text-gray-600 dark:text-gray-300 hover:text-teal-500 dark:hover:text-teal-400 transition-colors"
            >
              <FaArrowLeft className="mr-2" />
              Back to Questions
            </button>

            <div className="flex items-center space-x-4">
              <button
                onClick={toggleBookmark}
                className={`p-2 rounded-full transition-colors ${
                  bookmarked
                    ? "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
                    : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                }`}
              >
                <FaBookmark className="w-5 h-5" />
              </button>

              <button
                onClick={() => setShowShareModal(true)}
                className="p-2 rounded-full text-gray-400 hover:text-teal-500 hover:bg-teal-50 dark:hover:bg-teal-900/20 transition-colors"
              >
                <FaShare className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Question Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-4">
            <span
              className={`px-3 py-1 rounded-full text-white text-sm font-medium ${getDifficultyColor(
                question.difficulty
              )}`}
            >
              {question.difficulty}
            </span>
            <span className="text-gray-600 dark:text-gray-400 font-medium">
              {question.categoryName}
            </span>
            {question.companies && question.companies.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {question.companies.map((company, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-sm font-medium"
                  >
                    {company}
                  </span>
                ))}
              </div>
            )}
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {question.question}
          </h1>

          {/* Tags */}
          {question.tags && question.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {question.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Answer */}
        <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Answer:
          </h2>
          <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {question.answer}
          </div>
        </div>

        {/* Related Questions */}
        {relatedQuestions.length > 0 && (
          <div className="mt-12">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Related Questions
            </h3>
            <div className="grid gap-4">
              {relatedQuestions.map((relatedQuestion) => (
                <Link
                  key={relatedQuestion._id}
                  to={`/interview-questions/${
                    relatedQuestion.category
                  }/${relatedQuestion.question
                    .toLowerCase()
                    .replace(/[^a-z0-9\s]/g, "")
                    .replace(/\s+/g, "-")
                    .substring(0, 50)}`}
                  className="block p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-teal-300 dark:hover:border-teal-600 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs font-medium ${getDifficultyColor(
                        relatedQuestion.difficulty
                      )}`}
                    >
                      {relatedQuestion.difficulty}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {relatedQuestion.categoryName}
                    </span>
                  </div>
                  <h4 className="font-medium text-gray-900 dark:text-white">
                    {relatedQuestion.question}
                  </h4>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Modal */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
              Share Question
            </h3>

            <div className="space-y-3">
              <button
                onClick={copyToClipboard}
                className="w-full flex items-center justify-center gap-3 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <FaCopy className="w-5 h-5" />
                Copy Link
              </button>

              <button
                onClick={() => shareOnSocial("linkedin")}
                className="w-full flex items-center justify-center gap-3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaLinkedin className="w-5 h-5" />
                Share on LinkedIn
              </button>

              <button
                onClick={() => shareOnSocial("twitter")}
                className="w-full flex items-center justify-center gap-3 p-3 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-colors"
              >
                <FaTwitter className="w-5 h-5" />
                Share on Twitter
              </button>

              <button
                onClick={() => shareOnSocial("whatsapp")}
                className="w-full flex items-center justify-center gap-3 p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                <FaWhatsapp className="w-5 h-5" />
                Share on WhatsApp
              </button>
            </div>

            <button
              onClick={() => setShowShareModal(false)}
              className="w-full mt-4 p-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewQuestionDetailPage;
