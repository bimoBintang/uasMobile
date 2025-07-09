import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const detailOrders = await prisma.detailOrder.findMany({
      include: {
        order: {
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
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })
    return NextResponse.json(detailOrders)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch detail orders' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { orderId } = body

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    // Check if order exists
    const orderExists = await prisma.order.findUnique({
      where: { id: orderId }
    })

    if (!orderExists) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    const detailOrder = await prisma.detailOrder.create({
      data: {
        orderId
      },
      include: {
        order: {
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
        }
      }
    })

    return NextResponse.json(detailOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create detail order' }, { status: 500 })
  }
}