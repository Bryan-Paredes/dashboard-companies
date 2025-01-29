import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(request: Request, { params }: { params: Promise<{ companyId: string }> }) {

    try {

        const userId = (await auth()).userId;
        const companyId = (await params).companyId
        const data = await request.json();

        if (!userId) return new NextResponse('Unauthorized', { status: 401 });

        const company = await db.company.findUnique({
            where: {
                id: companyId,
            },
        })

        if (!company) return new NextResponse('Company Not Found', { status: 404 });

        const event = await db.event.create({
            data: {
                companyId: companyId,
                ...data,
            }
        })

        return NextResponse.json(event);



    } catch (error) {
        console.log('[Event]', error);
        return new NextResponse('Internal Server Error', { status: 500 });

    }

}