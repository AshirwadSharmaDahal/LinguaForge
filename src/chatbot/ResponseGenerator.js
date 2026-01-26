/**
 * ResponseGenerator
 * Generates the final response object.
 */
export default class ResponseGenerator {
    static generate(input, intent, validation, language) {
        // 1. Handle Unknown / Fallback
        if (intent === 'unknown') {
            return {
                text: "❌ I can't confidently evaluate this yet.",
                subtext: "Try one of these patterns:",
                examples: language === 'japanese'
                    ? ['Watashi wa gakusei desu', 'Boku wa sensei desu']
                    : ['Yo soy estudiante', 'Yo estudio español']
            };
        }

        // 2. Handle Invalid Structure
        if (!validation.isValid) {
            return {
                text: `❌ ${validation.error}`,
                subtext: "Correct Pattern:",
                correction: validation.correction,
                examples: [validation.correction] // simplified
            };
        }

        // 3. Handle Valid Structure
        // Greetings
        if (intent === 'greeting') {
            return {
                text: "✅ Greeting recognized!",
                translation: "Hello/Good morning.", // Generic since we didn't parse exact map
                tip: "Greetings are the start of every connection!"
            };
        }

        // Statements
        if (intent === 'simple_statement') {
            const translation = this.mockTranslate(input, language);
            return {
                text: "✅ Perfect syntax!",
                translation: translation,
                tip: language === 'japanese'
                    ? "Remember: 'wa' marks the topic!"
                    : "In Spanish, you can often drop 'yo'!"
            };
        }

        return {
            text: "✅ Valid input.",
            translation: "Good job."
        };
    }

    static mockTranslate(input, language) {
        // Very basic mock translation for demo purposes
        if (language === 'japanese') {
            if (input.includes('gakusei')) return "I am a student.";
            if (input.includes('sensei')) return "I am a teacher.";
            return "I am [noun].";
        }
        if (language === 'spanish') {
            if (input.includes('estudiante')) return "I am a student.";
            if (input.includes('estudio')) return "I am studying something.";
            return "I am [noun]/studying.";
        }
        return "Meaning: ...";
    }
}
