/**
 * Daily selector utility
 * Determines which lesson and challenge to show based on the current date
 * Uses modulo arithmetic to cycle through lessons/challenges
 */

/**
 * Get the day index based on the current date
 * This ensures the same lesson is shown on the same day for all users
 * @returns {number} Day index (0-based)
 */
export const getDayIndex = () => {
  // Get the number of days since epoch (Jan 1, 1970)
  const today = new Date();
  const epoch = new Date(2024, 0, 1); // Start from a fixed date
  const diffTime = today - epoch;
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

/**
 * Get today's lesson index based on the total number of lessons
 * @param {number} totalLessons - Total number of lessons available
 * @returns {number} Lesson index (0-based)
 */
export const getTodayLessonIndex = (totalLessons) => {
  const dayIndex = getDayIndex();
  return dayIndex % totalLessons;
};

/**
 * Get today's challenge type
 * Rotates between: 'multiple-choice', 'translation', 'fill-blank'
 * @returns {string} Challenge type
 */
export const getTodayChallengeType = () => {
  const dayIndex = getDayIndex();
  const challengeTypes = ['multiple-choice', 'translation', 'fill-blank'];
  return challengeTypes[dayIndex % challengeTypes.length];
};

/**
 * Check if a date string is today
 * @param {string} dateString - Date string in YYYY-MM-DD format
 * @returns {boolean} True if the date is today
 */
export const isToday = (dateString) => {
  const today = new Date().toISOString().split('T')[0];
  return dateString === today;
};

/**
 * Format date for display
 * @param {Date} date - Date object
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};
