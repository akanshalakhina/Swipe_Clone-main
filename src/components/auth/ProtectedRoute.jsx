import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import useAuthStore from '../../store/authStore'
import useBusinessStore from '../../store/businessStore'
import Loader from '../shared/Loader'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuthStore()
  const { fetchBusinesses, activeBusiness } = useBusinessStore()

  useEffect(() => {
    if (isAuthenticated && !activeBusiness) {
      fetchBusinesses()
    }
  }, [isAuthenticated, activeBusiness, fetchBusinesses])

  if (loading) {
    return <Loader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}
