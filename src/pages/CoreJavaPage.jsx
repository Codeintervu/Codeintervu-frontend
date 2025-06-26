import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

const coreJavaSidebar = [
  "Java HOME",
  "Java Intro",
  "Java Get Started",
  "Java Syntax",
  "Java Output",
  "Java Comments",
  "Java Variables",
  "Java Data Types",
  "Java Type Casting",
  "Java Operators",
  "Java Strings",
  "Java Math",
  "Java Booleans",
  "Java If...Else",
  "Java Switch",
  "Java While Loop",
  "Java For Loop",
  "Java Break/Continue",
  "Java Arrays",
  "Java Methods",
  "Java Classes",
  "Java Objects",
];

const coreJavaContent = {
  "Java HOME": {
    title: "Java Tutorial",
    content:
      "Java is a popular programming language. Java is used to develop mobile apps, web apps, desktop apps, games and much more.",
  },
  "Java Intro": {
    title: "Java Introduction",
    content:
      "Java was developed by Sun Microsystems in 1995. Java is a high-level, class-based, object-oriented programming language.",
  },
  "Java Get Started": {
    title: "Java Get Started",
    content:
      "To get started with Java, install the JDK and set up your environment variables. Then you can write your first Java program!",
  },
  "Java Syntax": {
    title: "Java Syntax",
    content:
      "Java syntax is similar to C/C++. Every application must have a main method. Statements end with a semicolon.",
  },
  // ...add more demo content for other sections as needed
};

const CoreJavaPage = () => {
  const [selected, setSelected] = useState(coreJavaSidebar[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { title, content } = coreJavaContent[selected] || {
    title: selected,
    content: "Content is coming soon.",
  };

  return (
    <div className="flex relative min-h-screen">
      {/* Hamburger for mobile */}
      <div className="md:hidden">
        <button
          className="fixed top-4 left-4 z-40 bg-white dark:bg-gray-800 p-2 rounded-full shadow-lg border border-gray-200 dark:border-gray-700"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <svg
            width="28"
            height="28"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>
      <Sidebar
        items={coreJavaSidebar}
        onSelect={setSelected}
        selected={selected}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        showHamburger={false}
      />
      <div className="flex-1">
        <MainContent title={title} content={content} />
      </div>
    </div>
  );
};

export default CoreJavaPage;
