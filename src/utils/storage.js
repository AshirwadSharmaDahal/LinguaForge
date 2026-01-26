/**
 * LocalStorage utility functions for persisting user data
 * Stores: selected language, XP, streak, last completed date
 */

const STORAGE_KEYS = {
  LANGUAGE: 'linguaforge_language',
  XP: 'linguaforge_xp',
  STREAK: 'linguaforge_streak',
  LAST_COMPLETED: 'linguaforge_last_completed',
  COMPLETED_LESSONS: 'linguaforge_completed_lessons',
  CHALLENGE_COMPLETED: 'linguaforge_challenge_completed',
};

/**
 * Get the selected language from localStorage
 * @returns {string|null} 'spanish' | 'japanese' | null
 */
export const getLanguage = () => {
  return localStorage.getItem(STORAGE_KEYS.LANGUAGE);
};

/**
 * Save the selected language to localStorage
 * @param {string} language - 'spanish' | 'japanese'
 */
export const saveLanguage = (language) => {
  localStorage.setItem(STORAGE_KEYS.LANGUAGE, language);
};

/**
 * Get XP for a specific language
 * @param {string} language - 'spanish' | 'japanese'
 * @returns {number} XP points
 */
export const getXP = (language) => {
  const xpData = localStorage.getItem(STORAGE_KEYS.XP);
  if (!xpData) return 0;
  
  try {
    const parsed = JSON.parse(xpData);
    return parsed[language] || 0;
  } catch {
    return 0;
  }
};

/**
 * Add XP for a specific language
 * @param {string} language - 'spanish' | 'japanese'
 * @param {number} points - XP points to add
 */
export const addXP = (language, points) => {
  const xpData = localStorage.getItem(STORAGE_KEYS.XP);
  let xp = {};
  
  if (xpData) {
    try {
      xp = JSON.parse(xpData);
    } catch {
      xp = {};
    }
  }
  
  xp[language] = (xp[language] || 0) + points;
  localStorage.setItem(STORAGE_KEYS.XP, JSON.stringify(xp));
};

/**
 * Get streak for a specific language
 * @param {string} language - 'spanish' | 'japanese'
 * @returns {number} Current streak count
 */
export const getStreak = (language) => {
  const streakData = localStorage.getItem(STORAGE_KEYS.STREAK);
  if (!streakData) return 0;
  
  try {
    const parsed = JSON.parse(streakData);
    return parsed[language] || 0;
  } catch {
    return 0;
  }
};

/**
 * Get the last completed date for a language
 * @param {string} language - 'spanish' | 'japanese'
 * @returns {string|null} Date string (YYYY-MM-DD) or null
 */
export const getLastCompleted = (language) => {
  const lastCompletedData = localStorage.getItem(STORAGE_KEYS.LAST_COMPLETED);
  if (!lastCompletedData) return null;
  
  try {
    const parsed = JSON.parse(lastCompletedData);
    return parsed[language] || null;
  } catch {
    return null;
  }
};

/**
 * Update streak after completing a challenge
 * @param {string} language - 'spanish' | 'japanese'
 */
export const updateStreak = (language) => {
  const today = new Date().toISOString().split('T')[0];
  const lastCompleted = getLastCompleted(language);
  
  let streakData = localStorage.getItem(STORAGE_KEYS.STREAK);
  let streaks = {};
  
  if (streakData) {
    try {
      streaks = JSON.parse(streakData);
    } catch {
      streaks = {};
    }
  }
  
  if (lastCompleted === today) {
    // Already completed today, don't increment
    return;
  }
  
  if (!lastCompleted) {
    // First time completing
    streaks[language] = 1;
  } else {
    const lastDate = new Date(lastCompleted);
    const todayDate = new Date(today);
    const daysDiff = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 1) {
      // Consecutive day - increment streak
      streaks[language] = (streaks[language] || 0) + 1;
    } else if (daysDiff > 1) {
      // Streak broken - reset to 1
      streaks[language] = 1;
    } else {
      // Same day - no change
      return;
    }
  }
  
  // Update last completed date
  let lastCompletedData = localStorage.getItem(STORAGE_KEYS.LAST_COMPLETED);
  let lastCompletedObj = {};
  
  if (lastCompletedData) {
    try {
      lastCompletedObj = JSON.parse(lastCompletedData);
    } catch {
      lastCompletedObj = {};
    }
  }
  
  lastCompletedObj[language] = today;
  localStorage.setItem(STORAGE_KEYS.LAST_COMPLETED, JSON.stringify(lastCompletedObj));
  localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(streaks));
};

/**
 * Get all completed lesson indices for a language
 * @param {string} language - 'spanish' | 'japanese'
 * @returns {number[]} Array of completed lesson indices
 */
export const getCompletedLessons = (language) => {
  const completedData = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
  if (!completedData) return [];
  
  try {
    const parsed = JSON.parse(completedData);
    return parsed[language] || [];
  } catch {
    return [];
  }
};

/**
 * Mark a lesson as completed
 * @param {string} language - 'spanish' | 'japanese'
 * @param {number} lessonIndex - Index of the lesson
 */
export const markLessonCompleted = (language, lessonIndex) => {
  const completedData = localStorage.getItem(STORAGE_KEYS.COMPLETED_LESSONS);
  let completed = {};
  
  if (completedData) {
    try {
      completed = JSON.parse(completedData);
    } catch {
      completed = {};
    }
  }
  
  if (!completed[language]) {
    completed[language] = [];
  }
  
  if (!completed[language].includes(lessonIndex)) {
    completed[language].push(lessonIndex);
    localStorage.setItem(STORAGE_KEYS.COMPLETED_LESSONS, JSON.stringify(completed));
  }
};

/**
 * Check if today's challenge is already completed for a language.
 * @param {string} language - 'spanish' | 'japanese'
 * @returns {boolean}
 */
export const isChallengeCompletedToday = (language) => {
  const today = new Date().toISOString().split('T')[0];
  const raw = localStorage.getItem(STORAGE_KEYS.CHALLENGE_COMPLETED);
  if (!raw) return false;

  try {
    const parsed = JSON.parse(raw);
    return parsed[language] === today;
  } catch {
    return false;
  }
};

/**
 * Mark today's challenge completed for a language.
 * @param {string} language - 'spanish' | 'japanese'
 */
export const markChallengeCompletedToday = (language) => {
  const today = new Date().toISOString().split('T')[0];
  const raw = localStorage.getItem(STORAGE_KEYS.CHALLENGE_COMPLETED);
  let obj = {};

  if (raw) {
    try {
      obj = JSON.parse(raw);
    } catch {
      obj = {};
    }
  }

  obj[language] = today;
  localStorage.setItem(STORAGE_KEYS.CHALLENGE_COMPLETED, JSON.stringify(obj));
};
