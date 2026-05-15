import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Search, Plus, Phone, Mail, MapPin, Edit, Trash2, X, UserPlus } from 'lucide-react'

import { useCustomers } from '../../hooks/useCustomers'
import Button from '../../components/ui/Button'
import { toast } from 'react-hot-toast'

export default function CustomersPage() {
  const [search, setSearch] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [newCustomer, setNewCustomer] = useState({ name: '', phone: '', email: '', address: '', gstin: '' })

  const { customers, isLoading, isError, createCustomer, deleteCustomer } = useCustomers()

  if (isLoading) return <div className="flex justify-center p-8"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
  if (isError) return <div className="p-8 text-center text-red-500">Failed to load customers. Please ensure you have a business set up.</div>

  const filtered = customers.filter(c => 
    c.name?.toLowerCase().includes(search.toLowerCase()) ||
    c.phone?.toLowerCase().includes(search.toLowerCase()) ||
    c.email?.toLowerCase().includes(search.toLowerCase())
  )

  const handleAddCustomer = async (e) => {
    e.preventDefault()
    if (!newCustomer.name.trim()) return toast.error('Customer name is required')
    try {
      await createCustomer({
        ...newCustomer,
        totalBilled: 0,
        balance: 0,
        createdAt: new Date().toISOString()
      })
      toast.success('Customer added successfully!')
      setIsAddModalOpen(false)
      setNewCustomer({ name: '', phone: '', email: '', address: '', gstin: '' })
    } catch (err) {
      toast.error('Failed to add customer: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await deleteCustomer(id)
        toast.success('Customer deleted')
      } catch (err) {
        toast.error('Failed to delete customer')
      }
    }
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500 mt-1">{customers.length} customers</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
        >
          <Plus size={18} /> Add Customer
        </button>
      </div>

      {/* Search */}
      <div className="relative max-w-sm">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input 
          type="text" 
          value={search} 
          onChange={e => setSearch(e.target.value)} 
          placeholder="Search customers..." 
          className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" 
        />
      </div>

      {/* Customers Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((c, i) => (
          <motion.div 
            key={c.id} 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.03 }}
            className="bg-white rounded-2xl border border-gray-200 p-5 hover:shadow-md transition-shadow group relative"
          >
            {/* Delete button */}
            <button 
              onClick={() => handleDelete(c.id)}
              className="absolute top-3 right-3 p-1.5 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-lg opacity-0 group-hover:opacity-100 transition-all"
            >
              <Trash2 size={14} />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 text-sm font-bold shrink-0">
                {c.name?.[0]?.toUpperCase() || '?'}
              </div>
              <div className="min-w-0">
                <div className="text-sm font-semibold text-gray-900 truncate">{c.name}</div>
                {c.phone && <div className="text-xs text-gray-400 flex items-center gap-1"><Phone size={10} /> {c.phone}</div>}
              </div>
            </div>

            {c.email && (
              <div className="text-xs text-gray-400 flex items-center gap-1 mb-2">
                <Mail size={10} /> {c.email}
              </div>
            )}

            {c.address && (
              <div className="text-xs text-gray-400 flex items-center gap-1 mb-3">
                <MapPin size={10} /> <span className="truncate">{c.address}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-xs border-t border-gray-50 pt-3">
              <div>
                <span className="text-gray-400">Total Billed</span>
                <div className="text-sm font-bold text-gray-900 mt-0.5">₹{(c.totalBilled || 0).toLocaleString()}</div>
              </div>
              <div className="text-right">
                <span className="text-gray-400">Balance Due</span>
                <div className={`text-sm font-bold mt-0.5 ${(c.balance || 0) > 0 ? 'text-amber-600' : 'text-emerald-600'}`}>
                  ₹{(c.balance || 0).toLocaleString()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center">
            <UserPlus size={48} className="mx-auto mb-4 text-gray-200" />
            <p className="text-sm font-medium text-gray-400">No customers found</p>
            <p className="text-xs text-gray-300 mt-1">Click "Add Customer" to get started</p>
          </div>
        )}
      </div>

      {/* Add Customer Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
              onClick={() => setIsAddModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Add New Customer</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <form onSubmit={handleAddCustomer} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Customer Name *</label>
                  <input 
                    required
                    type="text" 
                    value={newCustomer.name} 
                    onChange={e => setNewCustomer({...newCustomer, name: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                    placeholder="e.g. Acme Corp"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Phone</label>
                    <input 
                      type="tel" 
                      value={newCustomer.phone} 
                      onChange={e => setNewCustomer({...newCustomer, phone: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Email</label>
                    <input 
                      type="email" 
                      value={newCustomer.email} 
                      onChange={e => setNewCustomer({...newCustomer, email: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                      placeholder="customer@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Address</label>
                  <input 
                    type="text" 
                    value={newCustomer.address} 
                    onChange={e => setNewCustomer({...newCustomer, address: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                    placeholder="Full billing address"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">GSTIN (Optional)</label>
                  <input 
                    type="text" 
                    value={newCustomer.gstin} 
                    onChange={e => setNewCustomer({...newCustomer, gstin: e.target.value})}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                    placeholder="22ABCDE1234F1Z5"
                  />
                </div>
                <div className="pt-4 flex gap-3">
                  <Button variant="secondary" fullWidth onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                  <Button type="submit" fullWidth>Save Customer</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
