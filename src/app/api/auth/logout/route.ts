// app/api/logout/route.ts
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export async function POST(request: Request) {
  try {
    // Get cookies
    const cookieStore = cookies()
    
    // Create response
    const response = NextResponse.json(
      { 
        message: 'Logged out successfully',
        success: true 
      },
      { status: 200 }
    )

    // Clear authentication cookies
    // Adjust cookie names based on your authentication implementation
    response.cookies.set('token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0), // Set to past date to expire immediately
      path: '/'
    })

    response.cookies.set('refreshToken', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/'
    })

    // Clear session cookie if using sessions
    response.cookies.set('session', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: new Date(0),
      path: '/'
    })

    // Clear any other auth-related cookies
    response.cookies.set('user', '', {
      expires: new Date(0),
      path: '/'
    })

    return response

  } catch (error) {
    console.error('Logout error:', error)
    return NextResponse.json(
      { 
        error: 'Failed to logout',
        success: false 
      },
      { status: 500 }
    )
  }
}

// Alternative: Support both POST and GET methods
export async function GET(request: Request) {
  return POST(request)
}

