/**
 * Chat Page
 * Simple offline “chatbot” for Spanish / romanized Japanese practice.
 */

import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getLanguage } from '../utils/storage';
import ChatBot from '../components/ChatBot';

export default function Chat() {
  const navigate = useNavigate();
  const language = getLanguage();

  useEffect(() => {
    if (!language) {
      navigate('/');
    }
  }, [language, navigate]);

  if (!language) {
    return null;
  }

  const languageName = language === 'spanish' ? 'Spanish' : 'Japanese (romaji)';
  const emoji = language === 'spanish' ? '🇪🇸' : '🇯🇵';

  return (
    <div className="min-h-screen bg-slate-950 bg-grain p-4 md:p-6">
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate('/learn')}
            className="text-slate-300 hover:text-slate-50 mb-1 flex items-center gap-2 text-sm font-semibold"
          >
            <span className="text-lg">←</span> Back to lesson
          </button>
        </div>

        <div className="mb-4">
          <div className="inline-flex items-center gap-3 rounded-2xl border border-slate-700 bg-slate-900/70 px-4 py-3 shadow-lg">
            <div className="text-2xl">{emoji}</div>
            <div>
              <div className="text-xs uppercase tracking-wide text-slate-400">Conversation mode</div>
              <div className="text-lg md:text-xl font-bold text-slate-50">{languageName}</div>
              <div className="text-xs text-slate-400 mt-1">
                Not a real AI — but a friendly script to keep you typing.
              </div>
            </div>
          </div>
        </div>

        <ChatBot language={language} />
      </div>
    </div>
  );
}

