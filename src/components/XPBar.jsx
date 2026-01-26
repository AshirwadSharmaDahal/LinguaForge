/**
 * XPBar Component - Enhanced Duolingo-style
 * Displays the user's XP progress with a visual progress bar
 */

import { getXP } from '../utils/storage';

export default function XPBar({ language }) {
  const xp = getXP(language);
  const level = Math.floor(xp / 100) + 1;
  const xpInCurrentLevel = xp % 100;
  const xpNeededForNextLevel = 100;
  const progressPercent = (xpInCurrentLevel / xpNeededForNextLevel) * 100;

  return (
    <div className="card bg-gradient-to-br from-white to-blue-50 p-5 md:p-6 shadow-xl border-2 border-blue-200 animate-slide-in">
      <div className="flex justify-between items-center mb-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⭐</span>
          <span className="text-lg font-bold text-gray-800">Level {level}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-2xl font-bold text-green-600">{xp}</span>
          <span className="text-sm text-gray-600">XP</span>
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 md:h-5 overflow-hidden shadow-inner">
        <div
          className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 h-full rounded-full transition-all duration-700 ease-out relative overflow-hidden"
          style={{ width: `${progressPercent}%` }}
        >
          <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
          {progressPercent > 0 && (
            <div className="absolute right-0 top-0 h-full w-8 bg-gradient-to-r from-transparent to-white opacity-30"></div>
          )}
        </div>
      </div>
      <div className="flex justify-between items-center mt-2">
        <div className="text-xs text-gray-500">
          {xpInCurrentLevel} / {xpNeededForNextLevel} XP
        </div>
        <div className="text-xs font-semibold text-green-600">
          {xpNeededForNextLevel - xpInCurrentLevel} XP to level {level + 1} 🚀
        </div>
      </div>
    </div>
  );
}
