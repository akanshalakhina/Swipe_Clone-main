import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const templateImages = [
  { name: 'Vintage', url: 'https://getswipe.azureedge.net/getswipe/images/compressed/templates/temp-2.webp' },
  { name: 'Modern', url: 'https://getswipe.azureedge.net/getswipe/images/compressed/templates/temp-1.webp' },
  { name: 'Service', url: 'https://getswipe.azureedge.net/getswipe/images/compressed/templates/temp-13.webp' },
  { name: 'Evergreen', url: 'https://getswipe.azureedge.net/getswipe/images/compressed/templates/temp-7.webp' },
  { name: 'Legend', url: 'https://getswipe.azureedge.net/getswipe/images/compressed/templates/temp-12.webp' },
  { name: 'Compact', url: 'https://getswipe.azureedge.net/getswipe/images/compressed/templates/temp-10.webp' },
  { name: 'GenZ', url: 'https://getswipe.azureedge.net/getswipe/images/compressed/templates/temp-5.webp' },
]

export default function TemplatesSection() {
  const [selectedTemplate, setSelectedTemplate] = useState(null)

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedTemplate) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => { document.body.style.overflow = 'unset' }
  }, [selectedTemplate])

  return (
    <section className="py-20 lg:py-28 bg-white overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="inline-flex justify-center items-center mb-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-900 flex items-center gap-2">
              Awesome Templates 
              <motion.span
                animate={{ rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                className="inline-block origin-bottom text-4xl lg:text-5xl"
              >
                🤩
              </motion.span>
            </h2>
          </div>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Tailor made, professional, and hand crafted templates for your business to stand out.
          </p>
        </motion.div>

        {/* Template Grid/Carousel */}
        <div className="relative">
          <div className="flex gap-5 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide px-4 sm:px-0">
            {templateImages.map((template, i) => (
              <motion.div
                key={template.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                onClick={() => setSelectedTemplate(template)}
                whileHover={{ scale: 1.05, y: -5 }}
                className="snap-center shrink-0 w-[260px] sm:w-[280px] cursor-pointer group"
                layoutId={`template-container-${template.name}`}
              >
                <div className="relative rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-shadow bg-gray-50 border border-gray-100 p-2">
                  <motion.img 
                    layoutId={`template-img-${template.name}`}
                    src={template.url} 
                    alt={template.name} 
                    className="w-full h-auto object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
                <div className="text-center mt-4">
                  <span className="text-sm font-semibold text-gray-600 group-hover:text-primary transition-colors">
                    {template.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      <AnimatePresence>
        {selectedTemplate && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedTemplate(null)}
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm cursor-pointer"
            />
            <motion.div
              layoutId={`template-container-${selectedTemplate.name}`}
              className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10"
            >
              <button
                onClick={() => setSelectedTemplate(null)}
                className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors z-20 shadow-sm"
              >
                <X size={20} />
              </button>
              
              <div className="p-4 sm:p-8 overflow-y-auto bg-gray-50">
                <motion.img 
                  layoutId={`template-img-${selectedTemplate.name}`}
                  src={selectedTemplate.url} 
                  alt={selectedTemplate.name} 
                  className="w-full h-auto rounded-xl shadow-lg border border-gray-200 mx-auto"
                />
              </div>
              
              <div className="p-4 sm:p-6 bg-white border-t border-gray-100 text-center flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedTemplate.name} Template</h3>
                  <p className="text-sm text-gray-500">Preview of the {selectedTemplate.name.toLowerCase()} design</p>
                </div>
                <button className="px-6 py-2.5 bg-primary text-white font-medium rounded-xl hover:bg-primary-hover transition-colors shadow-sm">
                  Use this Template
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  )
}
