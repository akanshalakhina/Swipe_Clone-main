import { motion } from 'framer-motion'
import { Rocket, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../components/ui/Button'

export default function ComingSoonPage({ title }) {
  return (
    <div className="h-[calc(100vh-60px)] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
          <Rocket size={40} className="text-blue-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">{title || 'Coming Soon'}</h1>
        <p className="text-gray-500 mb-8">
          We're working hard to bring you the best {title?.toLowerCase()} management experience. This feature will be available in the next update!
        </p>
        <Link to="/app">
          <Button variant="secondary" icon={ArrowLeft}>
            Back to Dashboard
          </Button>
        </Link>
      </motion.div>
    </div>
  )
}
