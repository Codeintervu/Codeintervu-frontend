import axios from "axios";

// API base URL configuration
const getApiBaseUrl = () => {
  // Use environment variable if available
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Check if we're in production (deployed on codeintervu.com)
  if (
    window.location.hostname === "codeintervu.com" ||
    window.location.hostname === "www.codeintervu.com"
  ) {
    return "https://codeintervu-backend.onrender.com/api";
  }

  // For development, use deployed backend for testing
  return "https://codeintervu-backend.onrender.com/api";
};

// Create axios instance with default configuration
const api = axios.create({
  baseURL: getApiBaseUrl(),
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("API Error:", error);

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Unauthorized - clear token and redirect to login
      localStorage.removeItem("adminToken");
      window.location.href = "/admin/login";
    }

    return Promise.reject(error);
  }
);

export default api;
