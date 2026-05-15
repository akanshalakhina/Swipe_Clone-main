import { PlayCircle, Settings, Plus, CheckCircle2 } from 'lucide-react'

// SVG illustration for Purchases Empty State
function PurchaseIllustration() {
  return (
    <svg width="400" height="250" viewBox="0 0 400 250" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto max-w-[400px] mb-8">
      {/* Background Room Outline */}
      <path d="M50 200 L150 100 L350 100 L250 200 Z" stroke="#E5E7EB" strokeWidth="2" fill="#F9FAFB" />
      <path d="M150 100 L150 20 L350 20 L350 100" stroke="#E5E7EB" strokeWidth="2" />
      <path d="M50 200 L50 120 L150 20" stroke="#E5E7EB" strokeWidth="2" />
      
      {/* Desk */}
      <rect x="80" y="140" width="100" height="10" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
      <rect x="90" y="150" width="10" height="50" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
      <rect x="160" y="150" width="10" height="50" fill="#D1D5DB" stroke="#9CA3AF" strokeWidth="2" />
      
      {/* Laptop */}
      <path d="M100 140 L130 140 L120 110 L90 110 Z" fill="#9CA3AF" stroke="#6B7280" strokeWidth="2" />
      
      {/* Character 1 (Store Owner throwing airplane) */}
      <circle cx="150" cy="100" r="15" fill="#1F2937" />
      <path d="M135 115 Q150 130 165 115 L160 160 L140 160 Z" fill="#374151" />
      <path d="M150 115 L170 100" stroke="#374151" strokeWidth="4" strokeLinecap="round" />
      
      {/* Paper Airplane */}
      <path d="M175 95 L200 80 L195 100 Z" fill="#60A5FA" />
      <path d="M175 95 L190 95 L200 80" fill="#3B82F6" />
      <path d="M165 105 Q175 105 180 95" stroke="#93C5FD" strokeWidth="2" strokeDasharray="2 2" fill="none" />
      
      {/* Large Window */}
      <rect x="220" y="40" width="100" height="80" fill="#EEF2FF" stroke="#9CA3AF" strokeWidth="2" />
      <line x1="270" y1="40" x2="270" y2="120" stroke="#9CA3AF" strokeWidth="2" />
      <line x1="220" y1="80" x2="320" y2="80" stroke="#9CA3AF" strokeWidth="2" />
      
      {/* Character 2 (Customer) */}
      <circle cx="280" cy="130" r="15" fill="#4B5563" />
      <path d="M265 145 Q280 160 295 145 L290 200 L270 200 Z" fill="#6B7280" />
      <path d="M280 145 L260 155 L255 145" stroke="#6B7280" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="250" y="140" width="10" height="15" rx="2" fill="#9CA3AF" />
      
    </svg>
  )
}

export default function PurchasesPage() {
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
      <div className="flex items-center justify-between mb-8 sm:mb-16">
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
          <button className="bg-[#2563EB] hover:bg-blue-700 text-white text-[13px] font-semibold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors cursor-pointer">
            <Plus size={16} /> Create Purchase
          </button>
        </div>
      </div>

      {/* Empty State */}
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

            <button className="w-full max-w-[320px] bg-[#2563EB] hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors mb-6 cursor-pointer">
              <Plus size={18} /> Record your purchases
            </button>

            <div className="flex flex-wrap items-center gap-6 text-[12px] font-medium text-gray-500">
              <button className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
                🎧 Talk to a specialist
              </button>
              <button className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
                <span className="text-green-500 text-base">💬</span> +91 812 133 5435
              </button>
              <button className="flex items-center gap-2 hover:text-gray-900 cursor-pointer">
                ▶️ Watch how it works
              </button>
            </div>
          </div>

        </div>
      </div>

    </div>
  )
}
