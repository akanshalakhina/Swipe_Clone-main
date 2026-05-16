import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, ChevronDown, Paperclip, Mic, Smile, Image as ImageIcon, Loader2 } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import { swipeAISearch } from '../../lib/gemini'
import Button from '../ui/Button'
import { toast } from 'react-hot-toast'

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [hasProvidedPhone, setHasProvidedPhone] = useState(() => localStorage.getItem('swipe_user_phone_set') === 'true')
  const [phoneInput, setPhoneInput] = useState('')
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('swipe_chat_messages')
    return saved ? JSON.parse(saved) : [
      { role: 'assistant', content: 'Hello! I am Swipe AI. How can I help you today?' }
    ]
  })

  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showPhonePrompt, setShowPhonePrompt] = useState(false)
  const [pendingMessage, setPendingMessage] = useState(null)

  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const emojiPickerRef = useRef(null)

  const quickReplies = [
    'How to create an invoice?',
    'What is GST?',
    'Show pricing details',
    'How to generate E-way bill?'
  ]

  // Persist messages
  useEffect(() => {
    localStorage.setItem('swipe_chat_messages', JSON.stringify(messages))
  }, [messages])

  // Auto-scroll
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100)
    }
  }, [messages, isTyping, isOpen])

  // Handle outside clicks for emoji picker
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSend = async (e, overrideMsg = null) => {
    e?.preventDefault()
    const msgToSend = overrideMsg || input.trim()
    if (!msgToSend && !selectedFile) return

    // Lead capture check
    if (!hasProvidedPhone) {
      setPendingMessage({ msg: msgToSend, file: selectedFile })
      setShowPhonePrompt(true)
      return
    }

    const userMsg = msgToSend
    const fileToUpload = selectedFile
    
    setInput('')
    setSelectedFile(null)
    setShowEmojiPicker(false)

    const newMessage = { role: 'user', content: userMsg }
    if (fileToUpload) {
      newMessage.file = fileToUpload.name
      newMessage.fileType = fileToUpload.type.startsWith('image/') ? 'image' : 'document'
    }

    setMessages(prev => [...prev, newMessage])
    setIsTyping(true)

    try {
      const response = await swipeAISearch(userMsg)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      console.error("Chat Error:", error)
      toast.error("AI connection lost. Please try again.")
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm having trouble connecting to my brain right now. Please try again in a moment!" }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSetPhone = () => {
    if (phoneInput.trim().length < 10) {
      toast.error("Please enter a valid phone number")
      return
    }

    localStorage.setItem('swipe_user_phone_set', 'true')
    setHasProvidedPhone(true)
    setShowPhonePrompt(false)
    
    setMessages(prev => [
      ...prev, 
      { role: 'assistant', content: `Thanks! We've saved your contact. Now, about your question...` }
    ])

    if (pendingMessage) {
      handleSend(null, pendingMessage.msg)
      setPendingMessage(null)
    }
  }

  const recognitionRef = useRef(null)

  const handleVoiceInput = () => {
    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
      return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      toast.error("Speech recognition is not supported in this browser.")
      return
    }

    try {
      const recognition = new SpeechRecognition()
      recognitionRef.current = recognition
      
      recognition.continuous = false
      recognition.interimResults = true // Enable for better feedback
      recognition.lang = 'en-IN'

      recognition.onstart = () => {
        setIsListening(true)
        toast.success("Listening...", { id: 'voice-status', duration: 2000 })
      }

      recognition.onend = () => {
        setIsListening(false)
        recognitionRef.current = null
      }

      recognition.onerror = (event) => {
        console.error("Speech Error:", event.error)
        setIsListening(false)
        recognitionRef.current = null
        
        if (event.error === 'network') {
          toast.error("Network error: Speech service unreachable. Try using a stable connection.", { id: 'voice-status' })
        } else if (event.error === 'not-allowed') {
          toast.error("Microphone permission denied. Please enable it in browser settings.", { id: 'voice-status' })
        } else {
          toast.error(`Speech error: ${event.error}`, { id: 'voice-status' })
        }
      }

      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map(result => result[0])
          .map(result => result.transcript)
          .join('')
        
        setInput(transcript)
        
        if (event.results[0].isFinal) {
          setTimeout(() => {
            handleSend(null, transcript)
            recognition.stop()
          }, 800)
        }
      }

      recognition.start()
    } catch (err) {
      console.error("Speech Recognition Exception:", err)
      toast.error("Failed to start voice input. Check microphone permissions.")
      setIsListening(false)
    }
  }

  const clearChat = () => {
    if (confirm('Clear chat history?')) {
      setMessages([{ role: 'assistant', content: 'Hello! I am Swipe AI. How can I help you today?' }])
      localStorage.removeItem('swipe_chat_messages')
    }
  }

  return (
    <>
      {/* Floating Launcher */}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-14 h-14 bg-[#0052CC] hover:bg-blue-700 text-white rounded-full shadow-[0_8px_24px_rgba(0,82,204,0.4)] flex items-center justify-center transition-all hover:scale-105 active:scale-95"
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-[90px] right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[380px] h-[600px] max-h-[calc(100vh-120px)] bg-white rounded-[24px] shadow-[0_12px_40px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden z-[9999] border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[#0052CC] px-6 py-6 flex flex-col items-center text-white shrink-0 relative overflow-hidden">
              <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '16px 16px' }}></div>
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10">
                <ChevronDown size={24} />
              </button>
              
              <button onClick={clearChat} className="absolute top-4 left-4 text-white/40 hover:text-white transition-colors text-[9px] font-bold uppercase tracking-widest z-10">
                Clear
              </button>

              <div className="bg-white/10 text-[11px] font-bold px-4 py-1.5 rounded-full mb-6 z-10">
                Swipe AI Support
              </div>
              
              <div className="flex flex-col items-center z-10">
                <div className="relative mb-3">
                  <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center overflow-hidden border-[3px] border-white/20 shadow-lg">
                    <img src="https://getswipe.azureedge.net/getswipe/images/logo.svg" alt="Swipe" className="w-10 h-10 object-contain" />
                  </div>
                  <span className="absolute bottom-0 right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0052CC]"></span>
                </div>
                <h3 className="font-bold text-[20px] leading-tight">Swipe</h3>
                <p className="text-[12px] text-white/70">Online • Replies instantly</p>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 bg-[#F8F9FB]">
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center mr-2 shrink-0 mt-1 shadow-sm border border-gray-100">
                      <img src="https://getswipe.azureedge.net/getswipe/images/logo.svg" alt="S" className="w-4 h-4 object-contain" />
                    </div>
                  )}
                  <div className={`max-w-[85%] px-4 py-3 text-[14px] leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-[#0052CC] text-white rounded-[20px] rounded-tr-[4px]' 
                      : 'bg-white text-gray-800 rounded-[20px] rounded-tl-[4px] border border-gray-100'
                  }`}>
                    {msg.content}
                    {msg.file && (
                      <div className="mt-2 p-2 bg-black/5 rounded flex items-center gap-2 text-[12px]">
                        {msg.fileType === 'image' ? <ImageIcon size={14}/> : <Paperclip size={14}/>}
                        {msg.file}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center mr-2 shrink-0 mt-1 shadow-sm border border-gray-100">
                    <img src="https://getswipe.azureedge.net/getswipe/images/logo.svg" alt="S" className="w-4 h-4 object-contain" />
                  </div>
                  <div className="bg-white rounded-[20px] rounded-tl-[4px] px-4 py-3 shadow-sm border border-gray-100 flex gap-1">
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.2 }} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                    <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5, delay: 0.4 }} className="w-1.5 h-1.5 bg-blue-600 rounded-full" />
                  </div>
                </div>
              )}

              {showPhonePrompt && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-2xl p-6 shadow-xl border border-blue-50 my-2">
                  <h4 className="font-bold text-gray-900 mb-2">One last thing!</h4>
                  <p className="text-[13px] text-gray-600 mb-4">Please leave your phone number so our team can reach out if needed.</p>
                  <div className="flex flex-col gap-2">
                    <input 
                      type="tel" 
                      value={phoneInput}
                      onChange={e => setPhoneInput(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="10-digit phone number"
                      className="w-full text-[14px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0052CC] outline-none transition-all"
                    />
                    <button onClick={handleSetPhone} className="w-full bg-[#0052CC] text-white py-3 rounded-xl font-bold shadow-lg shadow-blue-200">
                      Continue to Chat
                    </button>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Footer */}
            <div className="p-3 bg-white border-t border-gray-100">
              {!showPhonePrompt && !input && !selectedFile && (
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 px-1">
                  {quickReplies.map(reply => (
                    <button
                      key={reply}
                      onClick={() => handleSend(null, reply)}
                      className="whitespace-nowrap px-3 py-1.5 bg-blue-50 text-[#0052CC] text-[12px] font-medium rounded-full border border-blue-100 hover:bg-blue-100 transition-colors"
                    >
                      {reply}
                    </button>
                  ))}
                </div>
              )}

              <form onSubmit={handleSend} className="relative flex items-center bg-[#F3F5F7] rounded-2xl pr-1 pl-2 focus-within:ring-2 focus-within:ring-[#0052CC]/20 transition-all">
                <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Smile size={20} />
                </button>
                
                <input type="file" ref={fileInputRef} onChange={(e) => setSelectedFile(e.target.files[0])} className="hidden" />
                <button type="button" onClick={() => fileInputRef.current.click()} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                  <Paperclip size={20} />
                </button>

                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={isListening ? "Listening..." : "Ask a question..."}
                  className="flex-1 bg-transparent py-3 px-2 text-[14px] outline-none"
                />

                <button 
                  type="button" 
                  onClick={handleVoiceInput}
                  className={`p-2 rounded-full transition-all ${isListening ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-blue-600'}`}
                >
                  {isListening ? <Loader2 size={20} className="animate-spin" /> : <Mic size={20} />}
                </button>

                <button
                  type="submit"
                  disabled={!input.trim() && !selectedFile}
                  className="m-1 p-2.5 bg-[#0052CC] text-white rounded-xl shadow-lg disabled:opacity-0 disabled:scale-90 transition-all"
                >
                  <Send size={18} />
                </button>
              </form>

              {showEmojiPicker && (
                <div ref={emojiPickerRef} className="absolute bottom-20 left-4 z-[10000]">
                  <EmojiPicker onEmojiClick={(e) => setInput(prev => prev + e.emoji)} width={300} height={400} />
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
