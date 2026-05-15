import { motion } from 'framer-motion'
import { Store, ArrowRight, ShoppingCart, Globe, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

export default function OnlineStorePage() {
  return (
    <div className="pt-24 lg:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 text-amber-600 mb-6"
          >
            <Store size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
          >
            Launch Your Online Store <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-400">
              In 10 Seconds
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10"
          >
            Turn your inventory into a beautiful online catalog instantly. Accept orders via WhatsApp, manage deliveries, and pay zero commission.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button as={Link} to="/auth/login" size="lg" icon={ArrowRight} iconPosition="right">Create Free Store</Button>
            <Button variant="outline" size="lg">See a Demo Store</Button>
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
            <ShoppingCart className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Syncs with Inventory</h3>
            <p className="text-gray-600">Your online store catalog is automatically generated and updated based on your Swipe inventory. No dual entry.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 rounded-3xl p-8"
          >
            <Phone className="text-emerald-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-3">WhatsApp Orders</h3>
            <p className="text-gray-600">Customers browse your store and send their cart directly to your WhatsApp. Fast, personal, and zero commission.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 rounded-3xl p-8"
          >
            <Globe className="text-indigo-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Custom Domain</h3>
            <p className="text-gray-600">Get a professional look by linking your own custom domain (e.g., store.yourbusiness.com) in minutes.</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
