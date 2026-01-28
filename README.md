# LinguaForge 🌍

Welcome to LinguaForge! This is a completely free language learning app where you can learn Spanish or Japanese at your own pace. Every day, you'll get a fresh lesson and challenge to complete. The best part? It's gamified with XP, levels, and streaks to keep you motivated—and it won't cost you a penny.

## What You Get

- **Fresh Lessons Daily**: Each day brings a new lesson that rotates automatically. Come back tomorrow to learn something different.
- **Daily Challenges**: Put what you've learned to the test with interactive exercises. We've got multiple choice, translations, and fill-in-the-blank challenges.
- **AI Tutor Chat**: Practice real conversation with an intelligent chatbot powered by Gemini. Get instant feedback on your grammar and have natural-feeling conversations in Spanish or Japanese.
- **Grammar Validation**: The chatbot catches grammar mistakes and helps you correct them, plus it validates patterns you're learning.
- **Earn XP & Build Streaks**: Feel that satisfaction of leveling up and maintaining your learning streak. It's the little wins that keep you going.
- **Track Your Progress**: Keep tabs on how far you've come in Spanish and Japanese separately.
- **Completely Free**: No hidden fees, no premium tiers, no paywalls. Just pure, accessible language learning.
- **Clean & Intuitive Design**: The UI is inspired by Duolingo but built to feel modern and fun.

## The Tech Stack

Under the hood, LinguaForge uses:
- **React** with **Vite** for fast, efficient frontend development
- **Tailwind CSS** to make the interface look polished
- **React Hooks** and **localStorage** to manage your progress locally
- **React Router** for smooth navigation between pages
- Hosted for free on **Vercel**

## Getting Started

### Running Locally

Want to check out the code and run it on your machine? Here's how:

1. Clone this repository:
```bash
git clone <your-repo-url>
cd LinguaForge
```

2. Install the dependencies:
```bash
npm install
```

3. Fire up the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`—you're all set!

## How the App is Organized

```
src/
├── components/          # The building blocks—reusable UI pieces
│   ├── LessonCard.jsx
│   ├── ChallengeCard.jsx
│   ├── ChatBot.jsx         # Chat interface component
│   ├── StreakCounter.jsx
│   └── XPBar.jsx
├── pages/              # The main screens users interact with
│   ├── Home.jsx        # Pick your language
│   ├── Learn.jsx       # Daily lessons and challenges
│   └── Chat.jsx        # AI tutor conversation page
├── chatbot/            # The AI tutor engine
│   ├── TutorBot.js        # Main chatbot logic
│   ├── InputClassifier.js # Understands user intent
│   ├── GrammarValidator.js # Checks grammar patterns
│   └── ResponseGenerator.js # Generates feedback
├── data/               # All the lessons live here
│   ├── spanishLessons.js
│   └── japaneseLessons.js
├── services/           # External services
│   └── LLMService.js      # Connects to Gemini AI
├── utils/              # Helper functions
│   ├── dailySelector.js  # Figures out what lesson/challenge is today's
│   └── storage.js       # Saves and loads your progress
├── App.jsx             # The main component that ties everything together
└── main.jsx            # Where the app starts
```

## The Smart Stuff: How It Actually Works

### Daily Lessons Rotate Automatically
Every day, a new lesson appears—no backend needed, no cron jobs required. Here's the trick: we use the current date and apply a simple modulo formula to pick from our lesson library. So everyone sees the same lesson on the same day, and the lesson changes automatically at midnight.

### The Gamification System
To keep you motivated, we've built in a few reward mechanics:
- **XP**: You earn 10 points when you complete a daily challenge.
- **Levels**: Every 100 XP, you level up. Simple and satisfying.
- **Streaks**: Complete a challenge every day to maintain your streak. The higher it goes, the more momentum you build.
- **Separate Tracking**: Your progress in Spanish doesn't affect your Japanese progress—you can focus on both independently.

### Your Progress Stays With You
Everything is saved right in your browser using `localStorage`. No sign-up needed, no accounts to manage. Your XP, streaks, completed lessons—it's all there next time you open the app.

## 📝 Development
=======
### The AI Tutor: Real Conversation Practice
The chatbot feature uses Google's Gemini AI to power a conversational tutor. Here's how it works:

- **Input Classification**: The bot understands what you're trying to do—ask a question, practice grammar, have casual conversation.
- **Grammar Validation**: It checks your input against common learner patterns and catches mistakes.
- **Smart Responses**: If your input is grammatically correct or it's free-form conversation, the AI generates natural responses. If there's an error, you get immediate feedback and correction.
- **No Sign-Up Required**: Just type and chat. Your API key is configured once, and you're ready to practice anytime.


## Want to Add More Content?

### Creating New Lessons

Lessons are stored in `src/data/spanishLessons.js` and `src/data/japaneseLessons.js`. To add a new one, follow this structure:

```javascript
{
  title: "What You'll Learn",
  vocabulary: [
    { word: "Spanish Word", translation: "English" },
    // For Japanese, add romaji too:
    { word: "日本語", romaji: "nihongo", translation: "Japanese language" }
  ],
  exampleSentence: "A sentence using the new vocab",
  exampleSentenceRomaji: "Example (for Japanese)", // Optional
  exampleTranslation: "English translation",
  grammarNote: "Any important grammar rules to know"
}
```

### Customizing the Chatbot

The chatbot logic lives in `src/chatbot/`. Here's what each file does:

- **TutorBot.js**: The orchestrator—it coordinates classification, validation, and response generation
- **InputClassifier.js**: Identifies what the user is trying to do (practice grammar, ask a question, etc.)
- **GrammarValidator.js**: Checks input against learner patterns and basic grammar rules
- **ResponseGenerator.js**: Creates corrective feedback when grammar issues are detected
- **LLMService.js** (in services/): Handles communication with the Gemini AI API

You can modify these to add custom feedback, new grammar patterns, or different response styles.

### Adding Challenge Types

Challenge types cycle daily in `src/utils/dailySelector.js`. Want to add more? Tweak the `getTodayChallengeType()` function and you'll have fresh challenge types rotating in.

## Personalizing the Look & Feel

The app is styled with Tailwind CSS, so you can customize pretty much anything. Here's what to change:

- **Design settings**: Check out `tailwind.config.js`
- **Main colors**:
  - Primary gradient: Blue to green (`from-blue-500 to-green-500`)
  - Success: Green (`green-500`)
  - Warnings/highlights: Orange to red (`orange-400 to-red-500`)

Tweak these and the whole app reflects your style.

## What's Next? Ideas for the Future

We have big plans. Here's what we'd like to add down the road (but isn't implemented yet):

- Cloud sync with user accounts (Firebase auth)
- Audio for proper pronunciation practice
- AI-generated lessons tailored to your level
- More languages beyond Spanish and Japanese
- A community leaderboard to see how you stack up
- Social features so you can learn with friends
- A mobile app for learning on the go

## License & Credits

This project is open source and built for educational purposes. Feel free to use it, learn from it, or build on top of it.

Created as a portfolio project to showcase modern web development practices and a love for language learning.

### Shout-Outs

- Inspired by [Duolingo](https://duolingo.com)'s approach to making language learning fun and addictive
- Built with incredible modern tools: React, Vite, and Tailwind CSS
- Created with the goal of making language learning free and accessible to everyone

---

**Start learning today. Your next language is waiting! 🚀**
