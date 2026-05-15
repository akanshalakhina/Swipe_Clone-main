import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function SecuritySection() {
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 })
  const containerRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 })
  }

  // Generate background cipher text
  const [cipherText, setCipherText] = useState('')
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{}|;:,.<>?'
    let text = ''
    for (let i = 0; i < 2000; i++) {
      text += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setCipherText(text)
  }, [])

  return (
    <section 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="py-32 bg-white relative overflow-hidden flex flex-col items-center justify-center min-h-[400px] cursor-default"
    >
      {/* Background Masked Layer (Flashlight) */}
      <div 
        className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(700px circle at ${mousePos.x}px ${mousePos.y}px, rgba(14, 165, 233, 0.65), transparent 40%)`
        }}
      />
      
      <div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{
          maskImage: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent 100%)`,
          WebkitMaskImage: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, black, transparent 100%)`,
        }}
      >
        <motion.div 
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-0 w-[200%] h-full flex items-center whitespace-break-spaces text-cyan-500/30 font-mono text-sm leading-tight font-bold break-all p-4"
        >
          {cipherText}
        </motion.div>
        <motion.div 
          animate={{ x: ['-50%', '0%'] }}
          transition={{ duration: 70, repeat: Infinity, ease: 'linear' }}
          className="absolute top-0 left-0 w-[200%] h-full flex items-center whitespace-break-spaces text-blue-500/20 font-mono text-xs leading-tight font-bold break-all p-4 mix-blend-multiply"
        >
          {cipherText}
        </motion.div>
      </div>

      {/* Foreground Text */}
      <div className="relative z-20 text-center px-4">
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-gray-900 tracking-tight mb-4 flex items-center justify-center gap-3">
          Invisible security. Unbreakable trust. <span>🔒</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 font-medium">
          Your data stays private. Always encrypted.
        </p>
      </div>
    </section>
  )
}
