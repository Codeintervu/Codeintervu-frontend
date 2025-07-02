import React from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import SubNavbar from "./components/SubNavbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import Contact from "./pages/Contact";
import CategoryPage from "./pages/CategoryPage";
import JavaCompiler from "./compilers/JavaCompiler";
import PythonCompiler from "./compilers/PythonCompiler";
import JavaScriptCompiler from "./compilers/JavaScriptCompiler";
import CCompiler from "./compilers/CCompiler";
import CppCompiler from "./compilers/CppCompiler";

const App = () => {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-200 overflow-x-hidden">
        <Navbar />
        <SubNavbar />
        <main className="pt-8 sm:pt-12">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/contact" element={<Contact />} />

            {/* Pretty URL for tutorials: /categoryPath/tutorialSlug */}
            <Route
              path="/:categoryPath/:tutorialSlug"
              element={<CategoryPage />}
            />
            {/* Fallback for category page without a tutorial selected */}
            <Route path="/:categoryPath" element={<CategoryPage />} />
            <Route path="/compilers/java" element={<JavaCompiler />} />
            <Route path="/compilers/python" element={<PythonCompiler />} />
            <Route
              path="/compilers/javascript"
              element={<JavaScriptCompiler />}
            />
            <Route path="/compilers/c" element={<CCompiler />} />
            <Route path="/compilers/cpp" element={<CppCompiler />} />
          </Routes>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default App;
