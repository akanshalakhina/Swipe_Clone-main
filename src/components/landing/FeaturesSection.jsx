import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { Package, CreditCard, Send, ArrowRight } from 'lucide-react'
import Button from '../ui/Button'

const features = [
  {
    icon: Package,
    title: 'Inventory so simple, it feels like magic',
    description: 'Add items, track stock, and manage everything in seconds. No training needed. It\'s that easy.',
    details: [
      'Real-time stock tracking with StockIn/StockOut',
      'Bulk import via Excel spreadsheets',
      'Multi-warehouse management',
      'Low stock alerts & notifications',
      'Complete inventory reports',
    ],
    color: 'from-blue-500 to-indigo-600',
    lightColor: 'bg-blue-50',
    iconColor: 'text-blue-600',
  },
  {
    icon: CreditCard,
    title: 'Record payments effortlessly',
    description: 'Track every payment, every time - without lifting a finger. While others make it complicated, we make it simple.',
    details: [
      'Auto-match payments to invoices',
      'Multiple payment method tracking',
      'Party-wise ledger & statements',
      'Daily, weekly, monthly reports',
      'Profit & loss statements',
    ],
    color: 'from-emerald-500 to-teal-600',
    lightColor: 'bg-emerald-50',
    iconColor: 'text-emerald-600',
  },
  {
    icon: Send,
    title: 'Share anywhere. Get paid faster.',
    description: 'Send invoices instantly via WhatsApp, email, or SMS. And with smart auto-reminders, you don\'t have to chase anyone.',
    details: [
      'One-tap WhatsApp sharing',
      'Automated payment reminders',
      'Email invoice delivery',
      'Custom PDF templates (A4, A5, thermal)',
      'Payment links in invoices',
    ],
    color: 'from-violet-500 to-purple-600',
    lightColor: 'bg-violet-50',
    iconColor: 'text-violet-600',
  },
]

function FeatureCard({ feature, index, isReversed }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
    >
      {/* Text Side */}
      <div className={`${isReversed ? 'lg:order-2' : ''}`}>
        <div className={`w-14 h-14 rounded-2xl ${feature.lightColor} flex items-center justify-center mb-6`}>
          <feature.icon size={28} className={feature.iconColor} />
        </div>

        <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
          {feature.title}
        </h3>

        <p className="text-lg text-gray-500 leading-relaxed mb-6">
          {feature.description}
        </p>

        <ul className="space-y-3 mb-8">
          {feature.details.map((detail) => (
            <li key={detail} className="flex items-start gap-3 text-sm text-gray-600">
              <svg className="w-5 h-5 text-success shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
              {detail}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-4">
          <Link to="/auth/login">
            <Button as="motion" size="lg">Try for free</Button>
          </Link>
          <a href="#" className="text-sm font-semibold text-primary hover:text-primary-hover flex items-center gap-1 transition-colors">
            Request a demo <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Visual Side */}
      <div className={`${isReversed ? 'lg:order-1' : ''}`}>
        <div className={`relative rounded-3xl bg-gradient-to-br ${feature.color} p-1`}>
          <div className="bg-white rounded-[20px] p-2">
            {/* Feature-specific illustration */}
            {index === 0 && <img src="https://getswipe.azureedge.net/getswipe/images/inventory.webp" alt="Inventory feature" className="w-full h-auto object-contain rounded-xl" />}
            {index === 1 && <img src="https://getswipe.azureedge.net/getswipe/images/record-payments.webp" alt="Record payments feature" className="w-full h-auto object-contain rounded-xl" />}
            {index === 2 && <img src="https://getswipe.azureedge.net/getswipe/images/sharing.webp" alt="Sharing feature" className="w-full h-auto object-contain rounded-xl" />}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// Visual components removed in favor of exact original images

export default function FeaturesSection() {
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 lg:space-y-32">
        {features.map((feature, i) => (
          <FeatureCard key={feature.title} feature={feature} index={i} isReversed={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}
