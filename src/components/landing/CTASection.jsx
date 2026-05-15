import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Sparkles } from 'lucide-react'
import Button from '../ui/Button'

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary-50 text-primary text-sm font-medium rounded-full mb-6 border border-primary/10">
            <Sparkles size={14} />
            Free forever plan available
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 leading-tight mb-5">
            Don't wait, take the<br />
            <span className="gradient-text">first step!</span>
          </h2>

          <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10">
            Over 20,00,000+ businesses simplified their invoicing with Swipe. Join them today - it's free.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/auth/login">
              <Button as="motion" size="xl" icon={ArrowRight} iconPosition="right" className="text-base">
                Sign up for free
              </Button>
            </Link>
            <a href="#" className="text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-1">
              Download the app →
            </a>
          </div>

          {/* Trust indicator */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <div className="flex -space-x-2">
              {['bg-blue-500', 'bg-pink-500', 'bg-emerald-500', 'bg-orange-500', 'bg-violet-500'].map((color, i) => (
                <div key={i} className={`w-8 h-8 rounded-full ${color} border-2 border-white flex items-center justify-center text-white text-[10px] font-bold`}>
                  {String.fromCharCode(65 + i)}
                </div>
              ))}
            </div>
            <div className="text-sm text-gray-500">
              <span className="font-semibold text-gray-900">20,00,000+</span> businesses trust Swipe
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/5 via-secondary/5 to-pink-500/5 rounded-full blur-3xl pointer-events-none" />
    </section>
  )
}
