import { Link } from 'react-router-dom'
import { Globe } from 'lucide-react'

const quickLinks = [
  { name: 'Home', href: '/' },
  { name: 'Features', href: '/#features' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Invoice Formats', href: '/invoice-formats' },
  { name: 'Tutorials', href: '/tutorials' },
]

const features = [
  { name: 'E-Invoices', href: '/einvoices' },
  { name: 'E-Way Bills', href: '/ewaybills' },
  { name: 'Swipe AI', href: '/swipeai' },
  { name: 'Online Store', href: '/onlinestore' },
  { name: 'Integrations', href: '/integrations' },
]

const register = [
  { name: 'Get Started', href: '/auth/login' },
  { name: 'Login', href: '/auth/login' },
  { name: 'Contact Us', href: '/contact' },
]

const legal = [
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Refund Policy', href: '/refund' },
  { name: 'Terms of Service', href: '/terms' },
  { name: 'Refer your friends', href: '/refer' },
]

const explore = [
  { name: 'Blog', href: '/blog' },
  { name: 'Join Community 🤝', href: '/community' },
  { name: 'Product Updates', href: '/updates' },
  { name: 'Developers 👨🏼‍💻', href: '/apis' },
  { name: 'Swipe for Startups 🤝', href: '/startups' },
  { name: 'Swipe for Accountants 💼', href: '/accountants' },
]

const socials = [
  { name: 'Instagram', label: 'IG', href: '#' },
  { name: 'YouTube', label: 'YT', href: '#' },
  { name: 'LinkedIn', label: 'in', href: '#' },
  { name: 'Twitter', label: 'X', href: '#' },
  { name: 'Facebook', label: 'fb', href: '#' },
]

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-gray-900 mb-4">{title}</h3>
      <ul className="space-y-2.5">
        {links.map((link) => (
          <li key={link.name}>
            <Link
              to={link.href}
              className="text-sm text-gray-500 hover:text-primary transition-colors"
            >
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-bold text-gray-900">Swipe</span>
            </Link>
            <p className="text-sm text-gray-500 mb-5 max-w-xs">
              Simple and fast GST billing software for small businesses.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-primary hover:text-white transition-all duration-200 text-xs font-bold"
                  aria-label={social.name}
                  title={social.name}
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Quick Links" links={quickLinks} />
          <FooterColumn title="Features" links={features} />
          <FooterColumn title="Register" links={register} />
          <FooterColumn title="Legal" links={legal} />
          <FooterColumn title="Explore" links={explore} />
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Nextspeed Technologies. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">Choose your region:</span>
            <select className="text-xs text-gray-600 bg-white border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/20">
              <option>🇮🇳 India</option>
              <option>🇺🇸 United States</option>
              <option>🇬🇧 United Kingdom</option>
              <option>🇦🇪 UAE</option>
              <option>🇸🇬 Singapore</option>
            </select>
          </div>
        </div>
      </div>
    </footer>
  )
}
