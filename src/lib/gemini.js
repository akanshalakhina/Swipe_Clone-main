import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Debug log for API Key (masked)
console.log("Swipe AI: Initializing with Key:", API_KEY ? "PRESENT (VITE_...)" : "MISSING");

let genAI = null;
if (API_KEY) {
  genAI = new GoogleGenerativeAI(API_KEY);
}

const SYSTEM_PROMPT = `You are the Swipe AI Assistant, a friendly and professional support expert for Swipe (getswipe.in). 
Swipe is a simple GST billing, invoicing, and inventory management software designed for small businesses and SMEs in India.

Key Features of Swipe:
1. Invoicing: Create professional GST invoices in 10 seconds.
2. E-way Bills: Generate E-way bills instantly.
3. E-Invoicing: One-click E-invoicing.
4. Inventory Management: Track stock, set alerts, and manage multiple warehouses.
5. Payments: Accept payments via UPI, QR, and Razorpay.
6. Reports: Generate 40+ reports like GSTR-1, P&L, etc.
7. Online Store: Set up your own e-commerce store in minutes.

Your Tone:
- Professional yet approachable.
- Helpful and concise.
- Use bullet points for clear steps.
- If you don't know something specific about a user's account data, ask them to check their dashboard or contact support@getswipe.in.

Contact Details:
- Support Email: support@getswipe.in
- Phone: +91 812 133 5436
- Website: https://getswipe.in

Always respond in helpful markdown. Avoid technical jargon unless necessary.`;

/**
 * Perform a search or chat query using Gemini AI
 * @param {string} prompt - User's question
 * @returns {Promise<string>} - AI Response
 */
export async function swipeAISearch(prompt) {
  if (!API_KEY) {
    console.error("Swipe AI: API Key is missing in environment variables.");
    return "Swipe AI is currently in offline mode. Please add a valid Gemini API Key to your environment variables (VITE_GEMINI_API_KEY).";
  }

  if (!genAI) {
    genAI = new GoogleGenerativeAI(API_KEY);
  }

  try {
    // Use the latest gemini-2.0-flash model as requested
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT
    });

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    console.log("Swipe AI: Sending request to gemini-2.0-flash...");
    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    return text;
  } catch (error) {
    console.error("Swipe AI Error:", error);

    // Handle specific error cases
    if (error.message?.includes("404")) {
      return "Error: The AI model 'gemini-2.0-flash' was not found. This might be due to regional availability or an incorrect model name. Falling back to support mode.";
    }
    
    if (error.message?.includes("429")) {
      return "AI limit reached. Our support specialist will get back to you soon, or you can try again in a minute!";
    }

    if (error.message?.includes("API_KEY_INVALID")) {
      return "Configuration Error: The provided Gemini API Key is invalid. Please check your .env.local file.";
    }

    return "Our support team is currently busy, but I've noted your query. Feel free to contact us at support@getswipe.in or +91 8121335436 for urgent assistance!";
  }
}
