import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.warn("VITE_GEMINI_API_KEY is missing. AI features will be disabled.");
}

const genAI = new GoogleGenerativeAI(API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const askGemini = async (prompt, context = "") => {
  try {
    if (!API_KEY) throw new Error("Gemini API Key is missing");

    const fullPrompt = `
      You are SwipeAI, a helpful assistant for the Swipe billing platform.
      Swipe is a simple billing and inventory management software for small businesses in India.
      It helps with GST billing, inventory, e-invoicing, and reports.
      
      User Context: ${context}
      User Question: ${prompt}
      
      Respond concisely and professionally in markdown format.
    `;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble connecting to my AI brain right now. Please check your API key.";
  }
};

export const swipeAISearch = async (query, data = []) => {
  try {
    if (!API_KEY) throw new Error("Gemini API Key is missing");

    const prompt = `
      You are a search assistant for a business dashboard.
      Here is the available data (in JSON): ${JSON.stringify(data.slice(0, 10))}
      The user is searching for: "${query}"
      
      Find the most relevant items and return a brief summary of what you found.
      If the user is asking to "create" something, explain how to do it in the app.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    return `Searching for "${query}"... (AI search requires a valid Gemini API Key)`;
  }
};
