import { motion } from 'framer-motion'

export default function TrustBanner() {
  return (
    <section className="py-8 bg-gray-50 border-y border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8"
        >
          <span className="text-sm text-gray-400 font-medium whitespace-nowrap">🤝 Trusted by</span>
          <div className="flex items-center gap-6 sm:gap-10 opacity-40 grayscale">
            {['Featured in YourStory', 'Google for Startups', 'Economic Times', 'Inc42', 'Entrepreneur India'].map((name) => (
              <div key={name} className="text-xs sm:text-sm font-bold text-gray-600 whitespace-nowrap">
                {name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
