import React, { useEffect, useState, useRef } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { Link } from "react-router-dom";
import {
  FaQuestionCircle,
  FaClipboardList,
  FaChalkboardTeacher,
  FaCode,
  FaUser,
  FaBlog,
  FaGraduationCap,
  FaLaptopCode,
  FaTachometerAlt,
} from "react-icons/fa";

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

const InterviewPrepCarousel = () => {
  const features = [
    {
      id: "courses",
      title: "Programming Courses",
      description: "Learn programming languages with hands-on tutorials",
      icon: <FaGraduationCap className="h-[16px] w-[16px] text-white" />,
      // link: "/courses",
      color: "bg-blue-500",
    },
    {
      id: "compilers",
      title: "Online Compilers",
      description: "Write, compile and run code in multiple languages",
      icon: <FaLaptopCode className="h-[16px] w-[16px] text-white" />,
      // link: "/compilers",
      color: "bg-green-500",
    },
    {
      id: "whiteboard",
      title: "Whiteboard",
      description: "Draw & explain concepts on virtual whiteboard",
      icon: <FaChalkboardTeacher className="h-[16px] w-[16px] text-white" />,
      link: "/whiteboard",
      color: "bg-indigo-500",
    },
    {
      id: "quiz",
      title: "Quiz",
      description: "Test your knowledge with interactive quizzes",
      icon: <FaQuestionCircle className="h-[16px] w-[16px] text-white" />,
      link: "/quiz",
      color: "bg-purple-500",
    },
    {
      id: "questions",
      title: "Interview Questions",
      description: "Practice common Q&A for technical interviews",
      icon: <FaClipboardList className="h-[16px] w-[16px] text-white" />,
      link: "/interview-questions",
      color: "bg-orange-500",
    },
    {
      id: "mock-interviews",
      title: "Mock Interviews",
      description: "Simulate real interview scenarios",
      icon: <FaUser className="h-[16px] w-[16px] text-white" />,
      link: "/mock-interviews",
      color: "bg-red-500",
    },
    {
      id: "coding-practice",
      title: "Coding Practice",
      description: "Live coding sessions",
      icon: <FaCode className="h-[16px] w-[16px] text-white" />,
      link: "/coding-interviews",
      color: "bg-yellow-500",
    },
    {
      id: "blog",
      title: "Blog",
      description: "Read latest insights and tips",
      icon: <FaBlog className="h-[16px] w-[16px] text-white" />,
      link: "http://javabytrilochan.blogspot.com",
      color: "bg-teal-500",
      external: true,
    },
  ];

  const baseWidth = 600; // Increased outer container width
  const containerPadding = 16;
  const itemWidth = 400; // Fixed inner content width
  const trackItemOffset = itemWidth + GAP;

  const carouselItems = [...features, features[0]]; // Loop enabled
  const [currentIndex, setCurrentIndex] = useState(0);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  // Auto-rotate carousel
  useEffect(() => {
    if (!isHovered) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === features.length - 1) {
            return prev + 1;
          }
          if (prev === carouselItems.length - 1) {
            return 0;
          }
          return prev + 1;
        });
      }, 4000);
      return () => clearInterval(timer);
    }
  }, [isHovered, features.length, carouselItems.length]);

  const effectiveTransition = isResetting ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationComplete = () => {
    if (currentIndex === carouselItems.length - 1) {
      setIsResetting(true);
      x.set(0);
      setCurrentIndex(0);
      setTimeout(() => setIsResetting(false), 50);
    }
  };

  const handleDragEnd = (_, info) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      if (currentIndex === features.length - 1) {
        setCurrentIndex(currentIndex + 1);
      } else {
        setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
      }
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      if (currentIndex === 0) {
        setCurrentIndex(features.length - 1);
      } else {
        setCurrentIndex((prev) => Math.max(prev - 1, 0));
      }
    }
  };

  const nextSlide = () => {
    if (currentIndex === features.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex((prev) => Math.min(prev + 1, carouselItems.length - 1));
    }
  };

  const prevSlide = () => {
    if (currentIndex === 0) {
      setCurrentIndex(features.length - 1);
    } else {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 dark:from-gray-800 dark:to-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What We Offer
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Complete learning platform with courses, compilers, and interview
            preparation tools to help you succeed in your technical career
          </p>
        </div>

        {/* Carousel Container */}
        <div className="flex justify-center">
          <div
            ref={containerRef}
            className="relative overflow-hidden p-4 rounded-[24px] border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 shadow-xl"
            style={{
              width: `${baseWidth}px`,
            }}
          >
            {/* Navigation Arrows */}
            <button
              onClick={prevSlide}
              className="absolute left-8 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 z-20 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              aria-label="Previous slide"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-8 top-1/2 transform -translate-y-1/2 bg-white dark:bg-gray-700 rounded-full p-2 shadow-lg hover:shadow-xl transition-all duration-300 z-20 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600"
              aria-label="Next slide"
            >
              <svg
                className="w-5 h-5 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            <motion.div
              className="flex mx-auto"
              drag="x"
              style={{
                width: itemWidth,
                gap: `${GAP}px`,
                perspective: 1000,
                perspectiveOrigin: `${
                  currentIndex * trackItemOffset + itemWidth / 2
                }px 50%`,
                x,
              }}
              onDragEnd={handleDragEnd}
              animate={{ x: -(currentIndex * trackItemOffset) }}
              transition={effectiveTransition}
              onAnimationComplete={handleAnimationComplete}
            >
              {carouselItems.map((feature, index) => {
                const range = [
                  -(index + 1) * trackItemOffset,
                  -index * trackItemOffset,
                  -(index - 1) * trackItemOffset,
                ];
                const outputRange = [90, 0, -90];
                const rotateY = useTransform(x, range, outputRange, {
                  clamp: false,
                });

                const CardComponent = feature.external ? "a" : Link;
                const cardProps = feature.external
                  ? {
                      href: feature.link,
                      target: "_blank",
                      rel: "noopener noreferrer",
                    }
                  : { to: feature.link };

                return (
                  <motion.div
                    key={`${feature.id}-${index}`}
                    className="relative shrink-0 flex flex-col items-start justify-between bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-800 border border-gray-200 dark:border-gray-600 rounded-[12px] overflow-hidden cursor-grab active:cursor-grabbing hover:shadow-lg transition-shadow duration-300"
                    style={{
                      width: itemWidth,
                      height: "100%",
                      rotateY: rotateY,
                    }}
                    transition={effectiveTransition}
                  >
                    <CardComponent
                      {...cardProps}
                      className="w-full h-full p-5 flex flex-col"
                    >
                      <div className="mb-4">
                        <span
                          className={`flex h-[28px] w-[28px] items-center justify-center rounded-full ${feature.color}`}
                        >
                          {feature.icon}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="mb-2 font-bold text-lg text-gray-900 dark:text-white">
                          {feature.title}
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                          {feature.description}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                        <span>Learn More</span>
                        <svg
                          className="w-4 h-4 ml-2 transform transition-transform group-hover:translate-x-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 8l4 4m0 0l-4 4m4-4H3"
                          />
                        </svg>
                      </div>
                    </CardComponent>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Dots Indicator */}
            <div className="flex w-full justify-center">
              <div className="mt-4 flex w-[150px] justify-between px-8">
                {features.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                      currentIndex % features.length === index
                        ? "bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                    animate={{
                      scale: currentIndex % features.length === index ? 1.2 : 1,
                    }}
                    onClick={() => setCurrentIndex(index)}
                    transition={{ duration: 0.15 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Ready to start your interview preparation journey?
          </p>
        </div>
      </div>
    </section>
  );
};

export default InterviewPrepCarousel;
