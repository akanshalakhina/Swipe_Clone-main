import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { invoiceService } from '../services/invoiceService'
import useBusinessStore from '../store/businessStore'

export const useInvoices = () => {
  const queryClient = useQueryClient()
  const activeBusiness = useBusinessStore(state => state.activeBusiness)

  const query = useQuery({
    queryKey: ['invoices', activeBusiness?._id],
    queryFn: () => invoiceService.getInvoices(activeBusiness._id),
    enabled: !!activeBusiness?._id,
  })

  const createMutation = useMutation({
    mutationFn: (data) => invoiceService.createInvoice(activeBusiness._id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices', activeBusiness?._id] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => invoiceService.updateInvoice(activeBusiness._id, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices', activeBusiness?._id] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => invoiceService.deleteInvoice(activeBusiness._id, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['invoices', activeBusiness?._id] })
    },
  })

  return {
    invoices: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createInvoice: createMutation.mutateAsync,
    updateInvoice: updateMutation.mutateAsync,
    deleteInvoice: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
