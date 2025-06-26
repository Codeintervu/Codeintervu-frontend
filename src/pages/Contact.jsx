import React, { useState } from "react";

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="pt-32 px-4 min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 transition-colors duration-300 pb-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-5xl font-extrabold text-gray-800 dark:text-white mb-4 animate-fade-in">
            Get in Touch
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-lg">
            Have a question or want to work together? We'd love to hear from
            you!
          </p>
        </div>

        {submitted ? (
          <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-10 text-center animate-slide-up border border-gray-100 dark:border-gray-700">
            <h2 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-4">
              Thank you for contacting us!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg">
              We'll get back to you soon.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-10 space-y-6 animate-slide-up border border-gray-100 dark:border-gray-700"
          >
            {/* Name */}
            <div className="relative">
              <input
                type="text"
                name="name"
                required
                className="peer w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-4 pt-6 pb-2 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 placeholder-transparent"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500">
                Your Name
              </label>
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                name="email"
                required
                className="peer w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-4 pt-6 pb-2 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 placeholder-transparent"
                placeholder=" "
              />
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500">
                Your Email
              </label>
            </div>

            {/* Message */}
            <div className="relative">
              <textarea
                name="message"
                required
                className="peer w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-white rounded-lg px-4 pt-6 pb-2 h-32 focus:outline-none focus:border-teal-500 dark:focus:border-teal-400 resize-none placeholder-transparent"
                placeholder=" "
              ></textarea>
              <label className="absolute left-4 top-2 text-gray-500 dark:text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 dark:peer-placeholder-shown:text-gray-500">
                Your Message
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-teal-600 dark:bg-teal-500 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 dark:hover:bg-teal-400 hover:scale-[1.02] transition-all duration-300"
            >
              Send Message 🚀
            </button>
          </form>
        )}
      </section>

      {/* Animation classes (can also be moved to a CSS file) */}

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
