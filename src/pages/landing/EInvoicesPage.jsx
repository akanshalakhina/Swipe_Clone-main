import { motion } from 'framer-motion'
import { FileText, ArrowRight, CheckCircle2, Shield, Zap } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

export default function EInvoicesPage() {
  return (
    <div className="pt-24 lg:pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 mb-6"
          >
            <FileText size={32} />
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6"
          >
            Generate E-Invoices <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Instantly & Compliantly
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10"
          >
            Create government-compliant e-invoices with a single click. We handle the JSON, portal uploads, and IRN generation so you don't have to.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Button as={Link} to="/auth/login" size="lg" icon={ArrowRight} iconPosition="right">Generate your first E-Invoice</Button>
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
            <Zap className="text-amber-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-3">1-Click Generation</h3>
            <p className="text-gray-600">Create regular invoices and turn them into compliant e-invoices with just one click. No portal login required.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-gray-50 rounded-3xl p-8"
          >
            <CheckCircle2 className="text-emerald-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-3">Automatic Validation</h3>
            <p className="text-gray-600">Built-in GSTIN validation ensures your e-invoices are always correct before they hit the government portal.</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-gray-50 rounded-3xl p-8"
          >
            <Shield className="text-blue-500 mb-4" size={32} />
            <h3 className="text-xl font-bold text-gray-900 mb-3">100% Compliant</h3>
            <p className="text-gray-600">Always stay updated with the latest NIC portal changes. Swipe handles backend compliance automatically.</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
