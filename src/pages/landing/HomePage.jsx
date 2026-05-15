import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import HeroSection from '../../components/landing/HeroSection'
import TemplatesSection from '../../components/landing/TemplatesSection'
import FeaturesSection from '../../components/landing/FeaturesSection'
import ConvenienceSection from '../../components/landing/ConvenienceSection'
import SecuritySection from '../../components/landing/SecuritySection'
import TestimonialsSection from '../../components/landing/TestimonialsSection'
import PartnersSection from '../../components/landing/PartnersSection'
import CTASection from '../../components/landing/CTASection'
import TrustBanner from '../../components/landing/TrustBanner'

export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <TrustBanner />
      <TemplatesSection />
      <div id="features">
        <FeaturesSection />
      </div>
      <ConvenienceSection />
      <SecuritySection />
      <TestimonialsSection />
      <PartnersSection />
      <CTASection />
    </div>
  )
}
