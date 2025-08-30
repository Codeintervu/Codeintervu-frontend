import axios from "axios";
import { measureAPI } from "./performance";

// Backend URL configuration
const baseURL = "https://codeintervu-backend.onrender.com/api";
// const baseURL = "http://localhost:5000/api";

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
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add performance measurement start time
    config.metadata = { startTime: performance.now() };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => {
    // Measure API performance
    if (response.config?.metadata?.startTime) {
      measureAPI(response.config.url, response.config.metadata.startTime);
    }

    return response;
  },
  (error) => {
    // Measure API performance for errors too
    if (error.config?.metadata?.startTime) {
      measureAPI(error.config.url, error.config.metadata.startTime);
    }

    // Handle specific error cases
    if (error.response?.status === 401) {
      // Don't redirect for profile update requests
      const isProfileUpdate = error.config?.url?.includes("/auth/profile");
      if (!isProfileUpdate) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;
