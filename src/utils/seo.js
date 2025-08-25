// SEO Utility Functions
export const generateSEOTags = ({
  title,
  description,
  keywords = "",
  image = "/assets/images/og-default.jpg",
  url = "",
  type = "website",
  author = "CodeIntervu",
}) => {
  const baseUrl = "https://codeintervu.com";
  const fullUrl = url ? `${baseUrl}${url}` : baseUrl;
  const fullImage = image.startsWith("http") ? image : `${baseUrl}${image}`;

  return {
    title: title
      ? `${title} | CodeIntervu`
      : "CodeIntervu - Learn Programming & Ace Interviews",
    description:
      description ||
      "Master programming with comprehensive courses, practice coding, and prepare for technical interviews. Learn Java, Python, Data Science, and more.",
    keywords:
      keywords ||
      "programming, coding, java, python, data science, machine learning, web development, interview preparation, online courses",
    image: fullImage,
    url: fullUrl,
    type,
    author,
  };
};

export const generateStructuredData = (data) => {
  const baseStructuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CodeIntervu",
    url: "https://codeintervu.com",
    logo: "https://codeintervu.com/assets/images/logo.png",
    description:
      "Learn programming with comprehensive courses and ace your technical interviews",
    sameAs: [
      "https://twitter.com/codeintervu",
      "https://linkedin.com/company/codeintervu",
    ],
  };

  return { ...baseStructuredData, ...data };
};

export const courseStructuredData = (course) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  name: course.label,
  description: course.description,
  provider: {
    "@type": "Organization",
    name: "CodeIntervu",
    url: "https://codeintervu.com",
  },
  offers: {
    "@type": "Offer",
    price: course.fee.toString(),
    priceCurrency: "INR",
  },
  courseMode: "online",
  educationalLevel: "beginner to advanced",
  timeRequired: course.duration,
});
