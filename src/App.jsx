import { Suspense, lazy } from 'react'
import { Routes, Route } from 'react-router-dom'
import Loader from './components/shared/Loader'
import LandingLayout from './components/layout/LandingLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import SettingsLayout from './components/layout/SettingsLayout'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AIChatbot from './components/shared/AIChatbot'
import { 
  FileText, FileSignature, Bell, Globe, PackageCheck, 
  Building2, ScanLine, ShoppingBag, PenTool, Zap, Shield, Smartphone 
} from 'lucide-react'

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
const ApiPage = lazy(() => import('./pages/landing/ApiPage'))
const ProductFeaturePage = lazy(() => import('./pages/landing/ProductFeaturePage'))

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
import useUIStore from './store/uiStore'

export default function App() {
  const initAuthListener = useAuthStore(s => s.initAuthListener)
  const initDarkMode = useUIStore(s => s.initDarkMode)

  useEffect(() => {
    initDarkMode()
    const unsubscribe = initAuthListener()
    return () => {
      if (unsubscribe && typeof unsubscribe === 'function') {
        unsubscribe()
      }
    }
  }, [initAuthListener, initDarkMode])

  return (
    <Suspense fallback={<Loader />}>
      <Routes>
        {/* Public - Landing */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/download" element={<DownloadPage />} />
          
          {/* Products - High Fidelity Feature Pages */}
          <Route path="/invoices" element={
            <ProductFeaturePage 
              title="Invoices" 
              iconName="FileText"
              description="Create professional GST invoices in 10 seconds."
              longDescription="Stand out with professional, government-compliant invoices. Our smart automation handles tax calculations, HSN codes, and compliance for you."
              features={[
                { title: "Smart Tax Calc", desc: "Automatic CGST, SGST, and IGST calculations based on place of supply.", icon: Zap, color: "text-amber-500" },
                { title: "WhatsApp Share", desc: "Send invoices directly to your customer's WhatsApp instantly.", icon: Smartphone, color: "text-emerald-500" },
                { title: "Custom Themes", desc: "Choose from multiple templates to match your brand identity.", icon: Shield, color: "text-blue-500" }
              ]}
            />
          } />
          
          <Route path="/quotations" element={
            <ProductFeaturePage 
              title="Quotations" 
              iconName="FileSignature"
              description="Send professional quotations that win business."
              longDescription="Convert your estimates into professional quotations in seconds. Easily track approvals and convert them to invoices with a single tap."
              features={[
                { title: "1-Click Convert", desc: "Convert any quotation into a GST invoice instantly after approval.", icon: Zap, color: "text-amber-500" },
                { title: "Digital Signing", desc: "Add your digital signature to quotations for extra credibility.", icon: PenTool, color: "text-blue-500" },
                { title: "Approval Tracking", desc: "Get notified when your customer views or accepts your estimate.", icon: Bell, color: "text-emerald-500" }
              ]}
            />
          } />

          <Route path="/batch-expiry" element={
            <ProductFeaturePage 
              title="Batch & Expiry" 
              iconName="PackageCheck"
              description="Manage inventory with batch numbers & expiry dates."
              longDescription="Never lose money to expired stock. Swipe helps you track items by batch, manufacturing date, and expiry date automatically."
              features={[
                { title: "Expiry Alerts", desc: "Get notified before items reach their expiration date.", icon: Bell, color: "text-red-500" },
                { title: "FIFO Tracking", desc: "Automatically suggest older batches first to optimize inventory.", icon: PackageCheck, color: "text-blue-500" },
                { title: "Warehouse Sync", desc: "Track batches across multiple locations and warehouses.", icon: Building2, color: "text-emerald-500" }
              ]}
            />
          } />

          <Route path="/branches" element={
            <ProductFeaturePage 
              title="Branches & Warehouses" 
              iconName="Building2"
              description="Manage multiple locations and stock easily."
              longDescription="Grow your business across cities. Manage stock levels, sales, and staff across multiple branches from a single dashboard."
              features={[
                { title: "Stock Transfer", desc: "Move inventory between branches with proper internal documentation.", icon: Globe, color: "text-blue-500" },
                { title: "Branch Reports", desc: "Compare performance between different locations in real-time.", icon: FileText, color: "text-amber-500" },
                { title: "Centralized Control", desc: "Admin control over branch pricing and staff permissions.", icon: Shield, color: "text-emerald-500" }
              ]}
            />
          } />

          {/* Existing specialized pages */}
          <Route path="/einvoice" element={<EInvoicesPage />} />
          <Route path="/ewaybill" element={<EWayBillsPage />} />
          <Route path="/swipeai" element={<SwipeAIPage />} />
          <Route path="/onlinestore" element={<OnlineStorePage />} />
          <Route path="/integrations" element={<IntegrationsPage />} />
          <Route path="/apis" element={<ApiPage />} />
          
          {/* Default fallbacks for other product links */}
          <Route path="/payment-reminders" element={<ProductFeaturePage title="Auto Reminders" description="Get paid faster with payment reminders" iconName="Bell" />} />
          <Route path="/exports" element={<ProductFeaturePage title="Exports" description="Go global with export invoices" iconName="Globe" />} />
          <Route path="/purchase-ai" element={<ProductFeaturePage title="AI Document Scans" description="Upload purchase invoices, POs and more" iconName="ScanLine" />} />
          <Route path="/shopify" element={<ProductFeaturePage title="Shopify" description="Connect your Shopify store" iconName="ShoppingBag" />} />
          <Route path="/digital-signature" element={<ProductFeaturePage title="Digital Signature" description="Digitally sign your invoices in seconds." iconName="PenTool" />} />
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
          <Route path="purchases/new" element={<PurchasesPage />} />
          <Route path="inventory" element={<InventoryPage />} />
          <Route path="inventory/new" element={<InventoryPage />} />
          <Route path="customers" element={<CustomersPage />} />
          <Route path="customers/new" element={<CustomersPage />} />
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
      <AIChatbot />
    </Suspense>
  )
}
