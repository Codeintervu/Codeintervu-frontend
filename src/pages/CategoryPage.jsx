import React, { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { FiLoader, FiAlertTriangle } from "react-icons/fi";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Menu, X } from "lucide-react";
import Navbar from "../components/Navbar";
import { escapeHtml } from "../utils/escapeHtml";

const LoadingSpinner = () => (
  <div className="flex justify-center items-center h-64">
    <FiLoader className="animate-spin text-4xl text-teal-500" />
  </div>
);

const ErrorDisplay = ({ message }) => (
  <div
    className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4"
    role="alert"
  >
    <FiAlertTriangle className="mx-auto text-5xl text-red-500 mb-4" />
    <h1 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h1>
    <p>{message}</p>
  </div>
);

const ImageSlideshow = ({ images, altText }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) {
    return null;
  }

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0;
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1;
    const newIndex = isLastImage ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };

  return (
    <div className="relative my-4">
      <img
        src={images[currentIndex]}
        alt={`${altText} ${currentIndex + 1}`}
        className="rounded-lg shadow-md block mx-auto"
      />
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            &#10094;
          </button>
          <button
            onClick={goToNext}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full"
          >
            &#10095;
          </button>
        </>
      )}
    </div>
  );
};

const CompilerBlock = ({ language, initialCode, editable }) => {
  const [code, setCode] = useState(initialCode || "");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRun = async () => {
    setLoading(true);
    setOutput("");
    try {
      // Map language to Judge0 language_id
      const langMap = { java: 62, python: 71, cpp: 54 };
      const language_id = langMap[language] || 62;
      let codeToSend = code;
      if (language === "java") {
        // Replace the first occurrence of 'class <Name>' with 'class Main'
        codeToSend = code.replace(/class\s+\w+/, "class Main");
      }
      const res = await axios.post(
        "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
        {
          source_code: codeToSend,
          language_id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "X-RapidAPI-Key":
              "be6766c2cdmsh1014f6bba39facap1eb9c0jsne168ae4664f9", // NOTE: Replace 'YOUR_RAPIDAPI_KEY' with your actual RapidAPI key for Judge0 API
            "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
          },
        }
      );
      setOutput(
        res.data.stdout ||
          res.data.stderr ||
          res.data.compile_output ||
          "No output"
      );
    } catch (err) {
      setOutput("Error: " + (err.response?.data?.error || err.message));
    }
    setLoading(false);
  };

  return (
    <div className="my-6 bg-gray-900 p-4 rounded-lg">
      <label className="block font-bold mb-2 text-white">
        Try it yourself ({language}):
      </label>
      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="w-full font-mono bg-gray-800 text-white p-2 rounded"
        rows={8}
        readOnly={editable === false}
      />
      <button
        onClick={handleRun}
        className="mt-2 px-4 py-2 bg-green-600 text-white rounded font-bold"
        disabled={loading}
      >
        {loading ? "Running..." : "Run"}
      </button>
      {output && (
        <pre className="mt-4 bg-black text-green-400 p-3 rounded overflow-x-auto">
          {output}
        </pre>
      )}
    </div>
  );
};

const TutorialContent = ({ tutorial }) => (
  <article
    id={tutorial._id}
    className="prose dark:prose-invert lg:prose-xl max-w-none"
  >
    {tutorial.sections && tutorial.sections.length > 0 ? (
      tutorial.sections.map((section, index) => (
        <section key={index} className="mb-12">
          {section.heading && (
            <h2 className="text-3xl font-bold mt-8 mb-4 border-b pb-2">
              {section.heading}
            </h2>
          )}

          {section.contentBlocks && section.contentBlocks.length > 0 ? (
            section.contentBlocks.map((block, blockIndex) => (
              <div key={blockIndex} className="mb-6">
                {block.subheading && (
                  <h3 className="text-2xl font-semibold mt-6 mb-2">
                    {block.subheading}
                  </h3>
                )}
                {block.content && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: escapeHtml(block.content).replace(
                        /\n/g,
                        "<br />"
                      ),
                    }}
                  />
                )}
                {block.syntaxEnabled && block.syntax && (
                  <div className="my-4">
                    <SyntaxHighlighter
                      language={
                        (block.compiler && block.compiler.language) || "java"
                      }
                      style={vscDarkPlus}
                      customStyle={{
                        borderLeft: "4px solid #2ec4b6",
                        background: "#19212c",
                        margin: 0,
                        padding: "1em",
                        borderRadius: "0.5em",
                        fontSize: "1em",
                      }}
                      codeTagProps={{
                        style: { fontFamily: "Fira Mono, monospace" },
                      }}
                    >
                      {block.syntax}
                    </SyntaxHighlighter>
                  </div>
                )}
                {block.mediaUrl && (
                  <img
                    src={block.mediaUrl}
                    alt={block.subheading || "Content Media"}
                    className="my-4 rounded-lg shadow-md block mx-auto max-w-full h-auto"
                  />
                )}
                {block.compiler?.enabled && (
                  <CompilerBlock
                    language={block.compiler.language}
                    initialCode={block.compiler.boilerplate}
                    editable={block.compiler.editable}
                  />
                )}
              </div>
            ))
          ) : (
            <>
              {section.subheading && (
                <h3 className="text-2xl font-semibold mt-6 mb-2">
                  {section.subheading}
                </h3>
              )}
              {section.content && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: escapeHtml(section.content).replace(
                      /\n/g,
                      "<br />"
                    ),
                  }}
                />
              )}
            </>
          )}

          {section.mediaUrl && (
            <img
              src={section.mediaUrl}
              alt={section.heading || "Tutorial Media"}
              className="my-4 rounded-lg shadow-md block mx-auto max-w-full h-auto"
            />
          )}
          {section.youtubeUrl && (
            <div className="flex justify-center">
              <div className="aspect-w-16 aspect-h-9 my-4 w-full">
                <iframe
                  src={`https://www.youtube.com/embed/${
                    section.youtubeUrl.split("v=")[1]
                  }`}
                  title={section.heading || "YouTube Video"}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg shadow-md"
                ></iframe>
              </div>
            </div>
          )}
          {section.compiler?.enabled && (
            <CompilerBlock
              language={section.compiler.language}
              initialCode={section.compiler.boilerplate}
            />
          )}
        </section>
      ))
    ) : (
      <p>This tutorial has no content yet.</p>
    )}
  </article>
);

const CategoryPage = () => {
  const { categoryPath, tutorialSlug } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [category, setCategory] = useState(null);
  const [tutorials, setTutorials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTutorial, setActiveTutorial] = useState(null);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);

        const allCategoriesRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/categories`
        );
        const currentCategory = allCategoriesRes.data.find(
          (c) => c.path.replace(/^\/*/, "") === categoryPath
        );

        if (!currentCategory) {
          throw new Error("Category not found");
        }

        setCategory(currentCategory);

        const tutorialsRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/tutorials?category=${
            currentCategory._id
          }`
        );
        setTutorials(tutorialsRes.data);
      } catch (err) {
        setError("Failed to load tutorial data. Please try again.");
        console.error("Error fetching category page data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [categoryPath]);

  useEffect(() => {
    if (tutorials.length > 0) {
      let tutorialToShow = null;
      if (tutorialSlug) {
        tutorialToShow = tutorials.find((t) => t.slug === tutorialSlug);
      }
      setActiveTutorial(tutorialToShow || tutorials[0]);
    } else {
      setActiveTutorial(null);
    }
  }, [tutorials, tutorialSlug]);

  useEffect(() => {
    if (activeTutorial && activeTutorial.slug !== tutorialSlug) {
      // Sync URL if needed
      navigate(`/${categoryPath}/${activeTutorial.slug}`, { replace: true });
    }
    if (activeTutorial) {
      // Scroll to the top of the tutorial content
      const el = document.getElementById(activeTutorial._id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  }, [activeTutorial, categoryPath, tutorialSlug, navigate]);

  const handleSidebarClick = (slug) => {
    const tutorial = tutorials.find((t) => t.slug === slug);
    setActiveTutorial(tutorial);
    navigate(`/${categoryPath}/${slug}`);
    setMobileSidebarOpen(false);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorDisplay message={error} />;

  return (
    <>
      <Navbar tutorials={tutorials} />
      <div className="container mx-auto px-4 py-8">
        {tutorials.length > 0 ? (
          <div className="flex flex-col md:flex-row gap-8">
            <button
              className="md:hidden fixed top-4 left-4 z-50 bg-white dark:bg-gray-900 rounded-full p-2 shadow-lg border border-gray-200 dark:border-gray-700"
              onClick={() => setMobileSidebarOpen(true)}
              aria-label="Open tutorial sidebar"
            >
              <Menu size={28} />
            </button>
            <div
              className={`fixed inset-0 z-40 flex md:hidden transition-all duration-300 ${
                mobileSidebarOpen ? "" : "pointer-events-none"
              }`}
            >
              <div
                className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity ${
                  mobileSidebarOpen ? "opacity-100" : "opacity-0"
                }`}
                onClick={() => setMobileSidebarOpen(false)}
              />
              <aside
                className={`relative w-64 bg-gray-50 dark:bg-gray-800 h-full shadow-lg transform transition-transform ${
                  mobileSidebarOpen ? "translate-x-0" : "-translate-x-full"
                }`}
              >
                <div className="flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold text-teal-600 dark:text-teal-400">
                    Tutorials
                  </h2>
                  <button
                    onClick={() => setMobileSidebarOpen(false)}
                    aria-label="Close sidebar"
                  >
                    <span className="text-2xl">&times;</span>
                  </button>
                </div>
                <nav className="p-4">
                  <ul className="space-y-2">
                    {tutorials.map((tutorial) => (
                      <li key={tutorial._id}>
                        <a
                          href={`/${categoryPath}/${tutorial.slug}`}
                          className={`block px-4 py-2 rounded-md font-semibold whitespace-normal transition-colors duration-150 ${
                            activeTutorial?.slug === tutorial.slug
                              ? "bg-teal-100 dark:bg-gray-700 text-teal-700 dark:text-teal-300"
                              : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleSidebarClick(tutorial.slug);
                          }}
                          title={tutorial.title}
                        >
                          {tutorial.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            </div>
            <aside className="hidden md:block md:w-72 bg-gray-50 dark:bg-gray-800 rounded-lg shadow self-start top-20 sticky p-6">
              <h2 className="text-2xl font-bold mb-6 text-teal-600 dark:text-teal-400">
                Tutorials
              </h2>
              <nav>
                <ul className="space-y-2">
                  {tutorials.map((tutorial) => (
                    <li key={tutorial._id}>
                      <a
                        href={`/${categoryPath}/${tutorial.slug}`}
                        className={`block px-4 py-2 rounded-md font-semibold whitespace-normal transition-colors duration-150 ${
                          activeTutorial?.slug === tutorial.slug
                            ? "bg-teal-100 dark:bg-gray-700 text-teal-700 dark:text-teal-300"
                            : "text-gray-900 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700"
                        }`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSidebarClick(tutorial.slug);
                        }}
                        title={tutorial.title}
                      >
                        {tutorial.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </aside>
            <main className="w-full md:flex-1">
              {activeTutorial ? (
                <TutorialContent tutorial={activeTutorial} />
              ) : (
                <div className="text-center py-16">
                  <h2 className="text-2xl font-semibold">
                    Select a tutorial to begin.
                  </h2>
                </div>
              )}
            </main>
            <aside className="w-full md:w-64 order-3 md:order-none mt-8 md:mt-0">
              {/* Blank space for organic ad area, no visible content or border */}
            </aside>
          </div>
        ) : (
          <div className="text-center py-16">
            <h2 className="text-2xl font-semibold">
              No tutorials have been added to this category yet.
            </h2>
            <p className="text-gray-500 mt-2">Check back soon!</p>
          </div>
        )}
      </div>
    </>
  );
};

export default CategoryPage;
