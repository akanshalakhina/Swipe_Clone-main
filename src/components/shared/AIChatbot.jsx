import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X, Send, ChevronDown, Paperclip, Mic, Smile, Image as ImageIcon } from 'lucide-react'
import EmojiPicker from 'emoji-picker-react'
import { swipeAISearch } from '../../lib/gemini'
import Button from '../ui/Button'

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showDemoModal, setShowDemoModal] = useState(false)
  const [hasProvidedPhone, setHasProvidedPhone] = useState(false)
  const [phoneInput, setPhoneInput] = useState('')

  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hello, how can we help you?' }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [selectedFile, setSelectedFile] = useState(null)
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)
  const emojiPickerRef = useRef(null)

  const [showTooltip, setShowTooltip] = useState(false)
  const [hasAutomaticallyOpened, setHasAutomaticallyOpened] = useState(false)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    const timeoutId = setTimeout(scrollToBottom, 50)
    return () => clearTimeout(timeoutId)
  }, [messages, isTyping, hasProvidedPhone, selectedFile])

  useEffect(() => {
    const demoTimer = setTimeout(() => {
      setShowDemoModal(true)
    }, 15000)
    
    const tooltipTimer = setTimeout(() => {
      if (!hasAutomaticallyOpened) {
        setShowTooltip(true)
      }
    }, 3000)

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isOpen) setIsOpen(false)
        if (showDemoModal) setShowDemoModal(false)
      }
    }

    const handleClickOutsideEmoji = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutsideEmoji)

    return () => {
      clearTimeout(demoTimer)
      clearTimeout(tooltipTimer)
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutsideEmoji)
    }
  }, [hasAutomaticallyOpened, isOpen, showDemoModal])

  const handleSend = async (e) => {
    e?.preventDefault()
    if ((!input.trim() && !selectedFile) || !hasProvidedPhone) return

    const userMsg = input.trim()
    const fileToUpload = selectedFile
    
    setInput('')
    setSelectedFile(null)
    setShowEmojiPicker(false)

    const newMessage = { role: 'user', content: userMsg }
    
    if (fileToUpload) {
      if (fileToUpload.type.startsWith('image/')) {
        newMessage.file = URL.createObjectURL(fileToUpload)
        newMessage.fileType = 'image'
      } else {
        newMessage.file = fileToUpload.name
        newMessage.fileType = 'document'
      }
    }

    setMessages(prev => [...prev, newMessage])
    setIsTyping(true)

    try {
      let aiQuery = userMsg || (fileToUpload ? "I sent a file." : "");
      if (fileToUpload && fileToUpload.textContent) {
        aiQuery += `\n\n[User attached a file named ${fileToUpload.name} with content:\n${fileToUpload.textContent}]`;
      }
      const response = await swipeAISearch(aiQuery)
      setMessages(prev => [...prev, { role: 'assistant', content: response }])
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Sorry, our support team is currently busy. We will get back to you soon on your phone number!' }])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSetPhone = () => {
    if (phoneInput.trim().length >= 10) {
      setHasProvidedPhone(true)
      setMessages(prev => [
        ...prev, 
        { role: 'user', content: phoneInput }, 
        { role: 'assistant', content: 'Thanks! A representative will connect with you shortly. How can we help you in the meantime?' }
      ])
    }
  }

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert("Your browser doesn't support speech recognition.")
      return
    }
    
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = false
    recognition.interimResults = false
    
    recognition.onstart = () => {
      setIsListening(true)
    }
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript
      setInput(prev => prev + (prev ? ' ' : '') + transcript)
      setIsListening(false)
    }
    
    recognition.onerror = (event) => {
      console.error("Speech recognition error", event.error)
      setIsListening(false)
    }
    
    recognition.onend = () => {
      setIsListening(false)
    }
    
    recognition.start()
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files[0]
    if (file) {
      // If it's a readable text file, extract the content so AI can use it
      if (file.type.startsWith('text/') || file.name.match(/\.(txt|json|csv|md|js|jsx)$/i)) {
        try {
          const text = await file.text()
          file.textContent = text.slice(0, 5000) // Limit size to prevent token limits
        } catch (err) {
          console.error("Could not read file text", err)
        }
      }
      setSelectedFile(file)
    }
    // Clear input so selecting same file again works
    e.target.value = ''
  }

  const onEmojiClick = (emojiObject) => {
    setInput(prev => prev + emojiObject.emoji)
  }

  return (
    <>
      {/* Demo Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm"
              onClick={() => setShowDemoModal(false)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Need more help?</h2>
              <p className="text-gray-600 mb-8">Book a FREE demo. Our team is here to assist. Contact us now.</p>
              <div className="flex gap-4">
                <Button variant="outline" fullWidth onClick={() => setShowDemoModal(false)}>Close</Button>
                <Button fullWidth onClick={() => { setShowDemoModal(false); setIsOpen(true); setShowTooltip(false); }}>Contact Us</Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating Button Container */}
      <div className="fixed bottom-6 right-6 z-[55] flex flex-col items-end gap-3">
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
              className="bg-white p-3 rounded-2xl shadow-[0_8px_24px_rgba(0,0,0,0.12)] border border-gray-100 flex items-start gap-3 cursor-pointer relative mr-1 origin-bottom-right"
              onClick={() => { setShowTooltip(false); setIsOpen(true); setHasAutomaticallyOpened(true); }}
            >
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <span className="text-lg">👋</span>
              </div>
              <div className="text-[14px] text-gray-800 pr-4">
                <div className="font-bold text-gray-900 mb-0.5">Hi there!</div>
                <div className="text-[13px] text-gray-600 leading-snug">Let us know if you have any questions!</div>
              </div>
              <button 
                onClick={(e) => { e.stopPropagation(); setShowTooltip(false); setHasAutomaticallyOpened(true); }}
                className="absolute top-2 right-2 w-5 h-5 bg-gray-50 hover:bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={12} />
              </button>
              {/* Pointer triangle */}
              <div className="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-gray-100 transform rotate-45"></div>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); setHasAutomaticallyOpened(true); }}
          className="w-14 h-14 bg-[#0052CC] hover:bg-blue-700 text-white rounded-full shadow-[0_8px_24px_rgba(0,82,204,0.4)] flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
        >
          {isOpen ? <X size={28} /> : <MessageCircle size={28} />}
        </button>
      </div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-[90px] right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[380px] h-[600px] max-h-[calc(100vh-120px)] bg-[#F5F5F5] rounded-[24px] shadow-2xl flex flex-col overflow-hidden z-50 border border-gray-100"
          >
            {/* Header */}
            <div className="bg-[#0052CC] px-5 py-5 flex flex-col items-center text-white shrink-0 relative overflow-hidden" style={{ backgroundImage: 'radial-gradient(circle at 10px 10px, rgba(255,255,255,0.05) 2px, transparent 0)', backgroundSize: '24px 24px' }}>
              <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
                <ChevronDown size={24} />
              </button>
              
              <div className="bg-white/20 hover:bg-white/30 backdrop-blur-sm text-[12px] font-semibold px-3 py-1 rounded-full mb-4 transition-colors cursor-pointer">
                Message Us
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center overflow-hidden border-[3px] border-[#0052CC] shadow-[0_0_0_2px_rgba(255,255,255,0.2)] mb-2">
                  <img src="https://getswipe.azureedge.net/getswipe/images/logo.svg" alt="Swipe" className="w-8 h-8 object-contain" />
                </div>
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-[18px] leading-tight tracking-tight">Swipe</h3>
                  <span className="w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0052CC]"></span>
                </div>
              </div>
            </div>

            {/* Notification Bar */}
            {!hasProvidedPhone && (
              <div className="bg-[#FFF9C4] text-[#856404] px-4 py-2.5 text-[13px] font-medium flex items-center gap-2 border-b border-yellow-200 shrink-0">
                <span>🔔</span> Please set your phone to continue.
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
              <div className="text-center">
                <span className="text-[11px] font-medium text-gray-400 uppercase tracking-wider">{new Date().toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
              </div>
              
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center mr-2 shrink-0 mt-1 shadow-sm">
                      <img src="https://getswipe.azureedge.net/getswipe/images/logo.svg" alt="S" className="w-4 h-4 object-contain" />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-4 py-2.5 text-[14px] leading-relaxed shadow-sm flex flex-col gap-2 ${
                    msg.role === 'user' 
                      ? 'bg-[#0052CC] text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-white text-gray-800 rounded-2xl rounded-tl-sm border border-gray-100'
                  }`}>
                    {msg.file && msg.fileType === 'image' && (
                      <img src={msg.file} alt="uploaded" className="max-w-full rounded-lg max-h-48 object-cover" />
                    )}
                    {msg.file && msg.fileType === 'document' && (
                      <div className={`flex items-center gap-2 p-2 rounded ${msg.role === 'user' ? 'bg-white/20' : 'bg-gray-100'}`}>
                        <Paperclip size={16} />
                        <span className="text-xs truncate">{msg.file}</span>
                      </div>
                    )}
                    {msg.content && <span>{msg.content}</span>}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center mr-2 shrink-0 mt-1 shadow-sm">
                    <img src="https://getswipe.azureedge.net/getswipe/images/logo.svg" alt="S" className="w-4 h-4 object-contain" />
                  </div>
                  <div className="bg-white rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm flex gap-1 items-center h-[40px]">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} className="pb-2" />
            </div>

            {/* Input Area / Lead Capture Card */}
            {!hasProvidedPhone ? (
              <div className="bg-white rounded-t-2xl shadow-[0_-4px_24px_rgba(0,0,0,0.06)] p-5 pb-6 shrink-0 relative z-10 border-t border-gray-100">
                <div className="text-[16px] font-bold text-gray-900 mb-4 leading-tight">What is your phone number?</div>
                <div className="flex flex-col gap-3">
                  <input 
                    type="tel" 
                    value={phoneInput}
                    onChange={e => setPhoneInput(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && handleSetPhone()}
                    placeholder="Enter your phone number..." 
                    className="w-full text-[14px] px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#0052CC] focus:outline-none transition-shadow text-gray-800"
                  />
                  <button 
                    onClick={handleSetPhone}
                    disabled={phoneInput.trim().length < 10}
                    className="w-full bg-[#0052CC] text-white text-[15px] font-semibold py-3 rounded-xl hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-[#0052CC] transition-colors shadow-sm"
                  >
                    Set my phone
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border-t border-gray-100 shrink-0 relative z-20">
                {selectedFile && (
                  <div className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-[13px] text-gray-700 overflow-hidden">
                      {selectedFile.type.startsWith('image/') ? <ImageIcon size={16} className="text-[#0052CC] shrink-0" /> : <Paperclip size={16} className="text-[#0052CC] shrink-0" />}
                      <span className="truncate">{selectedFile.name}</span>
                    </div>
                    <button onClick={() => setSelectedFile(null)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                      <X size={14} />
                    </button>
                  </div>
                )}
                <form onSubmit={handleSend} className="p-3">
                  {showEmojiPicker && (
                    <div ref={emojiPickerRef} className="absolute bottom-[70px] left-3 z-[60] shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
                      <EmojiPicker onEmojiClick={onEmojiClick} width={300} height={350} searchDisabled />
                    </div>
                  )}
                  <div className="relative flex items-center bg-gray-50 border border-gray-200 rounded-full pr-1 pl-2 transition-all focus-within:border-[#0052CC] focus-within:ring-1 focus-within:ring-[#0052CC]">
                    
                    <button type="button" onClick={() => setShowEmojiPicker(!showEmojiPicker)} className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-200 shrink-0">
                      <Smile size={18} />
                    </button>
                    
                    <input type="file" ref={fileInputRef} onChange={handleFileSelect} className="hidden" />
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-200 shrink-0">
                      <Paperclip size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={handleVoiceInput}
                      className={`p-2 rounded-full transition-colors shrink-0 flex items-center justify-center ${isListening ? 'bg-red-500 text-white animate-pulse' : 'text-gray-400 hover:text-gray-600 hover:bg-gray-200'}`}
                    >
                      <Mic size={18} />
                    </button>

                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Write a message..."
                      className="flex-1 bg-transparent border-none focus:outline-none py-3 px-2 text-[14px] text-gray-900 min-w-0"
                    />
                    
                    <button
                      type="submit"
                      disabled={isTyping || (!input.trim() && !selectedFile)}
                      className="m-1 p-2 bg-[#0052CC] hover:bg-blue-700 text-white rounded-full disabled:opacity-50 disabled:hover:bg-[#0052CC] transition-colors shrink-0 flex items-center justify-center w-8 h-8"
                    >
                      <Send size={14} className="ml-0.5" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
