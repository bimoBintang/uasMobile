import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.produk.findUnique({
      where: { id: params.id }
    })

    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 })
    }

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const { nama, quantity,image, price, jenis, satuan, deskripsi } = body

    const product = await prisma.produk.update({
      where: { id: params.id },
      data: {
        nama,
        quantity: quantity ? parseInt(quantity) : undefined,
        price: price ? parseInt(price) : undefined,
        jenis,
        image,
        satuan,
        deskripsi
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update product' }, { status: 500 })
  }
}

export async function DELETE(
  { params }: { params: { id: string } }
) {
  try {
    await prisma.produk.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ message: 'Product deleted successfully' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete product' }, { status: 500 })
  }
}