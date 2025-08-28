// Progress tracking utility for both unregistered and registered users

const SESSION_STORAGE_KEYS = {
  CURRENT_QUIZ: "quiz_current_session",
  RECENT_QUIZZES: "quiz_recent_history",
  BOOKMARKED_QUESTIONS: "quiz_bookmarked_questions",
  USER_NOTES: "quiz_user_notes",
  STUDY_STATS: "quiz_study_stats",
};

const MAX_RECENT_QUIZZES = 10;
const MAX_BOOKMARKED_QUESTIONS = 50;

class ProgressTracker {
  constructor() {
    this.sessionId = this.generateSessionId();
  }

  // ===================== PERSISTENT PROGRESS (Authenticated users) =====================
  getPersistentProgressKey(userId, quizId) {
    return `quiz_progress:${userId}:${quizId}`;
  }

  getPersistentProgress(userId, quizId) {
    if (!userId || !quizId) return null;
    const key = this.getPersistentProgressKey(userId, quizId);
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  }

  savePersistentProgress(userId, quizId, progress) {
    if (!userId || !quizId) return null;
    const key = this.getPersistentProgressKey(userId, quizId);
    const payload = {
      ...progress,
      quizId,
      userId,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(key, JSON.stringify(payload));
    try {
      window.dispatchEvent(
        new CustomEvent("progress:updated", { detail: { type: "persistent" } })
      );
    } catch (_) {}
    return payload;
  }

  updatePersistentProgress(userId, quizId, updates) {
    if (!userId || !quizId) return null;
    const current = this.getPersistentProgress(userId, quizId) || {};
    const updated = {
      ...current,
      ...updates,
      lastUpdated: new Date().toISOString(),
    };
    return this.savePersistentProgress(userId, quizId, updated);
  }

  clearPersistentProgress(userId, quizId) {
    if (!userId || !quizId) return;
    const key = this.getPersistentProgressKey(userId, quizId);
    localStorage.removeItem(key);
    try {
      window.dispatchEvent(
        new CustomEvent("progress:updated", { detail: { type: "persistent" } })
      );
    } catch (_) {}
  }

  // =====================================================================================

  // Generate unique session ID for unregistered users
  generateSessionId() {
    const existingId = sessionStorage.getItem("quiz_session_id");
    if (existingId) return existingId;

    const newId =
      "temp_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9);
    sessionStorage.setItem("quiz_session_id", newId);
    return newId;
  }

  // Current Quiz Progress Management
  saveCurrentQuizProgress(quizData) {
    const progress = {
      sessionId: this.sessionId,
      quizId: quizData.quizId,
      quizName: quizData.quizName,
      currentSection: quizData.currentSection,
      currentQuestion: quizData.currentQuestion,
      answers: quizData.answers || [],
      timeSpent: quizData.timeSpent || 0,
      score: quizData.score || 0,
      totalQuestions: quizData.totalQuestions,
      lastUpdated: new Date().toISOString(),
    };

    sessionStorage.setItem(
      SESSION_STORAGE_KEYS.CURRENT_QUIZ,
      JSON.stringify(progress)
    );
    return progress;
  }

  getCurrentQuizProgress() {
    const progress = sessionStorage.getItem(SESSION_STORAGE_KEYS.CURRENT_QUIZ);
    return progress ? JSON.parse(progress) : null;
  }

  updateCurrentQuizProgress(updates) {
    const current = this.getCurrentQuizProgress();
    if (current) {
      const updated = {
        ...current,
        ...updates,
        lastUpdated: new Date().toISOString(),
      };
      sessionStorage.setItem(
        SESSION_STORAGE_KEYS.CURRENT_QUIZ,
        JSON.stringify(updated)
      );
      return updated;
    }
    return null;
  }

  clearCurrentQuizProgress() {
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.CURRENT_QUIZ);
  }

  // Recent Quiz History Management
  saveQuizResult(quizResult) {
    const recentQuizzes = this.getRecentQuizzes();

    const newResult = {
      sessionId: this.sessionId,
      quizId: quizResult.quizId,
      quizName: quizResult.quizName,
      score: quizResult.score,
      totalQuestions: quizResult.totalQuestions,
      correctAnswers: quizResult.correctAnswers,
      timeSpent: quizResult.timeSpent,
      accuracy: quizResult.accuracy,
      completedAt: new Date().toISOString(),
      difficulty: quizResult.difficulty || "medium",
    };

    // Add to beginning of array
    recentQuizzes.unshift(newResult);

    // Keep only the most recent quizzes
    if (recentQuizzes.length > MAX_RECENT_QUIZZES) {
      recentQuizzes.splice(MAX_RECENT_QUIZZES);
    }

    localStorage.setItem(
      SESSION_STORAGE_KEYS.RECENT_QUIZZES,
      JSON.stringify(recentQuizzes)
    );
    // Notify listeners that progress data has changed
    try {
      window.dispatchEvent(
        new CustomEvent("progress:updated", {
          detail: { type: "recentQuizzes" },
        })
      );
    } catch (_) {}
    return newResult;
  }

  getRecentQuizzes() {
    const quizzes = localStorage.getItem(SESSION_STORAGE_KEYS.RECENT_QUIZZES);
    return quizzes ? JSON.parse(quizzes) : [];
  }

  // Bookmarked Questions Management
  addBookmarkedQuestion(questionData) {
    const bookmarked = this.getBookmarkedQuestions();

    const bookmark = {
      questionId: questionData.questionId,
      quizId: questionData.quizId,
      quizName: questionData.quizName,
      question: questionData.question,
      correctAnswer: questionData.correctAnswer,
      explanation: questionData.explanation,
      bookmarkedAt: new Date().toISOString(),
      userNote: questionData.userNote || "",
    };

    // Check if already bookmarked
    const existingIndex = bookmarked.findIndex(
      (b) => b.questionId === questionData.questionId
    );
    if (existingIndex >= 0) {
      bookmarked[existingIndex] = bookmark;
    } else {
      bookmarked.unshift(bookmark);
    }

    // Keep only the most recent bookmarks
    if (bookmarked.length > MAX_BOOKMARKED_QUESTIONS) {
      bookmarked.splice(MAX_BOOKMARKED_QUESTIONS);
    }

    localStorage.setItem(
      SESSION_STORAGE_KEYS.BOOKMARKED_QUESTIONS,
      JSON.stringify(bookmarked)
    );
    // Notify listeners that progress data has changed
    try {
      window.dispatchEvent(
        new CustomEvent("progress:updated", { detail: { type: "bookmarks" } })
      );
    } catch (_) {}
    return bookmark;
  }

  getBookmarkedQuestions() {
    const bookmarked = localStorage.getItem(
      SESSION_STORAGE_KEYS.BOOKMARKED_QUESTIONS
    );
    return bookmarked ? JSON.parse(bookmarked) : [];
  }

  removeBookmarkedQuestion(questionId) {
    const bookmarked = this.getBookmarkedQuestions();
    const filtered = bookmarked.filter((b) => b.questionId !== questionId);
    localStorage.setItem(
      SESSION_STORAGE_KEYS.BOOKMARKED_QUESTIONS,
      JSON.stringify(filtered)
    );
    // Notify listeners that progress data has changed
    try {
      window.dispatchEvent(
        new CustomEvent("progress:updated", { detail: { type: "bookmarks" } })
      );
    } catch (_) {}
    return filtered;
  }

  // User Notes Management
  saveUserNote(questionId, note) {
    const notes = this.getUserNotes();
    notes[questionId] = {
      note,
      updatedAt: new Date().toISOString(),
    };
    localStorage.setItem(
      SESSION_STORAGE_KEYS.USER_NOTES,
      JSON.stringify(notes)
    );
    return notes[questionId];
  }

  getUserNotes() {
    const notes = localStorage.getItem(SESSION_STORAGE_KEYS.USER_NOTES);
    return notes ? JSON.parse(notes) : {};
  }

  // Study Statistics
  updateStudyStats(quizResult) {
    const stats = this.getStudyStats();

    const today = new Date().toISOString().split("T")[0];

    if (!stats.dailyStats[today]) {
      stats.dailyStats[today] = {
        quizzesTaken: 0,
        totalQuestions: 0,
        correctAnswers: 0,
        totalTimeSpent: 0,
        averageScore: 0,
      };
    }

    const daily = stats.dailyStats[today];
    daily.quizzesTaken += 1;
    daily.totalQuestions += quizResult.totalQuestions;
    daily.correctAnswers += quizResult.correctAnswers;
    daily.totalTimeSpent += quizResult.timeSpent;
    daily.averageScore = (daily.correctAnswers / daily.totalQuestions) * 100;

    // Update overall stats
    stats.totalQuizzesTaken += 1;
    stats.totalQuestions += quizResult.totalQuestions;
    stats.totalCorrectAnswers += quizResult.correctAnswers;
    stats.totalTimeSpent += quizResult.timeSpent;
    stats.overallAccuracy =
      (stats.totalCorrectAnswers / stats.totalQuestions) * 100;

    // Keep only last 30 days of daily stats
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    Object.keys(stats.dailyStats).forEach((date) => {
      if (new Date(date) < thirtyDaysAgo) {
        delete stats.dailyStats[date];
      }
    });

    localStorage.setItem(
      SESSION_STORAGE_KEYS.STUDY_STATS,
      JSON.stringify(stats)
    );
    // Notify listeners that progress data has changed
    try {
      window.dispatchEvent(
        new CustomEvent("progress:updated", { detail: { type: "studyStats" } })
      );
    } catch (_) {}
    return stats;
  }

  getStudyStats() {
    const stats = localStorage.getItem(SESSION_STORAGE_KEYS.STUDY_STATS);
    if (stats) {
      return JSON.parse(stats);
    }

    // Initialize default stats
    const defaultStats = {
      totalQuizzesTaken: 0,
      totalQuestions: 0,
      totalCorrectAnswers: 0,
      totalTimeSpent: 0,
      overallAccuracy: 0,
      dailyStats: {},
      lastUpdated: new Date().toISOString(),
    };

    localStorage.setItem(
      SESSION_STORAGE_KEYS.STUDY_STATS,
      JSON.stringify(defaultStats)
    );
    return defaultStats;
  }

  // Performance Analytics
  getPerformanceAnalytics(filterQuizId = null) {
    const recentQuizzesAll = this.getRecentQuizzes();
    const recentQuizzes = filterQuizId
      ? recentQuizzesAll.filter((q) => q.quizId === filterQuizId)
      : recentQuizzesAll;
    const stats = this.getStudyStats();

    if (recentQuizzes.length === 0) {
      return {
        averageScore: 0,
        totalQuizzes: 0,
        totalTimeSpent: 0,
        improvementTrend: "neutral",
        weakAreas: [],
        strongAreas: [],
      };
    }

    // Calculate average score
    const totalScore = recentQuizzes.reduce((sum, quiz) => sum + quiz.score, 0);
    const averageScore = totalScore / recentQuizzes.length;

    // Calculate improvement trend (last 5 vs previous 5)
    const recent5 = recentQuizzes.slice(0, 5);
    const previous5 = recentQuizzes.slice(5, 10);

    let improvementTrend = "neutral";
    if (previous5.length > 0) {
      const recentAvg =
        recent5.reduce((sum, quiz) => sum + quiz.score, 0) / recent5.length;
      const previousAvg =
        previous5.reduce((sum, quiz) => sum + quiz.score, 0) / previous5.length;

      if (recentAvg > previousAvg + 5) improvementTrend = "improving";
      else if (recentAvg < previousAvg - 5) improvementTrend = "declining";
    }

    // Calculate total time spent
    const totalTimeSpent = recentQuizzes.reduce(
      (sum, quiz) => sum + quiz.timeSpent,
      0
    );

    return {
      averageScore: Math.round(averageScore),
      totalQuizzes: recentQuizzes.length,
      totalTimeSpent,
      improvementTrend,
      weakAreas: this.identifyWeakAreas(recentQuizzes),
      strongAreas: this.identifyStrongAreas(recentQuizzes),
      studyStreak: this.calculateStudyStreak(stats.dailyStats),
    };
  }

  identifyWeakAreas(quizzes) {
    // This would be enhanced with actual topic/category data
    // For now, return a placeholder
    return ["Basic Concepts", "Data Structures"];
  }

  identifyStrongAreas(quizzes) {
    // This would be enhanced with actual topic/category data
    // For now, return a placeholder
    return ["Algorithm Logic", "Problem Solving"];
  }

  calculateStudyStreak(dailyStats) {
    const dates = Object.keys(dailyStats).sort().reverse();
    let streak = 0;

    for (let i = 0; i < dates.length; i++) {
      const date = new Date(dates[i]);
      const expectedDate = new Date();
      expectedDate.setDate(expectedDate.getDate() - i);

      if (date.toDateString() === expectedDate.toDateString()) {
        streak++;
      } else {
        break;
      }
    }

    return streak;
  }

  // Export data for registration
  exportProgressData() {
    return {
      sessionId: this.sessionId,
      currentQuiz: this.getCurrentQuizProgress(),
      recentQuizzes: this.getRecentQuizzes(),
      bookmarkedQuestions: this.getBookmarkedQuestions(),
      userNotes: this.getUserNotes(),
      studyStats: this.getStudyStats(),
      performanceAnalytics: this.getPerformanceAnalytics(),
      exportDate: new Date().toISOString(),
    };
  }

  // Clear all data (for logout or data reset)
  clearAllData() {
    sessionStorage.removeItem("quiz_session_id");
    sessionStorage.removeItem(SESSION_STORAGE_KEYS.CURRENT_QUIZ);
    localStorage.removeItem(SESSION_STORAGE_KEYS.RECENT_QUIZZES);
    localStorage.removeItem(SESSION_STORAGE_KEYS.BOOKMARKED_QUESTIONS);
    localStorage.removeItem(SESSION_STORAGE_KEYS.USER_NOTES);
    localStorage.removeItem(SESSION_STORAGE_KEYS.STUDY_STATS);
    // Notify listeners that progress data has changed
    try {
      window.dispatchEvent(
        new CustomEvent("progress:updated", { detail: { type: "clearAll" } })
      );
    } catch (_) {}
  }
}

// Create singleton instance
const progressTracker = new ProgressTracker();

export default progressTracker;
