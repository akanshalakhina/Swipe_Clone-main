import { motion } from 'framer-motion'
import { Puzzle, ArrowRight, RefreshCw, ShoppingBag, Database } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

export default function IntegrationsPage() {
  return (
    <div className="pt-24 lg:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 mb-6"
          >
            <Puzzle size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
          >
            Connect Swipe With <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">
              Your Favorite Tools
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10"
          >
            Seamlessly integrate Swipe with Tally, Shopify, WooCommerce, and payment gateways. Keep your data in sync across your entire business stack.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button as={Link} to="/auth/login" size="lg" icon={ArrowRight} iconPosition="right">Explore Integrations</Button>
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
            <Database className="text-blue-600 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Tally Integration</h3>
            <p className="text-gray-600">Export your sales, purchases, and payments directly to Tally ERP9 or Tally Prime in just one click. Keep your CA happy.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 rounded-3xl p-8"
          >
            <ShoppingBag className="text-green-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-3">E-commerce Sync</h3>
            <p className="text-gray-600">Connect Shopify or WooCommerce. Orders are automatically converted into Swipe invoices, reducing manual entry.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 rounded-3xl p-8"
          >
            <RefreshCw className="text-purple-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Payment Gateways</h3>
            <p className="text-gray-600">Integrate Razorpay or Cashfree to add direct payment links to your invoices and automatically mark them as paid.</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
