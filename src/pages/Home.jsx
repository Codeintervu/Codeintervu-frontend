import React from "react";
import Hero from "../components/Hero.jsx";
import VideoComponent from "../components/VideoComponent.jsx";
import StatsComponent from "../components/StatsComponent.jsx";
// import Testimonial from "../components/Testimonial.jsx";
import Footer from "../components/Footer.jsx";
import { Link } from "react-router-dom";
import FAQ from "../components/FAQ.jsx";
import ScrollToTopButton from "../components/ScrollToTopButton.jsx";
import { Helmet } from "react-helmet";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home - CodeIntervu</title>
        <meta
          name="description"
          content="Welcome to CodeIntervu! The best place to learn programming, practice coding, and prepare for interviews with hands-on tutorials and compilers."
        />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "CodeIntervu",
              "url": "https://codeintervu.com/",
              "potentialAction": {
                "@type": "SearchAction",
                "target": "https://codeintervu.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string"
              }
            }
          `}
        </script>
      </Helmet>
      <div>
        <Hero />
        <VideoComponent />
        {/* Online Compilers Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center mb-8">
              <div className="flex items-center gap-3 mb-2">
                <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100 text-blue-600 rounded-lg">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9 12h6m-3-3v6m9 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
                  Practice with our Online Compilers
                </h2>
              </div>
              <p className="text-center text-gray-800 dark:text-gray-100 max-w-2xl">
                We believe coding should be accessible to all, so we made our
                own compilers for web and mobile—and they're free!
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              <Link
                to="/compilers/java-compiler"
                className="bg-white dark:bg-gray-800 shadow rounded-lg px-6 py-5 flex items-center justify-between hover:shadow-lg transition border border-gray-100 dark:border-gray-700"
              >
                Java Compiler <span className="ml-2">→</span>
              </Link>
              <Link
                to="/compilers/python-compiler"
                className="bg-white dark:bg-gray-800 shadow rounded-lg px-6 py-5 flex items-center justify-between hover:shadow-lg transition border border-gray-100 dark:border-gray-700"
              >
                Python Compiler <span className="ml-2">→</span>
              </Link>
              <Link
                to="/compilers/javascript-compiler"
                className="bg-white dark:bg-gray-800 shadow rounded-lg px-6 py-5 flex items-center justify-between hover:shadow-lg transition border border-gray-100 dark:border-gray-700"
              >
                JavaScript Compiler <span className="ml-2">→</span>
              </Link>
              <Link
                to="/compilers/c-compiler"
                className="bg-white dark:bg-gray-800 shadow rounded-lg px-6 py-5 flex items-center justify-between hover:shadow-lg transition border border-gray-100 dark:border-gray-700"
              >
                C Compiler <span className="ml-2">→</span>
              </Link>
              <Link
                to="/compilers/cpp-compiler"
                className="bg-white dark:bg-gray-800 shadow rounded-lg px-6 py-5 flex items-center justify-between hover:shadow-lg transition border border-gray-100 dark:border-gray-700"
              >
                C++ Compiler <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        </section>
        {/* FAQ Section */}
        <FAQ />
        <Footer />
        <ScrollToTopButton />
      </div>
    </>
  );
};

export default Home;
