import { useState } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  FileText, Package, Users, CreditCard,
  BarChart3, Settings, LogOut, ChevronDown, Menu, X,
  Plus, Bell, Search, Zap, Volume2, HelpCircle,
  Smartphone, MonitorSmartphone, Receipt, Truck, Box, PieChart
} from 'lucide-react'
import useAuthStore from '../../store/authStore'
import useBusinessStore from '../../store/businessStore'
import { swipeAISearch } from '../../lib/gemini'
import { toast } from 'react-hot-toast'

function NavGroup({ title, icon: Icon, children, isNew, path }) {
  const [isOpen, setIsOpen] = useState(true)
  
  if (!children) {
    const targetPath = path || `/app/${title.toLowerCase().replace(/[^a-z]/g, '')}`
    return (
      <NavLink to={targetPath} className={({isActive}) => `flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium transition-colors hover:bg-gray-100/80 text-gray-700 ${isActive ? 'bg-blue-50/50 text-blue-700' : ''}`}>
        <Icon size={16} className="text-gray-500" />
        <span className="flex-1">{title}</span>
        {isNew && <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-blue-500 text-white">New</span>}
      </NavLink>
    )
  }

  return (
    <div className="mb-1">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-[13px] font-medium text-gray-800 hover:bg-gray-100/80 transition-colors cursor-pointer"
      >
        <Icon size={16} className="text-gray-500" />
        <span className="flex-1 text-left">{title}</span>
        <ChevronDown size={14} className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
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
      className={({isActive}) => `text-[13px] py-1.5 px-2 rounded-md transition-colors ${isActive ? 'text-gray-900 font-semibold' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-50'}`}
    >
      {title}
    </NavLink>
  )
}

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const { user, logout } = useAuthStore()
  const { activeBusiness } = useBusinessStore()
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
          <div className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-white font-bold italic shrink-0">
            S
          </div>
          <div className="font-bold text-xl tracking-tight text-gray-900 shrink-0">swipe</div>
        </div>

        <div className="px-4 py-3">
          <button className="w-full flex items-center gap-3 hover:bg-gray-100 p-1.5 -mx-1.5 rounded-lg transition-colors cursor-pointer text-left">
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
            <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"><Zap size={18} /></button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"><Bell size={18} /></button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"><Volume2 size={18} /></button>
            
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
                      <Link to="/app/settings/premium" className="flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-[13px] text-gray-700 font-medium cursor-pointer"><Zap size={16} className="text-gray-400"/> Check Premium Plans</Link>
                      <button onClick={() => { logout(); navigate('/') }} className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-50 text-[13px] text-gray-700 font-medium cursor-pointer"><LogOut size={16} className="text-gray-400"/> Logout</button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
