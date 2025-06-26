import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import MainContent from "../components/MainContent";

const jdbcSidebar = [
  "JDBC HOME",
  "JDBC Intro",
  "JDBC Drivers",
  "JDBC Connections",
  "JDBC Statements",
  "JDBC ResultSet",
  "JDBC Transactions",
  "JDBC PreparedStatement",
  "JDBC CallableStatement",
  "JDBC Batch Processing",
  "JDBC Stored Procedures",
];

const jdbcContent = {
  "JDBC HOME": {
    title: "JDBC Tutorial",
    content:
      "JDBC (Java Database Connectivity) is an API for connecting and executing queries with databases in Java.",
  },
  "JDBC Intro": {
    title: "JDBC Introduction",
    content: "JDBC helps Java applications interact with databases using SQL.",
  },
  "JDBC Drivers": {
    title: "JDBC Drivers",
    content:
      "JDBC drivers are required for connecting Java applications to databases. There are four types of JDBC drivers.",
  },
  "JDBC Connections": {
    title: "JDBC Connections",
    content:
      "A JDBC connection is established using the DriverManager class and a database URL.",
  },
  // All other headings will show 'content is coming' by default
};

const JdbcPage = () => {
  const [selected, setSelected] = useState(jdbcSidebar[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { title, content } = jdbcContent[selected] || {
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
        items={jdbcSidebar}
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

export default JdbcPage;
