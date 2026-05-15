import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  PlayCircle, Settings, Plus, CheckCircle2, X, 
  Search, Filter, MoreVertical, Eye, Download, Trash2,
  Calendar, ArrowUpRight
} from 'lucide-react'
import { useInvoices } from '../../hooks/useInvoices'
import { toast } from 'react-hot-toast'

// ... InvoiceIllustration and SetupModal stay the same ...
function InvoiceIllustration() {
  return (
    <svg width="400" height="250" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[400px] mb-8">
      <path d="M50 200 L150 100 L350 100 L250 200 Z" stroke="#E5E7EB" strokeWidth="2" fill="#F9FAFB" />
      <path d="M150 100 L150 20 L350 20 L350 100" stroke="#E5E7EB" strokeWidth="2" />
      <path d="M50 200 L50 120 L150 20" stroke="#E5E7EB" strokeWidth="2" />
      <rect x="80" y="140" width="100" height="10" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
      <rect x="90" y="150" width="10" height="50" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
      <rect x="160" y="150" width="10" height="50" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
      <path d="M100 140 L130 140 L120 110 L90 110 Z" fill="#93C5FD" stroke="#3B82F6" strokeWidth="2" />
      <circle cx="150" cy="100" r="15" fill="#1F2937" />
      <path d="M135 115 Q150 130 165 115 L160 160 L140 160 Z" fill="#374151" />
      <path d="M135 125 L110 135" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      <path d="M300 200 Q310 150 320 200 Z" fill="#A7F3D0" stroke="#10B981" strokeWidth="2" />
      <path d="M290 200 Q300 170 310 200 Z" fill="#6EE7B7" stroke="#059669" strokeWidth="2" />
      <line x1="200" y1="20" x2="200" y2="230" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="4 4" />
      <rect x="220" y="150" width="80" height="30" rx="10" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="2" />
      <rect x="210" y="130" width="20" height="50" rx="5" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
      <rect x="290" y="130" width="20" height="50" rx="5" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
      <circle cx="260" cy="110" r="15" fill="#4B5563" />
      <path d="M245 125 Q260 140 275 125 L270 170 L250 170 Z" fill="#6B7280" />
      <path d="M245 135 L220 140" stroke="#6B7280" strokeWidth="4" strokeLinecap="round" />
      <rect x="180" y="80" width="40" height="30" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="2" />
      <line x1="185" y1="90" x2="215" y2="90" stroke="#4F46E5" strokeWidth="2" />
      <line x1="185" y1="100" x2="205" y2="100" stroke="#4F46E5" strokeWidth="2" />
      <path d="M160 120 Q180 90 220 110" fill="none" stroke="#6366F1" strokeWidth="2" strokeDasharray="4 4" />
    </svg>
  )
}

function SetupModal({ onClose }) {
  const [hasGSTIN, setHasGSTIN] = useState(true)
  const navigate = useNavigate()
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-5xl bg-[#F8F9FA] rounded-xl shadow-2xl flex flex-col md:flex-row overflow-hidden max-h-[90vh]"
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 z-10 cursor-pointer">
          <X size={20} />
        </button>

        {/* Left Side: Form */}
        <div className="w-full md:w-1/2 bg-white p-8 md:p-12 overflow-y-auto">
          <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center mb-8">
            <span className="text-white font-bold text-2xl italic">S</span>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">First, add company details</h2>
          <p className="text-sm text-gray-500 mb-8">Create invoices in 10 seconds!</p>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <button 
              onClick={() => setHasGSTIN(true)}
              className={`p-4 rounded-xl border-2 text-left transition-colors cursor-pointer ${hasGSTIN ? 'border-blue-600 bg-blue-50/30' : 'border-gray-200 hover:border-blue-300'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 ${hasGSTIN ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                <CheckCircle2 size={16} />
              </div>
              <div className="font-bold text-sm text-gray-900 mb-1">I have a GSTIN</div>
              <div className="text-xs text-gray-500">Make invoices with tax</div>
            </button>
            <button 
              onClick={() => setHasGSTIN(false)}
              className={`p-4 rounded-xl border-2 text-left transition-colors cursor-pointer ${!hasGSTIN ? 'border-blue-600 bg-blue-50/30' : 'border-gray-200 hover:border-blue-300'}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center mb-3 ${!hasGSTIN ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'}`}>
                <div className="w-4 h-4 rounded-full border-2 border-current" />
              </div>
              <div className="font-bold text-sm text-gray-900 mb-1">I don't have a GSTIN</div>
              <div className="text-xs text-gray-500">Make invoices without tax</div>
            </button>
          </div>

          <div className="mb-8 h-[72px]">
            {hasGSTIN ? (
              <>
                <label className="block text-xs font-medium text-gray-700 mb-2">Enter GSTIN</label>
                <div className="flex gap-3">
                  <input 
                    type="text" 
                    placeholder="29AABCT1332L000" 
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                  <button className="px-6 py-2 border border-blue-200 text-blue-600 font-semibold text-sm rounded-lg hover:bg-blue-50 transition-colors cursor-pointer">
                    Fetch
                  </button>
                </div>
              </>
            ) : (
              <>
                <label className="block text-xs font-medium text-gray-700 mb-2">Company Name</label>
                <input 
                  type="text" 
                  placeholder="ABCD" 
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium mb-3"
                />
                <button className="text-[13px] font-semibold text-blue-600 flex items-center gap-1 hover:text-blue-700">
                  <span className="text-lg leading-none">+</span> Billing Address
                </button>
              </>
            )}
          </div>

          <button onClick={() => navigate('/app/invoices/new')} className="w-full bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-colors cursor-pointer">
            Finish Setup
          </button>
        </div>

        {/* Right Side: Preview */}
        <div className="w-full md:w-1/2 bg-[#F8F9FA] p-8 flex items-center justify-center border-l border-gray-200">
          <div className="w-full max-w-sm bg-white rounded-lg shadow-sm border border-gray-200 p-6 opacity-60">
            <div className="border border-blue-200 rounded p-4 mb-4 relative">
              <div className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded">
                <CheckCircle2 size={12} /> PREVIEW
              </div>
              <div className="text-xs font-bold text-blue-600 tracking-wider mb-2">TAX INVOICE</div>
              <div className="text-sm font-bold text-gray-900 mb-1">YOUR COMPANY NAME</div>
              <div className="text-[10px] text-gray-500 leading-tight">
                <span className="font-bold text-gray-700">GSTIN</span> YOUR_GSTIN_ID<br/>
                Address line 1<br/>
                Address line 2<br/>
                City, State, Pincode
              </div>
            </div>
            
            <div className="space-y-4 filter blur-[2px]">
              <div className="flex justify-between border-b pb-2">
                <div className="space-y-1"><div className="h-2 w-20 bg-gray-200 rounded"/><div className="h-2 w-32 bg-gray-200 rounded"/></div>
                <div className="space-y-1 text-right"><div className="h-2 w-20 bg-gray-200 rounded ml-auto"/><div className="h-2 w-24 bg-gray-200 rounded ml-auto"/></div>
              </div>
              <div className="h-4 w-full bg-blue-50 rounded" />
              <div className="flex justify-between">
                <div className="h-3 w-40 bg-gray-200 rounded" />
                <div className="h-3 w-20 bg-gray-200 rounded" />
              </div>
              <div className="flex justify-between border-t pt-2">
                <div className="h-4 w-16 bg-gray-200 rounded" />
                <div className="h-4 w-32 bg-gray-800 rounded" />
              </div>
            </div>
          </div>
        </div>

      </motion.div>
    </div>
  )
}

import Button from '../../components/ui/Button'

export default function InvoicesPage() {
  const [showSetup, setShowSetup] = useState(false)
  const [search, setSearch] = useState('')
  const { invoices, isLoading, deleteInvoice } = useInvoices()
  const navigate = useNavigate()

  const handleDelete = async (id) => {
    if (confirm('Delete this invoice?')) {
      try {
        await deleteInvoice(id)
        toast.success('Invoice deleted')
      } catch (err) {
        toast.error('Failed to delete')
      }
    }
  }

  const filtered = invoices.filter(inv => 
    inv.customerName?.toLowerCase().includes(search.toLowerCase()) || 
    inv.invoiceNumber?.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) return <div className="p-12 text-center">Loading invoices...</div>

  return (
    <div className="h-full flex flex-col p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Invoices</h1>
          <p className="text-sm text-gray-500 mt-1">Manage your sales and billing</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => setShowSetup(true)} icon={Plus}>Create Invoice</Button>
        </div>
      </div>

      {invoices.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <InvoiceIllustration />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No invoices yet</h2>
          <p className="text-gray-500 max-w-sm mb-8">Create your first professional invoice in seconds and share it with your customers.</p>
          <Button size="lg" onClick={() => setShowSetup(true)} icon={Plus}>Create First Invoice</Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                value={search} 
                onChange={e => setSearch(e.target.value)}
                placeholder="Search invoices..." 
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100" 
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"><Filter size={18} /></button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Invoice</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map((inv) => (
                  <tr key={inv.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">INV-{inv.invoiceNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 font-medium">{inv.customerName}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {inv.date?.toDate ? inv.date.toDate().toLocaleDateString() : inv.date}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">
                      ₹{inv.totalAmount?.toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                        inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {inv.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"><Eye size={16} /></button>
                        <button onClick={() => handleDelete(inv.id)} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <AnimatePresence>
        {showSetup && <SetupModal onClose={() => setShowSetup(false)} />}
      </AnimatePresence>
    </div>
  )
}
