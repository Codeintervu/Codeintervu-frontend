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




// import React, { useState, useEffect } from "react";
// import { Helmet } from "react-helmet";
// import Breadcrumb from "../components/Breadcrumb";

// const About = () => {
//   const [activeTab, setActiveTab] = useState("features");
//   const [currentTestimonial, setCurrentTestimonial] = useState(0);
//   const [stats, setStats] = useState({
//     users: 0,
//     questions: 0,
//     languages: 0,
//     successRate: 0,
//   });

//   // Animate stats on scroll
//   useEffect(() => {
//     const animateStats = () => {
//       const targetStats = {
//         users: 15000,
//         questions: 5000,
//         languages: 15,
//         successRate: 85,
//       };

//       const duration = 2000;
//       const steps = 60;
//       const increment = duration / steps;

//       let currentStep = 0;
//       const timer = setInterval(() => {
//         currentStep++;
//         const progress = currentStep / steps;

//         setStats({
//           users: Math.floor(targetStats.users * progress),
//           questions: Math.floor(targetStats.questions * progress),
//           languages: Math.floor(targetStats.languages * progress),
//           successRate: Math.floor(targetStats.successRate * progress),
//         });

//         if (currentStep >= steps) {
//           clearInterval(timer);
//         }
//       }, increment);

//       return () => clearInterval(timer);
//     };

//     const observer = new IntersectionObserver((entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           animateStats();
//           observer.unobserve(entry.target);
//         }
//       });
//     });

//     const statsSection = document.getElementById("stats-section");
//     if (statsSection) {
//       observer.observe(statsSection);
//     }

//     return () => observer.disconnect();
//   }, []);

//   // Auto-rotate testimonials
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
//     }, 5000);

//     return () => clearInterval(interval);
//   }, []);

//   const testimonials = [
//     {
//       name: "Sarah Chen",
//       role: "Software Engineer at Google",
//       content:
//         "CodeIntervu helped me ace my technical interviews. The practice questions and mock interviews were incredibly realistic.",
//       rating: 5,
//     },
//     {
//       name: "Marcus Rodriguez",
//       role: "Full Stack Developer",
//       content:
//         "The online compiler and interactive tutorials made learning so much easier. I went from beginner to confident coder in months.",
//       rating: 5,
//     },
//     {
//       name: "Priya Patel",
//       role: "Computer Science Student",
//       content:
//         "Perfect platform for interview prep! The question bank is extensive and the explanations are crystal clear.",
//       rating: 5,
//     },
//   ];

//   const features = [
//     {
//       icon: "💻",
//       title: "Online Compiler",
//       description:
//         "Write, compile, and run code in 15+ programming languages directly in your browser. No setup required.",
//       demo: "console.log('Hello, World!');",
//     },
//     {
//       icon: "🎯",
//       title: "Interview Questions",
//       description:
//         "5000+ carefully curated questions covering data structures, algorithms, system design, and more.",
//       demo: "// Reverse a string\nfunction reverse(str) {\n  return str.split('').reverse().join('');\n}",
//     },
//     {
//       icon: "📊",
//       title: "Progress Tracking",
//       description:
//         "Monitor your learning journey with detailed analytics, streak tracking, and personalized recommendations.",
//       demo: "// Track your progress\nconst progress = {\n  completed: 150,\n  streak: 7,\n  accuracy: 92\n};",
//     },
//     {
//       icon: "🤖",
//       title: "Mock Interviews",
//       description:
//         "Practice with AI-powered mock interviews that simulate real technical interview scenarios.",
//       demo: "// Mock interview session\nconst interview = {\n  duration: '45min',\n  questions: 3,\n  difficulty: 'Medium'\n};",
//     },
//   ];

//   return (
//     <>
//       <Helmet>
//         <title>
//           About CodeIntervu - Learn Programming & Interview Prep Platform
//         </title>
//         <meta
//           name="description"
//           content="CodeIntervu is the ultimate platform for learning programming, practicing coding problems, and preparing for technical interviews. Join thousands of developers mastering their skills."
//         />
//         <meta
//           name="keywords"
//           content="about codeintervu, programming platform, coding interview prep, learn programming, technical interview preparation, coding practice"
//         />

//         {/* Open Graph */}
//         <meta
//           property="og:title"
//           content="About CodeIntervu - Learn Programming & Interview Prep Platform"
//         />
//         <meta
//           property="og:description"
//           content="CodeIntervu is the ultimate platform for learning programming, practicing coding problems, and preparing for technical interviews."
//         />
//         <meta property="og:type" content="website" />
//         <meta property="og:url" content="https://codeintervu.com/about" />
//         <meta
//           property="og:image"
//           content="https://codeintervu.com/assets/images/about-banner.jpg"
//         />

//         {/* Twitter */}
//         <meta name="twitter:card" content="summary_large_image" />
//         <meta
//           name="twitter:title"
//           content="About CodeIntervu - Learn Programming & Interview Prep Platform"
//         />
//         <meta
//           name="twitter:description"
//           content="CodeIntervu is the ultimate platform for learning programming, practicing coding problems, and preparing for technical interviews."
//         />
//         <meta
//           name="twitter:image"
//           content="https://codeintervu.com/assets/images/about-banner.jpg"
//         />

//         {/* Structured Data */}
//         <script type="application/ld+json">
//           {`
//             {
//               "@context": "https://schema.org",
//               "@type": "Organization",
//               "name": "CodeIntervu",
//               "url": "https://codeintervu.com",
//               "logo": "https://codeintervu.com/assets/images/logo.png",
//               "description": "CodeIntervu is the ultimate platform for learning programming, practicing coding problems, and preparing for technical interviews.",
//               "foundingDate": "2024",
//               "sameAs": [
//                 "https://javabytrilochan.blogspot.com"
//               ],
//               "contactPoint": {
//                 "@type": "ContactPoint",
//                 "contactType": "customer service",
//                 "url": "https://codeintervu.com/contact"
//               },
//               "hasOfferCatalog": {
//                 "@type": "OfferCatalog",
//                 "name": "Programming Courses and Interview Prep",
//                 "itemListElement": [
//                   {
//                     "@type": "Offer",
//                     "itemOffered": {
//                       "@type": "Course",
//                       "name": "Programming Tutorials"
//                     }
//                   },
//                   {
//                     "@type": "Offer",
//                     "itemOffered": {
//                       "@type": "Course",
//                       "name": "Interview Questions"
//                     }
//                   },
//                   {
//                     "@type": "Offer",
//                     "itemOffered": {
//                       "@type": "Course",
//                       "name": "Coding Practice"
//                     }
//                   }
//                 ]
//               }
//             }
//           `}
//         </script>
//       </Helmet>

//       {/* Breadcrumb Navigation */}
//       <Breadcrumb />

//       {/* Hero Section */}
//       <section className="pt-32 pb-20 px-4 min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 transition-colors duration-300">
//         <div className="max-w-6xl w-full mx-auto">
//           <div className="text-center mb-16">
//             <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-6 leading-tight">
//               The Ultimate Platform for
//               <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
//                 {" "}
//                 Programming Excellence
//               </span>
//             </h1>
//             <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
//               Master programming, ace technical interviews, and build your dream
//               career with our comprehensive learning platform.
//             </p>
//             <div className="flex flex-wrap justify-center gap-4">
//               <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
//                 Start Learning Free
//               </button>
//               <button className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
//                 Watch Demo
//               </button>
//             </div>
//           </div>

//           {/* Interactive Platform Preview */}
//           <div className="relative max-w-4xl mx-auto">
//             <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 transform rotate-1 hover:rotate-0 transition-transform duration-500">
//               <div className="flex items-center gap-3 mb-4">
//                 <div className="w-3 h-3 bg-red-500 rounded-full"></div>
//                 <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
//                 <div className="w-3 h-3 bg-green-500 rounded-full"></div>
//                 <div className="ml-4 text-sm text-gray-500">
//                   CodeIntervu Platform
//                 </div>
//               </div>
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                 <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
//                   <div className="text-sm font-mono text-green-600">
//                     ✓ Online Compiler
//                   </div>
//                   <div className="text-sm font-mono text-blue-600">
//                     ✓ 5000+ Questions
//                   </div>
//                   <div className="text-sm font-mono text-purple-600">
//                     ✓ Progress Tracking
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
//                   <div className="text-sm font-mono text-indigo-600">
//                     ✓ Mock Interviews
//                   </div>
//                   <div className="text-sm font-mono text-pink-600">
//                     ✓ 15+ Languages
//                   </div>
//                   <div className="text-sm font-mono text-orange-600">
//                     ✓ Real-time Analytics
//                   </div>
//                 </div>
//                 <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
//                   <div className="text-sm font-mono text-teal-600">
//                     ✓ Community Support
//                   </div>
//                   <div className="text-sm font-mono text-red-600">
//                     ✓ Career Guidance
//                   </div>
//                   <div className="text-sm font-mono text-yellow-600">
//                     ✓ Mobile Ready
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       <section id="stats-section" className="py-20 bg-white dark:bg-gray-900">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//               Trusted by Developers Worldwide
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300">
//               Join thousands of developers who have transformed their careers
//               with CodeIntervu
//             </p>
//           </div>

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
//             <div className="text-center">
//               <div className="text-4xl md:text-5xl font-bold text-indigo-600 mb-2">
//                 {stats.users.toLocaleString()}+
//               </div>
//               <div className="text-gray-600 dark:text-gray-300">
//                 Active Users
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
//                 {stats.questions.toLocaleString()}+
//               </div>
//               <div className="text-gray-600 dark:text-gray-300">
//                 Practice Questions
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
//                 {stats.languages}+
//               </div>
//               <div className="text-gray-600 dark:text-gray-300">
//                 Programming Languages
//               </div>
//             </div>
//             <div className="text-center">
//               <div className="text-4xl md:text-5xl font-bold text-orange-600 mb-2">
//                 {stats.successRate}%
//               </div>
//               <div className="text-gray-600 dark:text-gray-300">
//                 Success Rate
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Features Section */}
//       <section className="py-20 bg-gray-50 dark:bg-gray-800">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//               Everything You Need to Succeed
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300">
//               Comprehensive tools and resources designed for modern developers
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {features.map((feature, index) => (
//               <div
//                 key={index}
//                 className="bg-white dark:bg-gray-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
//               >
//                 <div className="text-4xl mb-4">{feature.icon}</div>
//                 <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
//                   {feature.title}
//                 </h3>
//                 <p className="text-gray-600 dark:text-gray-300 mb-6">
//                   {feature.description}
//                 </p>
//                 <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
//                   <pre>{feature.demo}</pre>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="py-20 bg-white dark:bg-gray-900">
//         <div className="max-w-6xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
//               What Our Users Say
//             </h2>
//             <p className="text-xl text-gray-600 dark:text-gray-300">
//               Real stories from developers who transformed their careers
//             </p>
//           </div>

//           <div className="relative">
//             <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 md:p-12">
//               <div className="text-center">
//                 <div className="flex justify-center mb-6">
//                   {[...Array(5)].map((_, i) => (
//                     <span
//                       key={i}
//                       className={`text-2xl ${
//                         i < testimonials[currentTestimonial].rating
//                           ? "text-yellow-400"
//                           : "text-gray-300"
//                       }`}
//                     >
//                       ★
//                     </span>
//                   ))}
//                 </div>
//                 <blockquote className="text-xl md:text-2xl text-gray-700 dark:text-gray-200 mb-8 italic">
//                   "{testimonials[currentTestimonial].content}"
//                 </blockquote>
//                 <div className="text-center">
//                   <div className="font-semibold text-gray-900 dark:text-white text-lg">
//                     {testimonials[currentTestimonial].name}
//                   </div>
//                   <div className="text-gray-600 dark:text-gray-300">
//                     {testimonials[currentTestimonial].role}
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex justify-center mt-8 gap-2">
//               {testimonials.map((_, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentTestimonial(index)}
//                   className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                     index === currentTestimonial
//                       ? "bg-indigo-600"
//                       : "bg-gray-300 hover:bg-gray-400"
//                   }`}
//                 />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* CTA Section */}
//       <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600">
//         <div className="max-w-4xl mx-auto px-4 text-center">
//           <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
//             Ready to Transform Your Career?
//           </h2>
//           <p className="text-xl text-indigo-100 mb-8">
//             Join thousands of developers who have already accelerated their
//             learning with CodeIntervu
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105">
//               Start Free Trial
//             </button>
//             <button className="border-2 border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300">
//               View All Features
//             </button>
//           </div>
//           <p className="text-indigo-200 mt-4 text-sm">
//             No credit card required • 14-day free trial • Cancel anytime
//           </p>
//         </div>
//       </section>
//     </>
//   );
// };

// export default About;
