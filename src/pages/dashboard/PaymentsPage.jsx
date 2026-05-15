import { CreditCard, ArrowDownLeft, ArrowUpRight } from 'lucide-react'

import { usePayments } from '../../hooks/usePayments'
import Loader from '../../components/shared/Loader'

export default function PaymentsPage() {
  const { payments, isLoading, isError } = usePayments()

  if (isLoading) return <div className="flex justify-center p-8"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
  if (isError) return <div className="p-8 text-center text-red-500">Failed to load payments.</div>

  const received = payments.filter(p => p.type === 'received').reduce((s, p) => s + (p.amount || 0), 0)
  const made = payments.filter(p => p.type === 'made').reduce((s, p) => s + (p.amount || 0), 0)

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-emerald-600 mb-2"><ArrowDownLeft size={18} /><span className="text-xs font-medium">Received</span></div>
          <div className="text-2xl font-bold text-gray-900">₹{received.toLocaleString()}</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-red-500 mb-2"><ArrowUpRight size={18} /><span className="text-xs font-medium">Paid Out</span></div>
          <div className="text-2xl font-bold text-gray-900">₹{made.toLocaleString()}</div>
        </div>
      </div>
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="p-4 border-b border-gray-100"><h3 className="text-sm font-semibold text-gray-900">Transaction History</h3></div>
        <div className="divide-y divide-gray-50">
          {payments.map(p => (
            <div key={p.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${p.type === 'received' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                  {p.type === 'received' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{p.customer?.name || p.customer || 'Unknown'}</div>
                  <div className="text-[11px] text-gray-400">
                    {p.date?.seconds ? new Date(p.date.seconds * 1000).toLocaleDateString() : p.date} • {p.method} • {p.reference || p.ref}
                  </div>
                </div>
              </div>
              <div className={`text-sm font-bold ${p.type === 'received' ? 'text-emerald-600' : 'text-red-500'}`}>
                {p.type === 'received' ? '+' : '-'}₹{(p.amount || 0).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
