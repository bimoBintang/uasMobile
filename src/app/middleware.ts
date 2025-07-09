import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from '@/lib/auth'

export function middleware(request: NextRequest) {
  // Daftar protected routes
  const protectedRoutes = ['/api/orders', '/api/products', '/dashboard']
  const adminRoutes = ['/api/admin', '/admin']

  const isProtectedRoute = protectedRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )
  
  const isAdminRoute = adminRoutes.some(route => 
    request.nextUrl.pathname.startsWith(route)
  )

  if (isProtectedRoute || isAdminRoute) {
    const token = request.headers.get('authorization')?.replace('Bearer ', '')
    
    if (!token) {
      return NextResponse.json(
        { error: 'Token tidak ditemukan' },
        { status: 401 }
      )
    }

    try {
      const payload = verifyToken(token)
      
      // Cek apakah user adalah admin untuk admin routes
      if (isAdminRoute && payload.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'Akses ditolak. Hanya admin yang diizinkan.' },
          { status: 403 }
        )
      }

      // Tambahkan user info ke headers untuk digunakan di API routes
      const response = NextResponse.next()
      response.headers.set('x-user-id', payload.userId)
      response.headers.set('x-user-email', payload.email)
      response.headers.set('x-user-role', payload.role)
      
      return response
    } catch (error) {
      return NextResponse.json(
        { error: 'Token tidak valid' },
        { status: 401 }
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/api/:path*', '/dashboard/:path*', '/admin/:path*']
}