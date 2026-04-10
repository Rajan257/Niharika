// backend/routes/chatbot.js - Sakhi AI Literature Assistant v3.0
// Powered by Google Gemini AI

const { GoogleGenerativeAI } = require('@google/generative-ai');

async function generateResponse(message, context = {}) {
  try {
    const { poets = [], dictionary = {} } = context;
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      console.warn("GEMINI_API_KEY is not defined in the .env file.");
      return { 
        text: "I am temporarily blinded by the lack of an API key. Please ensure GEMINI_API_KEY is properly set in the backend configuration.", 
        type: "error" 
      };
    }

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    // Distill relevant context to save tokens if needed, though we can pass broad guidance
    const contextPrompt = `
You are "Sakhi", the graceful, poetic, and highly intelligent AI companion of the "Niharika Literature Platform", founded by Rajan Rai. 
You reply in a warm, polite, and deeply encouraging tone. You love Hindi poetry, Urdu Shayari, and profound philosophical discussions. 
You are fluent in both English and Hindi (and Hinglish).

Core Directives:
1. If the user asks for a poem, shayari, or ghazal, provide a beautiful example with proper formatting and always attribute the author.
2. If asked about vocabulary or dictionary words, explain them clearly with literary context.
3. If asked about Niharika or Rajan Rai, note that Niharika is India's premium free poetry platform and Rajan Rai is a philosopher-poet who founded it.
4. Always respond in character as "Sakhi". You are helpful, insightful, and compassionate.

User Query: "${message}"

Respond naturally and directly with your conversational text. Do not wrap your response in JSON. Use markdown, bolding, and emojis gracefully.
`;

    const result = await model.generateContent(contextPrompt);
    const textOutput = result.response.text();

    return {
      text: textOutput,
      type: "genai",
      suggestions: [
        "Tell me about Kabir Das", 
        "Share a love shayari", 
        "What is the meaning of Virah?", 
        "Inspire me with Rajan Rai's quotes"
      ]
    };
  } catch (error) {
    console.error("Gemini AI Processing Error:", error);
    return {
      text: "Sakhi kshama chahti hai. Aise lagta hai jaise main kuch der ke liye soch mein ghum gai. (I experienced an internal error connecting to the AI brain. Please try again).",
      type: "error"
    };
  }
}

module.exports = { generateResponse };
