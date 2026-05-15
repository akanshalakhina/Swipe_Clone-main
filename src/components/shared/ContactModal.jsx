import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Mail, MessageCircle, Star } from 'lucide-react'
import useUIStore from '../../store/uiStore'
import Button from '../ui/Button'

const quickReplies = [
  'I want to schedule a demo',
  'I want to know more about Swipe',
  'Help me with pricing details',
  'I have a question about a feature',
  'know more about a feature'
]

export default function ContactModal() {
  const { isContactOpen, setContactOpen } = useUIStore()
  const [message, setMessage] = useState('')

  if (!isContactOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gray-900/40 backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        >
          {/* Close Button */}
          <button
            onClick={() => setContactOpen(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors z-10"
          >
            <X size={20} />
          </button>

          {/* Left Side - Info */}
          <div className="flex-1 p-8 md:p-12 bg-gray-50/50">
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Get in touch<br />with us</h2>
            <p className="text-gray-600 mb-10 text-lg">
              Get help with pricing plans, schedule a demo, explore use-cases for your business, and more.
            </p>

            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Contact Information</h3>
                <p className="text-sm text-gray-500 mb-4">Reach out to sales. We respond fast!</p>
                
                <div className="flex items-center gap-3 text-lg font-medium text-gray-900 mb-3">
                  <MessageCircle className="text-gray-400" />
                  +91 8121 33 5436
                </div>
                <div className="flex items-center gap-3 text-lg font-medium text-gray-900">
                  <Mail className="text-gray-400" />
                  support@getswipe.in
                </div>
              </div>

              <div className="pt-8">
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center text-xs overflow-hidden">
                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}&backgroundColor=e5e7eb`} alt="avatar" />
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-0.5 text-yellow-400 ml-2">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                </div>
                <p className="text-sm text-gray-600 font-medium">Trusted by 20,00,000+ businesses</p>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="flex-[1.2] p-8 md:p-12">
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Your Name or Company Name*</label>
                <input type="text" placeholder="Enter your name" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" required />
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Phone Number*</label>
                <input type="tel" placeholder="Enter phone number" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" required />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-1.5">Your Email</label>
                <input type="email" placeholder="Enter your email" className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors" />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">Your message to us!</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {quickReplies.map((reply) => (
                    <button
                      key={reply}
                      type="button"
                      onClick={() => setMessage(reply)}
                      className="px-3 py-1.5 text-xs font-medium text-orange-600 bg-orange-50 border border-orange-100 rounded-full hover:bg-orange-100 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors min-h-[100px] resize-none"
                />
              </div>

              <Button fullWidth size="lg" className="rounded-xl mt-2 text-base font-semibold py-3">
                Contact Us
              </Button>
              
              <p className="text-center text-xs text-gray-400 mt-4">
                You'll hear from us within 2 hours (during business hours). Your info is safe and will never be shared.
              </p>
            </form>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
