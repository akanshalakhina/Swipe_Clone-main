import { Users, Search, Plus } from 'lucide-react'

import { useCustomers } from '../../hooks/useCustomers'
import Loader from '../../components/shared/Loader'

export default function CustomersPage() {
  const { customers, isLoading, isError } = useCustomers()

  if (isLoading) return <div className="flex justify-center p-8"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
  if (isError) return <div className="p-8 text-center text-red-500">Failed to load customers.</div>

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">{customers.length} customers</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors">
          <Plus size={18} /> Add Customer
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {customers.map(c => (
          <div key={c.id} className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold">{c.name[0]}</div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">{c.name}</div>
                <div className="text-xs text-gray-400">{c.phone}</div>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <div><span className="text-gray-400">Total Billed</span><div className="text-sm font-bold text-gray-900 mt-0.5">₹{(c.totalBilled || 0).toLocaleString()}</div></div>
              <div className="text-right"><span className="text-gray-400">Balance Due</span><div className={`text-sm font-bold mt-0.5 ${(c.balance || 0) > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>₹{(c.balance || 0).toLocaleString()}</div></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
