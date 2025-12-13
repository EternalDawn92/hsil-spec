// service.js
const Groq = require('groq-sdk');
const { validateAndRepairHSIL, FALLBACK_HSIL } = require('./hsil');

let groq;

try {
    groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });
} catch (error) {
    console.warn("Groq SDK failed to initialize (likely missing API key). Service will use fallback.");
}

const SYSTEM_PROMPT = `You are an encoder for HSIL (Human Semantic Intention Language) v0.1.

Given a natural language intention, output ONLY a JSON object with these fields:

- "type": one of the 20 HSIL Intent Elements:
  Exploratory: "E1_Discover","E2_Understand","E3_SeekNovelty","E4_Observe","E5_Expand"
  Transformative: "T1_Create","T2_Modify","T3_Optimize","T4_Construct","T5_Transition"
  Protective: "P1_Preserve","P2_Defend","P3_Stabilize","P4_Avoid","P5_Anchor"
  Relational: "R1_Connect","R2_Communicate","R3_Collaborate","R4_Empathize","R5_Belong"

- "intensity": a float between 0.0 and 1.0  
- "scope": one of "Self","Other","Group","Object","Environment","System"
- "temporal": one of "Immediate","ShortTerm","LongTerm"

Rules:
- Return ONLY JSON, with NO explanation or markdown.
- Do not include extra keys.
- Choose the closest matching intent type based on the text.
- Infer scope, temporal, and intensity from context.
- If uncertain, pick the most reasonable values.`;

async function encodeIntent(text) {
    if (!process.env.GROQ_API_KEY || !groq) {
        console.log("No GROQ_API_KEY found or SDK init failed. Returning fallback HSIL.");
        // Simulate a small delay to feel like a request
        await new Promise(resolve => setTimeout(resolve, 500));
        return FALLBACK_HSIL;
    }

    try {
        const chatCompletion = await groq.chat.completions.create({
            messages: [
                { role: 'system', content: SYSTEM_PROMPT },
                { role: 'user', content: text }
            ],
            model: 'llama-3.1-8b-instant',
            temperature: 0.1, // low temperature for deterministic output
            response_format: { type: 'json_object' } // Enforce JSON if model supports it, Llama 3.1 often does via prompting or SDK hints
        });

        const content = chatCompletion.choices[0]?.message?.content;
        if (!content) {
            throw new Error("Empty response from Groq");
        }

        const rawHSIL = JSON.parse(content);
        return validateAndRepairHSIL(rawHSIL);

    } catch (error) {
        console.error("Error during Groq intent encoding:", error);
        return FALLBACK_HSIL;
    }
}

module.exports = { encodeIntent };
