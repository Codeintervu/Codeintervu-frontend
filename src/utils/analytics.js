import ReactGA from "react-ga4";

// Google Analytics 4 Configuration
const GA_TRACKING_ID = "G-E2ZEYXVKMJ"; // Your actual GA4 tracking ID

// Initialize Google Analytics
export const initGA = () => {
  if (typeof window !== "undefined") {
    ReactGA.initialize(GA_TRACKING_ID);
    console.log("Google Analytics initialized");
  }
};

// Page view tracking
export const trackPageView = (path) => {
  if (typeof window !== "undefined") {
    ReactGA.send({ hitType: "pageview", page: path });
  }
};

// Custom event tracking
export const trackEvent = (category, action, label = null, value = null) => {
  if (typeof window !== "undefined") {
    ReactGA.event({
      category,
      action,
      label,
      value,
    });
  }
};

// User interaction tracking
export const trackUserInteraction = (element, action) => {
  trackEvent("User Interaction", action, element);
};

// Quiz tracking
export const trackQuizStart = (quizName) => {
  trackEvent("Quiz", "Start", quizName);
};

export const trackQuizComplete = (quizName, score, totalQuestions) => {
  trackEvent("Quiz", "Complete", quizName, score);
  trackEvent(
    "Quiz Performance",
    "Score",
    `${quizName} - ${score}/${totalQuestions}`
  );
};

export const trackQuizQuestion = (quizName, questionNumber, isCorrect) => {
  trackEvent(
    "Quiz Question",
    isCorrect ? "Correct" : "Incorrect",
    `${quizName} - Q${questionNumber}`
  );
};

// Compiler tracking
export const trackCodeExecution = (language, success, executionTime) => {
  trackEvent("Code Execution", success ? "Success" : "Failed", language);
  if (executionTime) {
    trackEvent(
      "Code Performance",
      "Execution Time",
      language,
      Math.round(executionTime * 1000)
    );
  }
};

// Course tracking
export const trackCourseView = (courseName) => {
  trackEvent("Course", "View", courseName);
};

export const trackCourseProgress = (courseName, progress) => {
  trackEvent("Course Progress", "Update", courseName, Math.round(progress));
};

// Interview questions tracking
export const trackQuestionView = (category, difficulty) => {
  trackEvent("Interview Question", "View", `${category} - ${difficulty}`);
};

export const trackQuestionBookmark = (category, action) => {
  trackEvent("Interview Question", action, category);
};

// Profile tracking
export const trackProfileCompletion = (completionPercentage) => {
  trackEvent(
    "Profile",
    "Completion Update",
    "Profile Completion",
    completionPercentage
  );
};

// Error tracking
export const trackError = (error, context) => {
  trackEvent("Error", "Application Error", context);
  console.error("Error tracked:", error, "Context:", context);
};

// Performance tracking
export const trackPerformance = (metric, value, label = null) => {
  trackEvent("Performance", metric, label, Math.round(value));
};

// User engagement tracking
export const trackEngagement = (action, details = null) => {
  trackEvent("Engagement", action, details);
};

// Social sharing tracking
export const trackSocialShare = (platform, content) => {
  trackEvent("Social Share", platform, content);
};

// Search tracking
export const trackSearch = (query, results) => {
  trackEvent("Search", "Query", query, results);
};

// Navigation tracking
export const trackNavigation = (from, to) => {
  trackEvent("Navigation", "Page Change", `${from} -> ${to}`);
};

// Time on page tracking
export const trackTimeOnPage = (page, timeSpent) => {
  trackEvent("Engagement", "Time on Page", page, Math.round(timeSpent));
};

// Custom dimensions and metrics
export const setCustomDimension = (dimension, value) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("config", GA_TRACKING_ID, {
      custom_map: { [dimension]: value },
    });
  }
};

// User properties
export const setUserProperty = (property, value) => {
  if (typeof window !== "undefined" && window.gtag) {
    window.gtag("set", "user_properties", {
      [property]: value,
    });
  }
};

// Enhanced ecommerce tracking
export const trackPurchase = (transactionId, value, currency = "INR") => {
  trackEvent("Purchase", "Complete", transactionId, Math.round(value));
  // Note: currency parameter is available for future use
};

// A/B testing tracking
export const trackExperiment = (experimentId, variant) => {
  trackEvent("Experiment", "View", `${experimentId} - ${variant}`);
};

// Export all tracking functions
export default {
  initGA,
  trackPageView,
  trackEvent,
  trackUserInteraction,
  trackQuizStart,
  trackQuizComplete,
  trackQuizQuestion,
  trackCodeExecution,
  trackCourseView,
  trackCourseProgress,
  trackQuestionView,
  trackQuestionBookmark,
  trackProfileCompletion,
  trackError,
  trackPerformance,
  trackEngagement,
  trackSocialShare,
  trackSearch,
  trackNavigation,
  trackTimeOnPage,
  setCustomDimension,
  setUserProperty,
  trackPurchase,
  trackExperiment,
};
