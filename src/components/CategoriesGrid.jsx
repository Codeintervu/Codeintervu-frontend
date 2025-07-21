import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import { formatCategoryPath } from "../utils/pathUtils";
import { FaProjectDiagram } from "react-icons/fa";

// Import from react-icons/si (only available icons that have been confirmed to work)
import {
  SiPython,
  SiJavascript,
  SiTypescript,
  SiCplusplus,
  SiGo,
  SiKotlin,
  SiSwift,
  SiRust,
  SiRuby,
  SiR,
  SiHtml5,
  SiCss3,
  SiMysql,
  SiNumpy,
  SiSpring,
  SiSpringboot,
  SiTensorflow,
  SiPytorch,
  // Removed: SiPowerbi, // This icon is not exported by react-icons/si
} from "react-icons/si";

// Import specific language logos as URLs from programming-languages-logos
import CSharpLogoSrc from "programming-languages-logos/src/csharp/csharp.svg";
import CLogoSrc from "programming-languages-logos/src/c/c.svg";
import JavaLogoSrc from "programming-languages-logos/src/java/java.svg";

// Custom Pandas Logo Component
const PandasLogo = ({ className = "w-8 h-8", fillColor = "currentColor" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill={fillColor} // Use fillColor prop here
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left tall bar */}
    <rect x="2" y="2" width="3" height="20" /> {/* Removed hardcoded fill */}
    {/* Second bar with yellow square */}
    <rect x="7" y="8" width="3" height="8" /> {/* Removed hardcoded fill */}
    <rect x="7.5" y="8.5" width="2" height="2" fill="#fbbf24" />{" "}
    {/* Keep specific color for accent */}
    {/* Third bar with magenta square */}
    <rect x="12" y="8" width="3" height="8" /> {/* Removed hardcoded fill */}
    <rect x="12.5" y="13.5" width="2" height="2" fill="#ec4899" />{" "}
    {/* Keep specific color for accent */}
    {/* Right tall bar */}
    <rect x="17" y="2" width="3" height="20" /> {/* Removed hardcoded fill */}
  </svg>
);

// Custom Microsoft Logo Component
const MicrosoftLogo = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Microsoft Windows-style logo - 4 squares in a 2x2 grid with classic colors */}
    <rect x="2" y="2" width="8" height="8" fill="#f25022" /> {/* Red */}
    <rect x="12" y="2" width="8" height="8" fill="#7fba00" /> {/* Green */}
    <rect x="2" y="12" width="8" height="8" fill="#00a4ef" /> {/* Blue */}
    <rect x="12" y="12" width="8" height="8" fill="#ffb900" />{" "}
    {/* Orange-Yellow */}
  </svg>
);

// Custom DataScience Logo Component
const DataScienceLogo = ({ className = "w-8 h-8" }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Monitor outline */}
    <rect
      x="3"
      y="4"
      width="18"
      height="12"
      rx="1"
      stroke="currentColor"
      strokeWidth="1"
      fill="none"
    />

    {/* Monitor stand */}
    <rect x="10" y="16" width="4" height="2" fill="currentColor" />
    <rect x="9" y="18" width="6" height="1" fill="currentColor" />

    {/* Bar chart (lower half) */}
    <rect x="6" y="14" width="1" height="2" fill="currentColor" />
    <rect x="8" y="15" width="1" height="1" fill="currentColor" />
    <rect x="10" y="13" width="1" height="3" fill="currentColor" />
    <rect x="12" y="14" width="1" height="2" fill="currentColor" />

    {/* Line graph (upper half) */}
    <circle cx="6" cy="10" r="0.5" fill="currentColor" />
    <circle cx="9" cy="8" r="0.5" fill="currentColor" />
    <circle cx="12" cy="11" r="0.5" fill="currentColor" />
    <circle cx="15" cy="9" r="0.5" fill="currentColor" />
    <circle cx="18" cy="12" r="0.5" fill="currentColor" />

    {/* Line connecting the points */}
    <path
      d="M6 10 L9 8 L12 11 L15 9 L18 12"
      stroke="currentColor"
      strokeWidth="0.5"
      fill="none"
    />
  </svg>
);

const CategoriesGrid = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const { data } = await api.get("/categories");
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Icon mapping for categories
  const getCategoryIcon = (categoryName, classes = "w-8 h-8") => {
    const iconMap = {
      // Direct language logos from programming-languages-logos rendered as <img>
      "Core Java": (
        <img src={JavaLogoSrc} alt="Java Logo" className={classes} />
      ),
      "CORE JAVA": (
        <img src={JavaLogoSrc} alt="Java Logo" className={classes} />
      ), // Uppercase version
      "C#": <img src={CSharpLogoSrc} alt="C# Logo" className={classes} />,
      C: <img src={CLogoSrc} alt="C Logo" className={classes} />,
      DSA: <FaProjectDiagram className={classes} />,

      // Other icons from react-icons/si
      "Spring Core": <SiSpring className={classes} />,
      "SPRING CORE": <SiSpring className={classes} />, // Uppercase version
      "Spring Boot": <SiSpringboot className={classes} />,
      "SPRING BOOT": <SiSpringboot className={classes} />, // Uppercase version
      Python: <SiPython className={classes} />,
      PYTHON: <SiPython className={classes} />, // Uppercase version

      NumPy: <SiNumpy className={classes} />,
      NUMPY: <SiNumpy className={classes} />, // Uppercase version
      Pandas: <PandasLogo className={classes} />, // Pass fillColor implicitly via currentColor
      PANDAS: <PandasLogo className={classes} />, // Uppercase version
      MachineLearning: <SiTensorflow className={classes} />,
      "MACHINE LEARNING": <SiTensorflow className={classes} />, // Uppercase version
      "Deep Learning": <SiPytorch className={classes} />,
      "DEEP LEARNING": <SiPytorch className={classes} />, // Uppercase version
      GenAI: <SiTensorflow className={classes} />, // Using TensorFlow for GenAI
      GENAI: <SiTensorflow className={classes} />, // Uppercase version
      Datascience: <DataScienceLogo className={classes} />,
      DATASCIENCE: <DataScienceLogo className={classes} />, // Uppercase version
      Sql: <SiMysql className={classes} />,
      SQL: <SiMysql className={classes} />, // Uppercase version
      // Reverted "Power Bi" to use a fallback icon like SiPython, as SiPowerbi is not available
      "Power Bi": <MicrosoftLogo className={classes} />, // Fallback icon
      "POWER BI": <MicrosoftLogo className={classes} />, // Uppercase version
      HTML: <SiHtml5 className={classes} />,
      CSS: <SiCss3 className={classes} />,
      JavaScript: <SiJavascript className={classes} />,
      JAVASCRIPT: <SiJavascript className={classes} />, // Uppercase version
      TypeScript: <SiTypescript className={classes} />,
      TYPESCRIPT: <SiTypescript className={classes} />, // Uppercase version
      "C++": <SiCplusplus className={classes} />,
      Go: <SiGo className={classes} />,
      GO: <SiGo className={classes} />, // Uppercase version
      Kotlin: <SiKotlin className={classes} />,
      KOTLIN: <SiKotlin className={classes} />, // Uppercase version
      Swift: <SiSwift className={classes} />,
      SWIFT: <SiSwift className={classes} />, // Uppercase version
      Rust: <SiRust className={classes} />,
      RUST: <SiRust className={classes} />, // Uppercase version
      Ruby: <SiRuby className={classes} />,
      RUBY: <SiRuby className={classes} />, // Uppercase version
      R: <SiR className={classes} />,
    };
    // Default icon if no specific mapping is found
    return iconMap[categoryName] || <SiPython className={classes} />;
  };

  // Color mapping for categories (remains the same)
  const getCategoryColor = (categoryName) => {
    const colorMap = {
      "Core Java": "bg-slate-200",
      "CORE JAVA": "bg-slate-200", // Uppercase version
      DSA: "bg-green-600",
      "Spring Core": "bg-green-500",
      "SPRING CORE": "bg-green-500", // Uppercase version
      "Spring Boot": "bg-green-600",
      "SPRING BOOT": "bg-green-600", // Uppercase version
      Python: "bg-blue-500",
      PYTHON: "bg-blue-500", // Uppercase version
      NumPy: "bg-blue-500",
      NUMPY: "bg-blue-500", // Uppercase version
      Pandas: "bg-blue-600",
      PANDAS: "bg-blue-600", // Uppercase version
      MachineLearning: "bg-purple-600",
      "MACHINE LEARNING": "bg-purple-600", // Uppercase version
      "Deep Learning": "bg-purple-700",
      "DEEP LEARNING": "bg-purple-700", // Uppercase version
      GenAI: "bg-pink-500",
      GENAI: "bg-pink-500", // Uppercase version
      Datascience: "bg-blue-600",
      DATASCIENCE: "bg-blue-600", // Uppercase version
      Sql: "bg-blue-700",
      SQL: "bg-blue-700", // Uppercase version
      "Power Bi": "bg-slate-200",
      "POWER BI": "bg-slate-200", // Uppercase version
      HTML: "bg-orange-500",
      CSS: "bg-blue-400",
      JavaScript: "bg-yellow-500",
      JAVASCRIPT: "bg-yellow-500", // Uppercase version
      TypeScript: "bg-blue-600",
      TYPESCRIPT: "bg-blue-600", // Uppercase version
      C: "bg-gray-600",
      "C++": "bg-blue-800",
      "C#": "bg-purple-600",
      Go: "bg-cyan-500",
      GO: "bg-cyan-500", // Uppercase version
      Kotlin: "bg-orange-600",
      KOTLIN: "bg-orange-600", // Uppercase version
      Swift: "bg-orange-500",
      SWIFT: "bg-orange-500", // Uppercase version
      Rust: "bg-orange-700",
      RUST: "bg-orange-700", // Uppercase version
      Ruby: "bg-red-600",
      RUBY: "bg-red-600", // Uppercase version
      R: "bg-blue-700",
    };
    return colorMap[categoryName] || "bg-gray-500";
  };

  if (loading) {
    return (
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Learn programming for free
            </h1>
          </div>
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Title Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Learn programming for free
          </h1>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
          {categories.map((category) => (
            <Link
              key={category._id}
              to={formatCategoryPath(category.path)}
              className="group bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 dark:border-gray-600 overflow-hidden"
            >
              <div className="p-6 text-center">
                {/* Icon */}
                <div
                  className={`w-16 h-16 mx-auto mb-4 rounded-lg flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300 ${getCategoryColor(
                    category.name
                  )}`}
                >
                  {getCategoryIcon(category.name, "w-8 h-8")}
                </div>

                {/* Category Name */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-green-400 transition-colors duration-300">
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesGrid;
