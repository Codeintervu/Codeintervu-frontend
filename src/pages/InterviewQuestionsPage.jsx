import React, { useState } from "react";
import { FaSearch, FaFilter, FaBookmark, FaShare } from "react-icons/fa";

const InterviewQuestionsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    { id: "all", name: "All Questions", count: 150 },
    { id: "java", name: "Java", count: 45 },
    { id: "python", name: "Python", count: 38 },
    { id: "javascript", name: "JavaScript", count: 32 },
    { id: "react", name: "React", count: 25 },
    { id: "nodejs", name: "Node.js", count: 20 },
    { id: "database", name: "Database", count: 18 },
    { id: "system-design", name: "System Design", count: 15 },
    { id: "algorithms", name: "Algorithms", count: 30 },
    { id: "data-structures", name: "Data Structures", count: 28 },
  ];

  const sampleQuestions = [
    {
      id: 1,
      category: "java",
      question: "What is the difference between HashMap and HashTable in Java?",
      difficulty: "Medium",
      tags: ["Java", "Collections", "HashMap"],
      answer:
        "HashMap is non-synchronized and allows one null key and multiple null values, while HashTable is synchronized and doesn't allow null keys or values.",
      bookmarked: false,
    },
    {
      id: 2,
      category: "python",
      question: "Explain the difference between list and tuple in Python.",
      difficulty: "Easy",
      tags: ["Python", "Data Types", "Lists"],
      answer:
        "Lists are mutable and use square brackets [], while tuples are immutable and use parentheses ().",
      bookmarked: false,
    },
    {
      id: 3,
      category: "javascript",
      question: "What is the difference between var, let, and const?",
      difficulty: "Medium",
      tags: ["JavaScript", "Variables", "ES6"],
      answer:
        "var is function-scoped, let is block-scoped, and const is block-scoped but cannot be reassigned.",
      bookmarked: true,
    },
    {
      id: 4,
      category: "react",
      question: "What are React Hooks and when would you use them?",
      difficulty: "Hard",
      tags: ["React", "Hooks", "Functional Components"],
      answer:
        "React Hooks are functions that allow you to use state and other React features in functional components.",
      bookmarked: false,
    },
    {
      id: 5,
      category: "algorithms",
      question: "Explain the time complexity of Binary Search.",
      difficulty: "Medium",
      tags: ["Algorithms", "Search", "Binary Search"],
      answer:
        "Binary Search has O(log n) time complexity as it divides the search space in half with each iteration.",
      bookmarked: false,
    },
  ];

  const filteredQuestions = sampleQuestions.filter((q) => {
    const matchesCategory =
      selectedCategory === "all" || q.category === selectedCategory;
    const matchesSearch =
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.tags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

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
                    {category.name} ({category.count})
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
                    {category.count} questions
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Questions List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Questions ({filteredQuestions.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredQuestions.map((question) => (
              <div
                key={question.id}
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
                        {
                          categories.find((c) => c.id === question.category)
                            ?.name
                        }
                      </span>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {question.question}
                    </h3>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {question.tags.map((tag) => (
                        <span
                          key={tag}
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
                      className={`p-2 rounded-lg transition-colors ${
                        question.bookmarked
                          ? "text-yellow-500 hover:text-yellow-600"
                          : "text-gray-400 hover:text-yellow-500"
                      }`}
                    >
                      <FaBookmark />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-teal-500 rounded-lg transition-colors">
                      <FaShare />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredQuestions.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
              🔍
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No questions found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewQuestionsPage;
