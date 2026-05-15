import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Check, X, Zap, Crown, Rocket, Building2 } from 'lucide-react'
import Button from '../../components/ui/Button'

const plans = [
  {
    name: 'Free',
    icon: Zap,
    price: { yearly: 0, threeYear: 0 },
    period: 'Forever',
    description: 'Perfect for getting started',
    color: 'border-gray-200',
    buttonVariant: 'outline',
    popular: false,
    features: [
      { name: 'Unlimited invoices', included: true },
      { name: 'GST billing', included: true },
      { name: 'Inventory management', included: true },
      { name: 'Payment tracking', included: true },
      { name: '1 Business', included: true },
      { name: '1 User', included: true },
      { name: 'WhatsApp sharing', included: true },
      { name: 'Basic templates', included: true },
      { name: 'E-invoices', included: false },
      { name: 'E-way bills', included: false },
      { name: 'Priority support', included: false },
      { name: 'Custom branding', included: false },
    ],
  },
  {
    name: 'Basic',
    icon: Crown,
    price: { yearly: 212, threeYear: 142 },
    period: '/month',
    description: 'For growing businesses',
    color: 'border-pro-orange',
    accentBg: 'bg-pro-orange',
    buttonVariant: 'primary',
    popular: true,
    features: [
      { name: 'Unlimited invoices', included: true },
      { name: 'GST billing', included: true },
      { name: 'Inventory management', included: true },
      { name: 'Payment tracking', included: true },
      { name: '3 Businesses', included: true },
      { name: '3 Users', included: true },
      { name: 'WhatsApp sharing', included: true },
      { name: 'Premium templates', included: true },
      { name: 'E-invoices', included: true },
      { name: 'E-way bills', included: true },
      { name: 'Email support', included: true },
      { name: 'Custom branding', included: false },
    ],
  },
  {
    name: 'Jet',
    icon: Rocket,
    price: { yearly: 297, threeYear: 198 },
    period: '/month',
    description: 'For established businesses',
    color: 'border-jet-purple',
    accentBg: 'bg-jet-purple',
    buttonVariant: 'primary',
    popular: false,
    features: [
      { name: 'Unlimited invoices', included: true },
      { name: 'GST billing', included: true },
      { name: 'Inventory management', included: true },
      { name: 'Payment tracking', included: true },
      { name: '10 Businesses', included: true },
      { name: '10 Users', included: true },
      { name: 'WhatsApp sharing', included: true },
      { name: 'All templates', included: true },
      { name: 'E-invoices', included: true },
      { name: 'E-way bills', included: true },
      { name: 'Priority support', included: true },
      { name: 'Custom branding', included: true },
    ],
  },
  {
    name: 'Advanced',
    icon: Building2,
    price: { yearly: null, threeYear: null },
    period: '',
    description: 'For large enterprises',
    color: 'border-gray-300',
    buttonVariant: 'secondary',
    popular: false,
    isCustom: true,
    features: [
      { name: 'Everything in Jet', included: true },
      { name: 'Unlimited businesses', included: true },
      { name: 'Unlimited users', included: true },
      { name: 'API access', included: true },
      { name: 'Dedicated account manager', included: true },
      { name: 'Custom integrations', included: true },
      { name: 'SLA guarantee', included: true },
      { name: 'On-premise option', included: true },
      { name: 'White labeling', included: true },
      { name: 'Training & onboarding', included: true },
      { name: '24/7 phone support', included: true },
      { name: 'Custom development', included: true },
    ],
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState('yearly')

  return (
    <div className="bg-white">
      {/* Header */}
      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
              Simple, transparent pricing
            </h1>
            <p className="text-lg text-gray-500 max-w-xl mx-auto mb-10">
              Start for free. Upgrade when you need more. No hidden fees.
            </p>

            {/* Billing Toggle */}
            <div className="inline-flex items-center bg-gray-100 rounded-xl p-1">
              <button
                onClick={() => setBillingCycle('yearly')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  billingCycle === 'yearly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                1-Year Plans
              </button>
              <button
                onClick={() => setBillingCycle('threeYear')}
                className={`px-5 py-2.5 rounded-lg text-sm font-semibold transition-all cursor-pointer relative ${
                  billingCycle === 'threeYear'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                3-Year Plans
                <span className="absolute -top-2 -right-2 text-[10px] font-bold text-white bg-success px-1.5 py-0.5 rounded-full">
                  Save 33%
                </span>
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-8 lg:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative bg-white rounded-2xl border-2 ${plan.color} p-6 flex flex-col ${
                  plan.popular ? 'shadow-xl ring-1 ring-pro-orange/20' : 'shadow-card hover:shadow-lg'
                } transition-shadow`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-pro-orange text-white text-xs font-bold rounded-full">
                    Most Popular
                  </div>
                )}

                {/* Header */}
                <div className="mb-6">
                  <div className={`w-11 h-11 rounded-xl ${plan.accentBg || 'bg-gray-100'} flex items-center justify-center mb-3`}>
                    <plan.icon size={22} className={plan.accentBg ? 'text-white' : 'text-gray-500'} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
                  <p className="text-sm text-gray-400 mt-1">{plan.description}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  {plan.isCustom ? (
                    <div className="text-3xl font-extrabold text-gray-900">Custom</div>
                  ) : plan.price[billingCycle] === 0 ? (
                    <div className="text-4xl font-extrabold text-gray-900">₹0</div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-extrabold text-gray-900">₹{plan.price[billingCycle]}</span>
                      <span className="text-sm text-gray-400">{plan.period}</span>
                    </div>
                  )}
                  {!plan.isCustom && plan.price[billingCycle] > 0 && (
                    <div className="text-xs text-gray-400 mt-1">
                      Billed {billingCycle === 'yearly' ? 'annually' : 'every 3 years'}
                    </div>
                  )}
                </div>

                {/* CTA */}
                <Link to="/auth/login" className="mb-6">
                  <Button
                    variant={plan.buttonVariant}
                    fullWidth
                    as="motion"
                    className={plan.popular ? 'bg-pro-orange hover:bg-orange-600 border-pro-orange' : ''}
                  >
                    {plan.isCustom ? 'Contact Sales' : plan.price[billingCycle] === 0 ? 'Get Started Free' : 'Start Free Trial'}
                  </Button>
                </Link>

                {/* Features */}
                <div className="space-y-3 flex-1">
                  {plan.features.map((feat) => (
                    <div key={feat.name} className="flex items-center gap-2.5 text-sm">
                      {feat.included ? (
                        <Check size={16} className="text-success shrink-0" />
                      ) : (
                        <X size={16} className="text-gray-300 shrink-0" />
                      )}
                      <span className={feat.included ? 'text-gray-700' : 'text-gray-400'}>
                        {feat.name}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison Table */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">
            Compare all features
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px]">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="text-left py-4 px-4 text-sm font-semibold text-gray-500 w-1/3">Feature</th>
                  {plans.map((p) => (
                    <th key={p.name} className="text-center py-4 px-4 text-sm font-bold text-gray-900">{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  { feature: 'Invoices', values: ['Unlimited', 'Unlimited', 'Unlimited', 'Unlimited'] },
                  { feature: 'Businesses', values: ['1', '3', '10', 'Unlimited'] },
                  { feature: 'Users', values: ['1', '3', '10', 'Unlimited'] },
                  { feature: 'GST Billing', values: [true, true, true, true] },
                  { feature: 'Inventory', values: [true, true, true, true] },
                  { feature: 'Payment Tracking', values: [true, true, true, true] },
                  { feature: 'WhatsApp Sharing', values: [true, true, true, true] },
                  { feature: 'E-Invoices', values: [false, true, true, true] },
                  { feature: 'E-Way Bills', values: [false, true, true, true] },
                  { feature: 'Custom Templates', values: [false, false, true, true] },
                  { feature: 'API Access', values: [false, false, false, true] },
                  { feature: 'Priority Support', values: [false, false, true, true] },
                ].map((row, i) => (
                  <tr key={row.feature} className={`border-b border-gray-50 ${i % 2 === 0 ? 'bg-gray-50/50' : ''}`}>
                    <td className="py-3 px-4 text-sm font-medium text-gray-700">{row.feature}</td>
                    {row.values.map((val, j) => (
                      <td key={j} className="text-center py-3 px-4">
                        {typeof val === 'boolean' ? (
                          val ? <Check size={18} className="text-success mx-auto" /> : <X size={18} className="text-gray-300 mx-auto" />
                        ) : (
                          <span className="text-sm font-medium text-gray-700">{val}</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  )
}
