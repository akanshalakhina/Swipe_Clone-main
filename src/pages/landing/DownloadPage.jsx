import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Monitor, Smartphone, Apple, Check, Plus, Minus } from 'lucide-react'

const faqs = [
  {
    q: "What can I do with Swipe?",
    a: "Swipe is a simple billing and payments app for Indian businesses. You can create invoices, track sales, manage inventory, send payment links, and much more."
  },
  {
    q: "Is my data safe on Swipe?",
    a: "Yes, your data is 100% safe and secure. We use bank-level 256-bit encryption and auto-backup your data to secure cloud servers."
  },
  {
    q: "Can I add my Company's details and logo on Swipe?",
    a: "Absolutely! You can customize your invoices with your company logo, signature, customized terms & conditions, and bank details."
  },
  {
    q: "Can I use Swipe for Free?",
    a: "Yes, Swipe offers a lifetime free plan for basic invoicing needs. You can upgrade to premium plans for advanced features like E-way bills, multiple users, and inventory."
  },
  {
    q: "Who all can use Swipe?",
    a: "Swipe is designed for all types of SMEs in India including wholesalers, distributors, retailers, service providers, freelancers, and agencies."
  },
  {
    q: "Can I share my invoices or other documents with customer?",
    a: "Yes, you can share invoices, estimates, and receipts directly via WhatsApp, Email, or SMS with a single click."
  },
  {
    q: "Is there any limit on the number of GSTINs I can add on Swipe?",
    a: "No, you can add multiple businesses and GSTINs under a single account depending on your subscription plan."
  },
  {
    q: "Is it possible to add multiple users?",
    a: "Yes, our premium plans allow you to add multiple users such as your CA, accountant, or sales staff."
  },
  {
    q: "Can I control user permission for multiple users?",
    a: "Yes, you can assign roles like Admin, Salesman, or Accountant with specific access permissions."
  },
  {
    q: "Does my data on Swipe web sync to Swipe Mobile App?",
    a: "Yes, Swipe automatically syncs your data in real-time across all your devices (Web, Android, iOS, Windows, Mac)."
  },
  {
    q: "Can I receive payments on Swipe?",
    a: "Yes, you can share payment links and QR codes on your invoices to collect payments via UPI, Credit/Debit cards, and Net Banking."
  },
  {
    q: "Can I send reminders for pending payments on Swipe?",
    a: "Yes, you can send automated or manual payment reminders to your customers via WhatsApp and SMS."
  },
  {
    q: "Can I recover my data if my system crashes?",
    a: "Yes! Since Swipe is cloud-based, your data is continuously backed up. Just log in from any other device to access your data instantly."
  }
]

export default function DownloadPage() {
  const [openFaq, setOpenFaq] = useState(null)

  return (
    <div className="pt-8 pb-24 bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Download Hero Section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Download Swipe App
          </h1>
          <p className="text-lg text-gray-600">
            Available across all platforms. Sync your data seamlessly between your mobile and desktop devices.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {/* Windows */}
          <motion.div whileHover={{ y: -5 }} className="group relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center overflow-hidden min-h-[340px]">
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-all duration-500 z-0">
              <img src="https://getswipe.azureedge.net/getswipe/images/windows.webp" alt="Windows CEO" className="absolute bottom-0 left-0 w-full object-cover opacity-80" />
              <div className="absolute top-4 right-4 bg-purple-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-lg opacity-0 transform translate-x-4 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                Perfect for your device
              </div>
            </div>
            
            <div className="relative z-10 flex flex-col items-center h-full w-full">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:opacity-0 transition-opacity duration-300">
                <Monitor size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-500 mb-2 mt-auto group-hover:mt-0">Windows</h3>
              <p className="text-gray-500 group-hover:text-gray-300 transition-colors duration-500 mb-6 text-sm">Requires Windows 10 or newer.</p>
              
              <button className="w-full mt-auto h-12 flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white rounded-xl transition-colors border border-gray-700">
                <div className="flex gap-0.5">
                  <div className="w-2 h-2 bg-[#F25022]"></div><div className="w-2 h-2 bg-[#7FBA00]"></div>
                </div>
                <div className="flex gap-0.5 mt-[-8px]">
                  <div className="w-2 h-2 bg-[#00A4EF]"></div><div className="w-2 h-2 bg-[#FFB900]"></div>
                </div>
                <div className="text-left leading-none ml-1">
                  <div className="text-[9px] text-gray-300">Get it from</div>
                  <div className="text-sm font-bold">Microsoft</div>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Mac */}
          <motion.div whileHover={{ y: -5 }} className="group relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center overflow-hidden min-h-[340px]">
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-all duration-500 z-0">
              <img src="https://getswipe.azureedge.net/getswipe/images/ios.webp" alt="macOS CEO" className="absolute bottom-0 left-0 w-full object-cover opacity-80" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center h-full w-full">
              <div className="w-16 h-16 bg-gray-100 text-gray-900 rounded-2xl flex items-center justify-center mb-6 group-hover:opacity-0 transition-opacity duration-300">
                <Apple size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-500 mb-2 mt-auto group-hover:mt-0">macOS</h3>
              <p className="text-gray-500 group-hover:text-gray-300 transition-colors duration-500 mb-6 text-sm">Requires macOS 12 or newer.</p>
              
              <button className="w-full mt-auto h-12 flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white rounded-xl transition-colors border border-gray-700">
                <Apple size={20} />
                <div className="text-left leading-none">
                  <div className="text-[9px] text-gray-300">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </button>
            </div>
          </motion.div>

          {/* Android */}
          <motion.div whileHover={{ y: -5 }} className="group relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center overflow-hidden min-h-[340px]">
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-all duration-500 z-0">
              <img src="https://getswipe.azureedge.net/getswipe/images/android.webp" alt="Android CEO" className="absolute bottom-0 left-0 w-full object-cover opacity-80" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center h-full w-full">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:opacity-0 transition-opacity duration-300">
                <Smartphone size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-500 mb-2 mt-auto group-hover:mt-0">Android</h3>
              <p className="text-gray-500 group-hover:text-gray-300 transition-colors duration-500 mb-6 text-sm">Android 7 and newer</p>
              
              <button className="w-full mt-auto h-12 flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white rounded-xl transition-colors border border-gray-700">
                <img src="https://getswipe.azureedge.net/getswipe/images/android.webp" className="w-5 h-5 opacity-0 absolute" /> {/* spacer */}
                <div className="flex gap-1 items-center">
                  <svg className="w-5 h-5 text-emerald-400" viewBox="0 0 24 24" fill="currentColor"><path d="M3.18 23.79c.44.41 1.09.44 1.64.15L21.6 13.51c.55-.29.88-.82.88-1.41 0-.59-.33-1.12-.88-1.41L4.82.26C4.27-.03 3.62 0 3.18.41A1.5 1.5 0 0 0 2.7 1.5v21c0 .45.17.87.48 1.17zM14.54 12l-4.89 5.04V6.96L14.54 12z"/></svg>
                  <div className="text-left leading-none">
                    <div className="text-[9px] text-gray-300 uppercase">Get it on</div>
                    <div className="text-sm font-bold">Google Play</div>
                  </div>
                </div>
              </button>
            </div>
          </motion.div>

          {/* iOS */}
          <motion.div whileHover={{ y: -5 }} className="group relative bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center overflow-hidden min-h-[340px]">
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-100 transition-all duration-500 z-0">
              <img src="https://getswipe.azureedge.net/getswipe/images/ios.webp" alt="iOS CEO" className="absolute bottom-0 left-0 w-full object-cover opacity-80" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center h-full w-full">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:opacity-0 transition-opacity duration-300">
                <Apple size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-white transition-colors duration-500 mb-2 mt-auto group-hover:mt-0">iOS</h3>
              <p className="text-gray-500 group-hover:text-gray-300 transition-colors duration-500 mb-6 text-sm">Requires iOS 15 or newer.</p>
              
              <button className="w-full mt-auto h-12 flex items-center justify-center gap-2 bg-gray-900 hover:bg-black text-white rounded-xl transition-colors border border-gray-700">
                <Apple size={20} />
                <div className="text-left leading-none">
                  <div className="text-[9px] text-gray-300">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </button>
            </div>
          </motion.div>
        </div>

        {/* FAQs Section */}
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">
            Frequently asked questions
          </h2>
          
          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index
              return (
                <div key={index} className="border-b border-gray-200 last:border-0">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : index)}
                    className="w-full py-6 flex items-center justify-between text-left focus:outline-none group"
                  >
                    <div className="flex items-center gap-4">
                      <span className={`text-xl transition-colors duration-200 ${isOpen ? 'text-primary' : 'text-primary group-hover:text-primary-hover'}`}>
                        {isOpen ? <Minus size={20} /> : <Plus size={20} />}
                      </span>
                      <span className={`text-lg font-medium transition-colors duration-200 ${isOpen ? 'text-gray-900' : 'text-gray-700 group-hover:text-gray-900'}`}>
                        {faq.q}
                      </span>
                    </div>
                  </button>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="pb-6 pl-9 text-gray-600 leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

      </div>
    </div>
  )
}
