import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Package, Trash2, X, Eye, Filter, CheckCircle2, Settings, PlayCircle } from 'lucide-react'
import { usePurchases } from '../../hooks/usePurchases'
import { useProducts } from '../../hooks/useProducts'
import Button from '../../components/ui/Button'
import { toast } from 'react-hot-toast'
import { useLocation, useNavigate } from 'react-router-dom'

function PurchaseIllustration() {
  return (
    <svg width="400" height="250" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[400px] mb-8">
      <path d="M50 200 L150 100 L350 100 L250 200 Z" stroke="#E5E7EB" strokeWidth="2" fill="#F9FAFB" />
      <path d="M150 100 L150 20 L350 20 L350 100" stroke="#E5E7EB" strokeWidth="2" />
      <path d="M50 200 L50 120 L150 20" stroke="#E5E7EB" strokeWidth="2" />
      <rect x="80" y="140" width="100" height="10" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
      <rect x="90" y="150" width="10" height="50" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
      <rect x="160" y="150" width="10" height="50" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
      <path d="M100 140 L130 140 L120 110 L90 110 Z" fill="#9CA3AF" stroke="#6B7280" strokeWidth="2" />
      <circle cx="150" cy="100" r="15" fill="#1F2937" />
      <path d="M135 115 Q150 130 165 115 L160 160 L140 160 Z" fill="#374151" />
      <path d="M150 115 L170 100" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      <path d="M175 95 L200 80 L195 100 Z" fill="#60A5FA" />
      <path d="M175 95 L190 95 L200 80" fill="#3B82F6" />
      <rect x="220" y="40" width="100" height="80" fill="#EEF2FF" stroke="#9CA3AF" strokeWidth="2" />
      <line x1="270" y1="40" x2="270" y2="120" stroke="#9CA3AF" strokeWidth="2" />
      <line x1="220" y1="80" x2="320" y2="80" stroke="#9CA3AF" strokeWidth="2" />
      <circle cx="280" cy="130" r="15" fill="#4B5563" />
      <path d="M265 145 Q280 160 295 145 L290 200 L270 200 Z" fill="#6B7280" />
    </svg>
  )
}

export default function PurchasesPage() {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [search, setSearch] = useState('')
  const { purchases, isLoading, isError, createPurchase, deletePurchase } = usePurchases()
  const { products } = useProducts()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname.endsWith('/new')) {
      setShowCreateModal(true)
    }
  }, [location.pathname])

  const closeCreateModal = () => {
    setShowCreateModal(false)
    if (location.pathname.endsWith('/new')) {
      navigate('/app/purchases')
    }
  }

  const [newPurchase, setNewPurchase] = useState({
    vendorName: '',
    date: new Date().toISOString().split('T')[0],
    items: [],
    notes: '',
    status: 'Pending'
  })
  const [searchProduct, setSearchProduct] = useState('')
  const [showProductDropdown, setShowProductDropdown] = useState(false)

  const addItem = (product) => {
    const existing = newPurchase.items.find(item => item.id === product.id)
    if (existing) {
      setNewPurchase({
        ...newPurchase,
        items: newPurchase.items.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      })
    } else {
      setNewPurchase({
        ...newPurchase,
        items: [...newPurchase.items, { ...product, quantity: 1, costPrice: product.price }]
      })
    }
    setShowProductDropdown(false)
    setSearchProduct('')
  }

  const removeItem = (id) => {
    setNewPurchase({ ...newPurchase, items: newPurchase.items.filter(item => item.id !== id) })
  }

  const subtotal = newPurchase.items.reduce((acc, item) => acc + ((Number(item.costPrice) || 0) * item.quantity), 0)
  const tax = subtotal * 0.18
  const total = subtotal + tax

  const handleCreatePurchase = async () => {
    if (!newPurchase.vendorName.trim()) return toast.error('Please enter vendor name')
    if (newPurchase.items.length === 0) return toast.error('Please add at least one item')

    try {
      await createPurchase({
        ...newPurchase,
        subtotal,
        tax,
        totalAmount: total,
        purchaseNumber: `PUR-${Date.now().toString().slice(-6)}`
      })
      toast.success('Purchase recorded successfully!')
      closeCreateModal()
      setNewPurchase({ vendorName: '', date: new Date().toISOString().split('T')[0], items: [], notes: '', status: 'Pending' })
    } catch (err) {
      toast.error('Failed to save purchase: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this purchase record?')) {
      try {
        await deletePurchase(id)
        toast.success('Purchase deleted')
      } catch (err) {
        toast.error('Failed to delete')
      }
    }
  }

  const filteredProducts = products.filter(p =>
    p.name?.toLowerCase().includes(searchProduct.toLowerCase())
  )

  const filtered = purchases.filter(p =>
    p.vendorName?.toLowerCase().includes(search.toLowerCase()) ||
    p.purchaseNumber?.toLowerCase().includes(search.toLowerCase())
  )

  if (isLoading) return <div className="flex justify-center p-8"><div className="w-6 h-6 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" /></div>

  return (
    <div className="h-full flex flex-col">
      {/* Welcome Offer Banner */}
      <div className="bg-[#E6F0FF] text-center py-2 px-4 flex items-center justify-center gap-2 -mx-4 lg:-mx-6 -mt-4 lg:-mt-6 mb-6">
        <span className="text-[13px] font-medium text-gray-800">
          Hurry! Just 6 days left to claim your welcome offer 🎉
        </span>
        <button className="bg-white text-[11px] font-bold text-gray-900 px-3 py-1 rounded-full shadow-sm hover:bg-gray-50 transition-colors cursor-pointer">
          Subscribe Now 🚀
        </button>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between mb-6 px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold text-gray-900">Purchases</h1>
          <button className="text-pink-500 hover:text-pink-600 transition-colors cursor-pointer">
            <PlayCircle size={20} className="fill-pink-100" />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <button className="hidden sm:flex items-center gap-2 text-[13px] font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer">
            <Settings size={16} /> Document Settings
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-[#2563EB] hover:bg-blue-700 text-white text-[13px] font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Plus size={16} /> Create Purchase
          </button>
        </div>
      </div>

      {purchases.length === 0 ? (
        /* Empty State */
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-4xl w-full flex flex-col md:flex-row items-center gap-12 lg:gap-20">
            <div className="w-full md:w-1/2 flex justify-end">
              <PurchaseIllustration />
            </div>
            <div className="w-full md:w-1/2">
              <h2 className="text-3xl font-extrabold text-gray-900 mb-6 tracking-tight">
                Purchase invoices made easy.
              </h2>
              <div className="space-y-4 mb-8">
                {[
                  'Record purchases to automatically stock-in inventory',
                  'Get better data insights to your purchases'
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 text-gray-500">
                      <CheckCircle2 size={18} className="fill-gray-200" />
                    </div>
                    <span className="text-sm text-gray-600">{text}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => setShowCreateModal(true)}
                className="w-full max-w-[320px] bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors mb-6 cursor-pointer"
              >
                <Plus size={18} /> Record your purchases
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Purchases Table */
        <div className="px-6 space-y-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search purchases..."
                className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100"
              />
            </div>
            <button className="p-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"><Filter size={18} /></button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-[11px] font-bold text-gray-500 uppercase tracking-wider">
                  <th className="px-6 py-4">Purchase #</th>
                  <th className="px-6 py-4">Vendor</th>
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(pur => (
                  <tr key={pur.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="px-6 py-4 font-bold text-gray-900">{pur.purchaseNumber}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{pur.vendorName}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {pur.createdAt?.toDate ? pur.createdAt.toDate().toLocaleDateString('en-IN') : pur.date || 'N/A'}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900 text-right">
                      ₹{Number(pur.totalAmount || 0).toLocaleString('en-IN')}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-md text-[10px] font-bold uppercase ${
                        pur.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {pur.status || 'Pending'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 hover:bg-blue-50 text-gray-400 hover:text-blue-600 rounded-lg transition-colors"><Eye size={16} /></button>
                        <button onClick={() => handleDelete(pur.id)} className="p-2 hover:bg-red-50 text-gray-400 hover:text-red-600 rounded-lg transition-colors"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create Purchase Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
              onClick={closeCreateModal}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between shrink-0">
                <h2 className="text-lg font-bold text-gray-900">Record Purchase</h2>
                <button onClick={closeCreateModal} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Vendor Name *</label>
                    <input
                      type="text"
                      value={newPurchase.vendorName}
                      onChange={e => setNewPurchase({ ...newPurchase, vendorName: e.target.value })}
                      placeholder="e.g. ABC Supplies"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Date</label>
                    <input
                      type="date"
                      value={newPurchase.date}
                      onChange={e => setNewPurchase({ ...newPurchase, date: e.target.value })}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                {/* Add products */}
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Add Items</label>
                  <div className="relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search products to add..."
                      value={searchProduct}
                      onChange={e => { setSearchProduct(e.target.value); setShowProductDropdown(true) }}
                      onFocus={() => setShowProductDropdown(true)}
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                    />
                    {showProductDropdown && searchProduct && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto">
                        {filteredProducts.map(p => (
                          <button
                            key={p.id}
                            onClick={() => addItem(p)}
                            className="w-full px-4 py-3 text-left hover:bg-blue-50 flex justify-between items-center border-b border-gray-50 last:border-0"
                          >
                            <div>
                              <div className="text-sm font-bold text-gray-900">{p.name}</div>
                              <div className="text-xs text-gray-500">Stock: {p.stock}</div>
                            </div>
                            <div className="text-sm font-bold text-blue-600">₹{p.price}</div>
                          </button>
                        ))}
                        {filteredProducts.length === 0 && (
                          <div className="px-4 py-3 text-sm text-gray-400">No products found</div>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Items table */}
                {newPurchase.items.length > 0 && (
                  <div className="bg-gray-50 rounded-xl overflow-hidden border border-gray-200">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-[10px] font-bold text-gray-500 uppercase bg-gray-100">
                          <th className="px-4 py-2 text-left">Item</th>
                          <th className="px-4 py-2 text-center">Qty</th>
                          <th className="px-4 py-2 text-right">Cost</th>
                          <th className="px-4 py-2 text-right">Total</th>
                          <th className="px-4 py-2 w-10"></th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {newPurchase.items.map(item => (
                          <tr key={item.id} className="bg-white">
                            <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                            <td className="px-4 py-3">
                              <input
                                type="number"
                                value={item.quantity}
                                onChange={e => setNewPurchase({
                                  ...newPurchase,
                                  items: newPurchase.items.map(i => i.id === item.id ? { ...i, quantity: Math.max(1, parseInt(e.target.value) || 1) } : i)
                                })}
                                className="w-14 text-center border border-gray-200 rounded p-1 text-sm"
                              />
                            </td>
                            <td className="px-4 py-3 text-right">
                              <input
                                type="number"
                                value={item.costPrice}
                                onChange={e => setNewPurchase({
                                  ...newPurchase,
                                  items: newPurchase.items.map(i => i.id === item.id ? { ...i, costPrice: e.target.value } : i)
                                })}
                                className="w-20 text-right border border-gray-200 rounded p-1 text-sm"
                              />
                            </td>
                            <td className="px-4 py-3 text-right font-bold">₹{(Number(item.costPrice || 0) * item.quantity).toLocaleString()}</td>
                            <td className="px-4 py-3 text-center">
                              <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 text-right space-y-1">
                      <div className="text-sm text-gray-500">Subtotal: ₹{subtotal.toLocaleString()}</div>
                      <div className="text-sm text-gray-500">GST (18%): ₹{tax.toLocaleString()}</div>
                      <div className="text-lg font-bold text-gray-900">Total: ₹{total.toLocaleString()}</div>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Notes</label>
                  <textarea
                    value={newPurchase.notes}
                    onChange={e => setNewPurchase({ ...newPurchase, notes: e.target.value })}
                    placeholder="Additional notes..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm h-20 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="px-6 py-4 border-t border-gray-100 flex gap-3 shrink-0">
                <Button variant="secondary" fullWidth onClick={closeCreateModal}>Cancel</Button>
                <Button fullWidth onClick={handleCreatePurchase}>Save Purchase</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
