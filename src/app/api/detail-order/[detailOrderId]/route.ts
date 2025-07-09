import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  { params }: { params: Promise<{ detailOrderId: string }>}
) {
  try {
    const resolveOrder = await params;
    const id = String(resolveOrder.detailOrderId)

    const detailOrder = await prisma.detailOrder.findUnique({
      where: { id: id },
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

    if (!detailOrder) {
      return NextResponse.json({ error: 'Detail order not found' }, { status: 404 })
    }

    return NextResponse.json(detailOrder)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch detail order' }, { status: 500 })
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ detailOrderId: string }> }
) {
  try {
    const resolveOrder = await params;
    const id = String(resolveOrder.detailOrderId)

    await prisma.detailOrder.delete({
      where: { id: id }
    })

    return NextResponse.json({ message: 'Detail order deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete detail order' }, { status: 500 })
  }
}