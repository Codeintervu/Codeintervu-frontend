import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon, ChevronDown } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import api from "../utils/api";
import { formatCategoryPath } from "../utils/pathUtils";

const Navbar = ({ tutorials }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTutorialsOpen, setIsTutorialsOpen] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const [categories, setCategories] = useState([]);
  const closeTimeout = React.useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data } = await api.get("/api/categories");
        setCategories(data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const toggleNav = () => setIsOpen(!isOpen);

  const closeMenus = () => {
    setIsOpen(false);
    setIsTutorialsOpen(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    // { name: "Courses", path: "/courses" }, // Commented out
    {
      name: "Blog",
      path: "http://javabytrilochan.blogspot.com",
      external: true,
    },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full bg-white dark:bg-gray-800 shadow-md z-50 transition-colors duration-200">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Hamburger for mobile, left of logo */}
        <div className="flex items-center gap-2">
          <button
            className="md:hidden mr-2 p-2 text-gray-700 dark:text-gray-200"
            onClick={toggleNav}
            aria-label="Open sidebar"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          <Link
            to="/"
            className="flex items-center gap-2 text-3xl font-bold"
            onClick={closeMenus}
          >
            <img
              src="/assets/images/logo.png"
              alt="CodeIntervu Logo"
              className="h-8 w-8 md:h-10 md:w-10 object-contain"
              style={{ borderRadius: "50%" }}
              loading="lazy"
            />
            <span>
              <span className="text-teal-600 dark:text-teal-400">CODE</span>
              <span className="text-gray-900 dark:text-white">INTERVU</span>
            </span>
            {/* Mobile Theme Toggle (right of logo) */}
            <button
              className="md:hidden ml-2 p-2 text-gray-700 dark:text-gray-200"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((item) =>
            item.external ? (
              <a
                key={item.name}
                href={item.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                {item.name}
              </a>
            ) : (
              <Link
                key={item.name}
                to={item.path}
                className="text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              >
                {item.name}
              </Link>
            )
          )}
          {/* Tutorial Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => {
              if (closeTimeout.current) clearTimeout(closeTimeout.current);
              setIsTutorialsOpen(true);
            }}
            onMouseLeave={() => {
              closeTimeout.current = setTimeout(
                () => setIsTutorialsOpen(false),
                180
              );
            }}
          >
            <button
              className="flex items-center gap-1 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
              aria-label="Open tutorials dropdown"
            >
              Tutorial <ChevronDown size={16} />
            </button>
            {isTutorialsOpen && (
              <div
                className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-700 rounded-md shadow-lg py-2 z-20"
                onMouseEnter={() => {
                  if (closeTimeout.current) clearTimeout(closeTimeout.current);
                  setIsTutorialsOpen(true);
                }}
                onMouseLeave={() => {
                  closeTimeout.current = setTimeout(
                    () => setIsTutorialsOpen(false),
                    180
                  );
                }}
              >
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <Link
                      key={category._id}
                      to={formatCategoryPath(category.path)}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={closeMenus}
                    >
                      {category.name}
                    </Link>
                  ))
                ) : (
                  <p className="px-4 py-2 text-sm text-gray-500">Loading...</p>
                )}
              </div>
            )}
          </div>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="p-2 text-gray-700 dark:text-gray-200 hover:text-teal-600 dark:hover:text-teal-400 transition-colors"
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
