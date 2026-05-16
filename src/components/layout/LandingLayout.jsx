import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
// ChatBot removed to prevent duplication
import SignupPrompt from '../shared/SignupPrompt'
import ContactModal from '../shared/ContactModal'

export default function LandingLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-18">
        <Outlet />
      </main>
      <Footer />
      {/* Global AIChatbot is handled in App.jsx */}
      <SignupPrompt />
      <ContactModal />
    </div>
  )
}
