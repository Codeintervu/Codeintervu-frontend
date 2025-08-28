import api from "./api";

export const saveSectionResult = async (payload) => {
  const { data } = await api.post("/progress/section-result", payload);
  return data;
};

export const getSummary = async () => {
  const { data } = await api.get("/progress/summary");
  return data;
};

export const getRecent = async () => {
  const { data } = await api.get("/progress/recent");
  return data;
};

export const getResume = async (quizId) => {
  const { data } = await api.get(`/progress/resume/${quizId}`);
  return data;
};

export const updateResume = async (payload) => {
  const { data } = await api.post("/progress/resume", payload);
  return data;
};

export const listBookmarks = async () => {
  const { data } = await api.get("/progress/bookmarks");
  return data;
};

export const addBookmark = async (payload) => {
  const { data } = await api.post("/progress/bookmarks", payload);
  return data;
};

export const deleteBookmark = async (questionId) => {
  const { data } = await api.delete(`/progress/bookmarks/${questionId}`);
  return data;
};

export const importGuestProgress = async (payload) => {
  const { data } = await api.post("/progress/import", payload);
  return data;
};
