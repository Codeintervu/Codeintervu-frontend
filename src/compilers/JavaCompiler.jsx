import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "../components/Breadcrumb";
import OnlineCompiler from "./OnlineCompiler";

const JavaCompiler = () => {
  return (
    <>
      <Helmet>
        <title>Java Compiler - Online Java Code Editor | CodeIntervu</title>
        <meta
          name="description"
          content="Write, compile and run Java code online with our free Java compiler. Practice Java programming with instant feedback and no setup required."
        />
        <meta
          name="keywords"
          content="java compiler, online java editor, java programming, compile java online, java code runner"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Java Compiler - Online Java Code Editor | CodeIntervu"
        />
        <meta
          property="og:description"
          content="Write, compile and run Java code online with our free Java compiler. Practice Java programming with instant feedback."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://codeintervu.com/compilers/java-compiler"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Java Compiler - Online Java Code Editor | CodeIntervu"
        />
        <meta
          name="twitter:description"
          content="Write, compile and run Java code online with our free Java compiler. Practice Java programming with instant feedback."
        />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      <OnlineCompiler language="java" />
    </>
  );
};

export default JavaCompiler;
