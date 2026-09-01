import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import { login } from '../api/auth.api'
import type { SignInData } from '../types/auth.types'

export const useSignIn = () => {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: (data: SignInData) => login(data),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['currentUser'],
      })
    },
  })

  return {
    signIn: mutation.mutateAsync,
    loading: mutation.isPending,
    error: mutation.error,
  }
}
