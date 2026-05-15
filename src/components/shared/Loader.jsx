import { motion } from 'framer-motion'

export default function Loader({ fullScreen = false }) {
  const spinner = (
    <motion.div
      className="flex flex-col items-center gap-3"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="relative w-10 h-10">
        <div className="absolute inset-0 rounded-full border-[3px] border-gray-200" />
        <div className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-primary animate-spin" />
      </div>
      <span className="text-sm text-gray-400 font-medium">Loading...</span>
    </motion.div>
  )

  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        {spinner}
      </div>
    )
  }

  return (
    <div className="flex items-center justify-center py-20">
      {spinner}
    </div>
  )
}
