/**
 * InputClassifier
 * Classifies user input into intents: greeting, self_introduction, simple_statement, question, or unknown.
 */
export default class InputClassifier {
  static classify(input, language) {
    const text = input.toLowerCase().trim();

    if (language === 'japanese') {
      return this.classifyJapanese(text);
    } else {
      return this.classifySpanish(text);
    }
  }

  static classifyJapanese(text) {
    // Greetings
    if (/^(konnichiwa|ohayou|konbanwa|moshi moshi)/.test(text)) {
      return 'greeting';
    }

    // Questions (ending in ka)
    if (/ka\??$/.test(text) || text.includes('nan desu ka')) {
      return 'question';
    }

    // Self Introduction / Simple Statement (X wa Y desu)
    // Also catch "watashi ..." or "... desu" to validate potential broken sentences
    if (text.includes(' wa ') || text.includes('desu') || text.startsWith('watashi') || text.startsWith('boku')) {
      return 'simple_statement';
    }

    return 'unknown';
  }

  static classifySpanish(text) {
    // Greetings
    if (/^(hola|buenos dias|buenas tardes)/.test(text)) {
      return 'greeting';
    }

    // Questions
    if (text.includes('?') || /^(que|como|donde|quien)/.test(text)) {
      return 'question';
    }

    // Statements
    // Catch "yo ..." or leading verbs common in beginner mistakes to allow validator to explain
    if (text.startsWith('yo ') || text.startsWith('soy ') || text.startsWith('estudio ') || text.startsWith('mi nombre')) {
      return 'simple_statement';
    }

    return 'unknown';
  }
}
