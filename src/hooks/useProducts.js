import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { productService } from '../services/productService'
import useBusinessStore from '../store/businessStore'

export const useProducts = () => {
  const queryClient = useQueryClient()
  const activeBusiness = useBusinessStore(state => state.activeBusiness)

  const query = useQuery({
    queryKey: ['products', activeBusiness?._id],
    queryFn: () => productService.getProducts(activeBusiness._id),
    enabled: !!activeBusiness?._id,
  })

  const createMutation = useMutation({
    mutationFn: (data) => {
      if (!activeBusiness?._id) throw new Error("No active business found.")
      return productService.createProduct(activeBusiness._id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', activeBusiness?._id] })
    },
  })

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => {
      if (!activeBusiness?._id) throw new Error("No active business found.")
      return productService.updateProduct(activeBusiness._id, id, data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', activeBusiness?._id] })
    },
  })

  const deleteMutation = useMutation({
    mutationFn: (id) => {
      if (!activeBusiness?._id) throw new Error("No active business found.")
      return productService.deleteProduct(activeBusiness._id, id)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products', activeBusiness?._id] })
    },
  })

  return {
    products: query.data || [],
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    createProduct: createMutation.mutateAsync,
    updateProduct: updateMutation.mutateAsync,
    deleteProduct: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  }
}
