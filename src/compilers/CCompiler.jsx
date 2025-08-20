import React from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "../components/Breadcrumb";
import OnlineCompiler from "./OnlineCompiler";

const CCompiler = () => {
  return (
    <>
      <Helmet>
        <title>C Compiler - Online C Code Editor | CodeIntervu</title>
        <meta
          name="description"
          content="Write, compile and run C code online with our free C compiler. Practice C programming with instant feedback and no setup required."
        />
        <meta
          name="keywords"
          content="c compiler, online c editor, c programming, compile c online, c code runner"
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="C Compiler - Online C Code Editor | CodeIntervu"
        />
        <meta
          property="og:description"
          content="Write, compile and run C code online with our free C compiler. Practice C programming with instant feedback."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://codeintervu.com/compilers/c-compiler"
        />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="C Compiler - Online C Code Editor | CodeIntervu"
        />
        <meta
          name="twitter:description"
          content="Write, compile and run C code online with our free C compiler. Practice C programming with instant feedback."
        />
      </Helmet>

      {/* Breadcrumb Navigation */}
      <Breadcrumb />

      <OnlineCompiler language="c" />
    </>
  );
};

export default CCompiler;
