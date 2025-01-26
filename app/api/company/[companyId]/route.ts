import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { companyId: string } }) {
    try {
        const userId = (await auth()).userId;
        const { companyId } = await params;
        const values = await req.json();

        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const company = await db.company.update({
            where: {
                id: companyId,
                userId,
            },
            data: {
                ...values,
            },
        });

        return NextResponse.json(company);

    } catch (error) {
        if (error instanceof Error) {
            console.log('[Company ID]', error.message);
            return new NextResponse('Server Error', { status: 500 })
        }
    }
}


export async function DELETE(req: Request, { params }: { params: { companyId: string } }) {
    try {
        const userId = (await auth()).userId;
        const { companyId } = await params;

        if (!userId) return new NextResponse('Unauthorized', { status: 401 })

        const deletedCompany = await db.company.delete({
            where: {
                id: companyId,
            },
        });

        return NextResponse.json(deletedCompany);

    } catch (error) {
        if (error instanceof Error) {
            console.log('[DELETE Company]', error.message);
            return new NextResponse('Server Error', { status: 500 })
        }
    }
}