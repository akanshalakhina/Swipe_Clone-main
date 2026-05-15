import { db } from '../lib/firebase'
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore'

export const paymentService = {
  getPayments: async (businessId) => {
    const q = query(
      collection(db, `businesses/${businessId}/payments`),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  getPayment: async (businessId, paymentId) => {
    const docRef = doc(db, `businesses/${businessId}/payments`, paymentId)
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) throw new Error('Payment not found')
    return { id: snapshot.id, ...snapshot.data() }
  },

  createPayment: async (businessId, paymentData) => {
    const payload = {
      ...paymentData,
      createdAt: serverTimestamp(),
    }
    const docRef = await addDoc(collection(db, `businesses/${businessId}/payments`), payload)
    return { id: docRef.id, ...payload }
  },

  updatePayment: async (businessId, paymentId, updateData) => {
    const docRef = doc(db, `businesses/${businessId}/payments`, paymentId)
    const payload = {
      ...updateData,
      updatedAt: serverTimestamp()
    }
    await updateDoc(docRef, payload)
    return { id: paymentId, ...payload }
  },

  deletePayment: async (businessId, paymentId) => {
    const docRef = doc(db, `businesses/${businessId}/payments`, paymentId)
    await deleteDoc(docRef)
    return paymentId
  }
}
