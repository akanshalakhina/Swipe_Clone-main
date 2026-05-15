import { create } from 'zustand'

const useUIStore = create((set) => ({
  isContactOpen: false,
  setContactOpen: (isOpen) => set({ isContactOpen: isOpen }),
  region: 'IN',
  setRegion: (newRegion) => set({ region: newRegion }),
}))

export default useUIStore
