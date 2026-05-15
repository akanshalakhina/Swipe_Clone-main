import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

export default function FloatingButton({ isOpen, onClick, showTooltip, onTooltipClose }) {
  return (
    <div className="fixed bottom-6 right-6 z-[55] flex flex-col items-end gap-3">
      <AnimatePresence>
        {showTooltip && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
            className="bg-white p-3 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-gray-100 flex items-start gap-3 cursor-pointer relative mr-1 origin-bottom-right"
            onClick={onClick}
          >
            <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
              <span className="text-lg">👋</span>
            </div>
            <div className="text-[14px] text-gray-800 pr-4">
              <div className="font-bold text-gray-900 mb-0.5">Hi there!</div>
              <div className="text-[13px] text-gray-600 leading-snug">Let us know if you have any questions!</div>
            </div>
            <button 
              onClick={(e) => { e.stopPropagation(); onTooltipClose(); }}
              className="absolute top-2 right-2 w-5 h-5 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={12} />
            </button>
            <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        onClick={onClick}
        className="w-14 h-14 bg-gradient-to-br from-blue-600 to-[#722ED1] hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-[0_8px_24px_rgba(47,84,235,0.4)] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      >
        {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  )
}
