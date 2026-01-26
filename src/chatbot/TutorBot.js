import InputClassifier from './InputClassifier.js';
import GrammarValidator from './GrammarValidator.js';
import ResponseGenerator from './ResponseGenerator.js';
import LLMService from '../services/LLMService.js';

export default class TutorBot {
    static async process(input, language, history = []) {
        // 1. Classify
        const intent = InputClassifier.classify(input, language);

        // 2. Validate
        // (We still want to catch strict errors if it LOOKS like a beginner pattern but is wrong)
        const validation = GrammarValidator.validate(input, language, intent);

        // HYBRID LOGIC:
        // If invalid (strict grammar error), return the strict correction immediately.
        // If valid OR unknown (meaning it's free-form conversation), use AI.

        if (!validation.isValid) {
            // Return strict error response (synchronous)
            return ResponseGenerator.generate(input, intent, validation, language);
        }

        // If we are here, it's either a valid pattern OR an unknown pattern (which we now allow as conversation).
        // Let's try AI.

        try {
            const aiText = await LLMService.generateResponse(input, language, history);

            if (aiText) {
                return {
                    text: aiText,
                    sender: 'bot',
                    type: 'ai',
                    // We can still add a small tip if it was a known valid pattern
                    tip: validation.isValid && intent !== 'unknown' ? "Perfect grammar!" : null
                };
            } else {
                // AI returned null (e.g. key missing or proxy failed)
                return {
                    text: "⚠️ Conversation Error",
                    subtext: "I couldn't reach the AI brain.",
                    correction: "Check if the API Key is loaded or if the server is running.",
                    sender: 'bot'
                };
            }
        } catch (e) {
            console.error("AI failed, falling back to rules", e);
            return {
                text: "⚠️ Application Error",
                subtext: e.message || "Unknown error",
                sender: 'bot'
            };
        }

        // Fallback should technically be unreachable if we handle both cases above, 
        // but keeps safety
        return ResponseGenerator.generate(input, intent, validation, language);
    }
}
