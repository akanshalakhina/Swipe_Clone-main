import { db } from '../lib/firebase'
import { collection, doc, getDocs, getDoc, addDoc, updateDoc, deleteDoc, query, orderBy, serverTimestamp } from 'firebase/firestore'

export const productService = {
  getProducts: async (businessId) => {
    const q = query(
      collection(db, `businesses/${businessId}/products`),
      orderBy('createdAt', 'desc')
    )
    const snapshot = await getDocs(q)
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  },

  getProduct: async (businessId, productId) => {
    const docRef = doc(db, `businesses/${businessId}/products`, productId)
    const snapshot = await getDoc(docRef)
    if (!snapshot.exists()) throw new Error('Product not found')
    return { id: snapshot.id, ...snapshot.data() }
  },

  createProduct: async (businessId, productData) => {
    const payload = {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    }
    const docRef = await addDoc(collection(db, `businesses/${businessId}/products`), payload)
    return { id: docRef.id, ...payload }
  },

  updateProduct: async (businessId, productId, updateData) => {
    const docRef = doc(db, `businesses/${businessId}/products`, productId)
    const payload = {
      ...updateData,
      updatedAt: serverTimestamp()
    }
    await updateDoc(docRef, payload)
    return { id: productId, ...payload }
  },

  deleteProduct: async (businessId, productId) => {
    const docRef = doc(db, `businesses/${businessId}/products`, productId)
    await deleteDoc(docRef)
    return productId
  }
}
