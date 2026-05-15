import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronDown, FileText, Truck, Sparkles, Store, Puzzle, ExternalLink } from 'lucide-react'
import Button from '../ui/Button'
import useUIStore from '../../store/uiStore'
import useAuthStore from '../../store/authStore'

const productLinks = [
  { name: 'E-Invoices', href: '/einvoices', icon: FileText, desc: 'Generate e-invoices instantly' },
  { name: 'E-Way Bills', href: '/ewaybills', icon: Truck, desc: 'Create e-way bills on the go' },
  { name: 'Swipe AI', href: '/swipeai', icon: Sparkles, desc: 'AI-powered billing assistant' },
  { name: 'Online Store', href: '/onlinestore', icon: Store, desc: 'Sell products online' },
  { name: 'Integrations', href: '/integrations', icon: Puzzle, desc: 'Connect with your tools' },
]

const regions = [
  { id: 'IN', name: 'India', flag: 'https://getswipe.azureedge.net/getswipe/images/flags/in.webp' },
  { id: 'AE', name: 'United Arab Emirates', flag: 'https://getswipe.azureedge.net/getswipe/images/flags/ae.webp' },
  { id: 'US', name: 'United States', flag: 'https://getswipe.azureedge.net/getswipe/images/flags/us.webp' }
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [productOpen, setProductOpen] = useState(false)
  const [regionOpen, setRegionOpen] = useState(false)
  const { isContactOpen, setContactOpen, region, setRegion } = useUIStore()
  const { isAuthenticated } = useAuthStore()
  const activeRegion = regions.find(r => r.id === region) || regions[0]
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setProductOpen(false)
  }, [location])

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md' : 'bg-white'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <div className="flex items-center gap-2 lg:gap-4 shrink-0">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900 hidden sm:block">Swipe</span>
            </Link>

            {/* Region Dropdown */}
            <div className="relative" onMouseLeave={() => setRegionOpen(false)}>
              <button 
                onMouseEnter={() => setRegionOpen(true)}
                className="flex items-center gap-1.5 px-2 py-1.5 hover:bg-gray-100 rounded-lg transition-colors text-sm font-medium text-gray-700"
              >
                <img src={activeRegion.flag} alt={activeRegion.name} className="w-5 h-3.5 object-cover rounded-sm border border-gray-200" />
                {activeRegion.id} <ChevronDown size={14} className={`transition-transform duration-200 ${regionOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {regionOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 pt-1 w-56 z-[100]"
                  >
                    <div className="bg-white rounded-xl shadow-xl border border-gray-100 p-1.5">
                      <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">Choose your region</div>
                      {regions.map((r) => (
                        <button
                          key={r.id}
                          onClick={() => { setRegion(r.id); setRegionOpen(false); }}
                          className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-gray-50 transition-colors ${region === r.id ? 'bg-primary-50 text-primary font-medium' : 'text-gray-700'}`}
                        >
                          <img src={r.flag} alt={r.name} className="w-5 h-3.5 object-cover rounded-sm border border-gray-200 shrink-0" />
                          <span className="truncate">{r.name}</span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {/* Product Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductOpen(true)}
              onMouseLeave={() => setProductOpen(false)}
            >
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
                Product
                <ChevronDown size={14} className={`transition-transform duration-200 ${productOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {productOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full left-0 pt-1 w-72 z-[100]"
                  >
                    <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-2 overflow-hidden">
                      {productLinks.map((item) => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                        >
                          <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center shrink-0 group-hover:bg-primary-light transition-colors">
                            <item.icon size={18} className="text-primary" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-gray-900">{item.name}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/#features" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
              Features
            </Link>
            <Link to="/pricing" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
              Pricing
            </Link>
            <Link to="/download" className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-1">
              Download App <ExternalLink size={12} />
            </Link>
            <button onClick={() => setContactOpen(true)} className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-colors">
              Contact
            </button>
          </div>

          {/* CTA Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated ? (
              <Link to="/app">
                <Button as="motion" size="sm">Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Link to="/auth/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/auth/login">
                  <Button as="motion" size="sm">Sign up free</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-white border-t border-gray-100"
          >
            <div className="px-4 py-4 space-y-1">
              <button
                onClick={() => setProductOpen(!productOpen)}
                className="w-full flex items-center justify-between px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50"
              >
                Product
                <ChevronDown size={14} className={`transition-transform ${productOpen ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {productOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: 'auto' }}
                    exit={{ height: 0 }}
                    className="overflow-hidden pl-4"
                  >
                    {productLinks.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600 rounded-lg hover:bg-gray-50"
                      >
                        <item.icon size={16} className="text-primary" />
                        {item.name}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
              <Link to="/#features" className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
                Features
              </Link>
              <Link to="/pricing" className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
                Pricing
              </Link>
              <Link to="/download" className="block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
                Download App
              </Link>
              <button onClick={() => { setContactOpen(true); setMobileOpen(false); }} className="w-full text-left block px-3 py-2.5 text-sm font-medium text-gray-700 rounded-lg hover:bg-gray-50">
                Contact
              </button>
              <div className="pt-3 border-t border-gray-100 space-y-2">
                {isAuthenticated ? (
                  <Link to="/app">
                    <Button fullWidth>Go to Dashboard</Button>
                  </Link>
                ) : (
                  <>
                    <Link to="/auth/login">
                      <Button variant="outline" fullWidth>Login</Button>
                    </Link>
                    <Link to="/auth/login">
                      <Button fullWidth>Sign up free</Button>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
