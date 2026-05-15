import { motion } from 'framer-motion'

export default function ApiPage() {
  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          Developer <span className="text-blue-600">API</span>
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Integrate Swipe's powerful billing, inventory, and payment features directly into your own software. Our robust REST API makes it easy.
        </p>
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"></polyline><polyline points="8 6 2 12 8 18"></polyline></svg>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">API Documentation Coming Soon</h3>
          <p className="text-gray-500 mb-6">We are currently putting the finishing touches on our public API documentation. Enter your email to get notified when we launch.</p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" placeholder="developer@company.com" className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-100 outline-none" />
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors">Notify Me</button>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
