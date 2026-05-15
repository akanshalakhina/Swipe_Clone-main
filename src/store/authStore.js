import { create } from 'zustand'
import { auth, db, googleProvider, setupRecaptcha } from '../lib/firebase'
import { signInWithPopup, signInWithPhoneNumber, signOut, onAuthStateChanged } from 'firebase/auth'
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore'

const useAuthStore = create((set, get) => ({
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  confirmationResult: null,

  initAuthListener: () => {
    return onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Fetch custom user profile from Firestore
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid))
        
        let userData = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          phone: firebaseUser.phoneNumber,
          name: firebaseUser.displayName || 'Demo User',
          photoURL: firebaseUser.photoURL,
          businesses: [],
          activeBusiness: null
        }

        if (userDoc.exists()) {
          userData = { ...userData, ...userDoc.data() }
        } else {
          // Create initial user document if it doesn't exist
          await setDoc(doc(db, 'users', firebaseUser.uid), {
            ...userData,
            role: 'owner',
            createdAt: serverTimestamp(),
            lastLogin: serverTimestamp()
          })
        }

        set({ user: userData, isAuthenticated: true, loading: false })
      } else {
        set({ user: null, isAuthenticated: false, loading: false })
      }
    })
  },

  // EMERGENCY BYPASS FOR DEV
  devLogin: async () => {
    set({ loading: true })
    const demoUid = 'demo_user_swipe'
    const userData = {
      uid: demoUid,
      email: 'demo@getswipe.in',
      phone: '+919560760057',
      name: 'Demo Business Owner',
      businesses: [],
      activeBusiness: null
    }

    // Ensure user exists in Firestore
    await setDoc(doc(db, 'users', demoUid), {
      ...userData,
      role: 'owner',
      createdAt: serverTimestamp(),
      lastLogin: serverTimestamp()
    }, { merge: true })

    set({ user: userData, isAuthenticated: true, loading: false })
  },

  loginWithGoogle: async () => {
    set({ loading: true, error: null })
    try {
      const result = await signInWithPopup(auth, googleProvider)
      return result.user
    } catch (err) {
      set({ loading: false, error: err.message })
      throw err
    }
  },

  sendOtp: async (phone, containerId = 'recaptcha-container') => {
    set({ loading: true, error: null })
    try {
      const appVerifier = setupRecaptcha(containerId)
      const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier)
      set({ confirmationResult, loading: false })
      return true
    } catch (err) {
      set({ loading: false, error: err.message })
      throw err
    }
  },

  verifyOtp: async (otp) => {
    set({ loading: true, error: null })
    try {
      const { confirmationResult } = get()
      if (!confirmationResult) throw new Error('No OTP request found')
      
      const result = await confirmationResult.confirm(otp)
      return result.user
    } catch (err) {
      set({ loading: false, error: err.message })
      throw err
    }
  },

  logout: async () => {
    try {
      await signOut(auth)
    } catch (err) {
      set({ error: err.message })
    }
  },

  clearError: () => set({ error: null }),
}))

export default useAuthStore
