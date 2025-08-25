import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronRight, FaHome } from "react-icons/fa";

const Breadcrumb = ({ items = [] }) => {
  const location = useLocation();

  // Generate breadcrumb items based on current path if no items provided
  const generateBreadcrumbs = () => {
    if (items.length > 0) return items;

    const pathSegments = location.pathname
      .split("/")
      .filter((segment) => segment);
    const breadcrumbs = [
      { name: "Home", path: "/", icon: <FaHome className="w-4 h-4" /> },
    ];

    let currentPath = "";
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;

      // Custom name mapping for specific routes
      let name;
      if (segment === "contact") {
        name = "Support";
      } else if (segment === "support") {
        name = "Support";
      } else {
        name = segment
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ");
      }

      breadcrumbs.push({
        name,
        path: currentPath,
        isLast: index === pathSegments.length - 1,
      });
    });

    return breadcrumbs;
  };

  const breadcrumbItems = generateBreadcrumbs();

  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-3 pt-8 sm:pt-12 px-4">
      <div className="container mx-auto">
        <ol className="flex items-center space-x-2 text-sm">
          {breadcrumbItems.map((item, index) => (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <FaChevronRight className="w-3 h-3 text-gray-400 mx-2" />
              )}
              {item.isLast ? (
                <span className="text-gray-900 dark:text-white font-medium">
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.name}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="text-gray-600 dark:text-gray-400 hover:text-green-700 dark:hover:text-green-400 transition-colors duration-200 flex items-center"
                >
                  {item.icon && <span className="mr-1">{item.icon}</span>}
                  {item.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumb;
