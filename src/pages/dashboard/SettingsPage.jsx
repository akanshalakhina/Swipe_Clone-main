import { useState, useEffect } from 'react'
import { Upload, Save, CheckCircle } from 'lucide-react'
import useBusinessStore from '../../store/businessStore'
import { toast } from 'react-hot-toast'

export default function SettingsPage() {
  const { activeBusiness, updateBusiness } = useBusinessStore()
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  
  const [form, setForm] = useState({
    brandName: '',
    name: '',
    phone: '',
    email: '',
    gstin: 'NA',
    type: 'Retail',
    altPhone: '',
    website: '',
    pan: '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  })

  // Load existing business data
  useEffect(() => {
    if (activeBusiness) {
      setForm({
        brandName: activeBusiness.brandName || activeBusiness.name || '',
        name: activeBusiness.name || '',
        phone: activeBusiness.phone || '',
        email: activeBusiness.email || '',
        gstin: activeBusiness.gstin || 'NA',
        type: activeBusiness.type || 'Retail',
        altPhone: activeBusiness.altPhone || '',
        website: activeBusiness.website || '',
        pan: activeBusiness.pan || '',
        address: activeBusiness.address || '',
        city: activeBusiness.city || '',
        state: activeBusiness.state || '',
        pincode: activeBusiness.pincode || ''
      })
    }
  }, [activeBusiness])

  const handleSave = async () => {
    if (!activeBusiness?._id) {
      toast.error('No active business to update')
      return
    }

    setSaving(true)
    try {
      await updateBusiness(activeBusiness._id, form)
      toast.success('Company details updated successfully!')
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      toast.error('Failed to save: ' + err.message)
    } finally {
      setSaving(false)
    }
  }

  const updateField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }))
    setSaved(false)
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold text-gray-900">Company Details</h1>
        {saved && (
          <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
            <CheckCircle size={16} /> Saved
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Company Logo:</label>
            <div className="w-32 h-32 border-2 border-dashed border-gray-300 rounded-2xl flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:border-blue-400 transition-colors cursor-pointer bg-white">
              <Upload size={24} className="mb-2 text-gray-400" />
              <span className="text-sm font-semibold text-blue-600">+ Upload</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="text-red-500">*</span>Brand Name:
            </label>
            <input 
              type="text" 
              value={form.brandName}
              onChange={e => updateField('brandName', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="text-red-500">*</span>Company Name:
            </label>
            <input 
              type="text" 
              value={form.name}
              onChange={e => updateField('name', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company Phone:
            </label>
            <div className="flex">
              <select className="border border-r-0 border-gray-300 rounded-l-lg px-3 py-2.5 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium">
                <option>+91</option>
              </select>
              <input 
                type="text" 
                value={form.phone}
                onChange={e => updateField('phone', e.target.value)}
                className="flex-1 border border-gray-300 rounded-r-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Company Email:
            </label>
            <input 
              type="email" 
              value={form.email}
              onChange={e => updateField('email', e.target.value)}
              placeholder="Company Email Address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Address:
            </label>
            <textarea
              value={form.address}
              onChange={e => updateField('address', e.target.value)}
              placeholder="Full business address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium h-20 resize-none"
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">City:</label>
              <input 
                type="text" 
                value={form.city}
                onChange={e => updateField('city', e.target.value)}
                placeholder="City"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">State:</label>
              <input 
                type="text" 
                value={form.state}
                onChange={e => updateField('state', e.target.value)}
                placeholder="State"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Pincode:</label>
              <input 
                type="text" 
                value={form.pincode}
                onChange={e => updateField('pincode', e.target.value)}
                placeholder="Pincode"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              GSTIN:
            </label>
            <div className="flex gap-3">
              <input 
                type="text" 
                value={form.gstin}
                onChange={e => updateField('gstin', e.target.value)}
                className="flex-1 border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium bg-gray-50"
              />
              <button className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold text-sm rounded-lg transition-colors border border-gray-200 whitespace-nowrap">
                Fetch Details
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Business Type:
            </label>
            <select 
              value={form.type}
              onChange={e => updateField('type', e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium appearance-none"
            >
              <option>Retail</option>
              <option>Wholesale</option>
              <option>Manufacturing</option>
              <option>Services</option>
              <option>E-commerce</option>
              <option>Restaurant</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Alternative Contact Number:
            </label>
            <input 
              type="text" 
              value={form.altPhone}
              onChange={e => updateField('altPhone', e.target.value)}
              placeholder="Alternate contact numbers"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Website:
            </label>
            <input 
              type="text" 
              value={form.website}
              onChange={e => updateField('website', e.target.value)}
              placeholder="Website"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              PAN Number:
            </label>
            <input 
              type="text" 
              value={form.pan}
              onChange={e => updateField('pan', e.target.value)}
              placeholder="PAN Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>
        </div>

      </div>

      <div className="mt-10 mb-4">
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-[#2563EB] hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-2.5 px-8 rounded-lg shadow-sm transition-colors text-sm flex items-center gap-2"
        >
          {saving ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save size={16} />
              Save & Update
            </>
          )}
        </button>
      </div>

    </div>
  )
}
