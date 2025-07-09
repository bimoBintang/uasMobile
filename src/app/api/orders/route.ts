import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request | NextRequest) {
  try {
    // Ambil user info dari headers yang di-set oleh middleware
    const userId = request.headers.get('x-user-id')
    const userRole = request.headers.get('x-user-role')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Jika user adalah CUSTOMER, hanya tampilkan order miliknya
    // Jika user adalah ADMIN, tampilkan semua order
    const orders = await prisma.order.findMany({
      where: userRole === 'ADMIN' ? {} : { userId },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        },
        produk: {
          select: {
            id: true,
            nama: true,
            price: true
          }
        },
        detailOrder: true
      },
      orderBy: {
        tanggal: 'desc'
      }
    })

    return NextResponse.json({ orders })

  } catch (error) {
    console.error('Get orders error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan internal server' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request | NextRequest) {
  try {
    const userId = request.headers.get('x-user-id')
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { alamat, ongkir, produkId } = await request.json()

    if (!alamat || !ongkir || !produkId) {
      return NextResponse.json(
        { error: 'Alamat, ongkir, dan produkId wajib diisi' },
        { status: 400 }
      )
    }

    // Cek apakah produk ada
    const produk = await prisma.produk.findUnique({
      where: { id: produkId }
    })

    if (!produk) {
      return NextResponse.json(
        { error: 'Produk tidak ditemukan' },
        { status: 404 }
      )
    }

    // Buat order baru
    const order = await prisma.order.create({
      data: {
        alamat,
        ongkir,
        userId,
        produkId
      },
      include: {
        user: {
          select: {
            id: true,
            username: true,
            email: true
          }
        },
        produk: {
          select: {
            id: true,
            nama: true,
            price: true
          }
        }
      }
    })

    return NextResponse.json({
      message: 'Order berhasil dibuat',
      order
    }, { status: 201 })

  } catch (error) {
    console.error('Create order error:', error)
    return NextResponse.json(
      { error: 'Terjadi kesalahan internal server' },
      { status: 500 }
    )
  }
}