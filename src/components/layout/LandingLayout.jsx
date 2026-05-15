import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ChatBot from '../shared/ChatBot'
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
      <ChatBot />
      <SignupPrompt />
      <ContactModal />
    </div>
  )
}
