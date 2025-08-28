import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import AuthModals from "./AuthModals";
import toast from "react-hot-toast";
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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const compilersRef = useRef(null);
  const interviewPrepRef = useRef(null); // NEW
  const userDropdownRef = useRef(null);
  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
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
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserDropdownOpen(false);
      }
    };
    if (isCompilersOpen || isInterviewPrepOpen || isUserDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCompilersOpen, isInterviewPrepOpen, isUserDropdownOpen]);

  const toggleNav = () => setIsOpen(!isOpen);

  const closeMenus = () => {
    setIsOpen(false);
    setIsTutorialsOpen(false);
    setIsInterviewPrepOpen(false);
    setIsUserDropdownOpen(false);
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  const navLinks = [
    // { name: "Home", path: "/" }, // Removed Home
    { name: "Course", path: "/course" },
    { name: "About", path: "/about" },
    { name: "Support", path: "/support" },
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
              src="/assets/images/Logo.svg"
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
              Product <ChevronDown size={16} />
            </button>
            {isInterviewPrepOpen && (
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-[800px] bg-white dark:bg-gray-700 rounded-md shadow-lg py-6 z-20">
                <div className="grid grid-cols-3 gap-6 px-6">
                  <Link
                    to="/quiz"
                    className="px-4 py-3 text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded flex flex-col items-center gap-2"
                    onClick={closeMenus}
                  >
                    <FaQuestionCircle className="w-6 h-6 text-teal-600 dark:text-teal-400" />
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
                    <FaClipboardList className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    <span className="text-[16px] font-semibold">
                      Interview Questions
                    </span>
                    <span className="text-xs text-gray-700 dark:text-gray-400">
                      Practice common Q&A
                    </span>
                  </Link>
                  <Link
                    to="/whiteboard"
                    className="px-4 py-3 text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded flex flex-col items-center gap-2"
                    onClick={closeMenus}
                  >
                    <FaChalkboardTeacher className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    <span className="text-[16px] font-semibold">
                      Whiteboard
                    </span>
                    <span className="text-xs text-gray-700 dark:text-gray-400">
                      Draw & explain concepts
                    </span>
                  </Link>
                  <Link
                    to="/mock-interviews"
                    className="px-4 py-3 text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded flex flex-col items-center gap-2"
                    onClick={closeMenus}
                  >
                    <FaUser className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    <span className="text-[16px] font-semibold">
                      Mock Interviews
                    </span>
                    <span className="text-xs text-gray-700 dark:text-gray-400">
                      Simulate real interviews
                    </span>
                  </Link>
                  <Link
                    to="/coding-interviews"
                    className="px-4 py-3 text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded flex flex-col items-center gap-2"
                    onClick={closeMenus}
                  >
                    <FaCode className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    <span className="text-[16px] font-semibold">
                      Coding Practice
                    </span>
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
                    <FaBlog className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    <span className="text-[16px] font-semibold">Blog</span>
                    <span className="text-xs text-gray-700 dark:text-gray-400">
                      Read latest insights
                    </span>
                  </a>
                  <Link
                    to="/projects"
                    className="px-4 py-3 text-center text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 rounded flex flex-col items-center gap-2"
                    onClick={closeMenus}
                  >
                    <FaFileAlt className="w-6 h-6 text-teal-600 dark:text-teal-400" />
                    <span className="text-[16px] font-semibold">Projects</span>
                    <span className="text-xs text-gray-700 dark:text-gray-400">
                      Build real applications
                    </span>
                  </Link>
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

        {/* Right Section: Auth + Theme Toggle */}
        <div className="flex items-center gap-4 flex-shrink-0">
          {/* Authentication Section */}
          {user ? (
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="hidden md:flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <div className="w-8 h-8 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                  <FaUser className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                </div>
                <span>{user.fullName}</span>
                <ChevronDown
                  size={16}
                  className={`transition-transform ${
                    isUserDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {isUserDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-md shadow-lg py-2 z-20 border border-gray-200 dark:border-gray-600">
                  <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      {user.fullName}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                    onClick={() => setIsUserDropdownOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsUserDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => handleAuthClick("login")}
              className="hidden md:block px-4 py-2 text-sm font-medium bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors"
            >
              Get Started
            </button>
          )}

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
            {/* Always show main navigation links */}
            {navLinks.map((item) =>
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
            )}

            {/* Projects Link */}
            <Link
              to="/projects"
              onClick={closeMenus}
              className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400"
            >
              Projects
            </Link>

            {/* Tutorials Section (if available) */}
            {tutorials && tutorials.length > 0 && (
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
            )}

            {/* Compilers Section for Mobile */}
            <div className="text-gray-700 dark:text-gray-200">
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

            {/* Authentication Section for Mobile */}
            <div className="text-gray-700 dark:text-gray-200">
              <p className="font-bold mb-2">Account</p>
              <div className="flex flex-col gap-2 pl-4">
                {user ? (
                  <>
                    <div className="flex items-center gap-2 py-1">
                      <div className="w-6 h-6 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                        <FaUser className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                      </div>
                      <span className="text-sm text-gray-700 dark:text-gray-200">
                        {user.fullName}
                      </span>
                    </div>
                    <Link
                      to="/profile"
                      onClick={closeMenus}
                      className="py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 text-left flex items-center gap-2"
                    >
                      <span className="w-4"></span>
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 text-left flex items-center gap-2"
                    >
                      <span className="w-4"></span>
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleAuthClick("login")}
                      className="py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 text-left"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => handleAuthClick("register")}
                      className="py-1 text-sm text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 text-left"
                    >
                      Create Account
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Interview Preparation Section for Mobile */}
            <div className="text-gray-700 dark:text-gray-200">
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
          </nav>
        </div>
      )}

      {/* Authentication Modals */}
      <AuthModals
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        initialMode={authMode}
      />
    </header>
  );
};

export default Navbar;
