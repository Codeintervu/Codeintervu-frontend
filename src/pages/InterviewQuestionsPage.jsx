import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaSearch,
  FaFilter,
  FaBookmark,
  FaShare,
  FaBookmark as FaBookmarkSolid,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import api from "../utils/api";

const InterviewQuestionsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState(new Set());
  const [stats, setStats] = useState({
    total: 0,
    byCategory: {},
    byDifficulty: {},
  });
  const [categoryCounts, setCategoryCounts] = useState({});
  const [difficultyCounts, setDifficultyCounts] = useState({});
  const [companyCounts, setCompanyCounts] = useState({});
  const [categories, setCategories] = useState([]);
  const [companies, setCompanies] = useState([]);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questionsPerPage] = useState(10);

  const baseDifficulties = [
    { id: "all", name: "All Difficulties" },
    { id: "Easy", name: "Easy" },
    { id: "Medium", name: "Medium" },
    { id: "Hard", name: "Hard" },
  ];

  // Load bookmarked questions from localStorage on component mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarkedQuestions");
    if (savedBookmarks) {
      try {
        const bookmarks = JSON.parse(savedBookmarks);
        setBookmarkedQuestions(new Set(bookmarks));
      } catch (error) {
        console.error("Error loading bookmarks:", error);
        setBookmarkedQuestions(new Set());
      }
    }
  }, []);

  // Fetch categories on component mount
  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [selectedCategory, selectedDifficulty, selectedCompany, searchQuery]);

  useEffect(() => {
    fetchQuestions();
    fetchStats();
  }, [
    selectedCategory,
    selectedDifficulty,
    selectedCompany,
    searchQuery,
    currentPage,
    categories,
  ]);

  const fetchCategories = async () => {
    try {
      const response = await api.get(
        "/interview-question-categories/with-counts"
      );
      const categoriesData = response.data.data;

      // Create categories array with "All Questions" option
      const allCategories = [
        { id: "all", name: "All Questions", questionCount: 0 },
      ];

      // Add fetched categories
      categoriesData.forEach((category) => {
        allCategories.push({
          id: category.slug,
          name: category.name,
          questionCount: category.questionCount || 0,
          color: category.color,
        });
      });

      setCategories(allCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      // Fallback to empty categories
      setCategories([{ id: "all", name: "All Questions", questionCount: 0 }]);
    }
  };

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();

      if (searchQuery) params.append("search", searchQuery);
      if (selectedCategory !== "all")
        params.append("category", selectedCategory);
      if (selectedDifficulty !== "all")
        params.append("difficulty", selectedDifficulty);
      if (selectedCompany !== "all") params.append("company", selectedCompany);

      // Add pagination parameters
      params.append("page", currentPage.toString());
      params.append("limit", questionsPerPage.toString());

      const response = await api.get(`/interview-questions?${params}`);
      const data = response.data.data;

      setQuestions(data.questions || []);
      setTotalQuestions(data.pagination?.total || 0);
      setTotalPages(data.pagination?.pages || 1);
    } catch (error) {
      console.error("Error fetching questions:", error);
      setQuestions([]);
      setTotalQuestions(0);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await api.get("/interview-questions/stats");
      const statsData = response.data.data;
      setStats(statsData);

      // Update category counts using the categories data we already have
      const updatedCategoryCounts = {};
      categories.forEach((category) => {
        if (category.id === "all") {
          updatedCategoryCounts[category.id] = statsData.total;
        } else {
          // Use the questionCount from the categories API, fallback to stats API
          updatedCategoryCounts[category.id] =
            category.questionCount || statsData.byCategory[category.id] || 0;
        }
      });
      setCategoryCounts(updatedCategoryCounts);

      // Update difficulty counts
      const updatedDifficultyCounts = {};
      baseDifficulties.forEach((difficulty) => {
        if (difficulty.id === "all") {
          updatedDifficultyCounts[difficulty.id] = statsData.total;
        } else {
          updatedDifficultyCounts[difficulty.id] =
            statsData.byDifficulty[difficulty.id] || 0;
        }
      });
      setDifficultyCounts(updatedDifficultyCounts);

      // Update company counts and populate companies list
      if (statsData.byCompany) {
        setCompanyCounts(statsData.byCompany);
        setCompanies(Object.keys(statsData.byCompany).sort());
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleBookmark = (questionId) => {
    const newBookmarks = new Set(bookmarkedQuestions);

    if (newBookmarks.has(questionId)) {
      // Remove bookmark
      newBookmarks.delete(questionId);
    } else {
      // Add bookmark
      newBookmarks.add(questionId);
    }

    setBookmarkedQuestions(newBookmarks);

    // Save to localStorage
    localStorage.setItem(
      "bookmarkedQuestions",
      JSON.stringify([...newBookmarks])
    );

    // Show feedback
    const isBookmarked = newBookmarks.has(questionId);
    const message = isBookmarked ? "Question bookmarked!" : "Bookmark removed!";

    // Create a temporary toast notification
    showToast(message, isBookmarked ? "success" : "info");
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

  const handleShare = (question) => {
    const shareText = `${question.categoryName} Interview Question: ${question.question}`;
    const shareUrl = `${window.location.origin}/interview-questions/${
      question.category
    }/${question.question
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "")
      .replace(/\s+/g, "-")
      .substring(0, 50)}`;

    if (navigator.share) {
      navigator.share({
        title: shareText,
        text: `${shareText}\n\nAnswer: ${question.answer.substring(0, 100)}...`,
        url: shareUrl,
      });
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(shareUrl);
      showToast("Link copied to clipboard!", "success");
    }
  };

  const isBookmarked = (questionId) => {
    return bookmarkedQuestions.has(questionId);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleViewBookmarks = () => {
    navigate("/bookmarked-questions");
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    // Previous button
    pages.push(
      <button
        key="prev"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        <FaChevronLeft className="w-4 h-4" />
      </button>
    );

    // Page numbers
    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-2 text-sm font-medium border-t border-b ${
            i === currentPage
              ? "z-10 bg-teal-50 border-teal-500 text-teal-600 dark:bg-teal-900/20 dark:border-teal-400 dark:text-teal-400"
              : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
          }`}
        >
          {i}
        </button>
      );
    }

    // Next button
    pages.push(
      <button
        key="next"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        <FaChevronRight className="w-4 h-4" />
      </button>
    );

    return (
      <div className="flex items-center justify-center mt-8">
        <nav className="flex items-center" aria-label="Pagination">
          {pages}
        </nav>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Interview Questions
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Master your technical interviews with our comprehensive collection
            of programming questions
          </p>
          {/* Bookmark Stats */}
          <div className="mt-4 flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <FaBookmarkSolid className="text-yellow-500" />
              <span>{bookmarkedQuestions.size} bookmarked questions</span>
            </div>
            {bookmarkedQuestions.size > 0 && (
              <button
                onClick={handleViewBookmarks}
                className="text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium"
              >
                View All Bookmarks →
              </button>
            )}
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search questions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name} ({categoryCounts[category.id] || 0})
                  </option>
                ))}
              </select>
            </div>

            {/* Difficulty Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                {baseDifficulties.map((difficulty) => (
                  <option key={difficulty.id} value={difficulty.id}>
                    {difficulty.name} ({difficultyCounts[difficulty.id] || 0})
                  </option>
                ))}
              </select>
            </div>

            {/* Company Filter */}
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Companies</option>
                {companies.map((company) => (
                  <option key={company} value={company}>
                    {company} ({companyCounts[company] || 0})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {categories.slice(1).map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-600"
                }`}
              >
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {category.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {categoryCounts[category.id] || 0} questions
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
            Browse by Difficulty
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {baseDifficulties.slice(1).map((difficulty) => (
              <button
                key={difficulty.id}
                onClick={() => setSelectedDifficulty(difficulty.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedDifficulty === difficulty.id
                    ? "border-teal-500 bg-teal-50 dark:bg-teal-900/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-teal-300 dark:hover:border-teal-600"
                }`}
              >
                <div className="text-center">
                  <div className="text-lg font-semibold text-gray-900 dark:text-white">
                    {difficulty.name}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {difficultyCounts[difficulty.id] || 0} questions
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
                Questions ({totalQuestions})
              </h2>
              {totalPages > 1 && (
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </div>
              )}
            </div>
          </div>

          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
              <p className="text-gray-600 dark:text-gray-400">
                Loading questions...
              </p>
            </div>
          ) : (
            <>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {questions.map((question) => (
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
                          {question.company && (
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-medium">
                              {question.company}
                            </span>
                          )}
                          {isBookmarked(question._id) && (
                            <span className="flex items-center gap-1 text-xs text-yellow-600 dark:text-yellow-400">
                              <FaBookmarkSolid className="w-3 h-3" />
                              Bookmarked
                            </span>
                          )}
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
                          onClick={() => handleBookmark(question._id)}
                          className={`p-2 rounded-lg transition-colors ${
                            isBookmarked(question._id)
                              ? "text-yellow-500 hover:text-yellow-600"
                              : "text-gray-400 hover:text-yellow-500"
                          }`}
                          title={
                            isBookmarked(question._id)
                              ? "Remove bookmark"
                              : "Add bookmark"
                          }
                        >
                          {isBookmarked(question._id) ? (
                            <FaBookmarkSolid />
                          ) : (
                            <FaBookmark />
                          )}
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

              {/* Pagination */}
              {renderPagination()}
            </>
          )}

          {/* Empty State */}
          {!loading && questions.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
                🔍
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                No questions found
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {searchQuery ||
                selectedCategory !== "all" ||
                selectedDifficulty !== "all"
                  ? "Try adjusting your search or filter criteria"
                  : "No questions available yet. Check back soon!"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InterviewQuestionsPage;
