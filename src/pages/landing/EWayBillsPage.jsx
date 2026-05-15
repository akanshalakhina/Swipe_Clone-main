import { motion } from 'framer-motion'
import { Truck, ArrowRight, Clock, MapPin, Smartphone } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

export default function EWayBillsPage() {
  return (
    <div className="pt-24 lg:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 text-emerald-600 mb-6"
          >
            <Truck size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
          >
            Create E-Way Bills <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-500">
              On The Go
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10"
          >
            Generate e-way bills directly from your sales invoices without duplicate data entry. Fast, accurate, and perfectly synced with your billing.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button as={Link} to="/auth/login" size="lg" icon={ArrowRight} iconPosition="right">Generate E-Way Bill</Button>
            <Button variant="outline" size="lg">Talk to an expert</Button>
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
            <Clock className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Save Hours of Time</h3>
            <p className="text-gray-600">No need to log in to the e-way bill portal and re-enter data. Convert your invoice to an e-way bill in 5 seconds.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 rounded-3xl p-8"
          >
            <MapPin className="text-rose-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Auto Distance Calculation</h3>
            <p className="text-gray-600">Swipe automatically calculates the PIN-to-PIN distance, reducing errors and ensuring rapid generation.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 rounded-3xl p-8"
          >
            <Smartphone className="text-purple-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Mobile Ready</h3>
            <p className="text-gray-600">Generate, cancel, or extend the validity of your e-way bills directly from your mobile device while on the move.</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
