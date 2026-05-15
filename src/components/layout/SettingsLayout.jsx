import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, Search, Zap, Bell, Volume2, Users, 
  Building2, User, UsersRound, Settings, Lock, FileText, 
  RefreshCw, Landmark, Wallet, Sparkles, CreditCard, 
  Share2, Star, HelpCircle, Moon, LogOut, MessageCircle, Plus, Box, PlayCircle, PhoneCall
} from 'lucide-react'
import useAuthStore from '../../store/authStore'
import useBusinessStore from '../../store/businessStore'

function SettingsNavGroup({ title, children }) {
  return (
    <div className="mb-4">
      <h3 className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">{title}</h3>
      <div className="flex flex-col gap-0.5">
        {children}
      </div>
    </div>
  )
}

function SettingsNavItem({ title, icon: Icon, path, locked, badge }) {
  return (
    <NavLink 
      to={path}
      end={path === '/app/settings'}
      className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors hover:bg-gray-100/80 text-gray-700 ${isActive ? 'bg-gray-200 text-gray-900 font-bold' : ''}`}
    >
      {Icon && <Icon size={16} className="text-gray-500 shrink-0" />}
      <span className="flex-1 truncate">{title}</span>
      {locked && <Lock size={12} className="text-gray-400 shrink-0" />}
      {badge && <span className="bg-blue-100 text-blue-600 text-[9px] font-bold px-1.5 py-0.5 rounded shrink-0">{badge}</span>}
    </NavLink>
  )
}

export default function SettingsLayout() {
  const { user, logout } = useAuthStore()
  const { activeBusiness } = useBusinessStore()
  const navigate = useNavigate()

  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [shortcutsMenuOpen, setShortcutsMenuOpen] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [announcementsOpen, setAnnouncementsOpen] = useState(false)
  const [companyMenuOpen, setCompanyMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-white flex text-gray-900 font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#F8F9FA] border-r border-gray-200 flex flex-col shrink-0">
        
        {/* Back to Home */}
        <div className="p-4 border-b border-gray-200">
          <Link to="/app" className="flex items-center gap-2 text-[13px] font-bold text-gray-700 hover:text-gray-900 transition-colors">
            <ChevronLeft size={16} /> Back to Home
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto custom-scrollbar">
          
          <SettingsNavGroup title="Profile">
            <SettingsNavItem title="Company Details" icon={Building2} path="/app/settings" />
            <SettingsNavItem title="User Profile" icon={User} path="/app/settings/profile" />
            <SettingsNavItem title="All Users / Roles" icon={UsersRound} path="/app/settings/users" />
          </SettingsNavGroup>

          <SettingsNavGroup title="General Settings">
            <SettingsNavItem title="Preferences" icon={Settings} path="/app/settings/preferences" />
            <SettingsNavItem title="Thermal Print Settings" icon={Settings} path="/app/settings/thermal" locked />
            <SettingsNavItem title="Barcode Settings" icon={Settings} path="/app/settings/barcode" />
            <SettingsNavItem title="Signatures" icon={FileText} path="/app/settings/signatures" />
            <SettingsNavItem title="Notes & Terms" icon={FileText} path="/app/settings/notes" locked />
            <SettingsNavItem title="Auto Reminders" icon={RefreshCw} path="/app/settings/reminders" locked />
          </SettingsNavGroup>

          <SettingsNavGroup title="Banks and Payments">
            <SettingsNavItem title="Banks" icon={Landmark} path="/app/settings/banks" />
            <SettingsNavItem title="Swipe Wallet" icon={Wallet} path="/app/settings/wallet" />
          </SettingsNavGroup>

          <SettingsNavGroup title="Integrations & Apps">
            <SettingsNavItem title="Swipe AI" icon={Sparkles} path="/app/settings/ai" badge="New" />
            <SettingsNavItem title="Payment Gateway" icon={CreditCard} path="/app/settings/payment-gateway" locked />
            <SettingsNavItem title="Tally Integration" icon={FileText} path="/app/settings/tally" locked />
            <SettingsNavItem title="API & Webhooks" icon={Settings} path="/app/settings/api" />
            <SettingsNavItem title="More" icon={Settings} path="/app/settings/more" />
          </SettingsNavGroup>

          <SettingsNavGroup title="Others">
            <SettingsNavItem title="Advanced Features" icon={Star} path="/app/settings/advanced" />
            <SettingsNavItem title="Social Links" icon={Share2} path="/app/settings/social" />
            <SettingsNavItem title="Referral" icon={UsersRound} path="/app/settings/referral" />
            <SettingsNavItem title="Support" icon={HelpCircle} path="/app/settings/support" />
          </SettingsNavGroup>

        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#F8F9FA]">
        
        {/* Top bar */}
        <header className="h-[60px] bg-white border-b border-gray-200 px-4 lg:px-6 flex items-center justify-between sticky top-0 z-30">
          
          <div className="flex items-center gap-2 relative">
            <button 
              onClick={() => setCompanyMenuOpen(!companyMenuOpen)}
              className="flex items-center gap-2 hover:bg-gray-100 p-1.5 -mx-1.5 rounded-lg transition-colors cursor-pointer text-left"
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
            </button>
            <AnimatePresence>
              {companyMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="absolute top-full left-0 mt-1 w-64 bg-white border border-gray-100 rounded-xl shadow-lg z-50 overflow-hidden"
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

          <div className="flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="How to remove Swipe branding from my invoice?" 
                className="w-full pl-10 pr-12 py-2 bg-[#F3F4F6] border-none rounded-lg text-[13px] focus:ring-1 focus:ring-blue-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] font-medium text-gray-400 bg-white px-1.5 py-0.5 rounded border border-gray-200">
                ctrl+k
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
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="relative ml-2">
              <button 
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors cursor-pointer"
              >
                <User size={16} />
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
                      <button className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-[13px] text-gray-700 font-medium cursor-pointer"><Moon size={16} className="text-gray-400"/> Dark Mode</button>
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

        {/* Banner */}
        <div className="bg-[#E6F0FF] text-center py-2 px-4 flex items-center justify-center gap-2 mb-0 border-b border-blue-100">
          <span className="text-[13px] font-medium text-gray-800">
            Get ₹500 OFF on premium plans! Only 6 days left
          </span>
          <button className="bg-white text-[11px] font-bold text-gray-900 px-3 py-1 rounded-full shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
            Subscribe Now 🚀
          </button>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-white m-4 sm:m-6 rounded-xl border border-gray-200 shadow-sm relative">
          <Outlet />
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
