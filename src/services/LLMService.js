/**
 * LLMService
 * Handles communication with Google Gemini API.
 */
export default class LLMService {
    static async generateResponse(input, language, history = []) {
        let apiKey;

        // 1. Check Environment Variable (Vite)
        if (!apiKey) {
            try {
                apiKey = import.meta.env.VITE_GEMINI_API_KEY;
            } catch (e) { /* Node env fallback */ }
        }

        // 3. Make the call
        // If API Key is present (Local Dev or Manual), call Google directly
        if (apiKey) {
            return this.callGoogleDirectly(apiKey, input, language, history);
        }

        // 4. If no key, call our secure backend endpoint (Production)
        return this.callBackendProxy(input, language, history);
    }

    static async callBackendProxy(input, language, history) {
        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ input, language, history })
            });

            if (!response.ok) {
                console.error('Backend API Error');
                return null;
            }

            const data = await response.json();
            return data.text;
        } catch (e) {
            console.error('Proxy Call Failed', e);
            throw e;
        }
    }

    static async callGoogleDirectly(apiKey, input, language, history) {
        const systemPrompt = `
You are a friendly, patient language tutor for beginners learning ${language}.
Your goal is to have a natural, simple conversation in ${language}.

Rules:
1. Reply in Romanized Japanese (Romaji) ONLY. Do not use Kanji or Kana.
2. Keep sentences short and simple (A1/A2 level).
3. Always provide an English translation in parentheses at the end.
4. If the user makes a small mistake, reply naturally but use the correct form.
5. Be encouraging!
6. Do not mention you are an AI unless asked.
    `.trim();

        // Filter history to ensure valid roles and content
        // Gemini expects roles: 'user' or 'model'
        const validHistory = history.filter(h => h.role === 'user' || h.role === 'model')
            .map(h => ({ role: h.role, parts: h.parts }));

        let contents = [];

        if (validHistory.length > 0) {
            contents = [...validHistory];
            contents.push({
                role: 'user',
                parts: [{ text: input }]
            });
        } else {
            contents = [
                {
                    role: 'user',
                    parts: [{ text: input }]
                }
            ];
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    system_instruction: {
                        parts: [{ text: systemPrompt }]
                    },
                    contents
                })
            });

            if (!response.ok) {
                const errorBody = await response.text();
                throw new Error(`Gemini API Error: ${response.status} - ${errorBody}`);
            }

            const data = await response.json();
            const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

            return text || null;

        } catch (error) {
            console.error('LLM Service Error:', error);
            // Re-throw with message to be caught by TutorBot
            throw error;
        }
    }
}
