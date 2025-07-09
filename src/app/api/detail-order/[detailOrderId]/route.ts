import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  { params }: { params: { id: string } }
) {
  try {
    const detailOrder = await prisma.detailOrder.findUnique({
      where: { id: params.id },
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
  { params }: { params: { id: string } }
) {
  try {
    await prisma.detailOrder.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Detail order deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete detail order' }, { status: 500 })
  }
}