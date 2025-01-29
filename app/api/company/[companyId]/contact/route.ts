import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: { params: { companyId: string } }) {
    try {
        const userId = (await auth()).userId;
        const { companyId } = params.params;
        const data = await req.json();

        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const company = await db.company.findUnique({
            where: {
                id: companyId,
                userId,
            },
        });

        if (!company) return new NextResponse('Company Not Found', { status: 404 })

        const contact = await db.contact.create({
            data: {
                companyId: companyId,
                ...data,
            },
        });

        return NextResponse.json(contact);

    } catch (error) {
        if (error instanceof Error) {
            console.log('[Contact]', error.message);
            return new NextResponse('Server Error', { status: 500 })
        }
    }
}