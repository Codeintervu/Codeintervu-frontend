import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/api";
import progressTracker from "../utils/progressTracker";
import { importGuestProgress } from "../utils/progressApi";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Check if user is authenticated on app load
  useEffect(() => {
    const checkAuth = async () => {
      if (token) {
        try {
          const response = await api.get("/auth/profile", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data);
        } catch (error) {
          console.error("Auth check failed:", error);
          logout();
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { token: newToken, user: userData } = response.data;

      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userData);

      // Attempt guest import once after login
      await tryImportGuestProgressOnce();

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Login failed",
      };
    }
  };

  const register = async (userData) => {
    try {
      const response = await api.post("/auth/register", userData);
      const { token: newToken, user: userInfo } = response.data;

      localStorage.setItem("token", newToken);
      setToken(newToken);
      setUser(userInfo);

      // Attempt guest import once after register
      await tryImportGuestProgressOnce();

      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Registration failed",
      };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    // Do NOT erase guest data on logout; it might be imported on next login.
    // The UI already gates analytics/bookmarks for unauthenticated users.
  };

  // --- Guest import helper ---
  const tryImportGuestProgressOnce = async () => {
    try {
      // prevent repeated prompts for the same session token
      const markerKey = "guest_import_done";
      if (localStorage.getItem(markerKey) === "true") return;

      const results = progressTracker.getRecentQuizzes();
      const bookmarks = progressTracker.getBookmarkedQuestions();
      const current = progressTracker.getCurrentQuizProgress();
      const resume = current
        ? {
            [current.quizId]: {
              currentSection: current.currentSection || 0,
              currentQuestion: current.currentQuestion || 0,
              timeSpent: current.timeSpent || 0,
              updatedAt: new Date().toISOString(),
            },
          }
        : {};

      const hasAnything =
        (results && results.length > 0) ||
        (bookmarks && bookmarks.length > 0) ||
        current != null;
      if (!hasAnything) {
        localStorage.setItem(markerKey, "true");
        return;
      }

      const ok = window.confirm(
        `Import your guest progress? (results: ${
          results.length || 0
        }, bookmarks: ${bookmarks.length || 0}${
          current ? ", resume available" : ""
        })`
      );
      if (!ok) {
        localStorage.setItem(markerKey, "true");
        return;
      }

      await importGuestProgress({ results, bookmarks, resume });
      // Clear guest cache after successful import
      progressTracker.clearAllData();
      localStorage.setItem(markerKey, "true");
      toast.success("Guest progress imported to your account");
    } catch (e) {
      // soft fail, don't block login
      console.error("Import guest progress failed", e);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      const response = await api.put("/auth/profile", profileData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data.user);
      return { success: true };
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || "Profile update failed",
      };
    }
  };

  const value = {
    user,
    setUser,
    token,
    loading,
    login,
    register,
    logout,
    updateProfile,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
