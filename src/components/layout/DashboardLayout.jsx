import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText, Package, Users, CreditCard,
  BarChart3, Settings, LogOut, ChevronDown, Menu, X,
  Plus, Bell, Search, Zap, Volume2, HelpCircle,
  Smartphone, MonitorSmartphone, Receipt, Truck, Box, PieChart, Moon, MessageCircle, PlayCircle, PhoneCall, Link as LinkIcon
} from 'lucide-react'
import useAuthStore from '../../store/authStore'
import useBusinessStore from '../../store/businessStore'
import { swipeAISearch } from '../../lib/gemini'
import { toast } from 'react-hot-toast'
import useUIStore from '../../store/uiStore'

function NavGroup({ title, icon: Icon, children, isNew, path }) {
  const [isOpen, setIsOpen] = useState(true)
  
  if (!children) {
    const targetPath = path || `/app/${title.toLowerCase().replace(/[^a-z]/g, '')}`
    return (
      <NavLink to={targetPath} className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors hover:bg-gray-100/80 text-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 ${isActive ? 'bg-blue-50/50 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' : ''}`}>
        <Icon size={16} className="text-gray-500 dark:text-gray-400" />
        <span className="flex-1">{title}</span>
        {isNew && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500 text-white">New</span>}
      </NavLink>
    )
  }

  return (
    <div className="mb-1">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-gray-800 dark:text-gray-200 hover:bg-gray-100/80 dark:hover:bg-gray-800 transition-colors cursor-pointer"
      >
        <Icon size={16} className="text-gray-500 dark:text-gray-400" />
        <span className="flex-1 text-left">{title}</span>
        <ChevronDown size={14} className={`text-gray-400 dark:text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-0.5 mt-0.5 pl-10 pr-2">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function NavSubItem({ title, path }) {
  return (
    <NavLink 
      to={path}
      className={({isActive}) => `text-[13px] py-1.5 px-2 rounded-md transition-colors ${isActive ? 'text-gray-900 dark:text-white font-semibold' : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'}`}
    >
      {title}
    </NavLink>
  )
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [shortcutsMenuOpen, setShortcutsMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [announcementsOpen, setAnnouncementsOpen] = useState(false)
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const { user, logout } = useAuthStore()
  const { activeBusiness } = useBusinessStore()
  const { isDarkMode, toggleDarkMode } = useUIStore()
  const navigate = useNavigate()

  const handleSearch = async (e) => {
    if (e.key === 'Enter' && searchQuery.trim()) {
      setIsSearching(true)
      const toastId = toast.loading('SwipeAI is thinking...')
      try {
        const result = await swipeAISearch(searchQuery)
        toast.success(result, { id: toastId, duration: 6000 })
      } catch (error) {
        toast.error('AI Search failed', { id: toastId })
      } finally {
        setIsSearching(false)
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex text-gray-900 font-sans">
      
      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-50 w-60 bg-[#FAFAFA] border-r border-gray-200 flex flex-col transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:z-auto ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        
        {/* Logo & Business Selector */}
        <div className="px-4 py-3 border-b border-gray-200 flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <img src="https://getswipe.azureedge.net/getswipe/images/logo.svg" alt="Swipe Logo" className="h-8" />
          </Link>
        </div>

        <div className="px-4 py-3 relative">
          <button 
            onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
            className="w-full flex items-center gap-3 hover:bg-gray-100 p-1.5 -mx-1.5 rounded-lg transition-colors cursor-pointer text-left"
          >
            <div className="w-8 h-8 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center text-xs font-bold shrink-0">
              {activeBusiness?.name?.[0] || 'Y'}B
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-gray-900 truncate">
                {activeBusiness?.name || 'YOUR BUSINESS NAME'}
              </div>
              <div className="text-[11px] text-gray-500 font-medium">+ Add Another Company</div>
            </div>
            <ChevronDown size={14} className="text-gray-400" />
          </button>

          <AnimatePresence>
            {companyMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute top-full left-4 right-4 mt-1 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden"
              >
                <div className="p-2">
                  <div className="text-[11px] font-bold text-gray-500 px-2 pb-1 uppercase">Switch Business</div>
                  <button className="w-full flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg text-left">
                    <div className="w-6 h-6 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {activeBusiness?.name?.[0] || 'Y'}B
                    </div>
                    <span className="text-[13px] font-semibold text-gray-900 truncate">{activeBusiness?.name || 'YOUR BUSINESS NAME'}</span>
                  </button>
                  <div className="border-t border-gray-100 my-1"></div>
                  <Link to="/app/settings/company" className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-left text-[13px] font-medium text-gray-700">
                    <Settings size={14} /> Manage Companies
                  </Link>
                  <button className="w-full flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg text-left text-[13px] font-medium text-blue-600">
                    <Plus size={14} /> Create New Company
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-2 overflow-y-auto custom-scrollbar flex flex-col gap-1">
          <NavGroup title="Sales" icon={FileText}>
            <NavSubItem title="Invoices" path="/app/invoices" />
            <NavSubItem title="Credit Notes" path="/app/sales/credit-notes" />
            <NavSubItem title="E-Invoices" path="/app/sales/e-invoices" />
            <NavSubItem title="Subscriptions" path="/app/sales/subscriptions" />
          </NavGroup>
          
          <NavGroup title="Purchases" icon={Package}>
            <NavSubItem title="Purchase Orders" path="/app/purchases/orders" />
            <NavSubItem title="Debit Notes" path="/app/purchases/debit-notes" />
          </NavGroup>

          <NavGroup title="Quotations+" icon={FileText}>
            <NavSubItem title="Quotations" path="/app/quotations" />
            <NavSubItem title="Sales Orders" path="/app/quotations/sales-orders" />
            <NavSubItem title="Pro Forma Invoices" path="/app/quotations/pro-forma" />
            <NavSubItem title="Delivery Challans" path="/app/quotations/delivery" />
            <NavSubItem title="Packing Lists" path="/app/quotations/packing" />
          </NavGroup>

          <NavGroup title="Expenses+" icon={Receipt} path="/app/expenses" />
          
          <div className="my-1 border-t border-gray-200/60" />
          
          <NavGroup title="Products & Services" icon={Box} path="/app/inventory" />
          <NavGroup title="Inventory" icon={Package} path="/app/inventory" />
          
          <div className="my-1 border-t border-gray-200/60" />
          
          <NavGroup title="Payments" icon={CreditCard} path="/app/payments" />
          
          <div className="my-1 border-t border-gray-200/60" />

          <NavGroup title="Customers" icon={Users} path="/app/customers" />
          <NavGroup title="Vendors" icon={Users} path="/app/vendors" />
          <NavGroup title="Projects" icon={Package} path="/app/projects" />

          <div className="my-1 border-t border-gray-200/60" />

          <NavGroup title="Insights" icon={PieChart} path="/app/insights" />
          <NavGroup title="Reports" icon={BarChart3} path="/app/reports" />

          <div className="my-1 border-t border-gray-200/60" />

          <NavGroup title="OnlineStore" icon={MonitorSmartphone} path="/app/onlinestore" />
          
          <div className="my-1 border-t border-gray-200/60" />

          <NavGroup title="E-way Bills" icon={Truck} path="/app/ewaybills" />
          <NavGroup title="Tally Sync" icon={FileText} path="/app/tally-sync" isNew={true} />

          <div className="my-1 border-t border-gray-200/60" />

          <NavGroup title="More" icon={Plus} path="/app/more" />
          <NavGroup title="Invite Users" icon={Users} path="/app/invite" />

        </nav>

        {/* Banner at bottom */}
        <div className="p-4">
          <div className="bg-[#E6F0FF] rounded-xl p-3 text-center">
            <div className="text-[11px] font-bold text-gray-800 mb-2">
              Get GSTR-1 & 40+<br/>Reports
            </div>
            <button className="bg-white hover:bg-gray-50 text-gray-900 text-xs font-bold py-1.5 px-4 rounded-full shadow-sm w-full transition-colors cursor-pointer">
              Subscribe Now 🚀
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top bar */}
        <header className="h-[60px] bg-white border-b border-gray-200 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30">
          
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-900">
              <Menu size={20} />
            </button>
          </div>

          <div className="flex flex-1 max-w-xl mx-4">
            <div className="relative w-full">
              <Search size={16} className={`absolute left-3 top-1/2 -translate-y-1/2 ${isSearching ? 'text-blue-500 animate-pulse' : 'text-gray-400'}`} />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Ask SwipeAI (e.g. 'How to create invoice?')" 
                className="w-full pl-10 pr-12 py-2 bg-[#F3F4F6] border-none rounded-lg text-[13px] focus:ring-1 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200">
                Enter
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 sm:gap-2">
            <div className="relative">
              <button 
                onClick={() => setShortcutsMenuOpen(!shortcutsMenuOpen)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <Zap size={18} />
              </button>
              <AnimatePresence>
                {shortcutsMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="text-[13px] font-bold text-gray-900">Shortcuts</div>
                    </div>
                    <div className="py-1">
                      <Link to="/app/invoices/new" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-[13px] text-gray-700 font-medium"><Plus size={14}/> Create Invoice</Link>
                      <Link to="/app/purchases/new" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-[13px] text-gray-700 font-medium"><Plus size={14}/> Add Purchase</Link>
                      <Link to="/app/customers/new" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-[13px] text-gray-700 font-medium"><Users size={14}/> Add Customer</Link>
                      <Link to="/app/inventory/new" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-[13px] text-gray-700 font-medium"><Box size={14}/> Add Product</Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <Bell size={18} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
              </button>
              <AnimatePresence>
                {notificationsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col z-50 max-h-96"
                  >
                    <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center">
                      <div className="text-[14px] font-bold text-gray-900">Notifications</div>
                      <button className="text-[12px] text-blue-600 font-medium hover:underline">Mark all as read</button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center gap-2">
                      <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-blue-500 mb-2">
                        <Bell size={24} />
                      </div>
                      <p className="text-[14px] font-semibold text-gray-800">You're all caught up!</p>
                      <p className="text-[12px] text-gray-500">No new notifications for you right now.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <button 
                onClick={() => setAnnouncementsOpen(!announcementsOpen)}
                className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
              >
                <Volume2 size={18} />
              </button>
              <AnimatePresence>
                {announcementsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] border border-gray-100 flex flex-col z-50 max-h-96"
                  >
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="text-[14px] font-bold text-gray-900">What's New 🚀</div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      <div className="bg-blue-50/50 p-3 rounded-lg border border-blue-100">
                        <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">New Feature</span>
                        <h4 className="text-[13px] font-bold text-gray-900 mb-1">Tally Sync is here!</h4>
                        <p className="text-[12px] text-gray-600 mb-2">Seamlessly sync your invoices and inventory with Tally. Try it now.</p>
                        <Link to="/app/tally-sync" className="text-[12px] font-semibold text-blue-600">Explore Tally Sync &rarr;</Link>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg border border-gray-100">
                        <span className="bg-gray-200 text-gray-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider mb-2 inline-block">Update</span>
                        <h4 className="text-[13px] font-bold text-gray-900 mb-1">Improved E-way Bills</h4>
                        <p className="text-[12px] text-gray-600">Generate E-way bills faster with our new bulk creation tool.</p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* User Dropdown */}
            <div className="relative ml-2">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors cursor-pointer"
              >
                <Users size={16} />
              </button>

              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.1 }}
                    className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.1)] border border-gray-100 py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100">
                      <div className="text-[15px] font-bold text-gray-900">Hello {user?.name || 'User'}</div>
                      <div className="text-[11px] font-semibold text-gray-500 tracking-wider">FREE</div>
                    </div>
                    
                    <div className="px-4 py-3 space-y-2 border-b border-gray-100">
                      <div className="flex justify-between text-[13px]">
                        <span className="text-gray-500">Phone</span>
                        <span className="font-semibold text-gray-900">{user?.phone || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between text-[13px]">
                        <span className="text-gray-500">Role</span>
                        <span className="font-semibold text-gray-900">admin</span>
                      </div>
                    </div>

                    <div className="py-1 border-b border-gray-100">
                      <Link to="/app/settings" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-[13px] text-gray-700 font-medium cursor-pointer"><Settings size={16} className="text-gray-400"/> Settings</Link>
                      <button onClick={toggleDarkMode} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-[13px] text-gray-700 font-medium cursor-pointer"><Moon size={16} className="text-gray-400"/> {isDarkMode ? 'Light Mode' : 'Dark Mode'}</button>
                      <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-[13px] text-gray-700 font-medium cursor-pointer"><Zap size={16} className="text-gray-400"/> Keyboard Shortcuts</button>
                      <Link to="/app/help" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-[13px] text-gray-700 font-medium cursor-pointer"><HelpCircle size={16} className="text-gray-400"/> Help & Support</Link>
                    </div>

                    <div className="py-1">
                      <button onClick={() => { logout(); navigate('/') }} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-[13px] text-red-600 font-medium cursor-pointer"><LogOut size={16} className="text-red-400"/> Logout</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto custom-scrollbar flex flex-col">
          <div className="flex-1">
            <Outlet />
          </div>
          
          {/* Helpbar footer */}
          <div className="bg-white border-t border-gray-200 p-4 mt-8">
            <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <span className="font-medium">Need Help?</span>
                <button className="text-blue-600 hover:underline font-medium">Talk to a specialist</button>
              </div>
              <div className="flex items-center gap-4">
                <a href="tel:+918121335436" className="flex items-center gap-1.5 hover:text-gray-900 transition-colors">
                  <PhoneCall size={16} /> +91 812 133 5436
                </a>
                <span className="text-gray-300">|</span>
                <button className="flex items-center gap-1.5 text-blue-600 hover:text-blue-700 transition-colors">
                  <PlayCircle size={16} /> Watch how it works
                </button>
              </div>
            </div>
          </div>
        </main>

        {/* WhatsApp Floating Button */}
        <a 
          href="https://api.whatsapp.com/send?phone=918121335436&text=Hello%20Swipe!%20I%20need%20help..."
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 w-14 h-14 bg-[#25D366] text-white rounded-full flex items-center justify-center shadow-[0_8px_24px_rgba(37,211,102,0.4)] hover:scale-105 transition-transform z-50 group"
        >
          <MessageCircle size={28} />
          <span className="absolute right-full mr-4 bg-white text-gray-900 text-[13px] font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>
      </div>
    </div>
  )
}
