import React from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "../components/Breadcrumb";
import OnlineCompiler from "./OnlineCompiler";

const PythonCompiler = () => {
  return (
    <>
      <Helmet>
        <title>Python Compiler - Online Python Code Editor | CodeIntervu</title>
        <meta
          name="description"
          content="Write, compile and run Python code online with our free Python compiler. Practice Python programming with instant feedback and no setup required."
        />
        <meta
          name="keywords"
          content="python compiler, online python editor, python programming, compile python online, python code runner"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Python Compiler - Online Python Code Editor | CodeIntervu"
        />
        <meta
          property="og:description"
          content="Write, compile and run Python code online with our free Python compiler. Practice Python programming with instant feedback."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://codeintervu.com/compilers/python-compiler"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Python Compiler - Online Python Code Editor | CodeIntervu"
        />
        <meta
          name="twitter:description"
          content="Write, compile and run Python code online with our free Python compiler. Practice Python programming with instant feedback."
        />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      <OnlineCompiler language="python" />
    </>
  );
};

export default PythonCompiler;
