import React, { useState } from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "../components/Breadcrumb";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaTwitter,
  FaFacebook,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us - CodeIntervu</title>
        <meta
          name="description"
          content="Get in touch with CodeIntervu. We're here to help with your programming and interview preparation questions."
        />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      <section className="pt-32 px-4 min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300 pb-20">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-4 animate-fade-in">
              Contact Us
            </h1>
            <p className="text-gray-800 dark:text-gray-100 text-lg max-w-2xl mx-auto">
              Have questions about our services? We'd love to hear from you.
              Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          {submitted ? (
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-10 text-center animate-slide-up border border-gray-100 dark:border-gray-700">
              <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-4">
                Thank you for contacting us!
              </h2>
              <p className="text-gray-900 dark:text-gray-100 text-lg">
                We'll get back to you soon.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-12 mb-16">
              {/* Left Column - Get in Touch */}
              <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Get in Touch
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  We're here to help and answer any questions you might have. We
                  look forward to hearing from you.
                </p>

                {/* Contact Information */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <FaMapMarkerAlt className="text-teal-600 dark:text-teal-400 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        Address
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Plot No-741, 2nd Floor,
                        <br />
                        Jayadev Vihar, 751013
                        <br />
                        Bhubaneswar, Odisha
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <FaPhone className="text-teal-600 dark:text-teal-400 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        Phone
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        0674-2361252
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <FaEnvelope className="text-teal-600 dark:text-teal-400 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        Email
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        info@codeintervu.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <FaClock className="text-teal-600 dark:text-teal-400 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">
                        Business Hours
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Monday - Friday: 8:00 AM - 10:00 PM
                        <br />
                        Saturday - Sunday: 9:00 AM - 11:00 PM
                      </p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="mt-8">
                  <h3 className="font-semibold text-gray-800 dark:text-white mb-4">
                    Follow Us
                  </h3>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-10 h-10 bg-teal-600 dark:bg-teal-500 rounded-full flex items-center justify-center text-white hover:bg-teal-700 dark:hover:bg-teal-400 transition-colors"
                    >
                      <FaTwitter />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-teal-600 dark:bg-teal-500 rounded-full flex items-center justify-center text-white hover:bg-teal-700 dark:hover:bg-teal-400 transition-colors"
                    >
                      <FaFacebook />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-teal-600 dark:bg-teal-500 rounded-full flex items-center justify-center text-white hover:bg-teal-700 dark:hover:bg-teal-400 transition-colors"
                    >
                      <FaYoutube />
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 bg-teal-600 dark:bg-teal-500 rounded-full flex items-center justify-center text-white hover:bg-teal-700 dark:hover:bg-teal-400 transition-colors"
                    >
                      <FaInstagram />
                    </a>
                  </div>
                </div>
              </div>

              {/* Right Column - Contact Form */}
              <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 border border-gray-100 dark:border-gray-700">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Send us a Message
                </h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="subject"
                      required
                      className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Enter subject"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={6}
                      className="w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-4 py-3 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 resize-none placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Enter your message"
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-teal-600 dark:bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 dark:hover:bg-teal-400 transition-colors duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          )}

          {/* Find Us Section */}
          <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center">
              Find Us
            </h2>
            <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 flex flex-col items-center justify-center relative">
              <FaMapMarkerAlt className="text-4xl text-gray-400 dark:text-gray-500 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 text-center">
                Interactive map will be displayed here
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-center mt-2">
                Plot No-741, 2nd Floor, Jayadev Vihar, 751013
                <br />
                Bhubaneswar, Odisha
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-1">
              <h3 className="text-2xl font-bold text-teal-400 mb-4">
                CodeIntervu
              </h3>
              <p className="text-gray-300 mb-4">
                We deliver comprehensive programming education and interview
                preparation straight to your screen. Trusted by thousands, we
                aim to make your coding journey simple and successful.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="/"
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/courses"
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                  >
                    Courses
                  </a>
                </li>
                <li>
                  <a
                    href="/compiler"
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                  >
                    Compiler
                  </a>
                </li>
                <li>
                  <a
                    href="/whiteboard"
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                  >
                    Whiteboard
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Need Help */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Need Help?</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                  >
                    FAQs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                  >
                    Support Center
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a
                    href="/contact"
                    className="text-gray-300 hover:text-teal-400 transition-colors"
                  >
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* Follow Us */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4 mb-4">
                <a
                  href="#"
                  className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-700 transition-colors"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-700 transition-colors"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-700 transition-colors"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center text-white hover:bg-teal-700 transition-colors"
                >
                  <FaYoutube />
                </a>
              </div>
              <div className="text-gray-300 text-sm">
                <p>📧 info@codeintervu.com</p>
                <p>📞 0674-2361252</p>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-12 pt-8 text-center">
            <p className="text-gray-400">
              Copyright 2025 © CodeIntervu. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Animation classes */}
      <style>{`
        .animate-fade-in {
          animation: fade-in 1s ease-in-out;
        }
        .animate-slide-up {
          animation: slide-up 1s ease-out;
        }
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </>
  );
};

export default Contact;
