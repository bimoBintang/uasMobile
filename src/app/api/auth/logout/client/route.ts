// app/api/logout/client/route.ts (Alternative client-side logout)
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // For client-side logout, we just return success
    // The actual token clearing happens on the client side
    return NextResponse.json(
      { 
        message: 'Logout successful',
        success: true,
        redirect: '/login' // Redirect URL for client
      },
      { status: 200 }
    )

  } catch (error) {
    return NextResponse.json(
      { 
        error: 'Logout failed',
        success: false 
      },
      { status: 500 }
    )
  }
}