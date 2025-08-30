// Profile completion calculation utility
export const calculateProfileCompletion = (user) => {
  if (!user) return 0;

  const fields = [
    { value: user.fullName, weight: 20, required: true },
    { value: user.email, weight: 15, required: true },
    { value: user.phoneNumber, weight: 10, required: false },
    { value: user.bio, weight: 15, required: false },
    { value: user.socialLinks?.github, weight: 8, required: false },
    { value: user.socialLinks?.linkedin, weight: 8, required: false },
    { value: user.socialLinks?.portfolio, weight: 7, required: false },
    { value: user.socialLinks?.website, weight: 7, required: false },
    { value: user.socialLinks?.instagram, weight: 5, required: false },
    { value: user.socialLinks?.twitter, weight: 5, required: false },
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

export const getCompletionColor = (percentage) => {
  if (percentage < 30) return "text-red-500";
  if (percentage < 60) return "text-yellow-500";
  if (percentage < 90) return "text-blue-500";
  return "text-green-500";
};

export const getCompletionEmoji = (percentage) => {
  if (percentage < 30) return "🚀";
  if (percentage < 60) return "📈";
  if (percentage < 90) return "🎯";
  return "🏆";
};

export const getCompletionMessage = (percentage) => {
  if (percentage < 30) return "Let's get started!";
  if (percentage < 60) return "Great progress!";
  if (percentage < 90) return "Almost there!";
  return "Profile complete!";
};
