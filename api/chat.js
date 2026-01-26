export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { input, language, history = [] } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
        return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
    }

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

    // Construct Contents with History
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
            const errText = await response.text();
            throw new Error(`Gemini API Error: ${response.status} - ${errText}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

        return res.status(200).json({ text: text || "I didn't understand that." });

    } catch (error) {
        console.error('API Error:', error);
        return res.status(500).json({ error: 'Failed to generate response' });
    }
}
