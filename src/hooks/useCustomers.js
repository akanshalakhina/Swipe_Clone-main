import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { customerService } from '../services/customerService'
import useBusinessStore from '../store/businessStore'

export const useCustomers = () => {
  const queryClient = useQueryClient()
  const activeBusiness = useBusinessStore(state => state.activeBusiness)

  const query = useQuery({
    queryKey: ['customers', activeBusiness?._id],
    queryFn: () => customerService.getCustomers(activeBusiness._id),
    enabled: !!activeBusiness?._id,
  })

  const createMutation = useMutation({
    mutationFn: (data) => customerService.createCustomer(activeBusiness._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers', activeBusiness?._id] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => customerService.updateCustomer(activeBusiness._id, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers', activeBusiness?._id] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => customerService.deleteCustomer(activeBusiness._id, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customers', activeBusiness?._id] })
    },
  })

  return {
    customers: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createCustomer: createMutation.mutateAsync,
    updateCustomer: updateMutation.mutateAsync,
    deleteCustomer: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
