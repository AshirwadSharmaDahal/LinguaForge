/**
 * ChatBot - Rule-based Language Tutor
 * Prioritizes correctness and grammar validation.
 */

import { useEffect, useRef, useState } from 'react';
import TutorBot from '../chatbot/TutorBot';

const SYSTEM_MESSAGES = {
  spanish: {
    intro: 'Soy tu tutor de español. Usa estructuras simples como "Yo soy [nombre]" o "Yo estudio [tema]".',
  },
  japanese: {
    intro: 'Watashi wa anata no sensei desu. Use strict patterns like "Watashi wa [noun] desu".',
  },
};

export default function ChatBot({ language }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const mode = language === 'japanese' ? 'japanese' : 'spanish';
  const system = SYSTEM_MESSAGES[mode];

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessages([
      { sender: 'bot', text: system.intro, type: 'intro' },
    ]);
  }, [mode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async () => {
    const trimmed = input.trim();
    if (!trimmed || isLoading) return;

    // Add user message
    const userMsg = {
      sender: 'user',
      text: trimmed,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      // Process with TutorBot
      // Pass previous messages as history for context
      const history = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'model',
        parts: [{ text: m.text }]
      }));

      const response = await TutorBot.process(trimmed, mode, history);

      // Add bot message
      const botMsg = {
        sender: 'bot',
        ...response
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: 'bot', text: 'Error in tutor bot.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="glass-panel h-full flex flex-col relative overflow-hidden">
      {/* Decorative Scanline */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/20 animate-scanline pointer-events-none z-10"></div>

      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-cyan-500/30 pb-3">
        <div>
          <div className="font-tech text-[10px] uppercase tracking-[0.2em] text-cyan-400/70 animate-pulse">
            System Online • {mode.toUpperCase()}
          </div>
          <div className="text-2xl font-bold text-slate-100 flex items-center gap-2 font-tech">
            <span className="text-neon-cyan">LINGUA</span>FORGE
            <span className="text-xs bg-cyan-900/40 border border-cyan-500/50 px-2 py-0.5 rounded text-cyan-300">v2.0</span>
          </div>
        </div>
        <div className="text-4xl filter drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
          {mode === 'spanish' ? '🇪🇸' : '🇯🇵'}
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto space-y-6 pr-2 mb-4 scrollbar-thin"
      >
        {messages.map((m, idx) => (
          <div key={idx} className={`flex w-full ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[85%] p-4 text-sm leading-relaxed shadow-lg backdrop-blur-md transition-all duration-300
                ${m.sender === 'user'
                  ? 'bubble-user text-right'
                  : 'bubble-bot border-l-2 border-l-fuchsia-500'
                }`}
            >
              {/* Bot Label */}
              {m.sender === 'bot' && (
                <div className="text-[10px] font-tech text-fuchsia-400 mb-1 tracking-wider uppercase">AI Core</div>
              )}

              <div className="text-base text-slate-100 font-medium">
                {m.text}
              </div>

              {/* Validation / Corrections */}
              {m.sender === 'bot' && m.type !== 'intro' && (
                <div className="mt-3 pt-3 border-t border-slate-700/50 space-y-2 text-left">
                  {/* Meaning */}
                  {m.translation && (
                    <div className="text-cyan-300 text-xs">
                      <span className="font-tech text-cyan-500/70 mr-2">[TRANS]</span>
                      {m.translation}
                    </div>
                  )}

                  {/* Correction */}
                  {m.correction && (
                    <div className="bg-red-900/20 border-l-2 border-red-500 pl-2 py-1">
                      <div className="text-[10px] text-red-400 uppercase font-tech">Correction</div>
                      <div className="text-red-200 text-xs font-mono">{m.correction}</div>
                    </div>
                  )}

                  {/* Tip */}
                  {m.tip && (
                    <div className="flex items-start gap-2 text-xs text-blue-300">
                      <span className="text-blue-400">❖</span>
                      <span className="italic">{m.tip}</span>
                    </div>
                  )}

                  {/* Error State */}
                  {(m.text.includes('Error') || m.subtext) && !m.correction && (
                    <div className="text-amber-400 text-xs border border-amber-500/30 bg-amber-900/10 p-2 rounded">
                      {m.subtext}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-lg opacity-20 group-focus-within:opacity-100 transition duration-500 blur"></div>
        <div className="relative flex gap-0 bg-[#0B1221] rounded-lg items-end overflow-hidden border border-slate-700/50">
          <textarea
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={
              mode === 'spanish'
                ? 'Initiate input sequence...'
                : 'Input command...'
            }
            className="flex-1 bg-transparent border-none text-slate-200 px-4 py-4 focus:ring-0 placeholder:text-slate-600 resize-none font-mono text-sm h-14 pt-4"
          />
          <button
            type="button"
            onClick={send}
            disabled={isLoading}
            className="h-14 px-6 text-cyan-400 hover:text-cyan-200 hover:bg-cyan-900/20 transition-colors font-tech uppercase tracking-widest text-xs border-l border-slate-800"
          >
            {isLoading ? (
              <span className="animate-pulse">Proc...</span>
            ) : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
}


