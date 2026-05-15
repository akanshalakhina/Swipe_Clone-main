import { useMemo, useState } from 'react'
import { BarChart3, FileText, IndianRupee, Receipt, Download, Calendar, TrendingUp, ChevronDown } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts'
import { useInvoices } from '../../hooks/useInvoices'
import { usePayments } from '../../hooks/usePayments'
import { useProducts } from '../../hooks/useProducts'
import { usePurchases } from '../../hooks/usePurchases'

export default function ReportsPage() {
  const { invoices } = useInvoices()
  const { payments } = usePayments()
  const { products } = useProducts()
  const { purchases } = usePurchases()
  const [activeReport, setActiveReport] = useState(null)

  const stats = useMemo(() => {
    const totalSales = invoices.reduce((s, i) => s + Number(i.totalAmount || 0), 0)
    const totalPurchases = purchases.reduce((s, p) => s + Number(p.totalAmount || 0), 0)
    const totalTax = invoices.reduce((s, i) => s + Number(i.tax || 0), 0)
    const netProfit = totalSales - totalPurchases
    return { totalSales, totalPurchases, totalTax, netProfit }
  }, [invoices, purchases])

  const gstData = useMemo(() => {
    const totalTax = stats.totalTax || 1
    // Split tax into CGST, SGST (half each for intra-state), IGST for illustration
    const cgst = totalTax / 2
    const sgst = totalTax / 2
    return [
      { name: 'CGST', value: Math.round(cgst), color: '#2563EB' },
      { name: 'SGST', value: Math.round(sgst), color: '#7C3AED' },
    ]
  }, [stats.totalTax])

  const monthlyData = useMemo(() => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const data = months.map(m => ({ name: m, sales: 0, purchases: 0 }))

    invoices.forEach(inv => {
      let d = inv.createdAt?.toDate ? inv.createdAt.toDate() : new Date(inv.createdAt || inv.date)
      if (d && !isNaN(d.getTime())) {
        data[d.getMonth()].sales += Number(inv.totalAmount || 0)
      }
    })

    purchases.forEach(pur => {
      let d = pur.createdAt?.toDate ? pur.createdAt.toDate() : new Date(pur.createdAt || pur.date)
      if (d && !isNaN(d.getTime())) {
        data[d.getMonth()].purchases += Number(pur.totalAmount || 0)
      }
    })

    return data
  }, [invoices, purchases])

  const inventoryValue = useMemo(() => {
    return products.reduce((s, p) => s + (Number(p.price || 0) * Number(p.stock || 0)), 0)
  }, [products])

  const topProducts = useMemo(() => {
    const productMap = {}
    invoices.forEach(inv => {
      (inv.items || []).forEach(item => {
        if (!productMap[item.name]) productMap[item.name] = { name: item.name, revenue: 0, qty: 0 }
        productMap[item.name].revenue += (Number(item.price) || 0) * (Number(item.quantity) || 0)
        productMap[item.name].qty += Number(item.quantity) || 0
      })
    })
    return Object.values(productMap).sort((a, b) => b.revenue - a.revenue).slice(0, 5)
  }, [invoices])

  const reportsList = [
    { name: 'Sales Report', desc: 'View sales breakdown by period' },
    { name: 'Purchase Report', desc: 'View purchase details by vendor' },
    { name: 'GSTR-1 Summary', desc: 'Outward supplies summary' },
    { name: 'GSTR-3B Summary', desc: 'Monthly return summary' },
    { name: 'P&L Statement', desc: 'Profit & Loss overview' },
    { name: 'Party Ledger', desc: 'Customer/vendor balance details' },
    { name: 'Stock Summary', desc: 'Current inventory status' },
    { name: 'Day Book', desc: 'Daily transaction log' },
  ]

  return (
    <div className="p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Financial overview and GST summaries</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
          <Calendar size={18} className="text-gray-400" />
          This Year
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Sales', value: `₹${stats.totalSales.toLocaleString('en-IN')}`, icon: IndianRupee, color: 'bg-blue-50 text-blue-600' },
          { label: 'Total Purchases', value: `₹${stats.totalPurchases.toLocaleString('en-IN')}`, icon: FileText, color: 'bg-violet-50 text-violet-600' },
          { label: 'Tax Collected', value: `₹${stats.totalTax.toLocaleString('en-IN')}`, icon: Receipt, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Net Profit', value: `₹${stats.netProfit.toLocaleString('en-IN')}`, icon: BarChart3, color: 'bg-amber-50 text-amber-600' },
        ].map(stat => (
          <div key={stat.label} className="bg-white rounded-2xl border border-gray-200 p-5">
            <div className={`w-10 h-10 rounded-xl ${stat.color.split(' ')[0]} flex items-center justify-center mb-3`}>
              <stat.icon size={20} className={stat.color.split(' ')[1]} />
            </div>
            <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Monthly Sales vs Purchases */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Monthly Sales vs Purchases</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} />
              <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#9CA3AF' }} tickFormatter={(v) => `₹${v / 1000}k`} />
              <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="sales" fill="#2563EB" radius={[4, 4, 0, 0]} name="Sales" />
              <Bar dataKey="purchases" fill="#7C3AED" radius={[4, 4, 0, 0]} name="Purchases" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* GST Summary */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">GST Summary</h3>
          {stats.totalTax > 0 ? (
            <>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={gstData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                    {gstData.map((entry) => (<Cell key={entry.name} fill={entry.color} />))}
                  </Pie>
                  <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-6 mt-2">
                {gstData.map(d => (
                  <div key={d.name} className="flex items-center gap-2 text-xs">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                    <span className="text-gray-600">{d.name}: ₹{d.value.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-[200px] text-gray-400 text-sm">
              Create invoices with GST to see tax breakdown
            </div>
          )}
        </div>
      </div>

      {/* Bottom Row */}
      <div className="grid lg:grid-cols-2 gap-4">
        {/* Top Products */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Top Products by Revenue</h3>
          {topProducts.length > 0 ? (
            <div className="space-y-3">
              {topProducts.map((p, i) => (
                <div key={p.name} className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold text-white ${
                    ['bg-blue-600', 'bg-violet-600', 'bg-emerald-600', 'bg-amber-600', 'bg-rose-600'][i]
                  }`}>{i + 1}</div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-gray-900 truncate">{p.name}</div>
                    <div className="text-xs text-gray-400">{p.qty} units sold</div>
                  </div>
                  <div className="text-sm font-bold text-gray-900">₹{p.revenue.toLocaleString('en-IN')}</div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center h-[150px] text-gray-400 text-sm">
              Create invoices with products to see rankings
            </div>
          )}

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-gray-500">Total Inventory Value</span>
            <span className="text-sm font-bold text-gray-900">₹{inventoryValue.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Quick Reports */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Reports</h3>
          <div className="space-y-2">
            {reportsList.map(report => (
              <button
                key={report.name}
                onClick={() => setActiveReport(activeReport === report.name ? null : report.name)}
                className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer"
              >
                <div className="text-left">
                  <div className="font-medium">{report.name}</div>
                  {activeReport === report.name && (
                    <div className="text-xs text-gray-400 mt-1">{report.desc}</div>
                  )}
                </div>
                <ChevronDown size={16} className={`text-gray-400 transition-transform ${activeReport === report.name ? 'rotate-180' : ''}`} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
