import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword, signToken } from '@/lib/auth'

export async function POST(request: Request) {
  try {
    const { username, email, password, phone, role } = await request.json()

    // Validasi input
    if (!username || !email || !password || !phone) {
      return NextResponse.json(
        { error: 'Username, email, password, dan phone wajib diisi' },
        { status: 400 }
      )
    }

    // Cek apakah user sudah ada
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [
          { email },
          { phone }
        ]
      }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: 'Email atau phone sudah terdaftar' },
        { status: 400 }
      )
    }

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Buat user baru
    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        phone,
        role: role || 'CUSTOMER'
      },
      select: {
        id: true,
        username: true,
        email: true,
        phone: true,
        role: true
      }
    })

    // Generate token
    const token = signToken({
      userId: user.id,
      email: user.email,
      role: user.role
    })

    return NextResponse.json({
      message: 'Registrasi berhasil',
      user,
      token
    }, { status: 201 })

  } catch (error) {
    console.error('Register error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan internal server' },
      { status: 500 }
    )
  }
}