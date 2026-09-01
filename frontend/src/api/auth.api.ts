import { api } from './axios'

import type {
  SignUpData,
  SignInData,
  AuthResponse,
  User,
} from '../types/auth.types'

export const register = async (
  data: SignUpData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    '/auth/register',
    data
  )

  return response.data
}

export const login = async (
  data: SignInData
): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>(
    '/auth/login',
    data
  )

  return response.data
}

export const logout = async (): Promise<void> => {
  await api.post('/auth/logout')
  console.log('logout...')
}

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const response = await api.get<{ user: User }>('/auth/me')

    return response.data.user
  } catch (error: any) {
    if (error.response?.status === 401) {
      return null
    }

    throw error
  }
}