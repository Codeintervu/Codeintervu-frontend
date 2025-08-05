import React, { useState } from "react";
import {
  FaPlay,
  FaClock,
  FaUsers,
  FaStar,
  FaCalendar,
  FaVideo,
  FaMicrophone,
} from "react-icons/fa";

const MockInterviewsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Interviews", count: 25 },
    { id: "technical", name: "Technical", count: 12 },
    { id: "behavioral", name: "Behavioral", count: 8 },
    { id: "system-design", name: "System Design", count: 5 },
  ];

  const mockInterviews = [
    {
      id: 1,
      title: "Frontend Developer Interview",
      category: "technical",
      duration: "45 min",
      difficulty: "Medium",
      participants: "1-on-1",
      rating: 4.8,
      reviews: 156,
      description:
        "Practice common frontend interview questions covering React, JavaScript, and CSS.",
      topics: ["React", "JavaScript", "CSS", "HTML"],
      interviewer: "Sarah Chen",
      interviewerRole: "Senior Frontend Engineer",
      company: "TechCorp",
      price: "Free",
      isLive: false,
    },
    {
      id: 2,
      title: "Backend Developer Mock Interview",
      category: "technical",
      duration: "60 min",
      difficulty: "Hard",
      participants: "1-on-1",
      rating: 4.9,
      reviews: 203,
      description:
        "Comprehensive backend interview covering databases, APIs, and system architecture.",
      topics: ["Node.js", "Databases", "APIs", "System Design"],
      interviewer: "Mike Rodriguez",
      interviewerRole: "Backend Lead",
      company: "DataFlow",
      price: "$29",
      isLive: true,
    },
    {
      id: 3,
      title: "Behavioral Interview Practice",
      category: "behavioral",
      duration: "30 min",
      difficulty: "Easy",
      participants: "1-on-1",
      rating: 4.7,
      reviews: 89,
      description:
        "Practice common behavioral questions and learn how to structure your responses.",
      topics: ["Leadership", "Problem Solving", "Teamwork", "Communication"],
      interviewer: "Lisa Thompson",
      interviewerRole: "HR Manager",
      company: "GrowthTech",
      price: "Free",
      isLive: false,
    },
    {
      id: 4,
      title: "System Design Interview",
      category: "system-design",
      duration: "90 min",
      difficulty: "Hard",
      participants: "1-on-1",
      rating: 4.9,
      reviews: 134,
      description:
        "Practice designing scalable systems and learn best practices for system architecture.",
      topics: ["Scalability", "Microservices", "Databases", "Load Balancing"],
      interviewer: "David Kim",
      interviewerRole: "Principal Engineer",
      company: "ScaleUp",
      price: "$49",
      isLive: true,
    },
    {
      id: 5,
      title: "Full Stack Developer Interview",
      category: "technical",
      duration: "75 min",
      difficulty: "Hard",
      participants: "1-on-1",
      rating: 4.8,
      reviews: 178,
      description:
        "Comprehensive full-stack interview covering both frontend and backend technologies.",
      topics: ["React", "Node.js", "Databases", "DevOps"],
      interviewer: "Alex Johnson",
      interviewerRole: "Full Stack Lead",
      company: "WebFlow",
      price: "$39",
      isLive: false,
    },
  ];

  const filteredInterviews = mockInterviews.filter(
    (interview) =>
      selectedCategory === "all" || interview.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Mock Interviews
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Practice with real interviewers and get personalized feedback to ace
            your next interview
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                <FaUsers className="text-teal-600 dark:text-teal-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Interviews
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  25
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaClock className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Avg Duration
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  60 min
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
                  Avg Rating
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  4.8
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <FaVideo className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Live Sessions
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  8
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-teal-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-teal-300 dark:hover:border-teal-600"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Interviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredInterviews.map((interview) => (
            <div
              key={interview.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {interview.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">
                      {interview.description}
                    </p>
                  </div>
                  {interview.isLive && (
                    <span className="flex items-center gap-1 px-2 py-1 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 rounded-full text-xs font-medium">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                      LIVE
                    </span>
                  )}
                </div>

                {/* Interviewer Info */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-teal-100 dark:bg-teal-900/30 rounded-full flex items-center justify-center">
                    <FaMicrophone className="text-teal-600 dark:text-teal-400" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {interview.interviewer}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {interview.interviewerRole} at {interview.company}
                    </p>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <FaClock />
                    <span>{interview.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers />
                    <span>{interview.participants}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500" />
                    <span>
                      {interview.rating} ({interview.reviews} reviews)
                    </span>
                  </div>
                </div>
              </div>

              {/* Topics */}
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                  Topics Covered:
                </h4>
                <div className="flex flex-wrap gap-2">
                  {interview.topics.map((topic) => (
                    <span
                      key={topic}
                      className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        interview.difficulty === "Easy"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : interview.difficulty === "Medium"
                          ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                      }`}
                    >
                      {interview.difficulty}
                    </span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {interview.price}
                    </span>
                  </div>
                  <button className="flex items-center gap-2 px-6 py-3 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors">
                    <FaPlay className="text-sm" />
                    Start Interview
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredInterviews.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
              🎤
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No interviews found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try selecting a different category
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Ace Your Interview?
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Book a live mock interview with our expert interviewers and get
            personalized feedback
          </p>
          <button className="px-8 py-4 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Schedule Live Interview
          </button>
        </div>
      </div>
    </div>
  );
};

export default MockInterviewsPage;
