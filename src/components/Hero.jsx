import { ArrowRight, Play, BookOpen } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModals from "./AuthModals";

const Hero = () => {
  const { user } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleGetStarted = () => {
    if (!user) {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-6">
      <div className="max-w-4xl mx-auto text-center">
        {/* Simple Badge */}
        {/* <div className="inline-block px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium rounded-full mb-12">
          AI-Powered Learning
        </div> */}

        {/* Main Headline */}
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-8 leading-tight">
          Learn to Code Smarter,
          <br />
          <span className="text-teal-600 dark:text-teal-400">
            Master Skills{" "}
          </span>
          and Ace Your Interviews
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 max-w-2xl mx-auto">
          Gain confidence with structured lessons, real-world projects, and
          AI-powered feedback. Build job-ready coding skills that prepare you
          for interviews at top companies.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
          {user ? (
            // Logged in user - show learning options
            <>
              <Link
                to="/course"
                className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                Continue Learning
                <Play className="w-5 h-5" />
              </Link>

              <Link
                to="/projects"
                className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold text-lg rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center gap-2"
              >
                View Projects
                <BookOpen className="w-5 h-5" />
              </Link>
            </>
          ) : (
            // Not logged in - show registration options
            <>
              <button
                onClick={handleGetStarted}
                className="px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-lg rounded-lg transition-colors duration-200 flex items-center gap-2"
              >
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </button>

              <Link
                to="/course"
                className="px-8 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold text-lg rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                Browse Courses
              </Link>
            </>
          )}
        </div>

        {/* Simple Stats */}
        {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              50+
            </div>
            <div className="text-gray-600 dark:text-gray-400">Languages</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              1,000+
            </div>
            <div className="text-gray-600 dark:text-gray-400">Lessons</div>
          </div>
          <div>
            <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              24/7
            </div>
            <div className="text-gray-600 dark:text-gray-400">Support</div>
          </div>
        </div> */}
      </div>

      {/* Authentication Modal */}
      <AuthModals
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode="login"
      />
    </section>
  );
};

export default Hero;
