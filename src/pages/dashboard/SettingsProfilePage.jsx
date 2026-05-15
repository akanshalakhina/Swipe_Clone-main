import { useState } from 'react'

export default function SettingsProfilePage() {
  return (
    <div className="p-6 max-w-4xl">
      <h1 className="text-xl font-bold text-gray-900 mb-8">User Profile</h1>

      <div className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            <span className="text-red-500">*</span>Full Name:
          </label>
          <input 
            type="text" 
            defaultValue="User"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number:
          </label>
          <input 
            type="text" 
            defaultValue="9560760057"
            disabled
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm font-medium bg-gray-50 text-gray-500 cursor-not-allowed"
          />
          <p className="text-xs text-gray-500 mt-1">Phone number cannot be changed once registered.</p>
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address:
          </label>
          <input 
            type="email" 
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          />
        </div>

        <div className="pt-4 border-t border-gray-100">
          <h3 className="text-sm font-bold text-gray-900 mb-4">Change Password</h3>
          <div className="space-y-4">
            <div>
              <input 
                type="password" 
                placeholder="Current Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
            <div>
              <input 
                type="password" 
                placeholder="New Password"
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              />
            </div>
          </div>
        </div>

      </div>

      <div className="mt-10 mb-4 flex gap-4">
        <button className="bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-2.5 px-8 rounded-lg shadow-sm transition-colors text-sm">
          Save Profile
        </button>
      </div>

    </div>
  )
}
