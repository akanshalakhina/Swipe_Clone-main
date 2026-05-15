import { useEffect, useMemo } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, TrendingDown, Users, Package, 
  Plus, ArrowUpRight, DollarSign, FileText,
  Calendar, ChevronRight, Zap
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer
} from 'recharts'
import useAuthStore from '../../store/authStore'
import useBusinessStore from '../../store/businessStore'
import { useInvoices } from '../../hooks/useInvoices'
import { useCustomers } from '../../hooks/useCustomers'
import { useProducts } from '../../hooks/useProducts'
import { usePayments } from '../../hooks/usePayments'

const StatCard = ({ title, value, change, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -4 }}
    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
  >
    <div className="flex justify-between items-start mb-4">
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon size={24} className="text-white" />
      </div>
      {change !== null && (
        <div className={`flex items-center gap-1 text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
          {Math.abs(change)}%
        </div>
      )}
    </div>
    <div className="text-sm text-gray-500 font-medium">{title}</div>
    <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
  </motion.div>
)

// Group invoices by day of the week for chart
function buildWeeklyChartData(invoices, payments) {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const now = new Date()
  const data = days.map(name => ({ name, sales: 0, expenses: 0 }))

  invoices.forEach(inv => {
    let d = null
    if (inv.createdAt?.toDate) d = inv.createdAt.toDate()
    else if (inv.createdAt) d = new Date(inv.createdAt)
    if (!d) return
    const dayDiff = Math.floor((now - d) / (1000 * 60 * 60 * 24))
    if (dayDiff < 7) {
      const dayIdx = (d.getDay() + 6) % 7 // Mon=0
      data[dayIdx].sales += Number(inv.totalAmount || 0)
    }
  })

  payments.forEach(p => {
    let d = null
    if (p.createdAt?.toDate) d = p.createdAt.toDate()
    else if (p.createdAt) d = new Date(p.createdAt)
    if (!d) return
    const dayDiff = Math.floor((now - d) / (1000 * 60 * 60 * 24))
    if (dayDiff < 7 && p.type === 'made') {
      const dayIdx = (d.getDay() + 6) % 7
      data[dayIdx].expenses += Number(p.amount || 0)
    }
  })

  return data
}

export default function DashboardPage() {
  const { user } = useAuthStore()
  const { activeBusiness, fetchBusinesses } = useBusinessStore()
  const { invoices, isLoading: invLoading } = useInvoices()
  const { customers } = useCustomers()
  const { products } = useProducts()
  const { payments } = usePayments()

  useEffect(() => {
    if (!activeBusiness) fetchBusinesses()
  }, [activeBusiness, fetchBusinesses])

  const stats = useMemo(() => {
    const totalSales = invoices.reduce((s, i) => s + Number(i.totalAmount || 0), 0)
    const totalExpenses = payments.filter(p => p.type === 'made').reduce((s, p) => s + Number(p.amount || 0), 0)
    return { totalSales, totalExpenses }
  }, [invoices, payments])

  const chartData = useMemo(() => buildWeeklyChartData(invoices, payments), [invoices, payments])

  const recentInvoices = useMemo(() => {
    return invoices.slice(0, 5).map(inv => ({
      ...inv,
      displayDate: inv.createdAt?.toDate 
        ? inv.createdAt.toDate().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })
        : inv.date || 'N/A'
    }))
  }, [invoices])

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {user?.name?.split(' ')[0] || 'Partner'}! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            <Calendar size={18} className="text-gray-400" />
            Last 7 Days
          </button>
          <Link to="/app/invoices/new">
            <button className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
              <Plus size={18} />
              Create Invoice
            </button>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Sales" 
          value={`₹${stats.totalSales.toLocaleString('en-IN')}`} 
          change={invoices.length > 0 ? 12.5 : null} 
          icon={DollarSign} 
          color="bg-blue-600" 
        />
        <StatCard 
          title="Total Expenses" 
          value={`₹${stats.totalExpenses.toLocaleString('en-IN')}`} 
          change={stats.totalExpenses > 0 ? -2.4 : null} 
          icon={TrendingDown} 
          color="bg-rose-500" 
        />
        <StatCard 
          title="Active Customers" 
          value={customers.length.toString()} 
          change={customers.length > 0 ? 8.1 : null} 
          icon={Users} 
          color="bg-amber-500" 
        />
        <StatCard 
          title="Inventory Items" 
          value={products.length.toString()} 
          change={null} 
          icon={Package} 
          color="bg-indigo-600" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-gray-900">Revenue Over Time</h3>
              <p className="text-xs text-gray-500">Sales vs Expenses for the current week</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-600" />
                <span className="text-xs font-medium text-gray-600">Sales</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-200" />
                <span className="text-xs font-medium text-gray-600">Expenses</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#9CA3AF'}} tickFormatter={(v) => `₹${v/1000}k`} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, undefined]}
                />
                <Area type="monotone" dataKey="sales" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
                <Area type="monotone" dataKey="expenses" stroke="#BFDBFE" strokeWidth={2} fill="transparent" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions & Recent */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-gray-900 rounded-2xl p-6 text-white overflow-hidden relative">
            <Zap size={80} className="absolute -right-4 -bottom-4 text-white/10 rotate-12" />
            <h3 className="font-bold mb-1">Go Premium 🚀</h3>
            <p className="text-xs text-white/60 mb-4">Unlock advanced reports, custom domains, and more.</p>
            <button className="bg-white text-gray-900 text-xs font-bold py-2 px-4 rounded-lg w-full">Upgrade Now</button>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <h3 className="font-bold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Add Product', icon: Package, link: '/app/inventory' },
                { label: 'Add Customer', icon: Users, link: '/app/customers' },
                { label: 'Reports', icon: FileText, link: '/app/reports' },
                { label: 'Payments', icon: DollarSign, link: '/app/payments' },
              ].map((action) => (
                <Link key={action.label} to={action.link}>
                  <button className="w-full p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-all flex flex-col items-center gap-2">
                    <action.icon size={20} className="text-blue-600" />
                    <span className="text-[11px] font-bold text-gray-700">{action.label}</span>
                  </button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Invoices Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">Recent Invoices</h3>
          <Link to="/app/invoices" className="text-sm font-bold text-blue-600 flex items-center gap-1">
            View All <ChevronRight size={16} />
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr className="text-left text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Invoice</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Amount</th>
                <th className="px-6 py-3">Status</th>
                <th className="px-6 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {recentInvoices.length > 0 ? recentInvoices.map((inv, i) => (
                <tr key={inv.id || i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{inv.customerName || 'Unnamed'}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 font-medium">INV-{inv.invoiceNumber}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{inv.displayDate}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900">₹{Number(inv.totalAmount || 0).toLocaleString('en-IN')}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                      inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                    }`}>
                      {inv.status || 'Pending'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link to="/app/invoices" className="text-blue-600 hover:text-blue-700 p-1">
                      <ArrowUpRight size={18} />
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center text-gray-400">
                    <FileText size={40} className="mx-auto mb-3 opacity-30" />
                    <p className="text-sm font-medium">No invoices yet</p>
                    <Link to="/app/invoices/new" className="text-blue-600 text-sm font-semibold mt-1 inline-block">Create your first invoice →</Link>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
