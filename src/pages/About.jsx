import React from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "../components/Breadcrumb";

const About = () => {
  return (
    <>
      <Helmet>
        <title>
          About CodeIntervu - Learn Programming & Interview Prep Platform
        </title>
        <meta
          name="description"
          content="CodeIntervu is the ultimate platform for learning programming, practicing coding problems, and preparing for technical interviews. Join thousands of developers mastering their skills."
        />
        <meta
          name="keywords"
          content="about codeintervu, programming platform, coding interview prep, learn programming, technical interview preparation, coding practice"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="About CodeIntervu - Learn Programming & Interview Prep Platform"
        />
        <meta
          property="og:description"
          content="CodeIntervu is the ultimate platform for learning programming, practicing coding problems, and preparing for technical interviews."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codeintervu.com/about" />
        <meta
          property="og:image"
          content="https://codeintervu.com/assets/images/about-banner.jpg"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="About CodeIntervu - Learn Programming & Interview Prep Platform"
        />
        <meta
          name="twitter:description"
          content="CodeIntervu is the ultimate platform for learning programming, practicing coding problems, and preparing for technical interviews."
        />
        <meta
          name="twitter:image"
          content="https://codeintervu.com/assets/images/about-banner.jpg"
        />

        {/* Structured Data */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "CodeIntervu",
              "url": "https://codeintervu.com",
              "logo": "https://codeintervu.com/assets/images/logo.png",
              "description": "CodeIntervu is the ultimate platform for learning programming, practicing coding problems, and preparing for technical interviews.",
              "foundingDate": "2024",
              "sameAs": [
                "https://javabytrilochan.blogspot.com"
              ],
              "contactPoint": {
                "@type": "ContactPoint",
                "contactType": "customer service",
                "url": "https://codeintervu.com/contact"
              },
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Programming Courses and Interview Prep",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "Programming Tutorials"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "Interview Questions"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Course",
                      "name": "Coding Practice"
                    }
                  }
                ]
              }
            }
          `}
        </script>
      </Helmet>

      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      <section className="pt-32 pb-20 px-4 min-h-[80vh] flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="max-w-5xl w-full mx-auto flex flex-col md:flex-row items-center md:items-start gap-10">
          <div className="md:w-2/3">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
              Transforming the Way <br /> People Learn
            </h1>
            <p className="text-gray-900 dark:text-gray-100 text-lg mb-6">
              Our mission at CodeIntervu is to create innovative and accessible
              learning solutions that empower people of all ages and backgrounds
              to achieve their full potential. Whether you're a student looking
              to master programming, a professional seeking to upskill, or an
              organization aiming to enhance technical training, we provide the
              tools and resources you need to succeed.
            </p>
            <p className="text-gray-900 dark:text-gray-100 text-lg">
              We believe in hands-on, real-world coding experiences. Our
              platform offers interactive tutorials, an online compiler, and a
              vibrant community to help you achieve your goals and unlock your
              full potential. Join us on this journey to transform the way you
              learn and grow in tech.
            </p>
          </div>

          <div className="hidden md:flex md:w-1/3 justify-center items-center relative min-h-[400px]">
            <svg
              width="360"
              height="420"
              viewBox="0 0 360 420"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Search bar with logo */}
              <rect
                x="10"
                y="20"
                width="320"
                height="50"
                rx="12"
                fill="#ffffff"
                className="dark:fill-gray-800"
              />
              <circle cx="35" cy="45" r="9" fill="#6366f1" />
              <rect
                x="55"
                y="37"
                width="180"
                height="16"
                rx="6"
                fill="#e5e7eb"
                className="dark:fill-gray-700"
              />
              <rect
                x="245"
                y="35"
                width="75"
                height="24"
                rx="10"
                fill="#6366f1"
              />

              {/* Sidebar card */}
              <rect
                x="10"
                y="90"
                width="140"
                height="210"
                rx="18"
                fill="#f3f4f6"
                className="dark:fill-gray-700"
              />

              {/* Horizontal cards */}
              <rect
                x="160"
                y="100"
                width="180"
                height="80"
                rx="14"
                fill="#e0e7ff"
              />
              <rect
                x="160"
                y="190"
                width="180"
                height="50"
                rx="14"
                fill="#f3f4f6"
                className="dark:fill-gray-700"
              />

              {/* Profile card */}
              <rect
                x="10"
                y="310"
                width="210"
                height="90"
                rx="18"
                fill="#ffffff"
                className="dark:fill-gray-800"
                style={{ filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.05))" }}
              />
              <circle cx="45" cy="355" r="12" fill="#cbd5e1" />
              <rect
                x="70"
                y="345"
                width="120"
                height="14"
                rx="6"
                fill="#e5e7eb"
                className="dark:fill-gray-700"
              />
              <rect
                x="70"
                y="365"
                width="90"
                height="10"
                rx="5"
                fill="#e5e7eb"
                className="dark:fill-gray-700"
              />

              {/* Stat/info card */}
              <rect
                x="230"
                y="310"
                width="110"
                height="80"
                rx="16"
                fill="#e0e7ff"
              />
              <rect
                x="245"
                y="330"
                width="80"
                height="12"
                rx="6"
                fill="#c7d2fe"
              />
              <rect
                x="245"
                y="350"
                width="70"
                height="10"
                rx="5"
                fill="#c7d2fe"
              />
            </svg>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
