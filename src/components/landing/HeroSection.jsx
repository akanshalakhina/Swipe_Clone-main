import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import Button from '../ui/Button'
import useUIStore from '../../store/uiStore'

const typingWords = ['Accounting', 'GST', 'Invoicing', 'Billing']

export default function HeroSection() {
  const [wordIndex, setWordIndex] = useState(0)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const { region } = useUIStore()

  const heroImages = {
    IN: 'https://getswipe.azureedge.net/getswipe/images/hero.webp',
    AE: 'https://getswipe.azureedge.net/getswipe/images/uae/hero_uae.webp',
    US: 'https://getswipe.azureedge.net/getswipe/images/usa/hero_global.webp'
  }

  const currentHeroImg = heroImages[region] || heroImages['IN']

  useEffect(() => {
    const currentWord = typingWords[wordIndex]
    let timeout

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && text === '') {
      setIsDeleting(false)
      setWordIndex((prev) => (prev + 1) % typingWords.length)
    } else {
      timeout = setTimeout(() => {
        setText(currentWord.slice(0, text.length + (isDeleting ? -1 : 1)))
      }, isDeleting ? 50 : 100)
    }

    return () => clearTimeout(timeout)
  }, [text, isDeleting, wordIndex])

  return (
    <section className="relative bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #2563EB 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left - Text */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative z-10"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-emerald-700 text-sm font-bold rounded-full mb-6 border border-emerald-200"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              100% Safe & Secure!
            </motion.div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-[64px] font-extrabold text-gray-900 leading-tight mb-6">
              Simple{' '}
              <span className="text-blue-600">
                {text}
                <span className="typing-cursor" />
              </span>
              <span className="text-blue-600">.</span>
            </h1>

            <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">
              Create invoices for free in 10 seconds ⚡
            </h2>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed mb-8 max-w-lg font-medium">
              Customize templates, share bills on WhatsApp, collect payments!
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-4">
              <Link to="/auth/login">
                <Button as="motion" size="lg" icon={ArrowRight} iconPosition="right">
                  Sign up for free
                </Button>
              </Link>
            </div>
            
            {/* Trust Text Below Button */}
            <p className="text-sm text-gray-600 mb-8 font-semibold flex items-center gap-2">
              💛 Trusted by 20,00,000+ Businesses
            </p>

            {/* App Download */}
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs text-gray-400 font-medium">Download for free on</span>
              <div className="flex gap-2">
                <a href="https://play.google.com/store/apps/details?id=in.swipe.app" target="_blank" rel="noopener noreferrer" className="h-9 px-3 bg-gray-900 text-white rounded-lg flex items-center gap-1.5 text-xs font-medium hover:bg-gray-800 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.79c.44.41 1.09.44 1.64.15L21.6 13.51c.55-.29.88-.82.88-1.41 0-.59-.33-1.12-.88-1.41L4.82.26C4.27-.03 3.62 0 3.18.41A1.5 1.5 0 0 0 2.7 1.5v21c0 .45.17.87.48 1.17zM14.54 12l-4.89 5.04V6.96L14.54 12z"/></svg>
                  Google Play
                </a>
                <a href="https://apps.apple.com/in/app/swipe-invoicing-and-payments/id6451307318" target="_blank" rel="noopener noreferrer" className="h-9 px-3 bg-gray-900 text-white rounded-lg flex items-center gap-1.5 text-xs font-medium hover:bg-gray-800 transition-colors">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
                  App Store
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right - Dynamic Hero Image */}
          <motion.div
            key={currentHeroImg}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="relative z-0 flex items-center justify-center lg:justify-end"
          >
            <div className="relative max-w-full mx-auto lg:max-w-none">
              <img 
                src={currentHeroImg} 
                alt="Swipe Hero Dashboard" 
                className="w-full h-auto object-contain max-h-[600px] drop-shadow-2xl rounded-2xl" 
                loading="eager"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
