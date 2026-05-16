import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { 
  FileText, FileSignature, Bell, Globe, PackageCheck, 
  Building2, ScanLine, ShoppingBag, PenTool, CheckCircle2, 
  Zap, Shield, Smartphone, ArrowRight, Star
} from 'lucide-react'
import Button from '../../components/ui/Button'

export default function ProductFeaturePage({ title, description, iconName, longDescription, features }) {
  const icons = {
    FileText, FileSignature, Bell, Globe, PackageCheck, 
    Building2, ScanLine, ShoppingBag, PenTool, Zap, Shield, Smartphone
  }
  const Icon = icons[iconName] || FileText;

  const defaultFeatures = [
    {
      title: "10-Second Promise",
      desc: "Our optimized workflows ensure you spend less time on paperwork and more time growing your business.",
      icon: Zap,
      color: "text-amber-500"
    },
    {
      title: "GST Compliant",
      desc: "Every document generated is 100% compliant with the latest GST regulations in India.",
      icon: Shield,
      color: "text-blue-500"
    },
    {
      title: "WhatsApp Integrated",
      desc: "Share your professional documents directly on WhatsApp or Email with just one tap.",
      icon: CheckCircle2,
      color: "text-emerald-500"
    }
  ];

  const displayFeatures = features || defaultFeatures;

  return (
    <div className="pt-24 lg:pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-blue-50 text-blue-600 mb-8 shadow-sm border border-blue-100"
          >
            {Icon && <Icon size={40} />}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-gray-900 leading-tight mb-8"
          >
            {title}. <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
              Done in 10 Seconds.
            </span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed"
          >
            {longDescription || description}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-12"
          >
            <Button as={Link} to="/auth/login" size="lg" className="px-10 h-14 text-lg">Get Started for Free</Button>
            <Button variant="outline" size="lg" className="px-10 h-14 text-lg">Schedule a Demo</Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center gap-2"
          >
            <div className="flex -space-x-3 mb-2">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-200 overflow-hidden shadow-sm">
                  <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="user" />
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1.5">
              <div className="flex text-amber-400">
                {[1,2,3,4,5].map(i => <Star key={i} size={14} fill="currentColor" />)}
              </div>
              <span className="text-sm font-bold text-gray-900">4.8/5</span>
              <span className="text-sm text-gray-500">Trusted by 20,00,000+ businesses</span>
            </div>
          </motion.div>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {displayFeatures.map((f, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gray-50 rounded-[40px] p-10 hover:shadow-xl hover:shadow-blue-900/5 transition-all group"
            >
              <div className={`${f.color} mb-6 transform group-hover:scale-110 transition-transform origin-left`}>
                <f.icon size={40} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{f.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-[48px] overflow-hidden bg-blue-600 p-8 lg:p-16 text-white text-center"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-500 opacity-90" />
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-extrabold mb-6">Experience {title} like never before.</h2>
            <p className="text-blue-50 text-lg mb-10">Join thousands of SMEs in India who have transformed their business with Swipe.</p>
            <Button as={Link} to="/auth/login" variant="secondary" size="lg" className="h-14 px-12 bg-white text-blue-600 hover:bg-gray-100">Try for Free &rarr;</Button>
          </div>
        </motion.div>

      </div>
    </div>
  )
}
