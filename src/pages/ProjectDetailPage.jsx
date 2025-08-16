import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../utils/api";

const mernProject = {
  name: "MERN Stack Project - EverWrite",
  description:
    "EverWrite is a modern note-taking app that lets users create, edit, search, and manage notes in real-time with a clean UI.",
  features: [
    "User Authentication (JWT)",
    "Role-based access (Admin/User)",
    "CRUD operations for Notes, Tasks, Files",
    "Real-time chat and live updates (Socket.io)",
    "Dark Mode & Responsive Design",
    "File uploads (Cloudinary integration)",
    "Notifications & Email support",
    "Search & filter capabilities",
  ],
  techStack: {
    frontend: "React.js, TailwindCSS, Zustand",
    backend: "Node.js, Express.js",
    database: "MongoDB with Mongoose",
    others: "Cloudinary, Socket.io, JWT, Multer, etc.",
  },
  screenshots: [
    "/assets/images/course-1.jpg",
    "/assets/images/course-2.jpg",
    "/assets/images/course-3.jpg",
  ],
  demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with real video if available
  authentication: [
    "Signup/Login with JWT and cookie-based sessions",
    "Admin vs User flows for different access levels",
  ],
  adminFeatures: ["View all users", "Manage content", "Analytics dashboard"],
  deployment: {
    frontend: "Vercel (Live Link)",
    backend: "Render (API with secure env vars)",
    database: "MongoDB Atlas",
    frontendLink: "https://your-vercel-demo-link.com",
    backendLink: "https://your-render-api-link.com",
  },
  usp: "Unlike basic to-do apps, this project supports real-time note syncing and full-text search with optimized Mongo queries.",
  testingSecurity: [
    "Form validation with Yup",
    "Backend input validation",
    "Security: Rate-limiting, Helmet, CORS, etc.",
  ],
  scalability: [
    "Modular folder structure",
    "RESTful API principles",
    "Easily integratable with mobile apps",
  ],
  users: [
    "Freelancers",
    "Small businesses",
    "Educational platforms",
    "Startup MVPs",
  ],
};

const springBootProject = {
  name: "Java Spring Boot Project - E-Commerce Platform",
  description:
    "A comprehensive e-commerce platform built with Spring Boot that provides complete online shopping experience with inventory management, payment processing, and order tracking.",
  features: [
    "User Authentication & Authorization (Spring Security)",
    "Product Catalog with Categories and Search",
    "Shopping Cart and Wishlist Management",
    "Payment Integration (Stripe/PayPal)",
    "Order Management and Tracking",
    "Admin Dashboard for Inventory Control",
    "Email Notifications and Reports",
    "RESTful API with Swagger Documentation",
  ],
  techStack: {
    frontend: "Thymeleaf, Bootstrap, JavaScript",
    backend: "Spring Boot 3.x, Spring Security, Spring Data JPA",
    database: "MySQL/PostgreSQL with Hibernate",
    others: "Maven, Swagger, JWT, Email Service, etc.",
  },
  screenshots: [
    "/assets/images/course-1.jpg",
    "/assets/images/course-2.jpg",
    "/assets/images/course-3.jpg",
  ],
  demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  authentication: [
    "Spring Security with JWT token authentication",
    "Role-based access control (Admin, Customer, Manager)",
  ],
  adminFeatures: [
    "Product management",
    "Order tracking",
    "User management",
    "Analytics dashboard",
  ],
  deployment: {
    frontend: "AWS S3 (Static hosting)",
    backend: "AWS EC2 or Heroku",
    database: "AWS RDS or PostgreSQL",
    frontendLink: "https://your-spring-demo-link.com",
    backendLink: "https://your-spring-api-link.com",
  },
  usp: "Complete e-commerce solution with microservices architecture, scalable design, and enterprise-level security features.",
  testingSecurity: [
    "Unit testing with JUnit and Mockito",
    "Integration testing with TestContainers",
    "Security: Spring Security, CORS, CSRF protection",
  ],
  scalability: [
    "Microservices architecture",
    "Docker containerization",
    "Horizontal scaling capabilities",
  ],
  users: [
    "E-commerce startups",
    "Retail businesses",
    "Online marketplaces",
    "Enterprise companies",
  ],
};

const machineLearningProject = {
  name: "Machine Learning Project - Predictive Analytics Platform",
  description:
    "An advanced ML platform that provides predictive analytics, data visualization, and automated model training for business intelligence and decision making.",
  features: [
    "Multiple ML Algorithms (Regression, Classification, Clustering)",
    "Automated Model Training and Hyperparameter Tuning",
    "Real-time Data Processing and Visualization",
    "Model Performance Metrics and Comparison",
    "Data Preprocessing and Feature Engineering",
    "API for Model Deployment and Inference",
    "Interactive Dashboards with Plotly/Dash",
    "Automated Report Generation",
  ],
  techStack: {
    frontend: "Streamlit, Plotly, HTML/CSS",
    backend: "Python, FastAPI, Flask",
    database: "PostgreSQL, Redis for caching",
    others: "Scikit-learn, Pandas, NumPy, Docker, etc.",
  },
  screenshots: [
    "/assets/images/course-1.jpg",
    "/assets/images/course-2.jpg",
    "/assets/images/course-3.jpg",
  ],
  demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  authentication: [
    "JWT-based authentication for API access",
    "Role-based permissions for different user types",
  ],
  adminFeatures: [
    "Model management",
    "User analytics",
    "System monitoring",
    "Data pipeline management",
  ],
  deployment: {
    frontend: "Streamlit Cloud or Heroku",
    backend: "AWS Lambda or Google Cloud Functions",
    database: "AWS RDS or Google Cloud SQL",
    frontendLink: "https://your-ml-demo-link.com",
    backendLink: "https://your-ml-api-link.com",
  },
  usp: "End-to-end ML pipeline with automated model selection, real-time predictions, and comprehensive analytics dashboard.",
  testingSecurity: [
    "Model validation and testing",
    "Data security and privacy compliance",
    "API rate limiting and authentication",
  ],
  scalability: [
    "Containerized deployment with Docker",
    "Cloud-native architecture",
    "Auto-scaling capabilities",
  ],
  users: [
    "Data scientists",
    "Business analysts",
    "Research institutions",
    "Startups with ML needs",
  ],
};

const deepLearningProject = {
  name: "Deep Learning Project - Computer Vision System",
  description:
    "A sophisticated computer vision system using deep learning for image classification, object detection, and facial recognition with real-time processing capabilities.",
  features: [
    "CNN-based Image Classification (ResNet, VGG, EfficientNet)",
    "Real-time Object Detection (YOLO, SSD)",
    "Facial Recognition and Emotion Detection",
    "Image Segmentation and Instance Segmentation",
    "Transfer Learning and Fine-tuning",
    "Real-time Video Processing",
    "Model Optimization and Quantization",
    "Web-based Interface for Upload and Analysis",
  ],
  techStack: {
    frontend: "React.js, TensorFlow.js, Three.js",
    backend: "Python, FastAPI, TensorFlow/PyTorch",
    database: "MongoDB for image metadata, Redis for caching",
    others: "OpenCV, CUDA, Docker, GPU acceleration, etc.",
  },
  screenshots: [
    "/assets/images/course-1.jpg",
    "/assets/images/course-2.jpg",
    "/assets/images/course-3.jpg",
  ],
  demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  authentication: [
    "OAuth2 with JWT tokens",
    "API key management for model access",
  ],
  adminFeatures: [
    "Model versioning",
    "Performance monitoring",
    "Dataset management",
    "GPU resource allocation",
  ],
  deployment: {
    frontend: "Vercel or Netlify",
    backend: "AWS EC2 with GPU instances or Google Cloud AI Platform",
    database: "MongoDB Atlas, Redis Cloud",
    frontendLink: "https://your-dl-demo-link.com",
    backendLink: "https://your-dl-api-link.com",
  },
  usp: "Production-ready computer vision system with GPU acceleration, real-time processing, and comprehensive model management.",
  testingSecurity: [
    "Model accuracy validation",
    "Adversarial attack testing",
    "Data privacy and GDPR compliance",
  ],
  scalability: [
    "GPU cluster management",
    "Distributed training capabilities",
    "Auto-scaling based on demand",
  ],
  users: [
    "AI researchers",
    "Computer vision engineers",
    "Security companies",
    "Healthcare institutions",
  ],
};

const genAIProject = {
  name: "Generative AI Project - Content Creation Platform",
  description:
    "A cutting-edge generative AI platform that creates text, images, and code using state-of-the-art models like GPT, DALL-E, and Codex for automated content generation.",
  features: [
    "Text Generation (GPT-3/4, BERT, T5)",
    "Image Generation (DALL-E, Stable Diffusion)",
    "Code Generation and Auto-completion",
    "Natural Language Processing Tasks",
    "Multi-modal Content Creation",
    "Custom Model Fine-tuning",
    "API Integration for Third-party Services",
    "Content Moderation and Safety Filters",
  ],
  techStack: {
    frontend: "Next.js, TailwindCSS, React",
    backend: "Python, FastAPI, LangChain",
    database: "PostgreSQL, Vector databases (Pinecone)",
    others: "OpenAI API, Hugging Face, Docker, etc.",
  },
  screenshots: [
    "/assets/images/course-1.jpg",
    "/assets/images/course-2.jpg",
    "/assets/images/course-3.jpg",
  ],
  demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ",
  authentication: [
    "OAuth2 with social login options",
    "API key management for AI model access",
  ],
  adminFeatures: [
    "Model performance tracking",
    "Usage analytics",
    "Content moderation",
    "Cost optimization",
  ],
  deployment: {
    frontend: "Vercel or Netlify",
    backend: "AWS Lambda or Google Cloud Run",
    database: "AWS RDS, Pinecone for vectors",
    frontendLink: "https://your-genai-demo-link.com",
    backendLink: "https://your-genai-api-link.com",
  },
  usp: "Comprehensive generative AI platform with multiple model support, cost optimization, and enterprise-grade security.",
  testingSecurity: [
    "Content safety and bias testing",
    "API rate limiting and abuse prevention",
    "Data privacy and ethical AI compliance",
  ],
  scalability: [
    "Serverless architecture",
    "Auto-scaling based on usage",
    "Multi-region deployment",
  ],
  users: [
    "Content creators",
    "Marketing agencies",
    "Software developers",
    "Educational institutions",
  ],
};

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get(`/projects/key/${projectId}`);
      setProject(response.data.data);
    } catch (error) {
      console.error("Error fetching project:", error);
      setError("Project not found");
      // Fallback to hardcoded data if API fails
      const fallbackProject = getFallbackProject();
      setProject(fallbackProject);
    } finally {
      setLoading(false);
    }
  };

  // Fallback function for hardcoded data
  const getFallbackProject = () => {
    switch (projectId) {
      case "mern":
        return mernProject;
      case "springboot":
        return springBootProject;
      case "ml":
        return machineLearningProject;
      case "dl":
        return deepLearningProject;
      case "genai":
        return genAIProject;
      default:
        return mernProject;
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-3xl">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 rounded w-3/4 mb-4"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-5/6 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-4/6 mb-6"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3 mb-2"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
          <div className="h-4 bg-gray-300 rounded w-3/4 mb-6"></div>
        </div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="container mx-auto px-4 py-10 max-w-3xl text-center">
        <h1 className="text-3xl font-bold mb-4 text-red-600">
          Project Not Found
        </h1>
        <p className="text-gray-600 mb-6">
          The project you're looking for doesn't exist.
        </p>
        <Link
          to="/projects"
          className="bg-teal-600 text-white px-6 py-3 rounded-md hover:bg-teal-700"
        >
          Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-3xl">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-3xl font-bold text-teal-600 dark:text-teal-400">
          {project.name}
        </h1>
        {project.topmateLink && (
          <a
            href={project.topmateLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            Buy Now
          </a>
        )}
      </div>
      {/* 1. Description */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">📌 Project Description</h2>
        <p className="text-gray-700 dark:text-gray-200">
          {project.description}
        </p>
      </section>
      {/* 2. Key Features */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🧩 Key Features</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200">
          {project.features.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </section>
      {/* 3. Tech Stack */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🔧 Tech Stack</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200">
          <li>
            <b>Frontend:</b> {project.techStack.frontend}
          </li>
          <li>
            <b>Backend:</b> {project.techStack.backend}
          </li>
          <li>
            <b>Database:</b> {project.techStack.database}
          </li>
          <li>
            <b>Others:</b> {project.techStack.others}
          </li>
        </ul>
      </section>
      {/* 4. Screenshots / Demo Video */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          📸 Screenshots / Demo Video
        </h2>
        <div className="flex gap-4 mb-4 overflow-x-auto">
          {project.screenshots.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`Screenshot ${i + 1}`}
              className="h-32 rounded shadow"
            />
          ))}
        </div>
        <div className="aspect-w-16 aspect-h-9 mb-2">
          <iframe
            width="100%"
            height="315"
            src={project.demoVideo}
            title="Demo Video"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </section>
      {/* 5. Authentication Logic */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🔐 Authentication Logic</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200">
          {project.authentication.map((a, i) => (
            <li key={i}>{a}</li>
          ))}
        </ul>
      </section>
      {/* 6. Dashboard / Admin Features */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          📊 Dashboard / Admin Features
        </h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200">
          {project.adminFeatures.map((f, i) => (
            <li key={i}>{f}</li>
          ))}
        </ul>
      </section>
      {/* 7. Deployment Info */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🛠️ Deployment Info</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200">
          <li>
            Frontend hosted on {project.deployment.frontend}:{" "}
            <a
              href={project.deployment.frontendLink}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Link
            </a>
          </li>
          <li>
            Backend API deployed on {project.deployment.backend}:{" "}
            <a
              href={project.deployment.backendLink}
              className="text-blue-600 underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              API Link
            </a>
          </li>
          <li>Database: {project.deployment.database}</li>
        </ul>
      </section>
      {/* 8. Unique Selling Points (USP) */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          🔍 Unique Selling Points (USP)
        </h2>
        <p className="text-gray-700 dark:text-gray-200">{project.usp}</p>
      </section>
      {/* 9. Testing and Security */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">🧪 Testing and Security</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200">
          {project.testingSecurity.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
      </section>
      {/* 10. Scalability & Extensibility */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          🚀 Scalability & Extensibility
        </h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200">
          {project.scalability.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </section>
      {/* 11. Who Can Use This? */}
      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">👩‍💼 Who Can Use This?</h2>
        <ul className="list-disc pl-6 text-gray-700 dark:text-gray-200">
          {project.users.map((u, i) => (
            <li key={i}>{u}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default ProjectDetailPage;
