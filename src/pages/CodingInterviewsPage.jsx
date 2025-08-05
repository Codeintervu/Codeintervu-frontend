import React, { useState } from "react";
import {
  FaCode,
  FaPlay,
  FaClock,
  FaStar,
  FaUsers,
  FaTrophy,
  FaBookmark,
} from "react-icons/fa";

const CodingInterviewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const categories = [
    { id: "all", name: "All Problems", count: 500 },
    { id: "arrays", name: "Arrays", count: 85 },
    { id: "strings", name: "Strings", count: 72 },
    { id: "linked-lists", name: "Linked Lists", count: 45 },
    { id: "trees", name: "Trees", count: 68 },
    { id: "graphs", name: "Graphs", count: 55 },
    { id: "dynamic-programming", name: "Dynamic Programming", count: 75 },
    { id: "greedy", name: "Greedy", count: 40 },
    { id: "backtracking", name: "Backtracking", count: 35 },
    { id: "system-design", name: "System Design", count: 25 },
  ];

  const difficulties = [
    { id: "all", name: "All Difficulties", color: "gray" },
    { id: "easy", name: "Easy", color: "green" },
    { id: "medium", name: "Medium", color: "yellow" },
    { id: "hard", name: "Hard", color: "red" },
  ];

  const codingProblems = [
    {
      id: 1,
      title: "Two Sum",
      category: "arrays",
      difficulty: "easy",
      acceptance: 95.2,
      submissions: 15420,
      description:
        "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
      companies: ["Google", "Amazon", "Microsoft"],
      tags: ["Array", "Hash Table"],
      isBookmarked: false,
      isCompleted: false,
    },
    {
      id: 2,
      title: "Valid Parentheses",
      category: "strings",
      difficulty: "easy",
      acceptance: 92.8,
      submissions: 12850,
      description:
        "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
      companies: ["Facebook", "Google", "Apple"],
      tags: ["String", "Stack"],
      isBookmarked: true,
      isCompleted: true,
    },
    {
      id: 3,
      title: "Merge Two Sorted Lists",
      category: "linked-lists",
      difficulty: "easy",
      acceptance: 89.5,
      submissions: 9850,
      description:
        "Merge two sorted linked lists and return it as a sorted list. The list should be made by splicing together the nodes of the first two lists.",
      companies: ["Amazon", "Microsoft", "LinkedIn"],
      tags: ["Linked List", "Recursion"],
      isBookmarked: false,
      isCompleted: false,
    },
    {
      id: 4,
      title: "Binary Tree Inorder Traversal",
      category: "trees",
      difficulty: "medium",
      acceptance: 87.3,
      submissions: 11200,
      description:
        "Given the root of a binary tree, return the inorder traversal of its nodes' values.",
      companies: ["Google", "Facebook", "Amazon"],
      tags: ["Tree", "Stack", "Recursion"],
      isBookmarked: false,
      isCompleted: false,
    },
    {
      id: 5,
      title: "Longest Substring Without Repeating Characters",
      category: "strings",
      difficulty: "medium",
      acceptance: 82.1,
      submissions: 15600,
      description:
        "Given a string s, find the length of the longest substring without repeating characters.",
      companies: ["Amazon", "Google", "Microsoft"],
      tags: ["String", "Sliding Window", "Hash Table"],
      isBookmarked: true,
      isCompleted: false,
    },
    {
      id: 6,
      title: "Climbing Stairs",
      category: "dynamic-programming",
      difficulty: "easy",
      acceptance: 90.2,
      submissions: 13400,
      description:
        "You are climbing a staircase. It takes n steps to reach the top. Each time you can either climb 1 or 2 steps.",
      companies: ["Google", "Amazon", "Apple"],
      tags: ["Dynamic Programming", "Math"],
      isBookmarked: false,
      isCompleted: true,
    },
    {
      id: 7,
      title: "Design a URL Shortener",
      category: "system-design",
      difficulty: "hard",
      acceptance: 75.8,
      submissions: 3200,
      description:
        "Design a URL shortening service like TinyURL or Bitly. Consider scalability, performance, and reliability.",
      companies: ["Google", "Amazon", "Facebook"],
      tags: ["System Design", "Database", "Caching"],
      isBookmarked: false,
      isCompleted: false,
    },
    {
      id: 8,
      title: "Word Search",
      category: "backtracking",
      difficulty: "medium",
      acceptance: 78.5,
      submissions: 8900,
      description:
        "Given an m x n grid of characters board and a string word, return true if word exists in the grid.",
      companies: ["Microsoft", "Google", "Amazon"],
      tags: ["Backtracking", "Matrix", "DFS"],
      isBookmarked: false,
      isCompleted: false,
    },
  ];

  const filteredProblems = codingProblems.filter((problem) => {
    const matchesCategory =
      selectedCategory === "all" || problem.category === selectedCategory;
    const matchesDifficulty =
      selectedDifficulty === "all" || problem.difficulty === selectedDifficulty;
    return matchesCategory && matchesDifficulty;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Coding Interviews
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Practice coding problems and master algorithms to ace your technical
            interviews
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                <FaCode className="text-teal-600 dark:text-teal-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Problems
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  500
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <FaTrophy className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Solved
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  127
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <FaStar className="text-yellow-600 dark:text-yellow-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Success Rate
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  85%
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaUsers className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  2.5K
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Category Filter */}
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Categories
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedCategory === category.id
                        ? "bg-teal-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-900/30"
                    }`}
                  >
                    {category.name} ({category.count})
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty Filter */}
            <div className="lg:w-64">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
                Difficulty
              </h3>
              <div className="flex flex-wrap gap-2">
                {difficulties.map((difficulty) => (
                  <button
                    key={difficulty.id}
                    onClick={() => setSelectedDifficulty(difficulty.id)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      selectedDifficulty === difficulty.id
                        ? "bg-teal-500 text-white"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-teal-100 dark:hover:bg-teal-900/30"
                    }`}
                  >
                    {difficulty.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Problems List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
              Problems ({filteredProblems.length})
            </h2>
          </div>

          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredProblems.map((problem) => (
              <div
                key={problem.id}
                className="p-6 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {problem.title}
                      </h3>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          problem.difficulty === "easy"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : problem.difficulty === "medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                        }`}
                      >
                        {problem.difficulty.charAt(0).toUpperCase() +
                          problem.difficulty.slice(1)}
                      </span>
                      {problem.isCompleted && (
                        <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 rounded-full text-xs font-medium">
                          ✓ Solved
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {problem.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {problem.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <FaUsers />
                        <span>
                          {problem.submissions.toLocaleString()} submissions
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaStar />
                        <span>{problem.acceptance}% acceptance</span>
                      </div>
                    </div>

                    <div className="mt-3">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                        Asked by:
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {problem.companies.map((company) => (
                          <span
                            key={company}
                            className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded text-xs"
                          >
                            {company}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 ml-4">
                    <button
                      className={`p-2 rounded-lg transition-colors ${
                        problem.isBookmarked
                          ? "text-yellow-500 hover:text-yellow-600"
                          : "text-gray-400 hover:text-yellow-500"
                      }`}
                    >
                      <FaBookmark />
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors">
                      <FaPlay className="text-sm" />
                      Solve
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Empty State */}
        {filteredProblems.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
              💻
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No problems found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try adjusting your filters
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Master Coding?</h2>
          <p className="text-xl mb-6 opacity-90">
            Join our coding community and track your progress with detailed
            analytics
          </p>
          <button className="px-8 py-4 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Practicing
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodingInterviewsPage;
