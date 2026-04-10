// backend/routes/chatbot.js - Sakhi AI Literature Assistant v3.0
// Powered by Google Gemini AI with robust offline fallback

const { GoogleGenerativeAI } = require('@google/generative-ai');

// Offline Fallback AI to ensure meaningful responses without API quota
function offlineFallback(message, context) {
  const msg = message.toLowerCase();
  let responseText = "";
  
  if (msg.includes("love") || msg.includes("prem") || msg.includes("mohabbat") || msg.includes("ishq")) {
    responseText = "Love is the essence of all poetry. As Rajan Rai says, *\"Love is not what you feel - it is what you become.\"*\n\nHere is a beautiful thought on love:\n\n*रहिमन धागा प्रेम का, मत तोड़ो चटकाय,*\n*टूटे से फिर ना जुड़े, जुड़े गाँठ पड़ जाय।*\n- Rahim Das\n\nIs there a specific poet whose romantic works you'd like to explore?";
  } 
  else if (msg.includes("sad") || msg.includes("virah") || msg.includes("pain") || msg.includes("dard")) {
    responseText = "Pain and separation (Virah) have birthed the greatest literature. Remember this wisdom:\n\n*\"Every storm within you is just a sunrise waiting to break.\"* - Rajan Rai\n\nSometimes, the deepest sadness brings the most profound awakening. Stay strong, my friend.";
  }
  else if (msg.includes("kabir")) {
    responseText = "Sant Kabir Das was an extraordinary 15th-century mystic poet. His 'Dohe' (couplets) carry timeless spiritual wisdom.\n\nHere is one of my favorites:\n*मन रे तन कागद का पुतला,*\n*लागे बूंद बिनसि जाए छिन में।*\n\n(O mind, this body is but a puppet of paper. A single drop of water can destroy it in a moment).";
  }
  else if (msg.includes("ghalib") || msg.includes("mirza")) {
    responseText = "Mirza Ghalib is a pillar of Urdu poetry and shayari. His words resonate deeply with the human condition.\n\n*\"Hazaron khwahishen aisi ke har khwahish pe dam nikle,*\n*Bahut niklay mere armaan, lekin phir bhi kam nikle.\"*\n\nHe truly understood the endless desires of the human heart, didn't he?";
  }
  else if (msg.includes("rajan") || msg.includes("founder")) {
    responseText = "**Rajan Rai** is the visionary founder of Niharika and a profound philosopher-poet born on August 16, 2005. He built this platform to keep the vibrant traditions of Hindi and English poetry freely accessible to all.\n\nOne of his powerful quotes is: *\"A man can do anything, when he realises he is a man.\"*";
  }
  else if (msg.includes("karma") || msg.includes("philosophy") || msg.includes("sufism") || msg.includes("stoicism")) {
    responseText = "Philosophy teaches us how to live. Karma (action) is the fundamental law of cause and effect. As you sow, so shall you reap.\n\n*\"The mind that questions itself is already wiser than most.\"* - Rajan Rai\n\nTrue wisdom begins with self-reflection. What philosophical concept draws you the most?";
  }
  else if (msg.includes("motivate") || msg.includes("inspire") || msg.includes("quote")) {
    responseText = "Here is a spark of motivation for your soul today:\n\n*\"The strongest man is not the one who never falls - it is the one who always rises.\"*\n- Rajan Rai\n\nEvery day is a new canvas. What masterpiece will you paint today?";
  }
  else if (msg.includes("poem") || msg.includes("kavita") || msg.includes("shayari")) {
    responseText = "Poetry is the language of the soul. Here is a beautiful reflection for you:\n\n*\"Truth does not need many words - it only needs one honest moment.\"* - Rajan Rai\n\nWould you like to hear a passionate nazm, a classical doha, or a romantic sher?";
  }
  else if (msg.includes("hello") || msg.includes("hi") || msg.includes("namaste")) {
    responseText = "🙏 Namaste! I am Sakhi, your AI poetry companion here at Niharika. I am delighted to speak with you today!\n\nWhether you wish to explore profound philosophy, read soul-stirring shayari, or discover the works of great poets, I am here for you. How may I assist your literary journey today?";
  }
  else {
    responseText = `I hear you completely. While my primary link to the deeper AI brain is momentarily resting due to high demand, I am always here for you.\n\nWould you like to hear a beautiful Sher, explore a new word from the Niharika Dictionary, or read an inspiring quote by our founder Rajan Rai?`;
  }

  return {
    text: responseText,
    type: "offline_fallback",
    suggestions: [
      "Share a love shayari", 
      "Tell me about Kabir Das", 
      "Give me a motivational quote", 
      "Who is Rajan Rai?"
    ]
  };
}

async function generateResponse(message, context = {}) {
  try {
    const { poets = [], dictionary = {} } = context;
    const apiKey = process.env.GEMINI_API_KEY;
    
    // If no API key is provided, gracefully fallback instead of erroring
    if (!apiKey || apiKey.includes('AIzaSyCSM4uF')) {
      console.warn("Using Niharika Offline AI Fallback. (Valid GEMINI_API_KEY is not defined or reached quota limit)");
      return offlineFallback(message, context);
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
    console.error("Gemini AI Processing Error:", error.message);
    // Ensure the chatbot always returns meaningful responses instead of internal error
    return offlineFallback(message, context);
  }
}

module.exports = { generateResponse };
