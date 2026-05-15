import { db } from '../lib/firebase'
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore'

export const customerService = {
  getCustomers: async (businessId) => {
    const q = query(
      collection(db, `businesses/${businessId}/customers`),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  getCustomer: async (businessId, customerId) => {
    const docRef = doc(db, `businesses/${businessId}/customers`, customerId)
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) throw new Error('Customer not found')
    return { id: snapshot.id, ...snapshot.data() }
  },

  createCustomer: async (businessId, customerData) => {
    const payload = {
      ...customerData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
    const docRef = await addDoc(collection(db, `businesses/${businessId}/customers`), payload)
    return { id: docRef.id, ...payload }
  },

  updateCustomer: async (businessId, customerId, updateData) => {
    const docRef = doc(db, `businesses/${businessId}/customers`, customerId)
    const payload = {
      ...updateData,
      updatedAt: serverTimestamp()
    }
    await updateDoc(docRef, payload)
    return { id: customerId, ...payload }
  },

  deleteCustomer: async (businessId, customerId) => {
    const docRef = doc(db, `businesses/${businessId}/customers`, customerId)
    await deleteDoc(docRef)
    return customerId
  }
}
