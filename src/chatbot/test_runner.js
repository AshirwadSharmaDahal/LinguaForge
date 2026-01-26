import TutorBot from './TutorBot.js';

const testCases = [
    { input: 'watashi wa gakusei desu', language: 'japanese', expectedValid: true },
    { input: 'watashi gakusei', language: 'japanese', expectedValid: false },
    { input: 'yo soy estudiante', language: 'spanish', expectedValid: true },
    { input: 'soy estudiar', language: 'spanish', expectedValid: false },
    { input: 'random sentence', language: 'japanese', expectedValid: false }, // Should fall into unknown (which is "valid"ly handled as a fallback, but technically "invalid" grammar structure? Wait, unknown intent returns specific fallback message.)
    // The Prompt says: If input is VALID: Confirm correctness.
    // If input is INVALID: Explain what's wrong.
    // If input does not match any known rule: Fallback Response.
    // My ResponseGenerator returns structured objects. I should check the TEXT content or structure.
];

console.log("Running Chatbot Tests...\n");

const runTests = async () => {
    for (const { input, language, expectedValid } of testCases) {
        console.log(`Testing: "${input}" (${language})`);
        const response = await TutorBot.process(input, language);

        // Inspect response
        if (!response) {
            console.error("FAIL: No response returned.\n");
            continue;
        }

        const isFallback = response.text && response.text.includes("I can't confidently evaluate");
        const isSuccess = response.text && (response.text.includes("✅") || response.text.includes("Correct") || response.text.includes("Perfect") || response.type === 'ai');
        const isError = response.text && response.text.includes("❌");

        console.log(`Response: ${response.text}`);
        if (response.subtext) console.log(`Subtext: ${response.subtext}`);
        if (response.correction) console.log(`Correction: ${response.correction}`);

        // Validation Logic
        if (input === 'random sentence') {
            if (isFallback) console.log("PASS: Correctly handled as unknown/fallback (in Node environment).\n");
            else console.error("FAIL: Should be fallback.\n");
            continue;
        }

        if (expectedValid) {
            if (isSuccess) console.log("PASS: Valid input accepted.\n");
            else console.error("FAIL: Valid input rejected.\n");
        } else {
            if (isError || isFallback) console.log("PASS: Invalid input rejected.\n");
            else console.error("FAIL: Invalid input accepted.\n");
        }
    }
}

runTests();
