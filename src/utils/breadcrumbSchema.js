// Utility for generating breadcrumb structured data
export const generateBreadcrumbSchema = (breadcrumbs) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `https://codeintervu.com${item.path}`,
    })),
  };

  return schema;
};

// Add breadcrumb schema to page
export const addBreadcrumbSchema = (breadcrumbs) => {
  // Remove existing breadcrumb schema
  const existingScript = document.querySelector(
    'script[data-schema="breadcrumb"]'
  );
  if (existingScript) {
    existingScript.remove();
  }

  const schema = generateBreadcrumbSchema(breadcrumbs);

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-schema", "breadcrumb");
  script.textContent = JSON.stringify(schema);
  document.head.appendChild(script);
};

// Generate breadcrumbs for common pages
export const getPageBreadcrumbs = (pathname) => {
  const baseUrl = "https://codeintervu.com";

  const breadcrumbMap = {
    "/about": [
      { name: "Home", path: "/" },
      { name: "About", path: "/about" },
    ],
    "/contact": [
      { name: "Home", path: "/" },
      { name: "Contact", path: "/contact" },
    ],
    "/quiz": [
      { name: "Home", path: "/" },
      { name: "Quiz", path: "/quiz" },
    ],
    "/interview-questions": [
      { name: "Home", path: "/" },
      { name: "Interview Questions", path: "/interview-questions" },
    ],
    "/mock-interviews": [
      { name: "Home", path: "/" },
      { name: "Mock Interviews", path: "/mock-interviews" },
    ],
    "/coding-interviews": [
      { name: "Home", path: "/" },
      { name: "Coding Practice", path: "/coding-interviews" },
    ],
    "/projects": [
      { name: "Home", path: "/" },
      { name: "Projects", path: "/projects" },
    ],
    "/whiteboard": [
      { name: "Home", path: "/" },
      { name: "Whiteboard", path: "/whiteboard" },
    ],
    "/compilers/java-compiler": [
      { name: "Home", path: "/" },
      { name: "Compilers", path: "/compilers" },
      { name: "Java Compiler", path: "/compilers/java-compiler" },
    ],
    "/compilers/python-compiler": [
      { name: "Home", path: "/" },
      { name: "Compilers", path: "/compilers" },
      { name: "Python Compiler", path: "/compilers/python-compiler" },
    ],
    "/compilers/javascript-compiler": [
      { name: "Home", path: "/" },
      { name: "Compilers", path: "/compilers" },
      { name: "JavaScript Compiler", path: "/compilers/javascript-compiler" },
    ],
    "/compilers/c-compiler": [
      { name: "Home", path: "/" },
      { name: "Compilers", path: "/compilers" },
      { name: "C Compiler", path: "/compilers/c-compiler" },
    ],
    "/compilers/cpp-compiler": [
      { name: "Home", path: "/" },
      { name: "Compilers", path: "/compilers" },
      { name: "C++ Compiler", path: "/compilers/cpp-compiler" },
    ],
  };

  return breadcrumbMap[pathname] || [];
};
