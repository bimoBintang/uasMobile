import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest 
) {
  try {
    // ambil id dari path
    const id = request.nextUrl.pathname.split('/').pop() as string

    const detailOrder = await prisma.detailOrder.findUnique({
      where: { id },
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
    console.error(error)
    return NextResponse.json({ error: 'Failed to fetch detail order' }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest
) {
  try {
    // ambil id dari path
    const id = request.nextUrl.pathname.split('/').pop() as string

    await prisma.detailOrder.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Detail order deleted successfully' })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: 'Failed to delete detail order' }, { status: 500 })
  }
}
