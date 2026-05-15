import { create } from 'zustand'
import { db } from '../lib/firebase'
import { collection, query, where, getDocs, addDoc, updateDoc, doc, serverTimestamp, getDoc } from 'firebase/firestore'
import useAuthStore from './authStore'

const useBusinessStore = create((set, get) => ({
  businesses: [],
  activeBusiness: null,
  dashboard: null,
  loading: false,
  error: null,

  fetchBusinesses: async () => {
    const user = useAuthStore.getState().user
    if (!user) return

    set({ loading: true, error: null })
    try {
      const q = query(
        collection(db, 'businesses'),
        where('owner', '==', user.uid)
      )
      // Note: In a real app we'd also query businesses where the user is a member
      const snapshot = await getDocs(q)
      const businesses = snapshot.docs.map(doc => ({ _id: doc.id, ...doc.data() }))
      
      let loadedBusinesses = businesses
      
      if (loadedBusinesses.length === 0) {
        // Auto-create default business
        try {
          const newBizRef = await addDoc(collection(db, 'businesses'), {
            name: user.name ? `${user.name}'s Business` : 'My Business',
            type: 'Retail',
            owner: user.uid,
            members: [{ uid: user.uid, role: 'admin', joinedAt: new Date().toISOString() }],
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp()
          })
          const newBiz = { _id: newBizRef.id, name: user.name ? `${user.name}'s Business` : 'My Business', owner: user.uid }
          loadedBusinesses = [newBiz]
          set({ businesses: loadedBusinesses })
        } catch (e) {
          console.error("Failed to auto-create business", e)
        }
      }
      
      if (loadedBusinesses.length > 0 && !get().activeBusiness) {
        const preferred = loadedBusinesses.find(b => b._id === user.activeBusiness)
        set({ activeBusiness: preferred || loadedBusinesses[0] })
      }

      set({ loading: false })
    } catch (err) {
      set({ loading: false, error: err.message })
    }
  },

  setActiveBusiness: (business) => {
    set({ activeBusiness: business, dashboard: null })
    // Optionally update user's preferred business in Firestore here
  },

  fetchDashboard: async () => {
    const biz = get().activeBusiness
    if (!biz) return

    set({ loading: true, error: null })
    try {
      // Aggregate real data from Firestore subcollections
      const invoicesRef = collection(db, 'businesses', biz._id, 'invoices')
      const invoicesSnap = await getDocs(invoicesRef)
      const invoices = invoicesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }))

      const totalInvoices = invoices.length
      const monthlyRevenue = invoices.reduce((s, i) => s + Number(i.totalAmount || 0), 0)
      const totalReceived = invoices.filter(i => i.status === 'Paid').reduce((s, i) => s + Number(i.totalAmount || 0), 0)
      const totalPending = monthlyRevenue - totalReceived
      
      set({ 
        dashboard: {
          totalInvoices,
          monthlyRevenue,
          totalReceived,
          totalPending,
          recentInvoices: invoices.slice(0, 5)
        }, 
        loading: false 
      })
    } catch (err) {
      set({ loading: false, error: err.message })
    }
  },

  createBusiness: async (businessData) => {
    const user = useAuthStore.getState().user
    if (!user) throw new Error('Not authenticated')

    try {
      const newBizRef = await addDoc(collection(db, 'businesses'), {
        ...businessData,
        owner: user.uid,
        members: [{ uid: user.uid, role: 'admin', joinedAt: new Date().toISOString() }],
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      })
      
      const newBiz = { _id: newBizRef.id, ...businessData, owner: user.uid }
      
      // Update user doc with new business
      const userRef = doc(db, 'users', user.uid)
      const userDoc = await getDoc(userRef)
      if (userDoc.exists()) {
         const currentBusinesses = userDoc.data().businesses || []
         await updateDoc(userRef, {
           businesses: [...currentBusinesses, newBizRef.id],
           activeBusiness: newBizRef.id
         })
      }

      set(state => ({
        businesses: [...state.businesses, newBiz],
        activeBusiness: state.activeBusiness || newBiz,
      }))
      
      return newBiz
    } catch (err) {
      throw err
    }
  },

  updateBusiness: async (id, updates) => {
    try {
      const bizRef = doc(db, 'businesses', id)
      await updateDoc(bizRef, {
        ...updates,
        updatedAt: serverTimestamp()
      })
      
      set(state => ({
        businesses: state.businesses.map(b => b._id === id ? { ...b, ...updates } : b),
        activeBusiness: state.activeBusiness?._id === id ? { ...state.activeBusiness, ...updates } : state.activeBusiness,
      }))
      
      return true
    } catch (err) {
      throw err
    }
  },
}))

export default useBusinessStore
