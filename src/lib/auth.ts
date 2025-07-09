import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { cookies } from 'next/headers'


const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export interface TokenPayload {
  userId: string
  email: string
  role: 'ADMIN' | 'CUSTOMER'
}

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12)
}

// Verify password
export const verifyPassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword)
}

// Sign JWT token
export const signToken = (payload: TokenPayload): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' })
}

// Verify JWT token
export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, JWT_SECRET) as TokenPayload
}

// Get token from Bearer header (API Request)
export const getTokenFromRequest = (request: Request): string | null => {
  const authHeader = request.headers.get('authorization')
  if (authHeader?.startsWith('Bearer ')) {
    return authHeader.substring(7)
  }
  return null
}

// Get token from cookies (Next.js server function)
export const getTokenFromCookies = async(): Promise<string | null> => {
  const cookieStore = cookies()
  const token = (await cookieStore).get('token')
  return token?.value || null
}

// Clear authentication cookies
export async function clearAuthCookies() {
  const cookieStore = cookies()

  const authCookies = ['token', 'refreshToken', 'session', 'user']

  for (const name of authCookies) {
    (await cookieStore).set(name, '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/'
    })
  }
}
