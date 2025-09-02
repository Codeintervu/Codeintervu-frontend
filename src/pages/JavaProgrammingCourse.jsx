import React, { useState, useRef } from "react";
import { motion } from "motion/react";
import { Helmet } from "react-helmet";
import {
  BookOpen,
  Clock,
  Users,
  Star,
  CheckCircle,
  Play,
  ChevronDown,
  ChevronUp,
  Video,
  FileText,
  Download,
  Code,
  Expand,
  Heart,
  Share2,
  Gift,
  Tag,
  ChevronLeft,
  ChevronRight,
  ThumbsUp,
  ThumbsDown,
  MoreVertical,
} from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";
import Footer from "../components/Footer";

const JavaProgrammingCourse = () => {
  const [expandedSections, setExpandedSections] = useState(new Set([0])); // First section expanded by default
  const [showCouponInput, setShowCouponInput] = useState(false);
  const scrollContainerRef = useRef(null);

  const courseData = {
    title: "Core Java + DSA",
    description:
      "Master Core Java fundamentals, OOP concepts, Data Structures & Algorithms, and build real-world applications",
    rating: 4.8,
    totalStudents: 1200,
    duration: "4 months",
    price: 1999,
    originalPrice: 3199,
    discount: 82,
    instructor: "Dr. Angela Yu",
    totalSections: 44,
    totalLectures: 374,
    totalDuration: "61h 44m",
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
    courseContent: [
      {
        title: "Front-End Web Development",
        lectures: 9,
        duration: "37min",
        items: [
          {
            type: "video",
            title: "What You'll Get in This Course",
            duration: "03:08",
            preview: true,
          },
          {
            type: "resource",
            title: "Download the Course Syllabus",
            duration: "00:12",
            preview: true,
          },
          {
            type: "resource",
            title:
              "Download the 12 Rules to Learn to Code eBook [Latest Edition]",
            duration: "00:42",
          },
          {
            type: "resource",
            title: "Download the Required Software",
            duration: "00:43",
          },
          {
            type: "video",
            title: "How Does the Internet Actually Work?",
            duration: "05:27",
            preview: true,
          },
          {
            type: "video",
            title: "How Do Websites Actually Work?",
            duration: "08:22",
            preview: true,
          },
          {
            type: "video",
            title: "How to Get the Most Out of the Course",
            duration: "09:33",
          },
          {
            type: "video",
            title: "How to Get Help When You're Stuck",
            duration: "06:39",
          },
          { type: "resource", title: "Pathfinder", duration: "02:23" },
        ],
      },
      {
        title: "Introduction to HTML",
        lectures: 8,
        duration: "49min",
        items: [
          {
            type: "video",
            title: "HTML Basics",
            duration: "05:15",
            preview: true,
          },
          { type: "video", title: "HTML Structure", duration: "07:22" },
          { type: "video", title: "HTML Elements", duration: "08:45" },
          { type: "video", title: "HTML Attributes", duration: "06:30" },
          { type: "video", title: "HTML Lists", duration: "04:20" },
          { type: "video", title: "HTML Links", duration: "05:10" },
          { type: "video", title: "HTML Images", duration: "06:15" },
          { type: "video", title: "HTML Forms", duration: "06:03" },
        ],
      },
      {
        title: "Intermediate HTML",
        lectures: 7,
        duration: "52min",
        items: [
          {
            type: "video",
            title: "HTML5 Semantic Elements",
            duration: "08:30",
          },
          { type: "video", title: "HTML Tables", duration: "07:45" },
          { type: "video", title: "HTML Audio and Video", duration: "09:20" },
          { type: "video", title: "HTML Canvas", duration: "10:15" },
          { type: "video", title: "HTML Geolocation", duration: "06:30" },
          { type: "video", title: "HTML Web Storage", duration: "05:45" },
          { type: "video", title: "HTML Best Practices", duration: "04:35" },
        ],
      },
      {
        title: "Introduction to CSS",
        lectures: 10,
        duration: "1h 15min",
        items: [
          {
            type: "video",
            title: "CSS Basics",
            duration: "06:20",
            preview: true,
          },
          { type: "video", title: "CSS Selectors", duration: "08:45" },
          { type: "video", title: "CSS Box Model", duration: "07:30" },
          { type: "video", title: "CSS Colors", duration: "05:15" },
          { type: "video", title: "CSS Typography", duration: "08:20" },
          { type: "video", title: "CSS Backgrounds", duration: "06:45" },
          { type: "video", title: "CSS Borders", duration: "05:30" },
          {
            type: "video",
            title: "CSS Margins and Padding",
            duration: "07:15",
          },
          { type: "video", title: "CSS Display Properties", duration: "08:40" },
          { type: "video", title: "CSS Positioning", duration: "11:20" },
        ],
      },
    ],
  };

  const toggleSection = (index) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedSections(newExpanded);
  };

  const expandAllSections = () => {
    const allSections = new Set(
      courseData.courseContent.map((_, index) => index)
    );
    setExpandedSections(allSections);
  };

  const getContentIcon = (type) => {
    switch (type) {
      case "video":
        return <Video className="w-4 h-4 text-gray-600" />;
      case "resource":
        return <FileText className="w-4 h-4 text-gray-600" />;
      default:
        return <FileText className="w-4 h-4 text-gray-600" />;
    }
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -300, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 300, behavior: "smooth" });
    }
  };

  return (
    <>
      <Helmet>
        <title>
          Java Programming Course - Master Java Fundamentals | CodeIntervu
        </title>
        <meta
          name="description"
          content="Master Java fundamentals, OOP concepts, and build real-world applications. Comprehensive Java programming course with hands-on projects."
        />
        <meta
          name="keywords"
          content="java programming, java course, object oriented programming, java fundamentals, java development, programming course"
        />
        <meta name="author" content="CodeIntervu" />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://codeintervu.com/course/java-programming"
        />
      </Helmet>

      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Breadcrumb />

        <div className="pt-14 pb-20 px-4">
          <div className="container mx-auto max-w-7xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content - Left Column */}
              <div className="lg:col-span-2">
                {/* Course Header */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="p-3 bg-teal-100 dark:bg-teal-900 rounded-lg">
                      <Code className="w-8 h-8 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div className="flex items-center gap-1 text-yellow-500">
                      <Star className="w-5 h-5 fill-current" />
                      <span className="font-semibold">{courseData.rating}</span>
                    </div>
                  </div>

                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    {courseData.title}
                  </h1>

                  <p className="text-gray-600 dark:text-gray-300 text-lg mb-4">
                    {courseData.description}
                  </p>

                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{courseData.duration}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      <span>
                        {courseData.totalStudents.toLocaleString()}+ students
                      </span>
                    </div>
                  </div>

                  {/* What you'll learn */}
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      What you'll learn:
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                      {courseData.features.map((feature, index) => (
                        <div
                          key={index}
                          className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
                        >
                          <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                        ₹{courseData.price}
                      </span>
                      <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                        /course
                      </span>
                    </div>
                    <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-lg font-medium transition-colors duration-200 flex items-center gap-2">
                      <Play className="w-4 h-4" />
                      Enroll Now
                    </button>
                  </div>
                </div>

                {/* Course Content Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                      Course content
                    </h2>
                    <button
                      onClick={expandAllSections}
                      className="text-teal-600 dark:text-teal-400 hover:text-teal-700 dark:hover:text-teal-300 text-sm font-medium flex items-center gap-1"
                    >
                      <Expand className="w-4 h-4" />
                      Expand all sections
                    </button>
                  </div>

                  {/* Course Summary */}
                  <div className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                    {courseData.totalSections} sections •{" "}
                    {courseData.totalLectures} lectures •{" "}
                    {courseData.totalDuration} total length
                  </div>

                  {/* Course Sections */}
                  <div className="space-y-1">
                    {courseData.courseContent.map((section, sectionIndex) => (
                      <div
                        key={sectionIndex}
                        className="border border-gray-200 dark:border-gray-700"
                      >
                        {/* Section Header */}
                        <button
                          onClick={() => toggleSection(sectionIndex)}
                          className="w-full p-4 text-left bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200 flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            {expandedSections.has(sectionIndex) ? (
                              <ChevronUp className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            ) : (
                              <ChevronDown className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                            )}
                            <div>
                              <h3 className="font-semibold text-gray-900 dark:text-white">
                                {section.title}
                              </h3>
                              <p className="text-sm text-gray-600 dark:text-gray-400">
                                {section.lectures} lectures • {section.duration}
                              </p>
                            </div>
                          </div>
                        </button>

                        {/* Section Content */}
                        {expandedSections.has(sectionIndex) && (
                          <div className="bg-white dark:bg-gray-800">
                            {section.items.map((item, itemIndex) => (
                              <div
                                key={itemIndex}
                                className="flex items-center justify-between p-4 border-t border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                              >
                                <div className="flex items-center gap-3 flex-1">
                                  <div className="ml-8">
                                    {getContentIcon(item.type)}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm text-gray-900 dark:text-white">
                                        {item.title}
                                      </span>
                                      {item.preview && (
                                        <span className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded">
                                          Preview
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                  {item.duration}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  {/* More sections button (inside Course content section) */}
                  <div className="flex justify-center mt-6">
                    <button className="px-6 py-3 rounded-full bg-gray-100 dark:bg-gray-700 text-teal-700 dark:text-teal-300 font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                      10 more sections
                    </button>
                  </div>
                </div>

                {/* Requirements + Description */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6">
                  {/* Requirements */}
                  <div className="mb-10">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Requirements
                    </h3>
                    <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                      <li className="flex gap-3">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                        <span>
                          No programming experience needed - we'll teach you
                          everything you need to know
                        </span>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                        <span>A computer with access to the internet</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                        <span>No paid software required</span>
                      </li>
                      <li className="flex gap-3">
                        <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-400"></span>
                        <span>
                          We'll walk you through, step‑by‑step, how to get all
                          the software installed and set up
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Description */}
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Description
                    </h3>
                    <div className="space-y-4 text-gray-700 dark:text-gray-300">
                      <p>
                        Welcome to the Java Programming Bootcamp, the only
                        course you need to learn core Java and become job‑ready.
                        With thousands of learners and an average rating of{" "}
                        {courseData.rating}, this course is among the highest
                        rated on CodeIntervu.
                      </p>
                      <p>
                        From fundamentals to object‑oriented programming,
                        collections, exception handling, file I/O, and
                        real‑world projects, this course is designed to take you
                        from beginner to mastery.
                      </p>
                      <ul className="list-disc ml-6 space-y-2">
                        <li>
                          Taught by an experienced instructor and practitioner
                          with industry‑grade examples
                        </li>
                        <li>
                          Updated for 2024 with modern Java features and best
                          practices
                        </li>
                        <li>
                          Learn by building practical mini‑projects and a
                          capstone application
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Students also bought section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                    Students also bought
                  </h3>
                  <div className="relative">
                    <button
                      onClick={scrollLeft}
                      className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <ChevronLeft className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                    <div
                      ref={scrollContainerRef}
                      className="flex gap-4 overflow-x-auto scrollbar-hide px-8"
                    >
                      {[
                        {
                          title: "Python Programming",
                          instructor: "Dr. Angela Yu",
                          rating: 4.7,
                          students: 1500,
                          price: 549,
                        },
                        {
                          title: "Data Science",
                          instructor: "Dr. Angela Yu",
                          rating: 4.9,
                          students: 650,
                          price: 549,
                        },
                        {
                          title: "AI & Machine Learning",
                          instructor: "Dr. Angela Yu",
                          rating: 4.9,
                          students: 420,
                          price: 549,
                        },
                        {
                          title: "DevOps",
                          instructor: "Dr. Angela Yu",
                          rating: 4.8,
                          students: 780,
                          price: 549,
                        },
                        {
                          title: "Data Analytics",
                          instructor: "Dr. Angela Yu",
                          rating: 4.7,
                          students: 920,
                          price: 549,
                        },
                        {
                          title: "Power BI",
                          instructor: "Dr. Angela Yu",
                          rating: 4.6,
                          students: 1100,
                          price: 549,
                        },
                      ].map((course, index) => (
                        <div
                          key={index}
                          className="flex-shrink-0 w-64 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                        >
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                            {course.title}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                            {course.instructor}
                          </p>
                          <div className="flex items-center gap-1 mb-2">
                            <Star className="w-3 h-3 fill-current text-yellow-500" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {course.rating} (
                              {course.students.toLocaleString()})
                            </span>
                          </div>
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-teal-600 dark:text-teal-400">
                              ₹{course.price}
                            </span>
                            <button className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 rounded text-xs font-medium transition-colors duration-200">
                              Add to cart
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={scrollRight}
                      className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-full p-2 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <ChevronRight className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                    </button>
                  </div>
                </div>

                {/* Student Reviews Section */}
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6">
                  <div className="flex items-center gap-2 mb-6">
                    <Star className="w-6 h-6 fill-current text-yellow-500" />
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                      4.7 course rating • 450K ratings
                    </h3>
                  </div>

                  <div className="border-t border-gray-200 dark:border-gray-700 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Review 1 */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              RS
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                Roshan S.
                              </h4>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="w-4 h-4 fill-current text-yellow-500"
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  6 days ago
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                          This course exceeded my expectations! The instructor
                          explains complex Java concepts in a way that's easy to
                          understand. The hands-on projects really helped
                          solidify my learning. Highly recommended for anyone
                          wanting to learn Java programming.
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Helpful?
                          </span>
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                              <ThumbsUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                              <ThumbsDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Review 2 */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              GT
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                Genadiy T.
                              </h4>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="w-4 h-4 fill-current text-yellow-500"
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  a week ago
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                          Excellent course structure and content. The instructor
                          covers everything from basics to advanced topics. The
                          real-world projects are practical and
                          industry-relevant. I've learned so much and feel
                          confident in my Java skills now...
                        </p>
                        <div className="flex items-center gap-2 mb-3">
                          <button className="text-teal-600 dark:text-teal-400 text-sm font-medium">
                            Show more
                          </button>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Helpful?
                          </span>
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                              <ThumbsUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                              <ThumbsDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Review 3 */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              GB
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                Gytis B.
                              </h4>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(4)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="w-4 h-4 fill-current text-yellow-500"
                                    />
                                  ))}
                                  <Star className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  a month ago
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                          Great course for beginners! The instructor explains
                          concepts clearly and provides plenty of examples. The
                          exercises and projects help reinforce learning. Would
                          definitely recommend to anyone starting their Java
                          journey.
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Helpful?
                          </span>
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                              <ThumbsUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                              <ThumbsDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Review 4 */}
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                              DH
                            </div>
                            <div>
                              <h4 className="font-semibold text-gray-900 dark:text-white">
                                Daniel H.
                              </h4>
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className="w-4 h-4 fill-current text-yellow-500"
                                    />
                                  ))}
                                </div>
                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                  2 weeks ago
                                </span>
                              </div>
                            </div>
                          </div>
                          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 text-sm mb-3">
                          Comprehensive and well-structured course. The
                          instructor's teaching style is engaging and the
                          content is up-to-date with current Java practices. The
                          community support and Q&A sections are very helpful.
                        </p>
                        <div className="flex items-center gap-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Helpful?
                          </span>
                          <div className="flex items-center gap-2">
                            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                              <ThumbsUp className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                            <button className="p-1 hover:bg-gray-200 dark:hover:bg-gray-600 rounded">
                              <ThumbsDown className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrollment Sidebar - Right Column */}
              <div className="lg:col-span-1">
                <div className="sticky top-8">
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-200 dark:border-gray-700">
                    {/* Course Preview Video */}
                    <div className="mb-6">
                      <div className="relative bg-gray-200 dark:bg-gray-700 rounded-lg aspect-video mb-4">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                            <Play className="w-8 h-8 text-teal-600 ml-1" />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enrollment Tabs */}
                    <div className="flex mb-6">
                      <button className="flex-1 py-2 text-center font-medium text-teal-600 dark:text-teal-400 border-b-2 border-teal-600 dark:border-teal-400">
                        Persons
                      </button>
                      <button className="flex-1 py-2 text-center font-medium text-gray-500 dark:text-gray-400 border-b-2 border-transparent">
                        Teams
                      </button>
                    </div>

                    {/* Subscription Option */}
                    <div className="mb-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        This Premium course is included in
                      </p>
                      <p className="font-medium text-gray-900 dark:text-white mb-3">
                        Subscribe to CodeIntervu's top courses
                      </p>
                      <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-colors duration-200 mb-2">
                        Start subscription
                      </button>
                      <p className="text-lg font-bold text-gray-900 dark:text-white">
                        ₹1999.00/course
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Cancel anytime
                      </p>
                    </div>

                    {/* One-time Purchase */}
                    <div className="mb-6">
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="text-3xl font-bold text-teal-600 dark:text-teal-400">
                          ₹{courseData.price}
                        </span>
                        <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                          ₹{courseData.originalPrice}
                        </span>
                        <span className="text-sm font-medium text-red-600 dark:text-red-400">
                          {courseData.discount}% off
                        </span>
                      </div>

                      <div className="flex items-center gap-2 text-red-600 dark:text-red-400 text-sm mb-4">
                        <Clock className="w-4 h-4" />
                        <span>2 hours to buy at this price!</span>
                      </div>

                      <div className="space-y-3">
                        <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-colors duration-200 flex items-center justify-center gap-2">
                          <Play className="w-4 h-4" />
                          Add to cart
                        </button>

                        <div className="flex items-center gap-2">
                          <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-3 rounded-lg font-medium transition-colors duration-200">
                            Buy now
                          </button>
                          <button className="p-3 text-gray-600 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-200">
                            <Heart className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Guarantees */}
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                          <span>30-Day Money-Back Guarantee</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                          <span>Full Lifetime Access</span>
                        </div>
                      </div>

                      {/* Action Links */}
                      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between text-sm">
                          <button className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 flex items-center gap-1">
                            <Share2 className="w-4 h-4" />
                            Share
                          </button>
                          <button className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 flex items-center gap-1">
                            <Gift className="w-4 h-4" />
                            Gift this course
                          </button>
                          <button
                            onClick={() => setShowCouponInput(!showCouponInput)}
                            className="text-gray-600 dark:text-gray-400 hover:text-teal-600 dark:hover:text-teal-400 transition-colors duration-200 flex items-center gap-1"
                          >
                            <Tag className="w-4 h-4" />
                            Apply Coupon
                          </button>
                        </div>

                        {/* Coupon Input */}
                        {showCouponInput && (
                          <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex gap-2">
                              <input
                                type="text"
                                placeholder="Enter Coupon"
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-sm bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                              />
                              <button className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded text-sm font-medium transition-colors duration-200">
                                Apply
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default JavaProgrammingCourse;
