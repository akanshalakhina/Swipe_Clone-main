import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Search, Package, Edit, Trash2, AlertTriangle, X, Download } from 'lucide-react'

import { useProducts } from '../../hooks/useProducts'
import Button from '../../components/ui/Button'
import { toast } from 'react-hot-toast'

export default function InventoryPage() {
  const [search, setSearch] = useState('')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [editProduct, setEditProduct] = useState(null)
  const [newProduct, setNewProduct] = useState({ name: '', price: '', stock: '', category: 'General', sku: '', unit: 'Pcs', hsn: '', gstRate: '18' })
  
  const { products, isLoading, isError, createProduct, updateProduct, deleteProduct } = useProducts()

  if (isLoading) return <div className="flex justify-center p-8"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
  if (isError) return <div className="p-8 text-center text-red-500">Failed to load inventory. Please ensure you have a business set up.</div>

  const filtered = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))
  const lowStockCount = products.filter(p => p.stock <= (p.lowAlert || 5)).length
  const totalValue = products.reduce((s, p) => s + (Number(p.price || 0) * Number(p.stock || 0)), 0)

  const handleAddProduct = async (e) => {
    e.preventDefault()
    try {
      await createProduct({
        ...newProduct,
        price: Number(newProduct.price),
        stock: Number(newProduct.stock),
        gstRate: Number(newProduct.gstRate || 18),
        lowAlert: 5
      })
      toast.success('Product added successfully')
      setIsAddModalOpen(false)
      setNewProduct({ name: '', price: '', stock: '', category: 'General', sku: '', unit: 'Pcs', hsn: '', gstRate: '18' })
    } catch (err) {
      toast.error('Failed to add product: ' + err.message)
    }
  }

  const handleEditProduct = async (e) => {
    e.preventDefault()
    if (!editProduct) return
    try {
      await updateProduct({
        id: editProduct.id,
        data: {
          name: editProduct.name,
          price: Number(editProduct.price),
          stock: Number(editProduct.stock),
          category: editProduct.category,
          sku: editProduct.sku,
          unit: editProduct.unit || 'Pcs',
          hsn: editProduct.hsn || '',
          gstRate: Number(editProduct.gstRate || 18),
          lowAlert: Number(editProduct.lowAlert || 5)
        }
      })
      toast.success('Product updated successfully')
      setIsEditModalOpen(false)
      setEditProduct(null)
    } catch (err) {
      toast.error('Failed to update product: ' + err.message)
    }
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id)
        toast.success('Product deleted')
      } catch (err) {
        toast.error('Failed to delete')
      }
    }
  }

  const openEditModal = (product) => {
    setEditProduct({ ...product })
    setIsEditModalOpen(true)
  }

  return (
    <div className="p-6 space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Inventory</h1>
          <p className="text-sm text-gray-500 mt-1">{products.length} products • Stock value: ₹{totalValue.toLocaleString('en-IN')}</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition-colors">
            <Download size={16} className="text-gray-400" /> Export
          </button>
          <button 
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-100"
          >
            <Plus size={18} /> Add Product
          </button>
        </div>
      </div>

      {lowStockCount > 0 && (
        <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
          <AlertTriangle size={20} className="text-amber-600 shrink-0" />
          <div className="text-sm text-amber-800"><strong>{lowStockCount} items</strong> are below their low stock threshold (5 units)</div>
        </div>
      )}

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="flex items-center gap-4 p-4 border-b border-gray-100 bg-gray-50/50">
          <div className="relative flex-1 max-w-sm">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              value={search} 
              onChange={e => setSearch(e.target.value)} 
              placeholder="Search products..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-100" 
            />
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-100 bg-gray-50/30">
                <th className="text-left py-4 px-5 font-bold uppercase tracking-wider">Product</th>
                <th className="text-left py-4 px-5 font-bold uppercase tracking-wider">SKU</th>
                <th className="text-left py-4 px-5 font-bold uppercase tracking-wider">Category</th>
                <th className="text-right py-4 px-5 font-bold uppercase tracking-wider">Price</th>
                <th className="text-right py-4 px-5 font-bold uppercase tracking-wider">Stock</th>
                <th className="text-right py-4 px-5 font-bold uppercase tracking-wider">Value</th>
                <th className="text-center py-4 px-5 font-bold uppercase tracking-wider w-24">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.map((p, i) => (
                <motion.tr 
                  key={p.id} 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ delay: i * 0.02 }} 
                  className="hover:bg-gray-50/50 transition-colors"
                >
                  <td className="py-4 px-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold shrink-0">
                        {p.name[0]}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-gray-900">{p.name}</div>
                        <div className="text-[11px] text-gray-400">{p.unit || 'Pcs'} • GST {p.gstRate || 18}%</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-sm text-gray-500">{p.sku || '-'}</td>
                  <td className="py-4 px-5">
                    <span className="text-[10px] font-bold uppercase bg-gray-100 text-gray-600 px-2 py-1 rounded-md">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-sm font-bold text-gray-900 text-right">₹{Number(p.price).toLocaleString('en-IN')}</td>
                  <td className="py-4 px-5 text-right">
                    <div className={`text-sm font-bold ${p.stock <= 5 ? 'text-red-600' : 'text-gray-900'}`}>
                      {p.stock}
                    </div>
                    {p.stock <= 5 && <div className="text-[9px] font-bold text-red-500 tracking-wider">LOW STOCK</div>}
                  </td>
                  <td className="py-4 px-5 text-sm font-medium text-gray-600 text-right">
                    ₹{(Number(p.price) * Number(p.stock)).toLocaleString('en-IN')}
                  </td>
                  <td className="py-4 px-5">
                    <div className="flex items-center justify-center gap-1">
                      <button 
                        onClick={() => openEditModal(p)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all cursor-pointer"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDelete(p.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all cursor-pointer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-20 text-center text-gray-400">
                    <Package size={48} className="mx-auto mb-4 opacity-20" />
                    <p className="text-sm font-medium">No products found in inventory</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Product Modal */}
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
                <h2 className="text-lg font-bold text-gray-900">Add New Product</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <form onSubmit={handleAddProduct} className="p-6 space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Product Name</label>
                    <input 
                      required
                      type="text" 
                      value={newProduct.name} 
                      onChange={e => setNewProduct({...newProduct, name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100 focus:border-blue-600 transition-all"
                      placeholder="e.g. Wireless Mouse"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Price (₹)</label>
                      <input 
                        required
                        type="number" 
                        value={newProduct.price} 
                        onChange={e => setNewProduct({...newProduct, price: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Stock Quantity</label>
                      <input 
                        required
                        type="number" 
                        value={newProduct.stock} 
                        onChange={e => setNewProduct({...newProduct, stock: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                      <select 
                        value={newProduct.category} 
                        onChange={e => setNewProduct({...newProduct, category: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                      >
                        <option>General</option>
                        <option>Electronics</option>
                        <option>Clothing</option>
                        <option>Food & Beverage</option>
                        <option>Services</option>
                        <option>Hardware</option>
                        <option>Stationery</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">SKU (Optional)</label>
                      <input 
                        type="text" 
                        value={newProduct.sku} 
                        onChange={e => setNewProduct({...newProduct, sku: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                        placeholder="SKU-123"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Unit</label>
                      <select 
                        value={newProduct.unit} 
                        onChange={e => setNewProduct({...newProduct, unit: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                      >
                        <option>Pcs</option>
                        <option>Kg</option>
                        <option>Litre</option>
                        <option>Box</option>
                        <option>Pack</option>
                        <option>Metre</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">HSN Code</label>
                      <input 
                        type="text" 
                        value={newProduct.hsn} 
                        onChange={e => setNewProduct({...newProduct, hsn: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                        placeholder="HSN"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">GST %</label>
                      <select 
                        value={newProduct.gstRate} 
                        onChange={e => setNewProduct({...newProduct, gstRate: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="0">0%</option>
                        <option value="5">5%</option>
                        <option value="12">12%</option>
                        <option value="18">18%</option>
                        <option value="28">28%</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <Button variant="secondary" fullWidth onClick={() => setIsAddModalOpen(false)}>Cancel</Button>
                  <Button type="submit" fullWidth>Save Product</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Edit Product Modal */}
      <AnimatePresence>
        {isEditModalOpen && editProduct && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
              onClick={() => setIsEditModalOpen(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-bold text-gray-900">Edit Product</h2>
                <button onClick={() => setIsEditModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                  <X size={20} className="text-gray-400" />
                </button>
              </div>
              <form onSubmit={handleEditProduct} className="p-6 space-y-4">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Product Name</label>
                    <input 
                      required
                      type="text" 
                      value={editProduct.name} 
                      onChange={e => setEditProduct({...editProduct, name: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Price (₹)</label>
                      <input 
                        required
                        type="number" 
                        value={editProduct.price} 
                        onChange={e => setEditProduct({...editProduct, price: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Stock Quantity</label>
                      <input 
                        required
                        type="number" 
                        value={editProduct.stock} 
                        onChange={e => setEditProduct({...editProduct, stock: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Category</label>
                      <select 
                        value={editProduct.category} 
                        onChange={e => setEditProduct({...editProduct, category: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                      >
                        <option>General</option>
                        <option>Electronics</option>
                        <option>Clothing</option>
                        <option>Food & Beverage</option>
                        <option>Services</option>
                        <option>Hardware</option>
                        <option>Stationery</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">SKU</label>
                      <input 
                        type="text" 
                        value={editProduct.sku || ''} 
                        onChange={e => setEditProduct({...editProduct, sku: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Unit</label>
                      <select 
                        value={editProduct.unit || 'Pcs'} 
                        onChange={e => setEditProduct({...editProduct, unit: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                      >
                        <option>Pcs</option>
                        <option>Kg</option>
                        <option>Litre</option>
                        <option>Box</option>
                        <option>Pack</option>
                        <option>Metre</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">HSN</label>
                      <input 
                        type="text" 
                        value={editProduct.hsn || ''} 
                        onChange={e => setEditProduct({...editProduct, hsn: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">GST %</label>
                      <select 
                        value={editProduct.gstRate || '18'} 
                        onChange={e => setEditProduct({...editProduct, gstRate: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                      >
                        <option value="0">0%</option>
                        <option value="5">5%</option>
                        <option value="12">12%</option>
                        <option value="18">18%</option>
                        <option value="28">28%</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Low Stock Alert (units)</label>
                    <input 
                      type="number" 
                      value={editProduct.lowAlert || 5} 
                      onChange={e => setEditProduct({...editProduct, lowAlert: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <Button variant="secondary" fullWidth onClick={() => setIsEditModalOpen(false)}>Cancel</Button>
                  <Button type="submit" fullWidth>Update Product</Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
