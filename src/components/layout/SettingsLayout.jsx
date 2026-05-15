import { Link, NavLink, Outlet } from 'react-router-dom'
import { 
  ChevronLeft, Search, Zap, Bell, Volume2, Users, 
  Building2, User, UsersRound, Settings, Lock, FileText, 
  RefreshCw, Landmark, Wallet, Sparkles, CreditCard, 
  Share2, Star, HelpCircle
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
  const { user } = useAuthStore()
  const { activeBusiness } = useBusinessStore()

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
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-orange-200 text-orange-800 flex items-center justify-center text-xs font-bold shrink-0">
              {activeBusiness?.name?.[0] || 'Y'}B
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-bold text-gray-900 truncate">
                {activeBusiness?.name || 'YOUR BUSINESS NAME'}
              </div>
              <div className="text-[11px] text-gray-500 font-medium">+ Add Another Company</div>
            </div>
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
            <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"><Zap size={18} /></button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"><Bell size={18} /></button>
            <button className="w-8 h-8 flex items-center justify-center text-gray-500 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"><Volume2 size={18} /></button>
            <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition-colors ml-2 cursor-pointer">
              <User size={16} />
            </button>
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
        <main className="flex-1 overflow-y-auto bg-white m-4 sm:m-6 rounded-xl border border-gray-200 shadow-sm">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
