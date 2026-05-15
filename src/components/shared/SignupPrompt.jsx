import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../ui/Button'

export default function SignupPrompt() {
  const [show, setShow] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Show popup after 30 seconds on landing page
    const timer = setTimeout(() => {
      if (!dismissed && !sessionStorage.getItem('signup_prompt_dismissed')) {
        setShow(true)
      }
    }, 30000)
    return () => clearTimeout(timer)
  }, [dismissed])

  const handleDismiss = () => {
    setShow(false)
    setDismissed(true)
    sessionStorage.setItem('signup_prompt_dismissed', 'true')
  }

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleDismiss}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
          >
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 relative overflow-hidden">
              {/* Decorative gradient */}
              <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-secondary to-pink-500" />

              {/* Close */}
              <button
                onClick={handleDismiss}
                className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Icon */}
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
                <Zap size={28} className="text-primary" />
              </div>

              {/* Content */}
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Start billing for free!
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Join 20,00,000+ businesses using Swipe. Create GST invoices, manage inventory, and track payments - all in one place.
              </p>

              {/* Benefits */}
              <div className="space-y-2.5 mb-6">
                {['Unlimited invoices on free plan', 'No credit card required', 'Set up in under 60 seconds'].map((item) => (
                  <div key={item} className="flex items-center gap-2.5 text-sm text-gray-700">
                    <div className="w-5 h-5 rounded-full bg-success/10 flex items-center justify-center shrink-0">
                      <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    {item}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link to="/auth/login" onClick={handleDismiss}>
                <Button as="motion" fullWidth size="lg">
                  Sign up for free →
                </Button>
              </Link>
              <button
                onClick={handleDismiss}
                className="w-full mt-3 text-sm text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                Maybe later
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
