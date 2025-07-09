import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  { params }: { params: Promise<{ orderId: string }> }
) {
  try {
    const resolveOrder = await params;
    const id = String(resolveOrder.orderId)

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
  request: Request,
  { params }: { params: Promise<{ orderId: string }>} 
) {
  try {
    const body = await request.json()
    const { status, alamat, ongkir } = body;
    const resolveOrder = await params;
    const id = String(resolveOrder.orderId)

    const order = await prisma.order.update({
      where: { id: id },
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
  request: Request,
  { params }: { params: Promise<{ orderId: string }>}
) {
  try {
    const resolveOrder = await params;
    const id = String(resolveOrder.orderId)
    // Delete detail orders first due to foreign key constraint
    await prisma.detailOrder.deleteMany({
      where: { orderId: id }
    })

    await prisma.order.delete({
      where: { id: id }
    })

    return NextResponse.json({ message: 'Order deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete order' }, { status: 500 })
  }
}