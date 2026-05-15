import { db } from '../lib/firebase'
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp, writeBatch, increment } from 'firebase/firestore'

export const purchaseService = {
  getPurchases: async (businessId) => {
    const q = query(
      collection(db, `businesses/${businessId}/purchases`),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  getPurchase: async (businessId, purchaseId) => {
    const docRef = doc(db, `businesses/${businessId}/purchases`, purchaseId)
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) throw new Error('Purchase not found')
    return { id: snapshot.id, ...snapshot.data() }
  },

  createPurchase: async (businessId, purchaseData) => {
    const batch = writeBatch(db)

    const payload = {
      ...purchaseData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      purchaseNumber: purchaseData.purchaseNumber || `PUR-${Date.now().toString().slice(-6)}`
    }
    
    const newPurchaseRef = doc(collection(db, `businesses/${businessId}/purchases`))
    batch.set(newPurchaseRef, payload)

    // Increment inventory for each item
    if (purchaseData.items && purchaseData.items.length > 0) {
      for (const item of purchaseData.items) {
        if (item.id) {
          const productRef = doc(db, `businesses/${businessId}/products`, item.id)
          batch.update(productRef, {
            stock: increment(Number(item.quantity || 0))
          })
        }
      }
    }

    await batch.commit()
    return { id: newPurchaseRef.id, ...payload }
  },

  updatePurchase: async (businessId, purchaseId, updateData) => {
    const docRef = doc(db, `businesses/${businessId}/purchases`, purchaseId)
    const payload = {
      ...updateData,
      updatedAt: serverTimestamp()
    }
    await updateDoc(docRef, payload)
    return { id: purchaseId, ...payload }
  },

  deletePurchase: async (businessId, purchaseId) => {
    const docRef = doc(db, `businesses/${businessId}/purchases`, purchaseId)
    await deleteDoc(docRef)
    return purchaseId
  }
}
