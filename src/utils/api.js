import axios from "axios";

// API base URL configuration - Always use deployed backend
const getApiBaseUrl = () => {
  // Always use the deployed backend URL
  return "https://codeintervu-backend.onrender.com/api";
};

// Create axios instance with default configuration
const baseURL = getApiBaseUrl();
console.log("Frontend API Base URL:", baseURL);

const api = axios.create({
  baseURL: baseURL,
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
