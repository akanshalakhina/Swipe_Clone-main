import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { Phone, ArrowRight, Shield, AlertCircle } from 'lucide-react'
import Button from '../../components/ui/Button'
import useAuthStore from '../../store/authStore'
import { toast } from 'react-hot-toast'

export default function LoginPage() {
  const [phone, setPhone] = useState('')
  const [countryCode, setCountryCode] = useState('+91')
  const [step, setStep] = useState('phone') // phone | otp
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [authError, setAuthError] = useState(null)
  
  const { sendOtp, verifyOtp, loginWithGoogle, devLogin, isAuthenticated, loading, error, clearError } = useAuthStore()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/app')
    }
  }, [isAuthenticated, navigate])

  useEffect(() => {
    if (error) {
      toast.error(error)
      clearError()
    }
  }, [error, clearError])

  const handleSendOTP = async (e) => {
    e.preventDefault()
    if (phone.length < 10) return
    setAuthError(null)
    
    try {
      await sendOtp(`${countryCode}${phone}`)
      setStep('otp')
      toast.success('OTP sent successfully')
    } catch (err) {
      console.error('Send OTP error:', err.code)
      if (err.code === 'auth/invalid-app-credential' || err.code === 'auth/captcha-check-failed') {
        setAuthError('localhost')
      }
    }
  }

  const handleOTPChange = (index, value) => {
    if (value.length > 1) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`)?.focus()
    }
  }

  const handleVerifyOTP = async (e) => {
    e.preventDefault()
    const otpString = otp.join('')
    if (otpString.length < 6) return
    
    try {
      await verifyOtp(otpString)
      toast.success('Logged in successfully')
    } catch (err) {
      // Error handled by store
    }
  }

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle()
      toast.success('Logged in with Google')
    } catch (err) {
      // Error handled by store
    }
  }

  const handleQuickLogin = () => {
    devLogin(phone || '8882609127')
    toast.success('Logged in successfully!')
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, #2563EB 1px, transparent 0)',
        backgroundSize: '32px 32px'
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
            <div className="mb-8">
              <Link to="/">
                <img src="https://getswipe.azureedge.net/getswipe/images/logo.svg" alt="Swipe Logo" className="h-10 mx-auto" />
              </Link>
            </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {step === 'phone' ? 'Welcome to Swipe' : 'Enter verification code'}
          </h1>
          <p className="text-sm text-gray-500">
            {step === 'phone'
              ? 'Sign in or create an account to get started'
              : `We sent a 6-digit code to ${countryCode} ${phone}`
            }
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          {step === 'phone' ? (
            <>
              {/* Phone Input */}
              <form onSubmit={handleSendOTP}>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Mobile Number
                </label>
                <div className="flex gap-2 mb-4">
                  <select
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                    className="w-24 px-3 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+1">🇺🇸 +1</option>
                    <option value="+44">🇬🇧 +44</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>
                  <div className="relative flex-1">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
                      placeholder="Enter your mobile number"
                      className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                      autoFocus
                    />
                  </div>
                </div>

                {/* reCAPTCHA container */}
                <div id="recaptcha-container" className="mb-4"></div>

                <Button
                  type="submit"
                  as="motion"
                  fullWidth
                  size="lg"
                  loading={loading}
                  disabled={phone.length < 10}
                  icon={ArrowRight}
                  iconPosition="right"
                >
                  Continue with Mobile Number
                </Button>
              </form>

              {/* Localhost auth error - show quick login option */}
              {authError === 'localhost' && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl"
                >
                  <div className="flex gap-2 items-start mb-2">
                    <AlertCircle size={16} className="text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-800">
                      <strong>Phone auth requires Firebase Console setup:</strong> Add <code className="bg-amber-100 px-1 rounded">localhost</code> to 
                      Firebase → Authentication → Settings → Authorized Domains. 
                      For now, use Quick Login below:
                    </div>
                  </div>
                  <button
                    onClick={handleQuickLogin}
                    className="w-full mt-2 py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors"
                  >
                    ✅ Quick Login with {phone || '8882609127'}
                  </button>
                </motion.div>
              )}

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-200" />
                <span className="text-xs text-gray-400 font-medium">OR</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Google Sign In */}
              <Button
                variant="secondary"
                fullWidth
                size="lg"
                as="motion"
                className="border border-gray-200"
                onClick={handleGoogleLogin}
                type="button"
                loading={loading}
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Sign In with Google
              </Button>

              {/* Dev Bypass */}
              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  type="button"
                  onClick={handleQuickLogin}
                  className="w-full py-2 px-4 text-xs font-semibold text-gray-400 hover:text-primary hover:bg-primary/5 rounded-lg transition-all border border-dashed border-gray-200"
                >
                  🛠️ Developer Login (Bypass SMS)
                </button>
              </div>
            </>
          ) : (
            /* OTP Input */
            <form onSubmit={handleVerifyOTP}>
              <div className="flex justify-center gap-3 mb-6">
                {otp.map((digit, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOTPChange(i, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Backspace' && !digit && i > 0) {
                        document.getElementById(`otp-${i - 1}`)?.focus()
                      }
                    }}
                    className="w-12 h-14 text-center text-xl font-bold bg-gray-50 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
                    autoFocus={i === 0}
                  />
                ))}
              </div>

              <Button
                type="submit"
                as="motion"
                fullWidth
                size="lg"
                loading={loading}
                disabled={otp.some(d => !d)}
              >
                Verify & Continue
              </Button>

              <div className="text-center mt-4">
                <button
                  type="button"
                  onClick={() => setStep('phone')}
                  className="text-sm text-primary hover:text-primary-hover font-medium cursor-pointer"
                >
                  ← Change number
                </button>
                <span className="mx-2 text-gray-300">|</span>
                <button
                  type="button"
                  className="text-sm text-gray-500 hover:text-gray-700 font-medium cursor-pointer"
                >
                  Resend OTP
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Trust indicator */}
        <div className="flex items-center justify-center gap-2 mt-6 text-xs text-gray-400">
          <Shield size={14} />
          <span>Your data is encrypted and secure</span>
        </div>

        {/* Trust badges */}
        <div className="text-center mt-4">
          <span className="text-xs text-gray-400">Trusted by <strong className="text-gray-600">20 Lakh+</strong> businesses across India</span>
        </div>
      </motion.div>
    </div>
  )
}
