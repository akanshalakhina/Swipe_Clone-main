import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CreditCard, ArrowDownLeft, ArrowUpRight, Plus, X, Search, Filter, Download } from 'lucide-react'
import { usePayments } from '../../hooks/usePayments'
import { useCustomers } from '../../hooks/useCustomers'
import Button from '../../components/ui/Button'
import { toast } from 'react-hot-toast'

export default function PaymentsPage() {
  const { payments, isLoading, isError, createPayment, deletePayment } = usePayments()
  const { customers } = useCustomers()
  const [showRecordModal, setShowRecordModal] = useState(false)
  const [search, setSearch] = useState('')
  const [filterType, setFilterType] = useState('all')

  const [newPayment, setNewPayment] = useState({
    type: 'received',
    customer: '',
    amount: '',
    method: 'Cash',
    reference: '',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  })

  if (isLoading) return <div className="flex justify-center p-8"><div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>
  if (isError) return <div className="p-8 text-center text-red-500">Failed to load payments.</div>

  const received = payments.filter(p => p.type === 'received').reduce((s, p) => s + Number(p.amount || 0), 0)
  const made = payments.filter(p => p.type === 'made').reduce((s, p) => s + Number(p.amount || 0), 0)

  const filteredPayments = payments.filter(p => {
    const matchesSearch = (p.customer || '').toLowerCase().includes(search.toLowerCase()) ||
      (p.reference || '').toLowerCase().includes(search.toLowerCase())
    const matchesType = filterType === 'all' || p.type === filterType
    return matchesSearch && matchesType
  })

  const handleRecordPayment = async (e) => {
    e.preventDefault()
    if (!newPayment.customer.trim()) return toast.error('Please select or enter a customer/vendor')
    if (!newPayment.amount || Number(newPayment.amount) <= 0) return toast.error('Please enter a valid amount')

    try {
      await createPayment({
        ...newPayment,
        amount: Number(newPayment.amount),
        reference: newPayment.reference || `PAY-${Date.now().toString().slice(-6)}`
      })
      toast.success(`Payment ${newPayment.type === 'received' ? 'received' : 'recorded'} successfully!`)
      setShowRecordModal(false)
      setNewPayment({
        type: 'received', customer: '', amount: '', method: 'Cash',
        reference: '', date: new Date().toISOString().split('T')[0], notes: ''
      })
    } catch (err) {
      toast.error('Failed to record payment: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this payment record?')) {
      try {
        await deletePayment(id)
        toast.success('Payment deleted')
      } catch (err) {
        toast.error('Failed to delete')
      }
    }
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
          <p className="text-sm text-gray-500 mt-1">{payments.length} transactions recorded</p>
        </div>
        <button
          onClick={() => setShowRecordModal(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
        >
          <Plus size={18} /> Record Payment
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-emerald-600 mb-2"><ArrowDownLeft size={18} /><span className="text-xs font-medium">Total Received</span></div>
          <div className="text-2xl font-bold text-gray-900">₹{received.toLocaleString('en-IN')}</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-red-500 mb-2"><ArrowUpRight size={18} /><span className="text-xs font-medium">Total Paid Out</span></div>
          <div className="text-2xl font-bold text-gray-900">₹{made.toLocaleString('en-IN')}</div>
        </div>
        <div className="bg-white rounded-2xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 text-blue-600 mb-2"><CreditCard size={18} /><span className="text-xs font-medium">Net Balance</span></div>
          <div className={`text-2xl font-bold ${received - made >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ₹{(received - made).toLocaleString('en-IN')}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search payments..."
            className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg p-1">
          {[
            { value: 'all', label: 'All' },
            { value: 'received', label: 'Received' },
            { value: 'made', label: 'Paid' }
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setFilterType(f.value)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors ${
                filterType === f.value ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-2xl border border-gray-200">
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-900">Transaction History</h3>
          <button className="text-xs font-medium text-gray-400 hover:text-gray-600 flex items-center gap-1">
            <Download size={14} /> Export
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {filteredPayments.length > 0 ? filteredPayments.map(p => (
            <div key={p.id} className="flex items-center justify-between px-5 py-4 hover:bg-gray-50/50 transition-colors group">
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center ${p.type === 'received' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'}`}>
                  {p.type === 'received' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">{p.customer || 'Unknown'}</div>
                  <div className="text-[11px] text-gray-400">
                    {p.createdAt?.toDate ? p.createdAt.toDate().toLocaleDateString('en-IN') : p.date || 'N/A'} • {p.method || 'Cash'} • {p.reference || 'No ref'}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`text-sm font-bold ${p.type === 'received' ? 'text-emerald-600' : 'text-red-500'}`}>
                  {p.type === 'received' ? '+' : '-'}₹{Number(p.amount || 0).toLocaleString('en-IN')}
                </div>
                <button
                  onClick={() => handleDelete(p.id)}
                  className="p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          )) : (
            <div className="py-16 text-center">
              <CreditCard size={40} className="mx-auto mb-3 text-gray-200" />
              <p className="text-sm font-medium text-gray-400">No payments recorded yet</p>
              <button onClick={() => setShowRecordModal(true)} className="text-blue-600 text-sm font-semibold mt-2">Record your first payment →</button>
            </div>
          )}
        </div>
      </div>

      {/* Record Payment Modal */}
      <AnimatePresence>
        {showRecordModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
              onClick={() => setShowRecordModal(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Record Payment</h2>
                <button onClick={() => setShowRecordModal(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <form onSubmit={handleRecordPayment} className="p-6 space-y-4">
                {/* Type Toggle */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Payment Type</label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setNewPayment({ ...newPayment, type: 'received' })}
                      className={`p-3 rounded-xl border-2 text-center transition-colors ${
                        newPayment.type === 'received' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-gray-200 text-gray-600 hover:border-emerald-300'
                      }`}
                    >
                      <ArrowDownLeft size={20} className="mx-auto mb-1" />
                      <div className="text-xs font-bold">Payment Received</div>
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewPayment({ ...newPayment, type: 'made' })}
                      className={`p-3 rounded-xl border-2 text-center transition-colors ${
                        newPayment.type === 'made' ? 'border-red-500 bg-red-50 text-red-700' : 'border-gray-200 text-gray-600 hover:border-red-300'
                      }`}
                    >
                      <ArrowUpRight size={20} className="mx-auto mb-1" />
                      <div className="text-xs font-bold">Payment Made</div>
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                    {newPayment.type === 'received' ? 'Customer' : 'Vendor'} *
                  </label>
                  <input
                    list="customer-list"
                    type="text"
                    value={newPayment.customer}
                    onChange={e => setNewPayment({ ...newPayment, customer: e.target.value })}
                    placeholder={newPayment.type === 'received' ? 'Select or type customer name' : 'Enter vendor name'}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                  />
                  <datalist id="customer-list">
                    {customers.map(c => <option key={c.id} value={c.name} />)}
                  </datalist>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Amount (₹) *</label>
                    <input
                      required
                      type="number"
                      value={newPayment.amount}
                      onChange={e => setNewPayment({ ...newPayment, amount: e.target.value })}
                      placeholder="0.00"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Date</label>
                    <input
                      type="date"
                      value={newPayment.date}
                      onChange={e => setNewPayment({ ...newPayment, date: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Payment Method</label>
                    <select
                      value={newPayment.method}
                      onChange={e => setNewPayment({ ...newPayment, method: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                    >
                      <option>Cash</option>
                      <option>UPI</option>
                      <option>Bank Transfer</option>
                      <option>Credit Card</option>
                      <option>Cheque</option>
                      <option>PhonePe</option>
                      <option>Google Pay</option>
                      <option>Paytm</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Reference</label>
                    <input
                      type="text"
                      value={newPayment.reference}
                      onChange={e => setNewPayment({ ...newPayment, reference: e.target.value })}
                      placeholder="Txn ID / Cheque No."
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Notes</label>
                  <textarea
                    value={newPayment.notes}
                    onChange={e => setNewPayment({ ...newPayment, notes: e.target.value })}
                    placeholder="Additional notes..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm h-16 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <Button variant="secondary" fullWidth onClick={() => setShowRecordModal(false)}>Cancel</Button>
                  <Button type="submit" fullWidth>Record Payment</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
