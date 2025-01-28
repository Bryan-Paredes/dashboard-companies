import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request, { params }: { params: { eventId: string } }) {
    try {

        const userId = (await auth()).userId;
        const { eventId } = params;


        if (!userId) new NextResponse('Unauthorized', { status: 401 });

        const deleteEvent = await db.event.delete({
            where: {
                id: eventId,
            },
        })

        return NextResponse.json(deleteEvent)

    } catch (error) {
        if (error instanceof Error) {
            console.log('[Evento]', error);
            return NextResponse.json({ message: error.message }, { status: 500 });
        }
    }
}