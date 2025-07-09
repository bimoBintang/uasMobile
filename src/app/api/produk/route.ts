import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    try {
        const produk = await prisma.produk.findMany();

        if(!produk) {
            return NextResponse.json({message: "No produk found"}, {status: 404});
        };

        return NextResponse.json({
            produk
        });
    } catch (error) {
        return NextResponse.json({message: "Something went wrong", error}, {status: 500});
    }
}


export async function POST(req: Request) {
    try {
        const { nama, price, quantity, jenis, satuan, deskripsi} = await req.json();
        const createProduk = await prisma.produk.create({
            data: {
                nama: nama,
                price: price,
                quantity: quantity,
                jenis: jenis,
                satuan: satuan,
                deskripsi: deskripsi
            }
        })


        return NextResponse.json({
            produk: {
                nama: createProduk.nama,
                quantity: createProduk.quantity,
                price: createProduk.price,
                jenis: createProduk.jenis,
                satuan: createProduk.satuan,
                deskripsi: createProduk.deskripsi
            }
        })
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
    }
}