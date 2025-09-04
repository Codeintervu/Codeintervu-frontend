import { ArrowRight, Youtube, Linkedin, Facebook, Twitter } from "lucide-react";
import React from "react";

const Footer = () => {
  const footerLinks = {
    about: [
      "Comprehensive Tutorials",
      "Online Practice Compilers",
      "Internship Opportunities",
      "Earn Certifications",
      "Placement Preparation",
      "Interview Questions & Answers",
    ],
    contact: [
      "Plot No-741, 2nd Floor,",
      "Jayadev Vihar, 751013",
      "Bhubaneswar: Odisha",
      "Call: +91-89842 89279",
      "Mail: info@codeintervu.com",
    ],
  };

  const courses = [
    "Learn Python",
    "Learn AI",
    "Learn Machine Learning",
    "Learn Deep Learning",
    "Learn Core Java",
    "Learn Java J2EE",
    "Learn Java Spring",
    "Learn Spring Boot",
    "Learn Power BI",
    "Learn DAA",
    "Learn HTML",
    "Learn SQL",
    "Learn C Programming",
    "Learn ReactJS",
    "Learn Git",
    "Learn JavaScript",
    "Learn Data Structure Using C",
    "Learn Robotics",
    "Learn Data Science",
    "Learn PHP",
  ];

  const tutorials = [
    "Python Tutorial",
    "AI Tutorial",
    "Machine Learning Tutorial",
    "Deep Learning Tutorial",
    "Core Java Tutorial",
    "Java J2EE Tutorial",
    "Java Spring Tutorial",
    "Spring Boot Tutorial",
    "Power BI Tutorial",
    "DAA Tutorial",
    "HTML Tutorial",
    "SQL Tutorial",
    "C Programming Tutorial",
    "ReactJS Tutorial",
    "Git Tutorial",
    "JavaScript Tutorial",
    "Data Structure Using C Tutorial",
    "Robotics Tutorial",
    "Data Science Tutorial",
    "PHP Tutorial",
  ];

  return (
    <footer className="bg-eerie-black-2 text-gray-x-11 bg-cover bg-center">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Newsletter Section */}
          <div className="lg:col-span-1">
            <h1 className="text-3xl font-bold text-kappel mb-4">Codeintervu</h1>
            <p className="mb-6">Join our newsletter for the latest updates.</p>
            <form className="mb-6">
              <input
                type="email"
                placeholder="Your email"
                className="w-full px-4 py-3 rounded-md mb-2 bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-kappel"
                required
              />
              <button
                type="submit"
                className="btn bg-kappel text-white px-6 py-3 rounded-md w-full flex items-center justify-center gap-2 hover:bg-opacity-90 transition-colors"
              >
                Subscribe
                <ArrowRight size={20} />
              </button>
            </form>
          </div>

          {/* About Us Section */}
          <div>
            <h3 className="text-white text-xl font-league-spartan font-bold mb-4">
              About us
            </h3>
            <p className="mb-4 text-gray-500">
              CodeIntervu.com is a cutting-edge EdTech platform designed to
              empower technocrats and aspiring professionals. Developed by Silan
              Software, CodeIntervu.com offers a unique blend of tutorials,
              practice tools, and career-focused resources, making it your
              one-stop destination for mastering technology and securing
              placements.
            </p>
            <ul className="space-y-2">
              {footerLinks.about.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-500 hover:text-kappel transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Us Section */}
          <div>
            <h3 className="text-white text-xl font-league-spartan font-bold mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              {footerLinks.contact.map((item, index) => (
                <li
                  key={index}
                  className="text-gray-500 hover:text-kappel transition-colors"
                >
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <a
                href="#contact"
                className="inline-block bg-kappel text-white px-4 py-2 rounded-md hover:bg-opacity-90 transition-colors"
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-white text-xl font-league-spartan font-bold mb-4">
              Quick Links
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <a
                href="#"
                className="text-gray-500 hover:text-kappel transition-colors"
                aria-label="YouTube"
              >
                <Youtube size={28} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-kappel transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={28} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-kappel transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={28} />
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-kappel transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={28} />
              </a>
            </div>
          </div>
        </div>

        {/* Courses Section */}
        <div className="mt-12">
          <h3 className="text-white text-xl font-league-spartan font-bold mb-4 text-center">
            Our Courses
          </h3>
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {courses.map((course, index) => (
              <a
                key={index}
                href="#"
                className="text-gray-200 hover:text-kappel transition-colors text-sm px-3 py-1 bg-gray-800 rounded-md"
              >
                {course}
              </a>
            ))}
          </div>
        </div>

        {/* Tutorials Section */}
        {/* REMOVED: Our Tutorials section */}

        {/* Copyright Section */}
        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-500">
            Copyright © {new Date().getFullYear()} Codeintervu. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
