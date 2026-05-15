import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'

const convenienceFeatures = [
  { id: 'eway', label: 'E-way Bills', title: 'Create E-way bills instantly.', desc: <>Generate <strong>E-way bills in one click</strong> directly from your invoices without visiting the government portal.</> },
  { id: 'einvoice', label: 'E-invoices', title: 'IRN generation made easy.', desc: <>Create <strong>compliant E-invoices</strong> in seconds. Swipe handles all the JSON and portal communication automatically.</> },
  { id: 'custom', label: 'Custom Columns & Headers', title: 'Your invoice, your rules.', desc: <>Add <strong>custom fields, columns, and headers</strong> to capture exactly what your unique business requires.</> },
  { id: 'json', label: 'GSTR JSON', title: 'Export government-ready data.', desc: <>Download perfectly formatted <strong>JSON files for GSTR filing</strong> with absolute accuracy.</> },
  { 
    id: 'advanced-gst', 
    label: 'Advanced GST', 
    title: 'File fast. Reconcile faster.', 
    desc: <>Swipe lets you <strong>file GSTR-1 in 10 seconds</strong> and <strong>reconcile 2B in one go</strong>. It's built for speed, accuracy, and peace of mind - even during crunch time.</> 
  },
  { id: 'reports', label: 'Reports', title: 'Insights at your fingertips.', desc: <>Get <strong>comprehensive business reports</strong> instantly. Track sales, inventory, and party ledgers in real-time.</> },
  { id: 'bulk', label: 'Bulk Uploads', title: 'Import data effortlessly.', desc: <>Save hours of manual entry by <strong>uploading bulk items and parties</strong> using simple Excel templates.</> },
  { id: 'export', label: 'Export Invoices', title: 'Data portability guaranteed.', desc: <>Easily <strong>export all your invoices</strong> to Excel or PDF for your CA or external accounting tools.</> },
  { id: 'tally', label: 'Tally Sync', title: 'Seamless Tally integration.', desc: <>Keep your CA happy with <strong>one-click Tally synchronization</strong>. No more double data entry.</> },
  { id: 'ai', label: 'Uploads with Swipe AI', title: 'Let AI do the data entry.', desc: <>Just upload a photo of a purchase bill and <strong>Swipe AI will automatically extract and digitize</strong> the details.</> },
  { id: 'batches', label: 'Manage Batches & Expiry', title: 'Perfect for pharma & FMCG.', desc: <>Easily track <strong>batch numbers, manufacturing dates, and expiries</strong> to ensure complete compliance.</> },
]

export default function ConvenienceSection() {
  const [activeId, setActiveId] = useState('advanced-gst')
  
  const activeFeature = convenienceFeatures.find(f => f.id === activeId)

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 mb-4 flex items-center justify-center gap-2">
            Mind-blowing convenience
            <motion.span
              animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
              className="inline-block origin-bottom"
            >
              🤯
            </motion.span>
          </h2>
          <p className="text-lg text-gray-500 max-w-3xl mx-auto">
            Swipe is built to make your life easier. We're always doing things for you to experience ultimate convenience.
          </p>
        </motion.div>

        {/* Pill Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 max-w-4xl mx-auto">
          {convenienceFeatures.map((feature) => {
            const isActive = activeId === feature.id
            return (
              <button
                key={feature.id}
                onClick={() => setActiveId(feature.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                  isActive 
                    ? 'bg-[#EEF2FF] text-[#4338CA]' 
                    : 'bg-[#F1F5F9] text-gray-600 hover:bg-gray-200'
                }`}
              >
                {feature.label}
              </button>
            )
          })}
        </div>

        {/* Content Container */}
        <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#FFF0F5]/80 via-[#F3F4F6]/50 to-[#E0E7FF]/80 p-8 sm:p-12 lg:p-16 min-h-[400px] flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFeature.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className="max-w-2xl"
            >
              <div className="text-sm font-bold text-gray-900 mb-4">{activeFeature.label}</div>
              <h3 className="text-4xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                {activeFeature.title}
              </h3>
              <p className="text-xl sm:text-2xl text-gray-500 leading-relaxed mb-10 [&>strong]:text-gray-900 [&>strong]:font-semibold">
                {activeFeature.desc}
              </p>
              
              <button className="bg-[#2563EB] hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium flex items-center gap-2 transition-colors">
                Try Now <ArrowRight size={16} />
              </button>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
