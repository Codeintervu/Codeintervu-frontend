import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../utils/api";
import {
  FiChevronDown,
  FiChevronUp,
  FiCode,
  FiShield,
  FiSettings,
  FiServer,
  FiUsers,
  FiCheck,
} from "react-icons/fi";

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [expandedProject, setExpandedProject] = useState(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get("/projects");
      setProjects(response.data.data || []);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    } finally {
      setLoading(false);
    }
  };

  // Generate filter options dynamically from projects
  const filterOptions = [
    { label: "All", value: "all" },
    ...projects.map((project) => ({
      label: project.key, // Use project key instead of name for filter
      value: project.key,
    })),
  ];

  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.key === filter);

  const toggleProjectDetails = (projectId) => {
    setExpandedProject(expandedProject === projectId ? null : projectId);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 min-h-screen">
        <h1 className="text-3xl font-bold mb-8 text-center text-teal-600 dark:text-teal-400">
          Projects
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-pulse"
            >
              <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
              <div className="p-6">
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4"></div>
                <div className="flex gap-2">
                  <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
                  <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded flex-1"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-teal-600 dark:text-teal-400">
        Projects
      </h1>
      {/* Filter Bar */}
      {projects.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filterOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => setFilter(option.value)}
              className={`px-4 py-2 rounded-md font-semibold border transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-teal-400
                ${
                  filter === option.value
                    ? "bg-teal-600 text-white border-teal-600"
                    : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border-gray-300 dark:border-gray-600 hover:bg-teal-100 dark:hover:bg-teal-800"
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
        {filteredProjects.map((project, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={project.image}
              alt={project.name}
              className="h-48 w-full object-contain bg-gray-100 dark:bg-gray-700"
              loading="lazy"
            />
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
                {project.name}
              </h2>
              <div className="mb-4">
                <span className="text-gray-400 line-through mr-2">
                  ₹{project.realPrice}
                </span>
                <span className="text-green-600 font-bold text-lg">
                  ₹{project.offerPrice}
                </span>
              </div>

              {/* Project Key Badge */}
              <div className="mb-3">
                <span className="inline-block px-3 py-1 bg-teal-100 dark:bg-teal-800 text-teal-800 dark:text-teal-200 text-sm font-medium rounded-full">
                  {project.key}
                </span>
              </div>

              {/* View Details Dropdown Button */}
              <button
                onClick={() => toggleProjectDetails(project._id)}
                className="flex items-center justify-center gap-2 w-full mb-3 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded font-medium transition-colors"
              >
                <span>View Details</span>
                {expandedProject === project._id ? (
                  <FiChevronUp className="w-4 h-4" />
                ) : (
                  <FiChevronDown className="w-4 h-4" />
                )}
              </button>

              {/* Project Details Dropdown */}
              {expandedProject === project._id && (
                <div className="mb-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
                      Project Description
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex gap-2 mt-auto">
                {project.topmateLink ? (
                  <a
                    href={project.topmateLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition-colors flex-1 text-center"
                  >
                    Buy Now
                  </a>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 text-white px-4 py-2 rounded font-semibold flex-1 cursor-not-allowed"
                  >
                    Coming Soon
                  </button>
                )}
                <Link
                  to={`/projects/${project.key}`}
                  className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 px-4 py-2 rounded font-semibold transition-colors flex-1 text-center"
                >
                  View More
                </Link>
              </div>
            </div>
          </div>
        ))}
        {projects.length === 0 && !loading && (
          <div className="text-center  py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-16 h-16 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No projects available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Check back soon for new projects!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
