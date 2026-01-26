/**
 * Home Page (redesigned)
 * A more human, unique landing experience:
 * - “Choose your quest” layout
 * - Warm palette + subtle grain
 * - Custom inline SVG illustration (no external assets)
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLanguage, saveLanguage } from '../utils/storage';
import { getXP, getStreak } from '../utils/storage';

export default function Home() {
  const [selectedLang, setSelectedLang] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const savedLang = getLanguage();
    if (savedLang) {
      setSelectedLang(savedLang);
    }
  }, []);

  const handleLanguageSelect = (language) => {
    setSelectedLang(language);
    saveLanguage(language);
    setTimeout(() => {
      navigate('/learn');
    }, 220);
  };

  const spanishXP = getXP('spanish');
  const japaneseXP = getXP('japanese');
  const spanishStreak = getStreak('spanish');
  const japaneseStreak = getStreak('japanese');
  const totalXP = spanishXP + japaneseXP;
  const totalStreak = spanishStreak + japaneseStreak;

  const StatPill = ({ label, value }) => (
    <div className="px-3 py-2 rounded-full border border-slate-200 bg-white/70 backdrop-blur-sm shadow-sm">
      <div className="text-[11px] uppercase tracking-wide text-slate-500">{label}</div>
      <div className="text-sm font-bold text-slate-800">{value}</div>
    </div>
  );

  const Mascot = () => (
    <svg
      viewBox="0 0 420 320"
      className="w-full max-w-[460px] h-auto"
      aria-hidden="true"
    >
      {/* soft blob */}
      <path
        d="M87 164c-10-61 26-112 82-127 49-13 87 2 118 26 44 34 78 92 52 150-26 58-91 93-159 94-65 1-83-82-93-143z"
        fill="#EEF2FF"
      />
      <path
        d="M129 251c-28-29-37-74-8-105 29-31 73-18 104 7 32 26 51 69 26 105-26 36-88 37-122-7z"
        fill="#DCFCE7"
        opacity="0.85"
      />

      {/* character */}
      <g transform="translate(130 82)">
        <path
          d="M70 12c41 0 74 33 74 74s-33 74-74 74S-4 127 -4 86 29 12 70 12z"
          fill="#ffffff"
          stroke="#E2E8F0"
          strokeWidth="4"
        />
        <path
          d="M28 88c3 22 21 38 42 38s39-16 42-38"
          fill="none"
          stroke="#0F172A"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <circle cx="46" cy="72" r="7" fill="#0F172A" />
        <circle cx="94" cy="72" r="7" fill="#0F172A" />
        <path
          d="M18 44c12-18 31-28 52-28s40 10 52 28"
          fill="none"
          stroke="#2BD576"
          strokeWidth="10"
          strokeLinecap="round"
        />
        <path
          d="M70 20c-22 0-40 10-52 28"
          fill="none"
          stroke="#3B82F6"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.8"
        />
        <path
          d="M70 20c22 0 40 10 52 28"
          fill="none"
          stroke="#8B5CF6"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* speech bubble */}
        <g transform="translate(128 18)">
          <path
            d="M0 20c0-11 9-20 20-20h72c11 0 20 9 20 20v26c0 11-9 20-20 20H42l-18 14 4-14H20C9 66 0 57 0 46V20z"
            fill="#ffffff"
            stroke="#E2E8F0"
            strokeWidth="3"
          />
          <text x="20" y="38" fontSize="14" fontWeight="700" fill="#0F172A">
            hola!
          </text>
          <text x="20" y="56" fontSize="13" fontWeight="600" fill="#334155">
            こんにちは
          </text>
        </g>
      </g>
    </svg>
  );

  return (
    <div className="min-h-screen bg-[#f5f5ff] bg-grain text-slate-900">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-14">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-white shadow-sm border border-slate-200 grid place-items-center">
              <span className="text-lg">🧩</span>
            </div>
            <div>
              <div className="text-sm font-extrabold tracking-tight text-slate-900">LinguaForge</div>
              <div className="text-[12px] text-slate-500">daily language quests</div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <StatPill label="Total XP" value={totalXP} />
            <StatPill label="Streaks" value={`${totalStreak} 🔥`} />
            <button
              type="button"
              onClick={() => {
                // ensure a language is chosen before chat
                if (!selectedLang) {
                  // soft guidance instead of hard block
                  alert('Pick Spanish or Japanese first, then open chat.');
                  return;
                }
                navigate('/chat');
              }}
              className="text-[11px] font-semibold px-3 py-1.5 rounded-full border border-slate-300 text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-colors bg-white/80"
            >
              Open chat buddy
            </button>
          </div>
        </div>

        {/* Main hero */}
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-200 bg-white/70 shadow-sm">
              <span className="text-sm">100% free</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm">no ads</span>
              <span className="text-slate-300">•</span>
              <span className="text-sm">no accounts</span>
            </div>

            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05]">
              Learn like it’s a
              <span className="inline-block px-3 mx-2 rounded-2xl bg-[#DCFCE7] text-slate-900">
                game
              </span>
              <br />
              not a chore.
            </h1>

            <p className="mt-4 text-base md:text-lg text-slate-600 leading-relaxed max-w-xl">
              Pick a language. Get one lesson + one challenge every day. Stack streaks.
              Earn XP. Keep it light. Keep it moving.
            </p>

            {/* Pick cards */}
            <div className="mt-7 grid sm:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleLanguageSelect('spanish')}
                className={`group text-left home-card p-5 hover:-translate-y-[2px] active:translate-y-0 ${
                  selectedLang === 'spanish' ? 'ring-2 ring-[#3b82f6]' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-500">Quest</div>
                    <div className="mt-1 text-2xl font-extrabold text-slate-900">Spanish</div>
                    <div className="text-sm text-slate-600 mt-1">small wins, big momentum</div>
                  </div>
                  <div className="text-3xl">🇪🇸</div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="text-xs font-bold text-slate-700 px-2 py-1 rounded-full bg-slate-100">
                    {spanishXP} XP
                  </div>
                  <div className="text-xs font-bold text-slate-700 px-2 py-1 rounded-full bg-slate-100">
                    {spanishStreak} 🔥
                  </div>
                  <div className="ml-auto text-xs font-bold text-[#3b82f6] group-hover:translate-x-0.5 transition-transform">
                    Start →
                  </div>
                </div>
              </button>

              <button
                type="button"
                onClick={() => handleLanguageSelect('japanese')}
                className={`group text-left home-card p-5 hover:-translate-y-[2px] active:translate-y-0 ${
                  selectedLang === 'japanese' ? 'ring-2 ring-[#8b5cf6]' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="text-sm font-semibold text-slate-500">Quest</div>
                    <div className="mt-1 text-2xl font-extrabold text-slate-900">Japanese</div>
                    <div className="text-sm text-slate-600 mt-1">kana, kanji, confidence</div>
                  </div>
                  <div className="text-3xl">🇯🇵</div>
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <div className="text-xs font-bold text-slate-700 px-2 py-1 rounded-full bg-slate-100">
                    {japaneseXP} XP
                  </div>
                  <div className="text-xs font-bold text-slate-700 px-2 py-1 rounded-full bg-slate-100">
                    {japaneseStreak} 🔥
                  </div>
                  <div className="ml-auto text-xs font-bold text-[#8b5cf6] group-hover:translate-x-0.5 transition-transform">
                    Start →
                  </div>
                </div>
              </button>
            </div>

            {/* “Human” feature row */}
            <div className="mt-8 grid md:grid-cols-3 gap-3">
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                <div className="text-sm font-bold text-slate-900">Daily rhythm</div>
                <div className="text-sm text-slate-600 mt-1">one lesson, one challenge, done.</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                <div className="text-sm font-bold text-slate-900">No guilt UX</div>
                <div className="text-sm text-slate-600 mt-1">miss a day, come back anyway.</div>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-white/70 p-4 shadow-sm">
                <div className="text-sm font-bold text-slate-900">Portfolio‑clean</div>
                <div className="text-sm text-slate-600 mt-1">fast, readable, future‑ready.</div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="home-card p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="text-sm font-semibold text-slate-500">Your guide</div>
                  <div className="text-xl font-extrabold text-slate-900">Forge</div>
                </div>
                <div className="text-xs font-bold text-slate-600 px-3 py-1 rounded-full bg-slate-100">
                  today’s vibe: gentle
                </div>
              </div>
              <Mascot />
              <div className="mt-4 text-sm text-slate-600 leading-relaxed">
                “Pick a quest. I’ll rotate your lesson daily. You just show up.”
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
