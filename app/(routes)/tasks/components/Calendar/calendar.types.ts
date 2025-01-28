import { Company, Event } from "@prisma/client";

export type CalendarEvent = {
    companies: Company[]
    events: Event[]
};