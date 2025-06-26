import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "Why choose CodeIntervu?",
    answer:
      "We offer a modern, interactive platform for learning programming with real-time code execution, curated tutorials, and a supportive community.",
  },
  {
    question: "Is CodeIntervu free to use?",
    answer:
      "Yes! All our tutorials and the online compiler are free for everyone.",
  },
  {
    question: "What programming languages can I learn?",
    answer:
      "You can learn Java, Python, C, C++, and JavaScript, with more languages coming soon.",
  },
  {
    question: "Can I run code online?",
    answer:
      "Absolutely! Our built-in online compiler lets you write, run, and test code instantly in your browser.",
  },
  {
    question: "How do I get support if I'm stuck?",
    answer:
      "You can reach out via our contact page or join our community forums for help from peers and mentors.",
  },
  {
    question: "Is there a certificate after course completion?",
    answer:
      "We are working on adding certification for completed courses—stay tuned!",
  },
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="w-full bg-gray-50 dark:bg-gray-900 py-20 px-4 transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-lg font-bold text-center text-teal-600 dark:text-teal-400 mb-2 tracking-widest uppercase">
          FAQ
        </h2>
        <h3 className="text-4xl font-extrabold mb-12 text-center text-gray-900 dark:text-white">
          Any Questions? Answered
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faqs.map((faq, idx) => (
            <div key={idx} className="mb-2">
              <button
                className={`w-full flex items-center justify-between bg-white dark:bg-gray-800 rounded-xl px-6 py-5 text-left focus:outline-none transition-all duration-200 border border-gray-100 dark:border-gray-700 shadow-sm ${
                  openIndex === idx
                    ? "ring-2 ring-teal-200 dark:ring-teal-700"
                    : ""
                }`}
                onClick={() => toggle(idx)}
                aria-expanded={openIndex === idx}
              >
                <span className="text-lg font-semibold text-gray-900 dark:text-white">
                  {faq.question}
                </span>
                <span className="text-teal-600 dark:text-teal-400">
                  {openIndex === idx ? (
                    <ChevronUp size={24} />
                  ) : (
                    <ChevronDown size={24} />
                  )}
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 rounded-b-xl border-t border-gray-100 dark:border-gray-700 px-6 ${
                  openIndex === idx
                    ? "max-h-40 opacity-100 py-4"
                    : "max-h-0 opacity-0 py-0"
                }`}
              >
                <p className="text-gray-700 dark:text-gray-300">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
