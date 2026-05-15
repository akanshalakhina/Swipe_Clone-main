import { motion } from 'framer-motion'
import { Sparkles, ArrowRight, Brain, TrendingUp, MessageSquare } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

export default function SwipeAIPage() {
  return (
    <div className="pt-24 lg:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-purple-100 text-purple-600 mb-6"
          >
            <Sparkles size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
          >
            Meet Swipe AI <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-500">
              Your Billing Assistant
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10"
          >
            Automate data entry, get smart business insights, and let AI chase payments for you. The future of accounting is here.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button as={Link} to="/auth/login" size="lg" icon={ArrowRight} iconPosition="right">Try Swipe AI Free</Button>
            <Button variant="outline" size="lg">Watch Demo</Button>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gray-50 rounded-3xl p-8"
          >
            <Brain className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Auto-Categorization</h3>
            <p className="text-gray-600">Upload a photo of any purchase bill. Swipe AI instantly reads, categorizes, and enters the data into your ledger.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 rounded-3xl p-8"
          >
            <TrendingUp className="text-emerald-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Insights</h3>
            <p className="text-gray-600">Ask Swipe AI questions like "What was my profit last month?" or "Which product sold the most?" and get instant answers.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 rounded-3xl p-8"
          >
            <MessageSquare className="text-rose-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-3">AI Payment Chaser</h3>
            <p className="text-gray-600">Swipe AI crafts polite, personalized WhatsApp reminders to your customers based on their payment history.</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
