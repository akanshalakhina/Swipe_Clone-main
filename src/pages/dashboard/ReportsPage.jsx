import { BarChart3, FileText, IndianRupee, Receipt } from 'lucide-react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'

const gstData = [
  { name: 'CGST', value: 28500, color: '#2563EB' },
  { name: 'SGST', value: 28500, color: '#7C3AED' },
  { name: 'IGST', value: 12000, color: '#10B981' },
]

export default function ReportsPage() {
  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Reports</h1>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Sales', value: '₹7,81,000', icon: IndianRupee, color: 'bg-blue-50 text-blue-600' },
          { label: 'Total Purchases', value: '₹3,42,000', icon: FileText, color: 'bg-violet-50 text-violet-600' },
          { label: 'Tax Collected', value: '₹69,000', icon: Receipt, color: 'bg-emerald-50 text-emerald-600' },
          { label: 'Net Profit', value: '₹4,39,000', icon: BarChart3, color: 'bg-amber-50 text-amber-600' },
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

      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">GST Summary</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={gstData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} paddingAngle={4} dataKey="value">
                {gstData.map((entry) => (<Cell key={entry.name} fill={entry.color} />))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-6 mt-2">
            {gstData.map(d => (
              <div key={d.name} className="flex items-center gap-2 text-xs">
                <span className="w-2.5 h-2.5 rounded-full" style={{ background: d.color }} />
                <span className="text-gray-600">{d.name}: ₹{d.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Reports</h3>
          <div className="space-y-2">
            {['Sales Report', 'Purchase Report', 'GSTR-1 Summary', 'GSTR-3B Summary', 'P&L Statement', 'Party Ledger', 'Stock Summary', 'Day Book'].map(report => (
              <button key={report} className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors cursor-pointer">
                {report}
                <span className="text-gray-400">→</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
