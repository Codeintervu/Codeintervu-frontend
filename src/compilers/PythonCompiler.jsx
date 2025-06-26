import React from "react";
import OnlineCompiler from "./OnlineCompiler";

const PythonCompiler = () => {
  return (
    <section className="pt-8 px-4 min-h-screen bg-white dark:bg-gray-900">
      <div className="w-full max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
          Python Online Compiler
        </h1>
        <p className="mb-8 text-gray-700 dark:text-gray-300">
          Write, compile, and run Python code instantly in your browser. No
          setup required!
        </p>
        <OnlineCompiler language="python" />
      </div>
    </section>
  );
};

export default PythonCompiler;
