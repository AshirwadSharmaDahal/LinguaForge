/**
 * ChallengeCard Component - Enhanced Duolingo-style
 * Displays daily challenge with better feedback and animations
 */

import { useEffect, useMemo, useState } from 'react';
import {
  addXP,
  isChallengeCompletedToday,
  markChallengeCompletedToday,
  updateStreak,
} from '../utils/storage';
import { getDayIndex, getTodayChallengeType } from '../utils/dailySelector';

export default function ChallengeCard({ lesson, language, onComplete }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [shake, setShake] = useState(false);

  useEffect(() => {
    if (showResult && isCorrect) {
      const timer = setTimeout(() => {
        setShowResult(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showResult, isCorrect]);

  if (!lesson) {
    return null;
  }

  const challengeType = getTodayChallengeType();
  const isJapanese = language === 'japanese';
  const alreadyDoneToday = isChallengeCompletedToday(language);

  // Ensure we don't allow double completion (XP farming) in the UI.
  useEffect(() => {
    if (alreadyDoneToday) {
      setCompleted(true);
    }
  }, [alreadyDoneToday]);

  const normalize = (s) =>
    String(s || '')
      .toLowerCase()
      .replace(/[“”"]/g, '')
      .replace(/[^\p{L}\p{N}\s]/gu, '') // remove punctuation (unicode-safe)
      .replace(/\s+/g, ' ')
      .trim();

  // Small deterministic PRNG so the challenge doesn't re-roll every render.
  const mulberry32 = (a) => {
    let t = a >>> 0;
    return () => {
      t += 0x6d2b79f5;
      let x = t;
      x = Math.imul(x ^ (x >>> 15), x | 1);
      x ^= x + Math.imul(x ^ (x >>> 7), x | 61);
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
  };

  const challenge = useMemo(() => {
    const day = getDayIndex();
    const seedBase =
      day +
      (language === 'spanish' ? 101 : 303) +
      (lesson?.title?.length || 0) * 17 +
      (lesson?.exampleSentence?.length || 0) * 7 +
      (challengeType === 'multiple-choice' ? 1 : challengeType === 'translation' ? 2 : 3) * 999;
    const rand = mulberry32(seedBase);

    if (challengeType === 'multiple-choice') {
      const vocab = lesson.vocabulary || [];
      const idx = Math.floor(rand() * vocab.length);
      const picked = vocab[idx] || vocab[0];
      const correctAnswer = picked?.translation || '';

      const wrongPool = vocab
        .filter((v) => v?.word !== picked?.word)
        .map((v) => v.translation)
        .filter(Boolean);

      // deterministic shuffle via rand()
      const shuffledWrong = [...wrongPool].sort(() => rand() - 0.5).slice(0, 3);
      const allAnswers = [correctAnswer, ...shuffledWrong].sort(() => rand() - 0.5);

      return {
        type: 'multiple-choice',
        question: `What does "${picked.word}"${isJapanese && picked.romaji ? ` (${picked.romaji})` : ''} mean?`,
        correctAnswer,
        answers: allAnswers,
      };
    }

    if (challengeType === 'translation') {
      return {
        type: 'translation',
        question: `Translate: "${lesson.exampleSentence}"${isJapanese && lesson.exampleSentenceRomaji ? ` (${lesson.exampleSentenceRomaji})` : ''}`,
        correctAnswer: normalize(lesson.exampleTranslation),
      };
    }

    // fill-blank
    const sentence = String(lesson.exampleSentence || '');
    const hasSpaces = /\s/.test(sentence);
    let tokenToRemove = '';

    if (hasSpaces) {
      const tokens = sentence.split(/\s+/).filter(Boolean);
      tokenToRemove = tokens[Math.floor(rand() * tokens.length)] || tokens[0] || '';
    } else {
      // Japanese (often no spaces): try to remove a vocab word that appears in the sentence
      const vocabWords = (lesson.vocabulary || []).map((v) => v.word).filter(Boolean);
      const candidates = vocabWords.filter((w) => sentence.includes(w));
      tokenToRemove =
        candidates[Math.floor(rand() * candidates.length)] ||
        vocabWords[Math.floor(rand() * vocabWords.length)] ||
        '';
    }

    const blankSentence = tokenToRemove ? sentence.replace(tokenToRemove, '______') : `${sentence} ______`;
    return {
      type: 'fill-blank',
      question: `Fill in the blank: "${blankSentence}"`,
      correctAnswer: normalize(tokenToRemove),
    };
  }, [challengeType, isJapanese, language, lesson]);

  const handleAnswer = (answer) => {
    if (completed) return;
    
    setSelectedAnswer(answer);
    const correct = normalize(answer) === normalize(challenge.correctAnswer);
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setCompleted(true);
      const xp = 10;
      setXpEarned(xp);
      addXP(language, xp);
      markChallengeCompletedToday(language);
      updateStreak(language);
      if (onComplete) {
        setTimeout(() => onComplete(), 1200);
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  const handleTranslationSubmit = () => {
    if (completed) return;
    
    const userAnswer = normalize(selectedAnswer);
    const correct = userAnswer === normalize(challenge.correctAnswer);
    setIsCorrect(correct);
    setShowResult(true);

    if (correct) {
      setCompleted(true);
      const xp = 10;
      setXpEarned(xp);
      addXP(language, xp);
      markChallengeCompletedToday(language);
      updateStreak(language);
      if (onComplete) {
        setTimeout(() => onComplete(), 1200);
      }
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className={`card p-6 md:p-8 animate-slide-in ${shake ? 'animate-shake' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 flex items-center gap-2">
            <span className="text-3xl animate-pulse-slow">🎯</span>
            Daily Challenge
          </h2>
          <p className="text-sm text-gray-600 mt-1">
            {alreadyDoneToday ? "Already completed today — nice!" : "One win a day. Earn XP + keep your streak."}
          </p>
        </div>
        <span className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white rounded-full text-sm font-bold shadow-lg">
          {challengeType === 'multiple-choice' ? 'Multiple Choice' : 
           challengeType === 'translation' ? 'Translation' : 'Fill in the Blank'}
        </span>
      </div>

      {/* Question */}
      <div className="mb-8">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-blue-200">
          <p className="text-lg md:text-xl text-gray-800 font-semibold leading-relaxed">{challenge.question}</p>
        </div>

        {/* Answers */}
        {challenge.type === 'multiple-choice' && (
          <div className="space-y-4">
            {challenge.answers.map((answer, index) => {
              const isSelected = selectedAnswer === answer;
              const isCorrectAnswer = answer === challenge.correctAnswer;
              const showCorrect = showResult && isCorrectAnswer;
              const showWrong = showResult && isSelected && !isCorrect;
              
              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(answer)}
                  disabled={completed || showResult}
                  className={`w-full text-left p-5 rounded-2xl border-3 transition-all duration-200 transform hover:scale-102 ${
                    showCorrect
                      ? 'bg-green-400 border-green-600 text-white shadow-lg glow-effect animate-success'
                      : showWrong
                      ? 'bg-red-400 border-red-600 text-white shadow-lg'
                      : isSelected
                      ? 'bg-blue-100 border-blue-400 shadow-md'
                      : 'bg-white border-gray-300 hover:border-green-400 hover:bg-green-50 shadow-sm'
                  } ${completed ? 'cursor-not-allowed opacity-75' : 'cursor-pointer active:scale-95'}`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">{answer}</span>
                    {showCorrect && <span className="text-2xl">✅</span>}
                    {showWrong && <span className="text-2xl">❌</span>}
                  </div>
                </button>
              );
            })}
          </div>
        )}

        {(challenge.type === 'translation' || challenge.type === 'fill-blank') && (
          <div className="space-y-4">
            <input
              type="text"
              value={selectedAnswer || ''}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleTranslationSubmit()}
              disabled={completed}
              placeholder="Type your answer here..."
              className={`w-full p-5 border-3 rounded-2xl focus:outline-none text-lg font-medium transition-all ${
                showResult && isCorrect
                  ? 'bg-green-400 border-green-600 text-white'
                  : showResult && !isCorrect
                  ? 'bg-red-400 border-red-600 text-white'
                  : 'bg-white border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200'
              }`}
            />
            <button
              onClick={handleTranslationSubmit}
              disabled={completed || !selectedAnswer}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed text-lg"
            >
              Check ✨
            </button>
          </div>
        )}
      </div>

      {/* Result Feedback */}
      {showResult && (
        <div className={`p-6 rounded-2xl border-3 shadow-xl animate-slide-in ${
          isCorrect 
            ? 'bg-gradient-to-r from-green-400 to-green-500 border-green-600 text-white' 
            : 'bg-gradient-to-r from-red-400 to-red-500 border-red-600 text-white'
        }`}>
          <div className="flex items-center gap-4">
            <span className="text-5xl animate-bounce-slow">
              {isCorrect ? '🎉' : '😔'}
            </span>
            <div className="flex-1">
              <p className="font-bold text-xl mb-2">
                {isCorrect ? 'Excellent! 🎊' : 'Not quite right'}
              </p>
              {isCorrect ? (
                <div>
                  <p className="text-lg mb-1">You earned <span className="font-extrabold text-2xl">{xpEarned} XP</span>!</p>
                  <p className="text-sm opacity-90">Keep up the great work! 🔥</p>
                </div>
              ) : (
                <div>
                  <p className="text-sm mb-2">Don't worry, try again!</p>
                  <p className="text-base">
                    Correct answer: <span className="font-bold">{challenge.correctAnswer}</span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Completion Message */}
      {completed && isCorrect && (
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">Done for today. Come back tomorrow 🎯</p>
        </div>
      )}
    </div>
  );
}
