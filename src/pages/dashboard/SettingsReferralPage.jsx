import { Gift, Copy, Share2, CheckCircle2 } from 'lucide-react'
import { useState } from 'react'

export default function SettingsReferralPage() {
  const [copied, setCopied] = useState(false)
  const referralCode = "SWIPE_USER_57"

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="p-6 max-w-4xl">
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-white mb-8 relative overflow-hidden">
        <div className="relative z-10">
          <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4 backdrop-blur-sm">
            <Gift size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold mb-2">Invite Friends & Earn Rewards!</h1>
          <p className="text-blue-100 max-w-md mb-6">
            Get ₹500 added to your Swipe Wallet for every friend who subscribes to a premium plan using your code.
          </p>
          
          <div className="bg-white/10 border border-white/20 rounded-xl p-4 flex items-center justify-between max-w-md backdrop-blur-sm">
            <div>
              <div className="text-blue-100 text-xs font-semibold uppercase tracking-wider mb-1">Your Referral Code</div>
              <div className="text-xl font-bold font-mono tracking-widest">{referralCode}</div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={handleCopy}
                className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
                title="Copy Code"
              >
                {copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
              </button>
              <button 
                className="w-10 h-10 rounded-full bg-white text-blue-600 hover:bg-gray-100 flex items-center justify-center transition-colors"
                title="Share"
              >
                <Share2 size={18} />
              </button>
            </div>
          </div>
        </div>
        
        {/* Background decorative circles */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-24 -right-12 w-48 h-48 bg-blue-400/20 rounded-full blur-2xl pointer-events-none"></div>
      </div>

      <div>
        <h2 className="text-lg font-bold text-gray-900 mb-4">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 border border-gray-200 rounded-xl bg-gray-50/50">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3">1</div>
            <h3 className="font-bold text-gray-900 mb-2">Share your code</h3>
            <p className="text-sm text-gray-600">Send your unique referral code or link to your friends and network.</p>
          </div>
          <div className="p-5 border border-gray-200 rounded-xl bg-gray-50/50">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3">2</div>
            <h3 className="font-bold text-gray-900 mb-2">Friend signs up</h3>
            <p className="text-sm text-gray-600">They create an account and purchase any premium plan.</p>
          </div>
          <div className="p-5 border border-gray-200 rounded-xl bg-gray-50/50">
            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-3">3</div>
            <h3 className="font-bold text-gray-900 mb-2">You get rewarded</h3>
            <p className="text-sm text-gray-600">₹500 is instantly added to your Swipe Wallet. Use it for renewals or SMS credits.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
