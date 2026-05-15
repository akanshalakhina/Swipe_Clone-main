import { useState } from 'react'
import { Upload } from 'lucide-react'

export default function SettingsPage() {
  const [businessType, setBusinessType] = useState('Retail')

  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-xl font-bold text-gray-900 mb-8">Company Details</h1>

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
              defaultValue="YOUR BUSINESS NAME"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              <span className="text-red-500">*</span>Company Name:
            </label>
            <input 
              type="text" 
              defaultValue="YOUR BUSINESS NAME"
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
                defaultValue="9580760057"
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
              placeholder="Company Email Address"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
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
                defaultValue="NA"
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
              value={businessType}
              onChange={(e) => setBusinessType(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium appearance-none"
            >
              <option>Retail</option>
              <option>Wholesale</option>
              <option>Manufacturing</option>
              <option>Services</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Alternative Contact Number:
            </label>
            <input 
              type="text" 
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
              placeholder="PAN Number"
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>
        </div>

      </div>

      <div className="mt-10 mb-4">
        <button className="bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-lg shadow-sm transition-colors text-sm">
          Save & Update
        </button>
      </div>

    </div>
  )
}
