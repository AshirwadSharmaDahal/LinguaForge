# LinguaForge 🌍

A free, gamified language learning web application for Spanish and Japanese. Learn a new language with daily rotating lessons and challenges, track your progress with XP and streaks, all completely free!

## 🎯 Features

- **Daily Lessons**: Automatically rotating lessons that change every day
- **Daily Challenges**: Test your knowledge with multiple choice, translation, and fill-in-the-blank exercises
- **Gamification**: Earn XP, level up, and maintain daily streaks
- **Progress Tracking**: Track your progress separately for Spanish and Japanese
- **100% Free**: No paid APIs, no subscriptions, no hidden costs
- **Beautiful UI**: Playful, Duolingo-inspired design that's modern and engaging

## 🚀 Tech Stack

- **Frontend**: React + Vite
- **Styling**: Tailwind CSS
- **State Management**: React Hooks + localStorage
- **Routing**: React Router DOM
- **Hosting**: Vercel (free tier)

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd LinguaForge
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── LessonCard.jsx
│   ├── ChallengeCard.jsx
│   ├── StreakCounter.jsx
│   └── XPBar.jsx
├── pages/              # Page components
│   ├── Home.jsx        # Language selection
│   └── Learn.jsx       # Main learning interface
├── data/               # Lesson data
│   ├── spanishLessons.js
│   └── japaneseLessons.js
├── utils/              # Utility functions
│   ├── dailySelector.js  # Daily lesson/challenge selection
│   └── storage.js       # localStorage management
├── App.jsx             # Main app component with routing
└── main.jsx            # Entry point
```

## 🎓 How It Works

### Daily Lesson System
- Lessons rotate automatically each day based on the current date
- Uses modulo arithmetic: `dayIndex = (currentDate) % lessons.length`
- Same lesson appears for all users on the same day
- No backend or cron jobs required!

### Gamification
- **XP System**: Earn 10 XP for completing daily challenges
- **Levels**: Level up every 100 XP
- **Streaks**: Maintain your daily streak by completing challenges
- **Progress**: Track XP and streaks separately for each language

### Data Storage
All data is stored locally in the browser using `localStorage`:
- Selected language
- XP points (per language)
- Streak count (per language)
- Last completed date
- Completed lessons

## 📝 Development

### Adding New Lessons

Lessons are stored in `src/data/spanishLessons.js` and `src/data/japaneseLessons.js`.

Each lesson follows this structure:
```javascript
{
  title: "Lesson Title",
  vocabulary: [
    { word: "Word", translation: "Translation" },
    // For Japanese, include romaji:
    { word: "言葉", romaji: "kotoba", translation: "Word" }
  ],
  exampleSentence: "Example sentence",
  exampleSentenceRomaji: "Example sentence (for Japanese)", // Optional
  exampleTranslation: "English translation",
  grammarNote: "Grammar explanation"
}
```

### Adding Challenge Types

Challenge types rotate daily and are defined in `src/utils/dailySelector.js`. To add new types, modify the `getTodayChallengeType()` function.

## 🎨 Customization

### Styling
The app uses Tailwind CSS. Modify `tailwind.config.js` to customize colors, fonts, and other design tokens.

### Colors
- Primary: Blue gradient (`from-blue-500 to-green-500`)
- Success: Green (`green-500`)
- Warning: Orange/Red (`orange-400 to-red-500`)

## 🔮 Future Enhancements (Not Yet Implemented)

- Firebase authentication for cloud sync
- Audio pronunciation
- AI-generated lessons
- More languages
- Social features (leaderboards, friends)
- Mobile app version

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Built as a portfolio project for a computer science student.

## 🙏 Acknowledgments

- Inspired by Duolingo's gamified learning approach
- Built with modern web technologies
- Designed for free, accessible language learning

---

**Happy Learning! 🎉**
