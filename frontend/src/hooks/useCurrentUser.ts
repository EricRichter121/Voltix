// hooks/useCurrentUser.ts

import { useQuery } from '@tanstack/react-query'

async function fetchCurrentUser() {
  const response = await fetch(
    'http://localhost:3000/api/auth/me',
    {
      credentials: 'include',
    }
  )

  if (!response.ok) {
    throw new Error('Not authenticated')
  }

  const data = await response.json()

  return data.user
}

export function useCurrentUser() {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: fetchCurrentUser,
    retry: false,
    // Prevents immediate refetching if the user is not logged in
    staleTime: 5 * 60 * 1000, 
  })
}