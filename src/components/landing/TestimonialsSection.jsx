import { motion } from 'framer-motion'

const imageTestimonials = [
  { name: 'Ramu', company: 'Microchip Technologies, Hyderabad', quote: 'Swipe makes creating instant Invoices a breeze. With Swipe, Ab karo business tension-free!', bg: 'https://images.unsplash.com/photo-1556157382-97eda2d62296?auto=format&fit=crop&w=400&q=80' },
  { name: 'Abhishek Dutta', company: 'Ashirvad Entertainment, Kolkata', quote: 'আমার ব্যবসা বৃদ্ধিতে Swipe 30% এর বেশি অবদান রেখেছে', bg: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80' },
  { name: 'Reshma', company: 'MITU Foundation, Bengaluru', quote: 'ನಾನು Swipe ಬಳಸಿ Bills, Catalogs ಮತ್ತು Reports ಅನ್ನು ಸುಲಭವಾಗಿ ರಚಿಸುತ್ತಿದ್ದೇನೆ.', bg: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80' },
  { name: 'Khushboo Baheti', company: 'Label Khushboo Baheti, Hyderabad', quote: 'Inventory Management is super easy with Swipe.', bg: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80' },
  { name: 'Shivank Dalal', company: 'Perfect Group, Delhi', quote: 'मैं अपनी तीनों branches को Swipe पर ही मैनेज करता हूँ।', bg: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80' },
]

const textTestimonialsRow1 = [
  { name: 'Guru', company: 'G1 Clothing, Chennai', quote: 'Swipe made sharing bills easy via WhatsApp.', initial: 'G' },
  { name: 'Saurabh Saraswat', company: 'MediDevice HealthExperts, New Delhi', quote: 'Swipe\'s Real-time Insights leveled up my business. Swipe has the best customer support.', initial: 'S' },
  { name: 'Priya Sudha K', company: 'S Agri Foods, Hyderabad', quote: 'Swipe helped us in streamlining our orders.', initial: 'P' },
  { name: 'Ajay Reddy', company: 'AKR Enterprises, Bangalore', quote: 'I can track all my expenses in one place.', initial: 'A' },
  { name: 'Manoj', company: 'Super Mart, Mumbai', quote: 'Best billing software I have used till date.', initial: 'M' },
]

const textTestimonialsRow2 = [
  { name: 'Gaurav Singh', company: 'Alliance Auto Solutions, Delhi', quote: 'Swipe has completely streamlined my business operations.', initial: 'G' },
  { name: 'Co-founders', company: 'The Randoms Studios, Mumbai', quote: 'With Swipe, everything is much easier now!', initial: 'C' },
  { name: 'Pramod', company: 'Shri Vinayaka Traders, Bengaluru', quote: 'ನನ್ನ ವ್ಯಾಪಾರ ಈ ಮಟ್ಟಕ್ಕೆ ತಲುಪುತ್ತದೆ ಎಂದು ನಾನು ಅಂದುಕೊಂಡಿರಲಿಲ್ಲ', initial: 'P' },
  { name: 'Shekhar Reddy', company: 'Little Life Garments, Hyderabad', quote: 'We are addicted to Swipe and use it across all branches!', initial: 'S' },
  { name: 'Rahul', company: 'Tech Solutions, Pune', quote: 'The e-invoicing feature is a lifesaver.', initial: 'R' },
]

function Marquee({ children, direction = 'left', speed = 40 }) {
  return (
    <div className="relative flex overflow-hidden group">
      <motion.div
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        className="flex gap-4 sm:gap-6 px-2 sm:px-3 whitespace-nowrap min-w-max"
      >
        {children}
        {children}
      </motion.div>
    </div>
  )
}

export default function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-[#FAFAFA] overflow-hidden flex flex-col gap-6">
      
      {/* Row 1: Image Cards */}
      <Marquee direction="left" speed={45}>
        {imageTestimonials.map((item, idx) => (
          <div key={`img-${idx}`} className="relative w-72 h-80 sm:w-80 sm:h-96 rounded-2xl overflow-hidden shrink-0 group-hover:pause group-hover:scale-[1.02] transition-transform duration-300 shadow-sm border border-gray-100">
            <img src={item.bg} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white whitespace-normal">
              <div className="text-xs font-medium text-gray-300 mb-0.5">{item.name}</div>
              <div className="text-[10px] text-gray-400 mb-3">{item.company}</div>
              <p className="text-sm font-semibold leading-snug">{item.quote}</p>
            </div>
          </div>
        ))}
      </Marquee>

      {/* Row 2: Text Cards */}
      <Marquee direction="right" speed={55}>
        {textTestimonialsRow1.map((item, idx) => (
          <div key={`txt1-${idx}`} className="w-[300px] sm:w-[400px] h-36 bg-white rounded-2xl p-5 shrink-0 shadow-sm border border-gray-100 flex flex-col justify-between whitespace-normal group-hover:pause hover:shadow-md transition-shadow">
            <p className="text-sm font-semibold text-gray-800 leading-snug">"{item.quote}"</p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold shrink-0">
                {item.initial}
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">{item.name}</div>
                <div className="text-[10px] text-gray-500">{item.company}</div>
              </div>
            </div>
          </div>
        ))}
      </Marquee>

      {/* Row 3: Text Cards */}
      <Marquee direction="left" speed={50}>
        {textTestimonialsRow2.map((item, idx) => (
          <div key={`txt2-${idx}`} className="w-[300px] sm:w-[400px] h-36 bg-white rounded-2xl p-5 shrink-0 shadow-sm border border-gray-100 flex flex-col justify-between whitespace-normal group-hover:pause hover:shadow-md transition-shadow">
            <p className="text-sm font-semibold text-gray-800 leading-snug">"{item.quote}"</p>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0">
                {item.initial}
              </div>
              <div>
                <div className="text-xs font-bold text-gray-900">{item.name}</div>
                <div className="text-[10px] text-gray-500">{item.company}</div>
              </div>
            </div>
          </div>
        ))}
      </Marquee>

    </section>
  )
}
