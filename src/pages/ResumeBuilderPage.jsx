import React, { useState } from "react";
import {
  FaDownload,
  FaEye,
  FaEdit,
  FaPlus,
  FaStar,
  FaUsers,
  FaFileAlt,
} from "react-icons/fa";

const ResumeBuilderPage = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Templates", count: 25 },
    { id: "modern", name: "Modern", count: 8 },
    { id: "classic", name: "Classic", count: 6 },
    { id: "creative", name: "Creative", count: 5 },
    { id: "minimal", name: "Minimal", count: 6 },
  ];

  const templates = [
    {
      id: 1,
      name: "Professional Modern",
      category: "modern",
      image: "/assets/images/resume-templates/modern-1.jpg",
      rating: 4.8,
      downloads: 1250,
      isPopular: true,
      isFree: true,
      description:
        "Clean and professional design perfect for corporate environments",
      features: ["ATS Friendly", "Customizable", "Print Ready"],
    },
    {
      id: 2,
      name: "Creative Developer",
      category: "creative",
      image: "/assets/images/resume-templates/creative-1.jpg",
      rating: 4.9,
      downloads: 890,
      isPopular: false,
      isFree: false,
      price: "$9.99",
      description:
        "Stand out with this creative design perfect for developers and designers",
      features: ["Color Options", "Portfolio Section", "Skills Chart"],
    },
    {
      id: 3,
      name: "Classic Executive",
      category: "classic",
      image: "/assets/images/resume-templates/classic-1.jpg",
      rating: 4.7,
      downloads: 2100,
      isPopular: true,
      isFree: true,
      description:
        "Timeless design that works for any industry and experience level",
      features: ["ATS Friendly", "Multiple Layouts", "Professional"],
    },
    {
      id: 4,
      name: "Minimal Clean",
      category: "minimal",
      image: "/assets/images/resume-templates/minimal-1.jpg",
      rating: 4.6,
      downloads: 750,
      isPopular: false,
      isFree: true,
      description: "Simple and clean design that focuses on content over style",
      features: ["Clean Design", "Easy to Read", "Fast Loading"],
    },
    {
      id: 5,
      name: "Tech Professional",
      category: "modern",
      image: "/assets/images/resume-templates/modern-2.jpg",
      rating: 4.8,
      downloads: 1100,
      isPopular: false,
      isFree: false,
      price: "$7.99",
      description:
        "Designed specifically for technology professionals and developers",
      features: ["Skills Section", "Project Showcase", "GitHub Integration"],
    },
    {
      id: 6,
      name: "Creative Portfolio",
      category: "creative",
      image: "/assets/images/resume-templates/creative-2.jpg",
      rating: 4.9,
      downloads: 650,
      isPopular: false,
      isFree: false,
      price: "$12.99",
      description:
        "Perfect for creatives who want to showcase their work and personality",
      features: ["Portfolio Gallery", "Custom Colors", "Animation Ready"],
    },
  ];

  const filteredTemplates = templates.filter(
    (template) =>
      selectedCategory === "all" || template.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Resume Builder
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Create professional resumes with our easy-to-use builder and
            beautiful templates
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                <FaFileAlt className="text-teal-600 dark:text-teal-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Templates
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  25
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <FaDownload className="text-green-600 dark:text-green-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Downloads
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  6.7K
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <FaStar className="text-yellow-600 dark:text-yellow-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Avg Rating
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  4.8
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md">
            <div className="flex items-center">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <FaUsers className="text-blue-600 dark:text-blue-400 text-xl" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Users
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  1.2K
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  selectedCategory === category.id
                    ? "bg-teal-500 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600 hover:border-teal-300 dark:hover:border-teal-600"
                }`}
              >
                {category.name} ({category.count})
              </button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template) => (
            <div
              key={template.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Template Image */}
              <div className="relative h-48 bg-gray-200 dark:bg-gray-700">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-gray-400 dark:text-gray-500 text-4xl">
                    📄
                  </div>
                </div>
                {template.isPopular && (
                  <div className="absolute top-2 left-2">
                    <span className="px-2 py-1 bg-yellow-500 text-white text-xs font-medium rounded">
                      Popular
                    </span>
                  </div>
                )}
                {template.isFree ? (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-green-500 text-white text-xs font-medium rounded">
                      Free
                    </span>
                  </div>
                ) : (
                  <div className="absolute top-2 right-2">
                    <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded">
                      {template.price}
                    </span>
                  </div>
                )}
              </div>

              {/* Template Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {template.name}
                  </h3>
                  <div className="flex items-center gap-1">
                    <FaStar className="text-yellow-500 text-sm" />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {template.rating}
                    </span>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {template.description}
                </p>

                {/* Features */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {template.features.map((feature) => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                  <div className="flex items-center gap-1">
                    <FaDownload />
                    <span>{template.downloads.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaUsers />
                    <span>{Math.floor(template.downloads / 10)} users</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white rounded-lg font-medium transition-colors">
                    <FaEye className="text-sm" />
                    Preview
                  </button>
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium transition-colors">
                    <FaEdit className="text-sm" />
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 dark:text-gray-500 text-6xl mb-4">
              📄
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No templates found
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Try selecting a different category
            </p>
          </div>
        )}

        {/* Resume Builder Tools */}
        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
            Resume Builder Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                  <FaEdit className="text-teal-600 dark:text-teal-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Easy Editor
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Drag and drop interface to easily customize your resume with
                real-time preview
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <FaDownload className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  Multiple Formats
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Export your resume in PDF, Word, or HTML formats for different
                applications
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <FaStar className="text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  ATS Optimized
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                All templates are optimized for Applicant Tracking Systems to
                ensure your resume gets noticed
              </p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Create Your Professional Resume
          </h2>
          <p className="text-xl mb-6 opacity-90">
            Start building your resume with our easy-to-use builder and
            professional templates
          </p>
          <button className="px-8 py-4 bg-white text-teal-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Start Building
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilderPage;
