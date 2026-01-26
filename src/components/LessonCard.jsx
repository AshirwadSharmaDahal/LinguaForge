/**
 * LessonCard Component - Enhanced Duolingo-style
 * Displays today's lesson with vocabulary, example sentence, and grammar note
 */

import { useState } from 'react';

export default function LessonCard({ lesson, language }) {
  const [flippedCards, setFlippedCards] = useState({});

  if (!lesson) {
    return (
      <div className="card-gradient p-8 text-center animate-slide-in">
        <div className="text-6xl mb-4 animate-bounce-slow">📚</div>
        <h2 className="text-2xl font-bold mb-2">No Lesson Available</h2>
        <p className="opacity-90">Check back tomorrow for a new lesson!</p>
      </div>
    );
  }

  const isJapanese = language === 'japanese';

  const toggleFlip = (index) => {
    setFlippedCards(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  return (
    <div className="card-gradient p-6 md:p-8 mb-6 animate-slide-in border-4 border-green-300 shadow-2xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-3xl animate-float">📖</span>
            <h2 className="text-2xl md:text-3xl font-bold">{lesson.title}</h2>
          </div>
          <div className="text-sm opacity-90">Today's Lesson</div>
        </div>
        <div className="text-5xl animate-bounce-slow">
          {language === 'spanish' ? '🇪🇸' : '🇯🇵'}
        </div>
      </div>

      {/* Vocabulary Section - Enhanced with flip cards */}
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-4 opacity-95 flex items-center gap-2">
          <span>💬</span> Vocabulary
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {lesson.vocabulary.map((item, index) => (
            <div
              key={index}
              onClick={() => toggleFlip(index)}
              className={`bg-white bg-opacity-25 rounded-2xl p-4 backdrop-blur-sm cursor-pointer transform transition-all duration-300 hover:scale-105 hover:bg-opacity-35 ${
                flippedCards[index] ? 'ring-2 ring-yellow-300' : ''
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-bold text-xl mb-1">{item.word}</div>
                  {isJapanese && item.romaji && (
                    <div className="text-sm opacity-75 italic mb-2">{item.romaji}</div>
                  )}
                  <div className={`text-sm font-semibold transition-all duration-300 ${
                    flippedCards[index] ? 'opacity-100 text-yellow-200' : 'opacity-60'
                  }`}>
                    {flippedCards[index] ? item.translation : '👆 Tap to reveal'}
                  </div>
                </div>
                <div className="text-2xl ml-3">
                  {flippedCards[index] ? '✅' : '💡'}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Example Sentence - Enhanced */}
      <div className="mb-6 bg-white bg-opacity-25 rounded-2xl p-5 backdrop-blur-sm border-2 border-white border-opacity-30">
        <h3 className="text-sm font-bold mb-3 opacity-95 flex items-center gap-2">
          <span>💭</span> Example Sentence
        </h3>
        <div className="text-xl md:text-2xl font-bold mb-2 leading-relaxed">{lesson.exampleSentence}</div>
        {isJapanese && lesson.exampleSentenceRomaji && (
          <div className="text-base opacity-80 italic mb-3">{lesson.exampleSentenceRomaji}</div>
        )}
        <div className="text-base opacity-95 font-medium">"{lesson.exampleTranslation}"</div>
      </div>

      {/* Grammar Note - Enhanced */}
      <div className="bg-yellow-300 bg-opacity-90 rounded-2xl p-5 backdrop-blur-sm border-3 border-yellow-400 shadow-lg">
        <h3 className="text-base font-bold mb-2 opacity-95 flex items-center gap-2">
          <span className="text-xl">💡</span> Grammar Tip
        </h3>
        <p className="text-sm md:text-base leading-relaxed opacity-95">{lesson.grammarNote}</p>
      </div>
    </div>
  );
}
