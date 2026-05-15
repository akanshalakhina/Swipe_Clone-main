import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, MessageSquare, Zap } from 'lucide-react'
import { swipeAISearch } from '../../lib/gemini'
import FloatingButton from './FloatingButton'
import MessageBubble from './MessageBubble'
import ChatInput from './ChatInput'

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [showTooltip, setShowTooltip] = useState(false)
  const [hasAutomaticallyOpened, setHasAutomaticallyOpened] = useState(false)

  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello, how can we help you?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  useEffect(() => {
    const tooltipTimer = setTimeout(() => {
      if (!hasAutomaticallyOpened) {
        setShowTooltip(true)
      }
    }, 3000)

    return () => clearTimeout(tooltipTimer)
  }, [hasAutomaticallyOpened])

  const handleSend = async (e) => {
    e?.preventDefault()
    if (!input.trim()) return

    const userMsg = input.trim()
    setInput('')
    setMessages(prev => [...prev, { role: 'user', content: userMsg }])
    setIsTyping(true)

    try {
      const response = await swipeAISearch(userMsg)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, our support team is currently busy. Please leave your contact details.' }])
    } finally {
      setIsTyping(false)
    }
  }

  return (
    <>
      <FloatingButton
        isOpen={isOpen}
        onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); setHasAutomaticallyOpened(true); }}
        showTooltip={showTooltip}
        onTooltipClose={() => { setShowTooltip(false); setHasAutomaticallyOpened(true); }}
      />

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[100px] right-6 w-[360px] h-[640px] max-h-[calc(100vh-140px)] bg-[#F8FAFC] rounded-[30px] shadow-2xl flex flex-col z-50 overflow-hidden border border-gray-100"
          >
            {/* Header section with gradient */}
            <div className="bg-gradient-to-br from-[#2F54EB] to-[#722ED1] shrink-0 relative px-6 py-6 rounded-t-[30px]">
              <div className="absolute top-4 right-4 flex gap-3 text-white/80">
                <button className="hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                </button>
                <button className="hover:text-white transition-colors">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                </button>
                <button className="hover:text-white transition-colors">
                  <MessageSquare size={18} />
                </button>
              </div>

              <div className="flex flex-col items-center mt-2">
                <button
                  className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white text-[12px] font-semibold px-4 py-1.5 rounded-full mb-5 transition-all flex items-center gap-2"
                >
                  <MessageSquare size={14} />
                  Message Us
                </button>

                <div className="relative mb-3">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden border-[3px] border-white/20 shadow-lg">
                    <img src="https://getswipe.azureedge.net/getswipe/images/logo.svg" alt="Swipe" className="w-10 h-10 object-contain" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-4 h-4 bg-[#52C41A] rounded-full border-2 border-[#543FE3]"></span>
                </div>

                <div className="flex items-center gap-1 cursor-pointer hover:opacity-80 transition-opacity">
                  <h3 className="font-bold text-[20px] text-white">Swipe</h3>
                  <ChevronDown size={18} className="text-white/80" />
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <MessageBubble key={idx} message={msg} isLatest={idx === messages.length - 1} />
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2F54EB] to-[#722ED1] flex items-center justify-center mr-3 shrink-0 mt-auto shadow-sm">
                    <img src="https://getswipe.azureedge.net/getswipe/images/logo.svg" alt="S" className="w-4 h-4 object-contain brightness-0 invert" />
                  </div>
                  <div className="bg-white border border-gray-100 rounded-[20px] rounded-bl-sm px-5 py-4 shadow-sm flex gap-1.5 items-center">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="pb-2" />
            </div>

            <ChatInput input={input} setInput={setInput} handleSend={handleSend} isTyping={isTyping} />

            <div className="bg-white pt-1 pb-3 text-center flex items-center justify-center gap-1 rounded-b-[30px]">
              <span className="text-[11px] text-gray-400 font-medium">We run on</span>
              <div className="flex items-center text-blue-500 opacity-80">
                <Zap size={10} className="fill-current" />
                <span className="text-[11px] font-bold tracking-wide ml-0.5">Crisp</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
