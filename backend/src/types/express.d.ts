import type { User } from '@prisma/client'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

declare global {
  namespace Express {
    interface Request {
      auth?: {
        userId: string
      }
    }
  }
}

export {}