import React from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "../components/Breadcrumb";
import OnlineCompiler from "./OnlineCompiler";

const JavaScriptCompiler = () => {
  return (
    <>
      <Helmet>
        <title>JavaScript Compiler - Online JS Code Editor | CodeIntervu</title>
        <meta
          name="description"
          content="Write, compile and run JavaScript code online with our free JavaScript compiler. Practice JS programming with instant feedback and no setup required."
        />
        <meta
          name="keywords"
          content="javascript compiler, online js editor, javascript programming, compile javascript online, js code runner"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="JavaScript Compiler - Online JS Code Editor | CodeIntervu"
        />
        <meta
          property="og:description"
          content="Write, compile and run JavaScript code online with our free JavaScript compiler. Practice JS programming with instant feedback."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://codeintervu.com/compilers/javascript-compiler"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="JavaScript Compiler - Online JS Code Editor | CodeIntervu"
        />
        <meta
          name="twitter:description"
          content="Write, compile and run JavaScript code online with our free JavaScript compiler. Practice JS programming with instant feedback."
        />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      <OnlineCompiler language="javascript" />
    </>
  );
};

export default JavaScriptCompiler;
