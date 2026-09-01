// types/auth.types.ts

export interface SignUpData {
  name: string
  email: string
  password: string
}

export interface SignInData {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    name: string
    email: string
  }
}

export interface User {
  id: string
  email: string
}

export interface MeResponse{
  user: User
}