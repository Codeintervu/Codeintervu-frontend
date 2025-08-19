import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import ErrorBoundary from "./components/ErrorBoundary";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import SubNavbar from "./components/SubNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import CategoryPage from "./pages/CategoryPage";
import JavaCompiler from "./compilers/JavaCompiler";
import PythonCompiler from "./compilers/PythonCompiler";
import JavaScriptCompiler from "./compilers/JavaScriptCompiler";
import CCompiler from "./compilers/CCompiler";
import CppCompiler from "./compilers/CppCompiler";
import QuizListPage from "./pages/QuizListPage";
import QuizMCQPage from "./pages/QuizMCQPage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import TldrawWhiteboard from "./pages/TldrawWhiteboard";
import InterviewQuestionsPage from "./pages/InterviewQuestionsPage";
import InterviewQuestionDetailPage from "./pages/InterviewQuestionDetailPage";
import BookmarkedQuestionsPage from "./pages/BookmarkedQuestionsPage";
import MockInterviewsPage from "./pages/MockInterviewsPage";
import CodingInterviewsPage from "./pages/CodingInterviewsPage";

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 overflow-x-hidden">
          <Toaster position="top-right" />
          <Navbar />
          <SubNavbar />
          <main className="pt-8 sm:pt-12">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/quiz" element={<QuizListPage />} />
              <Route path="/quiz/:slug" element={<QuizMCQPage />} />
              <Route
                path="/interview-questions"
                element={<InterviewQuestionsPage />}
              />
              <Route
                path="/interview-questions/:category/:slug"
                element={<InterviewQuestionDetailPage />}
              />
              <Route
                path="/bookmarked-questions"
                element={<BookmarkedQuestionsPage />}
              />
              <Route path="/mock-interviews" element={<MockInterviewsPage />} />
              <Route
                path="/coding-interviews"
                element={<CodingInterviewsPage />}
              />

              <Route path="/projects" element={<ProjectsPage />} />
              <Route
                path="/projects/:projectId"
                element={<ProjectDetailPage />}
              />
              <Route path="/whiteboard" element={<TldrawWhiteboard />} />
              <Route
                path="/compilers/java-compiler"
                element={<JavaCompiler />}
              />
              <Route
                path="/compilers/python-compiler"
                element={<PythonCompiler />}
              />
              <Route
                path="/compilers/javascript-compiler"
                element={<JavaScriptCompiler />}
              />
              <Route path="/compilers/c-compiler" element={<CCompiler />} />
              <Route path="/compilers/cpp-compiler" element={<CppCompiler />} />

              {/* Pretty URL for tutorials: /categoryPath/tutorialSlug */}
              <Route
                path="/:categoryPath/:tutorialSlug"
                element={<CategoryPage />}
              />
              {/* Fallback for category page without a tutorial selected */}
              <Route path="/:categoryPath" element={<CategoryPage />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;
