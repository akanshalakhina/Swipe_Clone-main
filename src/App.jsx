import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loader from './components/shared/Loader'
import LandingLayout from './components/layout/LandingLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import SettingsLayout from './components/layout/SettingsLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'

// Landing pages
const HomePage = lazy(() => import('./pages/landing/HomePage'))
const PricingPage = lazy(() => import('./pages/landing/PricingPage'))
const DownloadPage = lazy(() => import('./pages/landing/DownloadPage'))

// Product pages
const EInvoicesPage = lazy(() => import('./pages/landing/EInvoicesPage'))
const EWayBillsPage = lazy(() => import('./pages/landing/EWayBillsPage'))
const SwipeAIPage = lazy(() => import('./pages/landing/SwipeAIPage'))
const OnlineStorePage = lazy(() => import('./pages/landing/OnlineStorePage'))
const IntegrationsPage = lazy(() => import('./pages/landing/IntegrationsPage'))

// Auth
const LoginPage = lazy(() => import('./pages/auth/LoginPage'))

// Dashboard pages
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'))
const InvoicesPage = lazy(() => import('./pages/dashboard/InvoicesPage'))
const PurchasesPage = lazy(() => import('./pages/dashboard/PurchasesPage'))
const CreateInvoicePage = lazy(() => import('./pages/dashboard/CreateInvoicePage'))
const InventoryPage = lazy(() => import('./pages/dashboard/InventoryPage'))
const CustomersPage = lazy(() => import('./pages/dashboard/CustomersPage'))
const PaymentsPage = lazy(() => import('./pages/dashboard/PaymentsPage'))
const ReportsPage = lazy(() => import('./pages/dashboard/ReportsPage'))
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage'))
const SettingsProfilePage = lazy(() => import('./pages/dashboard/SettingsProfilePage'))
const SettingsReferralPage = lazy(() => import('./pages/dashboard/SettingsReferralPage'))
const ComingSoonPage = lazy(() => import('./pages/dashboard/ComingSoonPage'))

import { useEffect } from 'react'
import useAuthStore from './store/authStore'

export default function App() {
  const initAuthListener = useAuthStore(s => s.initAuthListener)

  useEffect(() => {
    const unsubscribe = initAuthListener()
    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe()
      }
    }
  }, [initAuthListener])

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public - Landing */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/download" element={<DownloadPage />} />
          
          {/* Products */}
          <Route path="/einvoices" element={<EInvoicesPage />} />
          <Route path="/ewaybills" element={<EWayBillsPage />} />
          <Route path="/swipeai" element={<SwipeAIPage />} />
          <Route path="/onlinestore" element={<OnlineStorePage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
        </Route>

        {/* Auth */}
        <Route path="/auth/login" element={<LoginPage />} />

        {/* Protected - Dashboard */}
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="invoices" element={<InvoicesPage />} />
          <Route path="purchases" element={<PurchasesPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="payments" element={<PaymentsPage />} />
          <Route path="reports" element={<ReportsPage />} />
          
          {/* Missing Sales sub-items */}
          <Route path="sales/credit-notes" element={<ComingSoonPage title="Credit Notes" />} />
          <Route path="sales/e-invoices" element={<ComingSoonPage title="E-Invoices" />} />
          <Route path="sales/subscriptions" element={<ComingSoonPage title="Subscriptions" />} />
          
          {/* Missing Purchase sub-items */}
          <Route path="purchases/orders" element={<ComingSoonPage title="Purchase Orders" />} />
          <Route path="purchases/debit-notes" element={<ComingSoonPage title="Debit Notes" />} />
          
          {/* Quotations */}
          <Route path="quotations" element={<ComingSoonPage title="Quotations" />} />
          <Route path="quotations/sales-orders" element={<ComingSoonPage title="Sales Orders" />} />
          <Route path="quotations/pro-forma" element={<ComingSoonPage title="Pro Forma Invoices" />} />
          <Route path="quotations/delivery" element={<ComingSoonPage title="Delivery Challans" />} />
          <Route path="quotations/packing" element={<ComingSoonPage title="Packing Lists" />} />
          
          {/* Other modules */}
          <Route path="expenses" element={<ComingSoonPage title="Expenses" />} />
          <Route path="vendors" element={<ComingSoonPage title="Vendors" />} />
          <Route path="projects" element={<ComingSoonPage title="Projects" />} />
          <Route path="insights" element={<ComingSoonPage title="Insights" />} />
          <Route path="onlinestore" element={<ComingSoonPage title="Online Store" />} />
          <Route path="ewaybills" element={<ComingSoonPage title="E-way Bills" />} />
          <Route path="tally-sync" element={<ComingSoonPage title="Tally Sync" />} />
          <Route path="more" element={<ComingSoonPage title="More Features" />} />
          <Route path="invite" element={<ComingSoonPage title="Invite Users" />} />
        </Route>

        <Route
          path="/app/settings"
          element={
            <ProtectedRoute>
              <SettingsLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SettingsPage />} />
          <Route path="profile" element={<SettingsProfilePage />} />
          <Route path="referral" element={<SettingsReferralPage />} />
          {/* Fallbacks for other settings links */}
          <Route path="*" element={<ComingSoonPage title="Settings Module" />} />
        </Route>

        <Route
          path="/app/invoices/new"
          element={
            <ProtectedRoute>
              <CreateInvoicePage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Suspense>
  )
}
