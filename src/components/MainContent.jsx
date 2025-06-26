import React from "react";

const MainContent = ({ title, content }) => (
  <main className="flex-1 p-8 bg-white dark:bg-gray-900">
    <h1 className="text-3xl mb-4 font-bold text-gray-900 dark:text-white">
      {title}
    </h1>
    <p className="text-lg leading-7 text-gray-700 dark:text-gray-300">
      {content}
    </p>
  </main>
);

export default MainContent;
