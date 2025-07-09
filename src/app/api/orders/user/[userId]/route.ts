import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  { params }: { params: { userId: string } }
) {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: params.userId },
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

    return NextResponse.json(orders)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch user orders' }, { status: 500 })
  }
}