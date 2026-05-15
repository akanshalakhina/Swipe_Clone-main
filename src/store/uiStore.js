import { create } from 'zustand'

const getInitialTheme = () => {
  if (typeof window !== 'undefined' && window.localStorage) {
    const storedPrefs = window.localStorage.getItem('color-theme')
    if (typeof storedPrefs === 'string') {
      return storedPrefs === 'dark'
    }
    const userMedia = window.matchMedia('(prefers-color-scheme: dark)')
    if (userMedia.matches) {
      return true
    }
  }
  return false
}

const useUIStore = create((set) => ({
  isContactOpen: false,
  setContactOpen: (isOpen) => set({ isContactOpen: isOpen }),
  region: 'IN',
  setRegion: (newRegion) => set({ region: newRegion }),
  isDarkMode: getInitialTheme(),
  toggleDarkMode: () => set((state) => {
    const newDarkMode = !state.isDarkMode
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
      window.localStorage.setItem('color-theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      window.localStorage.setItem('color-theme', 'light')
    }
    return { isDarkMode: newDarkMode }
  }),
  initDarkMode: () => {
    if (getInitialTheme()) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }
}))

export default useUIStore
