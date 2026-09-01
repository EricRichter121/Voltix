// hooks/useSignUp.ts

import { useState } from 'react'
import { register } from '../api/auth.api'
import type { SignUpData } from '../types/auth.types'

export const useSignUp = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const signUp = async (data: SignUpData) => {
    try {
      setLoading(true)
      setError(null)

      const response = await register(data)

      return response
    } catch (error) {
      setError('Registration failed')
      console.log(error);
      
      throw error
    } finally {
      setLoading(false)
    }
  }

  return {
    signUp,
    loading,
    error,
  }
}