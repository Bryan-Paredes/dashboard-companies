import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const userId = (await auth()).userId;
        const data = await req.json();

        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const company = await db.company.create({
            data: {
                userId,
                ...data,
            }
        });

        return NextResponse.json(company);

    } catch (error) {
        if (error instanceof Error) {
            console.log('[Company]', error.message);
            return new NextResponse('Server Error', { status: 500 })
        }
    }
}