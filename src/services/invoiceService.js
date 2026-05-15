import { db } from '../lib/firebase'
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp, where, writeBatch } from 'firebase/firestore'

export const invoiceService = {
  // Get all invoices for a business
  getInvoices: async (businessId) => {
    const q = query(
      collection(db, `businesses/${businessId}/invoices`),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  // Get a single invoice
  getInvoice: async (businessId, invoiceId) => {
    const docRef = doc(db, `businesses/${businessId}/invoices`, invoiceId)
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) throw new Error('Invoice not found')
    return { id: snapshot.id, ...snapshot.data() }
  },

  // Create an invoice
  createInvoice: async (businessId, invoiceData) => {
    // Generate an invoice number if not provided (mocking auto-increment for now)
    const payload = {
      ...invoiceData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      invoiceNumber: invoiceData.invoiceNumber || `INV-${Date.now().toString().slice(-6)}`
    }
    const docRef = await addDoc(collection(db, `businesses/${businessId}/invoices`), payload)
    return { id: docRef.id, ...payload }
  },

  // Update an invoice
  updateInvoice: async (businessId, invoiceId, updateData) => {
    const docRef = doc(db, `businesses/${businessId}/invoices`, invoiceId)
    const payload = {
      ...updateData,
      updatedAt: serverTimestamp()
    }
    await updateDoc(docRef, payload)
    return { id: invoiceId, ...payload }
  },

  // Delete an invoice
  deleteInvoice: async (businessId, invoiceId) => {
    const docRef = doc(db, `businesses/${businessId}/invoices`, invoiceId)
    await deleteDoc(docRef)
    return invoiceId
  }
}
