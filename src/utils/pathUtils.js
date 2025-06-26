export const formatCategoryPath = (path) => {
  if (!path) return "/";
  // This removes any accidental slashes at the start and then adds exactly one back.
  return `/${path.replace(/^\/*/, "")}`;
};
