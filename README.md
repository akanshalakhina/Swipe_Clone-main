# Swipe Clone 🚀

A pixel-perfect, production-ready clone of the [Swipe.in](https://getswipe.in) billing and inventory management platform. Built with a modern tech stack and integrated with Gemini AI for intelligent business management.

## ✨ Features

- **📊 Professional Dashboard**: Real-time sales, expenses, and profit tracking with beautiful charts.
- **🧾 Lightning Fast Invoicing**: Create GST-compliant invoices in under 10 seconds.
- **📦 Inventory Management**: Track stock levels, low-stock alerts, and total inventory value.
- **🤖 SwipeAI (Gemini Powered)**:
  - **Intelligent Chatbot**: Instant support and business advice using Google Gemini.
  - **Smart Search**: Natural language search to find products, invoices, or help articles.
- **🛡️ Secure Auth**: Robust authentication via Firebase with OTP and Google Login.
- **☁️ Cloud Sync**: All your data is securely stored and synced via Cloud Firestore.

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion
- **Backend/DB**: Firebase (Auth, Firestore)
- **AI**: Google Generative AI (Gemini Flash)
- **State Management**: Zustand
- **Charts**: Recharts

## 🚀 Getting Started

1. **Clone the repository**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Setup Environment Variables**:
   Create a `.env.local` file with the following:
   ```env
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_GEMINI_API_KEY=your_gemini_key
   ```
4. **Run development server**:
   ```bash
   npm run dev
   ```

## 📄 License

MIT License. Feel free to use and modify for your own projects.
