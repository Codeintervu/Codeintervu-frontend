import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../utils/api";
import toast from "react-hot-toast";
import {
  calculateProfileCompletion,
  getCompletionColor,
  getCompletionEmoji,
  getCompletionMessage,
} from "../utils/profileCompletion";
import {
  trackProfileCompletion,
  trackUserInteraction,
} from "../utils/analytics";
import {
  User,
  Edit3,
  Save,
  X,
  Lock,
  Eye,
  EyeOff,
  Github,
  Linkedin,
  Instagram,
  Twitter,
  Globe,
  ExternalLink,
  Trophy,
  Star,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Info,
  Award,
  Zap,
} from "lucide-react";
import Breadcrumb from "../components/Breadcrumb";

const Profile = () => {
  const { user, setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [autoSaveTimer, setAutoSaveTimer] = useState(null);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    bio: "",
    socialLinks: {
      github: "",
      linkedin: "",
      instagram: "",
      twitter: "",
      portfolio: "",
      website: "",
    },
    learningPreferences: {
      preferredLanguages: [],
      difficultyLevel: "Beginner",
      learningGoals: "Skill Enhancement",
    },
    privacySettings: {
      profileVisibility: "Public",
      showEmail: false,
      showPhone: false,
      allowMessages: true,
    },
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Profile completion calculation using shared utility
  const calculateProfileCompletionLocal = () => {
    const fields = [
      { value: formData.fullName, weight: 20, required: true },
      { value: formData.email, weight: 15, required: true },
      { value: formData.phoneNumber, weight: 10, required: false },
      { value: formData.bio, weight: 15, required: false },
      { value: formData.socialLinks.github, weight: 8, required: false },
      { value: formData.socialLinks.linkedin, weight: 8, required: false },
      { value: formData.socialLinks.portfolio, weight: 7, required: false },
      { value: formData.socialLinks.website, weight: 7, required: false },
      { value: formData.socialLinks.instagram, weight: 5, required: false },
      { value: formData.socialLinks.twitter, weight: 5, required: false },
    ];

    let totalWeight = 0;
    let completedWeight = 0;

    fields.forEach((field) => {
      totalWeight += field.weight;
      if (field.value && field.value.trim() !== "") {
        completedWeight += field.weight;
      }
    });

    return Math.round((completedWeight / totalWeight) * 100);
  };

  // Profile strength calculation
  const calculateProfileStrength = () => {
    const completion = calculateProfileCompletion();
    if (completion < 30)
      return { level: "Basic", color: "text-red-500", icon: AlertCircle };
    if (completion < 60)
      return { level: "Good", color: "text-yellow-500", icon: Star };
    if (completion < 90)
      return { level: "Strong", color: "text-blue-500", icon: TrendingUp };
    return { level: "Excellent", color: "text-green-500", icon: Trophy };
  };

  // Get next recommended fields
  const getNextRecommendations = () => {
    const recommendations = [];
    if (!formData.phoneNumber)
      recommendations.push({
        field: "Phone Number",
        impact: "+10%",
        priority: "high",
      });
    if (!formData.bio)
      recommendations.push({ field: "Bio", impact: "+15%", priority: "high" });
    if (!formData.socialLinks.github)
      recommendations.push({
        field: "GitHub",
        impact: "+8%",
        priority: "medium",
      });
    if (!formData.socialLinks.linkedin)
      recommendations.push({
        field: "LinkedIn",
        impact: "+8%",
        priority: "medium",
      });
    if (!formData.socialLinks.portfolio)
      recommendations.push({
        field: "Portfolio",
        impact: "+7%",
        priority: "medium",
      });
    if (!formData.socialLinks.website)
      recommendations.push({
        field: "Website",
        impact: "+7%",
        priority: "medium",
      });

    return recommendations.slice(0, 3); // Show top 3
  };

  // Auto-save functionality
  const scheduleAutoSave = () => {
    if (autoSaveTimer) clearTimeout(autoSaveTimer);
    const timer = setTimeout(() => {
      handleAutoSave();
    }, 2000); // Auto-save after 2 seconds of inactivity
    setAutoSaveTimer(timer);
  };

  const handleAutoSave = async () => {
    try {
      await api.put("/auth/profile", formData);
      setLastSaved(new Date());
      toast.success("Profile auto-saved!", { duration: 2000 });
    } catch (error) {
      console.error("Auto-save failed:", error);
    }
  };

  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        bio: user.bio || "",
        socialLinks: {
          github: user.socialLinks?.github || "",
          linkedin: user.socialLinks?.linkedin || "",
          instagram: user.socialLinks?.instagram || "",
          twitter: user.socialLinks?.twitter || "",
          portfolio: user.socialLinks?.portfolio || "",
          website: user.socialLinks?.website || "",
        },
        learningPreferences: {
          preferredLanguages:
            user.learningPreferences?.preferredLanguages || [],
          difficultyLevel:
            user.learningPreferences?.difficultyLevel || "Beginner",
          learningGoals:
            user.learningPreferences?.learningGoals || "Skill Enhancement",
        },
        privacySettings: {
          profileVisibility:
            user.privacySettings?.profileVisibility || "Public",
          showEmail: user.privacySettings?.showEmail || false,
          showPhone: user.privacySettings?.showPhone || false,
          allowMessages: user.privacySettings?.allowMessages || true,
        },
      });
    }
  }, [user]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    scheduleAutoSave();
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData((prev) => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value,
      },
    }));
    scheduleAutoSave();
  };

  const handleSaveProfile = async () => {
    try {
      setLoading(true);
      if (autoSaveTimer) clearTimeout(autoSaveTimer);

      if (!formData.fullName || formData.fullName.trim() === "") {
        toast.error("Full name is required");
        return;
      }

      const response = await api.put("/auth/profile", formData);

      if (response.data && response.data.user) {
        const updatedUser = {
          ...response.data.user,
          _id: response.data.user.id || response.data.user._id,
        };
        setUser(updatedUser);
        setLastSaved(new Date());

        // Track profile completion
        const completionPercentage = calculateProfileCompletionLocal();
        trackProfileCompletion(completionPercentage);
        trackUserInteraction("Profile", "Save");

        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Profile updated but response format is invalid");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.message || "Failed to update profile");
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast.error("New passwords do not match");
      return;
    }

    try {
      setLoading(true);
      await api.put("/auth/change-password", {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });

      toast.success("Password changed successfully!");
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const completionPercentage = calculateProfileCompletionLocal();
  const profileStrength = calculateProfileStrength();
  const recommendations = getNextRecommendations();
  const StrengthIcon = profileStrength.icon;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Breadcrumb */}
        <Breadcrumb />

        {/* Profile Completion Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="text-3xl">
                {getCompletionEmoji(completionPercentage)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Profile Completion
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  {getCompletionMessage(completionPercentage)}{" "}
                  {getCompletionEmoji(completionPercentage)}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-teal-600">
                {completionPercentage}%
              </div>
              <div className="text-sm text-gray-500">Complete</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4">
            <div
              className={`h-3 rounded-full transition-all duration-500 ${getCompletionColor(
                completionPercentage
              ).replace("text-", "bg-")}`}
              style={{ width: `${completionPercentage}%` }}
            ></div>
          </div>

          {/* Profile Strength Indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <StrengthIcon className={`w-5 h-5 ${profileStrength.color}`} />
              <span className={`font-medium ${profileStrength.color}`}>
                Profile Strength: {profileStrength.level}
              </span>
            </div>
            {lastSaved && (
              <div className="text-sm text-gray-500">
                Last saved: {lastSaved.toLocaleTimeString()}
              </div>
            )}
          </div>

          {/* Quick Recommendations */}
          {recommendations.length > 0 && (
            <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="w-4 h-4 text-blue-600" />
                <span className="font-medium text-blue-800 dark:text-blue-200">
                  Quick Wins
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {recommendations.map((rec, index) => (
                  <div
                    key={index}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      rec.priority === "high"
                        ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-200"
                    }`}
                  >
                    {rec.field} {rec.impact}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-teal-100 dark:bg-teal-900 rounded-full flex items-center justify-center">
                <User className="w-8 h-8 text-teal-600 dark:text-teal-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                  {user.fullName}
                </h2>
                <p className="text-gray-600 dark:text-gray-400">{user.email}</p>
                {/* Social Links Display */}
                {(user.socialLinks?.github ||
                  user.socialLinks?.linkedin ||
                  user.socialLinks?.instagram ||
                  user.socialLinks?.twitter) && (
                  <div className="flex items-center space-x-3 mt-2">
                    {user.socialLinks?.github && (
                      <a
                        href={user.socialLinks.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                      >
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {user.socialLinks?.linkedin && (
                      <a
                        href={user.socialLinks.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                    {user.socialLinks?.instagram && (
                      <a
                        href={user.socialLinks.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-pink-600 transition-colors"
                      >
                        <Instagram className="w-5 h-5" />
                      </a>
                    )}
                    {user.socialLinks?.twitter && (
                      <a
                        href={user.socialLinks.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-blue-400 transition-colors"
                      >
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className="flex space-x-3">
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
                >
                  <Edit3 className="w-4 h-4 mr-2" />
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                  >
                    <X className="w-4 h-4 mr-2" />
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={loading}
                    className="flex items-center px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors disabled:opacity-50"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    {loading ? "Saving..." : "Save Changes"}
                  </button>
                </>
              )}
              <button
                onClick={() => setShowPasswordModal(true)}
                className="flex items-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Lock className="w-4 h-4 mr-2" />
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* Personal Information Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <User className="w-5 h-5 mr-2" />
              Personal Information
            </h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-500">
                  {
                    [
                      formData.fullName,
                      formData.email,
                      formData.phoneNumber,
                      formData.bio,
                    ].filter(Boolean).length
                  }
                  /4
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-100 dark:bg-gray-600 text-gray-500 dark:text-gray-400"
              />
              <p className="text-xs text-gray-500 mt-1">
                Email cannot be changed
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Phone Number
                {!formData.phoneNumber && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    +10% completion
                  </span>
                )}
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Bio
                {!formData.bio && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    +15% completion
                  </span>
                )}
              </label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleInputChange}
                disabled={!isEditing}
                rows={3}
                maxLength={500}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                placeholder="Tell us about yourself..."
              />
              <p className="text-xs text-gray-500 mt-1">
                {formData.bio.length}/500 characters
              </p>
            </div>
          </div>
        </div>

        {/* Social Links Section */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
              <Globe className="w-5 h-5 mr-2" />
              Social Links
            </h3>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-500">
                  {Object.values(formData.socialLinks).filter(Boolean).length}/6
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <Github className="w-4 h-4 mr-2" />
                GitHub
                {!formData.socialLinks.github && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    +8% completion
                  </span>
                )}
              </label>
              <input
                type="url"
                value={formData.socialLinks.github}
                onChange={(e) =>
                  handleSocialLinkChange("github", e.target.value)
                }
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                placeholder="https://github.com/username"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <Linkedin className="w-4 h-4 mr-2" />
                LinkedIn
                {!formData.socialLinks.linkedin && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    +8% completion
                  </span>
                )}
              </label>
              <input
                type="url"
                value={formData.socialLinks.linkedin}
                onChange={(e) =>
                  handleSocialLinkChange("linkedin", e.target.value)
                }
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                placeholder="https://linkedin.com/in/username"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <Instagram className="w-4 h-4 mr-2" />
                Instagram
                {!formData.socialLinks.instagram && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    +5% completion
                  </span>
                )}
              </label>
              <input
                type="url"
                value={formData.socialLinks.instagram}
                onChange={(e) =>
                  handleSocialLinkChange("instagram", e.target.value)
                }
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                placeholder="https://instagram.com/username"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <Twitter className="w-4 h-4 mr-2" />
                Twitter/X
                {!formData.socialLinks.twitter && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    +5% completion
                  </span>
                )}
              </label>
              <input
                type="url"
                value={formData.socialLinks.twitter}
                onChange={(e) =>
                  handleSocialLinkChange("twitter", e.target.value)
                }
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                placeholder="https://twitter.com/username"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <ExternalLink className="w-4 h-4 mr-2" />
                Portfolio
                {!formData.socialLinks.portfolio && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    +7% completion
                  </span>
                )}
              </label>
              <input
                type="url"
                value={formData.socialLinks.portfolio}
                onChange={(e) =>
                  handleSocialLinkChange("portfolio", e.target.value)
                }
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                placeholder="https://yourportfolio.com"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center">
                <Globe className="w-4 h-4 mr-2" />
                Website
                {!formData.socialLinks.website && (
                  <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    +7% completion
                  </span>
                )}
              </label>
              <input
                type="url"
                value={formData.socialLinks.website}
                onChange={(e) =>
                  handleSocialLinkChange("website", e.target.value)
                }
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white disabled:bg-gray-100 dark:disabled:bg-gray-600"
                placeholder="https://yourwebsite.com"
              />
            </div>
          </div>
        </div>

        {/* Achievement Section */}
        {completionPercentage >= 100 && (
          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg shadow-sm p-6 mt-6 text-center">
            <div className="text-6xl mb-4">🏆</div>
            <h3 className="text-2xl font-bold text-white mb-2">
              Profile Complete!
            </h3>
            <p className="text-white/90">
              Congratulations! You've unlocked the Profile Master badge.
            </p>
            <div className="mt-4 inline-flex items-center space-x-2 bg-white/20 px-4 py-2 rounded-full">
              <Award className="w-5 h-5 text-white" />
              <span className="text-white font-medium">Profile Master</span>
            </div>
          </div>
        )}

        {/* Tips Section */}
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 mt-6">
          <div className="flex items-center space-x-2 mb-4">
            <Info className="w-5 h-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">
              Profile Tips
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700 dark:text-blue-300">
            <div className="flex items-start space-x-2">
              <Zap className="w-4 h-4 mt-0.5 text-blue-600" />
              <span>Add a professional bio to showcase your expertise</span>
            </div>
            <div className="flex items-start space-x-2">
              <Zap className="w-4 h-4 mt-0.5 text-blue-600" />
              <span>Include your GitHub for code samples</span>
            </div>
            <div className="flex items-start space-x-2">
              <Zap className="w-4 h-4 mt-0.5 text-blue-600" />
              <span>Add LinkedIn for professional networking</span>
            </div>
            <div className="flex items-start space-x-2">
              <Zap className="w-4 h-4 mt-0.5 text-blue-600" />
              <span>Include a portfolio to showcase your work</span>
            </div>
          </div>
        </div>
      </div>

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Change Password
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        currentPassword: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  New Password
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        newPassword: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm New Password
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData((prev) => ({
                        ...prev,
                        confirmPassword: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowPasswordModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleChangePassword}
                disabled={loading}
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {loading ? "Changing..." : "Change Password"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
