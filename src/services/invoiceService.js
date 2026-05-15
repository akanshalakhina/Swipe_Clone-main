import { db } from '../lib/firebase'
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp, where, writeBatch, increment } from 'firebase/firestore'

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

  // Create an invoice and update inventory
  createInvoice: async (businessId, invoiceData) => {
    const batch = writeBatch(db)
    
    const payload = {
      ...invoiceData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      invoiceNumber: invoiceData.invoiceNumber || `INV-${Date.now().toString().slice(-6)}`
    }
    
    const newInvoiceRef = doc(collection(db, `businesses/${businessId}/invoices`))
    batch.set(newInvoiceRef, payload)

    // Decrement inventory for each item using FieldValue.increment
    if (invoiceData.items && invoiceData.items.length > 0) {
      for (const item of invoiceData.items) {
        if (item.id) {
          const productRef = doc(db, `businesses/${businessId}/products`, item.id)
          batch.update(productRef, {
            stock: increment(-Number(item.quantity || 0))
          })
        }
      }
    }

    await batch.commit()
    return { id: newInvoiceRef.id, ...payload }
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
