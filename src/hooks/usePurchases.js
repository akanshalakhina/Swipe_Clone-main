import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { purchaseService } from '../services/purchaseService'
import useBusinessStore from '../store/businessStore'

export const usePurchases = () => {
  const queryClient = useQueryClient()
  const activeBusiness = useBusinessStore(state => state.activeBusiness)

  const query = useQuery({
    queryKey: ['purchases', activeBusiness?._id],
    queryFn: () => purchaseService.getPurchases(activeBusiness._id),
    enabled: !!activeBusiness?._id,
  })

  const createMutation = useMutation({
    mutationFn: (data) => {
      if (!activeBusiness?._id) throw new Error("No active business found.")
      return purchaseService.createPurchase(activeBusiness._id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases', activeBusiness?._id] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => {
      if (!activeBusiness?._id) throw new Error("No active business found.")
      return purchaseService.updatePurchase(activeBusiness._id, id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases', activeBusiness?._id] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      if (!activeBusiness?._id) throw new Error("No active business found.")
      return purchaseService.deletePurchase(activeBusiness._id, id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['purchases', activeBusiness?._id] })
    },
  })

  return {
    purchases: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createPurchase: createMutation.mutateAsync,
    updatePurchase: updateMutation.mutateAsync,
    deletePurchase: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
