/**
 * GrammarValidator
 * Strictly validates input against allowed patterns.
 */
export default class GrammarValidator {
    static validate(input, language, intent) {
        // Questions and Greetings - Pass to AI/Rules (Always valid structure for strict purposes)
        if (intent === 'greeting' || intent === 'question') {
            return { isValid: true };
        }

        if (language === 'japanese') {
            return this.validateJapanese(input);
        } else {
            return this.validateSpanish(input);
        }
    }

    static validateJapanese(input) {
        const text = input.trim().toLowerCase().replace(/[.!]+$/, '');

        // Pattern: [pronoun] wa [noun] desu
        const validPattern = /^(watashi|boku)\s+wa\s+([a-z\s]+)\s+desu$/;

        if (validPattern.test(text)) {
            return { isValid: true, message: 'Grammatically correct!', matches: text.match(validPattern) };
        }

        // --- RELAXED MODE ---
        // The user wants the AI to handle corrections, so we do NOT block.
        // We only return isValid: true to let it pass to the AI.

        return { isValid: true };

        // If it starts with "Sushi" or anything else?
        // It falls through here. 
        // Previously returned "Pattern not recognized".
        // NOW: Return valid to let AI handle it.
    }

    static validateSpanish(input) {
        const text = input.trim().toLowerCase().replace(/[.!]+$/, '');

        // Strict Patterns
        if (/^(yo\s+)?soy\s+([a-zñ\s]+)$/.test(text)) {
            if (text.includes('soy estudiar') || text.includes('soy comer')) {
                return { isValid: false, error: 'Do not use "soy" with an infinitive verb.', correction: 'Use "Yo estudio..." or "Yo soy estudiante".' };
            }
            return { isValid: true, message: 'Correcto!' };
        }
        if (/^(yo\s+)?estudio\s+([a-zñ\s]+)$/.test(text)) return { isValid: true, message: 'Correcto!' };

        // --- RELAXED MODE ---
        // Pass everything to AI.
        return { isValid: true };
    }
}
