import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest
) {
  try {
    const id = request.nextUrl.pathname.split('/').pop();

    const order = await prisma.order.findUnique({
      where: { id: id },
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
      }
    })

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 })
  }
}

export async function PATCH(
  request: NextRequest
) {
  try {
    const body = await request.json()
    const { status, alamat, ongkir } = body;
    const id = request.nextUrl.pathname.split('/').pop();

    const order = await prisma.order.update({
      where: { id },
      data: {
        status,
        alamat,
        ongkir: ongkir ? parseInt(ongkir) : undefined
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
        },
        detailOrder: true
      }
    })

    return NextResponse.json(order)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest
) {
  try {
    const id = request.nextUrl.pathname.split('/').pop();
    // Delete detail orders first due to foreign key constraint
    await prisma.detailOrder.deleteMany({
      where: { orderId: id }
    })

    await prisma.order.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Order deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 })
  }
}