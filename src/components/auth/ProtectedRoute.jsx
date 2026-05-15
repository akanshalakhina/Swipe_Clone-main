import { Navigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import Loader from '../shared/Loader'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuthStore()

  if (loading) {
    return <Loader />
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}
