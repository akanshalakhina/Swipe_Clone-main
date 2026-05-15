import { motion } from 'framer-motion'

export default function MessageBubble({ message, isLatest }) {
  const isUser = message.role === 'user';
  
  return (
    <motion.div 
      initial={isLatest ? { opacity: 0, y: 10 } : false}
      animate={{ opacity: 1, y: 0 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2F54EB] to-[#722ED1] flex items-center justify-center mr-3 shrink-0 mt-auto mb-1 shadow-sm">
          <img src="https://getswipe.azureedge.net/getswipe/images/logo.svg" alt="S" className="w-4 h-4 object-contain brightness-0 invert" />
        </div>
      )}
      <div className={`max-w-[80%] px-5 py-3 text-[14px] leading-relaxed shadow-sm ${
        isUser 
          ? 'bg-gradient-to-br from-blue-600 to-[#722ED1] text-white rounded-[20px] rounded-br-sm' 
          : 'bg-white text-gray-800 rounded-[20px] rounded-bl-sm border border-gray-100'
      }`}>
        {message.content}
      </div>
    </motion.div>
  )
}
