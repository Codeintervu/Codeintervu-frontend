import React, { useState } from "react";
import { Link } from "react-router-dom";

const projects = [
  {
    name: "Java Spring Boot",
    image: "/assets/images/course-1.jpg",
    realPrice: 1999,
    offerPrice: 999,
    description: "A complete Java Spring Boot project for beginners.",
    key: "springboot",
  },
  {
    name: "Machine Learning",
    image: "/assets/images/blog-1.jpg",
    realPrice: 2499,
    offerPrice: 1299,
    description: "End-to-end machine learning project with code and docs.",
    key: "ml",
  },
  {
    name: "Deep Learning",
    image: "/assets/images/blog-2.jpg",
    realPrice: 2999,
    offerPrice: 1499,
    description: "Deep learning project with neural networks and datasets.",
    key: "dl",
  },
  {
    name: "Gen AI",
    image: "/assets/images/blog-3.jpg",
    realPrice: 3499,
    offerPrice: 1799,
    description: "Generative AI project with modern AI techniques.",
    key: "genai",
  },
  {
    name: "MERN Stack",
    image: "/assets/images/course-1.jpg",
    realPrice: 2799,
    offerPrice: 1399,
    description: "Full-stack MERN project with frontend and backend.",
    key: "mern",
  },
];

const filterOptions = [
  { label: "All", value: "all" },
  { label: "Java Spring Boot", value: "springboot" },
  { label: "Machine Learning", value: "ml" },
  { label: "Deep Learning", value: "dl" },
  { label: "Gen AI", value: "genai" },
  { label: "MERN", value: "mern" },
];

const ProjectsPage = () => {
  const [filter, setFilter] = useState("all");
  const filteredProjects =
    filter === "all"
      ? projects
      : projects.filter((project) => project.key === filter);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-teal-600 dark:text-teal-400">
        Projects
      </h1>
      {/* Filter Bar */}
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 justify-center">
        {filteredProjects.map((project, idx) => (
          <div
            key={idx}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden flex flex-col"
          >
            <img
              src={project.image}
              alt={project.name}
              className="h-48 w-full object-cover"
              loading="lazy"
            />
            <div className="p-6 flex flex-col flex-1">
              <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                {project.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm flex-1">
                {project.description}
              </p>
              <div className="mb-4">
                <span className="text-gray-400 line-through mr-2">
                  ₹{project.realPrice}
                </span>
                <span className="text-green-600 font-bold text-lg">
                  ₹{project.offerPrice}
                </span>
              </div>
              <div className="flex gap-2 mt-auto">
                <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-semibold transition-colors flex-1">
                  Buy Now
                </button>
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
      </div>
    </div>
  );
};

export default ProjectsPage;
