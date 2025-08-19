import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import api from "../utils/api";
import { formatCategoryPath } from "../utils/pathUtils";
import {
  FaQuestionCircle,
  FaClipboardList,
  FaChalkboardTeacher,
  FaSearch,
  FaCode,
  FaFileAlt,
  FaBlog,
  FaUser,
} from "react-icons/fa";

const Navbar = ({ tutorials }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTutorialsOpen, setIsTutorialsOpen] = useState(false);
  const [isCompilersOpen, setIsCompilersOpen] = useState(false);
  const [isInterviewPrepOpen, setIsInterviewPrepOpen] = useState(false); // NEW
  const compilersRef = useRef(null);
  const interviewPrepRef = useRef(null); // NEW
  const { isDarkMode, toggleTheme } = useTheme();
  const [categories, setCategories] = useState([]);
  const closeTimeout = React.useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/categories");
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        compilersRef.current &&
        !compilersRef.current.contains(event.target)
      ) {
        setIsCompilersOpen(false);
      }
      if (
        interviewPrepRef.current &&
        !interviewPrepRef.current.contains(event.target)
      ) {
        setIsInterviewPrepOpen(false);
      }
    };
    if (isCompilersOpen || isInterviewPrepOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCompilersOpen, isInterviewPrepOpen]);

  const toggleNav = () => setIsOpen(!isOpen);

  const closeMenus = () => {
    setIsOpen(false);
    setIsTutorialsOpen(false);
    setIsInterviewPrepOpen(false);
  };

  const navLinks = [
    // { name: "Home", path: "/" }, // Removed Home
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-50 transition-colors duration-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left Section: Hamburger + Logo */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            className="md:hidden mr-2 p-2 text-gray-700 dark:text-gray-200"
            onClick={toggleNav}
            aria-label="Open sidebar"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl md:text-3xl font-bold flex-shrink-0"
            onClick={closeMenus}
          >
            <img
              src="/assets/images/logo.png"
              alt="CodeIntervu Logo"
              className="h-8 w-8 md:h-10 md:w-10 object-contain"
              style={{ borderRadius: "50%" }}
              loading="lazy"
            />
            <span className="whitespace-nowrap">
              <span className="text-teal-600 dark:text-teal-400">CODE</span>
              <span className="text-gray-900 dark:text-white">INTERVU</span>
            </span>
          </Link>
        </div>

        {/* Center Section: Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 flex-1 justify-center">
          {/* Interview Preparation Dropdown */}
          <div className="relative" ref={interviewPrepRef}>
            <button
              className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap"
              aria-label="Open interview preparation dropdown"
              onClick={() => setIsInterviewPrepOpen((open) => !open)}
              type="button"
            >
              Interview Preparation <ChevronDown size={16} />
            </button>
            {isInterviewPrepOpen && (
              <div className="absolute top-full left-0 mt-2 w-[800px] bg-white dark:bg-gray-700 rounded-md shadow-lg py-6 z-20">
                <div className="grid grid-cols-3 gap-4 px-6">
                  <Link
                    to="/quiz"
                    className="px-4 py-3 text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded flex flex-col items-center gap-2"
                    onClick={closeMenus}
                  >
                    <FaQuestionCircle className="w-6 h-6" />
                    <span className="text-[16px] font-semibold">Quiz</span>
                    <span className="text-xs text-gray-700 dark:text-gray-400">
                      Test your knowledge
                    </span>
                  </Link>
                  <Link
                    to="/interview-questions"
                    className="px-4 py-3 text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded flex flex-col items-center gap-2"
                    onClick={closeMenus}
                  >
                    <FaClipboardList className="w-6 h-6" />
                    <span className="text-[16px] font-semibold">Interview Questions</span>
                    <span className="text-xs text-gray-700 dark:text-gray-400">
                      Practice common Q&A
                    </span>
                  </Link>
                  <Link
                    to="/whiteboard"
                    className="px-4 py-3 text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded flex flex-col items-center gap-2"
                    onClick={closeMenus}
                  >
                    <FaChalkboardTeacher className="w-6 h-6" />
                    <span className="text-[16px] font-semibold">Whiteboard</span>
                    <span className="text-xs text-gray-700 dark:text-gray-400">
                      Draw & explain concepts
                    </span>
                  </Link>
                  <Link
                    to="/mock-interviews"
                    className="px-4 py-3 text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded flex flex-col items-center gap-2"
                    onClick={closeMenus}
                  >
                    <FaUser className="w-6 h-6" />
                    <span className="text-[16px] font-semibold">Mock Interviews</span>
                    <span className="text-xs text-gray-700 dark:text-gray-400">
                      Simulate real interviews
                    </span>
                  </Link>
                  <Link
                    to="/coding-interviews"
                    className="px-4 py-3 text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded flex flex-col items-center gap-2"
                    onClick={closeMenus}
                  >
                    <FaCode className="w-6 h-6" />
                    <span className="text-[16px] font-semibold">Coding Practice</span>
                    <span className="text-xs text-gray-700 dark:text-gray-400">
                      Live coding sessions
                    </span>
                  </Link>
                  <a
                    href="http://javabytrilochan.blogspot.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-3 text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded flex flex-col items-center gap-2"
                    onClick={closeMenus}
                  >
                    <FaBlog className="w-6 h-6" />
                    <span className="text-[16px] font-semibold">Blog</span>
                    <span className="text-xs text-gray-700 dark:text-gray-400">
                      Read latest insights
                    </span>
                  </a>
                </div>
              </div>
            )}
          </div>
          {/* About and Contact Links */}
          {navLinks.map((item) =>
            item.external ? (
              <a
                key={item.name}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap"
              >
                {item.name}
              </Link>
            )
          )}
          {/* Projects Link */}
          <Link
            to="/projects"
            className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap"
          >
            Projects
          </Link>
          {/* Compilers Dropdown */}
          <div className="relative" ref={compilersRef}>
            <button
              className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors whitespace-nowrap"
              aria-label="Open compilers dropdown"
              onClick={() => setIsCompilersOpen((open) => !open)}
              type="button"
            >
              Compilers <ChevronDown size={16} />
            </button>
            {isCompilersOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-700 rounded-md shadow-lg py-2 z-20">
                <Link
                  to="/compilers/java-compiler"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={closeMenus}
                >
                  Java Compiler
                </Link>
                <Link
                  to="/compilers/python-compiler"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={closeMenus}
                >
                  Python Compiler
                </Link>
                <Link
                  to="/compilers/javascript-compiler"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={closeMenus}
                >
                  JavaScript Compiler
                </Link>
                <Link
                  to="/compilers/c-compiler"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={closeMenus}
                >
                  C Compiler
                </Link>
                <Link
                  to="/compilers/cpp-compiler"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                  onClick={closeMenus}
                >
                  C++ Compiler
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* Right Section: Theme Toggle + Mobile Theme Toggle */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Mobile Theme Toggle */}
          <button
            className="md:hidden p-2 text-gray-700 dark:text-gray-200"
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
          {/* Desktop Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="hidden md:block p-2 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
            aria-label="Toggle theme"
          >
            {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 border-t dark:border-gray-700 shadow-lg px-4 py-4">
          <nav className="flex flex-col gap-4">
            {tutorials && tutorials.length > 0 ? (
              <>
                <div className="text-gray-700 dark:text-gray-200">
                  <p className="font-bold mb-2">Tutorials</p>
                  <div className="flex flex-col gap-2 pl-4">
                    {tutorials.map((tutorial) => (
                      <Link
                        key={tutorial._id}
                        to={`#${tutorial._id}`}
                        className="block py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
                        onClick={closeMenus}
                      >
                        {tutorial.title}
                      </Link>
                    ))}
                  </div>
                </div>
                {/* Compilers Dropdown for Mobile */}
                <div className="text-gray-700 dark:text-gray-200 mt-4">
                  <p className="font-bold mb-2">Compilers</p>
                  <div className="flex flex-col gap-2 pl-4">
                    <Link
                      to="/compilers/java-compiler"
                      className="block py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
                      onClick={closeMenus}
                    >
                      Java Compiler
                    </Link>
                    <Link
                      to="/compilers/python-compiler"
                      className="block py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
                      onClick={closeMenus}
                    >
                      Python Compiler
                    </Link>
                    <Link
                      to="/compilers/javascript-compiler"
                      className="block py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
                      onClick={closeMenus}
                    >
                      JavaScript Compiler
                    </Link>
                    <Link
                      to="/compilers/c-compiler"
                      className="block py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
                      onClick={closeMenus}
                    >
                      C Compiler
                    </Link>
                    <Link
                      to="/compilers/cpp-compiler"
                      className="block py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
                      onClick={closeMenus}
                    >
                      C++ Compiler
                    </Link>
                  </div>
                </div>
                {/* Interview Preparation Dropdown for Mobile */}
                <div className="text-gray-700 dark:text-gray-200 mt-4">
                  <p className="font-bold mb-2">Interview Preparation</p>
                  <div className="flex flex-col gap-2 pl-4">
                    <Link
                      to="/quiz"
                      className="py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-2"
                      onClick={closeMenus}
                    >
                      <FaQuestionCircle className="w-4 h-4" />
                      Quiz
                    </Link>
                    <Link
                      to="/interview-questions"
                      className="py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-2"
                      onClick={closeMenus}
                    >
                      <FaClipboardList className="w-4 h-4" />
                      Interview Questions
                    </Link>
                    <Link
                      to="/whiteboard"
                      className="py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-2"
                      onClick={closeMenus}
                    >
                      <FaChalkboardTeacher className="w-4 h-4" />
                      Whiteboard
                    </Link>
                    <Link
                      to="/mock-interviews"
                      className="py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-2"
                      onClick={closeMenus}
                    >
                      <FaUser className="w-4 h-4" />
                      Mock Interviews
                    </Link>
                    <Link
                      to="/coding-interviews"
                      className="py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-2"
                      onClick={closeMenus}
                    >
                      <FaCode className="w-4 h-4" />
                      Coding Interviews
                    </Link>

                    <a
                      href="http://javabytrilochan.blogspot.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-2"
                      onClick={closeMenus}
                    >
                      <FaBlog className="w-4 h-4" />
                      Blog
                    </a>
                  </div>
                </div>
              </>
            ) : (
              // Fallback: show nav links if not on a tutorial/category page
              navLinks.map((item) =>
                item.external ? (
                  <a
                    key={item.name}
                    href={item.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
                  >
                    {item.name}
                  </a>
                ) : (
                  <Link
                    key={item.name}
                    to={item.path}
                    onClick={closeMenus}
                    className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
                  >
                    {item.name}
                  </Link>
                )
              )
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
