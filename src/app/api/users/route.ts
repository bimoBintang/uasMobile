import {prisma} from "@/lib/prisma";
import { NextResponse } from "next/server";


export async function GET() {
    try {

        const order = await prisma.order.findFirst();
        const users = await prisma.user.findMany({
            take: 10,
            orderBy: { email: "desc"}
        });

        if(!users) {
            return NextResponse.json({message: "No users found"}, {status: 404});
        }

        return NextResponse.json({
            users,
            order
        });
    } catch (error) {
        return NextResponse.json({message: "Something went wrong", error}, {status: 500});
    }
}


export async function POST(req: Request) {
    try {
        const {username, email, phone, password}= await req.json();
        const user = await prisma.user.create({
            data: {
                username: username,
                email: email,
                phone: phone,
                password: password
            }
        });
        return NextResponse.json({
            user: {
                username: user.username,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        return NextResponse.json({message: "Something went wrong", error}, {status: 500});
    }
    
}