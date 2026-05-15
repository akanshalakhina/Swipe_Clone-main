export default function PartnersSection() {
  const partners = [
    { name: 'ICICI Bank', color: 'text-orange-600' },
    { name: 'AXIS BANK', color: 'text-rose-700' },
    { name: 'Razorpay', color: 'text-blue-600' },
    { name: 'PhonePe', color: 'text-purple-600' },
    { name: 'Shiprocket', color: 'text-indigo-600' },
    { name: 'eMudhra', color: 'text-green-600' },
    { name: 'PCI', color: 'text-gray-500' },
  ]

  return (
    <section className="pb-20 pt-10 bg-[#FAFAFA] flex flex-col items-center justify-center">
      
      {/* Y Combinator Badge */}
      <div className="flex items-center gap-3 mb-10">
        <span className="text-xl font-bold text-gray-800">Backed by</span>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-[#F26522] rounded flex items-center justify-center">
            <span className="text-white font-bold text-xl leading-none font-serif">Y</span>
          </div>
          <span className="text-xl font-bold text-gray-800 tracking-tight">Combinator</span>
        </div>
      </div>

      {/* Partnered With */}
      <div className="w-full max-w-5xl mx-auto px-4 text-center">
        <div className="text-sm font-semibold text-gray-400 mb-8">Partnered with</div>
        
        <div className="flex flex-wrap justify-center items-center gap-x-12 gap-y-8 grayscale hover:grayscale-0 transition-all duration-500 opacity-60 hover:opacity-100">
          {partners.map((partner) => (
            <div key={partner.name} className={`text-xl font-extrabold ${partner.color} flex items-center gap-1`}>
              {partner.name === 'Razorpay' && <span className="text-2xl -mt-1">⚡</span>}
              {partner.name === 'PhonePe' && <span className="text-2xl">पे</span>}
              {partner.name}
            </div>
          ))}
        </div>
      </div>

    </section>
  )
}
