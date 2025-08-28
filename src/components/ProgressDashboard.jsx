import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Clock,
  Target,
  TrendingUp,
  TrendingDown,
  Minus,
  Bookmark,
  FileText,
  Calendar,
  Award,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react";
import progressTracker from "../utils/progressTracker";
import { useAuth } from "../context/AuthContext";
import {
  getSummary as getSummaryApi,
  getRecent as getRecentApi,
  listBookmarks as listBookmarksApi,
} from "../utils/progressApi";
import AuthModals from "./AuthModals";

const ProgressDashboard = ({
  isOpen,
  onClose,
  variant = "full",
  quizId = null,
}) => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState(null);
  const [recentQuizzes, setRecentQuizzes] = useState([]);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState([]);
  const [showDetailedStats, setShowDetailedStats] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    loadProgressData();

    const handleProgressUpdate = () => {
      loadProgressData();
    };
    window.addEventListener("progress:updated", handleProgressUpdate);
    return () => {
      window.removeEventListener("progress:updated", handleProgressUpdate);
    };
  }, [isOpen]);

  const loadProgressData = () => {
    // If authenticated, prefer server; otherwise use local cache
    if (user) {
      getSummaryApi()
        .then((summary) => setAnalytics(summary))
        .catch(() =>
          setAnalytics(progressTracker.getPerformanceAnalytics(quizId))
        );
      getRecentApi()
        .then((recent) =>
          setRecentQuizzes(
            quizId ? recent.filter((q) => q.quizId === quizId) : recent
          )
        )
        .catch(() =>
          setRecentQuizzes(
            quizId
              ? progressTracker
                  .getRecentQuizzes()
                  .filter((q) => q.quizId === quizId)
              : progressTracker.getRecentQuizzes()
          )
        );
      listBookmarksApi()
        .then((bms) =>
          setBookmarkedQuestions(
            quizId ? bms.filter((b) => b.quizId === quizId) : bms
          )
        )
        .catch(() =>
          setBookmarkedQuestions(
            quizId
              ? progressTracker
                  .getBookmarkedQuestions()
                  .filter((b) => b.quizId === quizId)
              : progressTracker.getBookmarkedQuestions()
          )
        );
      return;
    }
    const analyticsData = progressTracker.getPerformanceAnalytics(quizId);
    const recentData = quizId
      ? progressTracker.getRecentQuizzes().filter((q) => q.quizId === quizId)
      : progressTracker.getRecentQuizzes();
    const bookmarkedData = quizId
      ? progressTracker
          .getBookmarkedQuestions()
          .filter((b) => b.quizId === quizId)
      : progressTracker.getBookmarkedQuestions();

    setAnalytics(analyticsData);
    setRecentQuizzes(recentData);
    setBookmarkedQuestions(bookmarkedData);
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case "improving":
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case "declining":
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendText = (trend) => {
    switch (trend) {
      case "improving":
        return "Improving";
      case "declining":
        return "Needs Focus";
      default:
        return "Stable";
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case "improving":
        return "text-green-600";
      case "declining":
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  if (!isOpen) return null;

  // If user is not authenticated, show only the signup banner and hide analytics
  const isGuest = !user;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Your Progress Dashboard
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              {user
                ? "Your learning journey"
                : "Track your progress and save it permanently"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Registration Banner for Unregistered Users */}
        {isGuest && (
          <div className="bg-gradient-to-r from-teal-500 to-blue-600 rounded-lg p-4 mb-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-lg">
                  Save Your Progress Permanently!
                </h3>
                <p className="text-teal-100">
                  Register to save all your quiz results, bookmarks, and study
                  statistics across devices.
                </p>
              </div>
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-white text-teal-600 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center gap-2"
                type="button"
              >
                Sign Up Free
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Quick Stats (only for authenticated users) */}
        {!isGuest && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-600 dark:text-blue-400">
                    Average Score
                  </p>
                  <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                    {analytics?.averageScore || 0}%
                  </p>
                </div>
                <BarChart3 className="w-8 h-8 text-blue-500" />
              </div>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    Quizzes Taken
                  </p>
                  <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                    {analytics?.totalQuizzes || 0}
                  </p>
                </div>
                <Target className="w-8 h-8 text-green-500" />
              </div>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-600 dark:text-purple-400">
                    Study Time
                  </p>
                  <p className="text-2xl font-bold text-purple-700 dark:text-purple-300">
                    {formatTime(analytics?.totalTimeSpent || 0)}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-purple-500" />
              </div>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-orange-600 dark:text-orange-400">
                    Study Streak
                  </p>
                  <p className="text-2xl font-bold text-orange-700 dark:text-orange-300">
                    {analytics?.studyStreak || 0} days
                  </p>
                </div>
                <Award className="w-8 h-8 text-orange-500" />
              </div>
            </div>
          </div>
        )}

        {/* Performance Trend (only for authenticated users) */}
        {!isGuest && variant === "full" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg p-4 mb-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Performance Trend
              </h3>
              <div className="flex items-center gap-2">
                {getTrendIcon(analytics?.improvementTrend)}
                <span
                  className={`text-sm font-medium ${getTrendColor(
                    analytics?.improvementTrend
                  )}`}
                >
                  {getTrendText(analytics?.improvementTrend)}
                </span>
              </div>
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              Based on your last {Math.min(analytics?.totalQuizzes || 0, 10)}{" "}
              quiz attempts
            </p>
          </div>
        )}

        {/* Recent Activity */}
        {variant === "full" && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Quizzes (only for authenticated users) */}
            {!isGuest && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Quizzes
                  </h3>
                  <FileText className="w-5 h-5 text-gray-500" />
                </div>
                {recentQuizzes.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No quizzes taken yet. Start your learning journey!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {recentQuizzes.slice(0, 5).map((quiz, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 dark:text-white truncate">
                            {quiz.quizName}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatDate(quiz.completedAt)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-gray-900 dark:text-white">
                            {quiz.score}%
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {quiz.correctAnswers}/{quiz.totalQuestions}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Bookmarked Questions (only for authenticated users) */}
            {!isGuest && (
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Bookmarked Questions
                  </h3>
                  <Bookmark className="w-5 h-5 text-gray-500" />
                </div>
                {bookmarkedQuestions.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    No bookmarked questions yet. Bookmark questions you want to
                    review later!
                  </p>
                ) : (
                  <div className="space-y-3">
                    {bookmarkedQuestions.slice(0, 5).map((bookmark, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
                      >
                        <p className="font-medium text-gray-900 dark:text-white text-sm line-clamp-2">
                          {bookmark.question}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                          {bookmark.quizName} •{" "}
                          {formatDate(bookmark.bookmarkedAt)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Study Recommendations */}
        {variant === "full" && (
          <div className="mt-6 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
              Study Recommendations
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Focus Areas
                </h4>
                <div className="space-y-1">
                  {analytics?.weakAreas?.map((area, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {area}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Strong Areas
                </h4>
                <div className="space-y-1">
                  {analytics?.strongAreas?.map((area, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {area}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button
            onClick={() => setShowDetailedStats(!showDetailedStats)}
            className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            {showDetailedStats ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
            {showDetailedStats ? "Hide Details" : "Show Details"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
        {/* Auth Modal */}
        {showAuthModal && (
          <AuthModals
            isOpen={showAuthModal}
            onClose={() => setShowAuthModal(false)}
            initialMode="register"
          />
        )}
      </div>
    </div>
  );
};

export default ProgressDashboard;
