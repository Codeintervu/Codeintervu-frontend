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
  // Remove structured data
  const existingScript = document.querySelector(
    'script[type="application/ld+json"]'
  );
  if (existingScript) {
    existingScript.remove();
  }

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

  // Create a more engaging description for social sharing
  const difficultyEmoji = {
    Easy: "🟢",
    Medium: "🟡",
    Hard: "🔴",
  };

  const difficultyBadge = difficultyEmoji[question.difficulty] || "⚪";

  // Create a rich description with difficulty, category, and answer preview
  const description = `${difficultyBadge} ${question.difficulty} | ${
    question.categoryName || question.category
  }

${
  question.answer.length > 120
    ? `${question.answer.substring(0, 120)}...`
    : question.answer
}

💡 Learn more on CodeIntervu - Your ultimate programming interview prep platform!`;

  // Use dynamic preview image from backend
  const previewImage = question._id
    ? `https://codeintervu-backend.onrender.com/api/interview-questions/${question._id}/preview-image`
    : `${window.location.origin}/assets/images/logo.png`;

  const metaData = {
    title: `${question.question} - ${
      question.categoryName || question.category
    } Interview Question`,
    description: description,
    image: previewImage,
    url: shareUrl,
    type: "article",
    siteName: "CodeIntervu",
    tags: `${question.tags?.join(", ") || ""}, ${
      question.categoryName || question.category
    }, interview questions, programming, ${question.difficulty.toLowerCase()}`,
  };

  updateMetaTags(metaData);

  // Add structured data for better SEO and rich snippets
  addStructuredData(question, shareUrl);
};

// Add structured data (JSON-LD) for better SEO
export const addStructuredData = (question, url) => {
  // Remove existing structured data
  const existingScript = document.querySelector(
    'script[type="application/ld+json"]'
  );
  if (existingScript) {
    existingScript.remove();
  }

  // Use dynamic preview image from backend
  const previewImage = question._id
    ? `https://codeintervu-backend.onrender.com/api/interview-questions/${question._id}/preview-image`
    : `${window.location.origin}/assets/images/logo.png`;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: question.question,
    description:
      question.answer.length > 200
        ? `${question.answer.substring(0, 200)}...`
        : question.answer,
    image: previewImage,
    url: url,
    author: {
      "@type": "Organization",
      name: "CodeIntervu",
    },
    publisher: {
      "@type": "Organization",
      name: "CodeIntervu",
      logo: {
        "@type": "ImageObject",
        url: `${window.location.origin}/assets/images/logo.png`,
      },
    },
    datePublished: question.createdAt || new Date().toISOString(),
    dateModified: question.updatedAt || new Date().toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    keywords: `${question.tags?.join(", ") || ""}, ${
      question.categoryName || question.category
    }, interview questions, programming, ${question.difficulty.toLowerCase()}`,
    articleSection: question.categoryName || question.category,
    articleBody: question.answer,
    educationalLevel: "Intermediate",
    learningResourceType: "Question",
    educationalUse: "Interview Preparation",
  };

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.textContent = JSON.stringify(structuredData);
  document.head.appendChild(script);
};
