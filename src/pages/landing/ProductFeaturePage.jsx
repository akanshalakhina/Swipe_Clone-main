import { motion } from 'framer-motion'
import Button from '../../components/ui/Button'
import { Link } from 'react-router-dom'
import { FileText, FileSignature, Bell, Globe, PackageCheck, Building2, ScanLine, ShoppingBag, PenTool } from 'lucide-react'

export default function ProductFeaturePage({ title, description, iconName }) {
  const icons = {
    FileText, FileSignature, Bell, Globe, PackageCheck, Building2, ScanLine, ShoppingBag, PenTool
  }
  const Icon = icons[iconName] || FileText;

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-3xl"
      >
        <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          {Icon && <Icon size={40} />}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          {title}
        </h1>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/auth/login">
             <Button size="lg">Get Started for Free</Button>
          </Link>
          <Link to="/pricing">
             <Button variant="outline" size="lg">View Pricing</Button>
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
