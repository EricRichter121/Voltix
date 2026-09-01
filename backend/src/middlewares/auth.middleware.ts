// Сервер: src/middlewares/auth.middleware.ts

import type {
  Request,
  Response,
  NextFunction,
} from 'express'
import jwt from 'jsonwebtoken'

interface AccessTokenPayload {
  userId: string
}

export function authenticateToken(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log('Cookies:', req.cookies)
  console.log('Access token:', req.cookies.accessToken)

  const token = req.cookies.accessToken

  if (!token) {
    return res.status(401).json({
      message: 'Access token is missing',
    })
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET!,
    ) as AccessTokenPayload

    console.log('JWT payload:', payload)

    if (!payload.userId) {
      return res.status(401).json({
        message: 'Invalid token payload',
      })
    }

    req.auth = {
      userId: payload.userId,
    }

    return next()
  } catch (error) {
    console.error('JWT verification error:', error)

    return res.status(401).json({
      message: 'Invalid or expired access token',
    })
  }
}