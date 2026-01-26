/**
 * Learn Page - Enhanced Duolingo-style
 * Main learning interface with today's lesson and challenge
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLanguage } from '../utils/storage';
import { getTodayLessonIndex, formatDate } from '../utils/dailySelector';
import { spanishLessons } from '../data/spanishLessons';
import { japaneseLessons } from '../data/japaneseLessons';
import LessonCard from '../components/LessonCard';
import ChallengeCard from '../components/ChallengeCard';
import XPBar from '../components/XPBar';
import StreakCounter from '../components/StreakCounter';

export default function Learn() {
  const [language, setLanguage] = useState(null);
  const [selectedLessonIndex, setSelectedLessonIndex] = useState(null);
  const [challengeCompleted, setChallengeCompleted] = useState(false);
  const [refreshTick, setRefreshTick] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLanguage = getLanguage();
    if (!savedLanguage) {
      navigate('/');
      return;
    }

    setLanguage(savedLanguage);
  }, [navigate]);

  useEffect(() => {
    if (!language) return;
    const lessons = language === 'spanish' ? spanishLessons : japaneseLessons;
    const lessonIndex = getTodayLessonIndex(lessons.length);
    setSelectedLessonIndex(lessonIndex);
  }, [language]);

  const handleChallengeComplete = () => {
    setChallengeCompleted(true);
    setTimeout(() => {
      setRefreshTick((x) => x + 1);
    }, 900);
  };

  const lessons = language === 'spanish' ? spanishLessons : japaneseLessons;

  if (!language || selectedLessonIndex === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-spin">⏳</div>
          <p className="text-slate-300 text-lg">Loading your lessons...</p>
        </div>
      </div>
    );
  }

  const lesson = lessons[selectedLessonIndex];
  const today = formatDate(new Date());
  const languageEmoji = language === 'spanish' ? '🇪🇸' : '🇯🇵';
  const languageName = language === 'spanish' ? 'Spanish' : 'Japanese';
  const todayIndex = getTodayLessonIndex(lessons.length);

  return (
    <div className="min-h-screen p-4 md:p-6 bg-slate-950 bg-grain">
      <div className="max-w-6xl mx-auto">
        {/* Header - Enhanced */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 md:mb-8">
          <div className="mb-4 md:mb-0">
            <button
              onClick={() => navigate('/')}
              className="text-slate-300 hover:text-slate-50 mb-3 flex items-center gap-2 font-semibold transition-colors"
            >
              <span className="text-xl">←</span> Back to Home
            </button>
            <div className="flex items-center gap-3">
              <span className="text-4xl md:text-5xl animate-float">{languageEmoji}</span>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-50">
                  {languageName}
                </h1>
                <p className="text-slate-400 mt-1 flex items-center gap-2 text-sm">
                  <span>📅</span> {today}
                </p>
              </div>
            </div>
          </div>
          <div className="text-center md:text-right space-y-2">
            <div className="inline-block bg-slate-900/70 text-slate-100 px-5 py-3 rounded-2xl shadow-lg border border-slate-700">
              <div className="text-xs uppercase tracking-wide text-slate-400 mb-1">today’s suggestion</div>
              <div className="text-sm font-semibold">
                Lesson {todayIndex + 1}: <span className="font-bold">{lessons[todayIndex].title}</span>
              </div>
            </div>
            <div className="text-xs text-slate-500">
              Browse any lesson. Daily challenge still counts once per day.
            </div>
            <button
              type="button"
              onClick={() => navigate('/chat')}
              className="mt-1 inline-flex items-center gap-1 text-[11px] text-emerald-300 hover:text-emerald-100"
            >
              💬 Practice chat instead
            </button>
          </div>
        </div>

        {/* Stats Row - Enhanced */}
        <div className="grid md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          <div key={`xp-${refreshTick}`}>
            <XPBar language={language} />
          </div>
          <div key={`streak-${refreshTick}`}>
            <StreakCounter language={language} />
          </div>
        </div>

        {/* Lesson picker + current lesson */}
        <div className="mb-6 md:mb-8 grid lg:grid-cols-[260px,1fr] gap-4 md:gap-6">
          {/* Lesson list */}
          <aside className="card p-4 md:p-5 max-h-[420px] overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <span>Lessons</span>
              </div>
              <div className="text-[11px] text-slate-500">
                {lessons.length} total
              </div>
            </div>
            <div className="space-y-1">
              {lessons.map((l, idx) => {
                const isSelected = idx === selectedLessonIndex;
                const isToday = idx === todayIndex;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedLessonIndex(idx)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs md:text-sm flex items-center justify-between transition-colors ${
                      isSelected
                        ? 'bg-emerald-500/20 border border-emerald-400 text-slate-50'
                        : 'bg-slate-900/60 border border-slate-800 text-slate-300 hover:bg-slate-800/80'
                    }`}
                  >
                    <span className="truncate">
                      <span className="font-mono text-[11px] mr-2 text-slate-400">#{idx + 1}</span>
                      {l.title}
                    </span>
                    {isToday && (
                      <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/90 text-slate-950 font-bold">
                        today
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

          {/* Selected lesson */}
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-slate-50 mb-3 md:mb-4 flex items-center gap-3">
              <span className="text-3xl">📚</span>
              <span>Lesson {selectedLessonIndex + 1}</span>
              {selectedLessonIndex === todayIndex && (
                <span className="text-xs font-semibold text-emerald-400 px-2 py-1 rounded-full border border-emerald-500/60">
                  today’s pick
                </span>
              )}
            </h2>
            <LessonCard lesson={lesson} language={language} />
          </div>
        </div>

        {/* Daily Challenge - Enhanced */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-3">
            <span className="text-4xl animate-pulse-slow">🎯</span>
            <span>Daily Challenge</span>
          </h2>
          <ChallengeCard 
            lesson={lesson} 
            language={language}
            onComplete={handleChallengeComplete}
          />
        </div>

        {/* Footer Info - Enhanced */}
        <div className="mt-8 md:mt-12 text-center">
          <div className="card bg-gradient-to-br from-white to-gray-50 p-6">
            {challengeCompleted ? (
              <div className="animate-success">
                <div className="text-5xl mb-3">🎉</div>
                <p className="text-lg font-bold text-green-600 mb-2">Challenge Completed!</p>
                <p className="text-sm text-gray-600">Refreshing to show your updated progress...</p>
              </div>
            ) : (
              <>
                <p className="text-base md:text-lg font-semibold text-gray-700 mb-2">
                  Complete the challenge to earn XP and maintain your streak! 🔥
                </p>
                <p className="text-sm text-gray-500">
                  New lesson and challenge available tomorrow 🚀
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
