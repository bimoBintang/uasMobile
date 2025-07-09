import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const products = await prisma.produk.findMany({
      orderBy: {
        nama: 'asc'
      }
    })
    return NextResponse.json(products)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch products' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { nama, quantity, image, price, jenis, satuan, deskripsi } = body

    if (!nama || !quantity || !price || !jenis) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    const product = await prisma.produk.create({
      data: {
        nama,
        quantity: parseInt(quantity),
        price: parseInt(price),
        jenis,
        image,
        satuan: satuan || 'PCS',
        deskripsi
      }
    })

    return NextResponse.json(product, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create product' }, { status: 500 })
  }
}
