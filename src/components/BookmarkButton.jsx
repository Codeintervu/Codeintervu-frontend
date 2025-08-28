import React, { useState } from "react";
import { Bookmark } from "lucide-react";
import progressTracker from "../utils/progressTracker";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";
import {
  addBookmark as addBookmarkApi,
  deleteBookmark as deleteBookmarkApi,
} from "../utils/progressApi";

const BookmarkButton = ({ question, quizId, quizName }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { isAuthenticated } = useAuth();

  const handleBookmark = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to bookmark questions");
      return;
    }
    try {
      const bookmarkData = {
        questionId: question._id,
        quizId: quizId,
        quizName: quizName,
        question: question.question,
        correctAnswer: question.options[question.correctOption],
        explanation: question.explanation || "No explanation available",
      };
      // local cache for guests retained; for authed, persist server-side
      addBookmarkApi({
        questionId: bookmarkData.questionId,
        quizId: bookmarkData.quizId,
        quizName: bookmarkData.quizName,
        question: bookmarkData.question,
        note: "",
      }).catch(() => {});
      progressTracker.addBookmarkedQuestion(bookmarkData);
      setIsBookmarked(true);
      toast.success("Question bookmarked successfully!");
    } catch (error) {
      toast.error("Failed to bookmark question");
    }
  };

  const handleRemoveBookmark = () => {
    if (!isAuthenticated) {
      toast.error("Please log in to manage bookmarks");
      return;
    }
    try {
      deleteBookmarkApi(question._id).catch(() => {});
      progressTracker.removeBookmarkedQuestion(question._id);
      setIsBookmarked(false);
      toast.success("Bookmark removed");
    } catch (error) {
      toast.error("Failed to remove bookmark");
    }
  };

  return (
    <button
      onClick={isBookmarked ? handleRemoveBookmark : handleBookmark}
      className={`flex items-center gap-2 px-3 py-1 rounded-md text-sm transition-colors ${
        isBookmarked
          ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200 dark:bg-yellow-900/20 dark:text-yellow-400"
          : "bg-gray-100 text-gray-600 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
      }`}
      title={isBookmarked ? "Remove bookmark" : "Bookmark this question"}
      disabled={!isAuthenticated}
    >
      <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-current" : ""}`} />
      {isBookmarked ? "Bookmarked" : "Bookmark"}
    </button>
  );
};

export default BookmarkButton;
