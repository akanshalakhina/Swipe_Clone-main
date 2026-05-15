import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { paymentService } from '../services/paymentService'
import useBusinessStore from '../store/businessStore'

export const usePayments = () => {
  const queryClient = useQueryClient()
  const activeBusiness = useBusinessStore(state => state.activeBusiness)

  const query = useQuery({
    queryKey: ['payments', activeBusiness?._id],
    queryFn: () => paymentService.getPayments(activeBusiness._id),
    enabled: !!activeBusiness?._id,
  })

  const createMutation = useMutation({
    mutationFn: (data) => {
      if (!activeBusiness?._id) throw new Error("No active business found.")
      return paymentService.createPayment(activeBusiness._id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', activeBusiness?._id] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => {
      if (!activeBusiness?._id) throw new Error("No active business found.")
      return paymentService.updatePayment(activeBusiness._id, id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', activeBusiness?._id] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      if (!activeBusiness?._id) throw new Error("No active business found.")
      return paymentService.deletePayment(activeBusiness._id, id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['payments', activeBusiness?._id] })
    },
  })

  return {
    payments: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createPayment: createMutation.mutateAsync,
    updatePayment: updateMutation.mutateAsync,
    deletePayment: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
