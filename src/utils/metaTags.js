// Utility for managing dynamic meta tags for social media sharing

export const updateMetaTags = (metaData) => {
  const {
    title,
    description,
    image,
    url,
    type = "website",
    siteName = "CodeIntervu",
    tags = "",
  } = metaData;

  // Update or create meta tags
  const metaTags = {
    // Basic meta tags
    title: title,
    description: description,

    // Open Graph tags (Facebook, LinkedIn)
    "og:title": title,
    "og:description": description,
    "og:image": image,
    "og:url": url,
    "og:type": type,
    "og:site_name": siteName,

    // Twitter Card tags
    "twitter:card": "summary_large_image",
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": image,
    "twitter:url": url,

    // Additional tags
    keywords: tags,
  };

  // Update each meta tag
  Object.entries(metaTags).forEach(([name, content]) => {
    if (!content) return;

    let element =
      document.querySelector(`meta[name="${name}"]`) ||
      document.querySelector(`meta[property="${name}"]`);

    if (name === "title") {
      // Update document title
      document.title = content;
      return;
    }

    if (!element) {
      element = document.createElement("meta");
      if (name.startsWith("og:")) {
        element.setAttribute("property", name);
      } else if (name.startsWith("twitter:")) {
        element.setAttribute("name", name);
      } else {
        element.setAttribute("name", name);
      }
      document.head.appendChild(element);
    }

    element.setAttribute("content", content);
  });
};

export const resetMetaTags = () => {
  const defaultMeta = {
    title: "CodeIntervu - Learn Programming & Crack Coding Interviews",
    description:
      "CodeIntervu: The best place to learn programming and crack coding interviews with hands-on tutorials and compilers.",
    image: `${window.location.origin}/assets/images/logo.png`,
    url: window.location.origin,
    type: "website",
    siteName: "CodeIntervu",
    tags: "programming, coding, interviews, tutorials, compilers",
  };

  updateMetaTags(defaultMeta);
};

export const generateQuestionMetaTags = (question) => {
  if (!question) return;

  const shareUrl = `${window.location.origin}/interview-questions/${
    question.category
  }/${question.question
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .replace(/\s+/g, "-")
    .substring(0, 50)}`;

  const metaData = {
    title: `${question.categoryName || question.category} Interview Question: ${
      question.question
    }`,
    description:
      question.answer.length > 150
        ? `${question.answer.substring(0, 150)}...`
        : question.answer,
    image: `${window.location.origin}/assets/images/logo.png`,
    url: shareUrl,
    type: "article",
    siteName: "CodeIntervu",
    tags: `${question.tags?.join(", ") || ""}, ${
      question.categoryName || question.category
    }, interview questions, programming`,
  };

  updateMetaTags(metaData);
};
