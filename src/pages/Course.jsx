import React, { useState } from "react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  CheckCircle,
  Play,
  GraduationCap,
  Code,
  Database,
  Brain,
  Server,
  BarChart3,
  PieChart,
  Briefcase,
  FolderOpen,
} from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";

const Course = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const navigate = useNavigate();

  const courseOptions = [
    {
      value: "java-programming",
      label: "Core Java + DSA",
      fee: 499,
      duration: "4 months",
      students: 1200,
      rating: 4.8,
      category: "programming",
      icon: <Code className="w-6 h-6" />,
      description:
        "Master Core Java fundamentals, OOP concepts, Data Structures & Algorithms, and build real-world applications",
      features: [
        "Core Java Fundamentals",
        "OOP Concepts",
        "Data Structures",
        "Algorithms",
        "Collections Framework",
        "Exception Handling",
        "File I/O",
        "Projects & Practice",
      ],
    },
    {
      value: "java-fullstack",
      label: "Java Full Stack",
      fee: 499,
      duration: "6 months",
      students: 850,
      rating: 4.9,
      category: "fullstack",
      icon: <Server className="w-6 h-6" />,
      description:
        "Complete full-stack development with Java, Spring Boot, and modern frontend",
      features: [
        "Java Core",
        "Spring Boot",
        "React.js",
        "MySQL",
        "REST APIs",
        "Deployment",
      ],
    },
    {
      value: "python-programming",
      label: "Python Programming",
      fee: 499,
      duration: "3 months",
      students: 1500,
      rating: 4.7,
      category: "programming",
      icon: <Code className="w-6 h-6" />,
      description:
        "Learn Python from basics to advanced concepts with practical projects",
      features: [
        "Python Basics",
        "Data Structures",
        "OOP in Python",
        "Modules & Packages",
        "File Handling",
        "Projects",
      ],
    },
    {
      value: "data-science",
      label: "Data Science",
      fee: 499,
      duration: "6 months",
      students: 650,
      rating: 4.9,
      category: "data",
      icon: <Database className="w-6 h-6" />,
      description:
        "Comprehensive data science course with Python, statistics, and ML",
      features: [
        "Python",
        "Statistics",
        "Pandas & NumPy",
        "Machine Learning",
        "Data Visualization",
        "Real Projects",
      ],
    },
    {
      value: "ai-machine-learning",
      label: "AI & Machine Learning",
      fee: 499,
      duration: "8 months",
      students: 420,
      rating: 4.9,
      category: "ai",
      icon: <Brain className="w-6 h-6" />,
      description:
        "Advanced AI and machine learning with deep learning frameworks",
      features: [
        "Machine Learning",
        "Deep Learning",
        "TensorFlow",
        "Neural Networks",
        "NLP",
        "Computer Vision",
      ],
    },
    {
      value: "devops",
      label: "DevOps",
      fee: 499,
      duration: "4 months",
      students: 780,
      rating: 4.8,
      category: "devops",
      icon: <Server className="w-6 h-6" />,
      description:
        "Master DevOps practices, tools, and cloud deployment strategies",
      features: [
        "Docker",
        "Kubernetes",
        "CI/CD",
        "AWS",
        "Jenkins",
        "Monitoring",
      ],
    },
    {
      value: "data-analytics",
      label: "Data Analytics",
      fee: 499,
      duration: "4 months",
      students: 920,
      rating: 4.7,
      category: "data",
      icon: <BarChart3 className="w-6 h-6" />,
      description:
        "Learn data analysis, visualization, and business intelligence tools",
      features: [
        "SQL",
        "Excel",
        "Tableau",
        "Python",
        "Statistics",
        "Business Intelligence",
      ],
    },
    {
      value: "power-bi",
      label: "Power BI",
      fee: 499,
      duration: "3 months",
      students: 1100,
      rating: 4.6,
      category: "data",
      icon: <PieChart className="w-6 h-6" />,
      description:
        "Master Power BI for data visualization and business analytics",
      features: [
        "Power BI Desktop",
        "DAX",
        "Data Modeling",
        "Visualizations",
        "Reports",
        "Dashboards",
      ],
    },
    {
      value: "internship",
      label: "Internship",
      fee: 499,
      duration: "2 months",
      students: 2000,
      rating: 4.5,
      category: "internship",
      icon: <Briefcase className="w-6 h-6" />,
      description: "Hands-on internship experience with real industry projects",
      features: [
        "Real Projects",
        "Mentorship",
        "Industry Exposure",
        "Certificate",
        "Job Assistance",
        "Portfolio",
      ],
    },
    {
      value: "project",
      label: "Project",
      fee: 499,
      duration: "1 month",
      students: 1500,
      rating: 4.6,
      category: "project",
      icon: <FolderOpen className="w-6 h-6" />,
      description:
        "Build complete projects with guidance and industry best practices",
      features: [
        "Project Planning",
        "Development",
        "Testing",
        "Deployment",
        "Documentation",
        "Support",
      ],
    },
  ];

  const categories = [
    { value: "all", label: "All Courses" },
    { value: "programming", label: "Programming" },
    { value: "fullstack", label: "Full Stack" },
    { value: "data", label: "Data Science" },
    { value: "ai", label: "AI & ML" },
    { value: "devops", label: "DevOps" },
    { value: "internship", label: "Internship" },
    { value: "project", label: "Projects" },
  ];

  const filteredCourses =
    selectedCategory === "all"
      ? courseOptions
      : courseOptions.filter((course) => course.category === selectedCategory);

  const formatPrice = (price) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  return (
    <>
      <Helmet>
        <title>
          Programming Courses - Learn Java, Python, Data Science | CodeIntervu
        </title>
        <meta
          name="description"
          content="Master programming with our comprehensive courses in Java, Python, Data Science, AI & ML, DevOps, and more. All courses at ₹499. Start your coding journey today!"
        />
        <meta
          name="keywords"
          content="programming courses, java programming, python programming, data science, machine learning, web development, coding bootcamp, online courses, programming tutorials"
        />
        <meta name="author" content="CodeIntervu" />
        <meta name="robots" content="index, follow" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codeintervu.com/course" />
        <meta
          property="og:title"
          content="Programming Courses - Learn Java, Python, Data Science | CodeIntervu"
        />
        <meta
          property="og:description"
          content="Master programming with our comprehensive courses in Java, Python, Data Science, AI & ML, DevOps, and more. All courses at ₹499."
        />
        <meta
          property="og:image"
          content="https://codeintervu.com/assets/images/course-og-image.jpg"
        />
        <meta property="og:site_name" content="CodeIntervu" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://codeintervu.com/course" />
        <meta
          property="twitter:title"
          content="Programming Courses - Learn Java, Python, Data Science | CodeIntervu"
        />
        <meta
          property="twitter:description"
          content="Master programming with our comprehensive courses in Java, Python, Data Science, AI & ML, DevOps, and more. All courses at ₹499."
        />
        <meta
          property="twitter:image"
          content="https://codeintervu.com/assets/images/course-og-image.jpg"
        />

        {/* Additional SEO */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#0d9488" />
        <link rel="canonical" href="https://codeintervu.com/course" />

        {/* Structured Data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Programming Courses",
            description:
              "Comprehensive programming courses in Java, Python, Data Science, AI & ML, DevOps",
            provider: {
              "@type": "Organization",
              name: "CodeIntervu",
              url: "https://codeintervu.com",
            },
            offers: {
              "@type": "Offer",
              price: "499",
              priceCurrency: "INR",
            },
            courseMode: "online",
            educationalLevel: "beginner to advanced",
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        {/* Breadcrumb */}
        <Breadcrumb />
        <div className="pt-32 pb-20 px-4">
          <div className="container mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4"
              >
                Our{" "}
                <span className="text-teal-600 dark:text-teal-400">
                  Courses
                </span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto"
              >
                Choose from our comprehensive range of courses designed to help
                you master in-demand skills and advance your career
              </motion.p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              {categories.map((category, index) => (
                <motion.button
                  key={category.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedCategory(category.value)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    selectedCategory === category.value
                      ? "bg-teal-600 text-white shadow-lg"
                      : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-teal-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-600"
                  }`}
                >
                  {category.label}
                </motion.button>
              ))}
            </div>

            {/* Courses Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredCourses.map((course, index) => (
                <motion.div
                  key={course.value}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700 relative"
                >
                  {/* Course Header */}
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 bg-teal-100 dark:bg-teal-900 rounded-lg">
                        <div className="text-teal-600 dark:text-teal-400">
                          {course.icon}
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-yellow-500">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-sm font-medium">
                          {course.rating}
                        </span>
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {course.label}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                      {course.description}
                    </p>

                    {/* Course Stats */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>
                          {course.students.toLocaleString()}+ students
                        </span>
                      </div>
                    </div>

                    {/* Features */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">
                        What you'll learn:
                      </h4>
                      <div className="grid grid-cols-2 gap-1">
                        {course.features.slice(0, 4).map((feature, idx) => (
                          <div
                            key={idx}
                            className="flex items-center gap-1 text-xs text-gray-600 dark:text-gray-400"
                          >
                            <CheckCircle className="w-3 h-3 text-teal-600 dark:text-teal-400" />
                            <span>{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Price and CTA */}
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-2xl font-bold text-teal-600 dark:text-teal-400">
                          {formatPrice(course.fee)}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          /course
                        </span>
                      </div>
                      <button
                        onClick={() => navigate(`/course/${course.value}`)}
                        className="bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2"
                      >
                        <Play className="w-4 h-4" />
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Call to Action */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-16 bg-gradient-to-r from-teal-600 to-teal-700 rounded-2xl p-8 text-white"
            >
              <GraduationCap className="w-12 h-12 mx-auto mb-4" />
              <h2 className="text-3xl font-bold mb-4">
                Ready to Start Your Learning Journey?
              </h2>
              <p className="text-teal-100 mb-6 max-w-2xl mx-auto">
                Join thousands of students who have transformed their careers
                with our comprehensive courses. Get personalized guidance and
                hands-on experience.
              </p>
              <button className="bg-white text-teal-600 hover:bg-gray-100 px-8 py-3 rounded-lg font-semibold transition-colors duration-200">
                Get Started Today
              </button>
            </motion.div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Course;
