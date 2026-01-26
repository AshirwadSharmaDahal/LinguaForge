/**
 * StreakCounter Component - Enhanced Duolingo-style
 * Displays the user's daily streak with fire emoji and animations
 */

import { getStreak } from '../utils/storage';

export default function StreakCounter({ language }) {
  const streak = getStreak(language);

  return (
    <div className="card bg-gradient-to-br from-orange-400 via-red-500 to-pink-500 p-5 md:p-6 shadow-xl text-white border-3 border-orange-300 animate-slide-in relative overflow-hidden">
      {/* Animated background effect */}
      <div className="absolute inset-0 bg-white opacity-10 animate-pulse-slow"></div>
      
      <div className="relative z-10 flex items-center justify-between">
        <div>
          <div className="text-sm font-semibold opacity-90 mb-1 flex items-center gap-2">
            <span>🔥</span> Daily Streak
          </div>
          <div className="text-4xl md:text-5xl font-extrabold mb-1">{streak}</div>
          <div className="text-xs md:text-sm opacity-90">
            {streak === 0 
              ? "Start your streak today!" 
              : streak === 1 
              ? "Great start! Keep it going!" 
              : `${streak} days in a row!`}
          </div>
        </div>
        <div className="text-6xl md:text-7xl animate-bounce-slow filter drop-shadow-lg">
          {streak > 0 ? '🔥' : '💪'}
        </div>
      </div>
      
      {streak === 0 && (
        <div className="relative z-10 mt-3 pt-3 border-t border-white border-opacity-30">
          <div className="text-xs opacity-75 flex items-center gap-1">
            <span>💡</span> Complete today's challenge to start your streak!
          </div>
        </div>
      )}
      
      {streak > 0 && streak % 7 === 0 && (
        <div className="relative z-10 mt-3 pt-3 border-t border-white border-opacity-30">
          <div className="text-xs font-bold animate-pulse">
            🎉 {streak} day milestone! Amazing! 🎉
          </div>
        </div>
      )}
    </div>
  );
}
