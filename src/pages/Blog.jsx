import React from "react";
import Navbar from "../components/Navbar";

const Blog = () => {
  return (
    <>
      <Navbar />
      <section className="pt-32 px-6">
        <h1 className="text-4xl font-bold text-center mb-6">Blog</h1>
        <p className="text-center max-w-2xl mx-auto">Read our latest tech articles, tips, and learning resources.</p>
      </section>
    </>
  );
};

export default Blog;
