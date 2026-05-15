import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronLeft, Settings, Search, Plus, Sparkles, HelpCircle, 
  ChevronDown, Image as ImageIcon, Building2, PenLine, Trash2, X
} from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useProducts } from '../../hooks/useProducts'
import { useInvoices } from '../../hooks/useInvoices'
import { toast } from 'react-hot-toast'
import Button from '../../components/ui/Button'

export default function CreateInvoicePage() {
  const navigate = useNavigate()
  const { products } = useProducts()
  const { createInvoice } = useInvoices()
  
  const [invoice, setInvoice] = useState({
    invoiceNumber: Math.floor(1000 + Math.random() * 9000).toString(),
    customerName: '',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    items: [],
    notes: '',
    status: 'Pending'
  })

  const [searchTerm, setSearchTerm] = useState('')
  const [showProductDropdown, setShowProductDropdown] = useState(false)

  const addItem = (product) => {
    const existing = invoice.items.find(item => item.id === product.id)
    if (existing) {
      setInvoice({
        ...invoice,
        items: invoice.items.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      })
    } else {
      setInvoice({
        ...invoice,
        items: [...invoice.items, { ...product, quantity: 1 }]
      })
    }
    setShowProductDropdown(false)
    setSearchTerm('')
  }

  const removeItem = (id) => {
    setInvoice({ ...invoice, items: invoice.items.filter(item => item.id !== id) })
  }

  const updateQuantity = (id, q) => {
    setInvoice({
      ...invoice,
      items: invoice.items.map(item => item.id === id ? { ...item, quantity: Math.max(1, q) } : item)
    })
  }

  const subtotal = invoice.items.reduce((acc, item) => acc + (item.price * item.quantity), 0)
  const tax = subtotal * 0.18 // 18% GST default
  const total = subtotal + tax

  const handleSave = async () => {
    if (!invoice.customerName) return toast.error('Please enter customer name')
    if (invoice.items.length === 0) return toast.error('Please add at least one item')

    try {
      await createInvoice({
        ...invoice,
        subtotal,
        tax,
        totalAmount: total,
        createdAt: new Date().toISOString()
      })
      toast.success('Invoice created successfully!')
      navigate('/app/invoices')
    } catch (err) {
      toast.error('Failed to save invoice')
    }
  }

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex flex-col font-sans text-gray-900 pb-24">
      <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-4">
          <Link to="/app/invoices" className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-gray-600">
            <ChevronLeft size={20} />
          </Link>
          <h1 className="text-lg font-bold text-gray-900">New Invoice #{invoice.invoiceNumber}</h1>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => navigate('/app/invoices')}>Cancel</Button>
          <Button onClick={handleSave}>Save Invoice</Button>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Customer Details</h3>
            <input 
              type="text" 
              placeholder="Customer Name"
              value={invoice.customerName}
              onChange={e => setInvoice({...invoice, customerName: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Date</label>
              <input type="date" value={invoice.date} onChange={e => setInvoice({...invoice, date: e.target.value})} className="w-full border-none bg-gray-50 p-2 rounded-lg text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Due Date</label>
              <input type="date" value={invoice.dueDate} onChange={e => setInvoice({...invoice, dueDate: e.target.value})} className="w-full border-none bg-gray-50 p-2 rounded-lg text-sm" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-gray-50 border-b border-gray-100 flex items-center gap-4">
            <div className="relative flex-1">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search products to add..."
                value={searchTerm}
                onChange={e => { setSearchTerm(e.target.value); setShowProductDropdown(true) }}
                onFocus={() => setShowProductDropdown(true)}
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
              />
              <AnimatePresence>
                {showProductDropdown && searchTerm && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto"
                  >
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
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <table className="w-full">
            <thead>
              <tr className="text-[11px] font-bold text-gray-400 uppercase bg-gray-50/50">
                <th className="px-6 py-3 text-left">Item</th>
                <th className="px-6 py-3 text-center">Qty</th>
                <th className="px-6 py-3 text-right">Price</th>
                <th className="px-6 py-3 text-right">Total</th>
                <th className="px-6 py-3 text-center w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {invoice.items.map(item => (
                <tr key={item.id}>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-900">{item.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <input 
                        type="number" 
                        value={item.quantity} 
                        onChange={e => updateQuantity(item.id, parseInt(e.target.value))}
                        className="w-12 text-center border border-gray-200 rounded p-1 text-sm"
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-right">₹{item.price}</td>
                  <td className="px-6 py-4 text-sm font-bold text-right">₹{item.price * item.quantity}</td>
                  <td className="px-6 py-4 text-center">
                    <button onClick={() => removeItem(item.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={16} /></button>
                  </td>
                </tr>
              ))}
              {invoice.items.length === 0 && (
                <tr>
                  <td colSpan="5" className="py-12 text-center text-gray-400 italic text-sm">No items added yet. Search products above to add.</td>
                </tr>
              )}
            </tbody>
          </table>

          <div className="p-6 bg-gray-50 flex justify-end">
            <div className="w-64 space-y-3">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>GST (18%)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 border-t border-gray-200 pt-3">
                <span>Total Amount</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
          <label className="block text-xs font-bold text-gray-400 uppercase mb-2">Notes & Terms</label>
          <textarea 
            value={invoice.notes}
            onChange={e => setInvoice({...invoice, notes: e.target.value})}
            placeholder="Thank you for your business!"
            className="w-full h-32 p-4 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
          />
        </div>
      </main>
    </div>
  )
}
